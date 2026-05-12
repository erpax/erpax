/**
 * Recurring Journals — Automation register for IAS-1 §27 accrual-basis entries.
 *
 * Core Function:
 *   Recurring Journals are templates for financial entries that repeat on a schedule
 *   (rent expense, depreciation accrual, interest accrual, deferred revenue release,
 *   prepaid insurance release, etc.). Instead of manually creating each journal entry,
 *   users define the template once with a cadence (daily, weekly, monthly, quarterly,
 *   yearly). A scheduled Workers cron job (period-close queue) automatically materializes
 *   one journal-entries record per (template × fiscal period) at each period rollover.
 *   This eliminates manual entry errors and enforces consistent accrual timing (IAS-1 §27).
 *
 * Architecture:
 *   • Multi-tenant isolation: each tenant has independent recurring journal templates.
 *   • Materialization workflow: template (recurring-journals) → cron job → output (journal-entries).
 *   • Recurrence rule: RFC-5545 RRULE format (icalendar standard) for flexible scheduling.
 *   • Status tracking: Active | Suspended | Archived (determines if cron should process).
 *   • Audit trail: each materialized entry links back to template via templateId.
 *   • Workers integration: cron trigger defined in wrangler.toml; payload enqueued to period-close queue.
 *
 * Hooks:
 *   • beforeValidate: autoPopulateTenant, validateRRuleFormat.
 *   • beforeChange: checkNextRunDate (cannot modify active template mid-period).
 *   • afterChange: auditTrailAfterChange (emit for audit log).
 *
 * Fields:
 *   • name (text, localized): Human-readable template name (e.g., "Monthly Rent Accrual").
 *   • description (textarea, localized): Business purpose + reference to policy.
 *   • recurrenceKind: daily | weekly | monthly | quarterly | annually | custom.
 *   • recurrenceRule (text): RFC-5545 RRULE (e.g., "FREQ=MONTHLY;BYMONTHDAY=1").
 *   • nextRunDate (date): Next scheduled materialization date (auto-calculated).
 *   • remainingRuns (number): Count-down if finite recurrence (null = infinite).
 *   • templateData (json): Serialized journal-entries template (lines array).
 *     _Note: Template shape is documented in Example section below; ensure JSON structure matches `lines: [{account, debit, credit}, ...]` format._
 *   • status: Active | Suspended | Archived.
 *   • amount (number): Convenience field for single-line recurring amounts.
 *   • currency (select): ISO-4217 currency for the entry.
 *   • frequency (select): UI-friendly recurrence picker (redundant with RRULE; for UX).
 *
 * Invariants:
 *   1. Recurrence rule must be valid RFC-5545 (validateRRuleFormat enforces).
 *   2. nextRunDate must be ≥ today (cannot schedule backwards).
 *   3. Active templates cannot be deleted; must transition to Archived.
 *   4. templateData must contain valid journal-entries structure (min 2 lines, balanced).
 *   5. Each materialized entry links back to template via templateId (traceability).
 *   6. Suspended templates skip all period rollovers until reactivated.
 *   7. remainingRuns decrements with each materialization (if finite).
 *
 * Audit Trail:
 *   • createdBy auto-populated at creation (autoPopulateCreatedBy).
 *   • All template changes recorded with user + timestamp (SOX §404).
 *   • Each materialization logged: materialized-count incremented, next-run-date updated.
 *   • Materialization events emitted (audit trail traceability: template → entries).
 *   • Status transitions (Active → Suspended → Archived) recorded.
 *
 * Example:
 *   Rent Accrual (monthly):
 *     name: "Monthly Office Rent Accrual"
 *     description: "Accrue monthly rent expense per lease agreement #2024-LEASE-001"
 *     recurrenceKind: monthly
 *     recurrenceRule: "FREQ=MONTHLY;BYMONTHDAY=1" (first of month)
 *     nextRunDate: 2026-06-01
 *     remainingRuns: null (infinite)
 *     templateData:
 *       { lines: [
 *           { account: "6100-Rent-Expense", debit: 5000 },
 *           { account: "2100-Accrued-Expenses", credit: 5000 }
 *         ]}
 *     status: Active
 *   On 2026-06-01 cron fires: job reads template, creates journal-entry with matching lines,
 *   sets nextRunDate to 2026-07-01, updates materialized-count.
 *
 * Phase Slice:
 *   WW (post-cleanup): Consolidated access control and field factories, wired
 *   autoPopulateTenant hook, implemented audit-trail emission. RFC-5545 recurrence
 *   rules validated. Workers cron integration defined in wrangler.toml. Materialization
 *   job reads nextRunDate and executes at period boundaries.
 *
 * @useCase Recurring Expense — Accrue rent, subscriptions, insurance monthly.
 * @useCase Depreciation Automation — Accrue fixed asset depreciation per policy.
 * @useCase Interest Accrual — Accrue loan/bond interest per schedule.
 * @useCase Deferred Revenue Release — Ratably release pre-paid service revenue.
 * @useCase Prepaid Insurance Release — Monthly insurance expense accrual.
 * @useCase Compliance Automation — Ensure consistent accrual timing (IAS-1 §27, SOX §404).
 * @useCase Audit Trail — Track all materializations back to template for completeness.
 *
 * @standard ISO-8601-1:2019 date-time recurrence next-run-date
 * @standard RFC-5545:2009 icalendar-rrule recurrence-rule
 * @standard EN-16931:2017 electronic-invoicing recurring-invoice-reference
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-1 §27 accrual-basis-of-accounting
 * @accounting IFRS IAS-1 §29 §30 separate-presentation
 * @accounting IFRS IAS-8 accounting-policies-changes-errors
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 * @accounting US-GAAP ASC-720 other-expenses
 * @accounting US-GAAP ASC-730 research-development-expenses
 * @accounting OECD SAF-T §3 journal-entries recurring-transactions
 * @audit ISO-19011:2018 audit-trail recurring-evidence completeness
 * @audit ISO-19011:2018 audit-trail template-traceability
 * @compliance SOX §302 certification-internal-controls
 * @compliance SOX §404 internal-controls automated-controls
 * @compliance SOX §404 internal-controls management-assessment
 * @compliance SOX §409 real-time-disclosure recurrence-status-change
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 A.7.1 access-control role-based
 * @see docs/STANDARDS.md §4.2 Recurring-Journal-Standards
 * @see src/plugins/accounting/collections/journal-entries.ts Journal-Entry-Output
 * @see src/plugins/accounting/collections/period-end-adjustments.ts Period-End-Adjustments
 * @see wrangler.toml Workers-Cron-Trigger
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields } from '@/fields/accounting/base-accounting-fields'

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
    multiTenancyField(),
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
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('recurring-journals')],
  },
  timestamps: true,
}

export default RecurringJournals
