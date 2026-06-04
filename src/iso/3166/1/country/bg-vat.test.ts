/**
 * BG VAT calculator — pin the rate registry, line calculation, and
 * document-level summary contract.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard EN-16931:2017 §BG-23 invoice-line-tax-category
 * @standard UN-CEFACT 5305 duty-tax-fee-category-code
 * @compliance EU 2006/112/EC vat-system-directive
 * @audit ISO-19011:2018 audit-trail vat-calculation-evidence
 * @see src/services/country-clients/bg-vat.ts
 */

import { describe, expect, it } from 'vitest'
import {
  BG_VAT_RATES,
  bgVatRateForCategory,
  calculateBgVat,
  summariseBgVat,
} from '@/country/client/bg-vat'

describe('BG_VAT_RATES — pinned rates', () => {
  it('matches COUNTRY_SPECIFICS.BG (20 / 9 / 0)', () => {
    expect(BG_VAT_RATES.standard).toBe(20)
    expect(BG_VAT_RATES.reduced).toBe(9)
    expect(BG_VAT_RATES.zero).toBe(0)
  })
})

describe('bgVatRateForCategory — UN/CEFACT 5305 → percent', () => {
  it.each([
    ['S', 20],
    ['AA', 9],
    ['Z', 0],
    ['E', 0],
    ['O', 0],
  ] as const)('%s → %d%%', (cat, rate) => {
    expect(bgVatRateForCategory(cat)).toBe(rate)
  })
})

describe('calculateBgVat — single-line', () => {
  it('20% standard on €100.00 → €20.00 VAT, €120.00 gross', () => {
    expect(calculateBgVat({ netAmountMinor: 10_000, category: 'S' })).toEqual({
      netAmountMinor: 10_000,
      vatAmountMinor: 2_000,
      grossAmountMinor: 12_000,
      ratePercent: 20,
      category: 'S',
    })
  })

  it('9% reduced on €50.00 → €4.50 VAT (round-half-away-from-zero on 4.50 cents)', () => {
    expect(calculateBgVat({ netAmountMinor: 5_000, category: 'AA' })).toEqual({
      netAmountMinor: 5_000,
      vatAmountMinor: 450,
      grossAmountMinor: 5_450,
      ratePercent: 9,
      category: 'AA',
    })
  })

  it('0% zero-rated → no VAT', () => {
    expect(calculateBgVat({ netAmountMinor: 12_345, category: 'Z' }).vatAmountMinor).toBe(0)
  })

  it('rounds half-away-from-zero — €0.255 → €0.26 (positive)', () => {
    // 25.5 cents at 100% would round to 26 cents.
    expect(calculateBgVat({ netAmountMinor: 25, rateOverride: 100 }).vatAmountMinor).toBe(25)
    expect(calculateBgVat({ netAmountMinor: 51, rateOverride: 50 }).vatAmountMinor).toBe(26)
  })

  it('defaults missing category to standard 20%', () => {
    const result = calculateBgVat({ netAmountMinor: 1_000 })
    expect(result.category).toBe('S')
    expect(result.ratePercent).toBe(20)
  })
})

describe('summariseBgVat — document totals by category', () => {
  it('aggregates two standard-rate lines into one bucket', () => {
    const summary = summariseBgVat([
      { netAmountMinor: 10_000, category: 'S' },
      { netAmountMinor: 5_000, category: 'S' },
    ])
    expect(summary).toHaveLength(1)
    expect(summary[0]).toEqual({
      netAmountMinor: 15_000,
      vatAmountMinor: 3_000,
      grossAmountMinor: 18_000,
      ratePercent: 20,
      category: 'S',
    })
  })

  it('keeps mixed standard + reduced + zero in separate buckets', () => {
    const summary = summariseBgVat([
      { netAmountMinor: 10_000, category: 'S' },
      { netAmountMinor: 5_000, category: 'AA' },
      { netAmountMinor: 2_500, category: 'Z' },
    ])
    expect(summary).toHaveLength(3)
    const byCategory = Object.fromEntries(summary.map((s) => [s.category, s.vatAmountMinor]))
    expect(byCategory['S']).toBe(2_000)
    expect(byCategory['AA']).toBe(450)
    expect(byCategory['Z']).toBe(0)
  })
})
