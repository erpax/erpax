/**
 * Per-country official API registry — tax authorities, business
 * registries, e-invoicing portals, VAT/VIES validation, payroll, and
 * statistics agencies.
 *
 * **What this is:** a structured catalogue of the public endpoints each
 * country's authorities expose, with auth model, format, documentation
 * URL, and a one-line description. Consumed by:
 * Lives at `src/country/api/` — the one-word diamond path for the authority
 * catalogue (relocated from the hyphenated `config/country-apis` violation).
 *
 *   - the country-API client services (`@/country/api/client`)
 *     for the public/no-auth endpoints we ship working clients for;
 *   - the admin UI to surface "this country has an e-invoicing portal,
 *     here's the link" rather than silently no-op-ing;
 *   - documentation generators that need to cite the authority a given
 *     filing format originates from.
 *
 * **What this is not:** credentials. API keys, OAuth client IDs, mTLS
 * certificates and equivalent secrets live in the per-tenant config
 * sandbox (`tenant.config.countryApis[code].auth.*`) and never in this
 * file.
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard ISO-20022 financial-messages cross-references
 * @compliance EU 2014/55 b2g-e-invoicing portals
 * @compliance AMLD-5 ubo-registry-access
 * @see ./specifics.ts for the per-country regulatory context
 * @see src/country/api/client/ for the working client modules
 */

export type CountryApiKind =
  | 'business_registry' // company-name / id lookup, UBO register
  | 'tax_authority' // tax filing portal (returns, payments)
  | 'e_invoicing' // e-invoicing exchange / clearance platform
  | 'vat_validation' // VAT-ID validity check
  | 'bank_directory' // BIC / sort-code / IBAN-bank lookup
  | 'address_validation' // postal-code / address validation
  | 'open_banking' // PSD2 / CDR / equivalent
  | 'sanctions' // OFAC / EU consolidated list / UK HMT
  | 'statistics' // national statistics office (sometimes used for FX)
  | 'payroll' // payroll / social-security reporting
  | 'classification' // occupation/activity/skill classification service (ESCO, NACE, ISCO)

export type CountryApiAuth =
  | 'none' // open public endpoint
  | 'api_key' // simple key in header / query
  | 'oauth2' // standard OAuth 2.0 (authorization code or client credentials)
  | 'oauth2_pkce' // OAuth 2.0 with PKCE (Public clients)
  | 'mtls' // mutual TLS (qualified seal certificates, SDI, ZATCA)
  | 'pec' // certified email (FatturaPA legacy fallback)
  | 'soap_wsse' // SOAP with WS-Security headers (VIES, some legacy)
  | 'jwt_signed' // signed JWT bearer (e.g. KSeF token, Hometax)

export interface CountryApi {
  readonly kind: CountryApiKind
  readonly name: string
  readonly authority: string // human-readable: "HMRC", "AEAT", "ANAF", …
  readonly endpoint: string // base URL (sandbox + prod resolved per env)
  readonly sandboxEndpoint?: string
  readonly auth: CountryApiAuth
  readonly format: 'json' | 'xml' | 'soap' | 'csv' | 'edi' | 'mixed'
  readonly documentation: string
  /** Brief one-line summary of what the API does. */
  readonly description: string
  /**
   * Marks the registry entries for which `src/country/api/client/`
   * ships a working module. `false` = catalogue-only (still useful for the
   * admin UI / docs).
   */
  readonly clientImplemented: boolean
}

// ─── Registry slices ─────────────────────────────────────────────────────
// The authorities + registries live in the eu ⊕ world ⊕ bank child leaves
// ([[rules]]/concentration); this barrel re-exports the shared consts + BANK_APIS
// and merges the country slices into COUNTRY_APIS. The lookup functions follow.
export { VIES, EU_SANCTIONS, PEPPOL_DIRECTORY, ECB_RATES, EU_COUNTRY_APIS } from './eu'
export { WORLD_COUNTRY_APIS } from './world'
export { BANK_APIS } from './bank'
import { EU_COUNTRY_APIS } from './eu'
import { WORLD_COUNTRY_APIS } from './world'

/** The per-country registry — the EU and world slices, merged. */
export const COUNTRY_APIS: Readonly<Record<string, ReadonlyArray<CountryApi>>> = {
  ...EU_COUNTRY_APIS,
  ...WORLD_COUNTRY_APIS,
}

/**
 * Returns the curated official-API list for a country, or empty array if
 * the country isn't in the cohort. Always includes pan-EU APIs (VIES,
 * PEPPOL_DIRECTORY, EU_SANCTIONS) for EU member states.
 */
export function getCountryApis(country?: string | null): ReadonlyArray<CountryApi> {
  if (!country) return []
  const list = COUNTRY_APIS[country.toUpperCase()]
  return list ?? []
}

/**
 * Returns only the APIs of a given kind for a country.
 */
export function getCountryApisByKind(country: string, kind: CountryApiKind): ReadonlyArray<CountryApi> {
  return getCountryApis(country).filter((a) => a.kind === kind)
}

/**
 * Returns whether the country has a binding e-invoicing mandate (b2b, b2g, or both)
 * with at least one official portal registered.
 */
export function hasEInvoicingPortal(country: string): boolean {
  return getCountryApisByKind(country, 'e_invoicing').length > 0
}
