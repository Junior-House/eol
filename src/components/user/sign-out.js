import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../routes';
import { withFirebase } from '../firebase';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './../../styles/general.css'

const SignOutButtonBase = (props) => {
    const doSignOut = () => {
        props.firebase.doSignOut();
        props.history.push(ROUTES.HOME);
    };

    return (
        <Form>
            <Form.Group className="mt-5 mb-0">
                <Button type="button" onClick={doSignOut}>
                    Sign Out
                </Button>
            </Form.Group>
        </Form>
    );
};

const SignOutButton = compose(
    withRouter,
    withFirebase
)(SignOutButtonBase);

export default SignOutButton;