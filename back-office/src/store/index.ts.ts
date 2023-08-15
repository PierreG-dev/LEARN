// store.ts
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

const store = configureStore({
  reducer: {
    auth: reducers.authReducer,
    data: reducers.dataReducer,
    globals: reducers.globalsReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
