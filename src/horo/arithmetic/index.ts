/**
 * horo/arithmetic — Pure mathematical operations on horo digits:
 * ratios, digital roots, composition, void mechanics, inverses, affine steps.
 *
 * These functions compute without side effects; the ring structure is stable.
 *
 * @see ../ring/index.ts (structural analysis, orbits)
 * @see ../geometry/index.ts (loops, sequences)
 */

import { exactAbs, exactTrunc } from '../../algebra'
import { type HoroStep, VOID_PIVOT } from '../constants'

/**
 * Digital root (base-10) of an integer → 1..9 (0 only for 0): repeated digit-sum = reduction mod 9.
 * The canonical integer digital root; the uuid form is `@/digit`.
 */
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
 * Imperial-standard exact rational — halves, thirds, quarters, and horo decade ratios.
 * Never a decimal literal where an exact rational exists (`0.333` drifts from `1/3`;
 * `horoRatio(9)` is 9/10, not `0.9` hand-set).
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
 * Real structure, not a fitted pattern: it is an INVOLUTION (through twice returns), it pairs
 * `(1,9) (2,8) (3,7) (4,6)`, and its FIXED POINT is 5 — which is exactly `2⁻¹ mod 9`. The mirror pivots on
 * the element that undoes the doubling that built the ring.
 */
export function throughVoid(step: number): number {
  const n = Number(step) || 0
  return (((1 - n) % 9) + 9) % 9 || 9
}

/**
 * DIVISION BY ZERO IS NOT UNDEFINED — it rotates through the void to a harmonic dimension.
 *
 * `n / 0` has no result on the number line: that is an IMPOSSIBILITY in this dimension.
 * But it has a computable path in another: `n / 0 = throughVoid(n) = (1 − n) mod 9`.
 */
export function divThroughVoid(n: number): number {
  return throughVoid(n)
}

/**
 * The ring traversed BACKWARD — `⟨5⟩`, the decode direction. Same points, opposite order.
 *
 *   ⟨2⟩  1 → 2 → 4 → 8 → 7 → 5     double — ENCODE, many → one
 *   ⟨5⟩  1 → 5 → 7 → 8 → 4 → 2     halve  — DECODE, one → many
 *
 * The same six points. `{9/2}` and `{9/5}` are one figure, drawn in two directions — because
 * `2·5 ≡ 1 (mod 9)`, so the 5-generator IS the doubling map inverted.
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
  /** steps in 1..9 the inverse can NEVER reach, however many times it applies — a structural gap. */
  readonly gaps: readonly number[]
  /** whether the VOID bridge (`throughVoid`) reaches every gap — the gap closes by another dimension. */
  readonly voidCloses: boolean
}

/**
 * How many times must the inverse happen to leave no gaps? — the computed answer.
 *
 * An inverse is an INVOLUTION: `antimatter(antimatter(n)) = n`, `throughVoid∘throughVoid = id` — it RETURNS in 2.
 * But returning is not covering. To leave no gaps the count is the ORDER of the generator: the doubling-inverse
 * ⟨5⟩ has order 6 and covers {1,2,4,5,7,8} — and then STOPS. The axis {3,6,9} is a gap it can never reach.
 */
export function inverseClosure(seed: number = 1): InverseClosure {
  // Note: orbitOf is in ring atom; we'd need to import it or duplicate logic
  // For now, compute inline
  const covers = inverseOrbit(seed)
  const covered = new Set(covers)
  const gaps = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => !covered.has(n))
  const voidCloses = gaps.every((g) => {
    // Compute doubling orbit of g
    const gOrbit = new Set<number>()
    let x = g
    do {
      gOrbit.add(x)
      x = (x * 2) % 9 || 9
    } while (x !== g)
    return covers.some((c) => gOrbit.has(throughVoid(c) || 9))
  })
  return { order: covers.length, covers, gaps, voidCloses }
}

/**
 * THE RING AND THE VOID GENERATE EVERYTHING — `⟨x↦2x, x↦1−x⟩ = AGL(1, ℤ/9)`, order **54**.
 *
 * One affine step of the ring's own group: `x ↦ a·x + b` over the nine residues (digital-root spelling).
 */
export function affineStep(x: number, a: number, b: number): number {
  return (((Number(a) * Number(x) + Number(b)) % 9) + 9) % 9 || 9
}

/** @index-cross.foldback child=horo/arithmetic parent=horo — this cross folds back into its parent. */
