import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import translationEn from './en.json'
import translationHe from './he.json'
import {LocalStorage} from '../function/localStorage'

const fallbackLng = 'en'
const localStorageValue = localStorage.getItem(LocalStorage.LANG)

if (localStorageValue === null) localStorage.setItem(LocalStorage.LANG, fallbackLng)

export const getLocaleJson = (lang: string) => {
  switch (lang) {
    case ('en'):
      return translationEn
    default:
      return translationHe
  }
}

const translate = i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {translation: translationEn},
      he: {translation: translationHe},
    },
    lng: localStorageValue || undefined,
    fallbackLng: fallbackLng,
    interpolation: {escapeValue: false}
  })

export default translate