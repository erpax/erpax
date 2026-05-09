/**
 * i18n entrypoint — supported locales, message bundle, helpers.
 *
 * 35 message bundles (one per supported locale) loaded as RFC 8259 JSON.
 * Locale tags follow BCP 47; runtime formatting via ECMA-402 `Intl`.
 *
 * @standard BCP-47 language-tag
 * @rfc 5646 tags-for-identifying-languages
 * @rfc 4647 matching-of-language-tags
 * @rfc 8259 json
 * @standard ECMA-402 internationalization-api
 * @standard Unicode-CLDR locale-data
 * @standard W3C Internationalization-Best-Practices
 * @see docs/STANDARDS.md §6 §4.3
 */

import ar from './messages/ar.json'
import bg from './messages/bg.json'
import cs from './messages/cs.json'
import da from './messages/da.json'
import de from './messages/de.json'
import el from './messages/el.json'
import en from './messages/en.json'
import es from './messages/es.json'
import et from './messages/et.json'
import fi from './messages/fi.json'
import fr from './messages/fr.json'
import ga from './messages/ga.json'
import hr from './messages/hr.json'
import hu from './messages/hu.json'
import is from './messages/is.json'
import it from './messages/it.json'
import ja from './messages/ja.json'
import lt from './messages/lt.json'
import lv from './messages/lv.json'
import mt from './messages/mt.json'
import nb from './messages/nb.json'
import nl from './messages/nl.json'
import pl from './messages/pl.json'
import pt from './messages/pt.json'
import ro from './messages/ro.json'
import ru from './messages/ru.json'
import sk from './messages/sk.json'
import sl from './messages/sl.json'
import sv from './messages/sv.json'
import uk from './messages/uk.json'
import {
  defaultLocale,
  supportedLocales,
  type SupportedLocale,
} from './localization'

export { supportedLocales, defaultLocale }
export type { SupportedLocale }

const flatMessages: Record<SupportedLocale, Record<string, string>> = {
  en,
  bg,
  ar,
  cs,
  da,
  de,
  el,
  es,
  et,
  fi,
  fr,
  ga,
  hr,
  hu,
  is,
  it,
  ja,
  lt,
  lv,
  mt,
  nb,
  nl,
  pl,
  pt,
  ro,
  ru,
  sk,
  sl,
  sv,
  uk,
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
function flattenToNested(obj: Record<string, string> | null | undefined): NestedMessages {
  const result: NestedMessages = {}

  if (!obj || typeof obj !== 'object') {
    return result
  }

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
  supportedLocales.map((locale) => {
    const flat = flatMessages[locale]
    const source =
      flat ?? flatMessages[defaultLocale] ?? ({} as Record<string, string>)
    return [locale, flattenToNested(source)]
  }),
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
