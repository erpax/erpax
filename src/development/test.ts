import { describe, it, expect } from 'vitest'
import { ranked, nextMove, atTier, type Roadmap } from '@/development'

const r: Roadmap = [
  { name: 'research-x', what: '', feasibility: 'research', composes: [] },
  { name: 'now-x', what: '', feasibility: 'now', composes: [] },
  { name: 'near-x', what: '', feasibility: 'near', composes: [] },
]

describe('development — a feasibility-ranked roadmap of capabilities', () => {
  it('ranked orders now → near → research', () => {
    expect(ranked(r).map((d) => d.feasibility)).toEqual(['now', 'near', 'research'])
  })
  it('nextMove is the highest-feasibility development; undefined for an empty roadmap', () => {
    expect(nextMove(r)?.name).toBe('now-x')
    expect(nextMove([])).toBeUndefined()
  })
  it('atTier filters by feasibility', () => {
    expect(atTier(r, 'research').map((d) => d.name)).toEqual(['research-x'])
  })
})
