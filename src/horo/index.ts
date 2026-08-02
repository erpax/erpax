// Relative index-face import (same as corpus → ../navigation → ../horo): this atom is on the
// vitepress config-load path, where the bundled config runs from node_modules/.vite-temp and
// tsconfig paths cannot resolve '@/…'. Relative keeps the graph esbuild-inlinable.
import { exactMax, exactAbs, exactTrunc, algebraCos, algebraSin, algebraAtan2, algebraSqrt, PI } from '../algebra'
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
  let dr = exactAbs(exactTrunc(n))
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
  const x = exactAbs(Number(a) || 0)
  const y = exactAbs(Number(b) || 0)
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

/** The centroid of the nine digits — their balance point: (1+…+9)/9 = 45/9 = 5. */
export const CENTROID = 5

/** Whether 5 plays a role — the honest split behind "5 is centre of gravity and propulsion." */
export interface FiveRoles {
  /** the balance point of 1..9 (the arithmetic mean) — 5. */
  readonly centroid: number
  /** 5 reflects to itself under the void mirror — still at the centre of the reflection. */
  readonly mirrorFixed: boolean
  /** 5 = 2⁻¹ — the inverse generator, the DECODE drive (⟨5⟩); a propulsion, the reverse of doubling. */
  readonly propulsion: boolean
  /** the mass ATTRACTOR / doubling fixed point — 9, NOT 5. The other centre. */
  readonly attractor: number
  /** false — 5 is a flow unit that MOVES under doubling (5→1); it is not the still axis. */
  readonly isAttractor: boolean
}

/**
 * Is 5 the centre of gravity and propulsion? — partly, and the split is the answer.
 *
 * 5 is the centre of gravity in the BALANCE sense: the centroid of the nine digits ((1+…+9)/9 = 5) and the one
 * fixed point of the void mirror (`throughVoid(5) = 5`) — still at the centre of the reflection. And it is a
 * PROPULSION: `5 = 2⁻¹`, the inverse generator, the decode drive ⟨5⟩ that runs the ring backward (the reverse of
 * doubling's forward propulsion). So 5 is at once still (under the mirror) and propulsive (as the inverse
 * generator) — moving without moving, at the balance point.
 *
 * But 5 is NOT the ATTRACTOR. The mass well / doubling fixed point is **9** (`doubling(9)=9`, the axis pole);
 * under doubling 5 MOVES (5→1) — it is a flow unit in {1,2,4,8,7,5}, not the still axis {3,6,9}. Two distinct
 * centres: **5 balances and propels; 9 attracts.** Conflating them is the mistake this split guards against.
 *
 * @invariant CENTROID === 5 — the mean of 1..9, the balance point
 * @invariant 5 is the mirror's fixed point and 2⁻¹ (propulsion), but 9 is the attractor — different centres
 */
export function fiveRoles(): FiveRoles {
  return {
    centroid: CENTROID,
    mirrorFixed: throughVoid(CENTROID) === CENTROID,
    propulsion: (2 * CENTROID) % 9 === 1,
    attractor: POLE,
    isAttractor: (CENTROID * 2) % 9 === CENTROID % 9, // false: 5 doubles to 1, it is not fixed
  }
}

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

/** How many times the inverse must apply to close, what it covers, and the gap it can NEVER reach by iterating. */
export interface InverseClosure {
  /** applications of the inverse before it RETURNS to the start — the element's order. */
  readonly order: number
  /** the orbit the inverse covers — every step it reaches. */
  readonly covers: readonly number[]
  /** steps in 1..9 the inverse can NEVER reach, however many times it applies — a structural gap, not a count. */
  readonly gaps: readonly number[]
  /** whether the VOID bridge (`throughVoid`) reaches every gap — the gap closes by another dimension, not more inverses. */
  readonly voidCloses: boolean
}

