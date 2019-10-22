import React from 'react';

import { AuthUserContext, withAuthorization } from '../session';
import { PasswordForgetForm } from '../password/password-forget';
import PasswordChangeForm from '../password/password-change';

const ProfilePage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <h1>Profile: {authUser.email}</h1>
                <PasswordForgetForm />
                <PasswordChangeForm />
            </div>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProfilePage);