import React from 'react';
import ReactDOM from 'react-dom';

import './layer.css';

const Layer = ({ children, className, open, x, y, z }) => {
  if (!open) {
    return null;
  }

  const style = {
    left: `${x}px`,
    top: `${y}px`,
    zIndex: `${z}px`,
  };

  return ReactDOM.createPortal(
    <div
      className={`react-hooks-layer${className ? ` ${className}` : ''}`}
      style={style}
    >
      {children}
    </div>,
    document.body,
  );
};

Layer.defaultProps = {
  open: false,
  x: 0,
  y: 0,
  z: 0,
}

export default Layer;
