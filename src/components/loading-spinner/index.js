import React from 'react';

import './index.css';

const LoadingSpinner = ({ className }) => (
  <div className={`loading-spinner${className ? ` ${className}` : ''}`} />
);

export default LoadingSpinner;
