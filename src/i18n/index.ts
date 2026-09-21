import tsc from 'typescript'
import { astOf, corpusFiles, textOf } from '@/syntax/cache'
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
} from '@/i18n/localization'

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

/**
 * Every locale tag the corpus writes is a WELL-FORMED, CANONICAL BCP 47 tag.
 *
 * Decided by `Intl.getCanonicalLocales` — the runtime's own implementation of the registry, so
 * nothing here restates a subtag list that would rot the day it was written. See SKILL.md.
 *
 * @standard BCP 47 (RFC 5646) — tags for identifying languages
 */
export function malformedLocaleTags(cwd: string = process.cwd()): readonly string[] {
  const bad = new Set<string>()
  for (const tag of supportedLocales) if (!isCanonicalTag(tag)) bad.add(tag)
  for (const file of corpusFiles(cwd, 'source')) {
    for (const tag of localeLiteralsIn(file)) if (!isCanonicalTag(tag)) bad.add(tag)
  }
  return [...bad].sort()
}

/**
 * Well-formed AND already canonical.
 *
 * `en-us` is well-formed and names the same locale as `en-US`, so accepting both would let one
 * locale exist at two spellings — the split [[proof]]/register paid for with `ISO/IEC 27001`.
 */
export function isCanonicalTag(tag: string): boolean {
  try {
    return Intl.getCanonicalLocales(tag)[0] === tag
  } catch {
    return false
  }
}

/** A `locale:` property whose value is a string literal — PARSED, never matched. */
export function localeLiteralsIn(file: string, text: string = textOf(file)): readonly string[] {
  const out: string[] = []
  const visit = (node: tsc.Node): void => {
    if (
      tsc.isPropertyAssignment(node) &&
      tsc.isIdentifier(node.name) &&
      (node.name.text === 'locale' || node.name.text === 'defaultLocale') &&
      tsc.isStringLiteral(node.initializer) &&
      node.initializer.text !== ''
    ) {
      out.push(node.initializer.text)
    }
    tsc.forEachChild(node, visit)
  }
  visit(astOf(file, text))
  return out
}

/**
 * Fail closed on a tag no registry can parse. Zero is a THEOREM here, not a ratchet.
 *
 * @standard BCP 47 (RFC 5646) §2.2.9 — classes of conformance
 */
export function assertLocaleTagsWellFormed(cwd: string = process.cwd()): void {
  const bad = malformedLocaleTags(cwd)
  if (bad.length === 0) return
  throw new Error(
    `✖ BCP 47: ${bad.length} locale tag(s) are malformed or non-canonical — ${bad.join(', ')}. ` +
      'A tag no registry can parse selects no language, and the fallback that hides it is silent.',
  )
}
