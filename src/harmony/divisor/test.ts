import { describe, it, expect } from 'vitest'
import {
  divisorsOf432,
  latticeCoord,
  invert,
  respectedFraction,
  divisorLattice432,
  assertDivisorLattice432,
  HARMONY_ANCHOR,
} from './index'

// The domain is 20 elements, so the proof is FINITE-COMPLETE — it exhausts every divisor, never samples.
describe('harmony/divisor — the 432 divisor lattice, exact to the bit', () => {
  it('432 = 2⁴·3³ has exactly 20 divisors — the count is τ(432) = 5·4, a theorem not a measurement', () => {
    const ds = divisorsOf432()
    expect(ds).toHaveLength(20)
    expect(new Set(ds).size).toBe(20) // no duplicates
    expect(ds.every((d) => HARMONY_ANCHOR % d === 0)).toBe(true) // all genuinely divide 432
    expect(ds[0]).toBe(1)
    expect(ds[ds.length - 1]).toBe(432)
  })

  it('the lattice is C5 × C4 — each divisor is one (a,b) node, a∈0..4 b∈0..3, all 20 present', () => {
    const coords = new Set(divisorsOf432().map((d) => latticeCoord(d).join(',')))
    expect(coords.size).toBe(20)
    for (let a = 0; a <= 4; a++) for (let b = 0; b <= 3; b++) expect(coords.has(`${a},${b}`)).toBe(true)
  })

  it('the inversion φ(d)=432/d is exact: d·φ(d)=432 and φ(φ(d))=d for ALL 20 divisors — integer, no float', () => {
    for (const d of divisorsOf432()) {
      expect(d * invert(d)).toBe(HARMONY_ANCHOR) // exact product
      expect(invert(invert(d))).toBe(d) // involution
      expect(Number.isInteger(invert(d))).toBe(true) // to the bit
    }
  })

  it('the respected fraction: every d/432 reduces to the unit fraction 1/φ(d), verified WITHOUT a float', () => {
    for (const d of divisorsOf432()) {
      const f = respectedFraction(d)
      expect(f.num).toBe(1) // always a UNIT fraction
      expect(f.den).toBe(invert(d)) // denominator is the inversion
      // d/432 = 1/φ(d)  ⟺  num·432 = d·den  (integer cross-multiplication, exact)
      expect(f.num * HARMONY_ANCHOR).toBe(d * f.den)
    }
  })

  it('divisorLattice432 seals all legs and σ(432)=1240; assertDivisorLattice432 fails closed if any breaks', () => {
    const t = divisorLattice432()
    expect(t).toEqual({ divisors: 20, sigma: 1240, selfDual: true, involution: true, exactProduct: true, unitFractions: true })
    expect(() => assertDivisorLattice432()).not.toThrow()
  })
})
