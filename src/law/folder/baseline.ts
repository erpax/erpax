/**
 * baseline — guardian ceilings from computed math + emitted snapshot.
 *
 * Source of truth: mathCeiling(axis, liveViolations) with DOWN-only ratchet in
 * ratchet.generated.ts (pnpm rules:ratchet). Hand ratchet.json is bypass-math.
 *
 * @see ./ratchet.generated.ts — ./ratchet-compute — ../../seal/baseline-debt
 */
import type { RatchetAxis, RatchetSnapshot } from './baseline-types'
import { RATCHET_GENERATED } from './ratchet.generated'

export type { RatchetAxis, RatchetSnapshot } from './baseline-types'
export { BASELINE_CONST_TO_AXIS } from './baseline-types'

/** Committed ceiling for one axis — from emitted snapshot (not hand ALCAPS). */
export function computedBaseline(axis: RatchetAxis, _cwd: string = process.cwd()): number {
  const value = RATCHET_GENERATED.axes[axis]
  if (value === undefined || !Number.isFinite(value)) {
    throw new Error(`ratchet: missing or non-finite baseline for axis "${axis}"`)
  }
  return value
}

/** Load emitted ratchet artifact — output of pnpm rules:ratchet. */
export function loadRatchet(_cwd: string = process.cwd()): RatchetSnapshot {
  return {
    contentUuid: RATCHET_GENERATED.contentUuid,
    sealedAt: RATCHET_GENERATED.sealedAt,
    axes: RATCHET_GENERATED.axes,
  }
}

/** Reset ratchet cache (tests — no-op for generated const). */
export function clearRatchetCache(): void {
  /* generated const — nothing to clear */
}
