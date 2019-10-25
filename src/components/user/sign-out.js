import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../routes';
import { withFirebase } from '../firebase';

import Button from 'react-bootstrap/Button'
import './../../styles/general.css'

const SignOutButtonBase = (props) => {
    const doSignOut = () => {
        props.firebase.doSignOut();
        props.history.push(ROUTES.HOME);
    };

    return (
        <Button type="button" onClick={doSignOut}>
            Sign Out
        </Button>
    );
};

const SignOutButton = compose(
    withRouter,
    withFirebase
)(SignOutButtonBase);

export default SignOutButton;