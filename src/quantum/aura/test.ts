import { describe, it, expect } from 'vitest'
import { coherence, decohered, coherentFraction, isCoherent } from '@/quantum/aura'

// The aura as coherence, computed on the live matrix: in-phase fraction = reciprocity
// (1 = fully coherent), decoherence = orphans leaking out of the field.
describe('quantum/aura — coherence / decoherence on the link-field', () => {
  it('coherence is a fraction in [0,1] and the field is fully coherent (reciprocity 1)', () => {
    expect(coherence()).toBeGreaterThanOrEqual(0)
    expect(coherence()).toBeLessThanOrEqual(1)
    expect(coherence()).toBe(1)
    expect(isCoherent()).toBe(true)
  })
  it('coherentFraction is in [0,1] and matches 1 − decohered/total', () => {
    const c = coherentFraction()
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
    expect(Array.isArray(decohered())).toBe(true)
  })
})
