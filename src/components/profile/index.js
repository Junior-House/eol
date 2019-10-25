import React from 'react';
import { compose } from 'recompose';

import * as ROUTES from '../../routes';
import { AuthUserContext, withAuthorization } from '../session';
import { PasswordForgetForm } from '../password/password-forget';
import PasswordChangeForm from '../password/password-change';
import SignOutButton from '../user/sign-out';

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './../../styles/general.css'

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
                <Profile />
            </Modal.Body>
        </Modal>
    );
};

const ProfileBase = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <Col>
                <Form.Group className="mb-4">
                    <Row>
                        <Form.Label>
                            <b>Username:</b> {authUser.displayName}
                        </Form.Label>
                    </Row>

                    <Row>
                        <Form.Label>
                            <b>Email:</b> {authUser.email}
                        </Form.Label>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Row>
                        <PasswordForgetForm />
                    </Row>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Row>
                        <PasswordChangeForm />
                    </Row>
                </Form.Group>

                <Form.Group className="mb-0">
                    <Row>
                        <SignOutButton />
                    </Row>
                </Form.Group>
            </Col>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;
const Profile = compose(
    withAuthorization(condition)
)(ProfileBase);

export default ProfilePage;