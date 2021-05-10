import { UserClaims } from '@okta/okta-auth-js';
import usePhotoUploadArea from '../PhotoUploadArea';

interface Props {
  submit: (photos: string[]) => void;
  previousStep: () => void;
  user: UserClaims | undefined;
}

const InputForm = (props: Props) => {
  const { submit, previousStep } = props;
  const {
    acceptedFiles,
    uploadArea: renderUploadArea
  } = usePhotoUploadArea(true);

  const validateForm = () => {
    const files = acceptedFiles.uploadedFiles;
    if (files.length > 0) {
      submit(files);
    }
  };

  return (
    <div
      className="flex flex-row mx-auto mt-20"
      style={{ maxWidth: '1180px' }}
    >
      <div id="left" className="w-1/2 p-5">
        <div className="w-max max-w-full">
          <div className="text-3xl text-gray-700 mb-8">
            Lastly, to finish of your listing, we need a photo (or
            two).
          </div>

          <div className="text-normal font-medium text-gray-400">
            STEP 3 OF 3
          </div>

          <div className="text-2xl text-gray-600">
            Upload photo(s) of your garden
          </div>

          <div className="my-8">{renderUploadArea}</div>

          <div className="flex justify-between flex-row">
            <button
              onClick={previousStep}
              className="rounded-md hover focus:outline-none pl-1 text-blue-600"
            >
              <span className="text-3xl align-middle pr-1">
                {'<'}
              </span>
              <span className="align-middle hover:underline">
                Back
              </span>
            </button>
            <button
              onClick={validateForm}
              className="bg-blue-600 transition-shadow hover:bg-blue-400 focus:ring-4 ring-blue-200 focus:outline-none rounded-md  px-4 py-2 text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div id="right" className="w-1/2 p-5">
        <img
          className="rounded-md"
          src="https://picsum.photos/800/1200"
        />
      </div>
    </div>
  );
};

export default InputForm;
