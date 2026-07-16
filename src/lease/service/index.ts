/**
 * Lease Service — canonical IFRS 16 / ASC 842 PV + amortisation arithmetic.
 *
 * Pure calculation surface (no in-memory storage). Mirrors the
 * `depreciation.service.ts` calculate-vs-post split so close-jobs can:
 *
 *   1. `calculateInitialMeasurement(lease)` — at commencement, derive
 *      the initial lease liability (PV of unpaid payments) + initial
 *      ROU asset cost (= liability + IDC + prepaid − incentives).
 *   2. `calculateAmortisationSchedule(lease)` — full forward schedule
 *      of `LeasePayment[]` rows (one per period through the lease term).
 *   3. `calculatePeriod(lease, periodIndex, openingLiability, openingRou)`
 *      — single-period decomposition that the close-job persists into a
 *      `lease-period-postings` row.
 *
 * Money is integer cents per the project's `_money` standard. Rates
 * are percent (4.5 → 4.5%). All arithmetic uses integer-rounded
 * `Math.round` at the end of each period to avoid floating-point
 * drift across long schedules.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @standard IEEE-754-2019 binary-floating-point avoid-for-money
 * @accounting IFRS IFRS-16 §22-§24 rou-asset-initial-measurement
 * @accounting IFRS IFRS-16 §26-§28 liability-initial-measurement
 * @accounting IFRS IFRS-16 §29-§31 rou-asset-subsequent-measurement
 * @accounting IFRS IFRS-16 §36-§38 lease-liability-amortised-cost
 * @accounting US-GAAP ASC-842-20-30 initial-measurement
 * @accounting US-GAAP ASC-842-20-35 subsequent-measurement
 * @audit ISO-19011:2018 audit-trail
 * @see src/standards/ifrs-16/types.ts
 * @see docs/STANDARDS.md §4.2
 */

import type {
  Lease,
  LeasePayment,
  PaymentFrequency,
  PaymentTiming,
  RouAsset,
  LeaseLiability,
} from '@/ifrs/16'

// ─── Helpers — frequency × annual rate → periodic rate ────────────────

const PERIODS_PER_YEAR: Record<PaymentFrequency, number> = {
  monthly: 12,
  quarterly: 4,
  semi_annually: 2,
  annually: 1,
}

/**
 * Annual rate (percent) → periodic rate (decimal, per period).
 *
 *   monthly @ 4.5%  → 0.045 / 12 = 0.00375
 *   quarterly @ 6%  → 0.06 / 4   = 0.015
 *
 * @accounting IFRS IFRS-16 §36 effective-interest-method
 */
export const periodicRate = (
  annualRatePercent: number,
  frequency: PaymentFrequency,
): number => annualRatePercent / 100 / PERIODS_PER_YEAR[frequency]

/**
 * Total number of periods in a lease given start + end + frequency.
 * Fractional periods at the tail round to a whole period.
 *
 * Uses a day-precision calculation rather than (year × 12 + month) deltas,
 * because the year/month delta drops the day component — a lease running
 * `2026-05-01` → `2029-04-30` (36 months by industry convention) computes
 * a month delta of 35 even though the trailing partial month is the full
 * 30-day extent of April. Day-precision + ceil round-trips correctly:
 *   - `2026-05-01 → 2029-04-30` = 1095 days / 30.4375 ≈ 35.97 → 36 ✓
 *   - `2026-05-15 → 2027-05-14` = 364 days  / 30.4375 ≈ 11.96 → 12 ✓
 *   - `2026-05-01 → 2026-05-01` = 0 days     → max(1) → 1 ✓
 */
export const totalPeriods = (
  commencementDate: Date | string,
  endDate: Date | string,
  frequency: PaymentFrequency,
): number => {
  const start = commencementDate instanceof Date ? commencementDate : new Date(commencementDate)
  const end = endDate instanceof Date ? endDate : new Date(endDate)
  const MS_PER_DAY = 86_400_000
  const AVG_DAYS_PER_YEAR = 365.25
  const days = Math.max(0, (end.getTime() - start.getTime()) / MS_PER_DAY)
  const daysPerPeriod = AVG_DAYS_PER_YEAR / PERIODS_PER_YEAR[frequency]
  return Math.max(1, Math.ceil(days / daysPerPeriod))
}

// ─── Present value ────────────────────────────────────────────────────

/**
 * Present value of an n-period annuity at periodic rate r.
 *
 *   in_arrears (annuity-immediate):  PV = payment × (1 − (1+r)^−n) / r
 *   in_advance (annuity-due):        PV = annuity-immediate × (1 + r)
 *
 * Returns 0 when n ≤ 0. When r ≈ 0 (effectively interest-free)
 * collapses to PV = payment × n.
 *
 * @accounting IFRS IFRS-16 §26 present-value-of-payments
 */
