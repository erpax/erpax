import { describe, it, expect } from 'vitest'
import {
  isInvoiceTypeCode,
  isVatCategoryCode,
  isPaymentMeansCode,
} from '@/en/16931'

// Law: EN 16931 is the EU's semantic data model of the core e-invoice;
// the runtime guards validate the UN/CEFACT code-list subsets the model uses.
describe('en/16931 — code-list runtime guards', () => {
  it('isInvoiceTypeCode (BT-3 / UN-CEFACT 1001 subset)', () => {
    expect(isInvoiceTypeCode('380')).toBe(true) // commercial invoice
    expect(isInvoiceTypeCode('381')).toBe(true) // credit note
    expect(isInvoiceTypeCode('326')).toBe(true) // partial invoice
    expect(isInvoiceTypeCode('999')).toBe(false)
    expect(isInvoiceTypeCode('')).toBe(false)
    expect(isInvoiceTypeCode(380)).toBe(false)
  })

  it('isVatCategoryCode (BT-151 / UN-CEFACT 5305 subset)', () => {
    expect(isVatCategoryCode('S')).toBe(true) // standard rate
    expect(isVatCategoryCode('Z')).toBe(true) // zero rated
    expect(isVatCategoryCode('AE')).toBe(true) // reverse charge
    expect(isVatCategoryCode('X')).toBe(false)
    expect(isVatCategoryCode('s')).toBe(false) // case-sensitive
    expect(isVatCategoryCode(null)).toBe(false)
  })

  it('isPaymentMeansCode (BT-81 / UN-CEFACT 4461 subset)', () => {
    expect(isPaymentMeansCode('30')).toBe(true) // credit transfer
    expect(isPaymentMeansCode('58')).toBe(true) // SEPA credit transfer
    expect(isPaymentMeansCode('10')).toBe(true) // in cash
    expect(isPaymentMeansCode('00')).toBe(false)
    expect(isPaymentMeansCode(undefined)).toBe(false)
  })

  it('narrows the type on accept', () => {
    const v: unknown = '380'
    if (isInvoiceTypeCode(v)) {
      expect(v).toBe('380')
    } else {
      throw new Error('expected 380 to be a valid invoice type code')
    }
  })
})
