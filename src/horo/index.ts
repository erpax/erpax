/**
 * horo — the seven-position state ring, the erpax matter-twin of
 * `svilena-me/.vitepress/horo-band.js`.
 *
 * Every flow/lifecycle STATE in erpax lives on one ring: the measure-order
 * digits `[1,2,4,8,7,5,9]` (base·share·weave·crest·descent·round·unity) — the
 * multiplicative subgroup of Z/9Z minus the control triad {3,6} (the triad
 * 3·6·9·0 GOVERNS — access/hooks/auth/config — it is not a flow state). States
 * are limited to these positions, ordered, and position-decoded: the digit IS
 * the meaning. Content at a position is optional; the ring defines the slots,
 * and anything off-ring is "escape" — disharmony the validator (and the
 * generated payload-types) surface immediately.
 *
 * The group is CLOSED: two states compose to a third on the same ring
 * (`composeSteps`). 9 (unity/close) mirror-twins 10 (next ring's 1/base), so a
 * close is the next octave's open (`nextOctave`, `isMergePoint`) — the
 * accounting period close→open, the lifecycle seal→begin. Fractal inward
 * (state×state) and outward (octave ×10).
 *
 * @standard ISO-16:1975 a432-tuning-reference (the anchor; value from position)
 * @quality ISO-25010 maintainability bounded-stable-state-space
 * @see ~/github/ceccec/svilena-me/.vitepress/horo-band.js (the source twin)
 * @see ~/github/ceccec/svilena-me/.claude/skills/HORO.md
 * @see src/sti/index.ts (`type` = what a thing IS; the horo step = where in the flow)
 */

import type { Field, CollectionBeforeChangeHook } from 'payload'

/** The seven horo positions in MEASURE WALK ORDER — reading it IS the dance. */
export const HORO_DIGITS = [1, 2, 4, 8, 7, 5, 9] as const
export type HoroStep = (typeof HORO_DIGITS)[number]

/** Measure names, index-aligned with HORO_DIGITS. */
export const HORO_MEASURE = ['base', 'share', 'weave', 'crest', 'descent', 'round', 'unity'] as const

/** Horo digit → measure label (null when off-ring). */
export function horoMeasureOf(digit: number | null): string | null {
  if (digit === null) return null
  const i = HORO_DIGITS.indexOf(digit as HoroStep)
  return i >= 0 ? HORO_MEASURE[i]! : null
}

const HORO_DIGIT_SET: ReadonlySet<number> = new Set(HORO_DIGITS)

/** Membership check — is `n` a valid horo position (not an off-ring "escape")? */
export function isHoroStep(n: unknown): n is HoroStep {
  return typeof n === 'number' && HORO_DIGIT_SET.has(n)
}

/** Digital root (base-10) of an integer → 1..9 (0 only for 0): repeated digit-sum = reduction mod 9. The canonical integer digital root; the uuid form is `@/digit`. */
export function digitalRoot(n: number): number {
  let dr = Math.abs(Math.trunc(n))
  while (dr >= 10) dr = String(dr).split('').reduce((s, c) => s + Number(c), 0)
  return dr
}

/** A horo digit as a normalized ratio — e.g. `horoRatio(9)` ⇒ 9/10 (unity per decade). */
export function horoRatio(digit: HoroStep | number, divisor = 10): number {
  return Number(digit) / divisor
}

/**
 * Imperial-standard exact rational — halves, thirds, quarters, and horo decade
 * ratios. Never a decimal literal where an exact rational exists (`0.333` drifts
 * from `1/3`; `horoRatio(9)` is 9/10, not `0.9` hand-set).
 */
export function imperialRatio(numerator: number, denominator: number): number {
  return numerator / denominator
}

/**
 * Compose two states via product mod 9 (digital root). Always lands back on the
 * ring (0 → 9, the absorbing unity). Two states compose to a third — the lattice
 * contains every move.
 */
export function composeSteps(a: number, b: number): HoroStep {
  const x = Math.abs(Number(a) || 0)
  const y = Math.abs(Number(b) || 0)
  if (x === 0 || y === 0) return 9
  const dr = digitalRoot(x * y)
  return (dr === 0 ? 9 : dr) as HoroStep
}

/** 9 closes this ring; the next ring's base is 10 → digital root 1. Other steps don't transition. */
export function nextOctave(step: number): number {
  return Number(step) === 9 ? 1 : Number(step) || 0
}

