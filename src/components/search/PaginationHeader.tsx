import React, { Dispatch, SetStateAction } from 'react';
import { SearchBreadcrumb } from './SearchBreadcrumb';
import SearchFilters from './SearchFilters';
import SearchSort from './SearchSort';
import { Location } from '../../types/graphql';

interface Props {
  sortEnum: string;
  searchDistance: number;
  breadcrumbLocation: string;
  setSortEnum: Dispatch<SetStateAction<string>>;
  setSearchDistance: Dispatch<SetStateAction<number>>;
  setBreadcrumbLocation: Dispatch<SetStateAction<string>>;
  setSearchLocation: Dispatch<SetStateAction<Location | undefined>>;
}

const PaginationHeader = (props: Props) => {
  return (
    <>
      <SearchFilters
        searchDistance={props.searchDistance}
        setBreadcrumbLocation={props.setBreadcrumbLocation}
        setSearchLocation={props.setSearchLocation}
        setSearchDistance={props.setSearchDistance}
      />
      <div className="flex w-full flex-row justify-between pt-3">
        <SearchBreadcrumb
          location={props.breadcrumbLocation}
          distance={props.searchDistance}
        />
        <SearchSort
          setSortEnum={props.setSortEnum}
          sortEnum={props.sortEnum}
        />
      </div>
    </>
  );
};

export default PaginationHeader;
