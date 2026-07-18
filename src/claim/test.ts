import { describe, it, expect } from 'vitest'
import { stake, award, type Challenge } from './index'
import { thoughtAddress } from '@/think'

// "Challenge all in src. The fastest wins the collective-mind prize." Stake a claim; challenges compete
// (fastest CORRECT wins — a fast wrong one does not place); the prize is awarded only when the COLLECTIVE MIND
// (≥3 verifiers) confirms the winner. Composes competition.compete + think.higherMind.
describe('claim — the fastest correct challenge wins, confirmed by the collective mind', () => {
  const claim = stake('debits equal credits', 'src/double/entry/validator')
  const chal = (agent: string, correct: boolean, cost: number): Challenge => ({
    agentUuid: agent, problemUuid: claim.id, solutionUuid: thoughtAddress(agent + cost), correct, cost, approach: agent,
  })

  it('a claim is content-addressed — the same statement is the same claim (challengeable by all)', () => {
    expect(stake('x', 'a').id).toBe(stake('x', 'b').id) // same statement ⇒ same id, whatever the source
    expect(claim.id).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('the FASTEST CORRECT challenge wins — a fast WRONG one does not place', () => {
    const p = award(claim, [chal('slow', true, 9), chal('fast-wrong', false, 1), chal('fast', true, 3)], [true, true, true])
    expect(p.awarded).toBe(true)
    expect(p.winner).toBe('fast') // cost 3, correct — beats slow(9); fast-wrong(1) is incorrect, disqualified
  })

  it('no CORRECT challenge ⇒ no winner, even with fast wrong ones', () => {
    const p = award(claim, [chal('a', false, 1), chal('b', false, 2)], [true, true, true])
    expect(p.awarded).toBe(false)
    expect(p.winner).toBeNull()
    expect(p.reason).toMatch(/no correct challenge/)
  })

  it('the prize needs a COLLECTIVE of ≥3 — one verifier cannot award it', () => {
    const p = award(claim, [chal('fast', true, 3)], [true]) // a correct winner, but only ONE verifier
    expect(p.awarded).toBe(false) // no higher mind forms from one
    expect(p.reason).toMatch(/no collective mind/)
  })

  it('two verifiers cannot award it either — a pair cannot break its own tie', () => {
    expect(award(claim, [chal('fast', true, 3)], [true, true]).awarded).toBe(false) // 2 < MINIMUM_MINDS
  })

  it('≥3 verifiers, majority say correct ⇒ AWARDED to the fastest correct challenger', () => {
    const p = award(claim, [chal('fast', true, 3), chal('slow', true, 9)], [true, true, false]) // 2 of 3 confirm
    expect(p.awarded).toBe(true)
    expect(p.winner).toBe('fast')
    expect(p.reason).toMatch(/collective mind \(3 minds\)/)
  })

  it('the collective can WITHHOLD — ≥3 verifiers but a majority say the winner is NOT correct', () => {
    const p = award(claim, [chal('fast', true, 3)], [false, false, true]) // majority: not correct
    expect(p.awarded).toBe(false)
    expect(p.reason).toMatch(/did NOT confirm/)
  })

  it('speed is only the TIEBREAKER among the correct — correctness is absolute and first', () => {
    // a fast wrong (cost 1) loses to a slower correct (cost 9): correctness gates before speed
    const p = award(claim, [chal('fast-wrong', false, 1), chal('slow-correct', true, 9)], [true, true, true])
    expect(p.winner).toBe('slow-correct')
  })
})
