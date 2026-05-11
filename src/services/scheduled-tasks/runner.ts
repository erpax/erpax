/**
 * Scheduled-tasks runner — Slice QQQQ.
 *
 * Cron handler entry point. Walks `SCHEDULED_TASKS`; for each task whose
 * cron matches the current minute AND whose `idempotencyKey` allows
 * re-fire, invokes the registered handler. Handlers are pure async fns
 * registered via `registerScheduledTaskHandler(key, fn)`; missing
 * handlers cause the runner to log + skip (never throw).
 *
 * Wire-up:
 *   - Cloudflare cron triggers fire every minute
 *   - The Worker entrypoint calls `runDueScheduledTasks(payload)` which
 *     filters SCHEDULED_TASKS by cron-match and dispatches.
 *
 * @audit ISO-19011:2018 §6.4.6 audit-evidence-scheduled-actions
 * @compliance SOX §404 internal-controls automated-controls
 */

import type { Payload } from 'payload'
import { SCHEDULED_TASKS } from './registry'
import type { ScheduledTask, ScheduledTaskRunResult } from './types'

/** Per-task handler signature. */
export type ScheduledTaskHandler = (
  payload: Payload,
  task: ScheduledTask,
  now: Date,
) => Promise<{ ok: boolean; metadata?: Record<string, unknown>; error?: string }>

const HANDLERS = new Map<string, ScheduledTaskHandler>()

export function registerScheduledTaskHandler(key: string, handler: ScheduledTaskHandler): void {
  HANDLERS.set(key, handler)
}

export function getScheduledTaskHandler(key: string): ScheduledTaskHandler | null {
  return HANDLERS.get(key) ?? null
}

/**
 * Match a 5-field cron expression against a `Date` (minute precision).
 * Supports `*`, `*/N`, comma lists, and ranges. Designed for the
 * Cloudflare cron syntax — does NOT support seconds (CF cron is minute
 * granularity).
 */
export function cronMatchesMinute(cron: string, now: Date): boolean {
  const fields = cron.trim().split(/\s+/)
  if (fields.length !== 5) return false
  const [minF, hourF, domF, monF, dowF] = fields
  return (
    matchField(minF,  now.getUTCMinutes(),    0, 59) &&
    matchField(hourF, now.getUTCHours(),      0, 23) &&
    matchField(domF,  now.getUTCDate(),       1, 31) &&
    matchField(monF,  now.getUTCMonth() + 1,  1, 12) &&
    matchField(dowF,  now.getUTCDay(),        0, 6)
  )
}

function matchField(expr: string, value: number, lo: number, hi: number): boolean {
  if (expr === '*') return true
  for (const part of expr.split(',')) {
    const [base, stepStr] = part.split('/')
    const step = stepStr ? parseInt(stepStr, 10) : 1
    let from = lo, to = hi
    if (base !== '*') {
      const range = base.split('-')
      if (range.length === 1) { from = to = parseInt(range[0], 10) }
      else { from = parseInt(range[0], 10); to = parseInt(range[1], 10) }
    }
    if (value >= from && value <= to && (value - from) % step === 0) return true
  }
  return false
}

/**
 * Walk SCHEDULED_TASKS; for each task whose cron matches `now`, invoke
 * the registered handler. Returns per-task results.
 */
export async function runDueScheduledTasks(
  payload: Payload,
  now: Date = new Date(),
): Promise<ReadonlyArray<ScheduledTaskRunResult>> {
  const results: ScheduledTaskRunResult[] = []
  for (const task of Object.values(SCHEDULED_TASKS)) {
    if (!cronMatchesMinute(task.cron, now)) continue
    const handler = HANDLERS.get(task.handlerKey)
    if (!handler) {
      results.push({ taskId: task.id, succeeded: false, durationMs: 0, error: `no_handler_registered:${task.handlerKey}` })
      continue
    }
    const start = Date.now()
    try {
      const r = await Promise.race([
        handler(payload, task, now),
        new Promise<{ ok: boolean; error: string }>((_, rej) =>
          setTimeout(() => rej(new Error(`task_timeout:${task.timeoutSeconds}s`)), task.timeoutSeconds * 1000)
        ),
      ])
      results.push({
        taskId: task.id,
        succeeded: r.ok,
        durationMs: Date.now() - start,
        error: r.ok ? undefined : (r as { error?: string }).error,
        metadata: (r as { metadata?: Record<string, unknown> }).metadata,
      })
    } catch (err) {
      results.push({
        taskId: task.id,
        succeeded: false,
        durationMs: Date.now() - start,
        error: err instanceof Error ? err.message : 'unknown',
      })
    }
  }
  return results
}
