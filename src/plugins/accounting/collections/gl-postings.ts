import type { CollectionConfig } from 'payload'
import { tenantAdminWriteAccess } from '@/access/auth'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import {
  multiTenancyField,
  glAccountField,
  currencyField,
  statusField,
  auditFields,
} from '@/fields/accounting/base-accounting-fields'
import { validateNotLocked } from '@/services/accounting/utilities/period-lock'
import { validateBalancedEntry } from '@/hooks/collections/accounting/balanced-entry.hook'
import {
  validateGLPostingTenant,
  validateGLPostingStatusTransition,
  validateGLPostingReversal,
} from '../hooks'

/**
 * GL Postings — Atomic debit/credit lines linked to journal entries.
 *
 * Core Function:
 *   Each GL Posting represents a single debit or credit side of a journal entry
 *   line. Posted GL Postings are immutable (SOX §404 audit trail requirement).
 *   Reversals are tracked via reversalPostingId for audit trail completeness.
 *
 * Architecture:
 *   • Belongs to exactly one Journal Entry (required relationship).
 *   • Multi-tenant isolation enforced at beforeValidate hook.
 *   • Status transitions: pending → posted → (optionally) reversed.
 *   • Posted entries readable to admins only; non-admins see pending/draft only.
 *   • Auto-calculated totalDebits/totalCredits populated by validateBalancedEntry.
 *
 * Hooks:
 *   • beforeValidate: autoPopulateTenant, validateGLPostingTenant, validateGLPostingReversal,
 *     validateBalancedEntry (ensures debits = credits).
 *   • beforeChange: validateNotLocked (period-lock check), validateGLPostingStatusTransition,
 *     autoPopulateCreatedBy, autoSetTimestamp (postedDate on status='posted').
 *   • afterChange: auditTrailAfterChange (emit change event for SOX §404 audit log).
 *
 * Fields:
 *   • postingId (text, unique): Immutable posting identifier for reversal linking.
 *   • journalEntry (relationship): Required link to parent journal entry.
 *   • status: pending | posted | reversed | failed (see validateGLPostingStatusTransition).
 *   • accountsAffected (array): GL account references with debit/credit pairs.
 *   • reversalPostingId (text): Links to original posting if this is a reversal.
 *   • metadata (json): Extensible for custom integrations (bank reconciliation, etc.).
 *
 * Invariants:
 *   1. Debits always equal credits (validateBalancedEntry enforces this).
 *   2. Posting must belong to same tenant as parent journal entry (validateGLPostingTenant).
 *   3. Posted postings are immutable to non-admins (validateGLPostingStatusTransition).
 *   4. Period-locked postings cannot transition to posted (validateNotLocked).
 *   5. Reversals link to original via reversalPostingId; original cannot be deleted.
 *   6. Only one reversal per posting (validateGLPostingReversal enforces).
 *
 * Audit Trail:
 *   All state changes (create, update, reverse) recorded with:
 *   • User ID, timestamp, and tenant context (autoPopulateCreatedBy, autoSetTimestamp).
 *   • Full change history via auditTrailAfterChange hook (SAF-T §3).
 *   • Reversal links tracked for SOX §404 completeness.
 *
 * Example:
 *   A $1,000 invoice creates a journal entry with two GL postings:
 *     1. DR AR 1000 / CR Sales 1000 (to recognize revenue).
 *     2. If payment received: DR Cash 1000 / CR AR 1000 (to settle AR).
 *   If invoice cancelled: create reversal postings with reversalPostingId → original.
 *
 * Phase Slice:
 *   WW (post-cleanup): Consolidated access/field logic into plugin architecture,
 *   wired multi-tenant isolation hooks, added reversal validation, implemented
 *   ISO-8601 timestamp auto-set on status transitions.
 *
 * @useCase Journal Entry Posting — Record GL lines for financial statements.
 * @useCase Period-End Close — Freeze GL postings to prevent edits (period-lock).
 * @useCase Audit Trail — Trace all GL posting changes back to source documents.
 * @useCase Reversal Processing — Link reversals to originals for audit completeness.
 *
 * @standard ISO-8601-1:2019 date-time posted-date
 * @standard ISO-20022:2013 financial-messaging GL-posting
 * @standard EN-16931:2017 electronic-invoicing document-line
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-8 accounting-policies-changes-errors
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 * @accounting US-GAAP ASC-235 accounting-changes
 * @accounting OECD SAF-T §3 transactions journals-transactions-lines
 * @audit ISO-19011:2018 audit-trail audit-evidence
 * @audit ISO-19011:2018 audit-trail reversals-corrections
 * @compliance SOX §302 certification-internal-controls
 * @compliance SOX §404 internal-controls management-assessment
 * @compliance SOX §409 real-time-disclosure change-in-status
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation multi-tenancy
 * @security ISO-27002 A.7.1 access-control role-based
 * @see docs/STANDARDS.md §4.2 GL-Posting-Standards
 * @see src/plugins/accounting/hooks/index.ts GL-Posting-Hook-Factories
 * @see src/fields/accounting/base-accounting-fields.ts GL-Account-Field-Factory
 */
