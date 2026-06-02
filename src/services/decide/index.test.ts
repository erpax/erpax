import { describe, it, expect } from 'vitest'
import { decide, type SocietyCandidate } from './index'

const cand = (over: Partial<SocietyCandidate>): SocietyCandidate => ({
  agentUuid: 'agent',
  problemUuid: 'problem',
  solutionUuid: 'sol',
  correct: true,
  cost: 1,
  approach: 'x',
  harmonic: true,
  ledger: { kind: 'ai', output: { productivity: 10, creativity: 0 }, cost: 1 },
  ...over,
})

describe('decide — the society chooses: correct · harmonic · efficient', () => {
  it('keeps only correct candidates; none correct ⇒ no winner', () => {
    expect(decide([cand({ solutionUuid: 'a', correct: false })])).toBeNull()
    expect(decide([])).toBeNull()
  })

  it('prefers harmonic over a more-efficient disharmonic candidate', () => {
    const harmonic = cand({ solutionUuid: 'harm', harmonic: true, ledger: { kind: 'ai', output: { productivity: 5, creativity: 0 }, cost: 1 } })
    const efficientButDisharmonic = cand({ solutionUuid: 'dis', harmonic: false, ledger: { kind: 'ai', output: { productivity: 100, creativity: 0 }, cost: 1 } })
    expect(decide([efficientButDisharmonic, harmonic])?.solutionUuid).toBe('harm')
  })

  it('among harmonic candidates, picks the most efficient (then cheapest, then uuid)', () => {
    const a = cand({ solutionUuid: 'a', ledger: { kind: 'ai', output: { productivity: 10, creativity: 0 }, cost: 5 } }) // eff 2
    const b = cand({ solutionUuid: 'b', ledger: { kind: 'ai', output: { productivity: 10, creativity: 0 }, cost: 2 } }) // eff 5
    expect(decide([a, b])?.solutionUuid).toBe('b')
  })

  it('falls back to all-correct when none are harmonic; deterministic tie-break by uuid', () => {
    const d1 = cand({ solutionUuid: 'zzz', harmonic: false, cost: 2 })
    const d2 = cand({ solutionUuid: 'aaa', harmonic: false, cost: 2 }) // equal efficiency + cost ⇒ uuid wins
    expect(decide([d1, d2])?.solutionUuid).toBe('aaa')
  })
})
