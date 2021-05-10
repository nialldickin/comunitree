import { graphql } from 'react-relay';
import { useQuery } from 'relay-hooks';
import {
  FeaturedGardensQuery,
  FeaturedGardensQueryVariables,
  SortOrder
} from '../../types/graphql';
import GardenGrid from '../common/GardenGrid';

interface Props {
  response: FeaturedGardensQuery;
  variables: FeaturedGardensQueryVariables;
}

const query = graphql`
  query FeaturedGardensQuery(
    $first: Int!
    $after: Int!
    $sortEnum: SortOrder!
  ) {
    viewer {
      getGardens(first: $first, after: $after, sortEnum: $sortEnum) {
        gardens {
          ...GardenGrid_gardens
        }
        count
      }
    }
  }
`;

const defaultVariables = {
  first: 4,
  after: 0,
  sortEnum: 'OLDEST' as SortOrder
};

const FeaturedGardens = () => {
  const { data, isLoading, error } = useQuery<Props>(
    query,
    defaultVariables
  );

  // TODO improve error div styling
  if (error) {
    console.error(error);
    return <div>Error! Refresh the page</div>;
  }

  return (
    <GardenGrid
      gardens={data ? data.viewer.getGardens.gardens : []}
      loading={isLoading}
    />
  );
};

export default FeaturedGardens;
