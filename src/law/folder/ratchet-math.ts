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
const LANDAUER_BIT = Math.log2(2)
import type { RatchetAxis } from './baseline-types'

/** Every gate axis — order stable for content-uuid seal. */
export const RATCHET_AXES: readonly RatchetAxis[] = [
  'folder-name',
  'folder-trinity',
  'alphanumeric-name',
  'stray-ts',
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
  'matrix-crack',
] as const

/** Horo ring position per axis — decade ratio scales tamper-cost headroom. */
export const AXIS_HORO: Readonly<Record<RatchetAxis, HoroStep>> = {
  'folder-name': 1,
  'folder-trinity': 2,
  'alphanumeric-name': 4,
  'stray-ts': 4,
  'multi-segment-file': 4,
  'accounting-structure': 9,
  'forbidden-intermediate': 9,
  'diamond-membership': 8,
  'import-purity': 9,
  'logic-concentration': 7,
  'word-matter': 5,
  'word-without-code': 2,
  'word-without-logic': 3,
  'word-incomplete-diamond': 1,
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
  return Math.ceil(violations / scale)
}

/** DOWN-only ratchet — committed ceiling never rises above prior math. */
export function ratchetDown(
  axis: RatchetAxis,
  prior: number | undefined,
  liveViolations: number,
): number {
  const math = mathCeiling(axis, liveViolations)
  if (!Number.isFinite(math)) return Number.NaN
  if (prior === undefined) return math
  return Math.min(prior, math)
}
