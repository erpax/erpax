import { exactMax, exactRound } from '@/algebra'
/**
 * timeout — the reasonable timeout is COMPUTED, never guessed.
 *
 * The ladder is 1 · 2 · 3 · 5 minutes MAX (user law). A command earns its rung
 * from MEASURED samples: safety ×2 over the worst observed run, rounded UP to the
 * next rung. No samples ⇒ rung 3 (the standing 3-minute cap). Needing past rung 5
 * ⇒ the COMMAND is the defect, not the ladder — split it; the verdict says so.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

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
  const worst = samplesMs.reduce((a, b) => exactMax(a, b), 0)
  const need = worst > 0 ? worst * safety : DEFAULT_NEED_MS
  for (const minutes of TIMEOUT_LADDER_MINUTES) {
    const ms = minutes * 60_000
    if (need <= ms) return { ms, minutes, exceeds: false }
  }
  return { ms: TIMEOUT_CEILING_MS, minutes: 5, exceeds: true }
}

/**
 * Persisted samples — each lane earns its rung from its own history.
 *
 * A ring of ≤SAMPLE_RING per label in a gitignored cache (measurements are facts, but a cache
 * of history: losing it only means back to defaults). A sample past the sleep fence is a
 * wall-clock artifact — a laptop sleeping mid-run once produced an 11,471,605 ms "lane time" —
 * and is never recorded.
 */
export const SAMPLE_RING = 20
export const SLEEP_FENCE_MS = 3_600_000
const cachePath = (cwd: string): string => join(cwd, 'node_modules', '.cache', 'erpax', 'timings.json')

type TimingCache = Record<string, number[]>

const readCache = (cwd: string): TimingCache => {
  try {
    const parsed: unknown = JSON.parse(readFileSync(cachePath(cwd), 'utf8'))
    if (typeof parsed !== 'object' || parsed === null) return {}
    const out: TimingCache = {}
    for (const [k, v] of Object.entries(parsed)) {
      if (Array.isArray(v)) out[k] = v.filter((n): n is number => typeof n === 'number' && Number.isFinite(n) && n >= 0)
    }
    return out
  } catch {
    return {}
  }
}

/** Measured history for a label (empty when none). */
export const samplesMsOf = (label: string, cwd: string = process.cwd()): readonly number[] =>
  readCache(cwd)[label] ?? []

/** Record one successful run's wall time; sleep-fence outliers are dropped, ring capped. */
export function recordSampleMs(label: string, ms: number, cwd: string = process.cwd()): void {
  if (!Number.isFinite(ms) || ms < 0 || ms > SLEEP_FENCE_MS) return
  try {
    const cache = readCache(cwd)
    cache[label] = [...(cache[label] ?? []), exactRound(ms)].slice(-SAMPLE_RING)
    mkdirSync(dirname(cachePath(cwd)), { recursive: true })
    writeFileSync(cachePath(cwd), JSON.stringify(cache))
  } catch {
    /* a lost sample only means the default rung next time */
  }
}

/** The computed bound for a label — its own history through the ladder. */
export const timeoutForLabel = (label: string, cwd: string = process.cwd()): TimeoutVerdict =>
  timeoutOf(samplesMsOf(label, cwd))
