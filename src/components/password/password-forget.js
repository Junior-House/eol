import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../routes';
import { withFirebase } from '../firebase';

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

const PasswordForgetPageBase = (props) => {
    const [show, setShow] = React.useState(true);
    const handleClose = () => {
        setShow(false);
        props.history.push(ROUTES.HOME);
    }

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Forgot Password
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <PasswordForgetForm />
            </Modal.Body>
        </Modal>
    );
};

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;

        // reset password in firebase
        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
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
        const { email, error } = this.state;
        const isInvalid = email === '';

        // render password reset form
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group className="mb-0">
                    <Form.Label>
                        Reset My Password
                    </Form.Label>

                    <InputGroup>
                        <Form.Control
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Email Address"
                        />

                        <InputGroup.Append>
                            <Button disabled={isInvalid} type="submit">
                                Submit
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>

                {error && 
                    <Form.Group className="mt-2 mb-0">
                        <Form.Label>
                            <i>{error.message}</i>
                        </Form.Label>
                    </Form.Group>
                }
            </Form>
        );
    }
}

const PasswordForgetLink = () => (
    <Form>
        <Form.Group className="mb-3">
            <Form.Label>
                <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
            </Form.Label>
        </Form.Group>
    </Form>
);

const PasswordForgetForm = compose(
    withFirebase
)(PasswordForgetFormBase);

const PasswordForgetPage = compose(
    withRouter
)(PasswordForgetPageBase);

export default PasswordForgetPage;
export { PasswordForgetLink, PasswordForgetForm };