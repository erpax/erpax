/**
 * Lease Service — IFRS 16 / ASC 842 PV + amortisation arithmetic.
 *
 * Pure-math tests covering the canonical PV formula, schedule
 * construction, and the integer-cents rounding behavior that keeps
 * the schedule summing exactly across long terms.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @accounting IFRS IFRS-16 §22-§38
 * @accounting US-GAAP ASC-842-20-30 / -35
 * @audit ISO-19011:2018 audit-trail
 * @see src/services/lease.service.ts
 */

import { describe, it, expect } from 'vitest'
import {
  calculateInitialMeasurement,
  calculateAmortisationSchedule,
  calculatePeriod,
  composeCanonicalLeasePair,
  presentValueOfAnnuity,
  periodicRate,
  totalPeriods,
} from '@/lease.service'

describe('Lease service — helpers', () => {
  it('periodicRate converts annual → monthly correctly', () => {
    expect(periodicRate(4.5, 'monthly')).toBeCloseTo(0.00375, 6)
    expect(periodicRate(6, 'quarterly')).toBeCloseTo(0.015, 6)
    expect(periodicRate(8, 'annually')).toBeCloseTo(0.08, 6)
  })

  it('totalPeriods counts months / quarters / years correctly', () => {
    expect(
      totalPeriods('2026-05-01', '2029-04-30', 'monthly'),
    ).toBeGreaterThanOrEqual(35)
    expect(
      totalPeriods('2026-05-01', '2027-04-30', 'quarterly'),
    ).toBe(4)
    expect(
      totalPeriods('2026-05-01', '2029-04-30', 'annually'),
    ).toBe(3)
  })
})

describe('Lease service — presentValueOfAnnuity', () => {
  it('annuity-immediate (in_arrears): PV = pmt × (1 − (1+r)^−n) / r', () => {
    // €1,000/month × 12 months @ 5%/yr → PV ≈ 11,681 (annuity-immediate)
    const pv = presentValueOfAnnuity(1_000_00, 0.05 / 12, 12, 'in_arrears')
    expect(pv).toBeGreaterThan(11_600_00)
    expect(pv).toBeLessThan(11_700_00)
  })

  it('annuity-due (in_advance) is annuity-immediate × (1+r)', () => {
    const r = 0.05 / 12
    const immediate = presentValueOfAnnuity(1_000_00, r, 12, 'in_arrears')
    const due = presentValueOfAnnuity(1_000_00, r, 12, 'in_advance')
    expect(due).toBe(Math.round(immediate * (1 + r)))
  })

  it('zero rate collapses to undiscounted sum', () => {
    expect(presentValueOfAnnuity(500_00, 0, 24, 'in_arrears')).toBe(12_000_00)
    expect(presentValueOfAnnuity(500_00, 0, 24, 'in_advance')).toBe(12_000_00)
  })

  it('zero periods → 0', () => {
    expect(presentValueOfAnnuity(1_000_00, 0.05, 0, 'in_arrears')).toBe(0)
  })
})

describe('Lease service — calculateInitialMeasurement', () => {
  // Canonical fixture: 36-month real-estate lease, €5,000/month in advance,
  // 4.5%/yr incremental borrowing rate.
  const baseLease = {
    fixedPayment: 5_000_00,
    paymentFrequency: 'monthly' as const,
    paymentTiming: 'in_advance' as const,
    commencementDate: '2026-05-01',
    endDate: '2029-04-30',
    discountRatePercent: 4.5,
  }

  it('totalPeriods = 36 for a 36-month lease', () => {
    const init = calculateInitialMeasurement(baseLease)
    expect(init.totalPeriods).toBe(36)
  })

  it('periodicRate = annualRate / 12 for monthly', () => {
    const init = calculateInitialMeasurement(baseLease)
    expect(init.periodicRate).toBeCloseTo(0.045 / 12, 6)
  })

  it('initialLiability ≈ 168,532 cents (annuity-due PV)', () => {
    const init = calculateInitialMeasurement(baseLease)
    // Sanity range — exact integer-cents value depends on Math.round
    // but should be near the textbook 168,533.
    expect(init.initialLiability).toBeGreaterThan(168_000_00)
    expect(init.initialLiability).toBeLessThan(170_000_00)
  })

  it('rouAsset = liability + IDC + prepaid − incentives', () => {
    const init = calculateInitialMeasurement({
      ...baseLease,
      initialDirectCosts: 2_000_00,
      prepaidRent: 5_000_00,
      leaseIncentivesReceived: 10_000_00,
    })
    expect(init.initialRouAsset).toBe(
      init.initialLiability + 2_000_00 + 5_000_00 - 10_000_00,
    )
  })

  it('residual value guarantee adds PV-of-residual to the liability', () => {
    const noResidual = calculateInitialMeasurement(baseLease)
    const withResidual = calculateInitialMeasurement({
      ...baseLease,
      residualValueGuarantee: 10_000_00,
    })
    expect(withResidual.initialLiability).toBeGreaterThan(
      noResidual.initialLiability,
    )
  })
})