const GLPostings: CollectionConfig = {
  slug: 'gl-postings',
  labels: { singular: 'GL Posting', plural: 'GL Postings' },
  admin: {
    useAsTitle: 'postingId',
    defaultColumns: ['postingId', 'sourceType', 'sourceId', 'journalEntry', 'status', 'postedDate'],
  },
  access: tenantAdminWriteAccess(),
  fields: [
    multiTenancyField(),
    { name: 'postingId', type: 'text', required: true, unique: true },
    {
      name: 'sourceType',
      type: 'select',
      required: true,
      options: [
        { label: 'Invoice', value: 'invoice' },
        { label: 'Bill', value: 'bill' },
        { label: 'Payment', value: 'payment' },
        { label: 'Bank Statement', value: 'bank_statement' },
        { label: 'Period-End Adjustment', value: 'period_end_adjustment' },
        { label: 'Tax Calculation', value: 'tax_calculation' },
        { label: 'Currency Revaluation', value: 'currency_revaluation' },
        { label: 'Manual Entry', value: 'manual_entry' },
      ],
    },
    { name: 'sourceId', type: 'text', required: true },
    { name: 'sourceDate', type: 'date', required: true },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', required: true },
    statusField(
      [
        { label: 'Pending', value: 'pending' },
        { label: 'Posted', value: 'posted' },
        { label: 'Reversed', value: 'reversed' },
        { label: 'Failed', value: 'failed' },
      ],
      'pending',
    ),
    { name: 'postedDate', type: 'date' },
    {
      name: 'accountsAffected',
      type: 'array',
      fields: [
        ...glAccountField(true),
        { name: 'debitAmount', type: 'number', defaultValue: 0 },
        { name: 'creditAmount', type: 'number', defaultValue: 0 },
        currencyField(),
      ],
    },
    { name: 'totalDebits', type: 'number', defaultValue: 0, admin: { disabled: true } },
    { name: 'totalCredits', type: 'number', defaultValue: 0, admin: { disabled: true } },
    { name: 'errorMessage', type: 'textarea' },
    { name: 'reversalPostingId', type: 'text' },
    { name: 'metadata', type: 'json' },
    ...auditFields(),
  ],
  hooks: {
    beforeValidate: [
      autoPopulateTenant,
      validateGLPostingTenant,
      validateGLPostingReversal,
      // Single source of truth for the balance check, with field-name overrides
      // for GLPostings' `accountsAffected[].{debitAmount, creditAmount}` shape
      // (vs. JournalEntries' `lines[].{debit, credit}`).
      validateBalancedEntry({
        linesField: 'accountsAffected',
        debitField: 'debitAmount',
        creditField: 'creditAmount',
        debitTotalField: 'totalDebits',
        creditTotalField: 'totalCredits',
        balancedField: false,
        accountTypeFor: () => 'asset',
      }),
    ],
    beforeChange: [
      validateNotLocked,
      validateGLPostingStatusTransition,
      autoPopulateCreatedBy,
      autoSetTimestamp('postedDate', (data) => (data as { status?: string }).status === 'posted'),
    ],
    afterChange: [auditTrailAfterChange('gl-postings')],
  },
  timestamps: true,
}

export default GLPostings
