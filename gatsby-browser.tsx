import * as React from 'react';
import { Provider } from 'react-redux';

import configureStore from './src/state/store';
import './src/components/styles/sidebar.scss';

// wrap the app with redux provider
export const wrapRootElement: React.FC<any> = ({ element }) => {
  const store = configureStore();

  return <Provider store={store}>{element}</Provider>;
};

export const onServiceWorkerUpdateReady = (): void => {
  console.log(`This page has been updated. ${new Date().toLocaleTimeString()}`);
};
