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

export interface InverseClosure {
  readonly order: number
  readonly covers: readonly number[]
  readonly gaps: readonly number[]
  readonly voidCloses: boolean
}

export interface CarryRay {
  readonly step: number
  readonly doubled: number
  readonly digits: readonly number[]
  readonly rays: readonly Ray[]
  readonly lands: number
  readonly straddles: boolean
}

export interface Loop2D {
  readonly x: number
  readonly y: number
}

export interface BreathStep {
  readonly step: number
  readonly slope: 'up' | 'down'
}

export interface CornerLimit {
  readonly corner: number
  readonly limit: number
  readonly taper: number
}

export interface Singularity {
  readonly step: number
  readonly weight: number
}

export interface HoroState {
  readonly step: HoroStep
  readonly octave: number
}
