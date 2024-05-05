import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../src/locales/en.json';
import faTranslations from '../src/locales/fa.json';

const resources = {
  fa: { translation: faTranslations }, // Set Persian translations
  en: { translation: enTranslations }, // Set English translations
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'fa',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
