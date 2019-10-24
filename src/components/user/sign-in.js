import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../routes';
import { SignUpLink } from '../user/sign-up';
import { PasswordForgetLink } from '../password/password-forget';
import { withFirebase } from '../firebase';

import Modal from 'react-bootstrap/Modal'

const SignInPageBase = (props) => {
    const [show, setShow] = React.useState(true);

    const handleClose = () => {
        setShow(false);
        props.history.push(ROUTES.HOME);
    }

    const handlePasswordForget = () => {
        setShow(false);
        props.history.push(ROUTES.PASSWORD_FORGET);
    }

    const handleSignUp = () => {
        setShow(false);
        props.history.push(ROUTES.SIGN_UP);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <SignInForm />
                    <PasswordForgetLink onClick={handlePasswordForget} />
                    <SignUpLink onClick={handleSignUp} />
                </Modal.Body>
            </Modal>
        </>
    );
};

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        // sign-in user in firebase
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {

                // reset state and route home
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        // prevent page reload
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';

        // render sign-in form
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />

                <button disabled={isInvalid} type="submit">
                    Sign In
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

const SignInPage = compose(
    withRouter
)(SignInPageBase);

export default SignInPage;