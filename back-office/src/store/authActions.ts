// authActions.ts

import { Action } from 'redux';

export const SET_CONNECTED_STATUS = 'SET_CONNECTED_STATUS';

export interface SetConnectedStatusAction
  extends Action<typeof SET_CONNECTED_STATUS> {
  payload: boolean;
}

export const setConnectedStatus = (
  isConnected: boolean
): SetConnectedStatusAction => ({
  type: SET_CONNECTED_STATUS,
  payload: isConnected,
});
