/**
 * IBAN — ISO 13616-1:2020 parser, validator, and country extractor.
 *
 * Single source of truth for IBAN handling. Used by:
 *   - BankAccounts.beforeChange — derive `country` from `iban`
 *   - BankTransactions — normalise counterparty IBAN
 *   - country-context.service — route bank-account → country APIs
 *
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-7064:2003 mod-97-10 check-digits
 * @see ./services/country-context.ts
 */

/** IBAN length per ISO-3166-1 alpha-2 country code, per the EBA registry. */
export const IBAN_LENGTH: Readonly<Record<string, number>> = {
  AD: 24, AE: 23, AL: 28, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22,
  BR: 29, BY: 28, CH: 21, CR: 22, CY: 28, CZ: 24, DE: 22, DK: 18, DO: 28,
  EE: 20, ES: 24, FI: 18, FO: 18, FR: 27, GB: 22, GE: 22, GI: 23, GL: 18,
  GR: 27, GT: 28, HR: 21, HU: 28, IE: 22, IL: 23, IS: 26, IT: 27, JO: 30,
  KW: 30, KZ: 20, LB: 28, LC: 32, LI: 21, LT: 20, LU: 20, LV: 21, MC: 27,
  MD: 24, ME: 22, MK: 19, MR: 27, MT: 31, MU: 30, NL: 18, NO: 15, PK: 24,
  PL: 28, PS: 29, PT: 25, QA: 29, RO: 24, RS: 22, SA: 24, SC: 31, SE: 24,
  SI: 19, SK: 24, SM: 27, ST: 25, SV: 28, TL: 23, TN: 24, TR: 26, UA: 29,
  VA: 22, VG: 24, XK: 20,
}

/** Strip whitespace and uppercase. */
export function normaliseIban(raw: string): string {
  return raw.replace(/\s+/g, '').toUpperCase()
}

/**
 * Extract the ISO 3166-1 alpha-2 country code from the leading 2 chars of
 * an IBAN. Returns `null` for strings shorter than 2 chars or non-alpha
 * leading bytes.
 */
export function extractIbanCountry(raw: string | null | undefined): string | null {
  if (!raw) return null
  const i = normaliseIban(raw)
  if (i.length < 2) return null
  const cc = i.slice(0, 2)
  return /^[A-Z]{2}$/.test(cc) ? cc : null
}

/**
 * Check whether an IBAN parses, has the right country-specific length, and
 * passes the ISO 7064 mod-97-10 check. Returns `false` for any malformed
 * input — never throws.
 */
export function isValidIban(raw: string | null | undefined): boolean {
  if (!raw) return false
  const i = normaliseIban(raw)
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(i)) return false
  const cc = i.slice(0, 2)
  const expectedLen = IBAN_LENGTH[cc]
  if (typeof expectedLen === 'number' && i.length !== expectedLen) return false
  // Move first 4 chars to end, replace letters by their numeric position
  // (A=10, B=11, …, Z=35), then mod-97 must equal 1.
  const rearranged = i.slice(4) + i.slice(0, 4)
  let expanded = ''
  for (const ch of rearranged) {
    expanded += /[A-Z]/.test(ch) ? (ch.charCodeAt(0) - 55).toString() : ch
  }
  // Big-number mod-97 in chunks (avoid BigInt for hot-path simplicity).
  let remainder = 0
  for (let pos = 0; pos < expanded.length; pos += 7) {
    const part = remainder.toString() + expanded.slice(pos, pos + 7)
    remainder = Number(part) % 97
  }
  return remainder === 1
}
