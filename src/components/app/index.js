<<<<<<< HEAD
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../navigation';
import LandingPage from '../landing';
import SignUpPage from '../sign-up';
import SignInPage from '../sign-in';
import PasswordForgetPage from '../password-forget';
import HomePage from '../home';
import AccountPage from '../account';
import AdminPage from '../admin';
import * as ROUTES from '../../constants/routes';
=======
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "../navigation";
>>>>>>> 7ef37e1684accb7c6b9d50adaa77dc5701214d26

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
);

export default App;
