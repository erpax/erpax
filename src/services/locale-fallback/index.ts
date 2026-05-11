/**
 * Locale fallback — BCP-47 `und` as the locale identity element.
 *
 * Slice MMMMMMMMM-cut1 (2026-05-11). Conservation Law 54 (Universal
 * Identity Element) applied to the locale slot. Mirror of
 * `services/currency-fallback` for currencies — same template, same
 * uuid-bridge composition, same resolver-never-throws semantic.
 *
 * The identity element for locale is **BCP-47 `und`**:
 *
 *   > "Undetermined ... For use when the language is unknown or
 *   >  cannot be encoded in another way."   — RFC 5646 §4.1
 *
 * `und` is the locale analog of ISO 4217 XXX:
 *
 *   - **Standards-defined** — not a custom sentinel. Linguistic
 *     metadata systems (CLDR, ICU, IANA Language Subtag Registry)
 *     accept `und` as a valid value.
 *   - **Behaviourally universal** — formatters can render any value
 *     under `und` via locale-agnostic defaults (system locale, no
 *     plural rules, no RTL, ISO 8601 dates, dot-decimal numbers).
 *   - **Compatible with anything** — `localesCompatible('en', 'und')
 *     === true`. Used in invariants that previously rejected rows
 *     whose locale was provisional.
 *
 * Composition with the rest of the platform:
 *
 *   - Slice AAAAAAAAA translations collection — `und`-locale rows
 *     are platform defaults that EVERY tenant inherits when no more
 *     specific row exists.
 *   - Slice LLLLLLLLL currency-fallback — same template; the two
 *     identity elements (`XXX`, `und`) plug into the same identity-
 *     element machinery.
 *   - Slice MMMMMMMMM currency-uuid bridge — `computeLocaleUuid` is
 *     `ContentUuid<{ localeCode }>`, per-tenant namespaced. Same
 *     uuid-family laws apply.
 *
 * @standard RFC 5646 §4.1 — `und` undetermined language subtag
 * @standard BCP-47 — language tags
 * @standard ISO 639-2 — und (Undetermined) defined here originally
 * @standard W3C HTTP Content-Language (RFC 7231 §3.1.3.2)
 * @standard ECMA-402 internationalization-api §6.2.3 (Intl.Locale tolerates 'und')
 * @audit Conservation Law 53 self-referential-closure
 * @audit Conservation Law 54 universal-identity-element (this is the locale instance)
 * @feature locale_fallback
 * @see ../currency-fallback/index.ts — the template this mirrors
 * @see ../currency-fallback/currency-uuid.ts — uuid-bridge pattern
 * @see /src/i18n/localization.ts — supportedLocales + SupportedLocale type
 */

import { supportedLocales, type SupportedLocale } from '@/i18n/localization'
import { DEFAULT_LOCALE } from '@/config/regional-defaults'
import { computeContentUuid } from '@/services/integrity/content-uuid'
import type { ContentUuid } from '@/services/integrity/content-uuid'
import {
  registerIdentitySlot,
  resolveIdentity,
  isBlankIdentity,
  identitiesCompatible,
  identityDisplayLabel,
} from '@/services/identity-element'

/** The canonical "blank locale" — BCP-47 `und` (Undetermined). */
export const BLANK_LOCALE = 'und' as const

// Slice OOOOOOOOO-cut1 (2026-05-11) — register this slot with the
// generic identity-element framework so the runtime helpers below
// can delegate. The slot registration is the canonical declaration
// of the locale identity for Conservation Law 54.
registerIdentitySlot({
  slot: 'locale',
  blank: BLANK_LOCALE,
  // Locales are case-sensitive in BCP-47 but commonly lowercased;
  // we trim and lower-case the primary subtag only, preserving the
  // region suffix's documented BCP-47 casing.
  normalise: (input) => {
    const trimmed = input.trim()
    if (trimmed.length === 0) return trimmed
    const [primary, ...rest] = trimmed.split('-')
    return rest.length === 0 ? primary!.toLowerCase() : `${primary!.toLowerCase()}-${rest.join('-')}`
  },
  // Locale equality matches on primary subtag — `en-GB` ↔ `en-US`.
  equality: (a, b) => {
    const pa = (a.split('-')[0] ?? a).toLowerCase()
    const pb = (b.split('-')[0] ?? b).toLowerCase()
    return pa === pb
  },
  displayBlankAs: '—',
  standards: ['RFC-5646-§4.1', 'BCP-47', 'ISO-639-2', 'ECMA-402'],
  description: 'Locale identity element. BCP-47 `und` is reserved for undetermined language content; CLDR + ICU + Intl all accept it. Equality on primary subtag so `en-GB` ↔ `en-US` is compatible.',
}, { replace: true })

export type BlankLocale = typeof BLANK_LOCALE

/**
 * Type-branded locale identity. A `Locale<'en'>` value is compile-time
 * distinct from `Locale<'bg'>`. Mirror of `Currency<Code>` (Slice
 * LLLLLLLLL Cut 4) and `ContentUuid<T>` (Slice GGGGGGG).
 */
