/**
 * Canonical IFRS 16 / ASC 842 lease accounting types — lessee model.
 *
 * Money is integer cents per the project's `_money` standard. Rates
 * are percent (e.g. 4.5 for 4.5%).
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IFRS-16 leases lessee
 * @accounting US-GAAP ASC-842-20 lessee-accounting
 * @audit ISO-19011:2018 audit-trail
 * @see ./README.md
 */

// ─── Classification + lifecycle enums ──────────────────────────────────

/**
 * Lessee lease classification.
 *
 * - `finance` — IFRS 16 default (single model). Under ASC 842, a finance
 *   lease (substantively transfers control) — produces interest expense
 *   + amortisation expense separately.
 * - `operating` — ASC 842 only. Single straight-line lease expense in
 *   P&L; ROU + liability still on balance sheet. IFRS 16 doesn't admit
 *   this classification for lessees.
 * - `short_term` — IFRS 16 §5(a) recognition exemption. Lease ≤ 12 months
 *   with no purchase option. Off-balance-sheet straight-line expense.
 * - `low_value` — IFRS 16 §5(b) recognition exemption. Underlying asset
 *   value when new is "low" (typically < $5,000). Off-balance-sheet.
 *
 * @accounting IFRS IFRS-16 §5 recognition-exemptions
 * @accounting IFRS IFRS-16 §22 initial-recognition
 * @accounting US-GAAP ASC-842-10-25-2 finance-vs-operating
 */
export type LeaseClassification =
  | 'finance'
  | 'operating'
  | 'short_term'
  | 'low_value'

/**
 * Lease lifecycle status.
 *
 * Drafts cannot be remeasured; only `active` leases produce period
 * postings; `modified` is an interim state during a remeasurement
 * cycle; `terminated` and `expired` produce final disposal entries.
 */
export type LeaseStatus = 'draft' | 'active' | 'modified' | 'terminated' | 'expired'

/**
 * Discount-rate basis. IFRS 16 §26 says "use the rate implicit in the
 * lease, if that rate can be readily determined; if not, use the
 * lessee's incremental borrowing rate (IBR)". In practice IBR is
 * almost always used.
 *
 * @accounting IFRS IFRS-16 §26 discount-rate-selection
 */
export type DiscountRateBasis = 'rate_implicit' | 'incremental_borrowing'

/**
 * Payment frequency for the periodic lease payment.
 */
export type PaymentFrequency = 'monthly' | 'quarterly' | 'semi_annually' | 'annually'

/**
 * Payment timing within a period — annuity-due (start) vs annuity-
 * immediate (end). Affects PV calculation by one period of discount.
 */
export type PaymentTiming = 'in_advance' | 'in_arrears'

/**
 * Modification kinds per IFRS 16 §44-§46.
 *
 * @accounting IFRS IFRS-16 §44-§46 modifications
 * @accounting US-GAAP ASC-842-10-25-8 lease-modifications
 */
export type LeaseModificationKind =
  | 'scope_increase_separate'
  | 'scope_increase_combined'
  | 'term_extension'
  | 'term_reduction'
  | 'payment_change'
  | 'discount_rate_reset'

/**
 * Underlying-asset categories (cosmetic — drives admin grouping).
 */
export type UnderlyingAssetCategory =
  | 'real_estate'
  | 'vehicles'
  | 'equipment'
  | 'it_hardware'
  | 'software'
  | 'other'

// ─── Payment schedule ──────────────────────────────────────────────────

/**
 * One periodic payment in a lease's amortisation schedule. Splits the
 * cash payment into the interest accretion (Dr Interest Expense) and
 * the principal reduction (Dr Lease Liability).
 *
 * @accounting IFRS IFRS-16 §36 effective-interest-method
 * @accounting US-GAAP ASC-842-20-35 subsequent-measurement-lessee
 */
export interface LeasePayment {
  /** Period end date the payment applies to. */
  periodEnd: Date | string
  /** Cash paid this period (cents). */
  amount: number
  /** Interest portion (cents) — accretion of the liability at the discount rate. */
  interest: number
  /** Principal portion (cents) — reduction of the liability. */
  principal: number
  /** Liability balance after this payment. */
  liabilityAfter: number
  /** ROU asset amortisation booked for this period. */
  rouAmortisation: number
  /** ROU asset carrying value after the period. */
  rouCarryingAfter: number
}

// ─── Modifications ─────────────────────────────────────────────────────

/**
 * A modification event applied to an active lease. Triggers
 * remeasurement per IFRS 16 §44-§46 (or accounted as a separate lease
 * if §44(a) applies — increase in scope priced at standalone-price).
 *
 * @accounting IFRS IFRS-16 §44-§46 modifications
 */
