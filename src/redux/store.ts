import { configureStore } from "@reduxjs/toolkit";
import exampleSlice from "./features/slices/testSlice";
export const farmacyReduxStore = () => {
  return configureStore({
    reducer: {
      farmacyTesting: exampleSlice,
    },
  });
};

export type AppStore = ReturnType<typeof farmacyReduxStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
