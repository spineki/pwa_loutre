import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./languages";
import {
  getUserPreferedLanguage,
  saveUserPreferedLanguage,
} from "../database/controllers/preferencesController";

async function initDefaultLanguage() {
  const preferedLanguage = await getUserPreferedLanguage();
  console.log("initDefaultLanguage called", preferedLanguage, i18n.language);

  if (preferedLanguage === undefined) {
    await saveUserPreferedLanguage(i18n.language);
  } else if (preferedLanguage !== i18n.language) {
    await i18n.changeLanguage(preferedLanguage);
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(
    {
      lng: "en",
      resources,
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
      fallbackLng: "en",
    },
    initDefaultLanguage,
  );

export default i18n;
