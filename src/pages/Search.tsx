import { useQuery, graphql } from 'relay-hooks';
import PaginationContainer from '../components/search/PaginationContainer';
import {
  SearchQuery,
  SearchQueryVariables,
  SortOrder
} from '../types/graphql';

interface Props {
  response: SearchQuery;
  variables: SearchQueryVariables;
}

const query = graphql`
  query SearchQuery(
    $first: Int!
    $after: Int!
    $sortEnum: SortOrder!
    $location: LocationInput
    $searchDistance: Float
  ) {
    viewer {
      ...PaginationContainer_viewer
        @arguments(
          first: $first
          after: $after
          sortEnum: $sortEnum
          location: $location
          searchDistance: $searchDistance
        )
    }
  }
`;

// TODO: make default vals proper
const defaultVariables = {
  first: 8,
  after: 0,
  sortEnum: 'NEWEST' as SortOrder,
  location: undefined,
  searchDistance: undefined
};

const Search = () => {
  const { data, isLoading, error } = useQuery<Props>(
    query,
    defaultVariables
  );

  return (
    <div className="search-page__container">
      <PaginationContainer {...data} />
      {isLoading && <div className="pt-20">Loading...</div>}
      {error && !data && (
        <div className="pt-20">
          Error, please contact us at
          <a
            className="pl-1 text-blue-500"
            href="mailto:admin@gardenhero.co.uk"
          >
            admin@gardenhero.co.uk
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
