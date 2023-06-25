// reducer.ts
import { createReducer } from '@reduxjs/toolkit';
import { ConnectionState } from '../../types/types';
import { connect, disconnect } from './actions';

const initialState: ConnectionState = {
  isConnected: false,
  token: null,
};

// createReducer prend l'état initial et un objet de "case reducers"
// Chaque "case reducer" est associé à un type d'action spécifique
// et met à jour l'état en conséquence quand cette action est dispatchée
export const connectionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(connect, (state, action) => {
      state.isConnected = true;
      state.token = action.payload.token;
    })
    .addCase(disconnect, (state) => {
      state.isConnected = false;
      state.token = null;
    });
});
