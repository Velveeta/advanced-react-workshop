import React from 'react';

import fixture from './fixture';

const Context = React.createContext();

const { Consumer, Provider } = Context;

const PersonProvider = ({ children }) => <Provider value={fixture}>{children}</Provider>;

export {
  Consumer,
  Context,
  PersonProvider as Provider,
};
