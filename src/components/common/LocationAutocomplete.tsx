import React, { useState, Dispatch, SetStateAction } from 'react';
import useGeocodeLocation from '../../hooks/GeocodeLocationQuery';
import useAutocompleteSearch from '../../hooks/AutocompleteSearchQuery';
import { Location, AddressPrediction } from '../../types/graphql';
import Autosuggest, { ChangeEvent } from 'react-autosuggest';
import { BeatLoader } from 'react-spinners';
import DelayedMount from './DelayedMount';

interface Props {
  onSuggestionSelected?: (selected: AddressPrediction) => void;
  setLocation: Dispatch<SetStateAction<Location | undefined>>;
}

type Predictions = ReadonlyArray<AddressPrediction>;

interface GetSuggestions {
  value: string;
}

interface SuggestionSelected {
  suggestion: AddressPrediction;
}

const renderSuggestion = (suggestion: AddressPrediction) => {
  return <div>{suggestion.description}</div>;
};

const getSuggestionValue = (suggestion: AddressPrediction) => {
  return suggestion.description;
};

const LocationAutocomplete = ({
  onSuggestionSelected,
  setLocation
}: Props) => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<Predictions>([]);
  // eslint-disable-next-line no-unused-vars
  const { searchLoading, getLocations } = useAutocompleteSearch();
  // eslint-disable-next-line no-unused-vars
  const { geocodeLoading, getCoordinates } = useGeocodeLocation();

  const suggestionWasSelected = (
    _: any,
    { suggestion }: SuggestionSelected
  ) => {
    // if a custom callback was passed, call this first
    if (onSuggestionSelected) {
      onSuggestionSelected(suggestion);
    }

    getCoordinates({ placeId: suggestion.place_id })
      .then(({ viewer }) => {
        setLocation(viewer.location);
      })
      .catch((err) => console.error(err));
  };

  const getSuggestions = ({ value }: GetSuggestions) => {
    getLocations({ address: value })
      .then(({ viewer }) => {
        // takes the first 3 results - we don't want all 5
        setSuggestions(viewer.predictions.slice(0, 3));
      })
      .catch((err) => console.error(err));
  };

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  const onSearchChange = (_: any, { newValue }: ChangeEvent) => {
    setSearchText(newValue);
  };

  return (
    <div className="relative w-full z-10">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionSelected={suggestionWasSelected}
        onSuggestionsFetchRequested={getSuggestions}
        onSuggestionsClearRequested={clearSuggestions}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: 'Enter a location...',
          value: searchText,
          onChange: onSearchChange
        }}
      />
      {(geocodeLoading || searchLoading) && (
        <DelayedMount
          className="absolute bottom-0 right-0 flex flex-col"
          delayMs={500}
        >
          <BeatLoader color={'#77DD77'} size={10} margin={1} />
        </DelayedMount>
      )}
    </div>
  );
};

export default LocationAutocomplete;
