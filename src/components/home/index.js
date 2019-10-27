import React from 'react';

import { AuthUserContext } from '../session';
import Map from './map'

const HomePage = () => (   
    <div>
        <AuthUserContext.Consumer>
            { authUser => authUser ? <HomePageAuth /> : <HomePageNonAuth /> }
        </AuthUserContext.Consumer>
    </div>
);

const HomePageAuth = () => (
    <Map />
);

const HomePageNonAuth = () => (
    <p>
        Home (Non-Auth)
    </p>
);

export default HomePage;