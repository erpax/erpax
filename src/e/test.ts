import { E as HOST_E } from '@/algebra'
import { describe, it, expect } from 'vitest'
import { eBySeries, eByCompounding, selfDerivative } from './index'

const abs0 = (x: number) => (x < 0 ? -x : x)
/**
 * Oracle = deep series — never host E. The host constant is imported under an explicit alias so the
 * two can be COMPARED without the local oracle being shadowed by it: naming both `E` made the import
 * and the derivation collide, and a suite that cannot name both cannot check one against the other.
 */
const E = eBySeries(24)

describe('e — the number whose rate of change is itself (the dynamic self-address)', () => {
  it('the derived oracle agrees with the host constant — derived, then CHECKED against it', () => {
    // the oracle is the series, never the host value; but the two must agree, and asserting that is
    // what makes importing the host constant worth doing rather than decoration
    expect(E).toBeCloseTo(HOST_E, 12)
    expect(E).not.toBe(HOST_E) // computed, not copied
  })

  it('the series Σ 1/k! converges to e — finite seed, each term a sharper digit', () => {
    expect(eBySeries()).toBeCloseTo(E, 12)
    expect(eBySeries(5)).not.toBeCloseTo(E, 6)
    expect(abs0(eBySeries(18) - E)).toBeLessThan(abs0(eBySeries(6) - E))
  })

  it('continuous compounding (1+1/n)ⁿ folds growth into itself toward e', () => {
    expect(eByCompounding(1)).toBe(2)
    expect(eByCompounding(1e7)).toBeCloseTo(E, 6)
    expect(abs0(eByCompounding(1e6) - E)).toBeLessThan(abs0(eByCompounding(10) - E))
  })

  it('SELF-DRIVEN: d/dx eˣ = eˣ — at every point the rate of change equals the state', () => {
    for (const x of [0, 1, 2.5, -1]) {
      const d = selfDerivative(x)
      expect(d.selfDriven).toBe(true)
      expect(d.rate).toBeCloseTo(d.state, 5)
    }
  })

  it('the trio closes: pi unfolds a seed, phi is its own transform, e is its own driver', () => {
    expect(1 + 1 / E).not.toBeCloseTo(E, 2)
    expect(selfDerivative(1).selfDriven).toBe(true)
  })
})
