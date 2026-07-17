/**
 * conversion — inversion reinvents conversion. The inverse of a conversion is itself a conversion.
 *
 * A CONVERSION is a reversible change of representation: a bijection on ℤ/9, which is exactly multiplication by
 * a UNIT `u ∈ {1,2,4,5,7,8}` (the map `n ↦ u·n` permutes all nine residues, losing nothing). An INVERSION
 * reverses it. The realization — and it is a theorem, not a pun — is that you do not build new machinery to
 * convert back: the inverse of a unit is ANOTHER unit (the units are a group, closed under inverse), so the
 * inversion IS a conversion, reinvented from the same structure. `2·5 ≡ 1`, `4·7 ≡ 1`, `8·8 ≡ 1`, `1·1 ≡ 1` —
 * every conversion's inverse is a conversion. inVERSION and conVERSION share the root *version* (a turning);
 * inverting a turning gives another turning.
 *
 * The honest split is the whole point. This holds ONLY for the REVERSIBLE conversions — the units. The
 * non-units `{3,6,9}` are NOT conversions: `n ↦ 3n` collapses nine residues onto three, loses information, and
 * has no inverse to reinvent ([[rodin]]: they are the axis, not the flow). The same boundary the whole corpus
 * runs on: the FOLD ([[merge]]) is a conversion that is deliberately NOT bijective — content-addressing is
 * one-way, so its inversion cannot be reinvented, and that irreversibility IS the tamper-cost. So inversion
 * reinvents conversion exactly when the conversion lost nothing; where it collapsed, there is nothing to invert.
 *
 * @invariant a conversion is a bijection ⇔ its multiplier is a unit (has an inverse mod 9)
 * @invariant the inverse of a conversion is a conversion — the units are closed under inverse
 * @invariant convert(invert(u), convert(u, n)) === n for every conversion u — inversion undoes conversion
 *
 * Composes [[rodin]] · [[horo]] · [[merge]] · [[law]].
 */
import { inverseMod9 } from '@/rodin'

const dr9 = (n: number): number => (((n % 9) + 9) % 9)

/** Apply the conversion `u` to `n` — the map `n ↦ u·n mod 9`. */
export function convert(u: number, n: number): number {
  return dr9(u * n)
}

/** Is `u` a conversion? — true iff `n ↦ u·n` is a bijection on ℤ/9, i.e. `u` is a unit (has an inverse). */
export function isConversion(u: number): boolean {
  return inverseMod9(u) !== null
}

/**
 * The inversion of a conversion — reinvented as another conversion, or `null` where there is nothing to invert.
 * `invert(u)` is `u⁻¹ mod 9`; it exists iff `u` is a conversion, and when it does it is ITSELF a conversion.
 */
export function invert(u: number): number | null {
  return inverseMod9(u)
}

/** The bijection a conversion performs — its full permutation of ℤ/9 (proof it loses nothing). */
export function permutation(u: number): number[] {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => convert(u, n))
}

/**
 * INVERSE IS NOT REVERSE. A correction the pure algebra hides.
 *
 * `convert(invert(u), convert(u, n)) === n` says the VALUE returns — and in ℤ/9 that return is TRACELESS,
 * because a number carries no history: nothing records that it went out and came back. That traceless inverse
 * exists ONLY in a historyless system. Drive a real car forward through snow and reverse it back to the start:
 * the POSITION returns, but the snow now holds TWO sets of tracks — the forward pass and the reverse pass.
 * Reverse is not the inverse; it is a SECOND motion, in the opposite direction, and it leaves its own marks.
 *
 * This is the corpus's integrity law, not a metaphor. [[reverse]] — the accounting reversal — is exactly this:
 * a reversal is not an erasure but a MIRROR entry (swap debit/credit, keep the amount), and BOTH the original
 * and the reversal remain in the ledger. The net balance returns to zero; the ledger keeps two rows. You cannot
 * INVERT a posted entry (erase it, traceless) — you can only REVERSE it (append its mirror), and the tracks are
 * the audit trail ([[beyond]]/reversibility: an audit leaf is append-only; undo emits a tombstone, not a delete).
 * The tracks are not a defect — they ARE the tamper-evidence: a history you cannot invert is a history you can trust.
 */
export interface OnSnow {
  /** where the car is — this DOES return under reverse. */
  readonly position: number
  /** the marks left in the snow — these only ACCUMULATE; reverse adds to them, it never clears them. */
  readonly tracks: readonly string[]
}

/** Drive forward to a position — the position moves, and a track is left. */
export function driveForward(car: OnSnow, to: number): OnSnow {
  return { position: to, tracks: [...car.tracks, `→${to}`] }
}

/** Reverse back to where it started — the POSITION returns, but reverse leaves its OWN track. Inverse ≠ reverse. */
export function driveReverse(car: OnSnow, to: number): OnSnow {
  return { position: to, tracks: [...car.tracks, `←${to}`] }
}

/** True iff the state is as if nothing happened — position at start AND no tracks. Only a historyless system can. */
export function isTraceless(car: OnSnow, start: number): boolean {
  return car.position === start && car.tracks.length === 0
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('conversion — inversion reinvents conversion:\n')
  for (const u of [1, 2, 3, 4, 5, 6, 7, 8]) {
    const i = invert(u)
    console.log(
      `  u=${u}  conversion? ${isConversion(u) ? 'yes' : 'no '}  inverse=${i ?? '—'}  ${
        i !== null ? `(itself a conversion: ${isConversion(i)})` : '(collapses — nothing to reinvent)'
      }`,
    )
  }
  console.log('\n  the units {1,2,4,5,7,8} are conversions, closed under inverse — inversion reinvents conversion.')
  console.log('  the axis {3,6,9} collapses — a lossy conversion (like the fold) has no reinvented inverse.')
}
