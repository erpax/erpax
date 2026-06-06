import { describe, it, expect } from 'vitest'
import { singularity, isEventHorizon, noHair } from '@/singularity'
import { well } from '@/gravity'

// The well/horizon computed on the live matrix: the deepest gravity well, the ∞
// tamper cost at coverage 1 (the event horizon), the no-hair surviving invariant.
describe('singularity — the gravity well, the event horizon, no-hair', () => {
  it('the singularity is the deepest gravity well (max mass = max entanglement)', () => {
    const s = singularity()
    expect(s.atom).toBe(well().atom)
    expect(s.mass).toBe(well().mass)
    expect(s.mass).toBeGreaterThan(0)
  })
  it('curvature (Gini of the mass) is in (0,1]', () => {
    const c = singularity().curvature
    expect(c).toBeGreaterThan(0)
    expect(c).toBeLessThanOrEqual(1)
  })
  it('the event horizon: coverage 1 (no gap) closes the double-torus to ∞ (cosmic censor)', () => {
    expect(singularity().tamperCostLog2).toBe(Number.POSITIVE_INFINITY)
    expect(isEventHorizon(1)).toBe(true)
    expect(isEventHorizon(0.999)).toBe(false)
  })
  it('no-hair: the only surviving invariant is the well atom (its content identity)', () => {
    expect(noHair()).toBe(well().atom)
  })
})
