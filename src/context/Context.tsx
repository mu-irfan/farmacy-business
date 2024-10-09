"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Create context
const Context = createContext<ModeContextType | undefined>(undefined);

// Provider component to wrap the app
export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"view" | "add" | "edit">("add");

  return (
    <Context.Provider value={{ mode, setMode }}>{children}</Context.Provider>
  );
};

export const useContextConsumer = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
};
