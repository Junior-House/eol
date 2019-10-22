import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../routes';
import SignOutButton from '../sign-out';
import { AuthUserContext } from '../session';

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            { authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth /> }
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <Link to={ROUTES.PROFILE}>Profile</Link>
        </li>
        <li>
            <SignOutButton />
        </li>
    </ul>
);

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
    </ul>
);

export default Navigation;