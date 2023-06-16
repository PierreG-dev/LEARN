// store.ts

import { createStore, Store } from 'redux';
import { AuthState } from './authReducer';
import authReducer from './authReducer';

const store: Store<AuthState> = createStore(authReducer);

export default store;
