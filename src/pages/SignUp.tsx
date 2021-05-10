import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState, ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import useCreateUser from '../hooks/CreateUserMutation';

interface FormError {
  errorSummary: string;
}
type FormErrors = FormError[];

const validateForm = (
  firstName: string,
  lastName: string,
  emailAddress: string,
  password: string
): boolean => {
  if (firstName.length && lastName.length) {
    if (emailAddress.match(/^\S+@\S+$/)) {
      if (password.length > 7) {
        return true;
      }
    }
  }
  return false;
};

const parseSignUpResponse = (response: string) => {
  const errors: FormErrors = JSON.parse(response);

  for (const error of errors) {
    switch (error.errorSummary) {
      case 'login: An object with this field already exists in the current organization':
        return (
          <span>
            Email address already in use, do you want to
            <a
              className="text-white font-semibold cursor-pointer hover:underline mx-1"
              href="/login"
            >
              login
            </a>
            instead?
          </span>
        );
      case 'password: This password was found in a list of commonly used passwords. Please try another password.':
        return (
          <span>
            Your password was found in a list of commonly used
            passwords. Please try another password.
          </span>
        );
      default:
        break;
    }
  }

  return undefined;
};

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [formComplete, setFormComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<
    undefined | ReactNode
  >();
  const { oktaAuth, authState } = useOktaAuth();
  const { register } = useCreateUser();

  useEffect(() => {
    const valid = validateForm(
      firstName,
      lastName,
      emailAddress,
      password
    );
    setFormComplete(valid);
  }, [firstName, lastName, emailAddress, password]);

  const onSubmit = () => {
    setLoading(true);
    register({
      variables: {
        user: { firstName, lastName, emailAddress, password }
      }
    }).then(({ response }) => {
      if (response === 'success') {
        console.log('created user!');
        oktaAuth
          .signInWithCredentials({ username: emailAddress, password })
          .then((res) => {
            setLoading(false);
            const sessionToken = res.sessionToken;
            oktaAuth.signInWithRedirect({ sessionToken });
          });
      } else {
        setLoading(false);
        setErrorMessage(parseSignUpResponse(response));
        console.log('no bueno', response);
      }
    });
  };

  if (authState.isAuthenticated) {
    return <Redirect to={'/'} />;
  }

  return (
    <div className="flex flex-1 flex-col items-center text-center">
      <div className="my-auto">
        <div className="navbar-hero__text text-5xl text-pastel-green pb-5">
          GardenHood
        </div>
        <div
          className="bg-white rounded-lg shadow-square px-4 py-8 flex flex-col items-center"
          style={{ width: '400px' }}
        >
          <span className="font-semibold text-gray-600 text-lg mb-8">
            Sign up for an account
          </span>

          <div>
            <input
              className="validated-input"
              minLength={1}
              required
              type="text"
              placeholder="First name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <input
              className="validated-input"
              minLength={1}
              required
              type="text"
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            <input
              className="validated-input"
              required
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmailAddress(e.target.value)}
              value={emailAddress}
            />
            <input
              className="validated-input"
              minLength={8}
              required
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          {errorMessage && (
            <div className="bg-red-500 mt-4 -mb-4 w-3/4 p-2 rounded-md text-center text-white">
              {errorMessage}
            </div>
          )}

          <button
            onClick={onSubmit}
            disabled={!formComplete || loading}
            className="w-3/4 p-2 mt-8 disabled:bg-gray-600 font-semibold text-white rounded-md hover:bg-blue-400 bg-blue-600"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
