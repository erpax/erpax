/**
 * Recurring Journals — automation register for IAS-1 §27 accrual-basis
 * entries that recur on a schedule (rent, depreciation accrual,
 * amortisation, prepaid release, deferred-revenue release, etc.).
 *
 * Slice BBBB (2026-05-10): the prior period-end model required manual
 * posting of every recurring accrual. This collection lets the user
 * define the JE template + cadence once; a scheduled job (Workers cron
 * → `period-close` queue) materialises the next instance into
 * `journal-entries` at each period rollover.
 *
 * Pairs with `journal-entries` (the materialised output) and the
 * Workers `triggers.crons` schedule.
 *
 * @standard ISO-8601-1:2019 date-time recurrence
 * @standard rfc-5545 icalendar-rrule recurrence-rule
 * @accounting IFRS IAS-1 §27 accrual-basis-of-accounting
 * @accounting IFRS IAS-1 §29 §30 separate-presentation
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 * @accounting US-GAAP ASC-720 other-expenses
 * @audit ISO-19011:2018 audit-trail recurring-evidence
 * @compliance SOX §404 internal-controls automated-controls
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./JournalEntries.ts
 * @see ./PeriodEndAdjustments.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../../hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '../../../access/auth'
import { currencyField, statusField, notesField, auditFields } from '../../../fields/base-accounting-fields'

const RecurringJournals: CollectionConfig = {
  slug: 'recurring-journals',
  labels: { singular: 'Recurring Journal', plural: 'Recurring Journals' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'frequency', 'nextRunDate', 'amount', 'remainingRuns', 'status'],
    description:
      'IAS-1 §27 recurring accrual template. The scheduled job materialises one journal-entry per (template × period) per schedule.',
  },
  access: accountingCollectionAccess({ feature: 'period_end_closing' }),
  fields: [
    { name: 'name', type: 'text', localized: true, required: true, index: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'recurrenceKind',
      type: 'select',
      defaultValue: 'rent_expense',
      options: [
        { label: 'Rent Expense (IFRS-16 short-term)', value: 'rent_expense' },
        { label: 'Depreciation Accrual (IAS-16)', value: 'depreciation' },
        { label: 'Amortisation (IAS-38)', value: 'amortisation' },
        { label: 'Prepaid Release (Asset → Expense)', value: 'prepaid_release' },
        { label: 'Deferred Revenue Release (IFRS-15)', value: 'deferred_revenue_release' },
        { label: 'Insurance Allocation', value: 'insurance' },
        { label: 'Loan Interest Accrual (IFRS-9)', value: 'loan_interest' },
        { label: 'Subscription Revenue (IFRS-15 §35)', value: 'subscription_revenue' },
        { label: 'Salary Allocation', value: 'salary_allocation' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    {
      name: 'frequency',
      type: 'select',
      required: true,
      defaultValue: 'monthly',
      options: [
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Bi-weekly', value: 'biweekly' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Quarterly', value: 'quarterly' },
        { label: 'Semi-Annually', value: 'semiannual' },
        { label: 'Annually', value: 'annual' },
        { label: 'RFC 5545 RRULE (custom)', value: 'rrule' },
      ],
    },
    { name: 'rrule', type: 'text',
      admin: { description: 'When frequency=rrule: RFC 5545 RRULE string (e.g. FREQ=MONTHLY;BYMONTHDAY=-1 for last-of-month).' } },
    { name: 'startDate', type: 'date', required: true },
    { name: 'endDate', type: 'date',
      admin: { description: 'Optional end of recurrence (null = open-ended).' } },
    { name: 'nextRunDate', type: 'date', required: true, index: true,
      admin: { description: 'Date the scheduler should next materialise. Auto-advanced after each successful run.' } },
    { name: 'lastRunDate', type: 'date',
      admin: { readOnly: true, description: 'Date of the most recent materialisation.' } },
    { name: 'lastRunJournalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { readOnly: true, description: 'Last materialised JE (for audit + reverse).' } },
    { name: 'remainingRuns', type: 'number',
      admin: { description: 'Optional cap on total runs (e.g. 12 for a 12-month amortisation schedule).' } },
    currencyField(),
    { name: 'amount', type: 'number', required: true,
      admin: { description: 'JE total in cents. For variable amounts, leave 0 and use `amountFormula`.' } },
    { name: 'amountFormula', type: 'text',
      admin: { description: 'Optional expression for variable amounts (e.g. `prepaid_balance / remaining_periods`).' } },
    {
      name: 'lines',
      type: 'array',
      required: true,
      minRows: 2,
      labels: { singular: 'Line', plural: 'Lines' },
      dbName: 'recur_je_lines',
      fields: [
        { name: 'glAccount', type: 'relationship', relationTo: 'gl-accounts', required: true },
        {
          name: 'side',
          type: 'select',
          required: true,
          options: [
            { label: 'Debit', value: 'debit' },
            { label: 'Credit', value: 'credit' },
          ],
        },
        { name: 'amount', type: 'number', required: true,
          admin: { description: 'Per-line cents. Σ debits must equal Σ credits.' } },
        { name: 'costCenter', type: 'relationship', relationTo: 'cost-centers' },
        { name: 'project', type: 'relationship', relationTo: 'projects' },
        { name: 'memo', type: 'text' },
      ],
    },
    { name: 'autoPost', type: 'checkbox', defaultValue: false,
      admin: { description: 'When true, the scheduler posts the JE directly. When false, it stages a draft for human approval (SOX §404 four-eyes).' } },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Paused', value: 'paused' },
        { label: 'Completed (no further runs)', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('recurring-journals'),
  timestamps: true,
}

export default RecurringJournals
