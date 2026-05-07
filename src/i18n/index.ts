import ar from './messages/ar.json'
import bg from './messages/bg.json'
import de from './messages/de.json'
import en from './messages/en.json'
import es from './messages/es.json'
import ja from './messages/ja.json'
import { supportedLocales, type SupportedLocale } from './localization'
export type { SupportedLocale } from './localization'

export const supportedMessageLocales = supportedLocales
const fallbackLocale: SupportedLocale = 'en'

const messages = { en, es, de, bg, ja, ar } as const

export type LocalizedLabel = Record<SupportedLocale, string>

const getMessage = (locale: SupportedLocale, key: string): string => {
  const localized = messages[locale][key as keyof (typeof messages)[typeof locale]]
  if (typeof localized === 'string') return localized

  const fallback = messages[fallbackLocale][key as keyof typeof en]
  if (typeof fallback === 'string') return fallback

  // Keep UI resilient in case of missing message keys.
  return key
}

export function t(key: string): LocalizedLabel {
  return Object.fromEntries(
    supportedMessageLocales.map((locale) => [locale, getMessage(locale, key)]),
  ) as LocalizedLabel
}

export function messageByLocale(key: string, locale: SupportedLocale): string {
  return getMessage(locale, key)
}
