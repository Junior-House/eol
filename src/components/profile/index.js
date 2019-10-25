import React from 'react';
import { compose } from 'recompose';

import * as ROUTES from '../../routes';
import { AuthUserContext, withAuthorization } from '../session';
import { PasswordForgetForm } from '../password/password-forget';
import PasswordChangeForm from '../password/password-change';
import SignOutButton from '../user/sign-out';

import Modal from 'react-bootstrap/Modal'

const ProfilePageBase = (props) => {
    const [show, setShow] = React.useState(true);
    const handleClose = () => {
        setShow(false);
        props.history.push(ROUTES.HOME);
    }

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Profile</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <ProfileForm />
            </Modal.Body>
        </Modal>
    );
};

const ProfileFormBase = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <>
                <h4>Username: {authUser.displayName}</h4>
                <h4>Email: {authUser.email}</h4>
                <PasswordForgetForm />
                <PasswordChangeForm />
                <SignOutButton />
            </>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;
const ProfileForm = compose(
    withAuthorization(condition)
)(ProfileFormBase);

const ProfilePage = compose(
    
)(ProfilePageBase);

export default ProfilePage;