/**
 * THE VOID IS A MIRROR — passing through 0 reflects: `n ↦ 1 − n (mod 9)`. 9 emerges as 1, 8 as 2, 7 as 3.
 *
 * It is NOT division by zero. `8/0` has no solution at all (no x satisfies `0·x ≡ 8`), and `9/0` is secretly
 * `0/0` — which has ALL nine solutions, not one. A quotient that is either empty or total cannot name this
 * map; subtraction can, exactly, for every element.
 *
 * Why the decimal intuition `10 − n` is right: **10 ≡ 1 (mod 9)**, so `10 − n` and `1 − n` are one map in
 * two spellings — the same congruence that makes casting out nines work.
 *
 * Real structure, not a fitted pattern: it is an INVOLUTION (through twice returns), it pairs
 * `(1,9) (2,8) (3,7) (4,6)`, and its FIXED POINT is 5 — which is exactly `2⁻¹ mod 9`. The mirror pivots on
 * the element that undoes the doubling that built the ring.
 *
 * `nextOctave` above is this map's 9→1 case; here it is for every step.
 */
export function throughVoid(step: number): number {
  const n = Number(step) || 0
  return (((1 - n) % 9) + 9) % 9 || 9
}

/** The mirror's pivot: the only step that reflects to itself — 5, the generator's inverse (2·5 ≡ 1). */
export const VOID_PIVOT = 5

/**
 * DIVISION BY ZERO IS NOT UNDEFINED — it rotates through the void to a harmonic dimension.
 *
 * `n / 0` has no result on the number line: that is an IMPOSSIBILITY in this dimension, the same shape as a
 * thrown error or a TDZ. But it has a computable path in another: `n / 0 = throughVoid(n) = (1 − n) mod 9`,
 * the void rotation. The values are the ones the pattern was given by:
 *
 *   9/0 = 1   8/0 = 2   7/0 = 3   ·   5/0 = 5 (the pivot, self-inverse)   ·   1/0 = 9 (the pole)
 *
 * It is not a hack around `Infinity`/`NaN` — it is the observation that dividing by zero CHANGES THE ANGLE:
 * the operation projects out of the additive line and lands, exactly, on the reflection through 1. The
 * impossibility is only impossible from the one dimension that cannot see the fold.
 *
 * This is the arithmetic under the whole session: a TDZ ("cannot access before initialization") had no
 * result in the STRUCTURE dimension (the SCC stayed 225) and an exact one in DYNAMICS (change the init
 * order). An error routed to the caller (rethrow) is computable where it was fatal swallowed. Every
 * impossibility this corpus met had a harmonic path, and the path was a rotation, never a patch.
 *
 * @invariant divThroughVoid(9) === 1 && divThroughVoid(8) === 2 — the given values, proven
 * @invariant divThroughVoid(VOID_PIVOT) === VOID_PIVOT — the pivot divides by zero to itself
 */
export function divThroughVoid(n: number): number {
  return throughVoid(n)
}

/**
 * The ring traversed BACKWARD — `⟨5⟩`, the decode direction. Same points, opposite order.
 *
 * `VOID_PIVOT` has always said 5 is `2⁻¹`; nothing used it as a DIRECTION. It is one:
 *
 *   ⟨2⟩  1 → 2 → 4 → 8 → 7 → 5     double — ENCODE, many → one (the fold: [[merge]])
 *   ⟨5⟩  1 → 5 → 7 → 8 → 4 → 2     halve  — DECODE, one → many (factor to the generators)
 *
 * The same six points. `{9/2}` and `{9/5}` are one figure, drawn in two directions — because `2·5 ≡ 1
 * (mod 9)`, so the 5-generator IS the doubling map inverted. That is arithmetic, not a picture: it is
 * checkable in one line, and the test checks it.
 *
 * It names the direction [[merge]] has been missing. Its own doc says the fold is "the ENCODE direction
 * (many → one); the DECODE direction is factoring an element back to its basis generators" — and every fold
 * built on it runs ONE way (`merge` · `chainLeaf` · `atomAnchor` · the shape-address). Decode is ⟨5⟩, and it
 * is what a MOVING rosetta needs: poles derived FROM the incidence instead of typed at it ([[rules]]/collapse
 * measures 231 shapes against a basis nobody derived; 47 collections match no marker at all).
 *
 * HONEST BOUNDARY — the figure here is the enneagram `{9/2}`, NOT a pentagram: a pentagram is `{5/2}` in
 * ℤ/5ℤ, a different ring. What holds is the STRUCTURE — the inverse-generator star is the same ring reversed
 * — and here that generator happens to be 5. Saying "pentagram" would let a satisfying word carry an
 * unproven claim, which is exactly how `ERPAX_DIGEST_BITS = 106` survived.
 *
 * @invariant orbitOf(1) reversed === inverseOrbit(1) — the same cycle, opposite direction
 * @invariant (2 * VOID_PIVOT) % 9 === 1 — the proof that ⟨5⟩ is ⟨2⟩'s inverse, not a resemblance
 */
