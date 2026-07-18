/**
 * claim — the claiming toolbox: challenge all in src, the fastest wins the collective-mind prize.
 *
 * Every law in `src` is a claim — an `@invariant`, a `Law`, a `@standard` — and the corpus's whole discipline is
 * that a claim must be refutable ([[rules]]/refutable) and carry its proof. This toolbox turns that into an
 * arena: stake a claim, let anyone CHALLENGE it (prove or refute it), and award the fastest CORRECT challenge —
 * but only when the COLLECTIVE MIND confirms it, never a single voter.
 *
 * It is a thin layer over what is already here, not a re-derivation ([[feedback_catharsis_read_first]]):
 *
 *   - the FASTEST-CORRECT winner is [[competition]].compete — correctness is gated first (a fast WRONG challenge
 *     does not place), then speed, ties broken by content-uuid (deterministic, same solution ⇒ same id).
 *   - the COLLECTIVE MIND is [[think]].higherMind — the win is awarded only if ≥3 verifiers form a higher mind
 *     agreeing the winner is correct (`MINIMUM_MINDS`). One verifier cannot award the prize; a pair cannot break
 *     its own tie. The "collective" in "collective-mind prize" is literal.
 *
 * So the prize is not "who is loudest" or "who says yes" — it is the fastest challenge that is correct AND
 * confirmed by a quorum. Speed is only ever the tiebreaker among the correct; correctness is absolute and first
 * ([[decide]]).
 *
 * Honest boundary: this verifies RESOLUTION (the challenge actually proves or refutes), never TRUTH — a proof
 * that passes the gate can still be about the wrong thing ([[rules]]/refutable). And it awards by a quorum's
 * agreement, which is not the same as being right; it is the best a collective can do, stated in the open. The
 * fastest correct answer confirmed by three minds is what wins — not what is thereby true.
 *
 * Composes [[competition]] · [[think]] · [[decide]] · [[rules]]/refutable · [[law]].
 */
import { compete, type Candidate } from '@/competition'
import { higherMind, thoughtAddress, type Thought } from '@/think'

/** A claim staked from src — content-addressed, so the same statement is the same claim, challengeable by all. */
export interface StakedClaim {
  readonly id: string
  readonly statement: string
  /** the src path / atom the claim lives in — challenge all in src. */
  readonly source: string
}

/** Stake a claim: content-address its statement (deterministic — same claim, same id, no clock). */
export function stake(statement: string, source: string): StakedClaim {
  return { id: thoughtAddress('claim:' + statement), statement, source }
}

/** A challenge IS a competition Candidate — a proof/refutation, gate-verified `correct`, with a solve `cost` (speed). */
export type Challenge = Candidate

/** The collective-mind prize — the fastest correct challenge, if the collective confirms it. */
export interface Prize {
  readonly claimId: string
  /** the winning challenger's agent-uuid, or null if none won. */
  readonly winner: string | null
  /** true iff a fastest-correct challenge exists AND ≥3 verifiers form a higher mind agreeing it is correct. */
  readonly awarded: boolean
  readonly reason: string
}

/**
 * Award the collective-mind prize for a claim. The fastest CORRECT challenge wins the lead ([[competition]]);
 * the win is awarded only if the collective mind confirms it — ≥3 verifier verdicts forming a higher mind whose
 * majority says the winner is correct ([[think]].higherMind).
 *
 * @invariant a fast INCORRECT challenge never wins — correctness is gated first (competition)
 * @invariant the prize is awarded only by a collective of ≥3 — fewer cannot form the higher mind (MINIMUM_MINDS)
 * @invariant no correct challenge ⇒ no winner; no quorum ⇒ no award, even with a correct winner
 */
export function award(claim: StakedClaim, challenges: readonly Challenge[], verifierVerdicts: readonly boolean[]): Prize {
  const { winner } = compete(challenges) // fastest correct — correctness absolute and first
  if (!winner) return { claimId: claim.id, winner: null, awarded: false, reason: 'no correct challenge — nothing to award' }
  const minds: Thought<boolean>[] = verifierVerdicts.map((v, i) => ({ value: v, cached: false, address: thoughtAddress('verifier:' + i) }))
  const h = higherMind(minds)
  const awarded = h.formed && h.resolved === true
  return {
    claimId: claim.id,
    winner: awarded ? winner.agentUuid : null,
    awarded,
    reason: awarded
      ? `awarded to ${winner.agentUuid} — fastest correct (cost ${winner.cost}), confirmed by the collective mind (${h.minds} minds)`
      : h.formed
        ? `withheld — the collective mind formed but did NOT confirm the winner correct (${h.reason})`
        : `withheld — no collective mind: ${h.reason}`,
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const c = stake('debits equal credits', 'src/double/entry/validator')
  const chal = (agent: string, correct: boolean, cost: number): Challenge => ({
    agentUuid: agent, problemUuid: c.id, solutionUuid: thoughtAddress(agent + cost), correct, cost, approach: agent,
  })
  console.log('claim — challenge all in src; the fastest wins the collective-mind prize:\n')
  const fast = award(c, [chal('slow-correct', true, 9), chal('fast-wrong', false, 1), chal('fast-correct', true, 3)], [true, true, true])
  console.log('  ' + fast.reason)
  const noQuorum = award(c, [chal('fast-correct', true, 3)], [true]) // one verifier — no collective
  console.log('  ' + noQuorum.reason)
  console.log('\n  fastest CORRECT wins (a fast wrong answer does not place); the prize needs a collective of ≥3.')
}
