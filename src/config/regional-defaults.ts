/**
 * Canonical regional defaults — country drives currency and locale.
 *
 * **International-first principle.** erpax welcomes every ISO 3166-1
 * alpha-2 country and every ISO 4217 alphabetic currency code. The
 * curated tables here ({@link COUNTRY_PROFILES}, {@link SUPPORTED_CURRENCIES})
 * are the well-known cohort that the admin UI quick-selects and that
 * generators have explicit adapters for; **anything outside those
 * tables is still accepted at runtime** — the country code / currency
 * code is preserved verbatim, and the resolver falls back to the
 * deployment defaults only for the *derived* fields (currency, locale,
 * accountingStandard) it cannot infer from an unknown country.
 *
 * Single source of truth for "what does a fresh, un-configured tenant
 * look like?". {@link DEFAULT_COUNTRY} is the primary house default;
 * {@link DEFAULT_CURRENCY} and {@link DEFAULT_LOCALE} are derived from
 * it via the canonical {@link COUNTRY_PROFILES} table. Override the
 * country at deploy time with `ERPAX_DEFAULT_COUNTRY` and the rest
 * cascades automatically.
 *
 * Every collection that defaults a `currency`, `country`, or `locale`
 * field MUST import these constants instead of hard-coding `'EUR'` /
 * `'BG'` / `'bg-BG'` literals. Runtime overrides come from environment
 * variables — see {@link getRegionalDefaults}.
 *
 * House defaults (also enforce ordering rules):
 *   - **Country**  — BG / Bulgaria (ISO 3166-1:2020 alpha-2).
 *   - **Currency** — derived from BG → EUR (ISO 4217:2015 §5).
 *   - **Locale**   — derived from BG → bg-BG (BCP 47).
 *
 * Currency-list ordering rule: **EUR is always first, USD is always last**.
 * Mid-list ordering is by international trade volume (G7 + Asia-Pacific
 * majors). The frozen list lives in {@link SUPPORTED_CURRENCIES}.
 *
 * @standard ISO-4217:2015 currency-codes alphabetic
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard BCP-47 language-tag locale-identifier
 * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates functional-currency
 * @accounting US-GAAP ASC-830 foreign-currency-matters reporting-currency
 * @see docs/STANDARDS.md §4.1 §4.3
 * @see src/standards/iso-4217/
 */

// ─── 1. Canonical currency vocabulary ──────────────────────────────────────

/**
 * Canonical ISO 4217 currency vocabulary supported by erpax.
 *
 * **Ordering invariant:** `EUR` is always at index 0 (house default and
 * functional currency for the BG/EU market); `USD` is always last
 * (highest mind-share but pushed back to keep EUR-centric UIs honest).
 * Mid-list order: G7 + Asia-Pacific majors by international trade volume.
 *
 * Treat this as a frozen constant — adding a new currency means appending
 * before `USD`. Every consumer field updates automatically via the
 * derived {@link Currency} type and the `currencyOptions` Payload list.
 *
 * @standard ISO-4217:2015 §5 alphabetic-codes
 */
export const SUPPORTED_CURRENCIES = [
  'EUR', // ← always first (house default for the BG market)
  'GBP',
  'JPY',
  'CNY',
  'INR',
  'CAD',
  'AUD',
  'CHF',
  'SGD',
  'HKD',
  'USD', // ← always last
] as const

/**
 * **Any ISO 4217 currency is welcome.** This type accepts the curated
 * {@link SUPPORTED_CURRENCIES} as autocomplete suggestions while still
 * permitting any other 3-letter alphabetic code (the `string & {}` trick).
 *
 * Tenants in jurisdictions whose currency isn't in the curated list
 * (e.g. NOK, SEK, ZAR, AED, NGN, CLP, KRW, TWD, …) carry that code
 * verbatim through every storage and document path. The curated list
 * exists only to drive the admin UI's quick-select dropdown.
 */
export type Currency = (typeof SUPPORTED_CURRENCIES)[number] | (string & {})