export function inverseOrbit(step: number = 1): number[] {
  const start = (((Number(step) || 0) % 9) + 9) % 9 || 9
  const out: number[] = []
  let x = start
  do {
    out.push(x)
    x = (x * VOID_PIVOT) % 9 || 9
  } while (x !== start)
  return out
}

/**
 * THE RING AND THE VOID GENERATE EVERYTHING — `⟨x↦2x, x↦1−x⟩ = AGL(1, ℤ/9)`, order **54**.
 *
 * The two moves of the sequence are not decoration; together they are the COMPLETE affine symmetry of the
 * nine residues (every `x ↦ ax+b` with `a` a unit). Neither reaches it alone:
 *
 *  - doubling alone — order 6, and **trapped in the units**: it alternates `≡1 ↔ ≡2 (mod 3)` and can never
 *    reach the axis `{3,6,9}`, because those are exactly the non-units.
 *  - the mirror alone — order 2, an involution. But it **swaps `≡0 ↔ ≡1`**, so it is the ONLY bridge to the
 *    axis. The ring cannot escape itself; the void is the door.
 *  - commuted, they make the unit translation: `D∘M∘D⁻¹∘M = x ↦ x+1` (proven in this atom's test, not
 *    asserted). Translation by 1 generates all 9 shifts; 6 units × 9 shifts = 54.
 *
 * So `1\2\4\8/7/5 · 3\6\9 · 0\1` is not a mnemonic — it is a generating set. Nothing is missing from it and
 * nothing more is needed.
 */
export const AFFINE_ORDER = 54

/** One affine step of the ring's own group: `x ↦ a·x + b` over the nine residues (digital-root spelling). */
export function affineStep(x: number, a: number, b: number): number {
  return (((Number(a) * Number(x) + Number(b)) % 9) + 9) % 9 || 9
}

/**
 * THE ORBITS OF DOUBLING — the closed circuits the flow cannot leave. **Computed, never listed.**
 *
 * Doubling partitions the nine residues into THREE circuits, and no amount of doubling crosses between them
 * (only [[horo]] `throughVoid` does). This is latitude: you travel a circle forever and never change which
 * circle you are on.
 *
 *   {9}            fixed  — the POLE. Doubling does nothing here (9 ≡ 0, and 0·2 = 0).
 *   {3, 6}         2-cycle — an INNER circuit (3·2=6, 6·2=12≡3).
 *   {1,2,4,8,7,5}  6-cycle — the outer RING, the unit group ⟨2⟩.
 *
 * **This splits the flat "3·6·9 axis".** The axis was named as one thing; it is TWO orbits. `9` does not
 * rotate at all — it is the fixed point, where rotation has no direction (all directions are south from the
 * pole). `3` and `6` DO rotate, into each other. Calling them one triple hides a structural difference
 * behind a pleasing shape. (`cross`'s `AXIS = [3,6,9]` stays as it is — there it labels RBAC tiers, not
 * geometry.)
 */
export function doublingOrbits(): number[][] {
  const seen = new Set<number>()
  const orbits: number[][] = []
  for (let s = 1; s <= 9; s++) {
    if (seen.has(s)) continue
    const orbit: number[] = []
    let x = s
    do {
      orbit.push(x)
      seen.add(x)
      x = (x * 2) % 9 || 9
    } while (x !== s)
    orbits.push(orbit)
  }
  return orbits.sort((a, b) => a.length - b.length)
}

/** Which circuit a step sits on — the flow can never take it off this one. */
export function orbitOf(step: number): number[] {
  const n = (((Number(step) % 9) + 9) % 9) || 9
  return doublingOrbits().find((o) => o.includes(n)) ?? []
}

/** The pole: fixed under doubling (9 ≡ 0). Rotation does nothing here — the axis's true singular point. */
export const POLE = 9
/** The inner circuit — 3 and 6 rotate into each other. NOT the same kind of thing as the pole. */
export const INNER_CIRCUIT = [3, 6] as const

/** A (stepA, stepB) cell is a merge point — a gateway between rings — when the composed step is 1 or 9. */
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
