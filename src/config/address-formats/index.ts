/**
 * Per-country postal-address formats — line ordering, required fields,
 * postal-code validation, and locale-specific field labels.
 *
 * One {@link AddressFormat} per ISO 3166-1 alpha-2 country code, keyed
 * the same way as {@link COUNTRY_PROFILES} in `./regional-defaults`.
 * The country in scope drives BOTH the regional-defaults cascade
 * (currency/locale) AND the address-rendering shape — every consumer
 * that prints, validates, or laid-out an address must look the format
 * up here rather than hard-coding US-centric `street/city/state/ZIP`.
 *
 * Universal address-component vocabulary (canonical superset; subset
 * actually used per country):
 *   - `recipient`   — addressee personal name
 *   - `company`     — organisation / business name
 *   - `street1`     — primary delivery line (street + house number)
 *   - `street2`     — apartment / floor / suite
 *   - `locality`    — city / town / village
 *   - `subdivision` — state / province / prefecture / region (label varies)
 *   - `postalCode`  — ZIP / postcode / PIN / CEP (format varies)
 *   - `country`     — ISO 3166-1 alpha-2 country code
 *
 * @standard ISO-19160-4:2017 addressing components-and-conceptual-model
 * @standard UPU-S42 international-postal-addressing
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard ISO-3166-2:2020 subdivisions
 * @standard BCP-47 language-tag field-labels
 * @compliance GDPR Art.5(1)(c) data-minimisation collect-only-fields-the-format-requires
 * @see docs/STANDARDS.md §4.1
 * @see src/config/regional-defaults.ts
 */

import type { SupportedCountry } from '../regional-defaults'

/**
 * The canonical address components a format may include.
 * `country` is implicit (every address has one) and is therefore omitted
 * from the per-country line ordering.
 */
export type AddressComponent =
  | 'recipient'
  | 'company'
  | 'street1'
  | 'street2'
  | 'locality'
  | 'subdivision'
  | 'postalCode'

export interface AddressFormat {
  /**
   * Ordered list of components to render, top-to-bottom. Components
   * not in this list are not part of the country's standard format
   * and should be hidden in admin UI.
   */
  readonly lineOrder: readonly AddressComponent[]

  /**
   * Components that MUST be filled for an address in this country to
   * be considered valid. Subset of {@link lineOrder}.
   */
  readonly required: readonly AddressComponent[]

  /**
   * Regex the postal code must satisfy when present.
   * `null` ⇒ no postal-code validation (or no postal code at all).
   */
  readonly postalCodePattern: RegExp | null

  /**
   * Human-readable label for the postal code in this locale (i18n key).
   * Used by the admin UI and printed forms.
   */
  readonly postalCodeLabel: string

  /**
   * Human-readable label for the subdivision in this locale (i18n key).
   * `'state'` for US, `'county'` for GB, `'prefecture'` for JP, etc.
   */
  readonly subdivisionLabel: string

  /**
   * Layout hint for renderers — `'inline'` puts subdivision and postal
   * code on the same line as locality (US/CA-style); `'block'` keeps
   * them on separate lines (JP/DE-style).
   */
  readonly subdivisionLayout: 'inline' | 'block'
}

/**
 * Universal default — used when a country has no canonical profile.
 * Conservative superset; renderers should hide empty fields.
 */
export const DEFAULT_ADDRESS_FORMAT: AddressFormat = {
  lineOrder: ['recipient', 'company', 'street1', 'street2', 'postalCode', 'locality', 'subdivision'],
  required: ['street1', 'locality', 'postalCode'],
  postalCodePattern: null,
  postalCodeLabel: 'address.postalCode',
  subdivisionLabel: 'address.region',
  subdivisionLayout: 'block',
}

/**
 * Per-country address-format table — only documented countries appear
 * here; the rest fall back to {@link DEFAULT_ADDRESS_FORMAT} via
 * {@link getAddressFormat}.
 */
