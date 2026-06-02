import { describe, it, expect } from 'vitest'
import { compete, takesLead, optimize, openApproaches, competitionTamperBits, type Candidate } from './index'

const c = (over: Partial<Candidate>): Candidate => ({
  agentUuid: 'agent',
  problemUuid: 'problem',
  solutionUuid: 'sol',
  correct: true,
  cost: 1,
  approach: 'x',
  ...over,
})

describe('competition — fastest correct wins, optimise to ∞, tamper-cost amplifier', () => {
  it('compete: the fastest CORRECT candidate wins; incorrect ones do not place', () => {
    const fast = c({ solutionUuid: 'fast', cost: 3 })
    const slow = c({ solutionUuid: 'slow', cost: 9 })
    const wrong = c({ solutionUuid: 'wrong', cost: 1, correct: false }) // cheapest but incorrect ⇒ excluded
    const r = compete([slow, wrong, fast])
    expect(r.winner?.solutionUuid).toBe('fast')
    expect(r.ranked.map((x) => x.solutionUuid)).toEqual(['fast', 'slow']) // correct only, fastest first
    expect(compete([wrong]).winner).toBeNull()
    expect(compete([]).winner).toBeNull()
  })

  it('compete: ties broken deterministically by content-uuid (never by order or recency)', () => {
    const a = c({ solutionUuid: 'aaa', cost: 5 })
    const b = c({ solutionUuid: 'bbb', cost: 5 })
    expect(compete([b, a]).winner?.solutionUuid).toBe('aaa')
    expect(compete([a, b]).winner?.solutionUuid).toBe('aaa') // order-independent
  })

  it('takesLead: only a correct AND strictly-cheaper challenger unseats the lead', () => {
    const lead = c({ cost: 5 })
    expect(takesLead(c({ cost: 4 }), lead)).toBe(true) // cheaper
    expect(takesLead(c({ cost: 5 }), lead)).toBe(false) // equal ⇒ lead holds (strict)
    expect(takesLead(c({ cost: 1 }), lead)).toBe(true)
    expect(takesLead(c({ cost: 1, correct: false }), lead)).toBe(false) // must be correct
    expect(takesLead(c({ cost: 9 }), null)).toBe(true) // no lead yet
  })

  it('optimize: monotone improvement to a champion; the lead holds until strictly beaten', () => {
    const lead = c({ solutionUuid: 'lead', cost: 5 })
    expect(optimize([c({ solutionUuid: 'worse', cost: 8 }), c({ solutionUuid: 'tie', cost: 5 })], lead)?.solutionUuid).toBe('lead')
    expect(optimize([c({ solutionUuid: 'better', cost: 2 })], lead)?.solutionUuid).toBe('better')
    expect(optimize([c({ correct: false, cost: 1 })], null)).toBeNull()
    // order-independent on the candidate set
    const set = [c({ solutionUuid: 'x', cost: 7 }), c({ solutionUuid: 'y', cost: 3 }), c({ solutionUuid: 'z', cost: 6 })]
    expect(optimize(set)?.solutionUuid).toBe('y')
    expect(optimize([...set].reverse())?.solutionUuid).toBe('y')
  })

  it('openApproaches: the frontier a loser explores is whatever no candidate has tried', () => {
    const tried = [c({ approach: 'greedy' }), c({ approach: 'dp' })]
    expect(openApproaches(['greedy', 'dp', 'divide-conquer', 'random'], tried)).toEqual(['divide-conquer', 'random'])
  })

  it('competitionTamperBits: zero for ≤1 competitor, log2(N) and monotone increasing beyond', () => {
    expect(competitionTamperBits(0)).toBe(0)
    expect(competitionTamperBits(1)).toBe(0)
    expect(competitionTamperBits(2)).toBeCloseTo(1, 10)
    expect(competitionTamperBits(8)).toBeCloseTo(3, 10)
    expect(competitionTamperBits(16)).toBeGreaterThan(competitionTamperBits(8)) // more competition ⇒ more cost
  })
})