/**
 * How many times must the inverse happen to leave no gaps? — the computed answer.
 *
 * An inverse is an INVOLUTION: `antimatter(antimatter(n)) = n`, `throughVoid∘throughVoid = id` — it RETURNS in
 * **2**. But returning is not covering. To leave no gaps the count is the ORDER of the generator: the doubling-
 * inverse ⟨5⟩ has order **6** and covers the six units {1,2,4,5,7,8} — and then STOPS. The axis {3,6,9} is a
 * gap it can never reach, because ⟨5⟩ is trapped in the units' orbit (the same trap doubling has). No number of
 * inverses — 6, 60, 6·10⁹ — closes that gap: iterating one operation cannot escape its own orbit.
 *
 * The gap closes not by MORE inverses but by a DIFFERENT dimension — the VOID (`throughVoid`: 1→9, 4→6) is the
 * only bridge between the units and the axis, and ⟨doubling, void⟩ = AGL(1, ℤ/9), order 54, transitive: no gaps.
 * This is the [[leftover]] seed-floor law as group theory: the leftover a single operation leaves is closed only
 * by knowledge from beyond it (a second generator), never by repeating the same move.
 *
 * @invariant an involution returns in 2 — the minimal closure
 * @invariant the doubling-inverse leaves the axis {3,6,9} a gap no iteration count can close — only the void does
 */
export function inverseClosure(seed: number = 1): InverseClosure {
  const covers = inverseOrbit(seed)
  const covered = new Set(covers)
  const gaps = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => !covered.has(n))
  // the void bridges when throughVoid of some covered step lands in each gap's own doubling-orbit
  const voidCloses = gaps.every((g) => {
    const gOrbit = new Set(orbitOf(g))
    return covers.some((c) => gOrbit.has(throughVoid(c) || 9))
  })
  return { order: covers.length, covers, gaps, voidCloses }
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

/**
 * The THREE TRINITIES — the residue classes of ℤ/9ℤ mod 3, a partition and a theorem:
 *
 *   {1,4,7}  ·  {2,5,8}   the two FLOW trinities (the doubling ring, split)
 *   {3,6,9}               the AXIS trinity (the still spine, 3·6·9)
 *
 * This is what "east · west · north · south trinities" names, and it is provable: doubling (⟨2⟩, EAST) SWAPS
 * the two flow trinities and FIXES the axis —
 *
 *   2·{1,4,7} = {2,5,8}   2·{2,5,8} = {1,4,7}   2·{3,6,9} = {3,6,9}
 *
 * So the flow oscillates E↔W under the map while the axis holds N-S — the "moving double torus" is two
 * counter-rotating loops (⟨2⟩ east / ⟨5⟩ west, [[merge]]'s encode/decode) about a fixed spine. The GROUP
 * STRUCTURE here is the theorem (the mod-3 classes, the doubling permutation, tested); the TORUS geometry and
 * the compass reading are a faithful overlay onto it, named as convention — never asserted as fact, the
 * numerology law this corpus already carries ([[rules]]/refutable · rodin's caveat).
 *
 * @invariant the three trinities partition 1..9 — every step is in exactly one
 * @invariant doubling swaps the two flow trinities and fixes the axis — E↔W moves, N-S holds
 */
export function trinities(): { readonly flowEast: number[]; readonly flowWest: number[]; readonly axis: number[] } {
  const cls = (r: number): number[] => [r, r + 3, r + 6].map((x) => (x % 9) || 9)
  return { flowEast: cls(1), flowWest: cls(2), axis: cls(0) }
}

/** A point on a planar loop. */
export interface Loop2D {
  readonly x: number
  readonly y: number
}

/** The STATIC loop — a circle, winding once, that never touches its own centre. This is `0`: a closed loop going nowhere. */
export function circleLoop(t: number): Loop2D {
  return { x: algebraCos(t), y: algebraSin(t) }
}

