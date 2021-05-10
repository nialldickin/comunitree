import LocationSearch from './LocationSearch';
import { Location } from '../../types/graphql';
import { Dispatch, memo, SetStateAction } from 'react';

interface Props {
  searchDistance: number;
  setBreadcrumbLocation: Dispatch<SetStateAction<string>>;
  setSearchDistance: Dispatch<SetStateAction<number>>;
  setSearchLocation: Dispatch<SetStateAction<Location | undefined>>;
}

const SearchFilters = (props: Props) => {
  return (
    <div className="w-screen bg-mid-gray text-white h-16">
      <div
        className="mx-auto flex flex-row h-full"
        style={{ maxWidth: '1180px' }}
      >
        <LocationSearch {...props} />
        <div className="my-auto ml-auto font-medium text-lg text-white divide-x-2 divide-white">
          <span className="pr-1">
            <select className="select pr-8 green-arrow">
              <option value="0">Min. Size</option>
            </select>
          </span>
          <span className="pl-3 pr-1">
            <select className="select pr-8 green-arrow">
              <option value="0">Max. Fee</option>
            </select>
          </span>
          <span className="pl-3">
            <select className="select green-arrow pr-8">
              <option value="0">Filters</option>
            </select>
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(SearchFilters);
