import React, { Dispatch, SetStateAction } from 'react';
import { Location, AddressPrediction } from '../../types/graphql';
import LocationAutocomplete from '../common/LocationAutocomplete';

interface Props {
  searchDistance: number;
  setBreadcrumbLocation: Dispatch<SetStateAction<string>>;
  setSearchDistance: Dispatch<SetStateAction<number>>;
  setSearchLocation: Dispatch<SetStateAction<Location | undefined>>;
}

const LocationSearch = ({
  searchDistance,
  setBreadcrumbLocation,
  setSearchDistance,
  setSearchLocation
}: Props) => {
  const onDistanceChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = parseFloat(e.target.value);
    setSearchDistance(newValue);
  };

  const onSuggestionSelected = (selected: AddressPrediction) => {
    const breadcrumbLocation = selected.description.split(',')[0];
    setBreadcrumbLocation(breadcrumbLocation);
  };

  return (
    <div className="h-4/6 my-auto self-start px-4 font-medium bg-white rounded-lg text-almost-black flex flex-row items-center space-x-2 space-between">
      <LocationAutocomplete
        onSuggestionSelected={onSuggestionSelected}
        setLocation={setSearchLocation}
      />
      <span
        className="h-2/3 bg-gray-400"
        style={{ width: '2px' }}
      ></span>
      <select
        className="select pr-6 gray-arrow"
        onChange={onDistanceChange}
        value={searchDistance}
      >
        <option value={0}>+ 0 miles</option>
        <option value={0.25}>+ 1/4 mile</option>
        <option value={0.5}>+ 1/2 mile</option>
        <option value={1}>+ 1 mile</option>
        <option value={3}>+ 3 miles</option>
        <option value={5}>+ 5 miles</option>
        <option value={10}>+ 10 miles</option>
      </select>
    </div>
  );
};

export default LocationSearch;
