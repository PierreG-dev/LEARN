import { createReducer } from "@reduxjs/toolkit";
import { GlobalDataState } from "../../types/types";
import { update } from "./actions";

const initialState: GlobalDataState = {
    data: []
}

export const globalDataReducer = createReducer(initialState, builder => {
    builder.addCase(update, (state, action) => {
        state.data = action.payload.data
    })
})