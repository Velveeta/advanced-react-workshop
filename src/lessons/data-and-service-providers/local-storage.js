import React from 'react';

import WebStorage from './web-storage';

const LocalStorage = props => (
  <WebStorage {...props} storageEngine="localStorage" />
);

export default LocalStorage;
