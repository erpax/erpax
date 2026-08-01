/**
 * rodin/axis — the 3·6·9 control plane, executable.
 *
 * This atom stated its law in prose and could not run it. That is the shape [[rules]]/word-without-logic
 * names: a law the corpus asserts and cannot check, so nothing can contradict it. The claims were
 * proven during a session — in [[horo]]'s suite, which is the wrong place: the law lives here, the
 * proof lived two atoms away, and while they were apart nothing could show a third place was missing
 * it ([[rules]]: duplication is camouflage). This gives the axis its own matter.
 *
 * Four claims the prose makes, each now decidable:
 *
 *   - **It governs, it does not flow.** `{3,6,9}` is exactly the set the doubling coil can never
 *     reach — `orbitOf(1)` covers `{1,2,4,8,7,5}` and stops. Not "tends not to"; cannot, because the
 *     non-units are closed under multiplication by a unit.
 *   - **Three coils, 120° out of phase.** `3→6→9`, `6→9→3`, `9→3→6` — the same triad at three
 *     rotations, together covering every (cell, phase) pair exactly once.
 *   - **9 closes; 0 is the origin.** `9 ≡ 0 (mod 9)`, and doubling fixes it (`2·9 ≡ 9`) — the pole.
 *   - **3 and 6 are the boundaries**, not the close: doubling swaps them (`3↔6`), so they are a
 *     2-cycle around the fixed 9. That is [[polarity]]'s law, and it is proven there.
 *
 * @law the axis governs and does not flow — {3,6,9} is precisely the doubling coil's unreachable gap,
 *      three coils 120° apart, closed at 9 and originated at 0.
 * @invariant no element of the axis appears in orbitOf(1); no unit appears in the axis.
 * @invariant the three phase-rotations of the triad cover each (cell, phase) pair exactly once.
 * @see ./SKILL.md -- ../coil -- ../polarity -- ../../horo
 */
import { digitalRoot, orbitOf } from '@/horo'

/** The three control digits — the governing plane. */
export const TRIAD: readonly number[] = [3, 6, 9]

/** The origin — the substrate the triad sits on (K in [[cmyk]]); 9 ≡ 0 closes onto it. */
export const ORIGIN = 0

/** The pole — the triad's close, and doubling's fixed point. */
export const POLE = 9

/** Is this digit on the governing axis rather than in the flow? */
export function isAxis(n: number): boolean {
  return TRIAD.includes(digitalRoot(n))
}

/**
 * The three coils: the same triad read at 0°, 120° and 240°. Rotating a cycle is not three different
 * objects — it is one object observed from three phases, which is why they coexist rather than compete.
 */
export function coils(): readonly (readonly number[])[] {
  return TRIAD.map((_, phase) => TRIAD.map((_, i) => TRIAD[(i + phase) % TRIAD.length]!))
}

/**
 * The gap the doubling coil can never reach — computed from the orbit, never listed. This is the
 * claim "it governs, it does not flow" made decidable: the axis IS the complement of the flow.
 */
export function unreachableByFlow(): readonly number[] {
  const flow = new Set(orbitOf(1))
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => !flow.has(n))
}

/** Degrees between the coils — three at 120° close the circle (the triangle). */
export const PHASE_DEGREES = 120

/** Does the triad close the circle at its phase spacing? 3 × 120° = 360°. */
export function closesCircle(): boolean {
  return TRIAD.length * PHASE_DEGREES === 360
}
