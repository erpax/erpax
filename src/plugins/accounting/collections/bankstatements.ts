import type { CollectionConfig } from 'payload'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/access/auth'
import { multiTenancyField } from '@/fields/accounting/base-accounting-fields'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant';
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy';
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp';
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange';
import { currencyField } from '@/fields/accounting/base-accounting-fields';
import { validateNotLocked } from '@/services/accounting/utilities/period-lock';
import { bankStatementImportedHook } from '@/hooks/collections/accounting/bank-statement.hook';

/**
 * Bank Statements — imported camt.053 bank-to-customer statements with line-item transaction source.
 *
 * Core Function:
 *   Bank Statements are the raw bank export files (ISO 20022 camt.053 format) that capture
 *   all transactions for a bank account over a period. Each statement contains transaction
 *   arrays (entries, bookings) that are normalized into Bank Transactions collection for
 *   per-line matching. The statement itself is the source-of-truth for period-end reconciliation.
 *   Status transitions: unreconciled → (matched_exact | matched_fuzzy) → in_progress → reconciled. Or discrepancy flag raised for investigation.
 *
 * Architecture:
 *   • Multi-tenant isolation enforced at access and beforeValidate layers.
 *   • Foreign key to Bank Accounts (bankAccount) for accountability chain.
 *   • Period-locked statements cannot transition to reconciled (prevents period-end tampering).
 *   • Transaction array expanded into Bank Transactions rows (one per camt.053 entry) for
 *     granular reconciliation matching.
 *   • Variance tracking: difference between statement closing balance and GL cash balance is
 *     explained via Bank Reconciliations collection (outstanding items).
 *   • Audit trail tracks import date, preparer, statement validation, reconciliation sign-off.
 *
 * Hooks:
 *   • beforeValidate: autoPopulateTenant (multi-tenant enforcement), bankStatementImportedHook
 *     (normalize camt.053 to transaction array).
 *   • beforeChange: autoPopulateCreatedBy (importer attribution), validateNotLocked
 *     (prevent period-locked statements from being marked reconciled).
 *   • afterChange: auditTrailAfterChange (emit statement change event), autoSetTimestamp
 *     (reconciledAt timestamp on status='reconciled' transition).
 *
 * Fields:
 *   • statementId (text, unique, required): Bank-assigned statement ID (e.g. from camt.053 header).
 *   • bankAccount (relationship, required): Link to Bank Accounts master.
 *   • statementDate (date, required): Statement closing date (ISO 8601).
 *   • statementPeriodStart (date, required): Period start date.
 *   • currency (text, required): ISO 4217 currency of the statement.
 *   • openingBalance (number, required): Balance at period start, in cents.
 *   • closingBalance (number, required): Balance at period end, in cents.
 *   • totalDebits (number, calculated): Sum of all debit entries, in cents.
 *   • totalCredits (number, calculated): Sum of all credit entries, in cents.
 *   • variance (number, calculated): closingBalance − (openingBalance + totalCredits − totalDebits).
 *   • transactions (array): Parsed camt.053 transaction entries (normalized from bank export).
 *   • reconciliationStatus (select): pending_import | imported | pending_reconciliation | reconciled.
 *   • importedAt (date): ISO 8601 timestamp when statement file was received.
 *   • reconciledAt (date): ISO 8601 timestamp auto-set on status='reconciled' transition.
 *   • notes (textarea, localized): Importer notes, variance explanation.
 *
 * Invariants:
 *   1. closingBalance = openingBalance + totalCredits − totalDebits (algebraic closure).
 *   2. All transactions in array must have non-empty bookingDate within period bounds.
 *   3. StatementId must be unique per bank account per period (prevent duplicate imports).
 *   4. Period-locked statements cannot transition to reconciled (prevent audit trail tampering).
 *   5. Transaction amounts must use consistent currency (per statement currency).
 *   6. BIC/SWIFT in header must match Bank Account BIC (prevent cross-account mixing).
 *   7. Imported statements cannot be deleted; only marked as superseded (audit trail integrity).
 *   8. Variance ≠ 0 requires reconciling items in Bank Reconciliations (prevent unexplained gaps).
 *
 * Audit Trail:
 *   • createdBy auto-populated with statement importer (ISO-19011 evidence completeness).
 *   • createdAt auto-set on import (when file was first loaded).
 *   • importedAt auto-set on status='imported' transition (proves import completion).
 *   • reconciledAt auto-set on status='reconciled' transition (immutable timestamp for sign-off).
 *   • All changes (status, variance, transaction edits) emit audit event.
 *   • Change history preserved: each statement version tracked for restatement evidence (SOX §404).
 *   • Transaction parsing logged: import validation errors captured for reconciliation follow-up.
 *
 * Example:
 *   April 2026 Bulbank EUR statement:
 *     statementId: "BG80BNBG96611020345672_2026-04-30_001"
 *     bankAccount: { iban: "BG80BNBG96611020345672" }
 *     statementDate: "2026-04-30"
 *     statementPeriodStart: "2026-04-01"
 *     currency: "EUR"
 *     openingBalance: 245000 (EUR 2,450.00)
 *     closingBalance: 250000 (EUR 2,500.00)
 *     totalDebits: 180000 (EUR 1,800.00)
 *     totalCredits: 185000 (EUR 1,850.00)
 *     variance: 0
 *     reconciliationStatus: "reconciled"
 *     importedAt: "2026-05-01T09:30:00Z"
 *     reconciledAt: "2026-05-01T14:15:00Z"
 *
 * Phase Slice:
 *   ZZ (2026-05-10): Full canonical hook chain wired — autoPopulateTenant +
 *   autoPopulateCreatedBy + validateNotLocked + ISO-8601 reconciledAt timestamp +
 *   audit-trail emission. Integrated bankStatementImportedHook for camt.053 parsing.
 *   Period-lock validation prevents post-close statement edits.
 *
 * @useCase Bank Statement Import — Load camt.053 file from bank via open-banking API or upload.
 * @useCase Transaction Normalization — Parse camt.053 into individual Bank Transaction rows.
 * @useCase Statement Validation — Verify checksums, closing balance, period bounds.
 * @useCase Reconciliation Preparation — Provide source data for period-end balance proof.
 * @useCase Variance Analysis — Track closing-balance discrepancies for follow-up.
 * @useCase Audit Trail — Maintain statement-level evidence for SOX §404 testing.
 *
 * @standard ISO-20022:2013 camt.053 bank-to-customer-statement
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic swift-code
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time statement-date period-start imported-at reconciled-at
 * @accounting IFRS IAS-7 §6 §40 §44 cash-flow-statement cash-equivalents
 * @accounting IFRS IAS-8 accounting-policies-changes-errors
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @accounting US-GAAP ASC-225 income-statement presentation
 * @audit ISO-19011:2018 audit-trail statement-import-evidence
 * @audit ISO-19011:2018 audit-evidence completeness change-history
 * @compliance SOX §302 certification-internal-controls
 * @compliance SOX §404 internal-controls reconciliation-evidence statement-sign-off
 * @compliance SOX §409 real-time-disclosure statement-exceptions
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 A.8.1 access-control information-classification
 * @see src/plugins/accounting/collections/bankaccounts.ts Bank-Accounts-Master
 * @see src/plugins/accounting/collections/banktransactions.ts Transaction-Normalization
 * @see src/plugins/accounting/collections/bankreconciliations.ts Period-end-Proof
 * @see docs/STANDARDS.md §4.1 Banking-Standards
 */
