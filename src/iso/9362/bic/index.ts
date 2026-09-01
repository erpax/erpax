/**
 * ISO 9362 BIC / SWIFT validator.
 *
 * @standard ISO-9362:2022 bic
 * @see https://www.iso.org/standard/81111.html
 */

const RE_SWIFT_BIC = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/

/**
 * ISO 9362 BIC: 8 or 11 chars, structure `<institution:4A><country:2A><location:2AN>[<branch:3AN>]`.
 *
 * Regex-only structural check; existence of the institution/branch is an
 * external SWIFT registry lookup, not validated here.
 *
 * @standard ISO-9362:2022 §6 structure
 */
export const isSwiftBic = (s: unknown): s is string =>
  typeof s === 'string' && RE_SWIFT_BIC.test(s)
