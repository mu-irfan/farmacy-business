"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, farmacyReduxStore } from "./store";

const ReduxStoreProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = farmacyReduxStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxStoreProvider;
