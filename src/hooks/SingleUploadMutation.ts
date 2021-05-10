import { graphql } from 'react-relay';
import {
  SingleUploadMutation,
  SingleUploadMutationVariables
} from '../types/graphql';

import { useMutation } from 'relay-hooks';

const mutation = graphql`
  mutation SingleUploadMutation($file: Upload!) {
    file: singleUpload(file: $file) {
      newFilename
      originalFilename
    }
  }
`;

interface Mutation {
  response: SingleUploadMutation;
  variables: SingleUploadMutationVariables;
}

const useSingleUpload = (
  onCompleted?: (response: SingleUploadMutation) => void
) => {
  const [upload, { loading }] = useMutation<Mutation>(mutation, {
    onCompleted: onCompleted
  });

  return { upload, loading };
};

export default useSingleUpload;
