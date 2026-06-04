/**
 * VAT tax-group tests — the Наредба Н-18 (Приложение № 1) rate→group mapping.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §Приложение-1 fiscal-device-tax-groups
 * @see src/standards/naredba-n-18/vat-groups.ts
 */

import { describe, it, expect } from 'vitest'
import { bgTaxGroupForRate, BG_TAX_GROUP_RATE, type BgTaxGroup } from '@/naredba/n/18/vat-groups'

describe('bgTaxGroupForRate', () => {
  it('maps the three statutory rates to А/Г/Б', () => {
    expect(bgTaxGroupForRate(0)).toBe('А') // zero-rated / exempt
    expect(bgTaxGroupForRate(9)).toBe('Г') // reduced
    expect(bgTaxGroupForRate(20)).toBe('Б') // standard
  })

  it('routes an unknown rate to the standard group Б (identity default)', () => {
    expect(bgTaxGroupForRate(5)).toBe('Б')
  })
})

describe('BG_TAX_GROUP_RATE', () => {
  it('declares the nominal rate per group (В is the 20% fuel group)', () => {
    const expected: Record<BgTaxGroup, number> = { А: 0, Б: 20, В: 20, Г: 9 }
    expect(BG_TAX_GROUP_RATE).toEqual(expected)
  })
})
