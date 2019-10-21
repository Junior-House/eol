import React from 'react';

import { withAuthorization } from '../session';

const HomePage = () => (
    <div>
        <h1>Home Page</h1>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);