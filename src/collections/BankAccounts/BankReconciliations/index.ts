/**
 * Bank Reconciliations — periodic GL ↔ bank balance reconciliation
 * with explicit difference accounting.
 *
 * Slice TTT (2026-05-10): added per Slice NNN gap discovery — the
 * `SEED_VALIDATION_REGISTRY` declared this slug but no Payload schema
 * existed, so seed validators couldn't actually run against a real
 * collection. Distinct from `bank-transactions.matchStatus` (which
 * tracks per-line matches) and `account-reconciliations` (which is a
 * broader GL-vs-subledger reconciliation pack); this collection is
 * specifically the **bank-side period-end balance proof** auditors
 * walk through under SOX §404 control TOM-CSH-01.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time reconciliation-date
 * @standard ISO-20022 camt.053 bank-to-customer-statement (input)
 * @accounting IFRS IAS-7 §6 §44 cash-flow-reconciliation
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @audit ISO-19011:2018 §6.4.6 audit-evidence-bank-reconciliation
 * @compliance SOX §404 internal-controls TOM-CSH-01 cash-balance-proof
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./BankAccounts.ts
 * @see ./BankStatements.ts
 * @see ./AccountReconciliations.ts
 * @see docs/STANDARDS.md §4.2
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/hooks/standardCollectionHooks'
import { tenantAdminWriteAccess } from '@/access/auth'
import { currencyField, statusField, notesField, auditFields, referenceField } from '@/fields/base-accounting-fields'

const BankReconciliations: CollectionConfig = {
  slug: 'bank-reconciliations',
  labels: { singular: 'Bank Reconciliation', plural: 'Bank Reconciliations' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'bankAccount', 'reconciliationDate', 'bankStatementBalance', 'bookBalance', 'difference', 'status'],
    description:
      'Period-end bank-balance proof — SOX §404 TOM-CSH-01 evidence. Pairs the GL cash balance against the bank-statement closing balance and quantifies the variance.',
  },
  access: tenantAdminWriteAccess(), // Slice VVV: gated by feature 'banking_reconciliation' (see featureGuard wiring TBA)
  fields: [
    referenceField({ description: 'Sequential reconciliation reference (e.g. `REC-2026-04-EUR-MAIN`).' }),
    { name: 'bankAccount', type: 'relationship', relationTo: 'bank-accounts', required: true, index: true },
    { name: 'reconciliationDate', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — the as-of date the reconciliation proves.' } },
    { name: 'periodStart', type: 'date',
      admin: { description: 'Statement period the reconciliation covers — start.' } },
    { name: 'periodEnd', type: 'date',
      admin: { description: 'Statement period the reconciliation covers — end.' } },
    { name: 'bankStatement', type: 'relationship', relationTo: 'bank-statements',
      admin: { description: 'The camt.053 statement this reconciliation proves out against.' } },
    currencyField(),
    { name: 'bankStatementBalance', type: 'number', required: true,
      admin: { description: 'Closing balance per bank statement (camt.053 CLBD), in cents.' } },
    { name: 'bookBalance', type: 'number', required: true,
      admin: { description: 'GL cash account balance as of `reconciliationDate`, in cents.' } },
    { name: 'difference', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'bookBalance − bankStatementBalance — must be explained by reconcilingItems.' } },
    {
      name: 'reconcilingItems',
      type: 'array',
      labels: { singular: 'Reconciling Item', plural: 'Reconciling Items' },
      admin: { description: 'Outstanding deposits, in-transit cheques, bank fees not yet booked, etc.' },
      fields: [
        { name: 'kind', type: 'select', required: true, options: [
          { label: 'Outstanding Deposit', value: 'outstanding_deposit' },
          { label: 'Outstanding Cheque', value: 'outstanding_cheque' },
          { label: 'Bank Fee Unbooked', value: 'bank_fee' },
          { label: 'Interest Earned Unbooked', value: 'interest_earned' },
          { label: 'NSF / Returned Item', value: 'nsf_return' },
          { label: 'Other Variance', value: 'other' },
        ] },
        { name: 'amount', type: 'number', required: true, admin: { description: 'Signed amount in cents.' } },
        { name: 'description', type: 'text', localized: true, required: true },
        { name: 'reference', type: 'text' },
      ],
    },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Reconciled (no variance)', value: 'reconciled' },
        { label: 'Reconciled with Variance', value: 'reconciled_with_variance' },
        { label: 'Discrepancy', value: 'discrepancy' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('bank-reconciliations'),
  timestamps: true,
}

export default BankReconciliations
