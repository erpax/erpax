/**
 * ISO 13616 IBAN validator with ISO 7064 mod-97 checksum.
 *
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-7064:2003 check-character-systems mod-97-10
 * @see https://www.iso.org/standard/81090.html
 */

const RE_IBAN = /^[A-Z]{2}\d{2}[A-Z0-9]{4,30}$/

/**
 * ISO 13616-1 IBAN. Length and checksum verified per the standard's
 * mod-97 rule (ISO 7064): rearrange `<BBAN><CountryCode><Check>`,
 * convert letters → digits (`A=10`, `B=11`, …, `Z=35`), and confirm
 * `value mod 97 == 1`.
 *
 * Whitespace is stripped and letters upper-cased before checking.
 *
 * @standard ISO-13616-1:2020 §6 verification
 * @standard ISO-7064:2003 mod-97-10
 */
export function isIban(s: unknown): s is string {
  if (typeof s !== 'string') return false
  const stripped = s.replace(/\s+/g, '').toUpperCase()
  if (!RE_IBAN.test(stripped)) return false
  // Move 4 chars to the back, then check mod 97 == 1.
  const rearranged = stripped.slice(4) + stripped.slice(0, 4)
  const numeric = rearranged.replace(/[A-Z]/g, (c) => String(c.charCodeAt(0) - 55))
  // Long-mod 97 (string-streaming to avoid bigint overhead).
  let r = 0
  for (const ch of numeric) {
    r = (r * 10 + Number(ch)) % 97
  }
  return r === 1
}
