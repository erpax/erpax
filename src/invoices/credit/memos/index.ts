/**
 * Credit Memos — IFRS 15 §B22 contract-liability adjustments.
 *
 * Today only the `CreditMemo` type lives in `src/plugins/receivables/types.ts`
 * — there is no Payload collection, no event, no GL posting. This
 * collection closes that gap so refunds, returns-credit, and write-offs
 * have a queryable record with audit trail and SoD enforcement.
 *
 * Lifecycle: draft → issued → applied (against an invoice) → settled
 * (cash refund paid) OR voided.
 *
 * Relations:
 *   tenant      → tenants
 *   customer    → customers (party owed the credit)
 *   invoice     → invoices  (the original sale being credited)
 *   journalEntry → journal-entries (the GL posting that books the credit)
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time issued-at applied-at settled-at
 * @standard EN-16931:2017 credit-note-semantic-model
 * @accounting IFRS IFRS-15 §B22 refund-liability
 * @accounting IFRS IFRS-15 §B47 contract-cancellation
 * @accounting US-GAAP ASC-606-10-32-10 variable-consideration
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls credit-memo-approval
 * @security ISO-27002 §5.4 segregation-of-duties issuer-vs-approver
 * @see src/plugins/receivables/types.ts (legacy type definition)
 * @see docs/STANDARDS.md §4.2
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/auto/populate/tenant'
import { autoPopulateCreatedBy } from '@/auto/populate/created/by'
import { autoSetTimestamp } from '@/auto/set/timestamp'
import { auditTrailAfterChange } from '@/audit/trail/after/change'
import { enforceSegregationOfDuties } from '@/enforce/segregation/of/duty'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '@/auth'
import {
  currencyField,
  statusField,
  notesField,
  auditFields,
} from '@/base/accounting/field'
import { validateNotLocked } from '@/utility/period-lock'

const CreditMemos: CollectionConfig = {
  slug: 'credit-memos',
  labels: { singular: 'Credit Memo', plural: 'Credit Memos' },
  admin: {
    useAsTitle: 'memoNumber',
    defaultColumns: ['memoNumber', 'customer', 'amount', 'status', 'issuedAt'],
  },
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
    { name: 'memoNumber', type: 'text', required: true, unique: true, index: true },
    {
      name: 'customer',
      type: 'relationship',
      // Slice XXXXXXXX-b (2026-05-11): retargeted from 'addresses' → 'customers'.
      // The legacy comment ('ecommerce plugin's customer/address collection')
      // captured the bug: the deleted ecommerce plugin used a polymorphic
      // address-as-customer shape that never matched IFRS-15 §B22 reality.
      // EN-16931 §BG-7 buyer + IFRS-15 §B22 contra-revenue both need the
      // customer party itself.
      relationTo: 'customers',
      admin: { description: 'Party receiving the credit (IFRS-15 §B22 contra-revenue counterparty).' },
    },
    {
      name: 'invoice',
      type: 'relationship',
      relationTo: 'invoices',
      admin: { description: 'Original invoice being credited (optional for general write-offs).' },
    },
    {
      name: 'reason',
      type: 'select',
      required: true,
      options: [
        { label: 'Refund — customer return', value: 'refund_return' },
        { label: 'Refund — service issue', value: 'refund_service' },
        { label: 'Pricing adjustment', value: 'pricing_adjustment' },
        { label: 'Bad debt write-off', value: 'bad_debt_writeoff' },
        { label: 'Goodwill credit', value: 'goodwill' },
        { label: 'Tax adjustment', value: 'tax_adjustment' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'reasonDetail', type: 'textarea' },
    { name: 'amount', type: 'number', required: true, min: 0, admin: { description: 'Credit amount in cents.' } },
    currencyField(),
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending Approval', value: 'pending_approval' },
        { label: 'Issued', value: 'issued' },
        { label: 'Applied (against invoice)', value: 'applied' },
        { label: 'Settled (cash refund paid)', value: 'settled' },
        { label: 'Voided', value: 'voided' },
      ],
      'draft',
    ),
    { name: 'issuedAt', type: 'date', admin: { description: 'When the credit memo was issued.', readOnly: true } },
    { name: 'appliedAt', type: 'date', admin: { description: 'When applied against an invoice.', readOnly: true } },
    { name: 'settledAt', type: 'date', admin: { description: 'When cash refund was paid.', readOnly: true } },
    {
      name: 'journalEntry',
      type: 'relationship',
      relationTo: 'journal-entries',
      admin: { description: 'GL posting that booked this credit.', readOnly: true },
    },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      validateNotLocked,
      autoPopulateCreatedBy,
      // SOX §404 / ISO 27002 §5.4: issuer ≠ approver.
      enforceSegregationOfDuties(),
      autoSetTimestamp('issuedAt', (d) => (d as { status?: string }).status === 'issued'),
      autoSetTimestamp('appliedAt', (d) => (d as { status?: string }).status === 'applied'),
      autoSetTimestamp('settledAt', (d) => (d as { status?: string }).status === 'settled'),
    ],
    afterChange: [auditTrailAfterChange('credit-memos')],
  },
  timestamps: true,
}

export default CreditMemos
