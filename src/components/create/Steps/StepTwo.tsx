import { Dispatch, SetStateAction } from 'react';
import { UserClaims } from '@okta/okta-auth-js';

interface Props {
  user: UserClaims | undefined;
  nextStep: () => void;
  previousStep: () => void;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
}

const InputForm = (props: Props) => {
  const {
    nextStep,
    previousStep,
    description,
    setDescription
  } = props;

  const validateForm = () => {
    if (description) {
      nextStep();
    }
  };

  return (
    <div
      className="flex flex-row mx-auto mt-20"
      style={{ maxWidth: '1180px' }}
    >
      <div id="left" className="w-1/2 p-5">
        <div className="w-max max-w-full">
          <div className="text-3xl text-gray-700 mb-8">
            Perfect! Next we need a description to show to other
            users.
          </div>

          <div className="text-normal font-medium text-gray-400">
            STEP 2 OF 3
          </div>

          <div className="text-2xl text-gray-600">
            Describe your garden
          </div>

          <textarea
            rows={5}
            maxLength={200}
            className="my-4 block border p-2 focus-within:border-gray-500 resize-none outline-none text-md w-full rounded-md border-gray-300"
            placeholder="A brief description of your garden. 200 characters max."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-between flex-row">
            <button
              onClick={previousStep}
              className="rounded-md hover focus:outline-none pl-1 text-blue-600"
            >
              <span className="text-3xl align-middle pr-1">
                {'<'}
              </span>
              <span className="align-middle hover:underline">
                Back
              </span>
            </button>
            <button
              onClick={validateForm}
              className="bg-blue-600 transition-shadow hover:bg-blue-400 focus:ring-4 ring-blue-200 focus:outline-none rounded-md  px-4 py-2 text-white"
            >
              Next
            </button>
          </div>
        </div>
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
