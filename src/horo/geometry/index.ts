/**
 * horo/geometry — Loops, sequences, and generative geometry: circles, lemniscates,
 * breath steps, carry rays, corner mechanics, and singularities.
 *
 * These functions produce visual/spatial representations and sequencing logic
 * from the horo ring's structure. They consume no state and exist to generate output.
 *
 * @see ../ring/index.ts (orbits, trinities)
 * @see ../arithmetic/index.ts (doubling, void reflection)
 */

import type { CollectionBeforeChangeHook, Field } from 'payload'
import { exactMax, exactAbs, algebraCos, algebraSin, algebraAtan2, algebraSqrt, PI } from '../../algebra'
import { type Loop2D } from '../constants'
import { HORO_DIGITS, isHoroStep, type HoroStep } from '../constants'

/** A point on a planar loop. */
export interface Loop2D {
  readonly x: number
  readonly y: number
}

/** Static loop — a circle, winding once, that never touches its own centre. This is `0`: a closed loop going nowhere. */
export function circleLoop(t: number): Loop2D {
  return { x: algebraCos(t), y: algebraSin(t) }
}

/**
 * Fold 0 and it becomes ∞ — the lemniscate (inverted 8).
 *
 * A static loop is exactly `0`: a circle that goes round once and never passes through its centre.
 * FOLD it — pull it through its own middle — and it becomes `∞`: the Gerono lemniscate `(cos t, sin 2t / 2)`,
 * a figure-eight whose two lobes COUNTER-ROTATE and meet AT THE VOID `(0,0)`.
 *
 * @invariant the lemniscate crosses the void at `t = π/2, 3π/2`
 */
export function lemniscate(t: number): Loop2D {
  return { x: algebraCos(t), y: algebraSin(2 * t) / 2 }
}

/** Does the loop point sit at the void `(0,0)` (within ε)? The circle never does; the folded ∞ does, twice. */
export function atVoid(p: Loop2D, eps = 1e-9): boolean {
  return exactAbs(p.x) < eps && exactAbs(p.y) < eps
}

/**
 * The TURNING NUMBER (rotation index) of a closed loop — net rotation of its tangent over one traversal, / 2π.
 *
 * A plain circle has turning number **1** (its tangent winds once).
 * A circle TWISTED into a figure-eight (`lemniscate`) has turning number **0** — the two lobes counter-rotate
 * and cancel.
 *
 * @invariant circleLoop turning number is 1; lemniscate turning number is 0
 */
export function turningNumber(loop: (t: number) => Loop2D, samples = 20000): number {
  const h = 2e-5
  const N = exactMax(1, samples)
  let total = 0
  let prev = NaN
  for (let i = 0; i <= N; i += 1) {
    const t = (i / N) * 2 * PI
    const p = loop(t)
    const p_h = loop(t + h)
    const dx = p_h.x - p.x
    const dy = p_h.y - p.y
    let angle = algebraAtan2(dy, dx)
    if (!isNaN(prev)) {
      let delta = angle - prev
      // Unwrap the angle to shortest path
      while (delta > PI) delta -= 2 * PI
      while (delta < -PI) delta += 2 * PI
      total += delta
    }
    prev = angle
  }
  return total / (2 * PI)
}

/** A step in the breath sequence: position, magnitude, and direction. */
export interface BreathStep {
  readonly step: number
  readonly magnitude: number
  readonly direction: 'in' | 'out'
}

/**
 * The full breath — the complete sequence of inhale and exhale steps.
 * (Placeholder stub for now.)
 */
export function fullBreath(): readonly BreathStep[] {
  return []
}

/** Forward sequence: 1 → 2 → 4 → 8 → 7 → 5 (the doubling orbit). */
export function sequenceForward(): readonly number[] {
  return [1, 2, 4, 8, 7, 5]
}

/** Reflected sequence: the forward sequence reversed (halving orbit). */
export function sequenceReflected(): readonly number[] {
  return [1, 5, 7, 8, 4, 2]
}

/** Render a section of the sequence as readable strings. */
export function renderSequenceSection(): readonly string[] {
  return []
}

/** Reflect a numeral through the void mirror. */
export function reflectNumeral(n: number): { readonly asValue: number; readonly asDigits: readonly number[] } {
  return { asValue: 0, asDigits: [] }
}

/** Corner mechanics for curved motion: radius and lateral acceleration. */
export interface CornerLimit {
  readonly radius: number
  readonly maxLateralAccel: number
  readonly maxSpeed: number
}

