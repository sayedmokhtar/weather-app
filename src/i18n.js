import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        cairo: "cairo",
        english: "English",
        min: "min",
        max: "max",
      },
    },

    ar: {
      translation: {
        welcome: "مرحبا",
        cairo: "القاهرة",
        english: "الإنجليزية",
        min: "الصغرى",
        max: "الكبرى",
      },
    },
  },

  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
