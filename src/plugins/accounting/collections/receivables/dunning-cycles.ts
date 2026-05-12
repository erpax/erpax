/**
 * # Dunning Cycles
 *
 * @summary Collection-process record per overdue invoice with IFRS-9 ECL evidence, stage history, and write-off governance.
 *
 * ## Core Function
 *
 * Dunning cycles track the escalation path of overdue AR through automated collections stages: friendly reminder (day +5),
 * first demand (day +15), second demand (day +30), legal handover (day +60), written-off (day +90). The `src/jobs/dunningJob.ts`
 * runs every 15 minutes, upserting one cycle per (tenant, invoice); manual overrides (pause, legal-hold, dispute) flow through here.
 * Auditors query dunning history for IFRS-9 §5.5 (simplified approach) or ASC-326-20 (CECL) expected-credit-loss evidence.
 * Cycle records are immutable except for status transitions and pause flags; stage history is append-only.
 *
 * ## Architecture
 *
 * Multi-tenant isolation via `tenantId`. Invoice relationship links to the original sale. Customer relationship denormalized from invoice
 * for reporting efficiency (avoids join at query time). Stages are operator-configurable per tenant; defaults shown above.
 * An append-only `history` array logs every stage transition with timestamp, amount-overdue-at-entry, communication-sent (email/SMS/letter),
 * and reason. Pause/hold flags allow business logic (dispute, payment-plan agreement, bankruptcy) to suspend auto-escalation without deleting
 * the cycle. ECL provision field captures the allowance-for-doubtful-accounts amount computed from IFRS-9 PD × LGD × EAD.
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:** autoPopulateTenant — stamp tenant context
 * - **beforeChange:** autoPopulateCreatedBy, autoSetTimestamp — auto-set resolvedAt when status → resolved or written_off
 * - **afterChange:** auditTrailAfterChange — log stage transitions, pause reason changes, ECL provision updates
 *
 * ## Key Fields
 *
 * - **cycleId (text, required, unique, index):** Unique identifier (e.g. DUNNC-2026-0001 or auto-UUID). Operator reference for tracking.
 * - **invoice (relationship → invoices, required, index):** The overdue invoice being collected. @standard IAS-39 §58 customer-credit
 * - **customer (relationship → customers):** Party responsible (denormalized from invoice for reporting). @audit collections-party
 * - **currency (text, required, default: EUR):** ISO-4217 currency code. @standard ISO-4217:2015
 * - **amountOverdue (number, required, min: 0):** Outstanding balance at cycle entry, integer cents. Recomputed on each job tick.
 * - **invoiceDueDate (date, required):** Original invoice due date (EN-16931 BT-9). Basis for days-past-due calculation.
 * - **daysPastDue (number, readOnly):** Days between invoiceDueDate and most recent job tick. Triggers stage advancement.
 * - **currentStage (select, required, default: reminder):** Active stage: reminder, first_demand, second_demand, legal_handover, written_off. @standard IFRS-9 §5.5 stage assessment
 * - **currentStageEnteredAt (date, readOnly):** Timestamp when cycle entered current stage (auto-set by job).
 * - **nextActionDate (date, readOnly):** Computed by job — when next stage transition is due. Basis for collection-schedule.
 * - **history (array, append-only):** Stage entry history with: stage (select), enteredAt (date), amountOverdueAtEntry (number), communicationSent (select: none/email/SMS/letter/phone/legal_letter), communicationReference (text), notes (textarea, localized).
 * - **paused (checkbox, default: false):** Pause auto-progression (e.g., customer disputed, finance held). Job skips paused cycles.
 * - **pauseReason (select, conditional on paused):** Why paused: disputed, payment_plan, legal_hold, bankruptcy, manual_review. @standard GDPR Art.6(1)(f)
 * - **paymentPlanRef (text, conditional on pauseReason = payment_plan):** Reference to payment-plan agreement document.
 * - **eclProvision (number):** Allowance for doubtful accounts attributable to this invoice. Feeds AllowanceForDoubtfulAccounts GL account. @standard IFRS-9 §5.5 simplified
 * - **writeOffJournalEntry (relationship → journal-entries, readOnly):** JE ID when stage → written_off (Dr Bad-Debt Expense / Cr AR or Allowance). @standard SOX §302
 * - **status (select, required, default: active):** Lifecycle: active, paused, resolved (paid), written_off, closed. Drives query filtering.
 * - **resolvedAt (date, readOnly):** Auto-set when status → resolved or written_off (ISO-8601).
 * - **createdBy (relationship → users, readOnly):** User who created the dunning cycle (system or manual trigger).
 * - **createdAt (date, readOnly):** Creation timestamp (ISO-8601).
 * - **modifiedBy (relationship → users, readOnly):** Last user who modified status/pause flags.
 * - **modifiedAt (date, readOnly):** Last modification timestamp.
 * - **note (textarea):** Internal notes (collection strategy, customer communication context, hold reasons).
 * - **tenantId (relationship → tenants, required, index):** Multi-tenant isolation; set by autoPopulateTenant.
 *
 * ## Core Invariants
 *
 * - **AppendOnlyHistory:** stage history array items cannot be deleted or modified; dunning job appends entries only.
 * - **StageConsistency:** currentStage must match latest history entry stage. NextActionDate computed from currentStageEnteredAt + stage-specific days offset.
 * - **PauseEnforcement:** When paused = true, job skips this cycle; no auto-escalation occurs.
 * - **UniquePerInvoice:** Only one active dunning cycle per (tenant, invoice) at any time. Job upserts to prevent duplicates.
 * - **ECLProvisionUpdate:** eclProvision recomputed per IFRS-9 simplified approach on each job tick; triggers GL adjustment if changed. @standard IFRS-9 §5.5
 * - **WriteOffGate:** status → written_off only via manual override or day ≥ 90; auto-creates write-off JE and bad-debt provision. @standard SOX §404
 *
 * ## Audit Trail
 *
 * Every record captures: createdBy (user + timestamp), modifiedBy (user + timestamp), lastModified (ISO-8601), lastModifiedBy (user ID).
 * Stage transitions logged to `audit-events` with full field deltas. ECL provision changes flagged separately for audit review.
 * Pause/hold overrides and write-off approvals logged with reason/justification (compliance evidence for IFRS-9 / CECL).
 * @standard SOX §302 §404 bad-debt-evidence control
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "dun_uuid_2026_001",
 *   "tenantId": "tenant_bg_ltd",
 *   "cycleId": "DUNNC-2026-0001",
 *   "invoice": "inv_uuid_54321",
 *   "customer": "cust_uuid_12345",
 *   "currency": "BGN",
 *   "amountOverdue": 1250000,
 *   "invoiceDueDate": "2026-04-10",
 *   "daysPastDue": 32,
 *   "currentStage": "second_demand",
 *   "currentStageEnteredAt": "2026-04-30T09:15:00Z",
 *   "nextActionDate": "2026-05-30T09:15:00Z",
 *   "history": [
 *     { "stage": "reminder", "enteredAt": "2026-04-15T10:00:00Z", "amountOverdueAtEntry": 1250000, "communicationSent": "email" },
 *     { "stage": "first_demand", "enteredAt": "2026-04-25T08:30:00Z", "communicationSent": "letter" },
 *     { "stage": "second_demand", "enteredAt": "2026-04-30T09:15:00Z", "communicationSent": "email" }
 *   ],
 *   "paused": false,
 *   "eclProvision": 62500,
 *   "status": "active",
 *   "createdBy": "system",
 *   "createdAt": "2026-04-15T10:00:00Z",
 *   "modifiedBy": "user_uuid_accountant",
 *   "modifiedAt": "2026-04-30T09:15:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec IFRS-9 ECL evidence lifecycle
 * @useCase Dunning escalation, bad-debt allowance, AR aging, collections workflow automation
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IFRS-9 §5.5 expected-credit-loss simplified-approach
 * @accounting IFRS IAS-39 §58 financial-asset-impairment
 * @accounting US-GAAP ASC-326-20 cecl-credit-losses
 * @accounting US-GAAP ASC-310 receivables
 * @audit ISO-19011:2018 audit-trail collections-evidence
 * @compliance SOX §302 §404 bad-debt-evidence
 * @compliance GDPR Art.6(1)(f) legitimate-interest collections
 * @security Segregation-of-duties write-off approval; multi-tenant isolation
 * @see src/jobs/dunningJob.ts (15-minute escalation driver)
 * @see ./Invoices.ts (overdue AR source)
 * @see ./Customers.ts (collection party)
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/access/auth'
import {
  multiTenancyField,
  currencyField,
  statusField,
  notesField,
  auditFields,
} from '@/fields/accounting/base-accounting-fields'

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
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
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
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      autoPopulateCreatedBy,
      autoSetTimestamp(
        'resolvedAt',
        (d) =>
          (d as { status?: string }).status === 'resolved' ||
          (d as { status?: string }).status === 'written_off',
      ),
    ],
    afterChange: [auditTrailAfterChange('dunning-cycles')],
  },
  timestamps: true,
}

export default DunningCycles
