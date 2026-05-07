import ar from './messages/ar.json'
import bg from './messages/bg.json'
import de from './messages/de.json'
import en from './messages/en.json'
import es from './messages/es.json'
import ja from './messages/ja.json'
import localization, { supportedLocales, type SupportedLocale } from './localization'

export { supportedLocales }
export type { SupportedLocale }
export const defaultLocale = localization.defaultLocale

const flatMessages: Record<SupportedLocale, Record<string, string>> = {
  ar,
  bg,
  de,
  en,
  es,
  ja,
}

export type NestedMessages = Record<string, unknown>

/**
 * Convert flat keys (e.g. `"tab.hero"`) into nested objects so libraries that
 * use dot notation for namespacing (next-intl) and Payload's i18n (which uses
 * `:` as the namespace separator) can both consume them from a single source.
 *
 * Keys are processed deepest-first so nested branches are built before any
 * sibling leaf collides with them (e.g. both `search.title` and a flat
 * `search`). Leaves that would overwrite an already-built branch are skipped.
 */
function flattenToNested(obj: Record<string, string>): NestedMessages {
  const result: NestedMessages = {}

  const sortedKeys = Object.keys(obj).sort(
    (a, b) => b.split('.').length - a.split('.').length,
  )

  for (const key of sortedKeys) {
    const value = obj[key]
    const parts = key.split('.')

    let current = result
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i]
      if (!(part in current)) current[part] = {}
      current = current[part] as NestedMessages
    }

    const lastPart = parts[parts.length - 1]
    if (!(lastPart in current) || typeof current[lastPart] !== 'object') {
      current[lastPart] = value
    }
  }

  return result
}

/**
 * Pre-computed nested messages per locale.
 *
 * Used as:
 *   - `next-intl`'s `NextIntlClientProvider` messages on the frontend.
 *   - Base for Payload admin's `i18n.translations` so `t('namespace:key')`
 *     resolves directly from the same JSON source of truth.
 *
 * Collection labels follow `{slug}.singular` / `{slug}.plural` (same as
 * `categories`, `pages`, …). Use {@link localeRecord} for serializable
 * labels (`admin.group`, collection `labels`, fields, tabs, etc.) — plain
 * JSON per locale, safe across the Next.js RSC boundary.
 */
export const nestedMessages = Object.fromEntries(
  supportedLocales.map((locale) => [locale, flattenToNested(flatMessages[locale])]),
) as Record<SupportedLocale, NestedMessages>

/** Type guard / runtime validator for arbitrary locale strings. */
export function isValidLocale(value: unknown): value is SupportedLocale {
  return (
    typeof value === 'string' &&
    (supportedLocales as readonly string[]).includes(value)
  )
}

function resolveMessage(key: string, locale: SupportedLocale): string {
  const v = flatMessages[locale][key] ?? flatMessages[defaultLocale][key]
  return typeof v === 'string' ? v : key
}

/**
 * Per-locale string map (serializable). Use for Payload schema labels and any
 * admin config that Next.js may serialize to client components.
 */
export function localeRecord(key: string): Record<string, string> {
  return Object.fromEntries(
    supportedLocales.map((locale) => [locale, resolveMessage(key, locale)]),
  )
}

export default nestedMessages
