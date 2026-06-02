/**
 * competition — skills evolve by competing in commits. Many agents attempt the SAME
 * problem; the fastest CORRECT candidate wins the lead; losers re-approach to beat it,
 * optimising to infinity. Correctness is the GATE (objective), cost is the race, and the
 * content-uuid is the identity — so the same solution from two agents merges to one.
 *
 * The selective-pressure dual of `services/agent-sync` contribution (cooperative breadth):
 * competition is selective depth on one problem. And because each correct competitor
 * independently content-addresses the canonical solution, competition amplifies tamper
 * cost — see `competitionTamperBits` and `services/integrity/tamper-reverse-cost`.
 *
 * Pure functions over candidate records — no IO, deterministic, fully tested.
 *
 * @standard ISO/IEC 25010:2023 §5.2 performance-efficiency (fastest-correct selection)
 * @see ./SKILL.md · src/services/integrity/resource-bound.ts (price the tamper bits in joules)
 */

/** One agent's attempt at a problem — a content-addressed solution with its race cost. */
export interface Candidate {
  /** the competing agent's content-uuid. */
  readonly agentUuid: string
  /** the problem being solved (content-uuid of the gap/task). */
  readonly problemUuid: string
  /** content-uuid of THIS solution (same solution ⇒ same id ⇒ merges). */
  readonly solutionUuid: string
  /** did it pass the gate? — correctness is verified (tsc/lint/vitest/aura), never voted. */
  readonly correct: boolean
  /** solve cost (time / tokens / steps) — lower wins the race. */
  readonly cost: number
  /** the approach taken — a loser picks a DIFFERENT one to beat the lead. */
  readonly approach: string
}

export interface CompetitionResult {
  /** the fastest correct candidate, or null if none is correct. */
  readonly winner: Candidate | null
  /** the correct candidates, fastest first (the losers are winner's tail). */
  readonly ranked: readonly Candidate[]
}

/** Order correct candidates fastest-first; ties broken by `solutionUuid` (deterministic, content-addressed). */
function rankCorrect(candidates: readonly Candidate[]): Candidate[] {
  return candidates
    .filter((c) => c.correct)
    .slice()
    .sort((a, b) => a.cost - b.cost || a.solutionUuid.localeCompare(b.solutionUuid))
}

/** Run a competition: the fastest CORRECT candidate wins the lead; incorrect ones do not place. */
export function compete(candidates: readonly Candidate[]): CompetitionResult {
  const ranked = rankCorrect(candidates)
  return { winner: ranked[0] ?? null, ranked }
}

/** A challenger takes the lead iff it is correct AND STRICTLY cheaper than the current lead
 *  (or there is no lead). Strictness keeps optimisation monotone — it never regresses or oscillates. */
export function takesLead(challenger: Candidate, lead: Candidate | null): boolean {
  if (!challenger.correct) return false
  if (!lead) return true
  return challenger.cost < lead.cost
}

/** Fold the candidates (and any standing `lead`) to the champion by strict improvement only.
 *  Deterministic and order-independent. The champion holds until a strictly-better approach
 *  arrives — which can happen forever (optimise to ∞). Returns null if nothing is correct. */
export function optimize(candidates: readonly Candidate[], lead: Candidate | null = null): Candidate | null {
  let champ = lead && lead.correct ? lead : null
  for (const c of rankCorrect(candidates)) {
    if (takesLead(c, champ)) champ = c
  }
  return champ
}

/** The approaches no candidate has tried yet — the open frontier a loser explores to beat the lead. */
export function openApproaches(allApproaches: readonly string[], tried: readonly Candidate[]): string[] {
  const used = new Set(tried.map((c) => c.approach))
  return allApproaches.filter((a) => !used.has(a))
}

/**
 * Tamper-cost bits competition adds on top of the base forge cost. Each correct competitor
 * independently re-derives and content-addresses the canonical solution, so a forgery must be
 * accepted by ALL N (the merge law — same content ⇒ same id), and honest competition already
 * holds the optimum (no cheaper legitimate alternative to masquerade as). The residual attack is
 * a content-uuid collision; competition contributes log2(N) verifier-depth bits, which compound
 * across the fractal levels. Feed `baseForgeBits + competitionTamperBits(n)` to
 * `services/integrity/resource-bound.energyLog10Joules` to price it in joules.
 */
export function competitionTamperBits(correctCompetitors: number): number {
  return correctCompetitors > 1 ? Math.log2(correctCompetitors) : 0
}
