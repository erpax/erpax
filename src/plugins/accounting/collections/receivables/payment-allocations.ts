/**
 * # Payment Allocations
 *
 * @summary Explicit cash-receipt allocation table linking payments to one or more invoices/bills, with multi-currency FX tracking.
 *
 * ## Core Function
 *
 * Payment allocations serve as the critical audit trail mapping cash receipts to AR settlement.
 * A single payment (wire transfer, check) often settles multiple invoices (e.g., customer paying Q1 outstanding in one transaction);
 * this collection captures the per-invoice split. Each row links a payment to one target (invoice, bill, credit memo, or on-account credit)
 * with allocation amount, allocation date, and optional FX conversion. When allocations for a payment sum to ≥ invoice.totalAmount,
 * the payment.hook triggers `invoice:completed` cascade. SOX §404 control TOM-AR-02 requires the auditor to walk every cash receipt
 * to its allocated invoice(s); this collection is the durable evidence.
 *
 * ## Architecture
 *
 * Multi-tenant isolation via `tenantId`. Payment relationship links to the cash-side payment row; targetType discriminator (invoice, bill,
 * credit_memo, on_account) gates the invoice relationship. FX conversion field (allocatedFx) tracks foreign-exchange impacts when
 * payment.currency ≠ invoice.currency; the difference vs. allocatedAmount × rate is FX gain/loss. AllocationKind (manual, auto_fifo,
 * auto_reference, bank_match, stripe_webhook) documents allocation mechanism for audit context. ReverseOf field tracks un-allocation
 * (when an erroneous allocation is undone; creates a reversing row with isFullySettling = false).
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — stamp tenant context
 * - **beforeChange:** autoPopulateCreatedBy — track allocation user/operator
 * - **afterChange:** auditTrailAfterChange — log allocation details, FX calculations, status transitions
 *
 * ## Key Fields
 *
 * - **reference (text, index):** Optional human-readable allocation reference (e.g. "INV-2026-001 (partial)"). Auto-populated from payment+invoice if omitted.
 * - **payment (relationship → payments, required, index):** The cash-side payment row this allocation draws from. @standard IAS-7 cash-flow classification
 * - **targetType (select, required, default: invoice):** Allocation target: invoice (AR), bill (AP), credit_memo (CM offset), on_account (customer account credit).
 * - **invoice (relationship → invoices):** Target invoice/bill/credit memo (all use invoices collection with invoiceType discriminator).
 * - **allocationDate (date, required, index):** ISO-8601 allocation effective date (typically = payment.paymentDate). Drives AR aging.
 * - **allocatedAmount (number, required, cents):** Amount allocated in payment currency. Σ(allocations.allocatedAmount) per payment ≤ payment.amount. @standard IFRS-15 §47 transaction-price
 * - **allocatedFx (number):** When payment.currency ≠ invoice.currency, the FX-converted allocation amount in invoice currency. Diff vs. allocatedAmount × rate is FX gain/loss.
 * - **isFullySettling (checkbox, readOnly, default: false):** True when this allocation pushes invoice.totalAllocated ≥ invoice.totalAmount. Triggers `invoice:completed` cascade.
 * - **allocatedBy (relationship → users):** User (or `system` for auto-allocation) who performed allocation. Audit trail for review.
 * - **allocationKind (select, default: manual):** Mechanism: manual (operator picked), auto_fifo (oldest-invoice-first), auto_reference (EndToEndId match), bank_match (reconciliation), stripe_webhook (platform automation).
 * - **reverseOf (relationship → payment-allocations):** When un-allocating: the original allocation this row reverses. Maintains append-only audit trail.
 * - **status (select, required, default: posted):** Lifecycle: draft, posted, reversed. Posted allocations are immutable; reversed rows document undoing.
 * - **createdBy (relationship → users, readOnly):** User who created the allocation.
 * - **createdAt (date, readOnly):** Creation timestamp (ISO-8601).
 * - **modifiedBy (relationship → users, readOnly):** Last user who modified the allocation (status → reversed).
 * - **modifiedAt (date, readOnly):** Last modification timestamp.
 * - **note (textarea):** Internal notes (FX explanation, manual allocation reason, reference breakdown).
 * - **tenantId (relationship → tenants, required, index):** Multi-tenant isolation; set by autoPopulateTenant.
 *
 * ## Core Invariants
 *
 * - **AllocationAmount Constraint:** allocatedAmount ≤ payment.amount. Σ(allocations) per payment must not exceed payment.totalAmount.
 * - **CurrencyConsistency:** When allocatedFx is set, invoice.currency ≠ payment.currency. When null, currencies match.
 * - **ImmutablePosted:** Posted allocations cannot be modified; reversal is via reverseOf → new row with status = reversed.
 * - **InvoiceCompleteness:** When isFullySettling = true, payment.hook verifies Σ(allocations) ≥ invoice.totalAmount before cascading invoice:completed.
 * - **TenantIsolation:** Queries filtered by tenantId; cross-tenant access denied. @standard SOX §302
 *
 * ## Audit Trail
 *
 * Every record captures: createdBy (user + timestamp), modifiedBy (user + timestamp), lastModified (ISO-8601), lastModifiedBy (user ID).
 * All allocations (posted and reversed) logged to `audit-events` with full field deltas. FX conversions separately noted for audit review,
 * as they impact AR aging and realized gains/losses. Reversals append new rows with reverseOf reference, maintaining append-only integrity.
 * @standard SOX §302 §404 AR settlement control TOM-AR-02
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "alloc_uuid_2026_001",
 *   "tenantId": "tenant_bg_ltd",
 *   "reference": "INV-2026-001 + INV-2026-002 (partial)",
 *   "payment": "pmt_uuid_wire_20260510",
 *   "targetType": "invoice",
 *   "invoice": "inv_uuid_54321",
 *   "allocationDate": "2026-05-10",
 *   "allocatedAmount": 150000,
 *   "allocatedFx": null,
 *   "isFullySettling": true,
 *   "allocatedBy": "user_uuid_accounting_team",
 *   "allocationKind": "auto_fifo",
 *   "reverseOf": null,
 *   "status": "posted",
 *   "createdBy": "user_uuid_accounting_team",
 *   "createdAt": "2026-05-10T17:30:00Z",
 *   "modifiedBy": "user_uuid_accounting_team",
 *   "modifiedAt": "2026-05-10T17:30:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec cash-receipt allocation audit trail
 * @useCase Multi-invoice payment settlement, FX tracking, AR aging, SOX TOM-AR-02 audit trail
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IFRS-15 §47 §53 transaction-price-allocation
 * @accounting IFRS IAS-7 §6 cash-flow-classification
 * @accounting US-GAAP ASC-606-10-32 transaction-price
 * @audit ISO-19011:2018 audit-trail allocation-evidence
 * @compliance SOX §302 §404 internal-controls cash-allocation TOM-AR-02
 * @security Multi-tenant isolation; append-only reversals for immutable audit trail
 * @see ./Payments.ts (cash receipt)
 * @see ./Invoices.ts (AR settlement target)
 * @see ./CreditMemos.ts (CM offset target)
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, statusField, notesField, auditFields } from '@/fields/accounting/base-accounting-fields'

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
    multiTenancyField(),
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
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('payment-allocations')],
  },
  timestamps: true,
}

export default PaymentAllocations
