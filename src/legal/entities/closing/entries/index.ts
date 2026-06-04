/**
 * ClosingEntries Collection
 *
 * Tracks period-end closing journal entries that close P&L accounts to retained earnings.
 * At period-end: Revenue accounts → credited to Retained Earnings
 *                Expense accounts → debited to Retained Earnings
 * Creates immutable audit trail of period closing process.
 *
 * Closing entries reverse at start of next period (auto-reversal entries).
 *
 * @invariant Closing entry created only at period close, never in open period
 * @invariant Closing entry is immutable once posted
 * @invariant Reversing entry created automatically at period start
  * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-205 presentation
 * @compliance SOX §404 period-close-integrity
*/

import { CollectionConfig } from 'payload'
import { accountingCollectionAccess } from '@/auth'
import { validateClosingPeriod, generateReversingEntries, validateMultiCurrencyClosing } from '@/hooks'

export const ClosingEntries: CollectionConfig = {
  slug: 'closing-entries',
  admin: {
    useAsTitle: 'closingEntryNumber',
  },
  access: accountingCollectionAccess(),
  hooks: {
    beforeValidate: [validateClosingPeriod, validateMultiCurrencyClosing],
    afterChange: [generateReversingEntries],
  },
  fields: [
    {
      name: 'entity',
      type: 'relationship',
      relationTo: 'legal-entities',
      required: true,
      admin: { description: 'Entity for which period is being closed' },
    },
    {
      name: 'closingEntryNumber',
      type: 'text',
      unique: true,
      required: true,
      admin: { description: 'Unique ID: e.g., "CLOSE-FY2026-P12" (fiscal year, period)' },
    },
    {
      name: 'periodLock',
      type: 'relationship',
      relationTo: 'period-locks',
      required: true,
      admin: { description: 'Period lock record for this closing' },
    },
    {
      name: 'fiscalPeriod',
      type: 'relationship',
      relationTo: 'fiscal-periods',
      required: true,
      admin: {
        description:
          'Phase B2: Fiscal period configuration (enables all period types: monthly, quarterly, custom, etc.)',
      },
    },
    {
      name: 'fiscalYear',
      type: 'number',
      required: true,
      admin: { description: 'Fiscal year of closing entry' },
    },
    {
      name: 'fiscalPeriodNumber',
      type: 'number',
      required: true,
      admin: { description: 'Period number (1-12 monthly, 1-4 quarterly, 1-N custom)' },
    },
    {
      name: 'periodLabel',
      type: 'text',
      admin: {
        description:
          'Period label (denormalized from FiscalCalendars, e.g., "May 2026", "Q2 2026")',
      },
    },
    {
      name: 'regulatoryCode',
      type: 'text',
      admin: {
        description:
          'Phase B2: SAF-T/XBRL regulatory period code (P05_2026, Q2_2026). Deterministic from fiscal config.',
      },
    },
    {
      name: 'closingDate',
      type: 'date',
      required: true,
      admin: { description: 'Date closing entries were created/posted' },
    },
    {
      name: 'closingType',
      type: 'select',
      options: [
        { label: 'Monthly Close', value: 'monthly' },
        { label: 'Quarterly Close', value: 'quarterly' },
        { label: 'Year-End Close', value: 'year-end' },
        { label: 'Interim Close', value: 'interim' },
      ],
      required: true,
      admin: { description: 'Type of closing being performed' },
    },
    {
      name: 'closedBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: { description: 'User who initiated closing' },
    },
    {
      name: 'approvedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { description: 'Finance manager/CFO who approved closing' },
    },
    {
      name: 'closingEntries',
      type: 'array',
      fields: [
        {
          name: 'sequenceNumber',
          type: 'number',
          required: true,
          admin: { description: 'Order in which entry posted (for control)' },
        },
        {
          name: 'journalEntryId',
          type: 'relationship',
          relationTo: 'journal-entries',
          required: true,
          admin: { description: 'Link to actual GL posting' },
        },
        {
          name: 'entryDescription',
          type: 'text',
          required: true,
          admin: {
            description:
              'E.g., "Close revenue accounts" or "Close expense accounts to retained earnings"',
          },
        },
        {
          name: 'accountsClosed',
          type: 'text',
          admin: { description: 'GL account range or list (e.g., "4000-4999" for revenue)' },
        },
        {
          name: 'netAmount',
          type: 'number',
          required: true,
          admin: { description: 'Total debits or credits (net of close)' },
        },
        {
          name: 'retainedEarningsImpact',
          type: 'number',
          admin: { description: 'Impact to retained earnings (usually equals netAmount)' },
        },
        {
          name: 'posted',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Check once entry posted to GL' },
        },
        {
          name: 'postedDate',
          type: 'date',
          admin: { description: 'Date posted' },
        },
        {
          name: 'reversingEntryId',
          type: 'relationship',
          relationTo: 'journal-entries',
          admin: { description: 'Link to auto-reversal entry (posted in next period start)' },
        },
        {
          name: 'notes',
          type: 'textarea',
          admin: { description: 'Entry-specific notes' },
        },
      ],
      admin: { description: 'Individual closing entries that make up this close' },
    },
    {
      name: 'totalRevenuesClosed',
      type: 'number',
      admin: { description: 'Sum of all revenue accounts closed (calculated)' },
    },
    {
      name: 'totalExpensesClosed',
      type: 'number',
      admin: { description: 'Sum of all expense accounts closed (calculated)' },
    },
    {
      name: 'netIncome',
      type: 'number',
      admin: { description: 'Net income for period (revenues - expenses)' },
    },
    {
      name: 'closingStatus',
      type: 'select',
      options: [
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Pending Approval', value: 'pending-approval' },
        { label: 'Approved', value: 'approved' },
        { label: 'Posted', value: 'posted' },
        { label: 'Finalized', value: 'finalized' },
      ],
      required: true,
      defaultValue: 'in-progress',
      admin: { description: 'Closing workflow status' },
    },
    {
      name: 'reversalEntriesGenerated',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check once reversal entries created for next period start',
      },
    },
    {
      name: 'reversalGeneratedDate',
      type: 'date',
      admin: { description: 'Date when reversing entries were auto-created' },
    },
    {
      name: 'governanceScope',
      type: 'json',
      admin: {
        description:
          'Phase B2: Law 63 self-governance metadata. Stores entity closing authority, approval thresholds, audit level. Auto-populated from entity profile.',
      },
    },
    {
      name: 'chainLeafUuid',
      type: 'text',
      admin: {
        description:
          'Phase B2: Law 60 audit chain leaf. Computed as sha256(JCS-canonical(ClosingEntries) || prior_leaf_uuid). Enables tamper detection.',
      },
    },
    {
      name: 'multiCurrencyReconciliation',
      type: 'json',
      admin: {
        description:
          'Phase B3: Multi-currency reconciliation results (balance per currency, unrealized FX gains/losses, exchange rates). Auto-populated by validateMultiCurrencyClosing hook.',
      },
    },
    {
      name: 'auditTrail',
      type: 'richText',
      admin: {
        description:
          'Immutable audit trail of closing activities (who did what, when). Append-only.',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'General notes on this period close' },
    },
  ],
}
