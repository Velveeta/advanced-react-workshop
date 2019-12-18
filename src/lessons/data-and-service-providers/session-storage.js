import React from 'react';

import WebStorage from './web-storage';

const SessionStorage = props => (
  <WebStorage {...props} storageEngine="sessionStorage" />
);

export default SessionStorage;
