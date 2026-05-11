/**
 * BG-22 IBAN parser — decomposes a Bulgarian IBAN into its BBAN components
 * (bank code / branch code / account type / account id).
 *
 * BG-22 layout (per BNB Регламент 3 / ISO-13616-1 §5.4 BG entry):
 *
 *   BG  2  BUIN  9999  XX  ABCDEFGH
 *   ┬─  ┬  ┬───  ┬───  ┬─  ┬───────
 *   │   │   │     │     │   └ 8-char alphanumeric account id
 *   │   │   │     │     └─── 2-digit account type (0-9 BNB-defined)
 *   │   │   │     └───────── 4-digit branch code (BNB BIC-derived)
 *   │   │   └─────────────── 4-char alphabetic bank id (BNB issued)
 *   │   └─────────────────── 2-digit ISO 7064 mod-97-10 check digits
 *   └─────────────────────── ISO-3166-1 alpha-2 country code 'BG'
 *
 * Total: 22 characters. Use {@link isIban} from `./iban.ts` for the
 * generic mod-97 check first; this module assumes the input is already
 * a valid IBAN and adds the BG-specific shape decomposition.
 *
 * @standard ISO-13616-1:2020 BG-22 iban-bulgaria
 * @standard ISO-7064:2003 mod-97-10 check-digits
 * @standard ISO-3166-1:2020 BG country-code
 * @standard BNB Регламент 3 §3 bank-account-numbering
 * @audit ISO-19011:2018 audit-trail bank-account-evidence
 * @see ./iban.ts
 */

import { isIban } from './iban'

/**
 * Decomposed BG-22 IBAN. Every field is the raw substring lifted from
 * the IBAN — no normalisation, no semantic lookup against the BNB bank
 * registry (that's the BANK_APIS catalogue's job).
 */
export interface BgIbanParts {
  /** ISO-3166-1 alpha-2 — always `'BG'` for this parser. */
  readonly country: 'BG'
  /** Two ISO-7064 check digits (positions 3-4). */
  readonly checkDigits: string
  /** 4-char alphabetic bank id (positions 5-8). */
  readonly bankCode: string
  /** 4-digit branch code (positions 9-12). */
  readonly branchCode: string
  /** 2-digit account type (positions 13-14). */
  readonly accountType: string
  /** 8-char alphanumeric account id (positions 15-22). */
  readonly accountId: string
}

const RE_BG_IBAN = /^BG\d{2}[A-Z]{4}\d{4}\d{2}[A-Z0-9]{8}$/

/**
 * True when `value` is a syntactically valid BG-22 IBAN that also passes
 * the mod-97-10 check.
 */
export function isBgIban(value: unknown): value is string {
  if (typeof value !== 'string') return false
  const stripped = value.replace(/\s+/g, '').toUpperCase()
  return RE_BG_IBAN.test(stripped) && isIban(stripped)
}

/**
 * Decompose a BG-22 IBAN into its BBAN parts. Returns `null` when the
 * input doesn't pass `isBgIban` (wrong country, wrong shape, bad check
 * digits, non-string input).
 */
export function parseBgIban(value: unknown): BgIbanParts | null {
  if (!isBgIban(value)) return null
  const s = value.replace(/\s+/g, '').toUpperCase()
  return {
    country: 'BG',
    checkDigits: s.slice(2, 4),
    bankCode: s.slice(4, 8),
    branchCode: s.slice(8, 12),
    accountType: s.slice(12, 14),
    accountId: s.slice(14, 22),
  }
}
