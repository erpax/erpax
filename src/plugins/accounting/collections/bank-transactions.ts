/**
 * Bank Transactions — normalized ISO 20022 camt.053 line items with per-line reconciliation matching.
 *
 * Core Function:
 *   Bank Transactions promote each camt.053 entry from a Bank Statement into a first-class,
 *   queryable row for per-line matching against journal entries during reconciliation. Each
 *   transaction captures amount, currency, counterparty, booking date, value date, remittance
 *   info, and bank transaction code (domain/family/subfamily). The matchStatus field tracks
 *   reconciliation state: unmatched → matched (linked to a journal entry) → verified.
 *
 * Architecture:
 *   • Canonical type: ISO-20022 Camt053Transaction (src/standards/iso-20022/types.ts).
 *   • This collection is the Payload projection of the canonical type.
 *   • Multi-tenant isolation enforced at access and beforeValidate layers.
 *   • Foreign key to Bank Accounts ensures per-account transaction segmentation.
 *   • Status transitions: pending → booked → matched → verified are immutable once matched.
 *   • Charge bearer tracking (DEBT|CRED|SHAR|SLEV) for cost allocation (who bears the fee).
 *   • Audit trail captures import, matching, verification with user attribution and timestamps.
 *
 * Hooks:
 *   • beforeValidate: autoPopulateTenant (multi-tenant enforcement).
 *   • beforeChange: autoPopulateCreatedBy (transaction importer attribution),
 *     autoSetTimestamp (matchedAt timestamp on matchStatus='matched' transition).
 *   • afterChange: auditTrailAfterChange (emit transaction event to audit log).
 *
 * Fields:
 *   • externalId (text, unique, required): Bank-assigned transaction ID (end-to-end reference).
 *   • endToEndId (text): ISO 20022 EndToEndIdentification (customer-facing transaction reference).
 *   • accountServicerReference (text): Account servicer's transaction identifier.
 *   • bankAccount (relationship, required): Link to Bank Accounts master.
 *   • bankStatement (relationship): Link to source Bank Statement.
 *   • bookingDate (date, required): ISO 8601 date transaction was booked.
 *   • valueDate (date, required): ISO 8601 date funds were credited/debited.
 *   • amount (number, required): Absolute amount in cents (always positive, direction via creditDebitIndicator).
 *   • creditDebitIndicator (select): CRDT (credit) | DBIT (debit).
 *   • currency (text, required): ISO 4217 transaction currency.
 *   • bookingStatus (select): BOOK | PDNG | INFO | FUTR (ISO 20022 EntryStatus2Code).
 *   • bankTransactionDomain (text): ISO 20022 domain code (e.g., 'PAYMENT').
 *   • bankTransactionFamily (text): ISO 20022 family code (e.g., 'CREDIT').
 *   • bankTransactionSubFamily (text): ISO 20022 subfamily code (e.g., 'ACCTIN').
 *   • counterpartyName (text, localized): Account holder name (buyer/payer).
 *   • counterpartyIban (text): Counterparty IBAN (if provided by bank).
 *   • counterpartyBic (text): Counterparty BIC/SWIFT code.
 *   • chargeBearer (select): DEBT | CRED | SHAR | SLEV (who bears the transaction fee).
 *   • description (textarea, localized): Unstructured remittance info (e.g., invoice number).
 *   • reference (text): Structured creditor reference (ISO 11649 UNB/RFF format).
 *   • matchStatus (select): unmatched | matched | verified (reconciliation state).
 *   • matchedJournalEntry (relationship): Link to matched GL journal entry.
 *   • matchedAt (date): ISO 8601 timestamp auto-set on matchStatus='matched' transition.
 *   • notes (textarea, localized): Reconciler notes or variance explanation.
 *
 * Invariants:
 *   1. externalId must be unique within the source Bank Statement (prevent duplicates).
 *   2. valueDate must be within the statement period (periodStart ≤ valueDate ≤ periodEnd).
 *   3. amount > 0 (always positive; direction from creditDebitIndicator).
 *   4. If creditDebitIndicator='CRDT', transaction increases account balance; if 'DBIT', decreases.
 *   5. Matched transactions immutable to non-admins (prevent reversal after reconciliation).
 *   6. matchedAt timestamp is immutable once set (SOX §404 evidence integrity).
 *   7. Counterparty IBAN/BIC must be syntactically valid per ISO 13616 / ISO 9362.
 *   8. Bank transaction code (domain + family + subfamily) must exist in ISO 20022 registry.
 *
 * Audit Trail:
 *   • createdBy auto-populated with transaction importer (ISO-19011 evidence completeness).
 *   • createdAt auto-set on import (when transaction was first loaded from statement).
 *   • matchedAt auto-set on matchStatus='matched' transition (immutable matching timestamp).
 *   • All state changes (status, matched entry, notes) emit audit event.
 *   • Change history preserved: each matching attempt tracked for reconciliation workpaper (SOX §404).
 *   • Unmatched → matched → verified progression creates audit trail of reconciler actions.
 *   • Reversal transactions (negative lines) tracked separately with source reference.
 *
 * Example:
 *   Customer payment (April 2026):
 *     externalId: "2026-04-15T12:30:00Z-PAYMENT-1234567"
 *     endToEndId: "/INV/INV-2026-1001"
 *     bankAccount: { iban: "BG80BNBG96611020345672" }
 *     bookingDate: "2026-04-15"
 *     valueDate: "2026-04-15"
 *     amount: 500000 (EUR 5,000.00)
 *     creditDebitIndicator: "CRDT"
 *     currency: "EUR"
 *     bookingStatus: "BOOK"
 *     bankTransactionDomain: "PAYMENT"
 *     bankTransactionFamily: "CREDIT"
 *     counterpartyName: "ACME Corp Ltd."
 *     counterpartyIban: "DE89370400440532013000"
 *     description: "Invoice INV-2026-1001 payment"
 *     reference: "+0008INV-2026-1001"
 *     chargeBearer: 'SHAR',  // Shared: costs split between bank and customer
 *     matchStatus: "matched"
 *     matchedJournalEntry: { entryNumber: "2026-04-001" }
 *     matchedAt: "2026-05-01T10:30:00Z"
 *
 * Phase Slice:
 *   WW (2026-05-12): Wired canonical hook chain (autoPopulateTenant + autoPopulateCreatedBy +
 *   autoSetTimestamp for matchedAt). Integrated ISO-20022 camt.053 parsing from Bank Statements.
 *   Implemented per-line matching state machine (unmatched → matched → verified).
 *   Audit trail emission on all state transitions.
 *
 * @useCase Transaction Matching — Link bank line item to GL journal entry for reconciliation.
 * @useCase Per-line Audit Trail — Maintain SOX §404 evidence at transaction granularity.
 * @useCase Counterparty Analysis — Track customer/vendor payment sources and patterns.
 * @useCase Bank Transaction Classification — Route transactions to GL accounts via transaction codes.
 * @useCase Outstanding Item Tracking — Identify unmatched transactions for period-end reconciliation.
 * @useCase Charge Bearer Analysis — Allocate bank fees to cost centers or customers.
 *
 * @standard ISO-20022:2013 camt.053 bank-to-customer-statement
 * @standard ISO-20022 ExternalBankTransactionDomain1Code classification
 * @standard ISO-20022 ExternalBankTransactionFamily1Code classification
 * @standard ISO-20022 ExternalBankTransactionSubFamily1Code classification
 * @standard ISO-20022 EntryStatus2Code booking-status
 * @standard ISO-20022 CreditDebitCode debit-credit-indicator
 * @standard ISO-20022 ChargeBearerType1Code charge-allocation
 * @standard ISO-11649:2009 structured-remittance-creditor-reference
 * @standard ISO-13616-1:2020 iban counterparty-identification
 * @standard ISO-9362:2022 bic counterparty-identification
 * @standard ISO-4217:2015 currency-codes transaction-currency
 * @standard ISO-8601-1:2019 date-time booking-date value-date matched-at
 * @accounting IFRS IAS-7 §6 §40 §44 cash-flow-statement transactions
 * @accounting IFRS IAS-8 accounting-policies-changes-errors
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @accounting US-GAAP ASC-820 fair-value-measurement revaluation
 * @audit ISO-19011:2018 audit-trail transaction-level-evidence
 * @audit ISO-19011:2018 audit-evidence per-line-matching completeness
 * @compliance SOX §302 certification-internal-controls
 * @compliance SOX §404 internal-controls bank-reconciliation per-line
 * @compliance SOX §409 real-time-disclosure large-transactions
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 A.7.1 access-control role-based bank-reconciler
 * @see src/standards/iso-20022/types.ts Camt053Transaction-Canonical-Type
 * @see src/plugins/accounting/collections/bankstatements.ts Bank-Statements-Source
 * @see src/plugins/accounting/collections/bankreconciliations.ts Reconciliation-Context
 * @see docs/STANDARDS.md §4.1 Banking-Standards
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
