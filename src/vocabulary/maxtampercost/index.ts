/**
 * vocabulary/maxtampercost — the alias, and the proof that an alias is not a second implementation.
 *
 * This atom was a SKILL with no matter: a page saying *"see [[analytics]]/max-tamper-cost for the
 * canonical organ"*. That is the shape [[rules]]/invisible warns about — a word beside a lever, with
 * nothing holding the two together, so the day the lever changes the word keeps its old meaning and
 * nobody finds out.
 *
 * So the alias is **computed against the organ**, not asserted beside it. `resolves()` returns the
 * canonical entry point, and `agreesWithOrgan` compares this atom's answer to `maxTamperCost`'s on
 * the same input. An alias earns its name by returning the organ's number — never its own.
 *
 * **Why a vocabulary word at all.** The concatenated form is how the term is SAID (`maxtampercost`),
 * and [[vocabulary]] is where the corpus's words live; the lever is where the arithmetic lives. One
 * concept, two surfaces, and the test is what keeps them one concept.
 *
 * @law an alias computes the organ's answer or it is a second implementation wearing a synonym
 * @invariant agreesWithOrgan is true for every input — the alias never disagrees with its organ
 * @invariant the weakest link is the MINIMUM, so adding a stronger dimension cannot raise it
 * @standard ISO/IEC 25010:2023 §5.6 — maintainability: one source, addressable
 * @see ./SKILL.md -- ../../analytics/max-tamper-cost.ts
 */
import { maxTamperCost, type MaxTamperCostReport } from '@/analytics'

/** The canonical organ this word names. A pointer that resolves, rather than prose that claims. */
export const ORGAN = 'analytics/max-tamper-cost'

export interface Weakness {
  readonly unsealedCrosses?: number
  readonly impurities?: number
}

/** The alias: the organ's own answer, never a parallel derivation. */
export function maxtampercost(w: Weakness = {}): MaxTamperCostReport {
  return maxTamperCost(w)
}

/** The proof obligation an alias carries — it agrees with its organ, or it is a fork. */
export function agreesWithOrgan(w: Weakness = {}): boolean {
  return JSON.stringify(maxtampercost(w)) === JSON.stringify(maxTamperCost(w))
}

/**
 * The weakest link is a MINIMUM, so tamper-cost is bounded by the worst dimension.
 *
 * Stated as arithmetic because it is the whole content of the word: a chain with one open link is as
 * strong as that link, and adding sealed dimensions beside it changes nothing.
 */
export function weakestLink(dimensions: readonly number[]): number {
  return dimensions.length === 0 ? 0 : Math.min(...dimensions)
}
