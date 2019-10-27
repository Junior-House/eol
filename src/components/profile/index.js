import React from 'react';
import { compose } from 'recompose';

import * as ROUTES from '../../routes';
import { AuthUserContext, withAuthorization } from '../session';
import { PasswordForgetForm } from '../password/password-forget';
import PasswordChangeForm from '../password/password-change';
import SignOutButton from '../user/sign-out';

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const ProfilePage = (props) => {
    const [show, setShow] = React.useState(true);
    const handleClose = () => {
        setShow(false);
        props.history.push(ROUTES.HOME);
    }

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Profile
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <ProfileData />
                <PasswordForgetForm />
                <PasswordChangeForm />
                <SignOutButton />
            </Modal.Body>
        </Modal>
    );
};

const ProfileDataBase = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <Form>
                <Form.Group className="mb-1">
                    <Form.Label>
                        <b>Username:</b> {authUser.displayName}
                    </Form.Label>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>
                        <b>Email:</b> {authUser.email}
                    </Form.Label>
                </Form.Group>
            </Form>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;
const ProfileData = compose(
    withAuthorization(condition)
)(ProfileDataBase);

export default ProfilePage;