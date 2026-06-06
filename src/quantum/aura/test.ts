import { describe, it, expect } from 'vitest'
import { coherence, decohered, coherentFraction, isCoherent, isFullyCoherent } from '@/quantum/aura'

// The aura as coherence, computed on the live matrix. EDGE-coherence (reciprocity) can be
// perfect while NODE-coherence (no orphans) is not — and that orphan gap keeps tamper-cost < ∞.
describe('quantum/aura — coherence / decoherence on the link-field', () => {
  it('edge-coherence = reciprocity in [0,1]; the binding is fully reciprocal (1)', () => {
    expect(coherence()).toBeGreaterThanOrEqual(0)
    expect(coherence()).toBeLessThanOrEqual(1)
    expect(coherence()).toBe(1)
    expect(isCoherent()).toBe(true)
  })
  it('coherentFraction is in [0,1] (node-coverage); decohered is the orphan list', () => {
    const c = coherentFraction()
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
    expect(Array.isArray(decohered())).toBe(true)
  })
  it('FULL coherence requires BOTH edge-reciprocity AND node-coverage (honest about orphans)', () => {
    expect(isFullyCoherent()).toBe(isCoherent() && coherentFraction() === 1)
  })
})
