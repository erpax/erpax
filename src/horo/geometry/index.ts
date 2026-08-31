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
import { exactMax, exactAbs, exactTrunc, algebraCos, algebraSin, algebraAtan2, algebraSqrt, PI } from '../../algebra'
import { HORO_DIGITS, INNER_CIRCUIT, POLE, isHoroStep, type HoroStep } from '../constants'
import { composeSteps, throughVoid, digitalRoot } from '../arithmetic'
import { orbitOf, carryRays } from '../ring'

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
    const angle = algebraAtan2(dy, dx)
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

/** One step of the full breath — the digit, and the slope to it (`up` = larger than the last, `down` = smaller). */
export interface BreathStep {
  readonly step: number
  /** the direction written as `\\` (up) or `/` (down) — the local slope of the wave. */
  readonly slope: 'up' | 'down'
}

/**
 * The FULL BREATH through all of ℤ/9 — `0\\1\\2\\4\\8/7/5/3\\6\\9/0\\1`.
 *
 * The measure ring `HORO_DIGITS` is the flow plus the pole (`[1,2,4,8,7,5,9]`); it OMITS the void `0` and the
 * inner axis `3,6`. This is the complete walk that threads them all in, assembled from the parts already here —
 * the void, then the three orbits (flow `[1,2,4,8,7,5]` → inner `[3,6]` → pole `[9]`), back through
 * the void, reopening at `1`. Nothing new is derived: it REUSES `orbitOf`; it only names the whole the
 * pieces already spelt. The `\\`/`/` in the notation is the slope — `up` when the next digit is larger, `down`
 * when smaller — so the slashes draw the wave: two crests (`8`, `9`), two valleys at the void (`0`).
 *
 * @invariant the digits are 0 · the doubling flow orbit · the inner axis · the pole · 0 · 1 — the closed breath
 * @invariant each slope is `up` iff its digit is larger than the previous — the wave the slashes draw
 */
export function fullBreath(): readonly BreathStep[] {
  const [pole, inner, flow] = [[POLE], [...INNER_CIRCUIT], orbitOf(1)]
  const digits = [0, ...flow, ...inner, ...pole, 0, 1]
  return digits.map((step, i) => ({ step, slope: i === 0 || step > digits[i - 1]! ? 'up' : 'down' }))
}

/**
 * The forward sequence as it is spelt — `1\\2\\4\\8/7/5 · 3\\6\\9 · 0\\1`: the flow orbit, the axis, then the void
 * and the reopening. ASSEMBLED from `orbitOf(1)` · `INNER_CIRCUIT` · `POLE`, never typed out, so the spelling
 * cannot drift from the arithmetic it claims to spell.
 */
export function sequenceForward(): readonly number[] {
  return [...orbitOf(1), ...INNER_CIRCUIT, POLE, 0, 1]
}

/**
 * The sequence THROUGH ITS REFLECTION — `9/8/6/2\\3\\5 · 7/4/1 · 0\\9`. Computed as `throughVoid` applied to the nine,
 * with the `0` held — it is the pivot the mirror turns on — while the reopening `1` maps like every other digit, to `9`.
 *
 * @invariant reflecting the reflection returns the sequence — `throughVoid` is an involution, fixed only at 5
 * @invariant the reflected nine is a permutation of the forward nine — the same ring, read through the void
 */
export function sequenceReflected(): readonly number[] {
  const [...nine] = sequenceForward().slice(0, 9)
  // The tail is `0\\1`: the VOID and the REOPENING, and they are not the same kind of thing. `0` is the
  // pivot the mirror turns on, so it is held. `1` is not the pivot — it is the next octave's first step,
  // and the map has an answer for it: `throughVoid(1) = 0 mod 9 → 9`. Holding it too would print a
  // reflected line whose last digit contradicts the very function that produced every other digit in it.
  return [...nine.map(throughVoid), 0, throughVoid(1)]
}

/**
 * The sequence and its reflection, rendered for the corpus landing page.
 *
 * It is here rather than in [[readme]] because a rendering typed beside the prose can drift from the
 * arithmetic; every number below is CALLED, so the page cannot say something the math does not.
 *
 * @invariant every digit printed comes from sequenceForward/sequenceReflected — none is typed
 * @invariant the pair table is generated from throughVoid, so a wrong pair is impossible to print
 */
