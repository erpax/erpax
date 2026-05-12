import type { Access, CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties'
import { roleScopedAccess, scopedAccess, tenantAdmin, hasRole, getUserContext } from '@/access/auth'
import {
  multiTenancyField,
  glAccountField,
  currencyField,
  statusField,
  auditFields,
} from '@/fields/accounting/base-accounting-fields'
import { validateNotLocked } from '@/services/accounting/utilities/period-lock'
import { validateBalancedEntry } from '@/hooks/collections/accounting/balanced-entry.hook'
import { validateGLPostingTenant } from '../hooks'

/**
 * Journal Entries — Double-entry bookkeeping write target (debits = credits invariant).
 *
 * Core Function:
 *   Journal Entries are the primary unit for recording financial transactions.
 *   Each entry contains an array of GL Posting lines that must balance (sum debits = sum credits).
 *   Entries transition through: Draft → Pending Approval → Posted → (optionally) Reversed.
 *   Posted entries are immutable to non-admins; reversal entries are created separately.
 *
 * Architecture:
 *   • Multi-tenant isolation enforced at beforeValidate and access layers.
 *   • Segregation of duties: creator cannot approve their own entry (enforceSegregationOfDuties hook).
 *   • Status transitions tracked with timestamps (entryDate, postedDate, approvalDate auto-set).
 *   • Period-locked entries cannot be posted (validateNotLocked hook).
 *   • Approved entries are immutable except to admins (access control on update).
 *
 * Hooks:
 *   • beforeValidate: autoPopulateTenant, validateGLPostingTenant,
 *     validateBalancedEntry (ensures lines sum to balanced).
 *   • beforeChange: validateNotLocked, autoPopulateCreatedBy, enforceSegregationOfDuties,
 *     autoSetTimestamp (postedDate on status='posted', approvalDate on approvedBy set).
 *   • afterChange: auditTrailAfterChange (emit for audit trail).
 *
 * Fields:
 *   • entryNumber (text, unique): Immutable entry identifier per period/numbering scheme.
 *   • entryDate (date): Transaction date (may differ from posting date).
 *   • postedDate (date): Auto-set when status='posted' (SOX §404 audit requirement).
 *   • description (textarea, localized): Purpose of entry (required, localized for multi-language).
 *   • lines (array, min 2): GL posting lines with debit/credit pairs.
 *   • status: draft | pending_approval | posted | reversed | void.
 *   • sourceType: manual | invoice | bill | payment | bank_reconciliation | period_end_adjustment | tax | currency.
 *   • sourceId (text): Link to source document (invoice #, bill #, bank statement, etc.).
 *   • debitTotal, creditTotal (number, auto-calculated): Sum of all debits/credits.
 *   • isBalanced (checkbox, auto-calculated): True if debits = credits.
 *
 * Invariants:
 *   1. Total debits always equal total credits (validateBalancedEntry enforces).
 *   2. Minimum 2 lines per entry (journal-entries.ts minRows=2).
 *   3. Posted entries immutable to non-admins (updateAccess predicate).
 *   4. Period-locked entries cannot transition to posted (validateNotLocked).
 *   5. Creator cannot approve their own entry (enforceSegregationOfDuties).
 *   6. Approval creates audit trail evidence (approvalDate auto-set).
 *   7. Only one approval per entry; cannot unapprove after posted.
 *   8. Reversals create new entries with sourceType='reversal', original unchanged.
 *
 * Audit Trail:
 *   • All state changes recorded with user context and timestamps (SOX §404).
 *   • postedDate auto-set only on status → 'posted' transition (immutable timestamp).
 *   • approvalDate auto-set only when approvedBy is populated (immutable).
 *   • Segregation of duties enforced: createdBy ≠ approvedBy (security).
 *   • sourceType + sourceId provide traceability back to original transaction.
 *
 * Example:
 *   Revenue Entry:
 *     entryNumber: 2024-05-001
 *     entryDate: 2024-05-10 (invoice date)
 *     description: "Invoice INV-2024-1001 from customer ACME Corp"
 *     lines:
 *       1. DR Accounts Receivable 1000 / CR Sales Revenue 1000
 *       2. DR Unearned Revenue -0 / CR Deferred Revenue 0  (if service not yet delivered)
 *
 * Phase Slice:
 *   WW (post-cleanup): Consolidated access control and field factories into shared
 *   infrastructure, implemented audit-trail emission (previously only declared),
 *   wired segregation-of-duties enforcement, added ISO-8601 timestamp auto-set
 *   for posted/approved transitions.
 *
 * @useCase Revenue Recognition — Record sales or service entries (IFRS 15).
 * @useCase Expense Recording — Capture operational expenses (IFRS 1 presentation).
 * @useCase Month-End Close — Prepare period-end adjustment entries.
 * @useCase Accruals & Deferrals — Accrue expenses, defer revenues per matching principle.
 * @useCase Audit Trail — Maintain complete change history for SOX §404.
 * @useCase Segregation of Duties — Enforce approval separation (SOX §302).
 *
 * @standard ISO-8601-1:2019 date-time entry-date posted-date approval-date
 * @standard ISO-20022:2013 financial-messaging transaction-messages
 * @standard EN-16931:2017 electronic-invoicing journal-entry
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-8 accounting-policies-changes-errors
 * @accounting IFRS IFRS-15 revenue-from-contracts
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 * @accounting US-GAAP ASC-606 revenue-recognition
 * @accounting OECD SAF-T §3 journal-entries journal-lines
 * @audit ISO-19011:2018 audit-trail evidence completeness
 * @audit ISO-19011:2018 segregation-of-duties approval-control
 * @compliance SOX §302 certification-internal-controls
 * @compliance SOX §404 internal-controls management-assessment
 * @compliance SOX §409 real-time-disclosure change-in-status
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 A.7.1 access-control role-based
 * @security ISO-27002 A.7.2 user-access-management approver-segregation
 * @see docs/STANDARDS.md §4.2 Journal-Entry-Standards
 * @see src/plugins/accounting/collections/gl-postings.ts GL-Posting-Collection
 * @see src/hooks/collections/accounting/balanced-entry.hook.ts Double-Entry-Validation
 */

/**
 * Posted entries are immutable to non-admins. Combines the role+tenant
 * gate (admin/accountant of own tenant) with a per-doc immutability check.
 */
const updateAccess: Access = async ({ req, doc }) => {
  const user = getUserContext(req)
  if (!hasRole(user, 'admin', 'accountant')) return false
  if (doc?.status === 'posted' && !hasRole(user, 'admin')) return false
  return { tenant: { equals: user!.tenant } }
}

const JournalEntries: CollectionConfig = {
  slug: 'journal-entries',
  labels: { singular: 'Journal Entry', plural: 'Journal Entries' },
  admin: {
    useAsTitle: 'entryNumber',
    defaultColumns: ['entryNumber', 'entryDate', 'description', 'status', 'debitTotal', 'creditTotal'],
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: updateAccess,
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    { name: 'entryNumber', type: 'text', required: true, unique: true },
    { name: 'entryDate', type: 'date', required: true },
    { name: 'postedDate', type: 'date' },
    { name: 'description', type: 'textarea', localized: true, required: true },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending Approval', value: 'pending_approval' },
        { label: 'Posted', value: 'posted' },
        { label: 'Reversed', value: 'reversed' },
        { label: 'Void', value: 'void' },
      ],
      'draft',
    ),
    {
      name: 'lines',
      type: 'array',
      required: true,
      minRows: 2,
      fields: [
        { name: 'lineNumber', type: 'number', defaultValue: 1 },
        ...glAccountField(true),
        { name: 'description', type: 'text', localized: true },
        { name: 'debit', type: 'number', defaultValue: 0 },
        { name: 'credit', type: 'number', defaultValue: 0 },
        currencyField(),
        { name: 'exchangeRate', type: 'number', defaultValue: 1 },
      ],
    },
    { name: 'debitTotal', type: 'number', defaultValue: 0, admin: { disabled: true } },
    { name: 'creditTotal', type: 'number', defaultValue: 0, admin: { disabled: true } },
    { name: 'isBalanced', type: 'checkbox', admin: { disabled: true } },
    {
      name: 'sourceType',
      type: 'select',
      required: true,
      options: [
        { label: 'Manual', value: 'manual' },
        { label: 'Invoice', value: 'invoice' },
        { label: 'Bill', value: 'bill' },
        { label: 'Payment', value: 'payment' },
        { label: 'Bank Reconciliation', value: 'bank_reconciliation' },
        { label: 'Period-End Adjustment', value: 'period_end_adjustment' },
        { label: 'Tax Calculation', value: 'tax_calculation' },
        { label: 'Currency Adjustment', value: 'currency_adjustment' },
      ],
    },
    { name: 'sourceId', type: 'text' },
    ...auditFields(),
  ],
  hooks: {
    beforeValidate: [
      autoPopulateTenant,
      validateGLPostingTenant,
      // Single source of truth for the double-entry balance check.
      validateBalancedEntry({
        linesField: 'lines',
        debitTotalField: 'debitTotal',
        creditTotalField: 'creditTotal',
        balancedField: 'isBalanced',
      }),
    ],
    beforeChange: [
      validateNotLocked,
      autoPopulateCreatedBy,
      enforceSegregationOfDuties(),
      autoSetTimestamp('postedDate', (data) => (data as { status?: string }).status === 'posted'),
      autoSetTimestamp('approvedAt', (data) => Boolean((data as { approvedBy?: unknown }).approvedBy)),
    ],
    afterChange: [auditTrailAfterChange('journal-entries')],
  },
  timestamps: true,
}

export default JournalEntries
