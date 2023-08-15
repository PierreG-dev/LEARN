import { createReducer } from "@reduxjs/toolkit";
import { DataState } from "../../types";
import { update } from "../actions/dataActions";

const initialState: DataState = {};
const globalDataReducer = createReducer(initialState, (builder) => {
  builder.addCase(update, (state, action) => {
    state.user = action.payload.data.user;
    state.schools = action.payload.data.schools;
    state.chapters = action.payload.data.chapters;
  });
});

export default globalDataReducer;
