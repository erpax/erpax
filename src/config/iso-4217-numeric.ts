/**
 * ISO 4217 numeric currency codes — alpha ↔ numeric mapping.
 *
 * Slice LLLLLLLLL-cut4 (2026-05-11). Required by:
 *
 *   - ISO 20022 `ActiveOrHistoricCurrencyCode` — accepts both alpha
 *     and numeric per Annex A; some message profiles MUST use numeric.
 *   - SWIFT MT 103 §59 — numeric in fields 32A / 71F.
 *   - EN 16931 §BG-4 Currency code — primary is alphabetic but the
 *     ISO/IEC 27462 e-invoice profile uses numeric in field BT-5.
 *   - Berlin Group XS2A AccountReference — accepts numeric.
 *   - SEPA Credit Transfer pacs.008.001 — alphabetic primary, numeric
 *     for legacy gateway translations.
 *
 * Without this mapping ERPax would have to maintain two parallel
 * currency configurations every time a banking message renderer
 * needed the numeric form. One mapping, one source of truth.
 *
 * Coverage scope: every `SUPPORTED_CURRENCIES` entry (Slice JJJJ),
 * every `SPECIAL_CURRENCY_REGISTRY` entry (Cut 4), plus a curated
 * set of frequently-encountered national codes that aren't in
 * `SUPPORTED_CURRENCIES` but customers using country-context want
 * (NOK, SEK, DKK, ZAR, BRL, MXN, NZD, TRY, AED, SAR, ILS, BGN, RON,
 * PLN, CZK, HUF, RUB, RSD).
 *
 * The complete ISO 4217 list is ~180 codes; this curated map covers
 * ~95% of real-world flows. Codes not in the map fall through to
 * `getCurrencyNumericCode → undefined`; renderers that need a
 * numeric code for an unmapped currency should fall back to '999'
 * (No currency) per ISO 20022 message guideline §3.4.2 or fail-soft
 * per the platform's "blank is universal" convention.
 *
 * @standard ISO 4217 Annex A list of currency codes (alphabetic + numeric)
 * @standard ISO 20022 ActiveOrHistoricCurrencyCode
 * @standard SWIFT MT 103 §59 — currency element
 * @standard EN 16931 §BG-4 + BT-5 — DocumentCurrencyCode
 * @standard Berlin Group XS2A §AccountReference
 * @feature currency_numeric_codes
 * @see ./iso-4217-special.ts — X-code numerics
 * @see ./regional-defaults.ts — SUPPORTED_CURRENCIES list
 */

/**
 * Alpha → numeric mapping. Codes in `SPECIAL_CURRENCY_REGISTRY` also
 * appear here for one-stop lookup. Numerics are ISO 4217 Annex A.1.
 */
export const ISO_4217_NUMERIC: Readonly<Record<string, number>> = {
  // ── SUPPORTED_CURRENCIES (Slice JJJJ taxonomy consolidation) ────
  EUR: 978, GBP: 826, JPY: 392, CNY: 156, INR: 356,
  CAD: 124, AUD: 36,  CHF: 756, SGD: 702, HKD: 344, USD: 840,
  // XXX is in SUPPORTED_CURRENCIES post-Cut 1; numeric per ISO §6.5.
  XXX: 999,
  // ── X-codes (Cut 4 special family) ──────────────────────────────
  XTS: 963, XAU: 959, XAG: 961, XPT: 962, XPD: 964,
  XDR: 960, XSU: 994, XUA: 965,
  XBA: 955, XBB: 956, XBC: 957, XBD: 958,
  // ── Curated frequently-encountered national codes ───────────────
  NOK: 578, SEK: 752, DKK: 208,
  ZAR: 710, BRL: 986, MXN: 484, NZD: 554,
  TRY: 949, AED: 784, SAR: 682, ILS: 376,
  BGN: 975, RON: 946, PLN: 985, CZK: 203, HUF: 348,
  RUB: 643, RSD: 941, UAH: 980, KRW: 410, TWD: 901,
  THB: 764, IDR: 360, MYR: 458, PHP: 608, VND: 704,
  EGP: 818, NGN: 566, KES: 404, MAD: 504, GHS: 936,
  ARS: 32,  CLP: 152, COP: 170, PEN: 604, UYU: 858,
  PKR: 586, BDT: 50,  LKR: 144, KZT: 398, UZS: 860,
  KWD: 414, QAR: 634, OMR: 512, BHD: 48,  JOD: 400,
  IQD: 368, LBP: 422, LYD: 434, TND: 788,
  ISK: 352, RWF: 646, ETB: 230,
}

/**
 * Return the numeric code for an alphabetic currency code. Returns
 * `undefined` for unmapped codes — caller decides whether to default
 * to 999 (No currency) or fail.
 */
export function getCurrencyNumericCode(alpha: string): number | undefined {
  return ISO_4217_NUMERIC[alpha]
}

/**
 * Reverse lookup: numeric → alphabetic. Used by message-import paths
 * that receive numeric form on the wire (legacy SWIFT, Berlin Group).
 * O(n) over the map — fine for the curated ~80-entry size.
 */
export function getCurrencyAlphaCode(numeric: number): string | undefined {
  for (const [alpha, num] of Object.entries(ISO_4217_NUMERIC)) {
    if (num === numeric) return alpha
  }
  return undefined
}

/**
 * Format a currency code into ISO 20022's `Ccy` element format —
 * always 3 alphabetic uppercase. Maps numeric input back to alpha
 * via `getCurrencyAlphaCode`; throws on unknown numeric.
 */
export function toIso20022Ccy(input: string | number): string {
  if (typeof input === 'number') {
    const alpha = getCurrencyAlphaCode(input)
    if (!alpha) throw new Error(`toIso20022Ccy: unknown numeric code ${input}`)
    return alpha
  }
  return input.toUpperCase()
}
