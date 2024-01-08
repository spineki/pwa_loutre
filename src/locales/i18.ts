import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./languages";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: "fr",
    resources,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    fallbackLng: "en",
  });

export default i18n;
