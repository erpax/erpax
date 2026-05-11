/**
 * Scheduled-tasks registry — Slice QQQQ (2026-05-10).
 *
 * Single source of truth for every time-driven action in ERPax. Mirrors
 * the BUSINESS_CHAINS pattern: declare each task as one entry; the cron
 * dispatcher in `runner.ts` walks the registry and fires each task whose
 * cron expression matches the current minute.
 *
 * Why a registry: previously the time-driven actions were scattered across
 * `payload.config.ts` cron-bearer, per-handler ad-hoc setTimeout, and
 * `recurring-journals` materialisation. Auditors couldn't grep for "what
 * runs on a schedule" — this registry is that index.
 *
 * Adding a new scheduled task:
 *   1. Append an entry below with id + cron + handlerKey + standards.
 *   2. Register the handler in `services/scheduled-tasks/handlers/<id>.ts`
 *      and import it into `runner.ts`'s SCHEDULED_TASK_HANDLERS map.
 *   3. The next boot picks up the entry; no cron-config changes needed.
 *
 * @standard rfc-5545 icalendar (cron-style schedules)
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO-19011:2018 §6.4.6 audit-evidence-scheduled-actions
 * @compliance SOX §404 internal-controls automated-controls
 * @compliance GDPR Art.5(1)(e) storage-limitation (retention purges)
 * @see ./runner.ts
 * @see ./types.ts
 */

import type { ScheduledTaskRegistry } from './types'

