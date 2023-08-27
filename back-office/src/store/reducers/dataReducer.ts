import { createReducer } from '@reduxjs/toolkit';
import { DataState } from '../../types';
import { update, updatePresence } from '../actions/dataActions';

const initialState: DataState = {};
const globalDataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(update, (state, action) => {
      state.user = action.payload.data.user;
      state.schools = action.payload.data.schools;
      state.chapters = action.payload.data.chapters;
    })
    .addCase(updatePresence, (state, action) => {
      state.activeUsers = action.payload.data;
    });
});

export default globalDataReducer;
