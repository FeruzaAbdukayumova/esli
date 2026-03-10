import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import es from './locales/es.json'
import zh from './locales/zh.json'
import ru from './locales/ru.json'
import ar from './locales/ar.json'
import ja from './locales/ja.json'
import ko from './locales/ko.json'
import pt from './locales/pt.json'
import fr from './locales/fr.json'
import de from './locales/de.json'
import hi from './locales/hi.json'
import tr from './locales/tr.json'
import vi from './locales/vi.json'
import uz from './locales/uz.json'

const STORAGE_KEY = 'flashcards-website-language'

function getInitialLanguage(): string {
  if (typeof window === 'undefined') return 'en'

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && SUPPORTED_LANGUAGE_CODES.includes(stored)) return stored

  const browserLang = navigator.language.split('-')[0]
  if (SUPPORTED_LANGUAGE_CODES.includes(browserLang)) return browserLang

  return 'en'
}

export const SUPPORTED_LANGUAGE_CODES = [
  'en', 'es', 'zh', 'ru', 'ar', 'ja', 'ko', 'pt', 'fr', 'de', 'hi', 'tr', 'vi', 'uz',
]

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
  { code: 'zh', label: 'Chinese', nativeLabel: '中文' },
  { code: 'ru', label: 'Russian', nativeLabel: 'Русский' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語' },
  { code: 'ko', label: 'Korean', nativeLabel: '한국어' },
  { code: 'pt', label: 'Portuguese', nativeLabel: 'Português' },
  { code: 'fr', label: 'French', nativeLabel: 'Français' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'tr', label: 'Turkish', nativeLabel: 'Türkçe' },
  { code: 'vi', label: 'Vietnamese', nativeLabel: 'Tiếng Việt' },
  { code: 'uz', label: 'Uzbek', nativeLabel: "O'zbek" },
]

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    zh: { translation: zh },
    ru: { translation: ru },
    ar: { translation: ar },
    ja: { translation: ja },
    ko: { translation: ko },
    pt: { translation: pt },
    fr: { translation: fr },
    de: { translation: de },
    hi: { translation: hi },
    tr: { translation: tr },
    vi: { translation: vi },
    uz: { translation: uz },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  keySeparator: false,
})

i18n.on('languageChanged', (lng) => {
  if (typeof window === 'undefined') return
  document.documentElement.lang = lng
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr'
  localStorage.setItem(STORAGE_KEY, lng)
})

if (typeof window !== 'undefined') {
  document.documentElement.lang = i18n.language
  document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
}

export default i18n