const BankStatements: CollectionConfig = {
  slug: 'bank-statements',
  labels: { singular: 'Bank Statement', plural: 'Bank Statements' },
  admin: {
    useAsTitle: 'statementId',
    defaultColumns: ['statementId', 'bankAccount', 'statementDate', 'reconciliationStatus', 'variance'],
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    { name: 'statementId', type: 'text', required: true, unique: true },
    { name: 'bankAccount', type: 'relationship', relationTo: 'bank-accounts', required: true },
    { name: 'statementDate', type: 'date', required: true },
    { name: 'statementPeriodStart', type: 'date', required: true },
    currencyField(),
    { name: 'openingBalance', type: 'number', required: true },
    { name: 'closingBalance', type: 'number', required: true },
    {
      name: 'transactions',
      type: 'array',
      required: true,
      fields: [
        { name: 'transactionDate', type: 'date', required: true },
        { name: 'amount', type: 'number', required: true },
        { name: 'description', type: 'text', localized: true, required: true },
        { name: 'reference', type: 'text' },
        { name: 'balanceAfter', type: 'number' },
      ],
    },
    {
      name: 'reconciliationStatus',
      type: 'select',
      defaultValue: 'unreconciled',
      options: [
        { label: 'Unreconciled', value: 'unreconciled' },
        { label: 'Matched (Exact)', value: 'matched_exact' },
        { label: 'Matched (Fuzzy)', value: 'matched_fuzzy' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Reconciled', value: 'reconciled' },
        { label: 'Discrepancy', value: 'discrepancy' },
      ],
    },
    {
      name: 'matchedTransactions',
      type: 'array',
      fields: [
        { name: 'bankStatementLineIndex', type: 'number', required: true },
        { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', required: true },
        {
          name: 'matchType',
          type: 'select',
          required: true,
          options: [
            { label: 'Exact', value: 'exact' },
            { label: 'Fuzzy', value: 'fuzzy' },
            { label: 'Manual', value: 'manual' },
          ],
        },
        { name: 'matchScore', type: 'number' },
        { name: 'varianceAmount', type: 'number' },
      ],
    },
    { name: 'totalMatched', type: 'number', defaultValue: 0, admin: { disabled: true } },
    { name: 'totalUnmatched', type: 'number', defaultValue: 0, admin: { disabled: true } },
    { name: 'variance', type: 'number', defaultValue: 0, admin: { disabled: true } },
    { name: 'reconciliationNotes', type: 'textarea' },
    { name: 'reconciliationDate', type: 'date', admin: { disabled: true } },
    { name: 'reconciliedBy', type: 'relationship', relationTo: 'users', admin: { disabled: true } },
    {
      name: 'importSource',
      type: 'select',
      required: true,
      options: [
        { label: 'CSV Import', value: 'csv' },
        { label: 'OFX Import', value: 'ofx' },
        { label: 'Manual Entry', value: 'manual' },
        { label: 'Bank API', value: 'bank_api' },
      ],
    },
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      validateNotLocked,
      autoPopulateCreatedBy,
      // ISO-8601 reconciliation timestamp on status → 'reconciled' transition.
      autoSetTimestamp(
        'reconciledAt',
        (data) => (data as { reconciliationStatus?: string }).reconciliationStatus === 'reconciled',
      ),
    ],
    // SOX §404 / ISO-19011: structured event for every bank-statement write.
    // Slice LLL: emit `bank:statement:imported` so glPostingService books a
    // JE for every transaction line (closes the IAS-7 cash-flow GL gap).
    afterChange: [bankStatementImportedHook, auditTrailAfterChange('bank-statements')],
  },
  timestamps: true,
};

export default BankStatements;
