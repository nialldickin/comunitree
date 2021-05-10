import React, { useEffect, useState } from 'react';
import {
  createRefetchContainer,
  graphql,
  RelayRefetchProp
} from 'react-relay';
import {
  PaginationContainerRefetchQuery,
  Location
} from '../../types/graphql';
import GardenGrid from '../common/GardenGrid';
import PaginationFooter from './PaginationFooter';
import PaginationHeader from './PaginationHeader';

interface Props {
  relay: RelayRefetchProp;
  viewer?: PaginationContainerRefetchQuery['viewer'];
}

const ITEMS_PER_PAGE = 8;

const PaginationContainer = ({ relay, viewer }: Props) => {
  const [breadcrumbLocation, setBreadcrumbLocation] = useState('');
  // TODO: fix default values for search location and search distance so we're not filtering out all results
  const [sortEnum, setSortEnum] = useState('NEWEST');
  const [searchDistance, setSearchDistance] = useState(0);
  const [searchLocation, setSearchLocation] = useState<
    Location | undefined
  >();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const headerProps = {
    breadcrumbLocation,
    setBreadcrumbLocation,
    sortEnum,
    setSortEnum,
    searchDistance,
    setSearchDistance,
    searchLocation,
    setSearchLocation
  };

  useEffect(() => {
    setLoading(true);
    relay.refetch(
      () => ({
        first: 8,
        after: page * ITEMS_PER_PAGE,
        sortEnum: sortEnum,
        location: searchLocation,
        searchDistance: searchDistance
      }),
      null,
      () => setLoading(false)
    );
  }, [page, sortEnum, searchLocation, searchDistance, relay]);

  return (
    <>
      <PaginationHeader {...headerProps} />
      {viewer && (
        <>
          <GardenGrid
            gardens={viewer.getGardens.gardens}
            loading={loading}
          />
          <PaginationFooter
            count={viewer.getGardens.count}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </>
  );
};

export default createRefetchContainer<Props>(
  PaginationContainer,
  {
    viewer: graphql`
      fragment PaginationContainer_viewer on Viewer
      @argumentDefinitions(
        first: { type: "Int!" }
        after: { type: "Int!" }
        sortEnum: { type: "SortOrder!" }
        location: { type: "LocationInput" }
        searchDistance: { type: "Float" }
      ) {
        getGardens(
          first: $first
          after: $after
          sortEnum: $sortEnum
          location: $location
          searchDistance: $searchDistance
        ) {
          gardens {
            ...GardenGrid_gardens
          }
          count
        }
      }
    `
  },
  graphql`
    query PaginationContainerRefetchQuery(
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
  `
);
