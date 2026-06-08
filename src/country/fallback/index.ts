/**
 * Country fallback — CLDR `ZZ` as the country identity element.
 *
 * Slice NNNNNNNNN-cut1 (2026-05-11). Conservation Law 54 applied to
 * the country slot. Third instance of the same template after
 * currency (XXX, Slice LLLLLLLLL) and locale (`und`, Slice MMMMMMMMM).
 *
 * The identity element is **CLDR `ZZ`**:
 *
 *   - ISO 3166-1 §6 reserves the alpha-2 ranges `AA`, `QM-QZ`,
 *     `XA-XZ`, `ZZ` for user-assigned codes (private use).
 *   - **CLDR** (Unicode Common Locale Data Repository) adopts `ZZ`
 *     specifically for "Unknown Region" — the country analog of
 *     BCP-47 `und`. Every CLDR-aware system (ICU, browsers, `Intl`,
 *     locale-name renderers) accepts `ZZ` and renders it as the
 *     locale's "Unknown Region" label.
 *   - **UN M.49** numeric code `001` is "World" — used in parallel
 *     where a numeric form is required (some banking standards
 *     prefer M.49 numeric for "supranational / unknown" cases).
 *     The fallback module emits both via a single registry entry.
 *
 * Standards alignment:
 *
 *   - ISO 3166-1 alpha-2 + alpha-3 + numeric
 *   - ISO 3166-2 subdivisions (out of scope; lives in country-context)
 *   - UN M.49 statistical areas
 *   - CLDR `ZZ` "Unknown Region"
 *   - EU VIES VAT (accepts ISO 3166-1 alpha-2; `ZZ` is invalid for
 *     real submissions but valid for placeholder rows)
 *   - SWIFT BIC §3 Country Code element (`ZZ` is rejected at the
 *     wire; ERPax stores it locally and converts at outbound time)
 *   - SEPA IBAN — the country code MUST match the IBAN; cross-border
 *     payments out of `ZZ` wallets route through internal settlement
 *     until a real country is assigned.
 *
 * Composition with other identity slots:
 *
 *   - Slice KKKKKKKK CountryTenantProfile — a tenant CAN be `ZZ` (a
 *     non-geographic tenant like a federation hub or a research
 *     project). The tenant's invoices ship with country=`ZZ`;
 *     federation peers reconcile by uuid alone.
 *   - Slice LLLLLLLLL XXX currency — `ZZ` country + XXX currency is
 *     legitimate (a fully-blank monetary entity).
 *   - Slice MMMMMMMMM `und` locale — `ZZ` country + `und` locale is
 *     the fully-untyped row.
 *
 * @standard ISO 3166-1 §6 user-assigned codes
 * @standard CLDR ZZ Unknown Region
 * @standard UN M.49 — 001 World (numeric)
 * @standard ISO 3166-2 — subdivision codes (handled by country-context)
 * @standard EU VIES — alpha-2 country code element
 * @standard SWIFT BIC §3 country code (BIC normalises ZZ → reject; ERPax stores)
 * @audit Conservation Law 54 universal-identity-element (country instance)
 * @feature country_fallback
 * @see ../currency-fallback/index.ts — XXX as currency identity
 * @see ../locale-fallback/index.ts — und as locale identity (sister module)
 * @see /src/config/regional-defaults.ts — DEFAULT_COUNTRY
 * @see /src/services/country-context.ts — country-aware logic entry point
 */

import { DEFAULT_COUNTRY } from '@/config/regional-defaults'
import { computeContentUuid } from '@/integrity'
import type { ContentUuid } from '@/integrity'

/** The canonical "blank country" — CLDR ZZ (Unknown Region). */
export const BLANK_COUNTRY = 'ZZ' as const

/** UN M.49 numeric counterpart — World (used by some banking standards). */
export const BLANK_COUNTRY_NUMERIC = 1 as const   // M.49 001 "World" left-padded

export type BlankCountry = typeof BLANK_COUNTRY

/**
 * Type-branded country identity. `Country<'BG'>` vs `Country<'DE'>`
 * are compile-time distinct. Mirror of `Currency<Code>` and
 * `Locale<Code>`.
 */
export type Country<Code extends string = string> = string & { readonly __countryCode: Code }

/** Country-identity uuid; per-tenant namespaced; type-branded. */
export type CountryUuid<Code extends string = string> = ContentUuid<{ countryCode: Code }>

/**
 * Resolve any input to a non-null country code. Returns the input
 * verbatim when it's a non-empty trimmed string; otherwise returns
 * the blank country (`ZZ`). Always emits uppercase per ISO 3166-1
 * convention.
 */
export function resolveCountry(code?: string | null): Country {
  if (code === undefined || code === null) return BLANK_COUNTRY as Country
  const trimmed = code.trim().toUpperCase()
  if (trimmed.length === 0) return BLANK_COUNTRY as Country
  return trimmed as Country
}

