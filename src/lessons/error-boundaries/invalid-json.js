import React from 'react';

import api from './api';
import InvalidJsonError from './error-types/invalid-json';
import LoadingSpinner from '../../components/loading-spinner';

const InvalidJson = class extends React.Component {
  state = {
    data: null,
  };

  async componentDidMount() {
    const response = await api.getUsername();

    try {
      this.setState({
        data: api.parse(response),
      });
    } catch(error) {
      this.setState(() => {
        throw new InvalidJsonError(response);
      });
    }
  }

  render() {
    if (!this.state.data) {
      return <LoadingSpinner />;
    }

    return <div>Username: {this.state.data.username}</div>;
  }
};

export default InvalidJson;
