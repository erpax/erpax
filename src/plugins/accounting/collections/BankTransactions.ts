/**
 * Bank Transactions — individual bank-statement lines normalised out of
 * BankStatements.transactions[] for indexable matching against journal
 * entries during reconciliation.
 *
 * Promotes each ISO 20022 camt.053 line item into a first-class row so it
 * can be queried, matched, and audited independently of its parent
 * statement. SOX §404 reconciliation evidence requires per-line trace.
 *
 * @standard ISO-20022 camt.053 bank-to-customer-statement
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time value-date booking-date matched-at
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting US-GAAP ASC-230 cash-flows
 * @audit ISO-19011:2018 audit-trail reconciliation-line-evidence
 * @compliance SOX §404 internal-controls bank-reconciliation
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateHost } from '@/hooks/autoPopulateHost'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/plugins/auth/access'
import { multiTenancyField, currencyField, statusField, notesField } from '../fields/base-accounting-fields'

const BankTransactions: CollectionConfig = {
  slug: 'bank-transactions',
  labels: { singular: 'Bank Transaction', plural: 'Bank Transactions' },
  admin: {
    useAsTitle: 'externalId',
    defaultColumns: ['externalId', 'bankAccount', 'valueDate', 'amount', 'currency', 'matchStatus'],
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    { name: 'externalId', type: 'text', required: true, unique: true, index: true, admin: { description: 'Bank-side reference / EndToEndId.' } },
    { name: 'bankAccount', type: 'relationship', relationTo: 'bank-accounts', required: true, index: true },
    { name: 'statement', type: 'relationship', relationTo: 'bank-statements', admin: { description: 'Parent camt.053 statement, if imported as part of a batch.' } },
    { name: 'valueDate', type: 'date', required: true, index: true },
    { name: 'bookingDate', type: 'date' },
    { name: 'amount', type: 'number', required: true, admin: { description: 'Signed amount in cents (positive = credit, negative = debit).' } },
    currencyField(),
    { name: 'description', type: 'text' },
    { name: 'counterpartyName', type: 'text', admin: { description: 'Remitter / beneficiary as reported on the statement line.' } },
    { name: 'counterpartyIban', type: 'text', admin: { description: 'ISO 13616 IBAN of the counterparty, when supplied.' } },
    { name: 'counterpartyBic', type: 'text', admin: { description: 'ISO 9362 BIC of the counterparty, when supplied.' } },
    { name: 'reference', type: 'text', admin: { description: 'EndToEndId / RemittanceInfo / payment reference.' } },
    {
      name: 'transactionCode',
      type: 'text',
      admin: { description: 'ISO 20022 BankTransactionCode (e.g. PMNT/RCDT/SALA).' },
    },
    {
      name: 'matchStatus',
      type: 'select',
      defaultValue: 'unmatched',
      options: [
        { label: 'Unmatched', value: 'unmatched' },
        { label: 'Auto-Matched', value: 'auto_matched' },
        { label: 'Manual-Matched', value: 'manual_matched' },
        { label: 'Excluded', value: 'excluded' },
        { label: 'Disputed', value: 'disputed' },
      ],
    },
    {
      name: 'matchedJournalEntries',
      type: 'array',
      fields: [
        { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', required: true },
        { name: 'matchedAmount', type: 'number', required: true, admin: { description: 'Portion in cents matched to this JE (supports split matches).' } },
        { name: 'matchScore', type: 'number', admin: { description: '0-1 confidence for fuzzy matches.' } },
      ],
    },
    { name: 'matchedAt', type: 'date', admin: { readOnly: true } },
    { name: 'matchedBy', type: 'relationship', relationTo: 'users', admin: { readOnly: true } },
    statusField(
      [
        { label: 'Imported', value: 'imported' },
        { label: 'Reconciled', value: 'reconciled' },
        { label: 'Adjusted', value: 'adjusted' },
        { label: 'Voided', value: 'voided' },
      ],
      'imported',
    ),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateHost],
    beforeChange: [
      autoPopulateCreatedBy,
      autoSetTimestamp('matchedAt', (d) => {
        const s = (d as { matchStatus?: string }).matchStatus
        return s === 'auto_matched' || s === 'manual_matched'
      }),
    ],
    afterChange: [auditTrailAfterChange('bank-transactions')],
  },
  timestamps: true,
}

export default BankTransactions
