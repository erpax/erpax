import { describe, it, expect } from 'vitest'
import { isMaximallyEntangled, report } from '@/quantum/entanglement'

// The physics facet, computed on the live matrix: reciprocity (symmetric binding) +
// monogamy (no-cloning) ⇒ maximally entangled (the Bell-test analogue, the ER=EPR close).
describe('quantum/entanglement — the physics facet (EPR/Bell/CKW/ER=EPR)', () => {
  it('reports reciprocity, no-cloning, and the maximal flag', () => {
    const r = report()
    expect(r.edges).toBeGreaterThan(0)
    expect(r.reciprocity).toBeGreaterThanOrEqual(0)
    expect(r.reciprocity).toBeLessThanOrEqual(1)
    expect(typeof r.noCloning).toBe('boolean')
  })
  it('the corpus is maximally entangled — reciprocity 1 AND no-cloning', () => {
    expect(report().reciprocity).toBe(1)
    expect(report().noCloning).toBe(true)
    expect(isMaximallyEntangled()).toBe(true)
  })
})