export const presentValueOfAnnuity = (
  paymentCents: number,
  ratePerPeriod: number,
  periods: number,
  timing: PaymentTiming,
): number => {
  if (periods <= 0 || paymentCents === 0) return 0
  if (Math.abs(ratePerPeriod) < 1e-9) {
    // r ≈ 0 — pure undiscounted sum.
    return Math.round(paymentCents * periods)
  }
  const annuityImmediate =
    paymentCents * ((1 - Math.pow(1 + ratePerPeriod, -periods)) / ratePerPeriod)
  const adjusted =
    timing === 'in_advance'
      ? annuityImmediate * (1 + ratePerPeriod)
      : annuityImmediate
  return Math.round(adjusted)
}

// ─── Initial measurement ──────────────────────────────────────────────

export interface InitialMeasurementInput {
  fixedPayment: number
  paymentFrequency: PaymentFrequency
  paymentTiming: PaymentTiming
  commencementDate: Date | string
  endDate: Date | string
  discountRatePercent: number
  initialDirectCosts?: number
  prepaidRent?: number
  leaseIncentivesReceived?: number
  residualValueGuarantee?: number
  terminationPenalty?: number
}

export interface InitialMeasurementResult {
  initialLiability: number
  initialRouAsset: number
  totalPeriods: number
  periodicRate: number
}

/**
 * IFRS 16 §22-§28 initial measurement.
 *
 *   liability = PV of fixed payments (annuity)
 *             + PV of residual-value guarantee (single sum at end)
 *             + PV of termination penalty when reasonably-certain
 *
 *   rouAsset  = liability + initialDirectCosts + prepaidRent − incentivesReceived
 *
 * @accounting IFRS IFRS-16 §22-§24 rou-asset-initial-measurement
 * @accounting IFRS IFRS-16 §26-§28 liability-initial-measurement
 */
export const calculateInitialMeasurement = (
  input: InitialMeasurementInput,
): InitialMeasurementResult => {
  const n = totalPeriods(input.commencementDate, input.endDate, input.paymentFrequency)
  const r = periodicRate(input.discountRatePercent, input.paymentFrequency)

  const annuityPv = presentValueOfAnnuity(
    input.fixedPayment,
    r,
    n,
    input.paymentTiming,
  )

  const residualPv =
    input.residualValueGuarantee && input.residualValueGuarantee > 0
      ? Math.round(input.residualValueGuarantee / Math.pow(1 + r, n))
      : 0
  const terminationPv =
    input.terminationPenalty && input.terminationPenalty > 0
      ? Math.round(input.terminationPenalty / Math.pow(1 + r, n))
      : 0

  const initialLiability = annuityPv + residualPv + terminationPv
  const initialRouAsset =
    initialLiability +
    (input.initialDirectCosts ?? 0) +
    (input.prepaidRent ?? 0) -
    (input.leaseIncentivesReceived ?? 0)

  return {
    initialLiability,
    initialRouAsset,
    totalPeriods: n,
    periodicRate: r,
  }
}

// ─── Per-period decomposition ─────────────────────────────────────────

export interface PeriodDecomposition {
  interest: number
  principalRepayment: number
  cashPayment: number
  rouAmortisation: number
  closingLiability: number
  closingRou: number
}

/**
 * Single-period split of a lease payment + ROU amortisation. Used by
 * the close-job to write a `lease-period-postings` row.
 *
 *   interest = openingLiability × periodicRate
 *   principal = cashPayment − interest (clipped at openingLiability)
 *   closingLiability = openingLiability − principal
 *                    = openingLiability × (1 + periodicRate) − cashPayment
 *
 *   rouAmortisation = openingRou / remainingPeriods
 *   closingRou = openingRou − rouAmortisation
 *
 * Final period rolls any rounding residual into the last principal +
 * amortisation so the schedule sums exactly.
 *
 * @accounting IFRS IFRS-16 §31 §36 §38 amortisation
 */
export const calculatePeriod = (
  args: {
    cashPayment: number
    periodicRate: number
    openingLiability: number
    openingRou: number
    remainingPeriods: number
    isFinalPeriod: boolean
    /**
     * Defaults to 'in_arrears' (payment at period end, interest accrues
     * on the full opening balance). For 'in_advance' (annuity-due), the
     * payment lands at the START of the period and reduces the
     * balance before interest accrues, so interest is computed on
     * (openingLiability − cashPayment). The annuity-due PV used by
     * `presentValueOfAnnuity` already reflects this; the schedule loop
     * must match to keep `Σ(interest + principal) = Σ payments`.
     */
    paymentTiming?: PaymentTiming
  },
): PeriodDecomposition => {
  const interestBase =
    args.paymentTiming === 'in_advance'
      ? Math.max(0, args.openingLiability - args.cashPayment)
      : args.openingLiability
  const interest = Math.round(interestBase * args.periodicRate)
  let principalRepayment = args.cashPayment - interest
  if (principalRepayment > args.openingLiability) {
    // Final period: cap principal at the remaining liability.
    principalRepayment = args.openingLiability
  }
  if (principalRepayment < 0) principalRepayment = 0

  // Standard effective-interest amortisation (IFRS 16 §36 / ASC 842):
  //   closingLiability = openingLiability × (1 + r) − cashPayment
  //                    = openingLiability − principal
  // The previous form `openingLiability + interest − principal` double-
  // counted interest because principal already absorbs it
  // (principal = cashPayment − interest), making `Σ principal` exceed
  // `initialLiability` by the cumulative interest.
  let closingLiability = args.openingLiability - principalRepayment
  if (args.isFinalPeriod) {
    // Roll any rounding tail into the last period's principal so the
    // schedule sums exactly.
    if (closingLiability > 0) {
      principalRepayment += closingLiability
      closingLiability = 0
    }
  }

  const rouAmortisation = args.isFinalPeriod
    ? args.openingRou
    : Math.round(args.openingRou / args.remainingPeriods)
  const closingRou = Math.max(0, args.openingRou - rouAmortisation)

  return {
    interest,
    principalRepayment,
    cashPayment: args.cashPayment,
    rouAmortisation,
    closingLiability,
    closingRou,
  }
}

