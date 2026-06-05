import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en.json";
import faTranslations from "./locales/fa.json";

const resources = {
  fa: { translation: faTranslations },
  en: { translation: enTranslations },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fa", // Default language
  fallbackLng: "en",
  supportedLngs: ["fa", "en"],
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

const setHtmlLanguageAttributes = (lng) => {
  document.documentElement.dir = lng === "fa" ? "rtl" : "ltr";
  document.documentElement.lang = lng;
};

setHtmlLanguageAttributes(i18n.language || "fa");
i18n.on("languageChanged", setHtmlLanguageAttributes);

export default i18n;
