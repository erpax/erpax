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
export function flattenToNested(obj: Record<string, string>): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  // Sort keys by depth (number of dots) so parent paths are processed first
  const sortedKeys = Object.keys(obj).sort((a, b) => {
    const depthA = a.split('.').length
    const depthB = b.split('.').length
    return depthA - depthB
  })

  for (const key of sortedKeys) {
    const value = obj[key]
    const parts = key.split('.')
    let current: Record<string, unknown> = result
    let valid = true

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i]
      if (!(part in current)) {
        current[part] = {}
      }
      const next = current[part]
      if (typeof next === 'object' && next !== null) {
        current = next as Record<string, unknown>
      } else {
        // Conflict: a leaf value exists where we need a branch
        // Skip this key to avoid overwriting
        valid = false
        break
      }
    }

    if (valid) {
      current[parts[parts.length - 1]] = value
    }
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
  // First try nested key lookup (for next-intl compatibility)
  const parts = key.split('.')
  let current: unknown = messages[locale]

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part]
    } else {
      current = undefined
      break
    }
  }

  if (typeof current === 'string') {
    return current
  }

  // Fallback: try flat key lookup directly from the raw messages
  // This handles cases where nested keys were skipped due to conflicts
  const flatValue = (flatMessages[locale] as Record<string, string>)[key]
  if (typeof flatValue === 'string') {
    return flatValue
  }

  // Try fallback locale with flat lookup
  const fallbackValue = (flatMessages[fallbackLocale] as Record<string, string>)[key]
  if (typeof fallbackValue === 'string') {
    return fallbackValue
  }

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

export default messages
