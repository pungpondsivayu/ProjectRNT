import { configureStore } from "@reduxjs/toolkit";
import { BaseApi } from "../../helpers/controller/ConfigQuery"
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import { authRedcer } from "../slice/auth.slice";

export const store = configureStore({
  reducer: {
    [BaseApi.reducerPath]: BaseApi.reducer,
    AuthapiAuthStore: authRedcer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(BaseApi.middleware),
  devTools: false,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(devToolsEnhancer() as any),
});

// Share Get State
export type RootState = ReturnType<typeof store.getState>;
// Share Dispatch Get Action
export type AppDispatch = typeof store.dispatch;