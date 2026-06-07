import { describe, it, expect } from 'vitest'
import {
  isLeaseClassification,
  isLeaseStatus,
  isDiscountRateBasis,
  isPaymentFrequency,
  isPaymentTiming,
  isLeaseModificationKind,
  qualifiesForShortTermExemption,
} from '@/ifrs/16'

// IFRS 16 / ASC 842 — the canonical lessee enum guards plus the §5(a)
// short-term recognition-exemption predicate. The classification union
// cannot drift, and the exemption is exactly: term ≤ 12 months AND no
// reasonably-certain purchase option.
describe('ifrs/16 — lessee enum guards', () => {
  it('isLeaseClassification accepts finance/operating/short_term/low_value', () => {
    expect(isLeaseClassification('finance')).toBe(true)
    expect(isLeaseClassification('operating')).toBe(true)
    expect(isLeaseClassification('short_term')).toBe(true)
    expect(isLeaseClassification('low_value')).toBe(true)
    expect(isLeaseClassification('capital')).toBe(false)
    expect(isLeaseClassification(undefined)).toBe(false)
  })

  it('isLeaseStatus accepts the lifecycle states', () => {
    for (const s of ['draft', 'active', 'modified', 'terminated', 'expired']) {
      expect(isLeaseStatus(s)).toBe(true)
    }
    expect(isLeaseStatus('cancelled')).toBe(false)
  })

  it('isDiscountRateBasis accepts §26 rate-implicit vs incremental-borrowing', () => {
    expect(isDiscountRateBasis('rate_implicit')).toBe(true)
    expect(isDiscountRateBasis('incremental_borrowing')).toBe(true)
    expect(isDiscountRateBasis('risk_free')).toBe(false)
  })

  it('isPaymentFrequency accepts the four cadences', () => {
    for (const f of ['monthly', 'quarterly', 'semi_annually', 'annually']) {
      expect(isPaymentFrequency(f)).toBe(true)
    }
    expect(isPaymentFrequency('weekly')).toBe(false)
  })

  it('isPaymentTiming accepts in_advance / in_arrears', () => {
    expect(isPaymentTiming('in_advance')).toBe(true)
    expect(isPaymentTiming('in_arrears')).toBe(true)
    expect(isPaymentTiming('mid_period')).toBe(false)
    expect(isPaymentTiming(0)).toBe(false)
  })

  it('isLeaseModificationKind accepts the §44-§46 modification kinds', () => {
    for (const k of [
      'scope_increase_separate',
      'scope_increase_combined',
      'term_extension',
      'term_reduction',
      'payment_change',
      'discount_rate_reset',
    ]) {
      expect(isLeaseModificationKind(k)).toBe(true)
    }
    expect(isLeaseModificationKind('renewal')).toBe(false)
  })
})

describe('ifrs/16 — §5(a) short-term recognition exemption', () => {
  it('qualifies at term ≤ 12 months with no certain purchase option', () => {
    expect(qualifiesForShortTermExemption(12, false)).toBe(true)
    expect(qualifiesForShortTermExemption(1, false)).toBe(true)
  })

  it('does not qualify when the term exceeds 12 months', () => {
    expect(qualifiesForShortTermExemption(13, false)).toBe(false)
    expect(qualifiesForShortTermExemption(24, false)).toBe(false)
  })

  it('does not qualify when a purchase option is reasonably certain', () => {
    expect(qualifiesForShortTermExemption(12, true)).toBe(false)
    expect(qualifiesForShortTermExemption(6, true)).toBe(false)
  })

  it('12 months is the inclusive boundary; 12.5 is over', () => {
    expect(qualifiesForShortTermExemption(12, false)).toBe(true)
    expect(qualifiesForShortTermExemption(12.5, false)).toBe(false)
  })
})
