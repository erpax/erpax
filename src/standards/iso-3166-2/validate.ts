/**
 * ISO 3166-2 subdivision-code validator.
 *
 * @standard ISO-3166-2:2020 subdivision-codes
 * @see https://www.iso.org/standard/72483.html
 */

const RE_ISO_3166_2 = /^[A-Z]{2}-[A-Z0-9]{1,3}$/

/**
 * ISO 3166-2: country code (alpha-2) + `-` + 1..3 alphanumeric subdivision
 * (e.g. `US-CA`, `DE-BY`, `AU-NSW`).
 *
 * Note: ISO 3166-2 subdivision lengths vary by country (1..3); the regex is
 * deliberately permissive and does not validate that the subdivision is a
 * known one for that country — that is a runtime data-table concern.
 *
 * @standard ISO-3166-2:2020 §5 code-element
 */
export const isIso3166_2 = (s: unknown): s is string =>
  typeof s === 'string' && RE_ISO_3166_2.test(s)
