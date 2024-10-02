import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// Import translation files
import enTranslation from "@locales/en.json";
import esTranslation from "@locales/es.json";
import frTranslation from "@locales/fr.json";

// Initialize i18n
i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  fallbackLng: "en",
  lng: Localization.locale.split("-")[0], // Use the device's language
  resources: {
    en: {
      translation: enTranslation,
    },
    es: {
      translation: esTranslation,
    },
    fr: {
      translation: frTranslation,
    },
  },
  debug: true,
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  react: {
    useSuspense: false, // React Native does not fully support Suspense
  },
});

export default i18n;
