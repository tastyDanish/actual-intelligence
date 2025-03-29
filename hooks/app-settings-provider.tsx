"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Settings = {
  talkToSelf: boolean;
};

interface AppSettingsContextType {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(
  undefined
);

export const AppSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>({ talkToSelf: false }); // Replace `any` with the actual type

  return (
    <AppSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error(
      "useAppSettings must be used within an AppSettingsProvider"
    );
  }
  return context;
};
