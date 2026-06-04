/**
 * Scheduled-tasks — contract types.
 *
 * @standard rfc-5545 icalendar-cron
 * @audit ISO-19011:2018 §6.4.6
 */

export type IdempotencyKey =
  | 'fixed-window'        // one fire per (cron-window) — exactly once per minute slot
  | 'date-bucket'         // one fire per (date) — repeats safe within a day
  | 'template-and-period' // one fire per (template id × fiscal period)
  | 'subject-and-day'     // one fire per (subject id × date)
  | 'definition-and-period'
  | 'invoice-and-day'
  | 'lease-and-period'
  | 'asset-and-period'
  | 'never'               // run every match, no dedupe

export interface ScheduledTask {
  /** UPPER_SNAKE id, stable across history. */
  readonly id: string
  /** Human-readable label. */
  readonly name: string
  /** Single-paragraph description shown in admin + docs. */
  readonly description: string
  /** Cron expression — RFC 5545 / Cloudflare cron syntax. */
  readonly cron: string
  /** Handler registry key (resolved at runtime via `handlers/<key>.ts`). */
  readonly handlerKey: string
  /** Standards backing — cite §sections where applicable. */
  readonly standards: ReadonlyArray<string>
  /** Optional FEATURE_REGISTRY id that gates the task. */
  readonly featureGate?: string
  /** How the runner deduplicates re-fires within the cron window. */
  readonly idempotencyKey: IdempotencyKey
  /** Max execution time before the runner should abort. */
  readonly timeoutSeconds: number
}

export type ScheduledTaskRegistry = Readonly<Record<string, ScheduledTask>>

export interface ScheduledTaskRunResult {
  readonly taskId: string
  readonly succeeded: boolean
  readonly durationMs: number
  readonly error?: string
  readonly skipped?: 'feature_disabled' | 'idempotency_already_ran' | 'no_matching_tenant'
  readonly metadata?: Record<string, unknown>
}
