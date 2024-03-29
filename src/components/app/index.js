import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { compose } from 'recompose';

import 'bootstrap/dist/css/bootstrap.min.css';

import * as ROUTES from '../../routes';
import { withAuthentication } from '../session';

import Navigation from '../navigation';
import SignUpPage from '../user/sign-up';
import SignInPage from '../user/sign-in';
import PasswordForgetPage from '../password/password-forget';
import HomePage from '../home';
import ProfilePage from '../profile';

const AppBase = () => {
    return (
        <Router>
            <div>
                <Navigation />
                
                <HomePage />

                <Route path={ROUTES.PROFILE} component={ProfilePage} />
                <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            </div>
        </Router>
    );
}

const App = compose(
    withAuthentication
)(AppBase);

export default App;