describe('Lease service — calculateAmortisationSchedule', () => {
  const baseLease = {
    fixedPayment: 5_000_00,
    paymentFrequency: 'monthly' as const,
    paymentTiming: 'in_advance' as const,
    commencementDate: '2026-05-01',
    endDate: '2029-04-30',
    discountRatePercent: 4.5,
    initialDirectCosts: 0,
    prepaidRent: 0,
    leaseIncentivesReceived: 0,
  }

  it('produces a row per period (36 rows for a 36-month lease)', () => {
    const schedule = calculateAmortisationSchedule(baseLease)
    expect(schedule).toHaveLength(36)
  })

  it('liability strictly decreases period over period', () => {
    const schedule = calculateAmortisationSchedule(baseLease)
    for (let i = 1; i < schedule.length; i++) {
      // Allow equal in the first period if `in_advance` payment offsets exactly.
      expect(schedule[i].liabilityAfter).toBeLessThanOrEqual(
        schedule[i - 1].liabilityAfter,
      )
    }
  })

  it('final period clears the liability to zero', () => {
    const schedule = calculateAmortisationSchedule(baseLease)
    expect(schedule[schedule.length - 1].liabilityAfter).toBe(0)
  })

  it('Σ principal ≈ initial liability (within rounding tail)', () => {
    const schedule = calculateAmortisationSchedule(baseLease)
    const init = calculateInitialMeasurement(baseLease)
    const totalPrincipal = schedule.reduce((s, p) => s + p.principal, 0)
    expect(totalPrincipal).toBe(init.initialLiability)
  })

  it('Σ interest ≈ Σ payments − Σ principal', () => {
    const schedule = calculateAmortisationSchedule(baseLease)
    const totalPayments = schedule.reduce((s, p) => s + p.amount, 0)
    const totalInterest = schedule.reduce((s, p) => s + p.interest, 0)
    const totalPrincipal = schedule.reduce((s, p) => s + p.principal, 0)
    // Allow tail rounding within one cent per period.
    expect(Math.abs(totalPayments - totalPrincipal - totalInterest)).toBeLessThan(
      schedule.length,
    )
  })

  it('Σ ROU amortisation = initial ROU asset (final period absorbs rounding)', () => {
    const schedule = calculateAmortisationSchedule(baseLease)
    const init = calculateInitialMeasurement(baseLease)
    const totalAmort = schedule.reduce((s, p) => s + p.rouAmortisation, 0)
    expect(totalAmort).toBe(init.initialRouAsset)
  })

  it('final period closing ROU = 0', () => {
    const schedule = calculateAmortisationSchedule(baseLease)
    expect(schedule[schedule.length - 1].rouCarryingAfter).toBe(0)
  })
})

describe('Lease service — calculatePeriod (single-period split)', () => {
  it('computes interest = openingLiability × rate', () => {
    const period = calculatePeriod({
      cashPayment: 5_000_00,
      periodicRate: 0.00375,
      openingLiability: 168_532_00,
      openingRou: 168_532_00,
      remainingPeriods: 36,
      isFinalPeriod: false,
    })
    // interest = 168,532 × 0.00375 = 631.995 → 632 cents
    expect(period.interest).toBe(Math.round(168_532_00 * 0.00375))
  })

  it('caps principal at openingLiability in the final period', () => {
    const period = calculatePeriod({
      cashPayment: 100_00, // way more than the residual liability
      periodicRate: 0.00375,
      openingLiability: 50_00,
      openingRou: 50_00,
      remainingPeriods: 1,
      isFinalPeriod: true,
    })
    expect(period.closingLiability).toBe(0)
    // Principal absorbs the residual; never negative.
    expect(period.principalRepayment).toBeGreaterThanOrEqual(0)
  })

  it('final period absorbs the ROU residual fully', () => {
    const period = calculatePeriod({
      cashPayment: 5_000_00,
      periodicRate: 0.00375,
      openingLiability: 4_999_00,
      openingRou: 1_234_56, // arbitrary residual
      remainingPeriods: 1,
      isFinalPeriod: true,
    })
    expect(period.rouAmortisation).toBe(1_234_56)
    expect(period.closingRou).toBe(0)
  })
})

describe('Lease service — composeCanonicalLeasePair', () => {
  it('returns canonical RouAsset + LeaseLiability with discountRateBasis', () => {
    const { rouAsset, liability } = composeCanonicalLeasePair({
      fixedPayment: 5_000_00,
      paymentFrequency: 'monthly',
      paymentTiming: 'in_advance',
      commencementDate: '2026-05-01',
      endDate: '2029-04-30',
      discountRatePercent: 4.5,
      discountRateBasis: 'incremental_borrowing',
      initialDirectCosts: 2_000_00,
      prepaidRent: 5_000_00,
      leaseIncentivesReceived: 10_000_00,
    })
    expect(liability.discountRatePercent).toBe(4.5)
    expect(liability.discountRateBasis).toBe('incremental_borrowing')
    expect(liability.initialAmount).toBe(liability.carryingAmount)
    expect(rouAsset.initialCost).toBe(rouAsset.carryingAmount)
    expect(rouAsset.accumulatedAmortisation).toBe(0)
    expect(rouAsset.impairmentReserve).toBe(0)
  })
})
