/**
 * Cache the parent invoice's EN-16931 document totals from its lines, recomputed
 * on every line create / update / delete. Ports erpax
 * `InvoiceTotalsConcern#assign_line_totals` (before_save) to the Payload child
 * hook seam via the shared aggregate factory.
 *
 *   Σ line.pricing.itemTotal       → invoice.amounts.itemTotal     (BT-106)
 *   Σ line.discounting.discountTotal → invoice.amounts.discountTotal
 *   Σ line.taxation.netTotal       → invoice.amounts.netTotal      (BT-109)
 *   Σ line.taxation.taxTotal       → invoice.amounts.taxTotal      (BT-110)
 *   Σ line.totals.totalAmount      → invoice.amounts.totalAmount   (BT-112)
 *   derived: totalDue = totalAmount − totalPaid                   (BT-115)
 *
 * `totalPaid` is maintained by the payments side; the fetch-and-merge in the
 * factory keeps the two writers from clobbering each other's `amounts` fields.
 *
 * @standard EN-16931:2017 BT-106/109/110/112/115 document-totals
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @see src/hooks/factories/recompute-parent-aggregates.ts
 */
import { recomputeParentAggregates } from '@/factory/recompute-parent-aggregates'

export const invoiceLineTotals = recomputeParentAggregates({
  childSlug: 'invoice-lines',
  parentSlug: 'invoices',
  parentRelField: 'invoice',
  aggregates: [
    { target: 'amounts.itemTotal', op: 'sum', source: 'pricing.itemTotal' },
    { target: 'amounts.discountTotal', op: 'sum', source: 'discounting.discountTotal' },
    { target: 'amounts.netTotal', op: 'sum', source: 'taxation.netTotal' },
    { target: 'amounts.taxTotal', op: 'sum', source: 'taxation.taxTotal' },
    { target: 'amounts.totalAmount', op: 'sum', source: 'totals.totalAmount' },
  ],
  derive: ({ read, set }) => {
    const total = Number(read('amounts.totalAmount') ?? 0)
    const paid = Number(read('amounts.totalPaid') ?? 0)
    set('amounts.totalDue', total - paid)
  },
})
