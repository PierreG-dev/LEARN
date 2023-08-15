import { createReducer } from "@reduxjs/toolkit";
import { ConnectionState } from "../../types";
import {
  connect,
  disconnect,
  startPending,
  stopPending,
} from "../actions/authActions";

const initialState: ConnectionState = {
  isConnected: false,
  token: null,
  isPending: true,
};

// createReducer prend l'état initial et un objet de "case reducers"
// Chaque "case reducer" est associé à un type d'action spécifique
// et met à jour l'état en conséquence quand cette action est dispatchée
const connectionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(connect, (state, action) => {
      state.isConnected = true;
      state.token = action.payload.token;
    })
    .addCase(disconnect, (state) => {
      state.isConnected = false;
      state.token = null;
    })
    .addCase(startPending, (state) => {
      state.isPending = true;
    })
    .addCase(stopPending, (state) => {
      state.isPending = false;
    });
});

export default connectionReducer;
