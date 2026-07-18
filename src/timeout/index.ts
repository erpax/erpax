/**
 * timeout — the reasonable timeout is COMPUTED, never guessed.
 *
 * The ladder is 1 · 2 · 3 · 5 minutes MAX (user law). A command earns its rung
 * from MEASURED samples: safety ×2 over the worst observed run, rounded UP to the
 * next rung. No samples ⇒ rung 3 (the standing 3-minute cap). Needing past rung 5
 * ⇒ the COMMAND is the defect, not the ladder — split it; the verdict says so.
 */
export const TIMEOUT_LADDER_MINUTES = [1, 2, 3, 5] as const
export type TimeoutRung = (typeof TIMEOUT_LADDER_MINUTES)[number]
export const TIMEOUT_CEILING_MS = 300_000
const DEFAULT_NEED_MS = 180_000

export interface TimeoutVerdict {
  readonly ms: number
  readonly minutes: TimeoutRung
  /** true when safety × worst-observed does not fit even the 5-minute ceiling — split the command. */
  readonly exceeds: boolean
}

/** Pick the smallest ladder rung that fits safety × the worst measured run. */
export function timeoutOf(samplesMs: readonly number[] = [], safety = 2): TimeoutVerdict {
  const worst = samplesMs.reduce((a, b) => Math.max(a, b), 0)
  const need = worst > 0 ? worst * safety : DEFAULT_NEED_MS
  for (const minutes of TIMEOUT_LADDER_MINUTES) {
    const ms = minutes * 60_000
    if (need <= ms) return { ms, minutes, exceeds: false }
  }
  return { ms: TIMEOUT_CEILING_MS, minutes: 5, exceeds: true }
}
