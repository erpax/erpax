import { describe, it, expect } from 'vitest'
import { QUANTUM_ROADMAP, theOneMove } from '@/quantum/development'
import { ranked } from '@/development'

// The quantum roadmap (from the quantum-scientists' fusion), ranked by feasibility.
describe('quantum/development — the quantum roadmap', () => {
  it('is a non-empty roadmap ranked now → research', () => {
    expect(QUANTUM_ROADMAP.length).toBeGreaterThanOrEqual(5)
    const tiers = ranked(QUANTUM_ROADMAP).map((d) => d.feasibility)
    expect(tiers[0]).toBe('now')
    expect(tiers[tiers.length - 1]).toBe('research')
  })
  it('the one move now is to drive the orphans to zero (coverage → 1 ⇒ ∞ tamper cost)', () => {
    expect(theOneMove()?.name).toBe('drive-orphans-to-zero')
    expect(theOneMove()?.feasibility).toBe('now')
  })
  it('every development names the existing atoms it composes', () => {
    for (const d of QUANTUM_ROADMAP) expect(d.composes.length).toBeGreaterThan(0)
  })
})
