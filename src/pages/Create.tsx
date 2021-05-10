import { UserClaims } from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';
import { Location, GardenInput } from './../types/graphql';
import React, { useCallback, useEffect, useState } from 'react';
import StepThree from '../components/create/Steps/StepThree';
import StepTwo from '../components/create/Steps/StepTwo';
import StepOne from '../components/create/Steps/StepOne';
import useCreateGarden from '../hooks/CreateGardenMutation';

const Create = () => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState<UserClaims | undefined>();
  const [location, setLocation] = useState<Location | undefined>();
  const [description, setDescription] = useState('');
  const { oktaAuth } = useOktaAuth();

  const { create } = useCreateGarden(({ success }) => {
    console.log(
      `Received response to createGarden. Success: ${success}`
    );
  });

  // on first form load, get our user so we can address them and use their ID when saving.
  useEffect(() => {
    oktaAuth.getUser().then((user) => setUser(user));
  }, [oktaAuth, setUser]);

  const nextStep = useCallback(() => setStep((s) => s + 1), []);
  const previousStep = useCallback(() => setStep((s) => s - 1), []);

  const submit = useCallback(
    (photos: string[]) => {
      if (location) {
        const garden: GardenInput = {
          owner: {
            firstName: user?.given_name ?? '',
            lastName: user?.family_name ?? '',
            username: user?.email ?? ''
          },
          description,
          photos: photos.map((val) => ({ filename: val })),
          location: location
        };

        create({ variables: { garden } });
      }
    },
    [create, user, description, location]
  );

  const baseProps = { user, nextStep, previousStep };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            {...baseProps}
            setLocation={setLocation}
            location={location}
          />
        );
      case 2:
        return (
          <StepTwo
            {...baseProps}
            setDescription={setDescription}
            description={description}
          />
        );
      case 3:
        return <StepThree {...baseProps} submit={submit} />;
      default:
        return <span>Error: invalid form step</span>;
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-white">
      <a
        className="navbar-hero__text pl-5 pt-4 text-blue-400"
        href="/"
      >
        GardenHood
      </a>
      {renderFormStep()}
    </div>
  );
};

export default Create;
