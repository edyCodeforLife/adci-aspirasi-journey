//import React, { useState, useContext } from "react";
import LocalizedStrings from "localized-strings";
import localization from "./localization";
import { useLanguageContext } from "./LanguageContext";

export default function useTranslation() {
  const { language } = useLanguageContext();
  let translation = new LocalizedStrings(localization);

  translation.setLanguage(language);
  return translation;
}
