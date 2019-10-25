import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../firebase';
import * as ROUTES from '../../routes';

import Modal from 'react-bootstrap/Modal'
import './../../styles/general.css'

const SignUpPageBase = (props) => {
    const [show, setShow] = React.useState(true);
    const handleClose = () => {
        setShow(false);
        props.history.push(ROUTES.HOME);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <SignUpForm />
                </Modal.Body>
            </Modal>
        </>
    );
};

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;
        var submitError = null;

        this.props.firebase
            .user(username)
            .once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    submitError = {
                        code: "auth/username-already-in-use",
                        message: "The username is already in " +
                            "use by another profile."
                    };
                }
            })
            .then(() => {

                // prevent duplicate usernames
                if (submitError) {
                    this.setState({ error: submitError });
                    return;
                }

                // sign-up user in firebase
                this.props.firebase
                    .doCreateUserWithEmailAndPassword(email, passwordOne)
                    .then(() => {

                        // create user in realtime database
                        this.props.firebase
                            .user(username)
                            .set({
                                username,
                                email
                            });
                    })
                    .then(() => {

                        // add username to authentication database
                        this.props.firebase
                            .doSetUsername(username);
                    })
                    .then(() => {

                        // reset state and route to home
                        this.setState({ ...INITIAL_STATE });
                        this.props.history.push(ROUTES.HOME);
                    })
                    .catch(error => {
                        this.setState({ error });
                    });
            });

        // prevent page reload
        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        // render sign-up form
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Username"
                />
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />

                <button disabled={isInvalid} type="submit">
                    Sign Up
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have a profile? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase
)(SignUpFormBase);

const SignUpPage = compose(
    withRouter
)(SignUpPageBase);

export default SignUpPage;
export { SignUpLink };