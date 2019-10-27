import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../firebase';
import * as ROUTES from '../../routes';

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';

const SignUpPageBase = (props) => {
    const [show, setShow] = React.useState(true);
    const handleClose = () => {
        setShow(false);
        props.history.push(ROUTES.HOME);
    }

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <SignUpForm />
            </Modal.Body>
        </Modal>
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
            <Form onSubmit={this.onSubmit}>
                <Form.Group className="mb-2">
                    <InputGroup>
                        <Form.Control
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Username"
                        />

                        <Form.Control
                            name="email"
                            value={email}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Email Address"
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-2">
                    <InputGroup>
                        <Form.Control
                            name="passwordOne"
                            value={passwordOne}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Password"
                        />

                        <Form.Control
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Confirm Password"
                        />
                    </InputGroup>
                </Form.Group>

                {error && 
                    <Form.Group className="mt-2 mb-0">
                        <Form.Label>
                            <i>{error.message}</i>
                        </Form.Label>
                    </Form.Group>
                }

                <Form.Group className="mt-3 mb-0">
                    <Button disabled={isInvalid} type="submit">
                        Sign Up
                    </Button>
                </Form.Group>
            </Form>
        );
    }
}

const SignUpLink = () => (
    <Form>
        <Form.Group className="mb-0">
            <Form.Label>
                Don't have a profile? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </Form.Label>
        </Form.Group>
    </Form>
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