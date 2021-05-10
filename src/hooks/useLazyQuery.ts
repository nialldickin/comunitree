import { useState } from 'react';
import { fetchQuery, GraphQLTaggedNode } from 'react-relay';
import environment from '../api/relayEnvironment';

interface Operation {
  variables: {};
  response: {};
}

interface Result<T extends Operation> {
  loading: boolean;
  useQuery: (variables: T['variables']) => Promise<T['response']>;
}

type UseLazyQuery = <T extends Operation>(
  query: GraphQLTaggedNode
) => Result<T>;

const useLazyQuery: UseLazyQuery = <T extends Operation>(
  query: GraphQLTaggedNode
) => {
  const [loading, setLoading] = useState(false);
  const useQuery = async (variables: T['variables']) => {
    setLoading(true);
    // TODO: wrap in a try/catch
    const data = await fetchQuery<T>(environment, query, variables);
    setLoading(false);
    return data;
  };

  return { loading, useQuery };
};

export default useLazyQuery;
