import type { CollectionConfig } from 'payload'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '@/auth'
import { autoPopulateTenant } from '@/auto/populate/tenant';
import { autoPopulateCreatedBy } from '@/auto/populate/created/by';
import { autoSetTimestamp } from '@/auto/set/timestamp';
import { auditTrailAfterChange } from '@/audit/trail/after/change';
import { currencyField } from '@/base/accounting/field';
import { validateNotLocked } from '@/utility';
import { bankStatementImportedHook } from './hooks/bank-statement';

/**
 * Bank Statements — imported / matched bank statements feeding reconciliation.
 *
 * Slice ZZ: full canonical hook chain wired (autoPopulateTenant +
 * autoPopulateCreatedBy + validateNotLocked + ISO-8601 reconciledAt
 * timestamp + audit-trail emission per write).
 *
 * @standard ISO-20022 camt.053 bank-to-customer-statement
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time statement-date period-start reconciled-at
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls reconciliation-evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see docs/STANDARDS.md §4.1
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
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
    { name: 'statementId', type: 'text', required: true, unique: true },
    { name: 'bankAccount', type: 'relationship', relationTo: 'gl-accounts', required: true },
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
