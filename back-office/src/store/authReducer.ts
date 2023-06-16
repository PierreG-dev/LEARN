// authReducer.ts

import { Reducer } from 'redux';
import { SET_CONNECTED_STATUS, SetConnectedStatusAction } from './authActions';

interface AuthState {
  isConnected: boolean;
}

const initialState: AuthState = {
  isConnected: false,
};

const authReducer: Reducer<AuthState, SetConnectedStatusAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_CONNECTED_STATUS:
      return {
        ...state,
        isConnected: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
