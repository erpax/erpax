/**
 * Cache the parent invoice's settled amount from its payments, recomputed on
 * every payment create / update / delete. Ports erpax
 * `InvoiceTotalsConcern#assign_payment_totals` (total_paid = payments.sum;
 * total_due = total_amount − total_paid) to the Payload child hook seam.
 *
 *   Σ payment.amounts.amount → invoice.amounts.totalPaid
 *   derived: totalDue = totalAmount − totalPaid                 (BT-115)
 *
 * Bills live on the same `invoices` collection (typeStatus.invoiceType = 'bill'),
 * so AP settlement is maintained by the same hook. The factory's fetch-and-merge
 * preserves the line-maintained `amounts` fields.
 *
 * @standard EN-16931:2017 BT-113/115 paid-amount amount-due-for-payment
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @see src/hooks/factories/recompute-parent-aggregates.ts
 * @see src/collections/InvoiceLines/hooks/recomputeInvoiceTotals.ts
 */
import { recomputeParentAggregates } from '@/factory/recompute-parent-aggregates'

export const invoicePaidTotals = recomputeParentAggregates({
  childSlug: 'payments',
  parentSlug: 'invoices',
  parentRelField: 'invoice',
  aggregates: [{ target: 'amounts.totalPaid', op: 'sum', source: 'amounts.amount' }],
  derive: ({ read, set }) => {
    const total = Number(read('amounts.totalAmount') ?? 0)
    const paid = Number(read('amounts.totalPaid') ?? 0)
    set('amounts.totalDue', total - paid)
  },
})
