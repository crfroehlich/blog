import { createStore as createReduxStore, Store } from 'redux';
import { reducer, initialState } from './reducer';

export const configure: () => Store = () => createReduxStore(reducer, initialState);
export default configure;
