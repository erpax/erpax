/**
 * A/P Aging Calculator — payables-side wrapper over `@/services/parties/aging`.
 *
 * Mirror of `receivables/aging.ts`; identical bucket math but A/P-shaped
 * output (`bills`, `APAgingReport`) plus a cash-flow-impact section.
 *
 * @accounting IFRS IAS-37 provisions-contingent-liabilities
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting US-GAAP ASC-405 liabilities
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @standard ISO-8601-1:2019 date-time as-of-date
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §5
 */

import {
  computeAgingBuckets,
  filterOpenDocuments,
  type AgingBucket as SharedAgingBucket,
} from '@/services/parties'
import type { Bill, APAgingBucket, APAgingReport, PaymentScheduleItem } from '@/types/payables'

function adaptBucket(b: SharedAgingBucket, byId: Map<string, Bill>, totalAP: number): APAgingBucket {
  const bills = b.documentIds.map((id) => byId.get(id)).filter((x): x is Bill => !!x)
  return {
    name: b.name,
    dayMin: b.dayMin,
    dayMax: b.dayMax,
    bills,
    totalAmount: b.totalAmount,
    billCount: b.count,
    percentage: totalAP > 0 ? (b.totalAmount / totalAP) * 100 : 0,
  }
}

export class APAgingCalculator {
  /** Generate A/P Aging Report for a list of bills. */
  static generateAgingReport(bills: Bill[], asOfDate: Date = new Date()): APAgingReport {
    const open = filterOpenDocuments(bills.filter((b) => b.status !== 'paid'))
    const byId = new Map(open.map((b) => [b.id, b]))

    const { buckets: shared, totalOutstanding } = computeAgingBuckets(open, asOfDate)
    const buckets = shared.map((b) => adaptBucket(b, byId, totalOutstanding))

    const totalDueAmount = buckets
      .filter((b) => b.dayMin <= 30)
      .reduce((s, b) => s + b.totalAmount, 0)
    const overdueTotal = buckets
      .filter((b) => b.dayMin > 30)
      .reduce((s, b) => s + b.totalAmount, 0)

    return {
      asOfDate,
      currency: 'EUR',
      buckets,
      totalAPBalance: totalOutstanding,
      totalBills: open.length,
      totalDueAmount,
      notes: [
        `Total A/P Balance: $${(totalOutstanding / 100).toFixed(2)}`,
        `Total Bills: ${open.length}`,
        `Percentage Overdue: ${totalOutstanding > 0 ? ((overdueTotal / totalOutstanding) * 100).toFixed(2) : '0.00'}%`,
      ],
    }
  }

  /** Generate a payment schedule prioritizing soonest-due bills. */
  static generatePaymentSchedule(bills: Bill[]): PaymentScheduleItem[] {
    return filterOpenDocuments(bills.filter((b) => b.status !== 'paid'))
      .map<PaymentScheduleItem>((b) => ({
        billId: b.id,
        vendorId: b.vendorId,
        paymentAmount: b.balance,
        paymentDate: b.dueDate,
        status: 'scheduled',
        discountEligible: b.discountAvailable > 0,
      }))
      .sort((a, b) => a.paymentDate.getTime() - b.paymentDate.getTime())
  }
}
