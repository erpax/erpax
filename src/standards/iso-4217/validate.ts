/**
 * ISO 4217 currency-code validator.
 *
 * @standard ISO-4217:2015 currency-codes
 * @see https://www.iso.org/iso-4217-currency-codes.html
 */

const RE_ISO_4217 = /^[A-Z]{3}$/

/**
 * ISO 4217 §5: 3-letter uppercase alphabetic currency code (e.g. USD, EUR, JPY).
 *
 * Regex-only check; full enumeration lives in `Intl.supportedValuesOf('currency')`
 * (ECMA-402) at runtime — we deliberately do not ship a frozen code table.
 *
 * @standard ISO-4217:2015 §5 alphabetic-codes
 */
export const isIso4217 = (s: unknown): s is string =>
  typeof s === 'string' && RE_ISO_4217.test(s)
