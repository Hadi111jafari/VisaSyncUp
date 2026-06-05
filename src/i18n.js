import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en.json";
import faTranslations from "./locales/fa.json";

const resources = {
  fa: { translation: faTranslations },
  en: { translation: enTranslations },
};

const storedLanguage = localStorage.getItem("visaSyncLang");
const initialLanguage = ["fa", "en"].includes(storedLanguage)
  ? storedLanguage
  : "fa";

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
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
i18n.on("languageChanged", (lng) => {
  setHtmlLanguageAttributes(lng);
  localStorage.setItem("visaSyncLang", lng);
});

export default i18n;
