import { createReducer } from "@reduxjs/toolkit";
import { GlobalsState } from "../../types";
import actions from "../actions";

const initialState: GlobalsState = {
  isServerOnline: true,
};

const globalsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.globalsActions.serverOnline, (state) => {
      state.isServerOnline = true;
    })
    .addCase(actions.globalsActions.serverOffline, (state) => {
      state.isServerOnline = false;
    });
});

export default globalsReducer;
