import { useOktaAuth } from '@okta/okta-react';
import { NavbarLink } from './NavbarLink';

const LoginLogout = () => {
  const { oktaAuth, authState } = useOktaAuth();

  // TODO: check this redirects to our original URI?
  const logout = async () => oktaAuth.signOut('/');

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  if (!authState.isAuthenticated) {
    return <NavbarLink path="login" text="Login" />;
  }

  return <button onClick={logout}>Logout</button>;
};

export default LoginLogout;