// ─── Full forward schedule ────────────────────────────────────────────

/**
 * Build the forward `LeasePayment[]` schedule from commencement to
 * end-of-term. Each row carries the period-end date, the cash + interest
 * + principal split, the ROU amortisation, and the running carrying
 * amounts.
 *
 * The schedule is deterministic — running it on the same inputs always
 * produces the same rows. Close-jobs persist the per-period rows into
 * `lease-period-postings` so the auditor can click through to the
 * evidence.
 *
 * @accounting IFRS IFRS-16 §36-§38 effective-interest-method
 */
export const calculateAmortisationSchedule = (
  lease: Pick<
    Lease,
    | 'fixedPayment'
    | 'paymentFrequency'
    | 'paymentTiming'
    | 'commencementDate'
    | 'endDate'
    | 'discountRatePercent'
    | 'initialDirectCosts'
    | 'prepaidRent'
    | 'leaseIncentivesReceived'
    | 'residualValueGuarantee'
    | 'terminationPenalty'
  >,
): LeasePayment[] => {
  const init = calculateInitialMeasurement({
    fixedPayment: lease.fixedPayment,
    paymentFrequency: lease.paymentFrequency,
    paymentTiming: lease.paymentTiming,
    commencementDate: lease.commencementDate,
    endDate: lease.endDate,
    discountRatePercent: lease.discountRatePercent,
    initialDirectCosts: lease.initialDirectCosts,
    prepaidRent: lease.prepaidRent,
    leaseIncentivesReceived: lease.leaseIncentivesReceived,
    residualValueGuarantee: lease.residualValueGuarantee,
    terminationPenalty: lease.terminationPenalty,
  })

  const start =
    lease.commencementDate instanceof Date
      ? lease.commencementDate
      : new Date(lease.commencementDate)

  const monthsPerPeriod = 12 / PERIODS_PER_YEAR[lease.paymentFrequency]
  const schedule: LeasePayment[] = []

  let liability = init.initialLiability
  let rou = init.initialRouAsset

  for (let i = 0; i < init.totalPeriods; i++) {
    const isFinal = i === init.totalPeriods - 1
    const period = calculatePeriod({
      cashPayment: lease.fixedPayment,
      periodicRate: init.periodicRate,
      openingLiability: liability,
      openingRou: rou,
      remainingPeriods: init.totalPeriods - i,
      isFinalPeriod: isFinal,
      paymentTiming: lease.paymentTiming,
    })

    const periodEnd = new Date(start)
    periodEnd.setMonth(periodEnd.getMonth() + monthsPerPeriod * (i + 1))
    // Step back one day so periodEnd is inclusive (e.g. period ending
    // April 30 rather than May 1).
    periodEnd.setDate(periodEnd.getDate() - 1)

    schedule.push({
      periodEnd,
      amount: period.cashPayment,
      interest: period.interest,
      principal: period.principalRepayment,
      liabilityAfter: period.closingLiability,
      rouAmortisation: period.rouAmortisation,
      rouCarryingAfter: period.closingRou,
    })

    liability = period.closingLiability
    rou = period.closingRou
  }

  return schedule
}

// ─── Composing canonical types ────────────────────────────────────────

/**
 * Build a fully-populated canonical {@link RouAsset} + {@link LeaseLiability}
 * pair from a Lease's master fields. Used by close-jobs constructing
 * the canonical IFRS-16 projection from a Payload doc.
 */
export const composeCanonicalLeasePair = (
  input: InitialMeasurementInput & { discountRateBasis: 'rate_implicit' | 'incremental_borrowing' },
): { rouAsset: RouAsset; liability: LeaseLiability } => {
  const init = calculateInitialMeasurement(input)
  const rouAsset: RouAsset = {
    initialCost: init.initialRouAsset,
    initialDirectCosts: input.initialDirectCosts ?? 0,
    prepaidPayments: input.prepaidRent ?? 0,
    incentivesReceived: input.leaseIncentivesReceived ?? 0,
    accumulatedAmortisation: 0,
    impairmentReserve: 0,
    carryingAmount: init.initialRouAsset,
  }
  const liability: LeaseLiability = {
    initialAmount: init.initialLiability,
    carryingAmount: init.initialLiability,
    discountRatePercent: input.discountRatePercent,
    discountRateBasis: input.discountRateBasis,
  }
  return { rouAsset, liability }
}
