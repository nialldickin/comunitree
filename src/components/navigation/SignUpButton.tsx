import { useOktaAuth } from '@okta/okta-react';
import { NavbarLink } from './NavbarLink';

const SignUpButton = () => {
  const { authState } = useOktaAuth();

  if (authState.isPending || authState.isAuthenticated) return null;

  return <NavbarLink path="signup" text="Sign Up" />;
};

export default SignUpButton;
