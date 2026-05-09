/**
 * Runtime guards for the IFRS 16 / ASC 842 enums.
 *
 * @standard ISO/IEC-29119:2022 software-testing runtime-guards
 * @accounting IFRS IFRS-16 leases
 * @accounting US-GAAP ASC-842-20 lessee-accounting
 * @see ./types.ts
 */

import type {
  LeaseClassification,
  LeaseStatus,
  DiscountRateBasis,
  PaymentFrequency,
  PaymentTiming,
  LeaseModificationKind,
} from './types'

const CLASSIFICATIONS = new Set<LeaseClassification>([
  'finance',
  'operating',
  'short_term',
  'low_value',
])
const STATUSES = new Set<LeaseStatus>([
  'draft',
  'active',
  'modified',
  'terminated',
  'expired',
])
const RATE_BASIS = new Set<DiscountRateBasis>([
  'rate_implicit',
  'incremental_borrowing',
])
const FREQUENCIES = new Set<PaymentFrequency>([
  'monthly',
  'quarterly',
  'semi_annually',
  'annually',
])
const TIMINGS = new Set<PaymentTiming>(['in_advance', 'in_arrears'])
const MOD_KINDS = new Set<LeaseModificationKind>([
  'scope_increase_separate',
  'scope_increase_combined',
  'term_extension',
  'term_reduction',
  'payment_change',
  'discount_rate_reset',
])

export const isLeaseClassification = (s: unknown): s is LeaseClassification =>
  typeof s === 'string' && CLASSIFICATIONS.has(s as LeaseClassification)

export const isLeaseStatus = (s: unknown): s is LeaseStatus =>
  typeof s === 'string' && STATUSES.has(s as LeaseStatus)

export const isDiscountRateBasis = (s: unknown): s is DiscountRateBasis =>
  typeof s === 'string' && RATE_BASIS.has(s as DiscountRateBasis)

export const isPaymentFrequency = (s: unknown): s is PaymentFrequency =>
  typeof s === 'string' && FREQUENCIES.has(s as PaymentFrequency)

export const isPaymentTiming = (s: unknown): s is PaymentTiming =>
  typeof s === 'string' && TIMINGS.has(s as PaymentTiming)

export const isLeaseModificationKind = (
  s: unknown,
): s is LeaseModificationKind =>
  typeof s === 'string' && MOD_KINDS.has(s as LeaseModificationKind)

/**
 * IFRS 16 §5(a) recognition exemption for short-term leases —
 * predicate: lease term ≤ 12 months AND no purchase option reasonably
 * certain. Caller supplies the term in months; the purchase-option
 * check is left to the caller.
 */
export const qualifiesForShortTermExemption = (
  termMonths: number,
  hasReasonablyCertainPurchaseOption: boolean,
): boolean => termMonths <= 12 && !hasReasonablyCertainPurchaseOption
