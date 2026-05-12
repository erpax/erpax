/**
 * Bank Transactions — individual bank-statement lines normalised out of
 * BankStatements.transactions[] for indexable matching against journal
 * entries during reconciliation.
 *
 * The canonical type lives in `@/standards/iso-20022` (Camt053Transaction).
 * This collection's field set is the Payload projection of that type:
 *
 *   canonical.accountServicerReference → doc.accountServicerReference
 *   canonical.endToEndId            → doc.externalId  (and doc.endToEndId)
 *   canonical.bookingDate           → doc.bookingDate
 *   canonical.valueDate             → doc.valueDate
 *   canonical.amount                → ABS(doc.amount) (canonical is positive)
 *   canonical.creditDebitIndicator  → doc.creditDebitIndicator (CRDT|DBIT)
 *   canonical.currency              → doc.currency
 *   canonical.status                → doc.bookingStatus (BOOK|PDNG|INFO|FUTR)
 *   canonical.bankTransactionCode   → { doc.bankTransactionDomain,
 *                                       doc.bankTransactionFamily,
 *                                       doc.bankTransactionSubFamily }
 *   canonical.counterparty.name     → doc.counterpartyName
 *   canonical.counterpartyAccount.iban → doc.counterpartyIban
 *   canonical.counterpartyAccount.bic  → doc.counterpartyBic
 *   canonical.chargeBearer          → doc.chargeBearer (DEBT|CRED|SHAR|SLEV)
 *   canonical.remittanceInformation.unstructured → doc.description
 *   canonical.remittanceInformation.structured.creditorReference → doc.reference
 *
 * Promotes each ISO 20022 camt.053 line item into a first-class row so it
 * can be queried, matched, and audited independently of its parent
 * statement. SOX §404 reconciliation evidence requires per-line trace.
 *
 * @standard ISO-20022 camt.053 bank-to-customer-statement
 * @standard ISO-20022 ExternalBankTransactionDomain1Code
 * @standard ISO-20022 ExternalBankTransactionFamily1Code
 * @standard ISO-20022 ExternalBankTransactionSubFamily1Code
 * @standard ISO-20022 EntryStatus2Code
 * @standard ISO-20022 CreditDebitCode
 * @standard ISO-20022 ChargeBearerType1Code
 * @standard ISO-11649:2009 financial-services-creditor-reference
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time value-date booking-date matched-at
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting US-GAAP ASC-230 cash-flows
 * @audit ISO-19011:2018 audit-trail reconciliation-line-evidence
 * @compliance SOX §404 internal-controls bank-reconciliation
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/standards/iso-20022/types.ts Camt053Transaction
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField } from '@/fields/accounting/base-accounting-fields'

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
    {
      name: 'externalId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          'Stable unique id for this line. For ISO 20022, prefer accountServicerReference; fallback to endToEndId.',
      },
    },
    {
      name: 'accountServicerReference',
      type: 'text',
      admin: {
        description:
          'Bank-assigned unique reference (camt.053 AcctSvcrRef). Maps to canonical Camt053Transaction.accountServicerReference.',
      },
    },
    {
      name: 'endToEndId',
      type: 'text',
      admin: {
        description:
          'End-to-end id propagated from the originating instruction (camt.053 EndToEndId / pain.001 EndToEndId). Joins this line to the originating PaymentRuns transaction.',
      },
    },
    { name: 'bankAccount', type: 'relationship', relationTo: 'bank-accounts', required: true, index: true },
    { name: 'statement', type: 'relationship', relationTo: 'bank-statements', admin: { description: 'Parent camt.053 statement, if imported as part of a batch.' } },
    { name: 'valueDate', type: 'date', required: true, index: true, admin: { description: 'When the funds become available. Maps to canonical Camt053Transaction.valueDate.' } },
    { name: 'bookingDate', type: 'date', admin: { description: 'When the entry hit the ledger. Maps to canonical Camt053Transaction.bookingDate.' } },
    {
      name: 'amount',
      type: 'number',
      required: true,
      admin: {
        description:
          'Signed amount in cents (positive = credit, negative = debit). Maps to ABS(canonical.amount) — canonical separates value from creditDebitIndicator.',
      },
    },
    {
      name: 'creditDebitIndicator',
      type: 'select',
      options: [
        { label: 'CRDT — Credit', value: 'CRDT' },
        { label: 'DBIT — Debit', value: 'DBIT' },
      ],
      admin: {
        description:
          'ISO 20022 CreditDebitCode. Maps to canonical Camt053Transaction.creditDebitIndicator. Derived from sign(amount) when not explicitly set.',
      },
    },
    {
      name: 'bookingStatus',
      type: 'select',
      defaultValue: 'BOOK',
      options: [
        { label: 'BOOK — Booked', value: 'BOOK' },
        { label: 'PDNG — Pending', value: 'PDNG' },
        { label: 'INFO — Information only', value: 'INFO' },
        { label: 'FUTR — Future', value: 'FUTR' },
      ],
      admin: {
        description:
          'ISO 20022 EntryStatus2Code. Most reconcilable items are BOOK. Maps to canonical Camt053Transaction.status.',
      },
    },
    currencyField(),
    {
      name: 'description',
      type: 'text',
      admin: {
        description:
          'Free-text narrative. Maps to canonical RemittanceInformation.unstructured.',
      },
    },
    { name: 'counterpartyName', type: 'text', admin: { description: 'Remitter / beneficiary. Maps to canonical PartyIdentification.name.' } },
    { name: 'counterpartyIban', type: 'text', admin: { description: 'ISO 13616 IBAN. Maps to canonical AccountIdentification.iban.' } },
    { name: 'counterpartyBic', type: 'text', admin: { description: 'ISO 9362 BIC. Maps to canonical PartyIdentification.bic.' } },
    {
      name: 'reference',
      type: 'text',
      admin: {
        description:
          'Structured creditor reference (ISO 11649 RF) or invoice number. Maps to canonical RemittanceInformation.structured.creditorReference.reference.',
      },
    },
    // ── ISO 20022 Bank Transaction Code Set (3-tuple, canonical) ──
    {
      name: 'bankTransactionDomain',
      type: 'text',
      admin: {
        description:
          'ExternalBankTransactionDomain1Code — top-level (e.g. PMNT, CAMT, ACMT). Part of the canonical 3-tuple.',
      },
    },
    {
      name: 'bankTransactionFamily',
      type: 'text',
      admin: {
        description:
          'ExternalBankTransactionFamily1Code — family within domain (e.g. RCDT, ICDT under PMNT).',
      },
    },
    {
      name: 'bankTransactionSubFamily',
      type: 'text',
      admin: {
        description:
          'ExternalBankTransactionSubFamily1Code — subfamily (e.g. SALA salary, BOOK book transfer).',
      },
    },
    /**
     * @deprecated Use bankTransactionDomain + family + subFamily — the
     * canonical 3-tuple. Preserved for back-compat with any imported
     * data that stored the slash-joined form.
     */
    {
      name: 'transactionCode',
      type: 'text',
      admin: {
        description:
          'DEPRECATED — slash-joined legacy form. New writes populate bankTransactionDomain / family / subFamily.',
        position: 'sidebar',
      },
    },
    {
      name: 'chargeBearer',
      type: 'select',
      options: [
        { label: 'DEBT — Borne by debtor', value: 'DEBT' },
        { label: 'CRED — Borne by creditor', value: 'CRED' },
        { label: 'SHAR — Shared', value: 'SHAR' },
        { label: 'SLEV — Following service-level agreement', value: 'SLEV' },
      ],
      admin: {
        description:
          'ISO 20022 ChargeBearerType1Code. Maps to canonical Camt053Transaction.chargeBearer.',
      },
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
    beforeValidate: [autoPopulateTenant],
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