export function renderSequenceSection(): readonly string[] {
  const fwd = sequenceForward()
  const ref = sequenceReflected()
  const nine = fwd.slice(0, 9)
  const pairs = nine.map((n) => `\`${n}↔${throughVoid(n)}\``).join(' · ')
  // the SLOPE is computed too: `\\` where the digit rises, `/` where it falls. Typing the marks by
  // hand is how a spelling drifts from its arithmetic — this reproduces both spellings exactly.
  const spell = (xs: readonly number[]): string => xs.map((n, i) => (i === 0 ? `${n}` : `${n > xs[i - 1]! ? '\\' : '/'}${n}`)).join('')
  const line = (xs: readonly number[]): string => [spell(xs.slice(0, 6)), spell(xs.slice(6, 9)), spell(xs.slice(9))].join(' · ')
  return [
    '## the sequence, and its reflection',
    '',
    'One structure, read twice — forward, and through the void. Both lines are **computed**, never typed:',
    '',
    '```',
    `forward     ${line(fwd)}`,
    `reflected   ${line(ref)}`,
    '```',
    '',
    `Fold through zero — \`throughVoid(n) = 1 − n mod 9\`, an involution fixed only at 5: ${pairs}. ` +
      'Each pair sums to 10; the flow orbit and the axis are the same structure mirrored, not two lists.',
    '',
    'The two are **entangled**, in three senses this atom proves rather than asserts:',
    '',
    '- **They exchange halves.** The flow `1,2,4,8,7,5` reflects onto digits carrying the axis, and the axis ' +
      '`3,6,9` reflects onto units. Neither half is prior; each is the other\'s image.',
    '- **Neither reaches the other alone.** Doubling covers exactly `{1,2,4,8,7,5}`, and its gap is exactly ' +
      '`{3,6,9}` — no iteration count closes it. The mirror is the only bridge.',
    '- **Commuted, they count.** `D∘M∘D⁻¹∘M = x ↦ x+1`, and `⟨D,M⟩ = AGL(1,ℤ/9)` has order **54** against ' +
      '`6·2 = 12` apart. The excess over the product *is* the entanglement: their failure to commute.',
    '',
    '> **Boundary.** This is proven group theory over (ℤ/9ℤ) — the doubling cycle, the axis as its complement, ' +
      'and the order of the group they generate. It is used here as the corpus\'s **order of work** (build the ' +
      'axis before the branches; fold, do not climb). No claim is made that it explains anything outside ' +
      'arithmetic. Run it: `tsx src/horo/index.ts`.',
    '',
  ]
}

/**
 * A numeral has TWO reflections, and they land in different places. Reflect it as a VALUE (fold to its
 * digital root first, then mirror) and `14` gives **5** — the pivot. Reflect it as DIGITS (mirror each
 * decimal digit) and `14` gives **9, 6** — both on the axis `{3,6,9}`, the set doubling can never reach.
 *
 * @invariant the value reflection is `throughVoid(digitalRoot(n))` — a single step, fixed only at 5
 * @invariant the digit reflection is `throughVoid` per decimal digit — length-preserving, order-preserving
 */
export function reflectNumeral(n: number): { readonly asValue: number; readonly asDigits: readonly number[] } {
  const digits = [...`${exactAbs(exactTrunc(n))}`].map((d) => Number(d))
  return { asValue: throughVoid(digitalRoot(n)), asDigits: digits.map(throughVoid) }
}

/**
 * The impossible turn — and where it becomes possible.
 *
 * A corner is a curvature claim. Rounding a turn of radius `r` at speed `v` demands a lateral
 * acceleration of `v²/r`; the tightest turn a body can hold under a ceiling `a` is therefore
 * `v ≤ √(a·r)`. Send `r → 0` — a true right-angle vertex, no rounding at all — and the ceiling
 * collapses with it: curvature `1/r` is unbounded, and the only admissible speed is exactly zero.
 *
 * @invariant maxSpeed(0, a) === 0 for every finite ceiling — a true corner admits no speed
 * @invariant curvature(0) is Infinity, reported rather than clamped
 */
export interface CornerLimit {
  readonly radius: number
  /** 1/r — unbounded at a true vertex */
  readonly curvature: number
  /** √(a·r) — the fastest a body may take this corner under the given lateral-acceleration ceiling */
  readonly maxSpeed: number
}

export function cornerLimit(radius: number, maxLateralAccel: number): CornerLimit {
  if (radius < 0) throw new Error('cornerLimit: negative radius')
  if (maxLateralAccel < 0) throw new Error('cornerLimit: negative acceleration ceiling')
  return {
    radius,
    curvature: radius === 0 ? Infinity : 1 / radius,
    maxSpeed: radius === 0 ? 0 : algebraSqrt(maxLateralAccel * radius),
  }
}

