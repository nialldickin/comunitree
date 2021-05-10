import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const validateForm = (
  emailAddress: string,
  password: string
): boolean => {
  if (emailAddress.match(/^\S+@\S+$/)) {
    if (password.length > 7) {
      return true;
    }
  }
  return false;
};

const Login = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [formComplete, setFormComplete] = useState(false);

  useEffect(() => {
    const valid = validateForm(emailAddress, password);
    setFormComplete(valid);
  }, [emailAddress, password]);

  const onSubmit = () => {
    console.log(authState);
    oktaAuth
      .signInWithCredentials({ username: emailAddress, password })
      .then((res) => {
        const sessionToken = res.sessionToken;
        oktaAuth.signInWithRedirect({ sessionToken });
      })
      .catch((err) => console.log('Found an error', err));
  };

  if (authState.isAuthenticated) {
    return <Redirect to="/" />;
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
            Login to your account
          </span>

          <div>
            <input
              className="validated-input"
              minLength={1}
              required
              type="text"
              placeholder="Email address"
              onChange={(e) => setEmailAddress(e.target.value)}
              value={emailAddress}
            />
            <input
              className="validated-input"
              minLength={8}
              required
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button
            onClick={onSubmit}
            disabled={!formComplete}
            className="w-3/4 p-2 mt-8 disabled:bg-gray-600 font-semibold text-white rounded-md hover:bg-blue-400 bg-blue-600"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