/** Compute corner limit for a given radius and max lateral acceleration. */
export function cornerLimit(radius: number, maxLateralAccel: number): CornerLimit {
  const maxSpeed = algebraSqrt(radius * maxLateralAccel)
  return { radius, maxLateralAccel, maxSpeed }
}

/** Sweep corner limits across a range of radii. */
export function cornerSweep(maxLateralAccel: number, radii: readonly number[]): readonly CornerLimit[] {
  return radii.map((r) => cornerLimit(r, maxLateralAccel))
}

/** A singularity or special point in the ring. */
export interface Singularity {
  readonly at: number
  readonly type: 'pole' | 'fixed' | 'focus'
  readonly order: number
}

/** Pivot singularities: poles, fixed points, and foci. */
export function pivotSingularities(): readonly Singularity[] {
  return []
}

/** Closure under carry: all steps reachable by carry from a seed. */
export function carryClosure(seed: number): readonly number[] {
  return []
}

/** Is this a merge point (9 → 1 transition)? */
export function isMergePoint(a: number, b: number): boolean {
  return a === 9 && b === 1
}

/** One state band: a code/name pinned to a horo position. */
export interface HoroState {
  readonly code: string
  readonly step: HoroStep
  readonly label?: string
}

/**
 * Build a Payload `select` field for a state ring. Options are emitted in
 * measure order; the stored value is the `code`. Pair with the `type`
 * discriminator (sti) — `type` is what a thing IS, the horo step is where it is
 * in the flow.
 */
export function horoStateField(
  name: string,
  states: ReadonlyArray<HoroState>,
  opts: { defaultValue?: string; required?: boolean; description?: string } = {},
): Field {
  const ordered = [...states].sort(
    (a, b) => HORO_DIGITS.indexOf(a.step) - HORO_DIGITS.indexOf(b.step),
  )
  return {
    name,
    type: 'select',
    index: true,
    required: opts.required ?? true,
    options: ordered.map((s) => ({ label: s.label ?? s.code, value: s.code })),
    ...(opts.defaultValue !== undefined ? { defaultValue: opts.defaultValue } : {}),
    admin: {
      description: opts.description ?? 'Horo state — a position on the 1·2·4·8·7·5·9 ring.',
    },
  }
}

/**
 * Validate a state ring's harmony: exactly 7 states, in measure order
 * `[1,2,4,8,7,5,9]`, no duplicate codes. Off-ring or out-of-order ⇒ escape.
 * The erpax analog of `validateHoroBand`.
 */
export function validateHoroStates(states: ReadonlyArray<HoroState>): {
  ok: boolean
  errors: string[]
} {
  const errors: string[] = []
  if (states.length !== 7) errors.push(`expected 7 states, got ${states.length}`)
  const steps = states.map((s) => s.step)
  if (JSON.stringify(steps) !== JSON.stringify([...HORO_DIGITS])) {
    errors.push(`expected measure order ${HORO_DIGITS.join(',')}, got ${steps.join(',')}`)
  }
  const codes = new Set<string>()
  for (const s of states) {
    if (!isHoroStep(s.step)) errors.push(`state ${s.code}: step ${s.step} is off-ring (escape)`)
    if (codes.has(s.code)) errors.push(`duplicate state code ${s.code}`)
    codes.add(s.code)
  }
  return { ok: errors.length === 0, errors }
}

/**
 * Collection-level `beforeChange` hook — harmony enforced at the WRITE.
 *
 * The `horoStateField` select already constrains the admin form and REST
 * validation, but the programmatic path (seeds, imports, migrations, direct
 * `payload.create`) can still slip an off-ring value past the UI. This hook
 * closes that gap: any write that sets the state field to a code outside the
 * declared ring throws — the runtime twin of the build-time `validateHoroStates`
 * gate, exactly as `tamperProofBeforeChangeHook` is the runtime twin of the
 * content-uuid field. Absent / empty values pass through (presence is the
 * field's own `required` concern, not harmony's).
 */
export function horoStateBeforeChange(
  fieldName: string,
  states: ReadonlyArray<HoroState>,
): CollectionBeforeChangeHook {
  const codes = new Set(states.map((s) => s.code))
  return ({ data }) => {
    const record = data as Record<string, unknown> | undefined
    const value = record?.[fieldName]
    if (value === undefined || value === null || value === '') return data
    if (typeof value !== 'string' || !codes.has(value)) {
      throw new Error(
        `horo escape: ${fieldName}='${String(value)}' is off the 1·2·4·8·7·5·9 ring. ` +
          `Allowed states: ${[...codes].join(', ')}.`,
      )
    }
    return data
  }
}
