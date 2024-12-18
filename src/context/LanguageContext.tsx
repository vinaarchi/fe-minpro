"use client";
import { createContext, FunctionComponent, ReactNode, useState } from "react";

// Context Confignya
interface ILanguageContext {
  language: string;
  setLanguage: (lang: string) => void;
}

export const LanguageContext = createContext<ILanguageContext>({
  language: "en",
  setLanguage: () => {},
});

//Provider Component Config
interface ILanguageProvider {
  children: ReactNode;
}

const LanguageProvider: FunctionComponent<ILanguageProvider> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>("en");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
