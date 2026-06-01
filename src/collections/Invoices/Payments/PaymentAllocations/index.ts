/**
 * Payment Allocations — explicit allocation table for payments that
 * partially or fully settle one OR MORE invoices/bills.
 *
 * Slice TTT (2026-05-10): added because the prior `payment.hook.ts`
 * (Slice LLL) assumed 1-to-1 payment-to-invoice via the `payment.invoiceId`
 * field. Real cash receipts often pay multiple invoices in one wire
 * transfer (a customer settling Q1 invoices in a single payment) — the
 * 1-to-1 model lost the per-invoice split. SOX §404 control TOM-AR-02
 * requires the auditor to walk every cash receipt to its allocated
 * invoice(s); this collection is the durable allocation evidence.
 *
 * Pairs with `payment.hook.ts` cascade: when a payment row's allocations
 * sum to ≥ an invoice's `totalAmount`, the hook fires `invoice:completed`
 * for that invoice (currently only the trivial 1-to-1 case is wired).
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time allocation-date
 * @accounting IFRS IFRS-15 §47 §53 transaction-price-allocation
 * @accounting US-GAAP ASC-606-10-32 transaction-price
 * @accounting IFRS IAS-7 §6 cash-flow-classification
 * @audit ISO-19011:2018 audit-trail allocation-evidence
 * @compliance SOX §404 internal-controls cash-allocation TOM-AR-02
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ../hooks/payment.hook.ts
 * @see ./PaymentRuns.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../../../hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '../../../../access/auth'
import { statusField, notesField, auditFields } from '../../../../fields/base-accounting-fields'

const PaymentAllocations: CollectionConfig = {
  slug: 'payment-allocations',
  labels: { singular: 'Payment Allocation', plural: 'Payment Allocations' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'allocationDate', 'payment', 'invoice', 'allocatedAmount', 'status'],
    description:
      'Explicit allocation of one payment to one invoice/bill — supports the multi-document cash-receipt case SOX §404 TOM-AR-02 audits.',
  },
  access: accountingCollectionAccess(),
  fields: [
    { name: 'reference', type: 'text', required: false, index: true,
      admin: { description: 'Optional human-readable reference; auto-populated from payment+invoice when omitted.' } },
    { name: 'payment', type: 'relationship', relationTo: 'payments', required: true, index: true,
      admin: { description: 'The cash-side payment row this allocation draws from.' } },
    {
      name: 'targetType',
      type: 'select',
      required: true,
      defaultValue: 'invoice',
      options: [
        { label: 'Customer Invoice (AR settlement)', value: 'invoice' },
        { label: 'Vendor Bill (AP settlement)', value: 'bill' },
        { label: 'Credit Memo (refund credit)', value: 'credit_memo' },
        { label: 'Customer Account On-Account', value: 'on_account' },
      ],
      admin: { description: 'What the allocation lands against. Most common: customer invoices for AR, vendor bills for AP.' },
    },
    { name: 'invoice', type: 'relationship', relationTo: 'invoices',
      admin: { description: 'Target invoice / bill / credit memo (uses the same `invoices` collection with `invoiceType` discriminator).' } },
    { name: 'allocationDate', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — date the allocation takes effect (typically equals payment.paymentDate).' } },
    { name: 'allocatedAmount', type: 'number', required: true,
      admin: { description: 'Allocation amount in cents. Σ(allocations.allocatedAmount) per payment must ≤ payment.amount.' } },
    { name: 'allocatedFx', type: 'number',
      admin: { description: 'When payment.currency ≠ invoice.currency, the FX-converted allocation amount in invoice currency. The diff vs allocatedAmount × rate is FX gain/loss.' } },
    { name: 'isFullySettling', type: 'checkbox', defaultValue: false,
      admin: { readOnly: true, description: 'True when this allocation pushes the invoice\'s total-allocated to ≥ totalAmount. Triggers the `invoice:completed` cascade.' } },
    { name: 'allocatedBy', type: 'relationship', relationTo: 'users',
      admin: { description: 'User (or `system` for auto-allocation) who performed this allocation.' } },
    {
      name: 'allocationKind',
      type: 'select',
      defaultValue: 'manual',
      options: [
        { label: 'Manual (operator picked invoice)', value: 'manual' },
        { label: 'Auto (FIFO oldest-invoice-first)', value: 'auto_fifo' },
        { label: 'Auto (matched by reference / EndToEndId)', value: 'auto_reference' },
        { label: 'Bank-Reconciliation Match', value: 'bank_match' },
        { label: 'Stripe Webhook Auto-Allocation', value: 'stripe_webhook' },
      ],
    },
    { name: 'reverseOf', type: 'relationship', relationTo: 'payment-allocations',
      admin: { description: 'When un-allocating: the original allocation this row reverses.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Posted', value: 'posted' },
        { label: 'Reversed', value: 'reversed' },
      ],
      'posted',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('payment-allocations'),
  timestamps: true,
}

export default PaymentAllocations
