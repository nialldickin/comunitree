import { graphql } from 'react-relay';
import {
  AutocompleteSearchQuery,
  AutocompleteSearchQueryVariables
} from '../types/graphql';
import useLazyQuery from './useLazyQuery';

interface Query {
  response: AutocompleteSearchQuery;
  variables: AutocompleteSearchQueryVariables;
}

const query = graphql`
  query AutocompleteSearchQuery($address: String!) {
    viewer {
      predictions: getGeocodedLocation(address: $address) {
        description
        place_id
      }
    }
  }
`;

const useAutocompleteSearch = () => {
  const { loading, useQuery } = useLazyQuery<Query>(query);
  return {
    searchLoading: loading,
    getLocations: useQuery
  };
};

export default useAutocompleteSearch;
