import { createReducer } from "@reduxjs/toolkit";
import { GlobalDataState } from "../../types";
import { update } from "../actions/globalDataActions";

const initialState: GlobalDataState = {
  data: {},
};
const globalDataReducer = createReducer(initialState, (builder) => {
  builder.addCase(update, (state, action) => {
    state.data = action.payload.data;
  });
});

export default globalDataReducer;
