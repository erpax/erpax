/**
 * governance — society manages erpax (the half that closes the circle).
 *
 * erpax manages society: the transparent ledger, anti-corruption, the COFOG
 * functions operate the public layer. But a formal system cannot generate its
 * own finality or judgment (the design limit). So the judgment is supplied from
 * OUTSIDE the formalism — by SOCIETY, through governance. A `tally` of the
 * typeless polity's votes IS the decision erpax could not make internally; it
 * becomes the binding change to erpax's own rules/skills/budget/config. The
 * governed govern the governor — a self-governing commons, not a technocracy.
 *
 * The same invariants that foreclose corruption foreclose ballot-fraud: one
 * voter ⇒ one vote (content-uuid dedup — no stuffing), the observer POV makes
 * the count public (transparency), quorum + threshold are the conservation
 * rule. Pure → testable.
 *
 * @standard ISO 37000:2021 governance-of-organizations
 * @compliance one-person-one-vote (Venice Commission Code of Good Practice in Electoral Matters)
 */

export type Vote = 'for' | 'against' | 'abstain'

export interface Ballot {
  /** the typeless citizen casting it. */
  voter: string
  vote: Vote
}

export interface ProposalRule {
  /** minimum turnout fraction of the electorate for the vote to count (0..1). */
  quorum: number
  /** minimum approval fraction of (for + against) to pass (0..1). */
  threshold: number
}

export interface Verdict {
  ratified: boolean
  reason: string
  for: number
  against: number
  abstain: number
  /** distinct voters / electorate. */
  turnout: number
  /** for / (for + against); 0 when no decisive votes. */
  approval: number
}

/**
 * Tally the polity's ballots into the binding decision. One voter, one vote
 * (later ballot by the same voter REPLACES the earlier — the content-uuid law:
 * a vote's identity is voter+proposal, so a re-vote is the same node updated,
 * never a second). Ratified iff quorum met AND approval ≥ threshold.
 */
export function tally(ballots: ReadonlyArray<Ballot>, electorate: number, rule: ProposalRule): Verdict {
  // one-person-one-vote: last ballot per voter wins (no double-counting / stuffing)
  const byVoter = new Map<string, Vote>()
  for (const b of ballots) byVoter.set(b.voter, b.vote)

  let forV = 0
  let against = 0
  let abstain = 0
  for (const v of byVoter.values()) {
    if (v === 'for') forV++
    else if (v === 'against') against++
    else abstain++
  }

  const turnout = electorate > 0 ? byVoter.size / electorate : 0
  const decisive = forV + against
  const approval = decisive > 0 ? forV / decisive : 0

  if (turnout < rule.quorum) {
    return { ratified: false, reason: 'quorum not met', for: forV, against, abstain, turnout, approval }
  }
  if (approval < rule.threshold) {
    return { ratified: false, reason: 'approval below threshold', for: forV, against, abstain, turnout, approval }
  }
  return { ratified: true, reason: 'ratified by the polity', for: forV, against, abstain, turnout, approval }
}
