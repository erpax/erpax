import { describe, it, expect } from 'vitest'
import {
  VAT_CATEGORY_CODES,
  VAT_CATEGORY_LABEL,
  VAT_CATEGORY_OPTIONS,
  requiresVatRate,
  requiresExemptionReason,
  isVatCategoryCode,
} from '@/un/cefact/5305'

// UN/CEFACT 5305 in the EN-16931 EU VAT context: exactly the nine codes
// EN-16931 admits, and the category code determines whether a VAT rate
// and/or an exemption reason are required (the SKILL law).
describe('un/cefact/5305 — duty/tax/fee category code (EN-16931 subset)', () => {
  it('admits exactly the nine EN-16931 codes', () => {
    expect([...VAT_CATEGORY_CODES]).toEqual(['S', 'Z', 'E', 'AE', 'K', 'G', 'O', 'L', 'M'])
    expect(VAT_CATEGORY_CODES).toHaveLength(9)
    expect(new Set(VAT_CATEGORY_CODES).size).toBe(9)
  })

  it('labels every code, prefixed with the code itself', () => {
    for (const code of VAT_CATEGORY_CODES) {
      expect(VAT_CATEGORY_LABEL[code].startsWith(code)).toBe(true)
    }
  })

  it('options mirror the codes 1:1', () => {
    expect(VAT_CATEGORY_OPTIONS).toHaveLength(9)
    expect(VAT_CATEGORY_OPTIONS.map((o) => o.value)).toEqual([...VAT_CATEGORY_CODES])
    for (const opt of VAT_CATEGORY_OPTIONS) {
      expect(opt.label).toBe(VAT_CATEGORY_LABEL[opt.value])
    }
  })

  it('requiresVatRate is true only for S, L, M (positive-rate codes)', () => {
    const need = VAT_CATEGORY_CODES.filter((c) => requiresVatRate(c))
    expect([...need]).toEqual(['S', 'L', 'M'])
    expect(requiresVatRate('S')).toBe(true)
    expect(requiresVatRate('Z')).toBe(false)
  })

  it('requiresExemptionReason is true only for E, AE, K, G, O', () => {
    const need = VAT_CATEGORY_CODES.filter((c) => requiresExemptionReason(c))
    expect([...need]).toEqual(['E', 'AE', 'K', 'G', 'O'])
    expect(requiresExemptionReason('AE')).toBe(true)
    expect(requiresExemptionReason('S')).toBe(false)
  })

  it('rate-requiring and reason-requiring sets are mutually exclusive', () => {
    for (const code of VAT_CATEGORY_CODES) {
      expect(requiresVatRate(code) && requiresExemptionReason(code)).toBe(false)
    }
  })

  it('isVatCategoryCode narrows the nine valid codes and rejects others', () => {
    for (const code of VAT_CATEGORY_CODES) expect(isVatCategoryCode(code)).toBe(true)
    expect(isVatCategoryCode('s')).toBe(false) // case-sensitive
    expect(isVatCategoryCode('X')).toBe(false)
    expect(isVatCategoryCode('')).toBe(false)
    expect(isVatCategoryCode(0)).toBe(false)
    expect(isVatCategoryCode(null)).toBe(false)
  })
})
