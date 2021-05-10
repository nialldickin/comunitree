import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useImageUpload from '../../hooks/SingleUploadMutation';
import { SingleUploadMutation as UploadResponse } from '../../types/graphql';

const renderPhotoIconSvg = () => (
  <svg
    className="mx-auto h-12 w-12 text-gray-400"
    stroke="currentColor"
    fill="none"
    viewBox="0 0 48 48"
    aria-hidden="true"
  >
    <path
      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface FilePairs {
  originalFiles: string[];
  uploadedFiles: string[];
}

const usePhotoUploadArea = (multipleFilesAllowed: boolean) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FilePairs>({
    originalFiles: [],
    uploadedFiles: []
  });

  console.log(files.originalFiles);
  console.log(files.uploadedFiles);

  const addFile = useCallback(
    (uploadedFilename: string, originalFilename: string) => {
      setFiles(({ originalFiles, uploadedFiles }) => ({
        originalFiles: originalFiles.concat(originalFilename),
        uploadedFiles: uploadedFiles.concat(uploadedFilename)
      }));
    },
    [setFiles]
  );

  // TODO: this should also delete from server
  const removeFile = useCallback(
    (index: number) => {
      setFiles(({ originalFiles, uploadedFiles }) => ({
        originalFiles: originalFiles.filter(
          (_, idx) => idx !== index
        ),
        uploadedFiles: uploadedFiles.filter((_, idx) => idx !== index)
      }));
    },
    [setFiles]
  );

  const uploadCompleted = (response: UploadResponse) => {
    console.log('uploadCompleted', response);
    const { newFilename, originalFilename } = response.file;
    addFile(newFilename, originalFilename);
  };

  const { upload } = useImageUpload(uploadCompleted);

  const onDrop = (acceptedFiles: File[]) => {
    console.log('onDrop', acceptedFiles);

    setLoading(true);
    const uploads = acceptedFiles.map((file) =>
      upload({ variables: { file } })
    );

    Promise.all(uploads).then(() => setLoading(false));
  };

  const { getRootProps, getInputProps } = useDropzone({
    noClick: true,
    accept: 'image/*',
    multiple: multipleFilesAllowed,
    onDrop: onDrop
  });

  return {
    acceptedFiles: files,
    uploadArea: (
      <div
        {...getRootProps()}
        className={`mt-2 flex justify-center outline-none px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md`}
      >
        <div className="space-y-1 text-center">
          {renderPhotoIconSvg()}
          <p className="text-sm text-gray-600">
            <label className="bg-white rounded-md font-medium text-blue-600 cursor-pointer hover:underline focus:outline-none pr-1">
              <input
                {...getInputProps()}
                type="file"
                className="hidden"
              />
              Upload a file
            </label>
            or drag and drop
          </p>
          <p className="text-xs text-gray-500">
            PNG, JPG or GIF up to 10MB
          </p>
          <div className="pt-2 flex max-w-max text-sm text-gray-700 flex-col space-y-1 mx-auto">
            {files.originalFiles.map((fileName, idx) => (
              <span className="relative" key={idx}>
                {fileName}
                <button
                  className="absolute -right-5 duration-150 transform hover:scale-125 focus:outline-none text-red-400"
                  onClick={() => removeFile(idx)}
                >
                  &#x2715;
                </button>
              </span>
            ))}
          </div>
          {loading && <p>Upload in progress...</p>}
        </div>
      </div>
    )
  };
};

export default usePhotoUploadArea;
