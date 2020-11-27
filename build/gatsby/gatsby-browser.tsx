import React from 'react';
import { Provider } from 'react-redux';
import { Layout } from '../../src/components';
import configureStore from '../../src/state/store';
import '../../src/styles/sass/index.scss';
import Logger from '../../src/utils/Logger';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/command-line/prism-command-line.css';

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Layout {...props}>{element}</Layout>;
};

// wrap the app with redux provider
export const wrapRootElement: React.FC<any> = ({ element }) => {
  const store = configureStore();

  return <Provider store={store}>{element}</Provider>;
};

export const onServiceWorkerUpdateReady = (): void => {
  console.log('test')
  Logger.info(`This page has been updated. ${new Date().toLocaleTimeString()}`);
};
