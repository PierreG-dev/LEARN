// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { connectionReducer } from './auth/reducer';

const store = configureStore({
  reducer: {
    connection: connectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