export type Locale<Code extends string = string> = string & { readonly __localeCode: Code }

/** A locale-identity uuid. Per-tenant namespaced; same code in different tenants → different uuids. */
export type LocaleUuid<Code extends string = string> = ContentUuid<{ localeCode: Code }>

/**
 * Resolve any input value to a non-null locale code. Returns the
 * input verbatim when it's a non-empty trimmed string; otherwise
 * returns the blank locale (`und`).
 *
 * Slice OOOOOOOOO-cut1 — delegates to the generic identity-element
 * framework. The runtime logic is identical to the prior
 * file-local implementation; the framework just gives every slot
 * one source of truth.
 */
export function resolveLocale(code?: string | null): Locale {
  return resolveIdentity<Locale>('locale', code)
}

/**
 * `resolveLocale` variant that prefers `DEFAULT_LOCALE` over `und`
 * when the input is missing. Useful for user-facing formatters
 * where "system default" is more friendly than "undetermined".
 *
 * Distinction matters: storage / federation / audit should use
 * `resolveLocale` (semantic identity); display / formatting should
 * use `resolveLocaleOrDefault` (UX preference).
 */
export function resolveLocaleOrDefault(code?: string | null): Locale {
  const resolved = resolveLocale(code)
  return resolved === BLANK_LOCALE ? (DEFAULT_LOCALE as Locale) : resolved
}

/** True iff the resolved code is the blank locale (`und`). */
export function isBlankLocale(code?: string | null): boolean {
  return isBlankIdentity('locale', code)
}

/**
 * `und` is compatible with any locale (universal identity element).
 * Two non-blank locales are compatible iff they share their primary
 * language subtag — `'en-GB' ↔ 'en-US' = true`, `'en' ↔ 'fr' = false`.
 *
 * The primary-subtag equality lives in the slot definition above so
 * the framework's generic `identitiesCompatible` returns the right
 * answer without locale-specific code here.
 */
export function localesCompatible(a?: string | null, b?: string | null): boolean {
  return identitiesCompatible('locale', a, b)
}

/**
 * Display label for a locale. The translations collection (Slice
 * AAAAAAAAA) supplies localised variants at request time via
 * `scope='locale'`, `key='${code}'`.
 */
export function localeDisplayLabel(code?: string | null): string {
  return identityDisplayLabel('locale', code)
}

/**
 * True iff the locale is one of the platform-supported set.
 * Unknown/custom tags + `und` return false. Callers needing strict
 * validation use this; callers happy with degradation use
 * `resolveLocale` which never rejects.
 */
export function isSupportedLocale(code?: string | null): code is SupportedLocale {
  const c = resolveLocale(code)
  if (c === BLANK_LOCALE) return false
  return (supportedLocales as readonly string[]).includes(c)
}

/**
 * The full set of locales we ship, INCLUDING the blank locale. Used
 * by admin UIs that render an "all locales" picker (e.g. the
 * Translations Editor — Slice FFFFFFFFF-cut4).
 */
export const SUPPORTED_LOCALES_INCLUDING_BLANK: ReadonlyArray<string> = [
  ...supportedLocales,
  BLANK_LOCALE,
]

// ─── uuid-family bridge (Slice MMMMMMMMM-cut1, Law 54 generalised) ─

/**
 * Content-uuid of a locale identity. Per-tenant namespaced — same
 * locale in different tenants → different uuids. Mirrors
 * `computeCurrencyUuid` (Slice LLLLLLLLL Cut 4).
 *
 *   computeLocaleUuid('en',  'tenant-1')  → distinct uuid
 *   computeLocaleUuid('en',  'tenant-2')  → distinct uuid
 *   computeLocaleUuid('und', 'platform')  → THE blank-locale uuid
 *                                            (platform-tenant default)
 */
export function computeLocaleUuid<Code extends string>(
  code: Code,
  tenantId: string,
): LocaleUuid<Code> {
  const resolved = resolveLocale(code) as Code
  return computeContentUuid({ localeCode: resolved }, tenantId) as LocaleUuid<Code>
}

/**
 * Format a number, date, or value under a locale, falling back to
 * system defaults when the locale is blank. Never throws — unknown
 * tags fall back to a generic ICU rendering.
 *
 *   formatForLocale(1234.5, 'en-GB')  → '1,234.5'
 *   formatForLocale(1234.5, 'und')    → '1234.5'  (locale-agnostic)
 *   formatForLocale(1234.5, null)     → '1234.5'  (null → und → agnostic)
 */
export function formatForLocale(
  value: number | Date,
  code?: string | null,
): string {
  const c = resolveLocale(code)
  if (c === BLANK_LOCALE) {
    if (value instanceof Date) return value.toISOString()
    return value.toString()
  }
  try {
    if (value instanceof Date) return new Intl.DateTimeFormat(c).format(value)
    return new Intl.NumberFormat(c).format(value)
  } catch {
    // Unknown locale at the Intl layer — fall back to system default.
    if (value instanceof Date) return value.toISOString()
    return value.toString()
  }
}
