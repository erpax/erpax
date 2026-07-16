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
