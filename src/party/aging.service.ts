/**
 * Generic aging calculator — single source of truth for the algorithm.
 *
 * Used by both A/R (receivables) and A/P (payables). Takes a list of open
 * documents, computes days-past-due against `asOfDate`, bucketizes, returns
 * totals + metadata.
 *
 * @standard ISO-8601-1:2019 date-time days-between-arithmetic
 * @accounting IFRS IFRS-9 expected-credit-loss aging-buckets
 * @accounting US-GAAP ASC-326 credit-losses-cecl
 * @accounting US-GAAP ASC-310 receivables
 * @accounting US-GAAP ASC-405 liabilities
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §5
 */

import {
  AgingBucket,
  BucketDefinition,
  DEFAULT_AGING_BUCKETS,
  PartyDocument,
} from '@/types/parties'

// DRY: single source of truth for date arithmetic lives in the
// accounting utilities. Re-export here so existing parties consumers
// (receivables/payables/reports) keep their import surface stable.
import { daysBetween } from '@/utility'
export { daysBetween }

/**
 * Compute aging buckets for a list of open party-side documents.
 *
 * @param docs       Documents with `dueDate`, `balance`, and an `id`.
 *                   Filter to *open* (status !== 'paid' && balance > 0) BEFORE calling.
 * @param asOfDate   Report date. Defaults to "now".
 * @param buckets    Bucket definitions. Defaults to `DEFAULT_AGING_BUCKETS`.
 * @returns          Buckets with totals + count + member ids; plus aggregate metrics.
 */
export function computeAgingBuckets<D extends PartyDocument>(
  docs: D[],
  asOfDate: Date = new Date(),
  buckets: BucketDefinition[] = DEFAULT_AGING_BUCKETS,
): { buckets: AgingBucket[]; totalOutstanding: number; documentCount: number } {
  const out: AgingBucket[] = buckets.map<AgingBucket>((b) => ({
    ...b,
    totalAmount: 0,
    count: 0,
    documentIds: [],
  }))
  let totalOutstanding = 0
  for (const d of docs) {
    if (d.balance <= 0) continue
    const daysPastDue = Math.max(0, daysBetween(d.dueDate, asOfDate))
    const bucket = out.find((b) => daysPastDue >= b.dayMin && daysPastDue <= b.dayMax)
    if (!bucket) continue
    bucket.totalAmount += d.balance
    bucket.count += 1
    bucket.documentIds.push(d.id)
    totalOutstanding += d.balance
  }
  return { buckets: out, totalOutstanding, documentCount: docs.length }
}

/**
 * Convenience — keep documents that are still receivable/payable
 * (status !== 'paid' && balance > 0) before passing to `computeAgingBuckets`.
 */
export function filterOpenDocuments<D extends PartyDocument>(docs: D[]): D[] {
  return docs.filter((d) => d.status !== 'paid' && d.balance > 0)
}
