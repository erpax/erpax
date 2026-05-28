/**
 * Payment Runs — ISO 20022 batch payment initiation.
 *
 * A Payment Run aggregates AP bills (or AR direct-debit collections)
 * into a single ISO 20022 message file: pain.001 for credit transfers
 * (AP outbound) or pain.008 for direct debits (AR inbound). The bank
 * processes the batch, returns acks/nacks, and the run reconciles
 * against the resulting bank statement.
 *
 * Status lifecycle:
 *   draft         being assembled
 *   pending_review  preparer has submitted; awaits authoriser
 *   approved      authoriser has signed; ready to export
 *   exported      pain.00X file generated and downloaded by treasury
 *   submitted     bank acknowledged receipt
 *   settled       all transactions cleared (matched on bank statement)
 *   rejected      bank rejected (full file or partial)
 *   cancelled     run was cancelled before submission
 *
 * @standard ISO-20022:2022 universal-financial-industry-message-scheme
 * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
 * @standard ISO-20022 pain.008 customer-direct-debit-initiation
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time creation-execution
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls preparer-authoriser-segregation
 * @security ISO-27002 §5.4 segregation-of-duties
 * @see src/standards/iso-20022/types.ts
 * @see docs/STANDARDS.md §4.1
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '../hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '../hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '../hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '../access/auth'
import {
  currencyField,
  statusField,
  notesField,
  auditFields,
} from '../fields/base-accounting-fields'
import { validateNotLocked } from '../services/accounting/utilities/period-lock'

const PaymentRuns: CollectionConfig = {
  slug: 'payment-runs',
  labels: { singular: 'Payment Run', plural: 'Payment Runs' },
  admin: {
    useAsTitle: 'runId',
    defaultColumns: [
      'runId',
      'messageType',
      'requestedExecutionDate',
      'numberOfTransactions',
      'controlSum',
      'status',
    ],
    description:
      'ISO 20022 batch payment initiation — pain.001 (AP credit transfer) or pain.008 (AR direct debit).',
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    {
      name: 'runId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          'Human-readable run id (e.g. PR-2026-05-AP-1). Maps to ISO 20022 GrpHdr/MsgId.',
      },
    },
    {
      name: 'messageType',
      type: 'select',
      required: true,
      options: [
        { label: 'pain.001 — Credit transfer (AP outbound)', value: 'pain_001' },
        { label: 'pain.008 — Direct debit (AR inbound)', value: 'pain_008' },
      ],
      admin: {
        description:
          'ISO 20022 message family. pain.001 pays vendors; pain.008 collects from customers (SDD).',
      },
    },
    {
      name: 'sequenceType',
      type: 'select',
      admin: {
        description:
          'pain.008 only. SEPA SDD sequence: FRST (first), RCUR (recurring), OOFF (one-off), FNAL (final).',
        condition: (data) => data?.messageType === 'pain_008',
      },
      options: [
        { label: 'FRST — First', value: 'FRST' },
        { label: 'RCUR — Recurring', value: 'RCUR' },
        { label: 'OOFF — One-off', value: 'OOFF' },
        { label: 'FNAL — Final', value: 'FNAL' },
      ],
    },
    {
      name: 'localInstrument',
      type: 'select',
      admin: {
        description: 'pain.008: CORE (B2C SDD), B2B (B2B SDD).',
        condition: (data) => data?.messageType === 'pain_008',
      },
      options: [
        { label: 'CORE — Core SDD', value: 'CORE' },
        { label: 'B2B — B2B SDD', value: 'B2B' },
      ],
    },

    {
      name: 'sourceBankAccount',
      type: 'relationship',
      relationTo: 'bank-accounts',
      required: true,
      admin: {
        description:
          'Debtor account for pain.001; creditor account for pain.008.',
      },
    },
    currencyField('EUR'),

    {
      name: 'requestedExecutionDate',
      type: 'date',
      required: true,
      admin: {
        description:
          'Bank-requested execution / collection date. Maps to PmtInf/ReqdExctnDt or ReqdColltnDt.',
      },
    },

    // ── Batch contents ──
    {
      name: 'transactions',
      type: 'array',
      labels: { singular: 'Transaction', plural: 'Transactions' },
      admin: {
        description:
          'One row per credit transfer (pain.001) or direct debit (pain.008). Maps to CdtTrfTxInf or DrctDbtTxInf.',
      },
      fields: [
        {
          name: 'endToEndId',
          type: 'text',
          required: true,
          admin: { description: 'Unique end-to-end id, propagated through the chain.' },
        },
        {
          name: 'amount',
          type: 'number',
          required: true,
          min: 0,
          admin: { description: 'Amount in cents.' },
        },
        {
          name: 'counterpartyName',
          type: 'text',
          required: true,
          admin: { description: 'Vendor (pain.001) or customer (pain.008) name.' },
        },
        { name: 'counterpartyIban', type: 'text', required: true },
        { name: 'counterpartyBic', type: 'text' },
        {
          name: 'remittanceReference',
          type: 'text',
          admin: {
            description:
              'Structured creditor reference (ISO 11649 RF) preferred; falls back to invoice/bill number.',
          },
        },
        {
          name: 'mandateId',
          type: 'text',
          admin: {
            description: 'pain.008 only — the SEPA SDD mandate id.',
            condition: (_data, sibling) =>
              (sibling as Record<string, unknown> | undefined)?.messageType === 'pain_008',
          },
        },
        {
          name: 'sourceBill',
          type: 'relationship',
          relationTo: 'invoices',
          admin: { description: 'Originating bill (pain.001) or invoice (pain.008).' },
        },
        {
          name: 'paymentRecord',
          type: 'relationship',
          relationTo: 'payments',
          admin: {
            readOnly: true,
            description: 'Payment record created when this leg settles.',
          },
        },
      ],
    },

    {
      name: 'numberOfTransactions',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Computed = transactions.length. Maps to GrpHdr/NbOfTxs.',
      },
    },
    {
      name: 'controlSum',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Computed = Σ transactions.amount. Maps to GrpHdr/CtrlSum.',
      },
    },

    // ── Sign-off chain ──
    {
      name: 'preparedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true },
    },
    { name: 'preparedAt', type: 'date', admin: { readOnly: true } },
    {
      name: 'authorisedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true },
    },
    { name: 'authorisedAt', type: 'date', admin: { readOnly: true } },

    // ── File generation telemetry ──
    {
      name: 'exportFilename',
      type: 'text',
      admin: { readOnly: true, description: 'Generated pain.00X XML filename.' },
    },
    {
      name: 'exportedAt',
      type: 'date',
      admin: { readOnly: true },
    },
    {
      name: 'submittedAt',
      type: 'date',
      admin: { readOnly: true, description: 'Bank acknowledged receipt.' },
    },
    {
      name: 'settledAt',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'All transactions matched on a bank statement.',
      },
    },

    // ── Bank response ──
    {
      name: 'bankResponseStatus',
      type: 'select',
      options: [
        { label: 'ACSC — Accepted, settled', value: 'ACSC' },
        { label: 'ACSP — Accepted, settlement in progress', value: 'ACSP' },
        { label: 'ACCP — Accepted, customer profile', value: 'ACCP' },
        { label: 'PDNG — Pending', value: 'PDNG' },
        { label: 'RJCT — Rejected', value: 'RJCT' },
        { label: 'PART — Partial — see per-transaction status', value: 'PART' },
      ],
      admin: {
        readOnly: true,
        description:
          'pain.002 status reason (ISO 20022 ExternalPaymentTransactionStatus1Code).',
      },
    },
    {
      name: 'bankResponseReasonCode',
      type: 'text',
      admin: {
        readOnly: true,
        description:
          'pain.002 reason code (e.g. AC01 incorrect account, AM04 insufficient funds).',
      },
    },

    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending review', value: 'pending_review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Exported', value: 'exported' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Settled', value: 'settled' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'draft',
    ),

    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      validateNotLocked,
      autoPopulateCreatedBy,
      autoSetTimestamp(
        'preparedAt',
        (d) => (d as { status?: string }).status === 'pending_review',
      ),
      autoSetTimestamp(
        'authorisedAt',
        (d) => (d as { status?: string }).status === 'approved',
      ),
      autoSetTimestamp(
        'exportedAt',
        (d) => (d as { status?: string }).status === 'exported',
      ),
      autoSetTimestamp(
        'submittedAt',
        (d) => (d as { status?: string }).status === 'submitted',
      ),
      autoSetTimestamp(
        'settledAt',
        (d) => (d as { status?: string }).status === 'settled',
      ),
    ],
    afterChange: [auditTrailAfterChange('payment-runs')],
  },
  timestamps: true,
}

export default PaymentRuns
