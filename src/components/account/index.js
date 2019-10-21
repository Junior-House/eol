import React from 'react';

import { PasswordForgetForm } from '../password-forget';
import PasswordChangeForm from '../password-change';

const AccountPage = () => (
    <div>
        <h1>Account Page</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
    </div>
);

export default AccountPage;