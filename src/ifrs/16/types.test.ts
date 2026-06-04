/**
 * IFRS 16 / ASC 842 — canonical lease accounting types tests.
 *
 * Exercises the runtime guards + asserts the lessee-model fixtures map
 * cleanly onto the canonical type surface (Lease + RouAsset +
 * LeaseLiability + LeasePayment + LeaseModification + classification +
 * lifecycle status + recognition-exemption predicate).
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @accounting IFRS IFRS-16 leases
 * @accounting US-GAAP ASC-842-20 lessee-accounting
 * @audit ISO-19011:2018 audit-trail
 */

import { describe, it, expect } from 'vitest'
import {
  isLeaseClassification,
  isLeaseStatus,
  isDiscountRateBasis,
  isPaymentFrequency,
  isPaymentTiming,
  isLeaseModificationKind,
  qualifiesForShortTermExemption,
  type Lease,
  type LeaseClassification,
  type LeaseModificationKind,
  type LeasePayment,
  type RouAsset,
  type LeaseLiability,
} from '@/ifrs/16'

describe('IFRS 16 — runtime guards', () => {
  it('isLeaseClassification accepts the canonical four', () => {
    const valid: LeaseClassification[] = [
      'finance',
      'operating',
      'short_term',
      'low_value',
    ]
    for (const v of valid) expect(isLeaseClassification(v)).toBe(true)
    expect(isLeaseClassification('capital')).toBe(false)
    expect(isLeaseClassification('asc-842-finance')).toBe(false)
  })

  it('isLeaseStatus accepts the canonical lifecycle', () => {
    expect(isLeaseStatus('active')).toBe(true)
    expect(isLeaseStatus('terminated')).toBe(true)
    expect(isLeaseStatus('expired')).toBe(true)
    expect(isLeaseStatus('paused')).toBe(false)
  })

  it('isDiscountRateBasis accepts rate_implicit | incremental_borrowing', () => {
    expect(isDiscountRateBasis('rate_implicit')).toBe(true)
    expect(isDiscountRateBasis('incremental_borrowing')).toBe(true)
    expect(isDiscountRateBasis('riskfree')).toBe(false)
  })

  it('isPaymentFrequency / isPaymentTiming accept canonical sets', () => {
    expect(isPaymentFrequency('monthly')).toBe(true)
    expect(isPaymentFrequency('quarterly')).toBe(true)
    expect(isPaymentFrequency('weekly')).toBe(false)
    expect(isPaymentTiming('in_advance')).toBe(true)
    expect(isPaymentTiming('in_arrears')).toBe(true)
  })

  it('isLeaseModificationKind accepts the IFRS 16 §44-§46 kinds', () => {
    const kinds: LeaseModificationKind[] = [
      'scope_increase_separate',
      'scope_increase_combined',
      'term_extension',
      'term_reduction',
      'payment_change',
      'discount_rate_reset',
    ]
    for (const k of kinds) expect(isLeaseModificationKind(k)).toBe(true)
    expect(isLeaseModificationKind('renegotiation')).toBe(false)
  })

  it('qualifiesForShortTermExemption — IFRS 16 §5(a) predicate', () => {
    // 6-month lease without purchase option → exempt
    expect(qualifiesForShortTermExemption(6, false)).toBe(true)
    // 12-month lease without purchase option → exempt (boundary)
    expect(qualifiesForShortTermExemption(12, false)).toBe(true)
    // 13-month → not exempt
    expect(qualifiesForShortTermExemption(13, false)).toBe(false)
    // 6-month WITH purchase option → not exempt
    expect(qualifiesForShortTermExemption(6, true)).toBe(false)
  })
})

describe('IFRS 16 — Lease initial measurement', () => {
  // Canonical example: 36-month real-estate lease, €5,000 / month in advance,
  // 4.5% incremental borrowing rate.
  const initialLiability = 169_543_24 // PV of 36 × €5,000 in advance @ 4.5%/yr
  const initialDirectCosts = 2_000_00
  const prepaidRent = 5_000_00
  const incentivesReceived = 10_000_00

  it('RouAsset initial cost = liability + IDC + prepaid − incentives', () => {
    const initialCost =
      initialLiability + initialDirectCosts + prepaidRent - incentivesReceived
    const rou: RouAsset = {
      initialCost,
      initialDirectCosts,
      prepaidPayments: prepaidRent,
      incentivesReceived,
      accumulatedAmortisation: 0,
      impairmentReserve: 0,
      carryingAmount: initialCost,
    }
    expect(rou.initialCost).toBe(166_543_24)
    expect(rou.carryingAmount).toBe(rou.initialCost)
  })

  it('LeaseLiability stores the PV + discount rate + basis', () => {
    const liab: LeaseLiability = {
      initialAmount: initialLiability,
      carryingAmount: initialLiability,
      discountRatePercent: 4.5,
      discountRateBasis: 'incremental_borrowing',
    }
    expect(liab.initialAmount).toBe(initialLiability)
    expect(isDiscountRateBasis(liab.discountRateBasis)).toBe(true)
  })

  it('LeasePayment splits cash into interest + principal at the effective rate', () => {
    // Period 1: liability 169,543.24 × monthly rate (4.5%/12) ≈ 635.79 interest
    //   payment 5,000 → principal = 5,000 − 635.79 = 4,364.21
    //   liability after = 169,543.24 − 4,364.21 = 165,179.03
    const monthlyRate = 4.5 / 12 / 100
    const interest = Math.round(initialLiability * monthlyRate)
    const principal = 5_000_00 - interest
    const liabilityAfter = initialLiability - principal

    const payment: LeasePayment = {
      periodEnd: '2026-05-31',
      amount: 5_000_00,
      interest,
      principal,
      liabilityAfter,
      rouAmortisation: Math.round(166_543_24 / 36),
      rouCarryingAfter: 166_543_24 - Math.round(166_543_24 / 36),
    }
    expect(payment.amount).toBe(payment.interest + payment.principal)
    expect(payment.liabilityAfter).toBeLessThan(initialLiability)
  })
})

