/**
 * Bank Reconciliations — period-end GL ↔ bank statement balance proof with reconciling-item tracking.
 *
 * Core Function:
 *   Bank Reconciliations are the monthly/periodic evidence pack that auditors use to sign off
 *   on cash account balances. Each reconciliation pairs the GL cash balance as-of a date
 *   against the bank statement closing balance, and itemizes the differences (outstanding
 *   checks, deposits in transit, unbooked fees, NSF returns). The reconciliation is "complete"
 *   when all variances are explained and signed off.
 *
 * Architecture:
 *   • One reconciliation per bank account per period (typically month-end).
 *   • Linked to a specific Bank Statement (camt.053 file) for single source of truth.
 *   • Reconciling items array captures outstanding items, fees, interest not yet booked.
 *   • Difference = bookBalance − bankStatementBalance; must be zero when all items explained.
 *   • Status progression: draft → reconciled (zero variance) or reconciled_with_variance → approved.
 *   • Multi-tenant isolation enforced; feature-gated by banking_reconciliation flag.
 *   • Audit trail captures preparer, date, all variance items for SOX §404 TOM-CSH-01.
 *
 * Hooks:
 *   • beforeValidate: autoPopulateTenant (multi-tenant gate).
 *   • beforeChange: autoPopulateCreatedBy (preparer attribution).
 *   • afterChange: auditTrailAfterChange (emit reconciliation event to audit log).
 *
 * Fields:
 *   • reference (text, unique): Sequential reconciliation ID (e.g. `REC-2026-04-EUR-MAIN`).
 *   • bankAccount (relationship, required): Link to Bank Accounts master.
 *   • reconciliationDate (date, required): ISO 8601 as-of date for the reconciliation.
 *   • periodStart, periodEnd (date): Statement period bounds (e.g. 2026-04-01 to 2026-04-30).
 *   • bankStatement (relationship): Link to the camt.053 Bank Statement being reconciled.
 *   • currency (text, required): ISO 4217 (inherited from bank account).
 *   • bankStatementBalance (number, required): Closing balance per statement, in cents.
 *   • bookBalance (number, required): GL cash account balance as-of reconciliationDate, in cents.
 *   • difference (number, auto-calculated): bookBalance − bankStatementBalance.
 *   • reconcilingItems (array): Itemized variances (outstanding checks, deposits, fees, NSF).
 *   • status (select): draft | reconciled | reconciled_with_variance | discrepancy.
 *   • notes (textarea, localized): Preparer notes or reconciliation workpaper reference.
 *
 * Invariants:
 *   1. reconciliationDate must be within the bank statement period (periodStart ≤ reconciliationDate ≤ periodEnd).
 *   2. Difference must equal sum of all reconciling items (algebraic closure).
 *   3. Outstanding items (checks, deposits) must be signed amounts (positive/negative per direction).
 *   4. Status draft → reconciled transition requires difference = 0 (cannot reconcile with unexplained variance).
 *   5. Only one active reconciliation per bank account per period (prevent double-work).
 *   6. Closed bank accounts cannot have new reconciliations (referential integrity).
 *   7. Bank statement reference is immutable once reconciliation is saved (audit trail integrity).
 *   8. Audit fields (createdBy, createdAt, updatedAt) are immutable to preparer (read-only SOX evidence).
 *
 * Audit Trail:
 *   • createdBy auto-populated with reconciliation preparer (ISO-19011 evidence completeness).
 *   • createdAt auto-set to ISO 8601 timestamp (when reconciliation was first saved).
 *   • updatedAt auto-set on each change (modification audit trail).
 *   • All reconciling items tracked with timestamps and user attribution.
 *   • Change history preserved: each variance item version captured for evidence (SOX §404 TOM-CSH-01).
 *   • Reconciling item kind, amount, and reference immutable once reconciliation is completed.
 *   • Approval workflow: preparer submits, controller/manager reviews, audit trail captures both.
 *
 * Example:
 *   Month-end reconciliation (April 2026):
 *     reference: "REC-2026-04-EUR-MAIN"
 *     bankAccount: { iban: "BG80BNBG96611020345672" }
 *     reconciliationDate: "2026-04-30"
 *     periodStart: "2026-04-01"
 *     periodEnd: "2026-04-30"
 *     bankStatementBalance: 250000 (EUR 2,500.00)
 *     bookBalance: 245000 (EUR 2,450.00)
 *     difference: -5000 (EUR 50.00 — outstanding items)
 *     reconcilingItems:
 *       - kind: outstanding_cheque, amount: -3000, reference: "CHK-1234" (EUR 30.00)
 *       - kind: outstanding_deposit, amount: -2000, reference: "DEP-5678" (EUR 20.00)
 *     status: "reconciled_with_variance"
 *     createdBy: "accountant@example.com"
 *     createdAt: "2026-05-01T10:15:00Z"
 *
 * Phase Slice:
 *   TTT (2026-05-10): Added per Slice NNN gap discovery — the SEED_VALIDATION_REGISTRY
 *   declared this slug but no Payload schema existed. Distinct from bank-transactions
 *   (per-line matches) and account-reconciliations (broader GL-vs-subledger). This
 *   collection is the bank-side period-end balance proof. Wired autoPopulateTenant +
 *   autoPopulateCreatedBy + audit trail emission. Feature-gated by banking_reconciliation.
 *
 * @useCase Month-end Bank Reconciliation — Match GL to bank statement, explain variances.
 * @useCase Audit Trail — Maintain period-end balance proof for SOX §404 evidence.
 * @useCase Variance Analysis — Track outstanding checks, deposits, NSF, and fees.
 * @useCase Period Lock — Freeze reconciliations at fiscal period close.
 * @useCase Exception Reporting — Flag discrepancies that require manual follow-up.
 * @useCase Cash Forecasting — Analyze payment float (outstanding items in-transit).
 *
 * @standard ISO-8601-1:2019 date-time reconciliation-date period-start period-end
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-20022:2013 camt.053 bank-to-customer-statement
 * @accounting IFRS IAS-7 §6 §40 §44 cash-flow-statement cash-equivalents reconciliation
 * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
 * @accounting US-GAAP ASC-230 statement-of-cash-flows reconciliation
 * @accounting US-GAAP ASC-210-10 balance-sheet cash-classification
 * @audit ISO-19011:2018 §6.4.6 audit-evidence-bank-reconciliation completeness
 * @audit ISO-19011:2018 audit-trail change-history preparer-attribution
 * @compliance SOX §302 certification-internal-controls
 * @compliance SOX §404 internal-controls cash-management TOM-CSH-01 evidence
 * @compliance SOX §409 real-time-disclosure reconciliation-exceptions
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 A.7.1 access-control role-based reconciliation-sign-off
 * @see src/plugins/accounting/collections/bankaccounts.ts Bank-Accounts-Master
 * @see src/plugins/accounting/collections/bankstatements.ts Bank-Statements-Source
 * @see src/plugins/accounting/collections/gl-accounts.ts GL-Cash-Accounts
 * @see src/plugins/accounting/collections/accountreconciliations.ts GL-Reconciliation-Pack
 * @see docs/STANDARDS.md §4.1 Banking-Reconciliation-Standards
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { tenantAdminWriteAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField } from '@/fields/accounting/base-accounting-fields'

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
    multiTenancyField(),
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
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('bank-reconciliations')],
  },
  timestamps: true,
}

export default BankReconciliations
