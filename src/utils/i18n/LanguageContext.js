import React, { createContext, useState, useContext } from "react";

const LanguageContext = createContext();
export const useLanguageContext = () => useContext(LanguageContext);

export default function LanguageContextProvider({ children }) {
  const [language, changeLanguage] = useState("id");
  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
