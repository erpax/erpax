/**
 * Shared Aging Service — unified aging analysis across all domains.
 *
 * Consolidated from:
 * - src/plugins/parties/aging.ts (core algorithm)
 * - src/plugins/receivables/aging.ts (A/R wrapper)
 * - src/plugins/payables/aging.ts (A/P wrapper)
 *
 * @standard ISO-8601-1:2019 date-time days-between-arithmetic
 * @accounting IFRS IFRS-9 expected-credit-loss aging-buckets
 * @accounting IFRS IAS-37 provisions-contingent-liabilities
 * @accounting US-GAAP ASC-326 credit-losses-cecl
 * @accounting US-GAAP ASC-310 receivables
 * @accounting US-GAAP ASC-405 liabilities
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §5
 */

/**
 * Document with aging-relevant fields
 */
export interface AgingDocument {
  id: string
  status: string
  balance: number
  dueDate: Date | string
  [key: string]: unknown
}

/**
 * Aging bucket definition
 */
export interface BucketDefinition {
  name: string
  dayMin: number
  dayMax: number
}

/**
 * Computed aging bucket with totals
 */
export interface AgingBucket extends BucketDefinition {
  totalAmount: number
  count: number
  documentIds: string[]
}

/**
 * Standard aging buckets (0-30, 31-60, 61-90, 90+)
 */
export const DEFAULT_AGING_BUCKETS: BucketDefinition[] = [
  { name: '0-30 days', dayMin: 0, dayMax: 30 },
  { name: '31-60 days', dayMin: 31, dayMax: 60 },
  { name: '61-90 days', dayMin: 61, dayMax: 90 },
  { name: '90+ days', dayMin: 91, dayMax: Infinity },
]

/**
 * Calculate days between two dates (older date first)
 */
export function daysBetween(from: Date | string, to: Date | string = new Date()): number {
  const fromDate = new Date(from)
  const toDate = new Date(to)
  const ms = toDate.getTime() - fromDate.getTime()
  return Math.ceil(ms / (1000 * 60 * 60 * 24))
}

/**
 * Filter documents that are still open (not paid)
 */
export function filterOpenDocuments<D extends AgingDocument>(docs: D[]): D[] {
  return docs.filter((d) => d.status !== 'paid' && d.balance > 0)
}

/**
 * Compute aging buckets for a list of open documents
 */
export function computeAgingBuckets<D extends AgingDocument>(
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

// ─────────────────────────────────────────────────────────────────────────
// AR/AP SPECIFIC ADAPTERS
// ─────────────────────────────────────────────────────────────────────────

/**
 * A/R-specific aging report
 */
export interface ARAgingReport {
  asOfDate: Date
  currency: string
  buckets: Array<{
    name: string
    dayMin: number
    dayMax: number
    invoices: unknown[]
    totalAmount: number
    invoiceCount: number
    percentage: number
  }>
  totalARBalance: number
  totalInvoices: number
  overdueDays: number
  notes: string[]
}

/**
 * A/P-specific aging report
 */
export interface APAgingReport {
  asOfDate: Date
  currency: string
  buckets: Array<{
    name: string
    dayMin: number
    dayMax: number
    bills: unknown[]
    totalAmount: number
    billCount: number
    percentage: number
  }>
  totalAPBalance: number
  totalBills: number
  overdueDays: number
  notes: string[]
}

/**
 * Generate A/R aging report
 */
export function generateARAgingReport(
  invoices: AgingDocument[],
  asOfDate: Date = new Date(),
): ARAgingReport {
  const open = filterOpenDocuments(invoices.filter((i) => i.status === 'partial' || i.status === 'overdue'))
  const byId = new Map(open.map((i) => [i.id, i]))

  const { buckets: shared, totalOutstanding } = computeAgingBuckets(open, asOfDate)

  const buckets = shared.map((b) => ({
    name: b.name,
    dayMin: b.dayMin,
    dayMax: b.dayMax,
    invoices: b.documentIds.map((id) => byId.get(id)).filter((x): x is AgingDocument => !!x),
    totalAmount: b.totalAmount,
    invoiceCount: b.count,
    percentage: totalOutstanding > 0 ? (b.totalAmount / totalOutstanding) * 100 : 0,
  }))

  const overdueBucket = buckets.find((b) => b.name.includes('31-60'))
  const overdueDays = overdueBucket?.dayMin ?? 0
  const overdueTotal = buckets
    .filter((b) => b.dayMin > 30)
    .reduce((s, b) => s + b.totalAmount, 0)
  const oldest = open.reduce<AgingDocument | null>(
    (prev, cur) =>
      !prev || new Date(cur.dueDate) < new Date(prev.dueDate) ? cur : prev,
    null,
  )

  return {
    asOfDate,
    currency: 'EUR',
    buckets,
    totalARBalance: totalOutstanding,
    totalInvoices: open.length,
    overdueDays,
    notes: [
      `Total A/R Balance: $${(totalOutstanding / 100).toFixed(2)}`,
      `Total Invoices: ${open.length}`,
      `Percentage Overdue: ${totalOutstanding > 0 ? ((overdueTotal / totalOutstanding) * 100).toFixed(2) : '0.00'}%`,
      `Oldest Invoice: ${oldest ? `${oldest.id} (${daysBetween(oldest.dueDate, new Date())} days)` : 'N/A'}`,
    ],
  }
}

/**
 * Generate A/P aging report
 */
export function generateAPAgingReport(
  bills: AgingDocument[],
  asOfDate: Date = new Date(),
): APAgingReport {
  const open = filterOpenDocuments(bills.filter((b) => b.status !== 'paid'))
  const byId = new Map(open.map((b) => [b.id, b]))

  const { buckets: shared, totalOutstanding } = computeAgingBuckets(open, asOfDate)

  const buckets = shared.map((b) => ({
    name: b.name,
    dayMin: b.dayMin,
    dayMax: b.dayMax,
    bills: b.documentIds.map((id) => byId.get(id)).filter((x): x is AgingDocument => !!x),
    totalAmount: b.totalAmount,
    billCount: b.count,
    percentage: totalOutstanding > 0 ? (b.totalAmount / totalOutstanding) * 100 : 0,
  }))

  const overdueBucket = buckets.find((b) => b.name.includes('31-60'))
  const overdueDays = overdueBucket?.dayMin ?? 0
  const overdueTotal = buckets
    .filter((b) => b.dayMin > 30)
    .reduce((s, b) => s + b.totalAmount, 0)

  return {
    asOfDate,
    currency: 'EUR',
    buckets,
    totalAPBalance: totalOutstanding,
    totalBills: open.length,
    overdueDays,
    notes: [
      `Total A/P Balance: $${(totalOutstanding / 100).toFixed(2)}`,
      `Total Bills: ${open.length}`,
      `Percentage Overdue: ${totalOutstanding > 0 ? ((overdueTotal / totalOutstanding) * 100).toFixed(2) : '0.00'}%`,
    ],
  }
}
