/**
 * horo/constants — The seven-position ring definition: digits, measures, types, and pivots.
 *
 * All constants and type definitions for the horo ring. This module is the source of truth
 * for ring structure; all other horo children import from here.
 *
 * @see ../index.ts (facade barrel)
 */

// Constants: the seven horo positions in MEASURE WALK ORDER — reading it IS the dance.
export const HORO_DIGITS = [1, 2, 4, 8, 7, 5, 9] as const
export type HoroStep = (typeof HORO_DIGITS)[number]

// Measure names, index-aligned with HORO_DIGITS.
export const HORO_MEASURE = ['base', 'share', 'weave', 'crest', 'descent', 'round', 'unity'] as const

// Internal: fast membership check
export const HORO_DIGIT_SET: ReadonlySet<number> = new Set(HORO_DIGITS)

/** Membership check — is `n` a valid horo position (not an off-ring "escape")? */
export function isHoroStep(n: unknown): n is HoroStep {
  return typeof n === 'number' && HORO_DIGIT_SET.has(n)
}

/** Horo digit → measure label (null when off-ring). */
export function horoMeasureOf(digit: number | null): string | null {
  if (digit === null) return null
  const i = HORO_DIGITS.indexOf(digit as HoroStep)
  return i >= 0 ? HORO_MEASURE[i]! : null
}

/**
 * Horo digit → chapter label, where an OFF-RING digit renders as itself rather than as null.
 * That single difference from horoMeasureOf is why book/index and book/compute each carried a
 * private copy of this — the copies agreed with each other and disagreed with the canonical
 * reader, which is the shape a reader cannot see from inside either one.
 */
export function horoChapterOf(digit: number | null): string | null {
  if (digit === null) return null
  return horoMeasureOf(digit) ?? String(digit)
}

// Pivots and axis definitions
export const VOID_PIVOT = 5
export const CENTROID = 5
export const POLE = 9
export const INNER_CIRCUIT = [3, 6] as const
export const AFFINE_ORDER = 54

// Type definitions
export type Ray = 'ring' | 'axis' | 'void'

export interface FiveRoles {
  readonly centroid: number
  readonly mirrorFixed: boolean
  readonly propulsion: boolean
  readonly attractor: number
  readonly isAttractor: boolean
}

// The six interfaces that stood here were STRIPPED COPIES of types the semantic
// children already own — dropped in when 967bc70a7 split this hub, and left behind in
// both places. TypeScript excluded every one from the @/horo barrel as ambiguous
// (TS2308), so the facade offered NONE of the six.
//
// CornerLimit had also diverged: `{ corner, limit, taper }` here against
// `{ radius, curvature, maxSpeed }` in horo/geometry, which is the shape every real
// caller uses. Same name, unrelated meaning — a decoy, not a duplicate.
//
// The declarations are gone; the NAMES stay, re-exported from the child that owns
// each one. Deleting them outright would have dropped six names from this atom's
// face, and a consumer may lawfully import `@/horo/constants` — erpax ships as
// packages, so an out-of-repo caller is not hypothetical. `export type` is erased at
// compile time, so pointing back at a child that imports from here costs no runtime
// edge and makes no cycle.
export type { InverseClosure } from '../arithmetic'
export type { CarryRay } from '../ring'
export type { Loop2D, BreathStep, CornerLimit, Singularity } from '../geometry'

/** @index-cross.foldback child=horo/constants parent=horo — this cross folds back into its parent. */
