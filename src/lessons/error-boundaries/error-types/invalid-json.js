const InvalidJsonError = class InvalidJsonError extends Error {
  constructor(json) {
    super();

    this.json = json;
  }

  handler(logger) {
    logger(this.json);
  }

  render() {
    return 'There was a problem with this response, please contact us for assistance.';
  }
};

export default InvalidJsonError;
