import { exactFloor } from '@/algebra'
/**
 * testing/witness — the bounded-witness helper (ceccec.psg.bg proof taxonomy, made a tool).
 *
 * The session's most-repeated fix: a unit test that maps a corpus-scale derivation over EVERY
 * atom (listAtomPaths().map(deriveFolderModel), a full rulesOf, a whole-corpus wave scan) runs for
 * minutes and blows the batch bound. The law it violated has a name — BOUNDED-WITNESS: verify a
 * representative SAMPLE, not the whole, when the domain is large. finite-complete is the sibling
 * (exhaust the whole domain when it is SMALL — a 4-rung ladder, a 7-position ring). This atom is the
 * one helper both classes reach for, replacing every ad-hoc `.slice(0, N)` and fixture-cwd scattered
 * across balance · educate · intelligence · skill-context · doctor.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability — a bounded witness is exhaustively checkable
 * @audit ceccec.psg.bg/theorems — bounded-witness (55 papers) · finite-complete (410 papers)
 */

/** The default witness size — enough atoms to exercise every aggregation branch, few enough to be fast. */
export const WITNESS_SIZE = 12

/**
 * A representative sample of a large ordered domain — the bounded witness. Takes the first `n`
 * (the corpus is content-sorted, so the first n is stable and cross-section-representative). When
 * the domain is already ≤ n it IS finite-complete — the whole is the witness, verified exhaustively.
 */
export function boundedWitness<T>(domain: readonly T[], n: number = WITNESS_SIZE): readonly T[] {
  return domain.length <= n ? domain : domain.slice(0, n)
}

/** True when a sample IS the whole domain — the verification is finite-complete, not merely a witness. */
export const isFiniteComplete = <T>(domain: readonly T[], n: number = WITNESS_SIZE): boolean =>
  domain.length <= n

/**
 * Spread a witness across the domain rather than taking a prefix — every k-th element, so the sample
 * touches the whole range (early · middle · late atoms), not just the alphabetical head. Use when the
 * aggregation's behaviour varies across the domain and a prefix would miss the tail.
 */
export function spreadWitness<T>(domain: readonly T[], n: number = WITNESS_SIZE): readonly T[] {
  if (domain.length <= n) return domain
  const step = exactFloor(domain.length / n)
  const out: T[] = []
  for (let i = 0; i < domain.length && out.length < n; i += step) out.push(domain[i]!)
  return out
}

/** @index-cross.foldback child=testing/witness parent=testing — this cross folds back into its parent. */
