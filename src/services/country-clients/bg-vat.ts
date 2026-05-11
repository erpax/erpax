/**
 * BG VAT (ДДС) calculator + rate registry.
 *
 * Pinned rates from `COUNTRY_SPECIFICS.BG`:
 *   - Standard: 20%
 *   - Reduced:  9% (hospitality, tourism, books)
 *   - Zero:     0% (intra-community supplies, exports)
 *   - Exempt:   none (e-rated supplies use 0%)
 *
 * Cents-in / cents-out — never floating point currency. Round-half-away-
 * from-zero per BG НАП guidance (matches IFRS IAS-1 presentation rounding).
 *
 * @standard ISO-3166-1:2020 BG country-code
 * @standard ISO-4217:2015 currency-codes
 * @standard EN-16931:2017 §BG-23 invoice-line-tax-category
 * @standard UN-CEFACT 5305 duty-tax-fee-category-code
 * @compliance EU 2006/112/EC vat-system-directive
 * @accounting IFRS IAS-1 presentation-rounding
 * @audit ISO-19011:2018 audit-trail vat-calculation-evidence
 * @see ../../config/country-specifics.ts (BG.defaultVatRate / BG.reducedVatRates)
 */

/** EN-16931 / UN-CEFACT 5305 tax category codes used by BG. */
export type BgVatCategoryCode =
  | 'S'  // Standard rate (20%)
  | 'AA' // Reduced rate  (9%)
  | 'Z'  // Zero rated    (0% — intra-community / exports)
  | 'E'  // Exempt
  | 'O'  // Out of scope

/** BG VAT rates pinned to `COUNTRY_SPECIFICS.BG.defaultVatRate / reducedVatRates`. */
export const BG_VAT_RATES = {
  standard: 20,
  reduced: 9,
  zero: 0,
} as const

/** Resolve a UN/CEFACT tax category to its BG percentage rate. */
export function bgVatRateForCategory(category: BgVatCategoryCode): number {
  switch (category) {
    case 'S':
      return BG_VAT_RATES.standard
    case 'AA':
      return BG_VAT_RATES.reduced
    case 'Z':
    case 'E':
    case 'O':
      return BG_VAT_RATES.zero
  }
}

export interface BgVatLine {
  /** Net amount in minor units (cents). */
  readonly netAmountMinor: number
  /** UN/CEFACT 5305 tax category. Defaults to `'S'` (20% standard). */
  readonly category?: BgVatCategoryCode
  /** Optional explicit rate override (e.g. for historical re-pricing). */
  readonly rateOverride?: number
}

export interface BgVatResult {
  readonly netAmountMinor: number
  readonly vatAmountMinor: number
  readonly grossAmountMinor: number
  readonly ratePercent: number
  readonly category: BgVatCategoryCode
}

/**
 * Compute VAT on a single line. Cents-in / cents-out; rounding applied
 * at the line level per BG НАП guidance (round-half-away-from-zero).
 */
export function calculateBgVat(line: BgVatLine): BgVatResult {
  const category = line.category ?? 'S'
  const ratePercent = line.rateOverride ?? bgVatRateForCategory(category)
  const vatAmountMinor = roundHalfAwayFromZero((line.netAmountMinor * ratePercent) / 100)
  return {
    netAmountMinor: line.netAmountMinor,
    vatAmountMinor,
    grossAmountMinor: line.netAmountMinor + vatAmountMinor,
    ratePercent,
    category,
  }
}

/**
 * Compute the document-level VAT summary by category. Used by the
 * EN-16931 BG-23 line-tax-summary block on outbound e-invoices.
 */
export function summariseBgVat(lines: ReadonlyArray<BgVatLine>): ReadonlyArray<BgVatResult> {
  const buckets = new Map<string, BgVatResult>()
  for (const line of lines) {
    const result = calculateBgVat(line)
    const key = `${result.category}:${result.ratePercent}`
    const existing = buckets.get(key)
    if (existing) {
      buckets.set(key, {
        ...existing,
        netAmountMinor: existing.netAmountMinor + result.netAmountMinor,
        vatAmountMinor: existing.vatAmountMinor + result.vatAmountMinor,
        grossAmountMinor: existing.grossAmountMinor + result.grossAmountMinor,
      })
    } else {
      buckets.set(key, result)
    }
  }
  return [...buckets.values()]
}

function roundHalfAwayFromZero(value: number): number {
  return value >= 0 ? Math.floor(value + 0.5) : -Math.floor(-value + 0.5)
}
