const AuthorizationFailureError = class AuthorizationFailureError extends Error {
  handler() {
    console.log('Pretend we just redirected the user to a login page!');
  }

  render() {
    return 'You are not authorized to view this content.';
  }
};

export default AuthorizationFailureError;