export const SCHEDULED_TASKS: ScheduledTaskRegistry = {
  // ─── Core: Payload jobs queue (every 15 min) ────────────────────────
  PAYLOAD_JOBS_RUN: {
    id: 'PAYLOAD_JOBS_RUN',
    name: 'Payload jobs queue',
    description: 'Dispatches the Payload v3 jobs queue (dunning-cycle + ad-hoc tasks). Cadence chosen to reduce Worker invocations vs default */5.',
    cron: '*/15 * * * *',
    handlerKey: 'payload:jobs:run',
    standards: ['rfc-5545'],
    featureGate: undefined,
    idempotencyKey: 'fixed-window',
    timeoutSeconds: 60,
  },

  // ─── Country-context: BG БНБ rates daily 01:00 UTC ──────────────────
  BG_BNB_RATES_SYNC: {
    id: 'BG_BNB_RATES_SYNC',
    name: 'BG БНБ rates daily sync',
    description: 'Pulls the prior business day\'s БНБ FX fixing — published ~16:00 EET, captured at 01:00 UTC.',
    cron: '0 1 * * *',
    handlerKey: 'bg:bnb-rates:sync',
    standards: ['ISO-4217:2015', 'ISO-8601-1:2019', 'BG БНБ daily-fixing'],
    featureGate: 'multi_currency',
    idempotencyKey: 'date-bucket',
    timeoutSeconds: 30,
  },

  // ─── Period-end: recurring journals materialisation ────────────────
  RECURRING_JOURNALS_SWEEP: {
    id: 'RECURRING_JOURNALS_SWEEP',
    name: 'Recurring journals sweep',
    description: 'Walks recurring-journals where nextRunDate ≤ now; materialises one journal-entry per (template × period). Auto-post or four-eyes per template.',
    cron: '0 2 * * *',
    handlerKey: 'recurring-journals:sweep',
    standards: ['IAS-1 §27 accrual-basis', 'rfc-5545'],
    featureGate: 'period_end_closing',
    idempotencyKey: 'template-and-period',
    timeoutSeconds: 120,
  },

  // ─── KYC: scheduled re-screen (FATF R.10) ──────────────────────────
  KYC_RESCREEN_SWEEP: {
    id: 'KYC_RESCREEN_SWEEP',
    name: 'KYC sanctions re-screen',
    description: 'Re-runs sanctions screening for every customer/vendor whose lastScreenedAt > rescreenIntervalDays ago. Routes high-risk hits to human review.',
    cron: '0 3 * * *',
    handlerKey: 'kyc:rescreen',
    standards: ['FATF R.10 R.12 R.24', 'EU AMLD5', 'EU CFSP'],
    featureGate: 'compliance_aml',
    idempotencyKey: 'subject-and-day',
    timeoutSeconds: 300,
  },

  // ─── GDPR: PII retention purge ─────────────────────────────────────
  GDPR_RETENTION_PURGE: {
    id: 'GDPR_RETENTION_PURGE',
    name: 'GDPR PII retention purge',
    description: 'Walks recruiting-pipeline + leads + activities where piiRetentionUntil < now; tombstones PII (keeps anonymised audit trail). Per GDPR Art.5(1)(e) storage limitation.',
    cron: '0 4 * * 0', // Sunday 04:00 UTC weekly
    handlerKey: 'gdpr:retention-purge',
    standards: ['GDPR Art.5(1)(e) storage-limitation', 'GDPR Art.17 right-to-erasure'],
    featureGate: 'compliance_gdpr_dsr',
    idempotencyKey: 'fixed-window',
    timeoutSeconds: 600,
  },

  // ─── R2R: scheduled financial reports ──────────────────────────────
  SCHEDULED_REPORTS_DISPATCH: {
    id: 'SCHEDULED_REPORTS_DISPATCH',
    name: 'Scheduled reports dispatch',
    description: 'Walks scheduled-report definitions whose nextRunDate ≤ now; renders DTO via reports.ts → PDF/A via Cloudflare Browser → R2 → email via notification fan-out.',
    cron: '0 6 * * *',
    handlerKey: 'reporting:scheduled-dispatch',
    standards: ['ISO 19005-1/2/3 PDF/A', 'rfc-5322'],
    featureGate: undefined,
    idempotencyKey: 'definition-and-period',
    timeoutSeconds: 600,
  },

  // ─── Workflow: SLA escalation ──────────────────────────────────────
  WORKFLOW_SLA_ESCALATE: {
    id: 'WORKFLOW_SLA_ESCALATE',
    name: 'Workflow SLA escalation',
    description: 'Walks workflow-instances where currentStepDueAt < now; applies the step\'s onTimeoutBehavior (escalate / auto-approve / auto-reject / notify).',
    cron: '*/30 * * * *',
    handlerKey: 'workflow:sla-escalate',
    standards: ['ISO/IEC 19510:2013 BPMN-2.0', 'SOX §404 multi-step-approval'],
    featureGate: 'workflow_engine',
    idempotencyKey: 'fixed-window',
    timeoutSeconds: 60,
  },

  // ─── AR: dunning cycle sweep ───────────────────────────────────────
  DUNNING_CYCLE_SWEEP: {
    id: 'DUNNING_CYCLE_SWEEP',
    name: 'Dunning cycle sweep',
    description: 'Walks invoices past due; advances each through the dunning ladder (reminder → notice → demand → write-off threshold). Per IFRS-9 / ASC-326 CECL.',
    cron: '0 5 * * *',
    handlerKey: 'dunning:sweep',
    standards: ['IFRS-9 ECL', 'ASC-326 CECL'],
    featureGate: undefined,
    idempotencyKey: 'invoice-and-day',
    timeoutSeconds: 300,
  },

  // ─── IFRS-16: lease period posting auto-fire ───────────────────────
  LEASE_PERIOD_POSTING_AUTO: {
    id: 'LEASE_PERIOD_POSTING_AUTO',
    name: 'Lease period posting auto-fire',
    description: 'Walks active leases whose next period crosses month-end; creates lease-period-postings (interest accretion + ROU amortisation) per IFRS-16.',
    cron: '0 7 1 * *', // 1st of month 07:00 UTC
    handlerKey: 'leases:period-posting',
    standards: ['IFRS-16 §22 commencement', 'ASC-842'],
    featureGate: 'leasing',
    idempotencyKey: 'lease-and-period',
    timeoutSeconds: 300,
  },

  // ─── PP&E: depreciation auto-post ──────────────────────────────────
  DEPRECIATION_AUTO_POST: {
    id: 'DEPRECIATION_AUTO_POST',
    name: 'Depreciation auto-post',
    description: 'Walks active fixed-assets at month-end; computes depreciation schedule entry per chosen method (straight-line / declining-balance / units-of-prod).',
    cron: '0 7 1 * *',
    handlerKey: 'depreciation:auto-post',
    standards: ['IAS-16', 'ASC-360'],
    featureGate: undefined,
    idempotencyKey: 'asset-and-period',
    timeoutSeconds: 300,
  },
} as const

export const SCHEDULED_TASK_IDS = Object.keys(SCHEDULED_TASKS) as ReadonlyArray<keyof typeof SCHEDULED_TASKS>

export function tasksForFeature(feature: string | undefined): ReadonlyArray<typeof SCHEDULED_TASKS[keyof typeof SCHEDULED_TASKS]> {
  return Object.values(SCHEDULED_TASKS).filter((t) => t.featureGate === feature)
}
