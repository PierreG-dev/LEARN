import { createReducer } from '@reduxjs/toolkit';
import { DataState } from '../../types';
import { update, updatePresence } from '../actions/dataActions';

const initialState: DataState = {};
const globalDataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(update, (state, action) => {
      state.user = action.payload.data.user;
      state.schools = action.payload.data.schools;
      state.courses = action.payload.data.courses;
      state.school = action.payload.data.school;
      state.class = action.payload.data.class;
      state.teacher = action.payload.data.teacher;
    })
    .addCase(updatePresence, (state, action) => {
      state.activeUsers = action.payload.data;
    });
});

export default globalDataReducer;