export interface LeaseModification {
  effectiveDate: Date | string
  kind: LeaseModificationKind
  /** New discount rate (percent) — required when kind is `discount_rate_reset`. */
  newDiscountRatePercent?: number
  /** New fixed payment (cents) — when kind is `payment_change`. */
  newFixedPayment?: number
  /** New end date — when kind is term_extension / term_reduction. */
  newEndDate?: Date | string
  /** Free-text rationale captured for the audit trail. */
  notes?: string
}

// ─── ROU asset ─────────────────────────────────────────────────────────

/**
 * Right-of-use asset — IFRS 16 §22-§24.
 *
 *   Initial cost = initial liability
 *                + initial direct costs
 *                + prepaid lease payments
 *                − lease incentives received
 *                + estimated dismantling / restoration cost
 *
 * @accounting IFRS IFRS-16 §22-§24 rou-asset-initial-measurement
 * @accounting IFRS IFRS-16 §29-§31 rou-asset-subsequent-measurement
 */
export interface RouAsset {
  /** Initial cost computed per IFRS 16 §24 formula above. */
  initialCost: number
  /** Initial direct costs incurred by the lessee — IFRS 16 §24(c). */
  initialDirectCosts: number
  /** Prepaid lease payments at or before commencement — IFRS 16 §24(b). */
  prepaidPayments: number
  /** Lease incentives received from the lessor — IFRS 16 §24(b). */
  incentivesReceived: number
  /** Estimated dismantling / restoration cost capitalised — IFRS 16 §24(d). */
  dismantlingProvision?: number
  /** Accumulated amortisation through the most recent period. */
  accumulatedAmortisation: number
  /** IAS 36 impairment write-down accumulated. */
  impairmentReserve: number
  /** Carrying amount = initialCost − accumulatedAmortisation − impairmentReserve. */
  carryingAmount: number
}

// ─── Lease liability ───────────────────────────────────────────────────

/**
 * Lease liability — IFRS 16 §26-§28 + §36-§38.
 *
 *   Initial liability = PV of unpaid lease payments at commencement,
 *                       discounted at the rate-implicit-in-lease or IBR,
 *                       including:
 *                         - fixed payments (less incentives receivable)
 *                         - variable payments tied to an index/rate
 *                         - residual value guarantees
 *                         - exercise price of purchase options reasonably certain
 *                         - termination penalties when term reflects termination
 *
 * @accounting IFRS IFRS-16 §26-§28 liability-initial-measurement
 * @accounting IFRS IFRS-16 §36-§38 liability-subsequent-measurement
 */
export interface LeaseLiability {
  /** Initial PV of unpaid payments at commencement. */
  initialAmount: number
  /** Carrying amount as of the most recent period (after accretion + payments). */
  carryingAmount: number
  /** Annual discount rate (percent). */
  discountRatePercent: number
  /** Source of that rate. */
  discountRateBasis: DiscountRateBasis
}

// ─── Master Lease record ───────────────────────────────────────────────

/**
 * The master lease record. The `Leases` Payload collection projects
 * onto this shape.
 *
 * @accounting IFRS IFRS-16 leases
 * @accounting US-GAAP ASC-842-20 lessee-accounting
 */
export interface Lease {
  /** Stable id (Payload-managed in production). */
  id: string
  /** Tenant / counterparty / underlying-asset references collapsed to ids. */
  tenantId: string | number
  lessorId?: string | number
  /** Free-text description of the underlying asset. */
  description?: string

  classification: LeaseClassification
  underlyingAssetCategory?: UnderlyingAssetCategory

  // ── Term ──
  commencementDate: Date | string
  endDate: Date | string
  /** Computed (commencement → end including reasonably-certain extensions). */
  leaseTermMonths?: number

  // ── Payments ──
  fixedPayment: number
  paymentFrequency: PaymentFrequency
  paymentTiming: PaymentTiming
  /** Free-text description of any variable / index-linked payments. */
  variablePaymentNotes?: string
  residualValueGuarantee?: number
  terminationPenalty?: number

  // ── Discount + currency ──
  currency: string
  discountRatePercent: number
  discountRateBasis: DiscountRateBasis

  // ── Initial measurement (computed by the canonical service) ──
  initialDirectCosts: number
  leaseIncentivesReceived: number
  prepaidRent: number

  // ── ROU + liability — the on-balance-sheet pair ──
  rouAsset: RouAsset
  liability: LeaseLiability

  // ── Modifications ──
  modifications?: LeaseModification[]

  // ── Lifecycle ──
  status: LeaseStatus
  terminationDate?: Date | string

  // ── Optional payment schedule (period-by-period evidence) ──
  paymentSchedule?: LeasePayment[]
}
