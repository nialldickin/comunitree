import LocationAutocomplete from '../../common/LocationAutocomplete';
import { Location } from './../../../types/graphql';
import { UserClaims } from '@okta/okta-auth-js';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  user: UserClaims | undefined;
  location: Location | undefined;
  setLocation: Dispatch<SetStateAction<Location | undefined>>;
  nextStep: () => void;
}

const InputForm = (props: Props) => {
  const { user, nextStep, location, setLocation } = props;

  const validateForm = () => {
    if (location) {
      nextStep();
    }
  };

  const renderValidationTick = () => {
    return location ? (
      <img
        className="ml-2 w-8 h-8"
        src="https://upload.wikimedia.org/wikipedia/commons/7/73/Flat_tick_icon.svg"
      />
    ) : null;
  };

  return (
    <div
      className="flex flex-row mx-auto mt-20"
      style={{ maxWidth: '1180px' }}
    >
      <div id="left" className="w-1/2 p-5">
        <div className="text-3xl text-gray-700 mb-8">
          Hi {user ? user.given_name : 'there'}! Let{`'`}s get started
          listing your garden.
        </div>

        <div className="text-normal font-medium text-gray-400">
          STEP 1 OF 3
        </div>

        <div className="text-2xl text-gray-600">
          Where{`'`}s your garden located?
        </div>
        <div className="flex flex-row items-center">
          <div className="my-4 border px-2 focus-within:border-gray-500 text-md py-3 w-4/5 rounded-md border-gray-300">
            <LocationAutocomplete setLocation={setLocation} />
          </div>
          {renderValidationTick()}
        </div>
        <button
          onClick={validateForm}
          className="bg-blue-600 transition-shadow hover:bg-blue-400 focus:ring-4 ring-blue-200 focus:outline-none rounded-md  px-4 py-2 text-white"
        >
          Continue
        </button>
      </div>
      <div id="right" className="w-1/2 p-5">
        <img
          className="rounded-md"
          src="https://picsum.photos/800/1200"
        />
      </div>
    </div>
  );
};

export default InputForm;