describe('IFRS 16 — Lease master record (canonical projection)', () => {
  it('builds a finance-classified active lease', () => {
    const lease: Lease = {
      id: 'LEASE-001',
      tenantId: 'tenant-1',
      lessorId: 'lessor-acme',
      description: 'Sofia HQ — Floor 3 office space',
      classification: 'finance',
      underlyingAssetCategory: 'real_estate',
      commencementDate: '2026-05-01',
      endDate: '2029-04-30',
      leaseTermMonths: 36,
      fixedPayment: 5_000_00,
      paymentFrequency: 'monthly',
      paymentTiming: 'in_advance',
      currency: 'EUR',
      discountRatePercent: 4.5,
      discountRateBasis: 'incremental_borrowing',
      initialDirectCosts: 2_000_00,
      leaseIncentivesReceived: 10_000_00,
      prepaidRent: 5_000_00,
      rouAsset: {
        initialCost: 166_543_24,
        initialDirectCosts: 2_000_00,
        prepaidPayments: 5_000_00,
        incentivesReceived: 10_000_00,
        accumulatedAmortisation: 0,
        impairmentReserve: 0,
        carryingAmount: 166_543_24,
      },
      liability: {
        initialAmount: 169_543_24,
        carryingAmount: 169_543_24,
        discountRatePercent: 4.5,
        discountRateBasis: 'incremental_borrowing',
      },
      status: 'active',
    }
    expect(lease.classification).toBe('finance')
    expect(lease.rouAsset.carryingAmount).toBe(166_543_24)
    expect(lease.liability.initialAmount).toBe(169_543_24)
    expect(isLeaseClassification(lease.classification)).toBe(true)
    expect(isLeaseStatus(lease.status)).toBe(true)
  })

  it('short-term exempt lease keeps no ROU + no liability', () => {
    // 9-month equipment lease — recognition-exempt under IFRS 16 §5(a).
    const lease: Lease = {
      id: 'LEASE-EXEMPT-1',
      tenantId: 'tenant-1',
      classification: 'short_term',
      underlyingAssetCategory: 'equipment',
      commencementDate: '2026-05-01',
      endDate: '2027-01-31',
      leaseTermMonths: 9,
      fixedPayment: 200_00,
      paymentFrequency: 'monthly',
      paymentTiming: 'in_arrears',
      currency: 'EUR',
      discountRatePercent: 0,
      discountRateBasis: 'incremental_borrowing',
      initialDirectCosts: 0,
      leaseIncentivesReceived: 0,
      prepaidRent: 0,
      rouAsset: {
        initialCost: 0,
        initialDirectCosts: 0,
        prepaidPayments: 0,
        incentivesReceived: 0,
        accumulatedAmortisation: 0,
        impairmentReserve: 0,
        carryingAmount: 0,
      },
      liability: {
        initialAmount: 0,
        carryingAmount: 0,
        discountRatePercent: 0,
        discountRateBasis: 'incremental_borrowing',
      },
      status: 'active',
    }
    expect(qualifiesForShortTermExemption(lease.leaseTermMonths!, false)).toBe(
      true,
    )
    expect(lease.rouAsset.initialCost).toBe(0)
    expect(lease.liability.initialAmount).toBe(0)
  })

  it('modification array carries the IFRS 16 §44-§46 kind discriminator', () => {
    const lease: Pick<Lease, 'modifications'> = {
      modifications: [
        {
          effectiveDate: '2027-01-01',
          kind: 'term_extension',
          newEndDate: '2030-04-30',
          notes: 'Extended 12 months at the same rate',
        },
        {
          effectiveDate: '2028-06-01',
          kind: 'discount_rate_reset',
          newDiscountRatePercent: 5.5,
        },
      ],
    }
    expect(lease.modifications).toHaveLength(2)
    expect(lease.modifications![0].kind).toBe('term_extension')
    expect(isLeaseModificationKind(lease.modifications![1].kind)).toBe(true)
  })
})