/**
 * Reusable Payload `select` option list, ordering preserved from
 * {@link SUPPORTED_CURRENCIES}. Drop into any `select` field's `options`.
 *
 * For collections that must accept arbitrary ISO 4217 codes (FX rate
 * pairs, customer-supplied invoice currency), use {@link currencyTextField}
 * — a free-form text field with regex validation — instead of `select`.
 */
export const currencyOptions: ReadonlyArray<{ label: string; value: string }> =
  SUPPORTED_CURRENCIES.map((c) => ({ label: c, value: c }))

/**
 * Type guard — narrow `unknown` to a *curated* currency from the
 * {@link SUPPORTED_CURRENCIES} list. Use {@link isIso4217Currency}
 * for the broader "any ISO 4217 alphabetic code" check.
 */
export function isSupportedCurrency(s: unknown): s is (typeof SUPPORTED_CURRENCIES)[number] {
  return typeof s === 'string' && (SUPPORTED_CURRENCIES as readonly string[]).includes(s)
}

/**
 * Broad ISO 4217 §5 alphabetic-code check — any 3-letter uppercase
 * string is accepted, including currencies outside the curated set.
 *
 * Use this at the canonical "is this a valid currency code at all?"
 * boundary. The full enumeration lives in `Intl.supportedValuesOf('currency')`
 * (ECMA-402) at runtime — we deliberately do not ship a frozen code table.
 *
 * @standard ISO-4217:2015 §5 alphabetic-codes
 */
export function isIso4217Currency(s: unknown): s is Currency {
  return typeof s === 'string' && /^[A-Z]{3}$/.test(s)
}

// ─── 2. Per-country canonical profiles ─────────────────────────────────────

/**
 * Per-country regional table — the source of truth for "what does a
 * tenant in country X look like by default?".
 *
 * Each row maps an ISO 3166-1 alpha-2 country code to its preferred
 * functional currency (ISO 4217), BCP 47 locale, and accounting
 * standard family. **A tenant's `country` is the source of truth for
 * its currency/locale/accountingStandard defaults**; missing fields
 * fall back to {@link RegionalDefaults} from the main config.
 *
 * **Currency invariant:** every currency in this table MUST be a member
 * of {@link SUPPORTED_CURRENCIES} — call sites narrow via
 * {@link isSupportedCurrency} and fall back to {@link DEFAULT_CURRENCY}
 * when a country's preferred currency isn't (yet) supported (NZD/MXN/BRL).
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard ISO-4217:2015 currency-codes
 * @standard BCP-47 language-tag
 */
export interface CountryProfile {
  readonly currency: string // raw ISO 4217 — narrow via isSupportedCurrency
  readonly locale: string // BCP 47
  readonly accountingStandard: 'IFRS' | 'GAAP' | 'FRS' | 'JGAAP' | 'ASBE' | 'INDAS'
}

export const COUNTRY_PROFILES = {
  BG: { currency: 'EUR', locale: 'bg-BG', accountingStandard: 'IFRS' },
  CA: { currency: 'CAD', locale: 'en-CA', accountingStandard: 'IFRS' },
  DE: { currency: 'EUR', locale: 'de-DE', accountingStandard: 'IFRS' },
  FR: { currency: 'EUR', locale: 'fr-FR', accountingStandard: 'IFRS' },
  GB: { currency: 'GBP', locale: 'en-GB', accountingStandard: 'FRS' },
  JP: { currency: 'JPY', locale: 'ja-JP', accountingStandard: 'JGAAP' },
  CN: { currency: 'CNY', locale: 'zh-CN', accountingStandard: 'ASBE' },
  IN: { currency: 'INR', locale: 'hi-IN', accountingStandard: 'INDAS' },
  AU: { currency: 'AUD', locale: 'en-AU', accountingStandard: 'IFRS' },
  NZ: { currency: 'NZD', locale: 'en-NZ', accountingStandard: 'IFRS' },
  SG: { currency: 'SGD', locale: 'en-SG', accountingStandard: 'IFRS' },
  HK: { currency: 'HKD', locale: 'zh-HK', accountingStandard: 'IFRS' },
  MX: { currency: 'MXN', locale: 'es-MX', accountingStandard: 'IFRS' },
  BR: { currency: 'BRL', locale: 'pt-BR', accountingStandard: 'IFRS' },
  US: { currency: 'USD', locale: 'en-US', accountingStandard: 'GAAP' },
} as const satisfies Readonly<Record<string, CountryProfile>>

