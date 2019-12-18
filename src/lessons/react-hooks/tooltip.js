import React from 'react';

import Layer from './layer';

import './tooltip.css';

const Tooltip = class extends React.Component {
  _renderLayer() {
    const { className, content, open, x, y, z } = this.props;

    return (
      <Layer
        className={`react-hooks-tooltip${className ? ` ${className}` : ''}`}
        open={open}
        x={x}
        y={y}
        z={z}
      >
        {content}
      </Layer>
    );
  }

  render() {
    return (
      <div className="tooltip-target">
        {this.props.children}
        {this._renderLayer()}
      </div>
    );
  }
};

export default Tooltip;
