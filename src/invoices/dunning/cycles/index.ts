/**
 * Dunning Cycles — collection-process record per overdue invoice.
 *
 * `src/jobs/dunningJob.ts` runs every 15 minutes (Slice ZZ wired the
 * Cloudflare cron). Until now there was no durable record of WHICH
 * invoices entered dunning, WHICH letter / step they're on, or WHEN
 * the cycle escalated. Auditors querying ECL allowance evidence
 * (IFRS 9 §5.5 / ASC 326-20) need this trail.
 *
 * Each row tracks one cycle for one (tenant, invoice). The job
 * upserts the row on each tick; manual overrides (skip / pause /
 * legal-hold) flow through here too.
 *
 * Stages (configurable per tenant; defaults):
 *   1  reminder        — friendly, day +5
 *   2  first_demand    — formal, day +15
 *   3  second_demand   — final notice, day +30
 *   4  legal_handover  — referred to collections agency / legal, day +60
 *   5  written_off     — bad-debt write-off, day +90
 *
 * @standard ISO-8601-1:2019 date-time stage-due-date
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IFRS-9 §5.5 expected-credit-loss simplified-approach
 * @accounting US-GAAP ASC-326-20 cecl-credit-losses
 * @accounting US-GAAP ASC-310 receivables
 * @audit ISO-19011:2018 audit-trail collections-evidence
 * @compliance SOX §404 internal-controls bad-debt-evidence
 * @compliance GDPR Art.6(1)(f) lawful-basis-legitimate-interest collections
 * @security ISO-27002 §5.4 segregation-of-duties write-off-approval
 * @see src/jobs/dunningJob.ts
 * @see docs/STANDARDS.md §4.2 §5
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { autoSetTimestamp } from '@/auto/set/timestamp'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '@/auth'
import {
  currencyField,
  statusField,
  notesField,
  auditFields,
} from '@/base/accounting/field'

const DunningCycles: CollectionConfig = {
  slug: 'dunning-cycles',
  labels: { singular: 'Dunning Cycle', plural: 'Dunning Cycles' },
  admin: {
    useAsTitle: 'cycleId',
    defaultColumns: [
      'cycleId',
      'invoice',
      'currentStage',
      'currentStageEnteredAt',
      'amountOverdue',
      'status',
    ],
    description:
      'Collection-process trail per overdue invoice. IFRS 9 / CECL evidence layer.',
  },
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
    { name: 'cycleId', type: 'text', required: true, unique: true, index: true },
    {
      name: 'invoice',
      type: 'relationship',
      relationTo: 'invoices',
      required: true,
      index: true,
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'addresses',
      admin: { description: 'Customer (denormalized from invoice for reporting).' },
    },
    currencyField('EUR'),
    {
      name: 'amountOverdue',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description:
          'Outstanding balance at cycle entry, integer cents. Recomputed on each job tick.',
      },
    },
    {
      name: 'invoiceDueDate',
      type: 'date',
      required: true,
      admin: { description: 'Original invoice due date (BT-9).' },
    },
    {
      name: 'daysPastDue',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Days between invoiceDueDate and the most recent job tick.',
      },
    },

    // Current stage
    {
      name: 'currentStage',
      type: 'select',
      required: true,
      defaultValue: 'reminder',
      options: [
        { label: '1 — Friendly reminder (day +5)', value: 'reminder' },
        { label: '2 — First demand (day +15)', value: 'first_demand' },
        { label: '3 — Second demand (day +30)', value: 'second_demand' },
        { label: '4 — Legal handover (day +60)', value: 'legal_handover' },
        { label: '5 — Written off (day +90)', value: 'written_off' },
      ],
    },
    { name: 'currentStageEnteredAt', type: 'date', admin: { readOnly: true } },
    {
      name: 'nextActionDate',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Computed by the job — when the next stage transition is due.',
      },
    },

    // Stage history (append-only)
    {
      name: 'history',
      type: 'array',
      labels: { singular: 'Stage entry', plural: 'Stage history' },
      admin: {
        description:
          'Append-only stage entries. Auditor queries this for ECL evidence — DO NOT delete prior entries.',
      },
      fields: [
        {
          name: 'stage',
          type: 'select',
          required: true,
          options: [
            { label: 'Reminder', value: 'reminder' },
            { label: 'First demand', value: 'first_demand' },
            { label: 'Second demand', value: 'second_demand' },
            { label: 'Legal handover', value: 'legal_handover' },
            { label: 'Written off', value: 'written_off' },
            { label: 'Paused (manual)', value: 'paused' },
            { label: 'Resolved (paid)', value: 'resolved' },
          ],
        },
        { name: 'enteredAt', type: 'date', required: true },
        { name: 'amountOverdueAtEntry', type: 'number' },
        {
          name: 'communicationSent',
          type: 'select',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Email', value: 'email' },
            { label: 'SMS', value: 'sms' },
            { label: 'Postal letter', value: 'letter' },
            { label: 'Phone call (logged)', value: 'phone' },
            { label: 'Legal demand letter', value: 'legal_letter' },
          ],
        },
        { name: 'communicationReference', type: 'text' },
        { name: 'notes', type: 'textarea', localized: true },
      ],
    },

    // Hold / pause flags
    {
      name: 'paused',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Pause the auto-progression (e.g. customer disputed; finance held). Job skips paused cycles.',
      },
    },
    {
      name: 'pauseReason',
      type: 'select',
      admin: {
        condition: (data) => Boolean((data as { paused?: boolean })?.paused),
      },
      options: [
        { label: 'Disputed by customer', value: 'disputed' },
        { label: 'Payment plan agreed', value: 'payment_plan' },
        { label: 'Legal hold', value: 'legal_hold' },
        { label: 'Customer bankruptcy', value: 'bankruptcy' },
        { label: 'Manual review', value: 'manual_review' },
      ],
    },
    {
      name: 'paymentPlanRef',
      type: 'text',
      admin: {
        description: 'Reference to payment plan / agreement document.',
        condition: (data) =>
          (data as { pauseReason?: string })?.pauseReason === 'payment_plan',
      },
    },

    // ECL evidence
    {
      name: 'eclProvision',
      type: 'number',
      admin: {
        description:
          'Allowance for doubtful accounts attributable to this invoice — feeds AllowanceForDoubtfulAccounts. Computed via IFRS 9 PD × LGD × EAD or simplified-approach lifetime ECL.',
      },
    },
    {
      name: 'writeOffJournalEntry',
      type: 'relationship',
      relationTo: 'journal-entries',
      admin: {
        readOnly: true,
        description:
          'JE id when stage advances to written_off (Dr Bad Debt Expense / Cr AR or Allowance).',
      },
    },

    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Paused', value: 'paused' },
        { label: 'Resolved (paid)', value: 'resolved' },
        { label: 'Written off', value: 'written_off' },
        { label: 'Closed', value: 'closed' },
      ],
      'active',
    ),
    { name: 'resolvedAt', type: 'date', admin: { readOnly: true } },

    ...auditFields(),
    notesField(),
  ],
  hooks: standardCollectionHooks('dunning-cycles', { beforeChange: [autoSetTimestamp(
        'resolvedAt',
        (d) =>
          (d as { status?: string }).status === 'resolved' ||
          (d as { status?: string }).status === 'written_off',
      )] }),
  timestamps: true,
}

export default DunningCycles
