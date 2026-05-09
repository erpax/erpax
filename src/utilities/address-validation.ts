/**
 * Canonical address validator — country-aware required fields and
 * postal-code format checks.
 *
 * Reads the per-country format from `@/config/address-formats`:
 *   - **Required components** vary by country (US/CA require state,
 *     BG/DE/FR don't; HK has no postal code at all).
 *   - **Postal-code pattern** varies (US `\d{5}(-\d{4})?`, GB
 *     alphanumeric, JP `\d{3}-?\d{4}`, etc.).
 *
 * Returns an array of human-readable error messages — empty array
 * means the address is valid for its declared country. Drop the
 * messages straight into a Payload `beforeValidate` `throw new Error`
 * or surface them in admin UI.
 *
 * @standard ISO-19160-4:2017 addressing components-and-conceptual-model
 * @standard UPU-S42 international-postal-addressing
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @compliance GDPR Art.5(1)(c) data-minimisation collect-only-fields-the-format-requires
 * @audit ISO-19011:2018 audit-trail address-validation
 * @see src/config/address-formats.ts
 */

import {
  type AddressComponent,
  getAddressFormat,
  isValidPostalCode,
} from '@/config/address-formats'

/**
 * Bare-minimum address shape — every renderer / validator works against
 * this superset. Fields not present in a country's format are ignored
 * (and should be hidden in admin UI).
 */
export interface AddressLike {
  recipient?: string | null
  company?: string | null
  street1?: string | null
  /** Maps to the Payload ecommerce plugin's `addressLine1` field. */
  addressLine1?: string | null
  street2?: string | null
  /** Maps to `addressLine2`. */
  addressLine2?: string | null
  /** Maps to `city`. */
  locality?: string | null
  city?: string | null
  /** Maps to `state` — actual label varies by country (state/province/prefecture/…). */
  subdivision?: string | null
  state?: string | null
  postalCode?: string | null
  country?: string | null
}

/**
 * Coalesce the various plugin/collection field-name aliases to the
 * canonical {@link AddressComponent} keys.
 */
function coerceComponent(addr: AddressLike, c: AddressComponent): string | null | undefined {
  switch (c) {
    case 'recipient':
      return addr.recipient
    case 'company':
      return addr.company
    case 'street1':
      return addr.street1 ?? addr.addressLine1
    case 'street2':
      return addr.street2 ?? addr.addressLine2
    case 'locality':
      return addr.locality ?? addr.city
    case 'subdivision':
      return addr.subdivision ?? addr.state
    case 'postalCode':
      return addr.postalCode
  }
}

export interface AddressValidationResult {
  /** True if the address has no errors for its declared country. */
  valid: boolean
  /** Human-readable error messages — one per failed check. */
  errors: string[]
  /** Canonical components that are required-but-missing. */
  missing: AddressComponent[]
}

/**
 * Validate an address against the canonical format for its country.
 *
 * Skips validation when no country is set (the address is treated as
 * draft-state until a country is chosen). To force a country, pass
 * a `fallbackCountry` string.
 */
export function validateAddress(
  addr: AddressLike,
  fallbackCountry?: string,
): AddressValidationResult {
  const country = (addr.country ?? fallbackCountry ?? '').toString().trim()
  if (country.length === 0) {
    return { valid: true, errors: [], missing: [] }
  }

  const format = getAddressFormat(country)
  const errors: string[] = []
  const missing: AddressComponent[] = []

  for (const required of format.required) {
    const value = coerceComponent(addr, required)
    if (typeof value !== 'string' || value.trim().length === 0) {
      missing.push(required)
      errors.push(`Address: '${required}' is required for ${country.toUpperCase()}.`)
    }
  }

  const postal = addr.postalCode
  if (typeof postal === 'string' && postal.trim().length > 0) {
    if (!isValidPostalCode(country, postal)) {
      errors.push(
        `Address: '${postal}' does not match the postal-code format for ${country.toUpperCase()}.`,
      )
    }
  }

  return { valid: errors.length === 0, errors, missing }
}