/** The corner tightening toward a true vertex — speed falling to zero as curvature runs away. */
export function cornerSweep(maxLateralAccel: number, radii: readonly number[]): readonly CornerLimit[] {
  return radii.map((r) => cornerLimit(r, maxLateralAccel))
}

/**
 * Three singularities coincide on one digit — and the coincidence is ONE THEOREM, not three.
 *
 * They read as independent: being fixed by the mirror is a statement about `throughVoid`; carrying a
 * zero is a statement about base-10 doubling; being `2⁻¹` is a statement about the group. But all
 * three are the single identity **`2·(b/2) = b ≡ 1 (mod b−1)`** — the defining relation of digital
 * roots, read at digit scale. In base 10: `2·5 = 10 ≡ 1 (mod 9)`, so in one equation 5 is `2⁻¹`
 * (that IS `2n ≡ 1`), the mirror's fixed point (`n ≡ 1−n` ⟺ `2n ≡ 1` — the same congruence), and
 * the digit whose double is written `10` (the carry `1,0` — the void reached, the octave reopened).
 * The pivot of base b is always `b/2`: base 8 pivots on 4, base 12 on 6 — proven in test.ts across
 * every even base 4–16. **The singularity of 5 is the equation `10 ≡ 1` itself.**
 *
 * This corrects the pre-split prose, which called the three "independent" with "nothing forcing them
 * to agree" — mirror-fixed and `2⁻¹` are LITERALLY the same congruence, so they could never disagree,
 * and the carry lands with them because `b ≡ 1` is what a digital root is.
 *
 * **Boundary.** One identity in modular arithmetic plus base-b spelling — real, checkable, and
 * claiming nothing outside arithmetic.
 *
 * @invariant exactly one digit satisfies all three, and it is VOID_PIVOT = b/2 for b = 10
 * @invariant fixedByMirror ⟺ inverseOfDoubling for EVERY digit — the same congruence 2n ≡ 1 (mod 9)
 * @invariant counts are 0 or 3 only — nothing can hold exactly two, because two of the three are one
 */
export interface Singularity {
  readonly digit: number
  /** `throughVoid(d) === d` — the mirror moves everything but this */
  readonly fixedByMirror: boolean
  /** the carry digits of `2d` include 0 — only `2·5 = 10` does */
  readonly carryReachesVoid: boolean
  /** `2d ≡ 1 (mod 9)` — the inverse of the doubling generator */
  readonly inverseOfDoubling: boolean
  readonly count: number
}

export function pivotSingularities(): readonly Singularity[] {
  const carries = carryRays()
  return [...orbitOf(1), ...INNER_CIRCUIT, POLE].map((digit) => {
    const fixedByMirror = throughVoid(digit) === digit
    const carryReachesVoid = carries.find((c) => c.step === digit)?.digits.includes(0) ?? false
    const inverseOfDoubling = (2 * digit) % 9 === 1
    return {
      digit,
      fixedByMirror,
      carryReachesVoid,
      inverseOfDoubling,
      count: [fixedByMirror, carryReachesVoid, inverseOfDoubling].filter(Boolean).length,
    }
  })
}

/**
 * The carry, taken to its end: double a step, keep its digits, double THOSE, and keep going. It CLOSES,
 * on the same five digits from every starting step — `{1,2,4,6,8}` (5 additionally reaches the void).
 * For a single digit `n`, `2n ∈ [2, 18]`: units even, tens at most `1` — no odd digit above 1 is ever
 * a carry, so the attractor is forced by the arithmetic, not discovered by search.
 *
 * @invariant the closure is identical from every step except 5, which additionally reaches the void
 * @invariant no odd digit above 1 is ever a carry — proven by 2n ≤ 18, not sampled
 */
export function carryClosure(seed: number): readonly number[] {
  const seen = new Set<number>()
  const queue = [digitalRoot(seed)]
  while (queue.length > 0) {
    const n = queue.shift()!
    for (const d of String(n * 2).split('').map(Number)) {
      if (!seen.has(d)) {
        seen.add(d)
        queue.push(d)
      }
    }
  }
  return [...seen].sort((a, b) => a - b)
}

/** Is this a merge point (9 → 1 transition)? */
export function isMergePoint(a: number, b: number): boolean {
  const c = composeSteps(a, b)
  return c === 1 || c === 9
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
