import React from 'react';

const WebStorage = class extends React.Component {
  componentDidMount() {
    global.addEventListener('storage', this._onStorage);
  }

  componentWillUnmount() {
    global.removeEventListener('storage', this._onStorage);
  }

  _onStorage = e => {
    const { item, storageEngine } = this.props;
    const { key, storageArea } = e;

    if (storageArea === global[storageEngine] && key === item) {
      this.forceUpdate();
    }
  };

  _getItem() {
    const { item, storageEngine } = this.props;

    return global[storageEngine].getItem.call(global[storageEngine], item);
  }

  _removeItem = () => {
    const { item, storageEngine } = this.props;

    global[storageEngine].removeItem.call(global[storageEngine], item);
    this.forceUpdate();
  };

  _setItem = (value) => {
    const { item, storageEngine } = this.props;

    global[storageEngine].setItem.call(global[storageEngine], item, value);
    this.forceUpdate();
  };

  render() {
    const props = {
      remove: this._removeItem,
      set: this._setItem,
      value: this._getItem(),
    };

    return this.props.children(props);
  }
};

export default WebStorage;
