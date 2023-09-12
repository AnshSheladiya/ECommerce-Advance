// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Language files
import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
    },
  });

export default i18n;
