import { algebraLog2, exactCeil, exactMin } from '@/algebra'
/**
 * ratchet-math — Landauer × horo ceiling from live violation counts.
 *
 * baseline(axis) = ceil(violations / (LANDAUER_BIT × horoRatio(digit, 10)))
 * Gate committed ceilings ratchet DOWN only via pnpm rules:ratchet emit.
 *
 * @see ./baseline — ./ratchet-compute — coordinate b2f75a6f (bypass-math)
 */
import { horoRatio, type HoroStep } from '@/horo'

/** Landauer floor — inlined to avoid readme ↔ accounting init cycle at emit. */
const LANDAUER_BIT = algebraLog2(2)
import type { RatchetAxis } from '../baseline-types'

/** Every gate axis — order stable for content-uuid seal. */
export const RATCHET_AXES: readonly RatchetAxis[] = [
  'folder-name',
  'folder-trinity',
  'alphanumeric-name',
  'stray-ts',
  'ts-only',
  'multi-segment-file',
  'accounting-structure',
  'forbidden-intermediate',
  'diamond-membership',
  'import-purity',
  'logic-concentration',
  'word-matter',
  'word-without-code',
  'word-without-logic',
  'word-incomplete-diamond',
  'phrase-without-diamond',
  'index-cross',
  'linear-logic',
  'linear-gap',
  'hand-maintained',
  'matrix-crack',
] as const

/** Horo ring position per axis — decade ratio scales tamper-cost headroom. */
export const AXIS_HORO: Readonly<Record<RatchetAxis, HoroStep>> = {
  'folder-name': 1,
  'folder-trinity': 2,
  'alphanumeric-name': 4,
  'stray-ts': 4,
  'ts-only': 4,
  'multi-segment-file': 4,
  'accounting-structure': 9,
  'forbidden-intermediate': 9,
  'diamond-membership': 8,
  'import-purity': 9,
  'logic-concentration': 7,
  'word-matter': 5,
  'word-without-code': 2,
  'word-without-logic': 2,
  'word-incomplete-diamond': 1,
  'phrase-without-diamond': 1,
  'index-cross': 2,
  'linear-logic': 4,
  'linear-gap': 4,
  'hand-maintained': 1,
  'matrix-crack': 8,
}

/** Bypass-math coordinate — hand ratchet input is seal impurity (b576a290 sibling). */
export const BYPASS_MATH_COORDINATE = 'b2f75a6f' as const

/**
 * Math ceiling from live violations — Landauer bit × horo decade ratio.
 * ceil(V / (LANDAUER_BIT × horoRatio(d, 10))) — headroom ≥ V at unity horo.
 */
export function mathCeiling(axis: RatchetAxis, violations: number): number {
  if (!Number.isFinite(violations) || violations < 0) return Number.NaN
  if (violations === 0) return 0
  const digit = AXIS_HORO[axis]
  const scale = LANDAUER_BIT * horoRatio(digit, 10)
  if (scale <= 0) return violations
  return exactCeil(violations / scale)
}

/**
 * DOWN-only ratchet — the ceiling descends to what the tree IS, and never rises.
 *
 * It used to be `min(prior, mathCeiling(live))`, and `mathCeiling` adds headroom: 315 live
 * violations yield a math ceiling of 788, so `min(400, 788)` stays 400. The consequence was
 * that a ceiling could only fall when the live count collapsed far enough for its own headroom
 * to duck under the prior — which is to say, almost never. Ten axes sat frozen at historic
 * values while the tree beneath them improved, and `rules check` printed "lower this axis'
 * baseline to 315 in this commit" about a descent the emitter would not perform. A gate that
 * instructs an action its own tool refuses is prose.
 *
 * Now the realised count IS the ceiling. Zero headroom is the point: a ratchet exists to make
 * the next violation red, and headroom is a licence to add one for free.
 *
 * The math ceiling still governs the BOOTSTRAP (no prior), where there is nothing to hold and
 * a first seal should not be brittle; and it stays an upper bound here, though for every axis
 * the scale is <= 1 so `math >= live` and the live count is what binds.
 *
 * SAFETY — why this is still safe to run unattended: the operation is monotone. A ceiling can
 * never rise, whatever the live count does, so a worse tree cannot buy headroom. The hazard is
 * the mirror: a scan that under-counts seals a ceiling too tight, and DOWN-only makes that
 * permanent. That is a false RED, the safe direction, but it is real — which is why the
 * emitter refuses to seal from a tree that is missing tracked files (./compute).
 */
export function ratchetDown(
  axis: RatchetAxis,
  prior: number | undefined,
  liveViolations: number,
): number {
  const math = mathCeiling(axis, liveViolations)
  if (!Number.isFinite(math)) return Number.NaN
  if (prior === undefined) return math
  return exactMin(prior, exactMin(math, liveViolations))
}
