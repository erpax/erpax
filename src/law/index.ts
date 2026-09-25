import { algebraLog2, exactMax, exactMin } from '@/algebra'
import {
  CONFIRM_GATE_CHECKS,
  coverageCostLog2,
  invariantChecks,
  replicationChecks,
  secondPreimageLog2,
  tamperEvasionProbability,
} from '@/cost/bits'

/** law — the one law, strictly formulated. See ./SKILL.md. */
export const WORD = 'law' as const
export const atomPath = 'law' as const

/** The graph a forgery must re-harmonise with. Every field is measured, never assumed. */
export interface Binding {
  readonly coverage: number
  readonly checks?: number
  /** Weakest EXTERNAL commitment, in bits — a CEILING the slogan omits. See ./SKILL.md. */
  readonly anchorBits: number
  readonly replicas?: number
  readonly strongConsistency?: boolean
  readonly invariants?: number
}

export interface LawVerdict {
  readonly forgeLog2: number
  readonly verifyLog2: number
  /** forge − verify. THIS is the claim. */
  readonly asymmetryLog2: number
  readonly cappedByAnchor: boolean
  readonly evasionProbability: number
  readonly effectiveChecks: number
}

/**
 * `forgeLog2 = min(−checks·log₂(1−coverage), anchorBits)`. See ./SKILL.md.
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
  // −checks·log₂(1 − 0) is IEEE −0, and negative work is meaningless. See ./SKILL.md.
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

/** Does the unqualified slogan hold? It does not — see ./SKILL.md. */
export const sloganHolds = (b: Binding): boolean => oneLaw(b).forgeLog2 === Number.POSITIVE_INFINITY
