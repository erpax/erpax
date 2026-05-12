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
