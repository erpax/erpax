/**
 * horo/ring — Structural analysis of the horo ring: doublingOrbits, trinities, rays, orbits,
 * and the fiveRoles split between balance and attraction.
 *
 * These functions analyze the ring's fixed structure (which elements reach which under doubling,
 * how the flow trinities move, where each digit lives). Orbits are COMPUTED, never listed.
 *
 * @see ../arithmetic/index.ts (doubling map, void reflection)
 * @see ../geometry/index.ts (carry rays, straddling steps, corner mechanics)
 */

import { type HoroStep, HORO_DIGITS, VOID_PIVOT, CENTROID, POLE, INNER_CIRCUIT, type FiveRoles, type Ray } from '../constants'
import { throughVoid, digitalRoot } from '../arithmetic'

/**
 * THE ORBITS OF DOUBLING — the closed circuits the flow cannot leave. **Computed, never listed.**
 *
 * Doubling partitions the nine residues into THREE circuits:
 *   {9}            fixed  — the POLE
 *   {3, 6}         2-cycle — an INNER circuit
 *   {1,2,4,8,7,5}  6-cycle — the outer RING
 *
 * This splits the flat "3·6·9 axis". The axis is TWO orbits: 9 does not rotate,
 * 3 and 6 DO rotate into each other.
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
 * The THREE TRINITIES — residue classes of ℤ/9ℤ mod 3:
 *   {1,4,7}  ·  {2,5,8}   the two FLOW trinities
 *   {3,6,9}               the AXIS trinity
 *
 * Doubling (⟨2⟩) SWAPS the two flow trinities and FIXES the axis.
 */
export function trinities(): { readonly flowEast: number[]; readonly flowWest: number[]; readonly axis: number[] } {
  const cls = (r: number): number[] => [r, r + 3, r + 6].map((x) => (x % 9) || 9)
  return { flowEast: cls(1), flowWest: cls(2), axis: cls(0).sort((a, b) => a - b) }
}

/**
 * The orbit of a digit under doubling (⟨2⟩): all positions reachable by repeated doubling.
 */
export function orbitOf(step: number): number[] {
  const n = (((Number(step) % 9) + 9) % 9) || 9
  return doublingOrbits().find((o) => o.includes(n)) ?? []
}

/**
 * Which ray (ring / axis / void) does a digit live on?
 *   'ring'  — the flow: {1,2,4,8,7,5} (reachable by doubling from 1)
 *   'axis'  — still points: {3,6,9} (not reachable by doubling from 1)
 *   'void'  — 0, the reflection point
 */
export function rayOf(digit: number): Ray {
  if (digit === 0) return 'void'
  return orbitOf(1).includes(digit) ? 'ring' : 'axis'
}

/**
 * The antimatter / inverse of a step: what must it PAIR with to close (compose to 9)?
 *
 * For every `n ≠ 0`, there is a unique `m` such that `composeSteps(n, m) = 9`.
 * Computed via the inverse generator ⟨5⟩.
 */
export function antimatter(step: number): number {
  const r = ((Number(step) % 9) + 9) % 9
  return ((9 - r) % 9) || 9
}

/** UNUSED remnant of the facade-split's multiplicative rewrite — kept out of the surface. */
function _multiplicativeInverseOf(step: number): number {
  const n = (((Number(step) || 0) % 9) + 9) % 9 || 9
  if (n === 9) return 9
  for (let m = 1; m <= 9; m++) {
    if (((n * m) % 9 || 9) === 9) return m
  }
  return 9 // fallback
}

/**
 * Is 5 the centre of gravity and propulsion? — partly, and the split is the answer.
 *
 * 5 is the centre of gravity in the BALANCE sense (centroid of 1..9) and PROPULSION (2⁻¹).
 * But 5 is NOT the ATTRACTOR — the mass well / doubling fixed point is 9.
 * Two distinct centres: **5 balances and propels; 9 attracts.**
 *
 * @invariant CENTROID === 5 · 5 is the mirror's fixed point · 9 is the attractor
 */
export function fiveRoles(): FiveRoles {
  return {
    centroid: CENTROID,
    mirrorFixed: throughVoid(CENTROID) === CENTROID,
    propulsion: (2 * CENTROID) % 9 === 1,
    attractor: POLE,
    isAttractor: (CENTROID * 2) % 9 === CENTROID % 9, // false: 5 doubles to 1
  }
}

/**
 * The doubling carries, read digit by digit — which ray each carry digit lives on, and where the
 * fold lands. Exactly one step straddles both rays in one fold: `8` (`2·8 = 16` carries `1` ring +
 * `6` axis), the seam the two halves meet at.
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

/**
 * Steps that straddle a boundary — which steps fall between two regions?
 * (Placeholder stub; full implementation in ../geometry/index.ts.)
 */
export function straddlingSteps(): readonly number[] {
  return carryRays().filter((c) => c.straddles).map((c) => c.step)
}
