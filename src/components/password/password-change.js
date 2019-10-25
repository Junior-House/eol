import React, { Component } from 'react';

import { withFirebase } from '../firebase';
import { compose } from 'recompose';

import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import './../../styles/general.css'

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { passwordOne } = this.state;

        // change password in firebase
        this.props.firebase
            .doPasswordUpdate(passwordOne)
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
        const { passwordOne, passwordTwo, error } = this.state;
        const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

        // render password change form
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group className="mt-4 mb-2">
                    <Form.Label>
                        Change My Password
                    </Form.Label>

                    <InputGroup>
                        <Form.Control
                            name="passwordOne"
                            value={passwordOne}
                            onChange={this.onChange}
                            type="password"
                            placeholder="New Password"
                        />

                        <Form.Control
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Confirm New Password"
                        />

                        <InputGroup.Append>
                            <Button disabled={isInvalid} type="submit">
                                Submit
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>

                {error && 
                    <Form.Group className="mt-2 mb-2">
                        <Form.Label>
                            <i>{error.message}</i>
                        </Form.Label>
                    </Form.Group>
                }
            </Form>
        );
    }
}

const PasswordChangeForm = compose(
    withFirebase
)(PasswordChangeFormBase);

export default PasswordChangeForm;