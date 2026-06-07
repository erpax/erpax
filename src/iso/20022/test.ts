import { describe, it, expect } from 'vitest'
import {
  isBookingStatus,
  isCreditDebitIndicator,
  isChargeBearerCode,
  isBankTransactionCodeShape,
} from '@/iso/20022'

// ISO 20022 — runtime guards for the financial code lists.
describe('iso/20022 — code-list guards', () => {
  it('isBookingStatus accepts only BOOK/PDNG/INFO/FUTR', () => {
    expect(isBookingStatus('BOOK')).toBe(true)
    expect(isBookingStatus('FUTR')).toBe(true)
    expect(isBookingStatus('XXXX')).toBe(false)
    expect(isBookingStatus(123)).toBe(false)
  })

  it('isCreditDebitIndicator accepts only CRDT/DBIT', () => {
    expect(isCreditDebitIndicator('CRDT')).toBe(true)
    expect(isCreditDebitIndicator('DBIT')).toBe(true)
    expect(isCreditDebitIndicator('CR')).toBe(false)
  })

  it('isChargeBearerCode accepts only DEBT/CRED/SHAR/SLEV', () => {
    expect(isChargeBearerCode('SHAR')).toBe(true)
    expect(isChargeBearerCode('SLEV')).toBe(true)
    expect(isChargeBearerCode('shar')).toBe(false)
  })
})

describe('iso/20022 — bank transaction code shape', () => {
  it('requires three uppercase 4-letter components', () => {
    expect(isBankTransactionCodeShape({ domain: 'PMNT', family: 'ICDT', subFamily: 'ESCT' })).toBe(
      true,
    )
  })

  it('rejects non-4-letter or lowercase components and non-objects', () => {
    expect(isBankTransactionCodeShape({ domain: 'PMN', family: 'ICDT', subFamily: 'ESCT' })).toBe(
      false,
    )
    expect(isBankTransactionCodeShape({ domain: 'pmnt', family: 'ICDT', subFamily: 'ESCT' })).toBe(
      false,
    )
    expect(isBankTransactionCodeShape({ domain: 'PMNT', family: 'ICDT' })).toBe(false)
    expect(isBankTransactionCodeShape(null)).toBe(false)
    expect(isBankTransactionCodeShape('PMNT')).toBe(false)
  })
})
