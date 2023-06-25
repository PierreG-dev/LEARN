// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { connectionReducer } from './auth/reducer';
import { globalDataReducer } from './data/reducer';

const store = configureStore({
  reducer: {
    connection: connectionReducer,
    globalData: globalDataReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
