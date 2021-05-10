import { graphql } from 'react-relay';
import { useMutation } from 'relay-hooks';
import {
  CreateGardenMutation,
  CreateGardenMutationVariables
} from '../types/graphql';

const mutation = graphql`
  mutation CreateGardenMutation($garden: GardenInput!) {
    success: createGarden(garden: $garden)
  }
`;

interface Mutation {
  response: CreateGardenMutation;
  variables: CreateGardenMutationVariables;
}

const useCreateGarden = (
  onCompleted?: (response: CreateGardenMutation) => void
) => {
  const [create, { loading }] = useMutation<Mutation>(mutation, {
    onCompleted
  });

  return { create, loading };
};

export default useCreateGarden;