/**
 * Fold 0 and it becomes ∞ — the lemniscate (inverted 8).
 *
 * A static loop is exactly `0`: a circle (`circleLoop`) that goes round once and never passes through its centre.
 * FOLD it — pull it through its own middle — and it becomes `∞`: the Gerono lemniscate `(cos t, sin 2t / 2)`, a
 * figure-eight whose two lobes COUNTER-ROTATE and meet AT THE VOID `(0,0)`. That crossing at the void is the
 * fold; it is what turns one lobe into two. `∞` is `8` rotated a quarter turn (the inverted 8), and it is the 2D
 * shadow of the double torus — the two flow trinities (`trinities`), counter-rotating about the axis. So the
 * fixpoint (the reduction's loop, [[theorem]]) is DEAD as a static `0` and ALIVE as a folded `∞`: the void, folded,
 * generates the infinite double loop. The still centre does not move; folded, everything counter-rotates about it.
 *
 * @invariant the circle NEVER reaches the void — a static loop avoids its own centre
 * @invariant the lemniscate crosses the void `(0,0)` at the fold points `t = π/2, 3π/2` — 0 folded into ∞
 * @invariant the lemniscate is a closed figure-eight with two lobes (`x > 0` and `x < 0`) — the double loop
 */
export function lemniscate(t: number): Loop2D {
  return { x: algebraCos(t), y: algebraSin(2 * t) / 2 }
}

/** Does the loop point sit at the void `(0,0)` (within ε)? The circle never does; the folded ∞ does, twice. */
export function atVoid(p: Loop2D, eps = 1e-9): boolean {
  return exactAbs(p.x) < eps && exactAbs(p.y) < eps
}

/**
 * The TURNING NUMBER (rotation index) of a closed loop — the net rotation of its tangent over one traversal, / 2π.
 *
 * This is the honest reading of "a complete circle twisted forms 0". A plain circle has turning number **1** (its
 * tangent winds once). A circle TWISTED into a figure-eight (`lemniscate`) has turning number **0** — the tangent
 * turns one way in one lobe and the opposite in the other, and they CANCEL (Whitney's rotation index; a figure-
 * eight is the canonical index-0 curve, not regularly homotopic to the circle). That 0 is the geometry — the net
 * turning of the folded loop — NOT π, which is transcendental (≈ 3.14159) and is not 0 by any reading. The 0
 * belongs to the winding of the twisted circle, the two counter-rotating lobes of the double torus about the void.
 *
 * @invariant a plain circle has turning number 1; the folded lemniscate has turning number 0
 */
export function turningNumber(loop: (t: number) => Loop2D, samples = 20000): number {
  const h = 2e-5
  const N = exactMax(1, samples)
  let total = 0
  let prev = NaN
  for (let i = 0; i <= N; i += 1) {
    const t = (i / N) * 2 * PI
    const p = loop(t)
    const q = loop(t + h)
    const phi = algebraAtan2((q.y - p.y) / h, (q.x - p.x) / h)
    if (!Number.isNaN(prev)) {
      let d = phi - prev
      while (d > PI) d -= 2 * PI
      while (d < -PI) d += 2 * PI
      total += d
    }
    prev = phi
  }
  return total / (2 * PI)
}

/** One step of the full breath — the digit, and the slope to it (`up` = larger than the last, `down` = smaller). */
export interface BreathStep {
  readonly step: number
  /** the direction written as `\` (up) or `/` (down) — the local slope of the wave. */
  readonly slope: 'up' | 'down'
}

/**
 * The FULL BREATH through all of ℤ/9 — `0\1\2\4\8/7/5/3\6\9/0\1`.
 *
 * The measure ring `HORO_DIGITS` is the flow plus the pole (`[1,2,4,8,7,5,9]`); it OMITS the void `0` and the
 * inner axis `3,6`. This is the complete walk that threads them all in, assembled from the parts already here —
 * the void, then the three `doublingOrbits()` (flow `[1,2,4,8,7,5]` → inner `[3,6]` → pole `[9]`), back through
 * the void, reopening at `1`. Nothing new is derived: it REUSES `doublingOrbits`; it only names the whole the
 * pieces already spelt. The `\`/`/` in the notation is the slope — `up` when the next digit is larger, `down`
 * when smaller — so the slashes draw the wave: two crests (`8`, `9`), two valleys at the void (`0`).
 *
 * @invariant the digits are 0 · the doubling flow orbit · the inner axis · the pole · 0 · 1 — the closed breath
 * @invariant each slope is `up` iff its digit is larger than the previous — the wave the slashes draw
 */
