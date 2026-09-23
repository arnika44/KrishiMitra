"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getSavedLanguage,
  saveLanguage,
  type LanguageCode,
} from "./language";

type LanguageContextType = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] =
    useState<LanguageCode>("en");

  useEffect(() => {
    const savedLanguage = getSavedLanguage();
    setLanguageState(savedLanguage);
  }, []);

  const setLanguage = (newLanguage: LanguageCode) => {
    setLanguageState(newLanguage);
    saveLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}