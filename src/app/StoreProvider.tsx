"use client";

import { AppStore, makeStore } from "@/lib/redux/store";
import * as React from "react";
import { Provider } from "react-redux";

interface IStoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider: React.FunctionComponent<IStoreProviderProps> = ({
  children,
}) => {
  const storeRef = React.useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