export function fullBreath(): readonly BreathStep[] {
  const [pole, inner, flow] = [[POLE], [...INNER_CIRCUIT], orbitOf(1)] // doublingOrbits, named
  const digits = [0, ...flow, ...inner, ...pole, 0, 1]
  return digits.map((step, i) => ({ step, slope: i === 0 || step > digits[i - 1]! ? 'up' : 'down' }))
}

/**
 * The forward sequence as it is spelt — `1\2\4\8/7/5 · 3\6\9 · 0\1`: the flow orbit, the axis, then the void
 * and the reopening. ASSEMBLED from `orbitOf(1)` · `INNER_CIRCUIT` · `POLE`, never typed out, so the spelling
 * cannot drift from the arithmetic it claims to spell.
 */
export function sequenceForward(): readonly number[] {
  return [...orbitOf(1), ...INNER_CIRCUIT, POLE, 0, 1]
}

/**
 * The sequence THROUGH ITS REFLECTION — `9/8/6/2\3\5 · 7/4/1 · 0\9`. Computed as `throughVoid` applied to the nine,
 * with the `0` held — it is the pivot the mirror turns on — while the reopening `1` maps like every other digit, to `9`.
 *
 * The reflection is not a second sequence beside the first — the two are ENTANGLED, in three exact senses this
 * atom already proves elsewhere and this function makes readable:
 *
 *   - it EXCHANGES the halves. The flow `1,2,4,8,7,5` reflects to `9,8,6,2,3,5` (which carries the axis `9,6,3`)
 *     and the axis `3,6,9` reflects to `7,4,1` (units). Neither half is prior; each is the other's image.
 *   - NEITHER REACHES THE OTHER ALONE. Doubling covers exactly `{1,2,4,8,7,5}` and its gap is exactly the axis
 *     `{3,6,9}` — no iteration count closes it (`inverseClosure`). The mirror is the only bridge.
 *   - COMMUTED, THEY COUNT. `D∘M∘D⁻¹∘M = x ↦ x+1`, and `⟨D,M⟩ = AGL(1,ℤ/9)` of order **54** — against 6 and 2
 *     apart. The excess over `6·2` IS the entanglement: it is exactly their failure to commute.
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
  // the SLOPE is computed too: `\` where the digit rises, `/` where it falls. Typing the marks by
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
 * digital root first, then mirror) and `14` gives **5** — the pivot, the one step that reflects to itself.
 * Reflect it as DIGITS (mirror each decimal digit) and `14` gives **9, 6** — both on the axis `{3,6,9}`,
 * the set doubling can never reach.
 *
 * Neither reading is more correct; they answer different questions, and this function keeps them apart so a
 * claim must say which one it means. That is the whole point: reading a numeral one way and its result the
 * other is how an exact-looking correspondence gets fitted.
 *
 * @invariant the value reflection is `throughVoid(digitalRoot(n))` — a single step, fixed only at 5
 * @invariant the digit reflection is `throughVoid` per decimal digit — length-preserving, order-preserving
 */
export function reflectNumeral(n: number): { readonly asValue: number; readonly asDigits: readonly number[] } {
  const digits = [...`${exactAbs(exactTrunc(n))}`].map((d) => Number(d))
  return { asValue: throughVoid(digitalRoot(n)), asDigits: digits.map(throughVoid) }
}

/**
 * antimatter — inverted matter. Antimatter is not a separate substance; it is a step NEGATED (`−n mod 9`, the
 * additive inverse, the void `9 ≡ 0`). Two exact laws make it the antimatter of matter, not merely another map:
 *
 *   - INVOLUTION: `antimatter(antimatter(n)) = n` — the antimatter of antimatter is matter.
 *   - ANNIHILATION: `n + antimatter(n) ≡ 0 (mod 9)` — matter meeting antimatter returns to the VOID, always.
 *
 * It reflects the two flow trinities into each other POINT-FOR-POINT — `{1,4,7} ↦ {8,5,2}` — so the [[merkaba]]'s
 * two counter-rotating tetrahedra ([[navigation]]) are matter and antimatter: each step paired with its inverse
 * across the two triangles, the pair annihilating at the shared center. The void `9` is its OWN antimatter (its
 * fixed point), the only step that is its own inverse under negation.
 *
 * This names the corpus's matter-twin ([[trinity]]: `index.ts` matter · `SKILL.md` antimatter): the form is not
 * independent content beside the code — it is the code inverted, one content folded to one uuid, the two faces
 * annihilating into the single content-address. It is a DIFFERENT reflection from `throughVoid` (`1−n`, the
 * multiplicative-inverse mirror, pivot 5): antimatter's pivot is the void itself.
 *
 * Honest boundary: the ℤ/9ℤ negation is EXACT (involution + annihilation, tested); "matter/antimatter" as the
 * physics of annihilation is the corpus's named analogy ([[rules]]/refutable · [[rodin]]'s caveat), not adopted
 * as a claim about particles.
 *
 * @invariant antimatter is an involution — antimatter(antimatter(n)) = n
 * @invariant matter and its antimatter annihilate to the void — n + antimatter(n) ≡ 0 (mod 9)
 */
