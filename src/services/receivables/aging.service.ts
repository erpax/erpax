/**
 * A/R Aging Calculator — receivables-side wrapper over `@/services/parties/aging`.
 *
 * Output naming (`invoices`, `ARAgingReport`) differs from A/P; bucket math
 * is the shared algorithm.
 *
 * @accounting IFRS IFRS-9 financial-instruments expected-credit-loss
 * @accounting US-GAAP ASC-326 credit-losses-cecl
 * @accounting US-GAAP ASC-310 receivables
 * @standard ISO-8601-1:2019 date-time as-of-date
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §5
 */

import {
  computeAgingBuckets,
  daysBetween,
  filterOpenDocuments,
  type AgingBucket as SharedAgingBucket,
} from '@/services/parties'
import type { Invoice, ARAgingBucket, ARAgingReport } from '@/types/receivables'

/**
 * Map a shared aging bucket → A/R-shaped bucket (invoices[] + percentage).
 */
function adaptBucket(b: SharedAgingBucket, byId: Map<string, Invoice>, totalAR: number): ARAgingBucket {
  const invoices = b.documentIds.map((id) => byId.get(id)).filter((x): x is Invoice => !!x)
  return {
    name: b.name,
    dayMin: b.dayMin,
    dayMax: b.dayMax,
    invoices,
    totalAmount: b.totalAmount,
    invoiceCount: b.count,
    percentage: totalAR > 0 ? (b.totalAmount / totalAR) * 100 : 0,
  }
}

export class ARAgingCalculator {
  /** Generate A/R Aging Report for a list of invoices. */
  static generateAgingReport(invoices: Invoice[], asOfDate: Date = new Date()): ARAgingReport {
    const open = filterOpenDocuments(
      invoices.filter((i) => i.status === 'partial' || i.status === 'overdue'),
    )
    const byId = new Map(open.map((i) => [i.id, i]))

    const { buckets: shared, totalOutstanding } = computeAgingBuckets(open, asOfDate)
    const buckets = shared.map((b) => adaptBucket(b, byId, totalOutstanding))

    const overdueBucket = buckets.find((b) => b.name.includes('31-60'))
    const overdueDays = overdueBucket?.dayMin ?? 0
    const overdueTotal = buckets
      .filter((b) => b.dayMin > 30)
      .reduce((s, b) => s + b.totalAmount, 0)
    const oldest = open.reduce<Invoice | null>(
      (prev, cur) => (!prev || new Date(cur.dueDate) < new Date(prev.dueDate) ? cur : prev),
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
        `Oldest Invoice: ${oldest ? `${oldest.invoiceNumber} (${daysBetween(oldest.dueDate, new Date())} days)` : 'N/A'}`,
      ],
    }
  }

  /** Collection priority — older + larger invoices first. */
  static calculateCollectionPriority(
    invoices: Invoice[],
  ): { invoiceId: string; priority: number }[] {
    return invoices
      .map((inv) => ({
        invoiceId: inv.id,
        priority: Math.max(0, daysBetween(inv.dueDate, new Date())) * (inv.balance / 10000),
      }))
      .sort((a, b) => b.priority - a.priority)
  }

  /** A/R metrics: totals, average DSO, overdue counts, largest invoice. */
  static calculateARMetrics(invoices: Invoice[], asOfDate: Date = new Date()) {
    const open = invoices.filter((inv) => inv.status !== 'paid')
    const totalAR = open.reduce((s, inv) => s + inv.balance, 0)
    const dsoSamples = open.map((inv) => daysBetween(inv.invoiceDate, asOfDate))
    const avgDaysOutstanding = dsoSamples.length
      ? Math.round(dsoSamples.reduce((a, b) => a + b, 0) / dsoSamples.length)
      : 0
    const overdue = open.filter((inv) => daysBetween(inv.dueDate, asOfDate) > 0)
    return {
      totalAR,
      totalInvoices: open.length,
      avgDaysOutstanding,
      overdueInvoices: overdue.length,
      overduePercentage: open.length ? ((overdue.length / open.length) * 100).toFixed(2) : '0.00',
      largestInvoice: open.length ? Math.max(...open.map((inv) => inv.balance)) : 0,
      oldestInvoice: dsoSamples.length ? Math.max(...dsoSamples) : 0,
    }
  }
}
