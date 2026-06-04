/**
 * ISO 3166-1 country-code validators.
 *
 * @standard ISO-3166-1:2020 country-codes
 * @see https://www.iso.org/iso-3166-country-codes.html
 */

const RE_ALPHA2 = /^[A-Z]{2}$/
const RE_ALPHA3 = /^[A-Z]{3}$/

/**
 * ISO 3166-1 alpha-2: 2-letter uppercase country code (e.g. US, DE, GB).
 *
 * @standard ISO-3166-1:2020 §6 alpha-2
 */
export const isIso3166Alpha2 = (s: unknown): s is string =>
  typeof s === 'string' && RE_ALPHA2.test(s)

/**
 * ISO 3166-1 alpha-3: 3-letter uppercase country code (e.g. USA, DEU, GBR).
 *
 * @standard ISO-3166-1:2020 §7 alpha-3
 */
export const isIso3166Alpha3 = (s: unknown): s is string =>
  typeof s === 'string' && RE_ALPHA3.test(s)