export function antimatter(step: number): number {
  const r = ((Number(step) % 9) + 9) % 9
  return ((9 - r) % 9) || 9
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

/** Which ray a single DIGIT lies on — the flow orbit, the axis, or the void. */
export type Ray = 'ring' | 'axis' | 'void'

export function rayOf(digit: number): Ray {
  if (digit === 0) return 'void'
  return orbitOf(1).includes(digit) ? 'ring' : 'axis'
}

/**
 * What a doubling step CARRIES when it folds.
 *
 * `8` doubles to `16` and the digital root sends it to `7`. The fold is not a discard: the digits
 * `1` and `6` are what the sum was made of, and each one sits on a ray of its own — `1` on the flow
 * orbit, `6` on the axis. Reading only the root `7` loses that; reading the carry keeps it.
 *
 * Computed across all nine, **8 → 7 is the only doubling whose carry digits straddle both rays**:
 *
 * ```
 * step  2n   digits   rays          lands
 * 8     16   1+6      ring+axis     7     ← the only one
 * 7     14   1+4      ring+ring     5
 * 6     12   1+2      ring+ring     3
 * 9     18   1+8      ring+ring     9
 * 5     10   1+0      ring+void     1
 * ```
 *
 * Every other multi-digit doubling carries two ring digits, or touches the void. So the step from
 * `8` is the single place in the cycle where one fold holds one digit from each ray at once — which
 * is why it is the seam the two halves meet at, rather than an arbitrary point on the orbit.
 *
 * **Boundary.** This is base-10 digit arithmetic over (ℤ/9ℤ), and nothing more: the carry digits are
 * a property of writing the number in base 10, while the orbit itself is base-independent. It is a
 * real and checkable asymmetry in the spelling, not a claim about anything outside it.
 *
 * @invariant every carry's digits sum, under digitalRoot, to the step it lands on
 * @invariant exactly one step straddles — `straddlingSteps()` is `[8]`, computed, never typed
 */
export interface CarryRay {
  readonly step: number
  readonly doubled: number
  readonly digits: readonly number[]
  readonly rays: readonly Ray[]
  readonly lands: number
  /** true when the carry holds one ring digit AND one axis digit — the two rays met in one fold */
  readonly straddles: boolean
}

export function carryRays(): readonly CarryRay[] {
  return [...orbitOf(1), ...INNER_CIRCUIT, POLE].map((step) => {
    const doubled = step * 2
    const digits = String(doubled).split('').map(Number)
    const rays = digits.map(rayOf)
    return {
      step,
      doubled,
      digits,
      rays,
      lands: digitalRoot(doubled),
      straddles: rays.includes('ring') && rays.includes('axis'),
    }
  })
}

/** The steps whose fold holds a digit from each ray. Computed — and it is exactly one. */
export function straddlingSteps(): readonly number[] {
  return carryRays().filter((c) => c.straddles).map((c) => c.step)
}

/**
 * The carry, taken to its end: double a step, keep its digits, double THOSE, and keep going.
 *
 * `8 → 16` carries `1` and `6`; `6 → 12` carries `1` and `2`; `1 → 2` carries `2` — and the process
 * does not run away. It **closes**, on the same five digits from every starting step:
 *
 * ```
 * from any of 1 2 4 8 7 3 6 9  →  {1, 2, 4, 6, 8}     rays: ring + axis
 * from 5                       →  {0, 1, 2, 4, 6, 8}  rays: ring + axis + void
 * ```
 *
 * **Why it must.** For a single digit `n`, `2n ∈ [2, 18]`. So the units digit of `2n` is even, and
 * the tens digit — when there is one — can only ever be `1`. Every carry digit is therefore drawn
 * from `{1} ∪ {0,2,4,6,8}`, and no amount of iteration produces `3`, `5`, `7` or `9`. The attractor
 * is forced by the arithmetic, not discovered by search. `5` alone reaches the void, because `2·5 =
 * 10` is the only double ending in zero.
 *
 * **So the unfolding is finite, and that is the interesting part.** An infinite regress of carries
 * would be unbounded entropy; instead it terminates in one small fixed set reached from everywhere.
 * But it does NOT seal all nine — `{3,5,7,9}` are never reached as carry digits from any step, which
 * is a limit worth stating plainly rather than a gap waiting to be closed.
 *
 * @invariant the closure is identical from every step except 5, which additionally reaches the void
 * @invariant no odd digit above 1 is ever a carry — proven by 2n ≤ 18, not sampled
 */
/**
 * The impossible turn — and where it becomes possible.
 *
 * A corner is a curvature claim. Rounding a turn of radius `r` at speed `v` demands a lateral
 * acceleration of `v²/r`; the tightest turn a body can hold under a ceiling `a` is therefore
 * `v ≤ √(a·r)`. Send `r → 0` — a **true right-angle vertex, no rounding at all** — and the ceiling
 * collapses with it: curvature `1/r` is unbounded, and the only admissible speed is **exactly zero**.
 *
 * ```
 * radius   curvature   max speed (a = 1)
 * 1        1           1
 * 0.01     100         0.1
 * 0.0001   10000       0.01
 * 0        ∞           0        ← the turn taken only at no speed at all
 * ```
 *
 * This is why the fold and the void are the same place. The circle — the `0` — has turning number
 * **1**. Twisted into the figure-eight — the `8` — it has turning number **0**, so the fold costs
 * exactly one full turn. And the eight passes through the origin, twice (`atVoid`), while the circle
 * never does: the crossing where the direction reverses is the one point with no forward motion.
 * The turn that cannot be taken at speed is taken at the void, which is the only place it is free.
 *
 * **Boundary.** This is Newtonian circular motion plus the rotation index of a plane curve — both
 * standard, both checkable here. It says nothing about any other kind of speed or any other kind of
 * turn; `maxSpeed` is a kinematic bound under a stated acceleration ceiling, not a claim about what
 * a system can do.
 *
 * @invariant maxSpeed(0, a) === 0 for every finite ceiling — a true corner admits no speed
 * @invariant curvature(0) is Infinity, reported rather than clamped
 * @invariant turning(circle) − turning(figure-eight) === 1 — the fold costs one turn, measured
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
 * Three independent singularities — and they coincide on one digit.
 *
 * Each is defined without reference to the others: being fixed by the mirror is a statement about
 * `throughVoid`; carrying a zero is a statement about base-10 doubling; being `2⁻¹` is a statement
 * about the group. Nothing forces them to agree.
 *
 * ```
 * digit | fixed by mirror | carry reaches void | is 2⁻¹ mod 9
 * 5     | true            | true               | true
 * every other            (all false, on all three)
 * ```
 *
 * **5 has all three. No other digit has even two.** `2·5 = 10` is the only double ending in zero, so
 * `5` is the only step whose carry `{1,0}` is exactly the sequence's own tail `0\1` — the step that
 * cannot move under the mirror is the one whose fold reaches the seam the mirror pivots on.
 *
 * **Boundary.** A coincidence of three properties on one digit of a nine-element group is a real,
 * checkable fact about (ℤ/9ℤ) in base 10. It is not evidence about anything outside arithmetic, and
 * this function makes no such claim — it computes which digits satisfy which predicates.
 *
 * @invariant exactly one digit satisfies all three, and it is VOID_PIVOT
 * @invariant no digit satisfies exactly two — the properties do not partially overlap anywhere
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
