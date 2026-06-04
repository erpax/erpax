import type { Access, CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/auto/populate/tenant'
import { autoPopulateCreatedBy } from '@/auto/populate/created/by'
import { autoSetTimestamp } from '@/auto/set/timestamp'
import { auditTrailAfterChange } from '@/audit/trail/after/change'
import { enforceSegregationOfDuties } from '@/enforce/segregation/of/duty'
import { adminOrAccountant, scopedAccess, tenantAdmin, hasRole, getUserContext } from '@/auth'
import {
  glAccountField,
  currencyField,
  statusField,
  auditFields,
} from '@/fields'
import { validateNotLocked } from '@/accounting/utility/period-lock'
import { validateBalancedEntry } from '@/accounting/hooks/balanced-entry.hook'

/**
 * Journal Entries — double-entry-bookkeeping write target.
 *
 * Invariant: total debits === total credits per entry. Period-locked entries
 * cannot be edited or back-dated. Posted entries are read-only except to
 * admins. Segregation of duties: the user who created an entry cannot also
 * approve it.
 *
 * Folded into its folder-node (the name lives in the folder; this file is the
 * collection meaning). Supersedes the former flat `JournalEntries.ts` and the
 * shadowed alternate that this file used to hold.
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
 * Role + tenant gate: admin/accountant of own tenant. Posting immutability is
 * enforced separately in the beforeChange hook below — access functions run
 * before the op and have no view of the stored doc.
 */
const updateAccess: Access = async ({ req }) => {
  const user = getUserContext(req)
  if (!hasRole(user, 'admin', 'accountant')) return false
  return { tenant: { equals: user!.tenant } }
}

/**
 * Posted journal entries are immutable to non-admins (SOX §404 — once a GL
 * entry is posted it is part of the permanent record). Runs on update only;
 * `originalDoc` carries the stored status.
 */
const enforcePostedImmutable: CollectionBeforeChangeHook = ({ req, data, operation, originalDoc }) => {
  if (operation === 'update' && originalDoc?.status === 'posted' && !hasRole(getUserContext(req), 'admin')) {
    throw new Error('Posted journal entries are immutable; contact an admin if a correction is required.')
  }
  return data
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
    create: adminOrAccountant,
    update: updateAccess,
    delete: tenantAdmin,
  },
  fields: [
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
        // Analytical dimension for IFRS-8 / ASC-280 segment roll-ups (optional).
        { name: 'costCenterId', type: 'text' },
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
        { label: 'Lease Period', value: 'lease_period' },
      ],
    },
    { name: 'sourceId', type: 'text' },
    // SAF-T §3 source-document event linkage (e.g. 'invoice:posted').
    { name: 'sourceEvent', type: 'text' },
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
      enforcePostedImmutable,
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
