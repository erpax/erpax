/**
 * Per-country canonical bundle — single typed view that merges the three
 * country registries (`COUNTRY_PROFILES`, `COUNTRY_SPECIFICS`, `COUNTRY_APIS`)
 * for a single ISO-3166-1 alpha-2 code into one object.
 *
 * Why this exists: the three registries each answer a different question
 * (currency vs fiscal year vs official APIs). Code that needs all three for
 * a single country (templates, compliance reports, e-invoicing dispatch)
 * had to hand-stitch the answer. This module gives every country one
 * authoritative bundle, derived once, that callers consume directly.
 *
 * Each `CountryBundle` is built by composing the existing registries —
 * never by re-typing the data inline. If a registry value changes, the
 * bundle changes automatically.
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time fiscal-period
 * @audit ISO-19011:2018 audit-trail country-decision-evidence
 * @see ../../../config/regional-defaults.ts
 * @see ../../../config/country-specifics.ts
 * @see ../../../config/country-apis.ts
 * @see ../../../services/country-context.ts
 */

import type { CountryProfile } from '@/config/regional-defaults';
import type { CountrySpecifics } from '@/config/country-specifics';
import type { CountryApi } from '@/config/country-apis';

/**
 * Canonical view of every standardized fact about a country, normalized for
 * downstream consumption (templates, seeds, compliance reports, country-API
 * clients).
 */
export interface CountryBundle {
  /** ISO-3166-1 alpha-2 (e.g. `'BG'`, `'DE'`, `'US'`). */
  readonly code: string;
  /** Display name (e.g. `'Bulgaria'`, `'Germany'`). */
  readonly name: string;
  /** Currency / locale / accounting-framework triple from `COUNTRY_PROFILES`. */
  readonly profile: CountryProfile;
  /**
   * Fiscal-year / tax-id / e-invoicing / VAT specifics. `null` when the
   * country has no curated entry in `COUNTRY_SPECIFICS` (callers should fall
   * back to `regional-defaults` house defaults).
   */
  readonly specifics: CountrySpecifics | null;
  /** Every official API catalogued for this country. */
  readonly apis: ReadonlyArray<CountryApi>;
  /**
   * Bank-domain APIs for the country (PSD2 ASPSPs, BIC directories,
   * domestic clearing-house registries). Pulled from `BANK_APIS` in
   * `src/config/country-apis.ts` — separate from `apis` because the
   * bank-side endpoints are tenant-specific (driven by the tenant's
   * bank-account country, not the company-of-record country).
   */
  readonly bankApis: ReadonlyArray<CountryApi>;
  /**
   * Standards / regulations this country implements (citation strings).
   * Used by the templates layer + audit reports for traceability.
   */
  readonly standards: ReadonlyArray<string>;
}
