import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../routes';
import { withFirebase } from '../firebase';

const SignOutButtonBase = (props) => {
    const doSignOut = () => {
        props.firebase.doSignOut();
        props.history.push(ROUTES.HOME);
    };

    return (
        <button type="button" onClick={doSignOut}>
            Sign Out
        </button>
    );
};

const SignOutButton = compose(
    withRouter,
    withFirebase
)(SignOutButtonBase);

export default SignOutButton;