/**
 * The set of countries with an explicit canonical profile. Other
 * country codes are still acceptable (the resolver retains them on
 * the tenant) but inherit currency/locale from the main config.
 */
export type SupportedCountry = keyof typeof COUNTRY_PROFILES

// ─── 3. House defaults — derived from DEFAULT_COUNTRY ──────────────────────

/**
 * House default country. **Primary canonical default** — every other
 * regional default cascades from this row of {@link COUNTRY_PROFILES}.
 * Override at deploy time with `ERPAX_DEFAULT_COUNTRY` (must be a valid
 * ISO 3166-1 alpha-2 code).
 */
export const DEFAULT_COUNTRY = 'BG' as const

/**
 * Profile of the house default country. Used to derive
 * {@link DEFAULT_CURRENCY} and {@link DEFAULT_LOCALE}.
 */
const DEFAULT_PROFILE = COUNTRY_PROFILES[DEFAULT_COUNTRY]

/**
 * House default currency — derived from {@link DEFAULT_COUNTRY}'s
 * profile. For BG → EUR. Override the country to change the cascade,
 * or override directly with `ERPAX_DEFAULT_CURRENCY` (must be in
 * {@link SUPPORTED_CURRENCIES}).
 */
export const DEFAULT_CURRENCY: Currency = (
  isSupportedCurrency(DEFAULT_PROFILE.currency) ? DEFAULT_PROFILE.currency : 'EUR'
) as Currency

/**
 * House default BCP 47 locale tag — derived from {@link DEFAULT_COUNTRY}'s
 * profile. For BG → bg-BG. Override the country to change the cascade,
 * or override directly with `ERPAX_DEFAULT_LOCALE`.
 */
export const DEFAULT_LOCALE: string = DEFAULT_PROFILE.locale

/**
 * House default accounting framework — derived from {@link DEFAULT_COUNTRY}'s
 * profile. For BG → IFRS. Drives every document generator's branching:
 * IFRS-style balance sheet vs US-GAAP-style; IFRS IAS-1 vs US-GAAP ASC-205;
 * SAF-T BG vs FEC FR vs JPK PL; etc.
 */
export const DEFAULT_ACCOUNTING_STANDARD: CountryProfile['accountingStandard'] =
  DEFAULT_PROFILE.accountingStandard

// ─── 4. Resolved-defaults helpers (env- and tenant-aware) ──────────────────

/**
 * Resolved regional defaults bundle, env-aware.
 *
 * Reads `ERPAX_DEFAULT_COUNTRY` first; the resolved country derives
 * currency + locale + accountingStandard from {@link COUNTRY_PROFILES}
 * unless explicit `ERPAX_DEFAULT_CURRENCY` / `ERPAX_DEFAULT_LOCALE`
 * overrides win.
 *
 * `accountingStandard` is the canonical per-country accounting framework
 * (IFRS / US-GAAP / FRS / JGAAP / ASBE / INDAS). Every document
 * generator (invoice PDF, balance sheet, income statement, SAF-T XML,
 * tax filing) MUST branch on this — different countries produce
 * structurally different documents from the same underlying data.
 */
export interface RegionalDefaults {
  currency: Currency
  country: string
  locale: string
  accountingStandard: CountryProfile['accountingStandard']
}

/**
 * Read regional defaults at call time (does not memoize — call sites
 * that need a snapshot should capture the return value once at startup).
 *
 * Resolution order per field:
 *   - `country`  ← `ERPAX_DEFAULT_COUNTRY` env (validated alpha-2) → {@link DEFAULT_COUNTRY}
 *   - `currency` ← `ERPAX_DEFAULT_CURRENCY` env → resolved-country profile → {@link DEFAULT_CURRENCY}
 *   - `locale`   ← `ERPAX_DEFAULT_LOCALE` env → resolved-country profile → {@link DEFAULT_LOCALE}
 */
