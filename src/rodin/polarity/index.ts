/**
 * rodin/polarity — the 3↔6 boundary, executable.
 *
 * Stated in prose here and provable nowhere. The forward helix is `×2 mod 9` and the reverse is
 * `×5 mod 9`; `3` and `6` are the boundaries the flow swings between and never lands on. What makes
 * them a POLARITY rather than two labels is one computed fact: **doubling swaps them.** 3→6 and 6→3
 * is a 2-cycle around the fixed pole 9 — so the pair is one object with two orientations, which is
 * exactly what [[duality]] means here.
 *
 * The mirror pairs the same axis DIFFERENTLY — `throughVoid` sends 3↦7 and 6↦4 — so "3 and 6" is a
 * doubling fact, not a mirror fact. Conflating the two is how an exact-looking correspondence gets
 * fitted, and keeping them apart is the whole reason this is code rather than a sentence.
 *
 * @law 3 and 6 are one polarity, not two poles — doubling exchanges them around the fixed 9, the
 *      forward ⟨2⟩ and reverse ⟨5⟩ helices wind opposite ways, and the mirror pairs them otherwise.
 * @invariant doubling(3)=6 ∧ doubling(6)=3 ∧ doubling(9)=9 — a 2-cycle around a fixed point
 * @invariant forward and reverse are inverse: ⟨5⟩ is ⟨2⟩ reversed, and 2·5 ≡ 1
 * @see ./SKILL.md -- ../axis -- ../coil -- ../../horo
 */
import { digitalRoot, inverseOrbit, orbitOf, throughVoid } from '@/horo'

/** The two boundaries — forward (C, ×2, give/out) and reverse (M, ×5, take/in). */
export const FORWARD = 3
export const REVERSE = 6

/** The pole the pair turns around — fixed under doubling, so it is the still point, not a boundary. */
export const FIXED = 9

/** One doubling step on the ring. */
export function double(n: number): number {
  return digitalRoot(2 * n)
}

/** The polarity partner of a boundary — the other orientation of the same object. */
export function opposite(n: number): number {
  const d = digitalRoot(n)
  return d === FORWARD ? REVERSE : d === REVERSE ? FORWARD : d
}

/** Is this digit a polarity boundary (3 or 6) rather than the pole or a flow unit? */
export function isBoundary(n: number): boolean {
  const d = digitalRoot(n)
  return d === FORWARD || d === REVERSE
}

/** The forward helix ⟨2⟩ and the reverse helix ⟨5⟩ — the two windings, opposite senses. */
export function helices(): { readonly forward: readonly number[]; readonly reverse: readonly number[] } {
  return { forward: orbitOf(1), reverse: inverseOrbit(1) }
}

/** Where the MIRROR sends the axis — deliberately different from where doubling does. */
export function mirrored(): { readonly [k: number]: number } {
  return { [FORWARD]: throughVoid(FORWARD), [REVERSE]: throughVoid(REVERSE), [FIXED]: throughVoid(FIXED) }
}
