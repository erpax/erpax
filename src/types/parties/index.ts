/**
 * Shared types for party-side document workflows (A/R and A/P).
 *
 * Both `payables` and `receivables` operate on the same conceptual document:
 * dated, line-itemized financial doc with status lifecycle, balance, and
 * aging characteristics. Common shape lives here.
 *
 * @standard EN-16931:2017 invoice-and-credit-note
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time issue-date due-date
 * @accounting IFRS IFRS-9 expected-credit-loss
 * @accounting US-GAAP ASC-326 credit-losses-cecl
 * @see docs/STANDARDS.md §5
 */

/** Standard NET payment-term codes; both A/R and A/P use this set. */
export type PaymentTerm = '0' | '15' | '30' | '60' | '90' | 'custom'

// Canonical bucket key — same vocabulary used by bank-rec aging in
// `src/services/bank-reconciliation.service.ts` and the
// finance:reconciliation skill. Re-exported so consumers can import a
// single name from `@/services/parties`.
import type { AgingBucketKey } from '@/services/accounting/utilities/calculations'
export type { AgingBucketKey } from '@/services/accounting/utilities/calculations'

/** A single aging bucket — name + day-range + computed totals. */
export interface AgingBucket {
  name: string
  /** Canonical bucket key — `current | aging | overdue | stale`. */
  key?: AgingBucketKey
  dayMin: number
  dayMax: number
  totalAmount: number  // cents
  count: number
  documentIds: string[]
}

/** Bucket definition before computation (the inputs to the aging calculator). */
export interface BucketDefinition {
  name: string
  /** Canonical bucket key — `current | aging | overdue | stale`. */
  key?: AgingBucketKey
  dayMin: number
  dayMax: number
}

/**
 * Default set of aging buckets used by both A/R and A/P aging reports.
 * Matches the canonical buckets from finance:reconciliation skill +
 * `bucketAgeDays()`. The `key` discriminator is the DRY connector that
 * lets bank-rec / AR-aging / AP-aging share consumer code.
 *
 * @audit ISO-19011:2018 audit-trail aging-of-outstanding-items
 */
export const DEFAULT_AGING_BUCKETS: BucketDefinition[] = [
  { name: 'Current', key: 'current', dayMin: 0, dayMax: 30 },
  { name: '31-60 days', key: 'aging', dayMin: 31, dayMax: 60 },
  { name: '61-90 days', key: 'overdue', dayMin: 61, dayMax: 90 },
  { name: '90+ days', key: 'stale', dayMin: 91, dayMax: Infinity },
]

/**
 * Minimal shape every party-side document satisfies for aging / workflow
 * computations. Extend this in the per-plugin types (Bill, Invoice).
 */
export interface PartyDocument {
  id: string
  dueDate: Date | string
  balance: number  // cents — open / unpaid amount
  status: string
}

/**
 * Shared workflow primitive: a directed graph of valid status transitions.
 * Use `validateTransition` to assert legality before applying a status change.
 */
export type TransitionTable<S extends string> = Record<S, readonly S[]>
