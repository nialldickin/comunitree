import { graphql } from 'react-relay';
import {
  GeocodeLocationQuery,
  GeocodeLocationQueryVariables
} from '../types/graphql';
import useLazyQuery from './useLazyQuery';

interface Query {
  response: GeocodeLocationQuery;
  variables: GeocodeLocationQueryVariables;
}

const query = graphql`
  query GeocodeLocationQuery($placeId: String!) {
    viewer {
      location: convertPlaceToCoordinates(placeId: $placeId) {
        latitude
        longitude
      }
    }
  }
`;

const useGeocodedLocation = () => {
  const { loading, useQuery } = useLazyQuery<Query>(query);
  return {
    geocodeLoading: loading,
    getCoordinates: useQuery
  };
};

export default useGeocodedLocation;
