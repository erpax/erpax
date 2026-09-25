import { algebraLog2, exactMax, exactMin } from '@/algebra'
import {
  CONFIRM_GATE_CHECKS,
  coverageCostLog2,
  invariantChecks,
  replicationChecks,
  secondPreimageLog2,
  tamperEvasionProbability,
} from '@/cost/bits'

/**
 * law — the one law, strictly formulated. See ./SKILL.md.
 *
 * Every other law in this corpus is a projection of this one; until now it existed only as prose,
 * so nothing could contradict it ([[rules]]/refutable).
 */
export const WORD = 'law' as const
export const atomPath = 'law' as const

/** The graph a forgery must re-harmonise with. Every field is measured, never assumed. */
export interface Binding {
  /** Fraction of the graph a check actually reaches, in [0,1]. Priced; entropy is NOT. */
  readonly coverage: number
  /** Independent uuid checks a forgery must satisfy at once. Defaults to the live gate's axes. */
  readonly checks?: number
  /**
   * Strength, in bits, of the weakest EXTERNAL commitment the chain hangs from.
   *
   * This is the term the slogan omits, and it is a ceiling: a forger may attack the anchor instead
   * of re-harmonising the graph, so no coverage buys more work than the anchor holds.
   */
  readonly anchorBits: number
  /** Replicas whose checks must be evaded simultaneously under strong consistency. */
  readonly replicas?: number
  readonly strongConsistency?: boolean
  /** Machine-checked conservation invariants — independent semantic gates, which ADD. */
  readonly invariants?: number
}

export interface LawVerdict {
  /** log₂ work to produce an undetected forgery. */
  readonly forgeLog2: number
  /** log₂ work to verify — O(checks), so the log of the check count. */
  readonly verifyLog2: number
  /** forge − verify. THIS is the claim: the asymmetry, not an absolute. */
  readonly asymmetryLog2: number
  /** True when the anchor, not the coverage, is what bounds the forger. */
  readonly cappedByAnchor: boolean
  /** P(a tamper goes undetected) at this coverage and check count. */
  readonly evasionProbability: number
  /** Independent gates after replication and invariant amplification. */
  readonly effectiveChecks: number
}

/**
 * The one law, computed: `forgeLog2 = min(−checks·log₂(1−coverage), anchorBits)`.
 *
 * @invariant coverage = 1 ⟹ forgeLog2 = anchorBits — asserted in ./test.ts
 * @invariant forgeLog2 is monotone non-decreasing in coverage — asserted in ./test.ts
 */
export function oneLaw(b: Binding): LawVerdict {
  const base = b.checks ?? CONFIRM_GATE_CHECKS
  const effectiveChecks = invariantChecks(
    replicationChecks(base, b.replicas ?? 1, b.strongConsistency ?? false),
    b.invariants ?? 0,
  )
  const fromCoverage = coverageCostLog2(b.coverage, effectiveChecks)
  const ceiling = secondPreimageLog2(b.anchorBits)
  // exactMax(0, …) is not cosmetic: −checks·log₂(1 − 0) is IEEE −0, and a negative quantity of
  // work is meaningless — it would propagate into the asymmetry and every comparison downstream.
  const forgeLog2 = exactMax(0, exactMin(fromCoverage, ceiling))
  const verifyLog2 = algebraLog2(exactMax(effectiveChecks, 1))
  return {
    forgeLog2,
    verifyLog2,
    asymmetryLog2: forgeLog2 - verifyLog2,
    cappedByAnchor: ceiling <= fromCoverage,
    evasionProbability: tamperEvasionProbability(b.coverage, effectiveChecks),
    effectiveChecks,
  }
}

/**
 * The strict statement, rendered from the terms rather than restated in prose.
 *
 * [[rules]]/drift: a number typed into prose is a copy of an answer. So is a law.
 */
export const ONE_LAW =
  'forgeLog2 = min(−checks·log₂(1 − coverage), anchorBits) · verifyLog2 = log₂(checks) · the claim is forge − verify'

/**
 * Does the unqualified slogan hold? It does not, and this says so in code.
 *
 * "Zero entropy ⇒ infinite tamper-cost" is false as an implication: reciprocity-entropy is not
 * coverage, and even at coverage = 1 the forger may attack the anchor. See ./SKILL.md.
 */
export const sloganHolds = (b: Binding): boolean => oneLaw(b).forgeLog2 === Number.POSITIVE_INFINITY
