/**
 * Scheduled tasks — barrel.
 *
 * Slice QQQQ: declarative time-driven action registry. The `BUSINESS_CHAINS`
 * pattern (KKKK) for the time axis.
 *
 * @audit ISO-19011:2018 §6.4.6 audit-evidence-scheduled-actions
 */

export type {
  ScheduledTask,
  ScheduledTaskRegistry,
  ScheduledTaskRunResult,
  IdempotencyKey,
} from './types'
export { SCHEDULED_TASKS, SCHEDULED_TASK_IDS, tasksForFeature } from './registry'
export {
  runDueScheduledTasks,
  registerScheduledTaskHandler,
  getScheduledTaskHandler,
  cronMatchesMinute,
  type ScheduledTaskHandler,
} from './runner'
