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

/**
 * Journal Entries — double-entry-bookkeeping write target.
 *
 * Invariant: total debits === total credits per entry. Period-locked entries
 * cannot be edited or back-dated. Posted entries are read-only except to
 * admins. Segregation of duties: the user who created an entry cannot also
 * approve it.
 *
 * Slice WW (post-cleanup): replaced inlined access predicates and field
 * factories with the shared `@/access/auth` and
 * `@/fields/accounting` infrastructure. Wired audit-trail emission
 * (was declared via `@audit ISO-19011` but never implemented), the
 * segregation-of-duties hook (declared via `@security ISO-27002 §5.4`,
 * never implemented), and ISO-8601 timestamps on `postedDate` /
 * `approvalDate` transitions (declared via `@compliance SOX §404`, never
 * implemented).
 *
 * @standard ISO-8601-1:2019 date-time entry-date posted-date approval-date
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 * @accounting OECD SAF-T §3 journal-entries
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.4 segregation-of-duties
 * @see docs/STANDARDS.md §4.2
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
