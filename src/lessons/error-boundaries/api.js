const api = {
  getUsername() {
    return new Promise(resolve => {
      setTimeout(() => {
        // Malformed JSON, no closing quote on "username"
        resolve('{"username: "AwesomeReactEngineer!"}');
      }, 1500);
    });
  },

  isAuthorized() {
    return false;
  },

  parse(str) {
    return JSON.parse(str);
  },
};

export default api;
