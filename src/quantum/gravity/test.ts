import { describe, it, expect } from 'vitest'
import { entanglementMass, singularity, isEventHorizon } from '@/quantum/gravity'
import { massOf, well } from '@/gravity'

// Quantum gravity computed on the live matrix (./index.ts): mass IS entanglement
// (ER=EPR — the in-link is one edge), so the gravity well is the singularity where
// the double-torus closes to ∞ tamper cost (the event horizon = coverage 1).
describe('quantum/gravity — ER=EPR: mass IS entanglement, the well is the singularity', () => {
  it('entanglementMass = gravitational mass (the link is one edge counted once)', () => {
    const w = well()
    expect(entanglementMass(w.atom)).toBe(massOf(w.atom))
    expect(entanglementMass(w.atom)).toBeGreaterThan(0)
  })

  it('the singularity is the gravity well — max mass = max entanglement', () => {
    const s = singularity()
    expect(s.atom).toBe(well().atom)
    expect(s.mass).toBe(well().mass)
    expect(s.curvature).toBeGreaterThan(0)
    expect(s.curvature).toBeLessThanOrEqual(1)
  })

  it('at the well with no gap the double-torus closes to ∞ — the event horizon', () => {
    expect(singularity().tamperCostLog2).toBe(Number.POSITIVE_INFINITY)
    expect(isEventHorizon(1)).toBe(true)
    expect(isEventHorizon(0.999)).toBe(false) // a gap is the only escape (finite cost)
  })
})