export const ADDRESS_FORMATS: Readonly<Partial<Record<SupportedCountry, AddressFormat>>> = {
  // EU / EEA — postcode before locality, no subdivision (mostly).
  BG: {
    lineOrder: ['recipient', 'company', 'street1', 'street2', 'postalCode', 'locality'],
    required: ['street1', 'locality', 'postalCode'],
    postalCodePattern: /^\d{4}$/,
    postalCodeLabel: 'address.postalCode',
    subdivisionLabel: 'address.region',
    subdivisionLayout: 'block',
  },
  DE: {
    lineOrder: ['recipient', 'company', 'street1', 'street2', 'postalCode', 'locality'],
    required: ['street1', 'locality', 'postalCode'],
    postalCodePattern: /^\d{5}$/,
    postalCodeLabel: 'address.plz',
    subdivisionLabel: 'address.bundesland',
    subdivisionLayout: 'block',
  },
  FR: {
    lineOrder: ['recipient', 'company', 'street1', 'street2', 'postalCode', 'locality'],
    required: ['street1', 'locality', 'postalCode'],
    postalCodePattern: /^\d{5}$/,
    postalCodeLabel: 'address.codePostal',
    subdivisionLabel: 'address.region',
    subdivisionLayout: 'block',
  },

  // UK — postcode after city; no state.
  GB: {
    lineOrder: ['recipient', 'company', 'street1', 'street2', 'locality', 'subdivision', 'postalCode'],
    required: ['street1', 'locality', 'postalCode'],
    postalCodePattern: /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,
    postalCodeLabel: 'address.postcode',
    subdivisionLabel: 'address.county',
    subdivisionLayout: 'block',
  },

  // North America — city, state ZIP on one line.
  US: {
    lineOrder: ['recipient', 'company', 'street1', 'street2', 'locality', 'subdivision', 'postalCode'],
    required: ['street1', 'locality', 'subdivision', 'postalCode'],
    postalCodePattern: /^\d{5}(-\d{4})?$/,
    postalCodeLabel: 'address.zip',
    subdivisionLabel: 'address.state',
    subdivisionLayout: 'inline',
  },
  CA: {
    lineOrder: ['recipient', 'company', 'street1', 'street2', 'locality', 'subdivision', 'postalCode'],
    required: ['street1', 'locality', 'subdivision', 'postalCode'],
    postalCodePattern: /^[A-CEGHJ-NPR-TVXY]\d[A-CEGHJ-NPR-TV-Z]\s?\d[A-CEGHJ-NPR-TV-Z]\d$/i,
    postalCodeLabel: 'address.postalCode',
    subdivisionLabel: 'address.province',
    subdivisionLayout: 'inline',
  },

  // Asia-Pacific — postcode-first conventions vary.
  JP: {
    // 〒 postal code, then prefecture, city/ward, street block, recipient.
    lineOrder: ['postalCode', 'subdivision', 'locality', 'street1', 'street2', 'company', 'recipient'],
    required: ['street1', 'locality', 'subdivision', 'postalCode'],
    postalCodePattern: /^\d{3}-?\d{4}$/,
    postalCodeLabel: 'address.yubinBango',
    subdivisionLabel: 'address.prefecture',
    subdivisionLayout: 'block',
  },
  CN: {
    lineOrder: ['recipient', 'company', 'subdivision', 'locality', 'street1', 'street2', 'postalCode'],
    required: ['street1', 'locality', 'subdivision', 'postalCode'],
    postalCodePattern: /^\d{6}$/,
    postalCodeLabel: 'address.postalCode',
    subdivisionLabel: 'address.province',
    subdivisionLayout: 'block',
  },
  IN: {
    lineOrder: ['recipient', 'company', 'street1', 'street2', 'locality', 'subdivision', 'postalCode'],
    required: ['street1', 'locality', 'subdivision', 'postalCode'],
    postalCodePattern: /^\d{6}$/,
    postalCodeLabel: 'address.pin',
    subdivisionLabel: 'address.state',
    subdivisionLayout: 'inline',
  },
  AU: {
    lineOrder: ['recipient', 'company', 'street1', 'street2', 'locality', 'subdivision', 'postalCode'],
    required: ['street1', 'locality', 'subdivision', 'postalCode'],
    postalCodePattern: /^\d{4}$/,
    postalCodeLabel: 'address.postcode',
    subdivisionLabel: 'address.state',
    subdivisionLayout: 'inline',
  },
  NZ: {
    lineOrder: ['recipient', 'company', 'street1', 'street2', 'locality', 'postalCode'],
    required: ['street1', 'locality', 'postalCode'],
    postalCodePattern: /^\d{4}$/,
    postalCodeLabel: 'address.postcode',
    subdivisionLabel: 'address.region',
    subdivisionLayout: 'block',
  },
  SG: {
    lineOrder: ['recipient', 'company', 'street1', 'street2', 'locality', 'postalCode'],
    required: ['street1', 'postalCode'],
    postalCodePattern: /^\d{6}$/,
    postalCodeLabel: 'address.postalCode',
    subdivisionLabel: 'address.region',
    subdivisionLayout: 'block',
  },
  HK: {
    lineOrder: ['recipient', 'company', 'street1', 'street2', 'locality'],
    required: ['street1', 'locality'],
    postalCodePattern: null, // HK has no postal code system.
    postalCodeLabel: 'address.postalCode',
    subdivisionLabel: 'address.district',
    subdivisionLayout: 'block',
  },

  // Latin America.
  MX: {
    lineOrder: ['recipient', 'company', 'street1', 'street2', 'postalCode', 'locality', 'subdivision'],
    required: ['street1', 'locality', 'subdivision', 'postalCode'],
    postalCodePattern: /^\d{5}$/,
    postalCodeLabel: 'address.codigoPostal',
    subdivisionLabel: 'address.estado',
    subdivisionLayout: 'block',
  },
  BR: {
    lineOrder: ['recipient', 'company', 'street1', 'street2', 'locality', 'subdivision', 'postalCode'],
    required: ['street1', 'locality', 'subdivision', 'postalCode'],
    postalCodePattern: /^\d{5}-?\d{3}$/,
    postalCodeLabel: 'address.cep',
    subdivisionLabel: 'address.estado',
    subdivisionLayout: 'inline',
  },
}

/**
 * Resolve the address format for a country code, falling back to
 * {@link DEFAULT_ADDRESS_FORMAT} for countries without a canonical
 * profile.
 */
export function getAddressFormat(country?: string | null): AddressFormat {
  if (typeof country !== 'string' || country.length === 0) return DEFAULT_ADDRESS_FORMAT
  const upper = country.toUpperCase() as SupportedCountry
  return ADDRESS_FORMATS[upper] ?? DEFAULT_ADDRESS_FORMAT
}

/**
 * Validate a postal code against a country's pattern.
 * Returns `true` when the country has no pattern (any value accepted)
 * or when the code matches; `false` when the code is non-empty and
 * fails the pattern.
 */
export function isValidPostalCode(country: string | null | undefined, code: string | null | undefined): boolean {
  const fmt = getAddressFormat(country)
  if (!fmt.postalCodePattern) return true
  if (typeof code !== 'string' || code.length === 0) return false
  return fmt.postalCodePattern.test(code.trim())
}

/**
 * Return the components a country requires the user to provide for a
 * valid address. Useful for marking admin-UI fields as `required`.
 */
export function requiredAddressFields(country?: string | null): readonly AddressComponent[] {
  return getAddressFormat(country).required
}
