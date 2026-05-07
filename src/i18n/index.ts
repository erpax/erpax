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

const flatMessages = { en, es, de, bg, ja, ar } as const

export type LocalizedLabel = Record<SupportedLocale, string>

/**
 * Convert flat keys (e.g., "tab.hero") to nested objects for next-intl compatibility.
 * next-intl doesn't accept dots in keys as it uses them for nesting.
 */
function flattenToNested(obj: Record<string, string>): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    const parts = key.split('.')
    let current: Record<string, unknown> = result

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i]
      if (!(part in current)) {
        current[part] = {}
      }
      current = current[part] as Record<string, unknown>
    }

    current[parts[parts.length - 1]] = value
  }

  return result
}

// Transform flat messages to nested structure for next-intl
const messages = {
  en: flattenToNested(en as Record<string, string>),
  es: flattenToNested(es as Record<string, string>),
  de: flattenToNested(de as Record<string, string>),
  bg: flattenToNested(bg as Record<string, string>),
  ja: flattenToNested(ja as Record<string, string>),
  ar: flattenToNested(ar as Record<string, string>),
} as const

const getMessage = (locale: SupportedLocale, key: string): string => {
  // Handle nested key lookup (e.g., "tab.hero" -> messages[locale].tab.hero)
  const parts = key.split('.')
  let current: unknown = messages[locale]

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part]
    } else {
      // Try fallback locale
      current = messages[fallbackLocale]
      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = (current as Record<string, unknown>)[part]
        } else {
          return key
        }
      }
      return current as string
    }
  }

  return typeof current === 'string' ? current : key
}

export function t(key: string): LocalizedLabel {
  return Object.fromEntries(
    supportedMessageLocales.map((locale) => [locale, getMessage(locale, key)]),
  ) as LocalizedLabel
}

export function messageByLocale(key: string, locale: SupportedLocale): string {
  return getMessage(locale, key)
}

export default messages
