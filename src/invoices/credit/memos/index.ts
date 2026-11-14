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
 * A refund used to be its own collection: one row per cash payment back, each requiring exactly
 * one credit memo. It is now the memo's own `refunds` list — the cash-out stage of the same
 * document — so a partial refund is one more line, and the memo settles when the lines that
 * reached the customer cover its amount.
 *
 * @invariant refunded(memo) is the sum of its issued and settled refund lines, never more than is recorded
 * @invariant a memo whose refund lines cover its amount is settled; a failed or voided line pays nothing
 * @invariant the lines still in play never promise more than the memo's amount — an over-refund is refused
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
 * @standard ISO-20022 pacs.004 payment-return
 * @accounting IFRS IFRS-15 §B22 refund-liability
 * @accounting IFRS IFRS-15 §B47 contract-cancellation
 * @accounting US-GAAP ASC-606-10-32-10 variable-consideration
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls credit-memo-approval
 * @compliance PCI-DSS-4.0 §3.2 tokenized-card-data via-stripe
 * @security ISO-27002 §5.4 segregation-of-duties issuer-vs-approver
 * @see src/plugins/receivables/types.ts (legacy type definition)
 * @see docs/STANDARDS.md §4.2
 */

import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/collections/shared/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/collections/shared/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/collections/shared/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/collections/shared/auditTrailAfterChange'
import { enforceSegregationOfDuties } from '@/hooks/collections/shared/enforceSegregationOfDuties'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '@/auth'
import {
  currencyField,
  statusField,
  notesField,
  auditFields,
} from '@/base/accounting/field'
import { validateNotLocked } from '@/utility'
import { preset, type Preset } from '@/preset'

/** One cash payment back to the customer against a memo. */
export interface RefundLine {
  amount?: number | null
  status?: string | null
  refundedAt?: string | null
  settledAt?: string | null
}

/** The refund statuses in which money has actually left: issued to the rail, or settled. */
export const paidStages = (): string[] => ['issued', 'settled']

/** Cash paid back against a memo: the sum of its lines that reached the customer. */
export function refunded(memo: { refunds?: readonly RefundLine[] | null }): number {
  return (memo.refunds ?? []).filter((r) => paidStages().includes(r.status ?? '')).reduce((sum, r) => sum + (r.amount ?? 0), 0)
}

/** What the lines still in play promise to pay back: every line that has not failed or been voided. */
export function committed(memo: { refunds?: readonly RefundLine[] | null }): number {
  return (memo.refunds ?? []).filter((r) => r.status !== 'failed' && r.status !== 'voided').reduce((sum, r) => sum + (r.amount ?? 0), 0)
}

/** A memo cannot pay back more than it credits: the lines in play must fit within its amount. */
export const withinAmount = (value: unknown, { siblingData }: { siblingData?: { amount?: number | null } }): true | string => {
  const promised = committed({ refunds: Array.isArray(value) ? (value as RefundLine[]) : [] })
  const amount = siblingData?.amount ?? 0
  return promised <= amount || `Refund lines promise ${promised}, more than the memo's ${amount}.`
}

/** True when the memo's settled refund lines cover its whole amount — the memo itself is settled. */
export function coveredByRefunds(memo: { amount?: number | null; refunds?: readonly RefundLine[] | null }): boolean {
  const settled = (memo.refunds ?? []).filter((r) => r.status === 'settled').reduce((sum, r) => sum + (r.amount ?? 0), 0)
  return (memo.amount ?? 0) > 0 && settled >= (memo.amount ?? 0)
}

/** Stamp each line when it is issued and when it settles, and settle the memo once it is covered. */
export function withRefundStages<T extends { amount?: number | null; status?: string | null; refunds?: RefundLine[] | null }>(memo: T, now: string): T {
  const refunds = (memo.refunds ?? []).map((r) => ({
    ...r,
    refundedAt: r.refundedAt ?? (paidStages().includes(r.status ?? '') ? now : r.refundedAt),
    settledAt: r.settledAt ?? (r.status === 'settled' ? now : r.settledAt),
  }))
  const next = { ...memo, refunds }
  const open = memo.status === 'issued' || memo.status === 'applied'
  return open && coveredByRefunds(next) ? { ...next, status: 'settled' } : next
}

const stageRefunds: CollectionBeforeChangeHook = ({ data }) => withRefundStages(data, new Date().toISOString())

/** The saved lists: every memo, and the ones with a cash refund — where the Refunds collection stood. */
export function memoPresets(): Preset[] {
  return [
    preset('Credit memos', 'credit-memos', {}, ['memoNumber', 'customer', 'amount', 'status', 'issuedAt']),
    preset('Refunds', 'credit-memos', { 'refunds.amount': { exists: true } }, ['memoNumber', 'customer', 'amount', 'status', 'settledAt']),
  ]
}

const CreditMemos: CollectionConfig = {
  slug: 'credit-memos',
  labels: { singular: 'Credit Memo', plural: 'Credit Memos' },
  enableQueryPresets: true,
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
      relationTo: 'parties',
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
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'sales-orders',
      admin: { description: 'Originating sales order, when the credit skips the invoice (ISO-20022 pacs.004 end-to-end trace).' },
    },
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
      name: 'refunds',
      type: 'array',
      labels: { singular: 'Refund', plural: 'Refunds' },
      validate: withinAmount,
      admin: { description: 'Cash paid back against this memo — one line per payment, so a partial refund is one more line.' },
      fields: [
        { name: 'amount', type: 'number', required: true, min: 0, admin: { description: 'Amount paid back, in cents.' } },
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
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'pending',
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Issued', value: 'issued' },
            { label: 'Settled', value: 'settled' },
            { label: 'Failed', value: 'failed' },
            { label: 'Voided', value: 'voided' },
          ],
        },
        { name: 'refundedAt', type: 'date', admin: { readOnly: true } },
        { name: 'settledAt', type: 'date', admin: { readOnly: true } },
        { name: 'failureReason', type: 'textarea' },
        { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', admin: { readOnly: true, description: 'GL posting of the cash leaving (Dr Refunds Payable / Cr Cash).' } },
      ],
    },
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
      stageRefunds,
      autoSetTimestamp('settledAt', (d) => (d as { status?: string }).status === 'settled'),
    ],
    afterChange: [auditTrailAfterChange('credit-memos')],
  },
  timestamps: true,
}

export default CreditMemos
