import React from 'react';

import api from './api';
import AuthorizationFailureError from './error-types/authorization-failure';

const AuthorizationFailure = class extends React.Component {
  render() {
    if (!api.isAuthorized()) {
      throw new AuthorizationFailureError();
    }

    return (
      <div>You're authorized to view this content!</div>
    );
  }
};

export default AuthorizationFailure;
