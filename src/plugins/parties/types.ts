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

/** A single aging bucket — name + day-range + computed totals. */
export interface AgingBucket {
  name: string
  dayMin: number
  dayMax: number
  totalAmount: number  // cents
  count: number
  documentIds: string[]
}

/** Bucket definition before computation (the inputs to the aging calculator). */
export interface BucketDefinition {
  name: string
  dayMin: number
  dayMax: number
}

/** Default set of aging buckets used by both A/R and A/P aging reports. */
export const DEFAULT_AGING_BUCKETS: BucketDefinition[] = [
  { name: 'Current', dayMin: 0, dayMax: 30 },
  { name: '31-60 days', dayMin: 31, dayMax: 60 },
  { name: '61-90 days', dayMin: 61, dayMax: 90 },
  { name: '90+ days', dayMin: 91, dayMax: Infinity },
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