export function getRegionalDefaults(env: NodeJS.ProcessEnv = process.env): RegionalDefaults {
  const envCountry = env.ERPAX_DEFAULT_COUNTRY
  const envCurrency = env.ERPAX_DEFAULT_CURRENCY
  const envLocale = env.ERPAX_DEFAULT_LOCALE

  const country =
    typeof envCountry === 'string' && /^[A-Z]{2}$/.test(envCountry) ? envCountry : DEFAULT_COUNTRY

  // Cascade currency + locale + accountingStandard from the resolved
  // country's profile, if known.
  const profile = (COUNTRY_PROFILES as Record<string, CountryProfile>)[country]
  const profileCurrency: Currency = profile && isSupportedCurrency(profile.currency)
    ? profile.currency
    : DEFAULT_CURRENCY
  const profileLocale: string = profile?.locale ?? DEFAULT_LOCALE
  const profileStandard: CountryProfile['accountingStandard'] =
    profile?.accountingStandard ?? DEFAULT_ACCOUNTING_STANDARD

  // Explicit env overrides win over the country cascade.
  const currency: Currency = isSupportedCurrency(envCurrency) ? envCurrency : profileCurrency
  const locale: string =
    typeof envLocale === 'string' && /^[a-z]{2,3}(-[A-Z]{2,4})?$/.test(envLocale)
      ? envLocale
      : profileLocale

  return { currency, country, locale, accountingStandard: profileStandard }
}

/**
 * Resolve regional defaults for a tenant given (optionally) its country.
 *
 * Resolution order:
 *   1. Tenant `country` (if set + recognised in {@link COUNTRY_PROFILES}).
 *   2. Main-config defaults (env-aware, see {@link getRegionalDefaults}).
 *   3. House defaults — derived from {@link DEFAULT_COUNTRY}.
 *
 * Currency narrows to the supported set: if the country's preferred
 * currency (e.g. `NZD`, `MXN`, `BRL`) isn't yet in {@link SUPPORTED_CURRENCIES},
 * the result falls back to the main-config currency rather than yielding
 * an unsupported code.
 *
 * Use this everywhere a tenant's `currency` / `locale` / `country`
 * needs a default — never inline `'EUR'` / `'bg-BG'` / `'BG'` literals.
 */
export function getTenantDefaults(
  country?: string | null,
  env: NodeJS.ProcessEnv = process.env,
): RegionalDefaults {
  const main = getRegionalDefaults(env)
  if (typeof country !== 'string' || country.length === 0) return main
  const upperCountry = country.toUpperCase()
  const profile = (COUNTRY_PROFILES as Record<string, CountryProfile>)[upperCountry]
  if (!profile) return { ...main, country: /^[A-Z]{2}$/.test(upperCountry) ? upperCountry : main.country }
  const currency: Currency = isSupportedCurrency(profile.currency) ? profile.currency : main.currency
  return {
    currency,
    country: upperCountry,
    locale: profile.locale,
    accountingStandard: profile.accountingStandard,
  }
}

/**
 * Convenience accessor: just the accounting framework for a country.
 * Falls back to {@link DEFAULT_ACCOUNTING_STANDARD} (BG → IFRS) when
 * the country is unknown.
 *
 * Use everywhere a generator / serializer / view needs to branch on
 * the per-tenant accounting framework — IFRS-style balance sheet vs
 * US-GAAP-style, IFRS IAS-1 vs US-GAAP ASC-205 disclosure ordering,
 * SAF-T BG vs FEC FR vs JPK PL vs nothing for non-EU jurisdictions.
 */
export function getCountryAccountingStandard(
  country?: string | null,
): CountryProfile['accountingStandard'] {
  return getTenantDefaults(country).accountingStandard
}

/**
 * Convenience accessor: just the currency for a country, with the
 * supported-currency narrowing applied. Falls back to {@link DEFAULT_CURRENCY}.
 */
export function getCountryCurrency(country?: string | null): Currency {
  return getTenantDefaults(country).currency
}

/**
 * Convenience accessor: just the BCP 47 locale for a country.
 * Falls back to {@link DEFAULT_LOCALE}.
 */
export function getCountryLocale(country?: string | null): string {
  return getTenantDefaults(country).locale
}
