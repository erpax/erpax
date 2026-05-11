/**
 * Refunds — cash-out side of CreditMemos.
 *
 * Where CreditMemo books the contra-revenue / refund-liability,
 * Refund tracks the actual cash payment back to the customer
 * (Stripe refund, ACH return, paper check). Posts via `payment:sent`.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time refunded-at
 * @standard ISO-20022 pacs.004 payment-return
 * @accounting IFRS IFRS-15 §B22 refund-liability-settlement
 * @accounting US-GAAP ASC-606-10-32-10 variable-consideration
 * @audit ISO-19011:2018 audit-trail refund-evidence
 * @compliance SOX §404 internal-controls refund-approval
 * @compliance PCI-DSS-4.0 §3.2 tokenized-card-data via-stripe
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/plugins/auth/access'
import { multiTenancyField, currencyField, statusField, notesField, auditFields } from '../fields/base-accounting-fields'
import { validateNotLocked } from '../utilities/period-lock'

const Refunds: CollectionConfig = {
  slug: 'refunds',
  labels: { singular: 'Refund', plural: 'Refunds' },
  admin: { useAsTitle: 'refundNumber', defaultColumns: ['refundNumber', 'creditMemo', 'amount', 'status', 'refundedAt'] },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    { name: 'refundNumber', type: 'text', required: true, unique: true, index: true },
    { name: 'creditMemo', type: 'relationship', relationTo: 'credit-memos', required: true },
    { name: 'invoice', type: 'relationship', relationTo: 'invoices' },
    // Slice XXXXXXXX-c (2026-05-11): retargeted from 'orders' → 'sales-orders'.
    // ISO-20022 pacs.004 cash-out can reference an originating sales order
    // for end-to-end O2C audit traceability when refunds skip the invoice.
    { name: 'order', type: 'relationship', relationTo: 'sales-orders' },
    { name: 'amount', type: 'number', required: true, min: 0 },
    currencyField(),
    {
      name: 'method',
      type: 'select',
      required: true,
      options: [
        { label: 'Stripe (card)', value: 'stripe' },
        { label: 'ACH return', value: 'ach' },
        { label: 'SEPA refund', value: 'sepa' },
        { label: 'Paper check', value: 'check' },
        { label: 'Cash', value: 'cash' },
        { label: 'Store credit', value: 'store_credit' },
      ],
    },
    { name: 'stripeRefundId', type: 'text', admin: { description: 'Stripe refund ID for cross-system traceability.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending', value: 'pending' },
        { label: 'Issued', value: 'issued' },
        { label: 'Settled', value: 'settled' },
        { label: 'Failed', value: 'failed' },
        { label: 'Voided', value: 'voided' },
      ],
      'draft',
    ),
    { name: 'refundedAt', type: 'date', admin: { readOnly: true } },
    { name: 'settledAt', type: 'date', admin: { readOnly: true } },
    { name: 'failureReason', type: 'textarea' },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', admin: { readOnly: true } },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      validateNotLocked,
      autoPopulateCreatedBy,
      enforceSegregationOfDuties(),
      autoSetTimestamp('refundedAt', (d) => (d as { status?: string }).status === 'issued'),
      autoSetTimestamp('settledAt', (d) => (d as { status?: string }).status === 'settled'),
    ],
    afterChange: [auditTrailAfterChange('refunds')],
  },
  timestamps: true,
}

export default Refunds
