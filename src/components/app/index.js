import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import * as ROUTES from '../../routes';
import { withAuthentication } from '../session';

import Navigation from '../navigation';
import SignUpPage from '../user/sign-up';
import SignInPage from '../user/sign-in';
import PasswordForgetPage from '../password/password-forget';
import HomePage from '../home';
import ProfilePage from '../profile';

const App = () => {
    return (<Router>
        <div>
            <Navigation />

            <Route exact path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.PROFILE} component={ProfilePage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        </div>
    </Router>);
}

export default withAuthentication(App);