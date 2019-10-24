import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../routes';
import SignOutButton from '../user/sign-out';
import { AuthUserContext } from '../session';

import './style.css'

import ProfileIcon from './../../icons/profile.png'

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

        <Link to={ROUTES.PROFILE}>
                <img id="profile-icon" src={ProfileIcon} alt="Profile Icon">
                </img>
        </Link>

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
        
        <Link to={ROUTES.SIGN_IN}>
            <img id="profile-icon" src={ProfileIcon} alt="Sign In Icon">
            </img>
        </Link>
    </ul>
);

export default Navigation;