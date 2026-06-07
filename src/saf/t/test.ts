import { describe, it, expect } from 'vitest'
import {
  isSafTSourceDocumentType,
  isSafTPaymentMechanism,
  isBalancedGeneralLedger,
} from '@/saf/t'

// Law: SAF-T owns one canonical set of types for the four top-level sections;
// the runtime guards validate the OECD SAF-T 2.0 enums and the GL balance
// invariant tax authorities reject files for.
describe('saf/t — source-document + payment guards, GL balance', () => {
  it('isSafTSourceDocumentType', () => {
    expect(isSafTSourceDocumentType('sales_invoice')).toBe(true)
    expect(isSafTSourceDocumentType('purchase_invoice')).toBe(true)
    expect(isSafTSourceDocumentType('payment')).toBe(true)
    expect(isSafTSourceDocumentType('movement_of_goods')).toBe(true)
    expect(isSafTSourceDocumentType('credit_note')).toBe(false)
    expect(isSafTSourceDocumentType(null)).toBe(false)
  })

  it('isSafTPaymentMechanism (OECD code list)', () => {
    expect(isSafTPaymentMechanism('TB')).toBe(true) // bank transfer
    expect(isSafTPaymentMechanism('NU')).toBe(true) // cash
    expect(isSafTPaymentMechanism('CC')).toBe(true) // credit card
    expect(isSafTPaymentMechanism('ZZ')).toBe(false)
    expect(isSafTPaymentMechanism(undefined)).toBe(false)
  })

  it('isBalancedGeneralLedger — Σ debits must equal Σ credits', () => {
    expect(isBalancedGeneralLedger({ totalDebit: 1000, totalCredit: 1000 })).toBe(true)
    expect(isBalancedGeneralLedger({ totalDebit: 0, totalCredit: 0 })).toBe(true)
    expect(isBalancedGeneralLedger({ totalDebit: 1000, totalCredit: 999.99 })).toBe(false)
  })
})
