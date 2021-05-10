import { graphql } from 'react-relay';
import { useMutation } from 'relay-hooks';
import {
  CreateUserMutation,
  CreateUserMutationVariables
} from '../types/graphql';

const mutation = graphql`
  mutation CreateUserMutation($user: UserInput!) {
    response: createUser(user: $user)
  }
`;

interface Mutation {
  response: CreateUserMutation;
  variables: CreateUserMutationVariables;
}

const useCreateUser = (
  onCompleted?: (response: CreateUserMutation) => void
) => {
  const [register, { loading }] = useMutation<Mutation>(mutation, {
    onCompleted
  });

  return { register, loading };
};

export default useCreateUser;
