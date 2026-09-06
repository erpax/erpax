import type { CollectionConfig } from 'payload'
import { tenantAdminWriteAccess } from '@/auth'
import { autoPopulateTenant } from '@/auto/populate/tenant'
import { autoPopulateCreatedBy } from '@/auto/populate/created/by'
import { autoSetTimestamp } from '@/auto/set/timestamp'
import { auditTrailAfterChange } from '@/audit/trail/after/change'
import { emitOnStatusTransition } from '@/chain/event/emitter'
import {
  glAccountField,
  currencyField,
  statusField,
  auditFields,
} from '@/base/accounting/field'
import { validateNotLocked } from '@/utility'
import { validateBalancedEntry } from '../../hooks/balanced'
// Two SOX §404 controls that existed, were tested, and were installed on NOTHING. Each names this
// collection in its own header — `enforcePostingImmutability` says "beforeChange hook for
// GLPostings", `validateFiscalPeriodPosting` says "beforeValidate hook for GLPostings" — and
// neither appeared in either array. They are distinct from `validateNotLocked`, which is the period
// LOCK: this pair stops a POSTED row being modified, and resolves the fiscal period it belongs to.
import { enforcePostingImmutability } from '@/enforce/posting/immutability'
import { validateFiscalPeriodPosting } from '@/validate/fiscal/period/posting'

/**
 * GL Postings — atomic debit/credit lines linked to a journal entry.
 *
 * Slice WW (post-cleanup): switched from inlined access/fields to the
 * shared `@/access/auth` predicates and `@/fields/accounting`
 * factories. Adds audit-trail emission and ISO-8601 `postedDate` auto-set
 * on `status → 'posted'` transitions (was missing — SOX §404 demands a
 * verifiable posting timestamp).
 *
 * @standard ISO-8601-1:2019 date-time posted-date
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting OECD SAF-T §3 transactions
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see docs/STANDARDS.md §4.2
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
    { name: 'postingId', type: 'text', required: true, unique: true },
    // The admin correction path `enforcePostingImmutability` implements and this collection did not
    // carry. Without both fields the hook's own documented route is unreachable, so wiring it would
    // make a posted row immutable for EVERYONE and leave reversal as the only correction — a policy
    // choice, and not one to discover after wiring ([[enforce]]/posting/immutability's own test says so).
    {
      name: 'adminOverride',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Admin correction of a POSTED row. Requires a documented reason below.' },
    },
    {
      name: 'adminOverrideHistory',
      type: 'array',
      admin: { description: 'Every admin correction, with who, when, why, and the prior value. Append-only in practice: the hook writes one entry per override.' },
      fields: [
        { name: 'overriddenBy', type: 'text' },
        { name: 'overrideDate', type: 'text' },
        { name: 'overrideReason', type: 'textarea', required: true },
        { name: 'priorValue', type: 'textarea' },
        { name: 'newValue', type: 'textarea' },
      ],
    },
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
      // after the tenant, because it resolves the calendar for (tenant, entity, postingDate)
      validateFiscalPeriodPosting,
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
      // FIRST: a posted row may not be modified at all, so refuse before anything else mutates data.
      enforcePostingImmutability,
      validateNotLocked,
      autoPopulateCreatedBy,
      autoSetTimestamp('postedDate', (data) => (data as { status?: string }).status === 'posted'),
    ],
    afterChange: [auditTrailAfterChange('gl-postings'), emitOnStatusTransition('posted', 'gl:posted', 'gl_posting')],
  },
  timestamps: true,
}

export default GLPostings
