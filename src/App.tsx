import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import Search from './pages/Search';
import Create from './pages/Create';
import Home from './pages/Landing';
import About from './pages/About';
import Footer from './components/common/Footer';
import { RelayEnvironmentProvider } from 'relay-hooks';
import environment from './api/relayEnvironment';
import {
  SecureRoute,
  Security,
  LoginCallback
} from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';

const CALLBACK_PATH = '/login/callback';

const config = {
  clientId: '0oa3xqunjDVBj8Do65d6',
  issuer: 'https://dev-2118381.okta.com/oauth2/default',
  redirectUri: `${window.location.origin}/login/callback`,
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};

const oktaAuth = new OktaAuth(config);

const NavbarRoutes = () => (
  <div className="flex flex-1">
    <Navbar />
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/search" component={Search} />
      <Route path="/" component={Home} />
    </Switch>
  </div>
);

const App = () => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <div className="min-h-screen flex flex-col">
        <Router>
          <Security oktaAuth={oktaAuth}>
            <Switch>
              <Route
                exact
                path={CALLBACK_PATH}
                component={LoginCallback}
              />
              <Route exact path="/signup" component={SignUpPage} />
              <Route exact path="/login" component={LoginPage} />
              <SecureRoute path="/create" component={Create} />
              <NavbarRoutes />
            </Switch>
          </Security>
        </Router>
        <Footer />
      </div>
    </RelayEnvironmentProvider>
  );
};
export default App;