/**
 * UX-friendly variant — blank → DEFAULT_COUNTRY rather than ZZ.
 * Use this for display / outbound messages where a placeholder is
 * less friendly than the platform's house default.
 */
export function resolveCountryOrDefault(code?: string | null): Country {
  const resolved = resolveCountry(code)
  return resolved === BLANK_COUNTRY ? (DEFAULT_COUNTRY as Country) : resolved
}

export function isBlankCountry(code?: string | null): boolean {
  return resolveCountry(code) === BLANK_COUNTRY
}

/**
 * Countries are compatible when equal OR when either side is the
 * blank country (universal). Different real countries are not.
 */
export function countriesCompatible(a?: string | null, b?: string | null): boolean {
  const ra = resolveCountry(a)
  const rb = resolveCountry(b)
  if (ra === BLANK_COUNTRY || rb === BLANK_COUNTRY) return true
  return ra === rb
}

/** Display label — ZZ → em-dash; real codes → themselves (CLDR labels via translations). */
export function countryDisplayLabel(code?: string | null): string {
  const c = resolveCountry(code)
  if (c === BLANK_COUNTRY) return '—'
  return c
}

/**
 * UN M.49 numeric ↔ ISO 3166-1 alpha-2 mapping for the most common
 * cases ERPax sees on the wire (SWIFT MT 103, ISO 20022, Berlin
 * Group, SEPA). Not exhaustive — code-list reduction lives in
 * country-context (Slice KKKKKKKK).
 *
 * Note: M.49 numeric 001 (the World code) is the analog of ISO 4217
 * numeric 999 (the No-currency code). Both are "any/blank" in their
 * respective categories.
 */
const NUMERIC_TO_ALPHA: ReadonlyMap<number, string> = new Map([
  [1, 'ZZ'],     // M.49 001 World ↔ ISO 3166-1 ZZ Unknown Region
  [100, 'BG'],   // Bulgaria (UN M.49)
  [276, 'DE'],   // Germany
  [250, 'FR'],   // France
  [380, 'IT'],   // Italy
  [724, 'ES'],   // Spain
  [528, 'NL'],   // Netherlands
  [40,  'AT'],   // Austria
  [56,  'BE'],   // Belgium
  [208, 'DK'],   // Denmark
  [752, 'SE'],   // Sweden
  [578, 'NO'],   // Norway
  [246, 'FI'],   // Finland
  [372, 'IE'],   // Ireland
  [620, 'PT'],   // Portugal
  [300, 'GR'],   // Greece
  [196, 'CY'],   // Cyprus
  [203, 'CZ'],   // Czechia
  [616, 'PL'],   // Poland
  [642, 'RO'],   // Romania
  [348, 'HU'],   // Hungary
  [703, 'SK'],   // Slovakia
  [705, 'SI'],   // Slovenia
  [191, 'HR'],   // Croatia
  [233, 'EE'],   // Estonia
  [428, 'LV'],   // Latvia
  [440, 'LT'],   // Lithuania
  [442, 'LU'],   // Luxembourg
  [470, 'MT'],   // Malta
  [826, 'GB'],   // United Kingdom
  [840, 'US'],   // United States
  [124, 'CA'],   // Canada
  [392, 'JP'],   // Japan
  [156, 'CN'],   // China
  [356, 'IN'],   // India
  [36,  'AU'],   // Australia
  [554, 'NZ'],   // New Zealand
  [756, 'CH'],   // Switzerland
])

/** Get the alpha-2 for a UN M.49 numeric; returns undefined if unmapped. */
export function getCountryAlphaFromNumeric(numeric: number): string | undefined {
  return NUMERIC_TO_ALPHA.get(numeric)
}

/** Get the M.49 numeric for an alpha-2; returns undefined if unmapped. */
export function getCountryNumericFromAlpha(alpha: string): number | undefined {
  for (const [num, a] of NUMERIC_TO_ALPHA) if (a === alpha) return num
  return undefined
}

// ─── uuid-family bridge (Law 54) ────────────────────────────────────

/**
 * Content-uuid of a country identity. Per-tenant namespaced; mirror
 * of `computeCurrencyUuid` + `computeLocaleUuid`.
 *
 *   computeCountryUuid('BG',  'tenant-1')  → distinct uuid
 *   computeCountryUuid('BG',  'tenant-2')  → distinct uuid
 *   computeCountryUuid('ZZ',  'platform')  → THE blank-country uuid
 */
export function computeCountryUuid<Code extends string>(
  code: Code,
  tenantId: string,
): CountryUuid<Code> {
  const resolved = resolveCountry(code) as unknown as Code
  return computeContentUuid({ countryCode: resolved }, tenantId) as CountryUuid<Code>
}
