/**
 * PeriodLocks Collection
 *
 * Manages accounting period closing and posting restrictions.
 * Prevents new postings to closed periods except via reversals or prior-period adjustments.
 * Tracks who closed each period and when.
 *
 * Fiscal Period = month (1-12) or quarter (Q1-Q4) of fiscal year.
 * Example: FY 2026 Period 5 = May 2026
 *
 * @invariant Closed periods accept only reversals and prior-period adjustments
  * @compliance SOX §404 period-close-integrity
 * @accounting IFRS IAS-1 reporting-period
 * @standard ISO-8601-1:2019 locked-at
*/

import { CollectionConfig } from 'payload'
import { accountingCollectionAccess } from '@/access/auth'

export const PeriodLocks: CollectionConfig = {
  slug: 'period-locks',
  admin: {
    useAsTitle: 'periodLabel',
  },
  access: accountingCollectionAccess(),
  fields: [
    {
      name: 'periodLabel',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'E.g., "FY 2026 Period 5" or "FY 2026 Q2"' },
    },
    {
      name: 'fiscalYear',
      type: 'number',
      required: true,
      admin: { description: 'Fiscal year (e.g., 2026)' },
    },
    {
      name: 'fiscalPeriod',
      type: 'number',
      required: true,
      admin: { description: 'Period number: 1-12 for monthly, 1-4 for quarterly' },
    },
    {
      name: 'periodType',
      type: 'select',
      options: [
        { label: 'Monthly', value: 'monthly' },
        { label: 'Quarterly', value: 'quarterly' },
        { label: 'Annual', value: 'annual' },
      ],
      required: true,
      defaultValue: 'monthly',
    },
    {
      name: 'periodStartDate',
      type: 'date',
      required: true,
      admin: { description: 'First day of period' },
    },
    {
      name: 'periodEndDate',
      type: 'date',
      required: true,
      admin: { description: 'Last day of period' },
    },
    {
      name: 'lockStatus',
      type: 'select',
      options: [
        { label: 'Open (Normal Posting)', value: 'open' },
        { label: 'Locked (Reversals Only)', value: 'locked' },
        { label: 'Archived (Read-Only)', value: 'archived' },
      ],
      required: true,
      defaultValue: 'open',
      admin: {
        description:
          'Open = normal posting allowed. Locked = only reversals/adjustments. Archived = read-only.',
      },
    },
    {
      name: 'closedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { description: 'User who closed this period' },
    },
    {
      name: 'closedDate',
      type: 'date',
      admin: { description: 'Date period was closed' },
    },
    {
      name: 'closeReason',
      type: 'richText',
      admin: { description: 'Notes on why period was closed (e.g., "Q1 close, audited and filed")' },
    },
    {
      name: 'allowReversals',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'If locked, check to allow reversal entries (standard for closed periods)',
      },
    },
    {
      name: 'allowPriorPeriodAdjustments',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'If locked, check to allow prior-period adjustments (requires approval)',
      },
    },
    {
      name: 'requiresAdminOverride',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description:
          'If locked, require admin approval for non-reversal/non-adjustment postings (safety flag)',
      },
    },
    {
      name: 'relatedClosingEntries',
      type: 'relationship',
      relationTo: 'closing-entries',
      hasMany: true,
      admin: { description: 'Closing entries generated for this period' },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'Additional notes for this period' },
    },
  ],
}
