import { describe, it, expect } from 'vitest'
import { eBySeries, eByCompounding, selfDerivative } from './index'

describe('e — the number whose rate of change is itself (the dynamic self-address)', () => {
  it('the series Σ 1/k! converges to e — finite seed, each term a sharper digit', () => {
    expect(eBySeries()).toBeCloseTo(Math.E, 12)
    expect(eBySeries(5)).not.toBeCloseTo(Math.E, 6) // early — rough
    expect(Math.abs(eBySeries(18) - Math.E)).toBeLessThan(Math.abs(eBySeries(6) - Math.E)) // sharper each fold
  })

  it('continuous compounding (1+1/n)ⁿ folds growth into itself toward e', () => {
    expect(eByCompounding(1)).toBe(2) // one fold — coarse
    expect(eByCompounding(1e7)).toBeCloseTo(Math.E, 6) // many folds — converged
    expect(Math.abs(eByCompounding(1e6) - Math.E)).toBeLessThan(Math.abs(eByCompounding(10) - Math.E))
  })

  it('SELF-DRIVEN: d/dx eˣ = eˣ — at every point the rate of change equals the state', () => {
    for (const x of [0, 1, 2.5, -1]) {
      const d = selfDerivative(x)
      expect(d.selfDriven).toBe(true)
      expect(d.rate).toBeCloseTo(d.state, 6)
    }
  })

  it('the trio closes: pi unfolds a seed, phi is its own transform, e is its own driver', () => {
    // e is NOT a fixed point of x ↦ 1 + 1/x (that is φ) — its self-reference is in the DERIVATIVE.
    expect(1 + 1 / Math.E).not.toBeCloseTo(Math.E, 2)
    expect(selfDerivative(1).selfDriven).toBe(true)
  })
})
