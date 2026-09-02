/**
 * ratchet-compute — recompute sealed snapshot from live scans + DOWN-only ratchet.
 *
 * Emitted artifact (ratchet.generated.ts) is OUTPUT ONLY — never gate input by hand.
 * Coordinate b576a290 · b2f75a6f.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { computeContentUuid } from '@/integrity'
import { liveViolationCounts } from '../live-counts'
import type { RatchetAxis, RatchetSnapshot } from '../baseline-types'
import { RATCHET_GENERATED } from '../ratchet.generated'
import { RATCHET_AXES, ratchetDown, mathCeiling, BYPASS_MATH_COORDINATE } from './math'

const RATCHET_TENANT = 'erpax' as const
const HAND_RATCHET_REL = join('src', 'law', 'folder', 'ratchet.json')
const HAND_EFFICIENCY_REL = join('src', 'apply', 'efficiency.json')

/** Canonical payload for content-uuid seal — sorted axis keys. */
export function ratchetSealPayload(axes: Readonly<Partial<Record<RatchetAxis, number>>>): {
  readonly axes: Readonly<Record<string, number>>
} {
  const sorted: Record<string, number> = {}
  for (const axis of RATCHET_AXES) {
    const v = axes[axis]
    if (v !== undefined && Number.isFinite(v)) sorted[axis] = v
  }
  return { axes: sorted }
}

/** Content-uuid over committed axes — tamper detects hand edits. */
export function ratchetContentUuid(axes: Readonly<Partial<Record<RatchetAxis, number>>>): string {
  return computeContentUuid(ratchetSealPayload(axes), RATCHET_TENANT)
}

/**
 * Every tracked file under `src/` that is NOT on disk.
 *
 * The ratchet now descends to the live count, so an UNDER-COUNTING scan seals a ceiling too
 * tight — and DOWN-only makes that permanent. The likeliest way to under-count is the dullest
 * one: scanning a tree where tracked files are missing (a half-applied move, an interrupted
 * checkout, a stash in flight). Git's index says what the corpus HAS; the disk says what this
 * scan could SEE. If they disagree, the scan is not a measurement of the corpus.
 *
 * It permits untracked EXTRAS — those can only ever raise a count, and the ratchet refuses to
 * rise anyway. It is the missing side that is dangerous, so it is the missing side that is
 * checked.
 */
export function missingTrackedSources(cwd: string = process.cwd()): readonly string[] {
  let listed = ''
  try {
    listed = execFileSync('git', ['ls-files', 'src'], { cwd, encoding: 'utf8', maxBuffer: 1 << 28 })
  } catch {
    return []
  }
  const out: string[] = []
  for (const rel of listed.split('\n')) {
    if (!rel) continue
    if (!existsSync(join(cwd, rel))) out.push(rel)
  }
  return out
}

export type RecomputeRatchetOpts = {
  /** When true, set each axis to mathCeiling(live) — bootstrap from live math. */
  readonly bootstrap?: boolean
  /** Precomputed live counts — avoids double-scan drift in regression tests. */
  readonly live?: Readonly<Record<RatchetAxis, number>>
}

/** Recompute committed ceilings from live scans + DOWN-only ratchet vs prior emit. */
export function recomputeRatchetSnapshot(
  cwd: string = process.cwd(),
  prior: Readonly<Partial<Record<RatchetAxis, number>>> = RATCHET_GENERATED.axes,
  opts?: RecomputeRatchetOpts,
): RatchetSnapshot {
  const live = opts?.live ?? liveViolationCounts(cwd)
  const axes: Partial<Record<RatchetAxis, number>> = {}
  for (const axis of RATCHET_AXES) {
    axes[axis] = opts?.bootstrap
      ? mathCeiling(axis, live[axis])
      : ratchetDown(axis, prior[axis], live[axis])
  }
  const contentUuid = ratchetContentUuid(axes)
  return {
    contentUuid,
    sealedAt: new Date().toISOString().slice(0, 10),
    axes,
  }
}

export interface BypassMathViolation {
  readonly law: 'bypass-math'
  readonly coordinate: typeof BYPASS_MATH_COORDINATE
  readonly axis: RatchetAxis | 'artifact'
  readonly reason: string
}

/** Hand ratchet.json · uuid drift · ceiling above math or below live. */
export function bypassMathViolations(cwd: string = process.cwd()): readonly BypassMathViolation[] {
  const out: BypassMathViolation[] = []
  if (existsSync(join(cwd, HAND_RATCHET_REL))) {
    out.push({
      law: 'bypass-math',
      coordinate: BYPASS_MATH_COORDINATE,
      axis: 'artifact',
      reason: 'hand-maintained ratchet.json — delete and run pnpm rules:ratchet',
    })
  }
  if (existsSync(join(cwd, HAND_EFFICIENCY_REL))) {
    out.push({
      law: 'bypass-math',
      coordinate: BYPASS_MATH_COORDINATE,
      axis: 'artifact',
      reason: 'hand-maintained efficiency.json — delete and run pnpm apply:efficiency-emit',
    })
  }

  const live = liveViolationCounts(cwd)
  const committed = RATCHET_GENERATED.axes
  const expectedUuid = ratchetContentUuid(committed)

  if (RATCHET_GENERATED.contentUuid !== expectedUuid) {
    out.push({
      law: 'bypass-math',
      coordinate: BYPASS_MATH_COORDINATE,
      axis: 'artifact',
      reason: `ratchet.generated contentUuid drift — re-run pnpm rules:ratchet (expected ${expectedUuid})`,
    })
  }

  for (const axis of RATCHET_AXES) {
    const c = committed[axis]
    const v = live[axis]
    const math = mathCeiling(axis, v)
    if (c === undefined || !Number.isFinite(c)) {
      out.push({
        law: 'bypass-math',
        coordinate: BYPASS_MATH_COORDINATE,
        axis,
        reason: `missing committed ceiling for axis "${axis}"`,
      })
      continue
    }
    if (c < v) {
      out.push({
        law: 'bypass-math',
        coordinate: BYPASS_MATH_COORDINATE,
        axis,
        reason: `committed ${c} < live ${v} — hand edit or stale emit`,
      })
    }
    if (c > math) {
      out.push({
        law: 'bypass-math',
        coordinate: BYPASS_MATH_COORDINATE,
        axis,
        reason: `committed ${c} > math ceiling ${math} — bypasses Landauer×horo (live ${v})`,
      })
    }
  }

  return out
}

/** One-time migration prior from hand ratchet.json if still present. */
export function priorAxesForEmit(cwd: string = process.cwd()): Readonly<Partial<Record<RatchetAxis, number>>> {
  const hand = join(cwd, HAND_RATCHET_REL)
  if (existsSync(hand)) {
    const parsed = JSON.parse(readFileSync(hand, 'utf8')) as RatchetSnapshot
    return parsed.axes
  }
  return RATCHET_GENERATED.axes
}
