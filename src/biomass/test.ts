import { describe, it, expect } from 'vitest'
import {
  standingStock,
  fairValue,
  biologicalTransformation,
  meanAnnualIncrement,
  stockingDensity,
} from '@/biomass'

// biomass computed from its defining formulas (./index.ts). Asserts RELATIONS and
// IDENTITIES — never opaque magic numbers: every expected value is expressed as its
// formula so the invariant is self-documenting.
describe('biomass: IAS-41 living-stock accounting and forestry growth measures', () => {
  describe('standingStock', () => {
    it('1000 individuals × 2.5 kg mean mass = 2500 kg', () => {
      expect(standingStock(1_000, 2.5)).toBe(2_500)
    })

    it('standingStock(n, m) === n * m (is exactly the product)', () => {
      const n = 1_000
      const m = 2.5
      expect(standingStock(n, m)).toBe(n * m)
    })

    it('standingStock(0, m) === 0 (empty stock has zero mass)', () => {
      expect(standingStock(0, 5)).toBe(0)
    })
  })

  describe('fairValue (IAS-41: mass × forward price − costs to sell)', () => {
    it('fairValue(2500, 4, 500) === 9500', () => {
      expect(fairValue(2_500, 4, 500)).toBe(9_500)
    })

    it('fairValue(m, p, c) === m*p − c (formula, not magic)', () => {
      const m = 2_500
      const p = 4
      const c = 500
      expect(fairValue(m, p, c)).toBe(m * p - c)
    })

    it('fairValue(m, p, 0) === m*p (zero costs leaves gross value)', () => {
      const m = 2_500
      const p = 4
      expect(fairValue(m, p, 0)).toBe(m * p)
    })

    it('fairValue can be negative when costs exceed gross value (liability recognition)', () => {
      // costs > mass × price ⇒ negative fair value
      expect(fairValue(100, 1, 200)).toBeLessThan(0)
    })
  })

  describe('biologicalTransformation (signed mass change, IAS-41 split)', () => {
    it('growth: biologicalTransformation(100, 140) === 40', () => {
      expect(biologicalTransformation(100, 140)).toBe(40)
    })

    it('mortality drawdown: biologicalTransformation(140, 100) === -40 (signed)', () => {
      expect(biologicalTransformation(140, 100)).toBe(-40)
    })

    it('biologicalTransformation(a, b) === b − a (antisymmetric by construction)', () => {
      const a = 100
      const b = 140
      expect(biologicalTransformation(a, b)).toBe(b - a)
      expect(biologicalTransformation(b, a)).toBe(a - b)
    })

    it('biologicalTransformation(m, m) === 0 (no change = zero transformation)', () => {
      expect(biologicalTransformation(75, 75)).toBe(0)
    })
  })

  describe('meanAnnualIncrement (forestry MAI = volume / age, FAO)', () => {
    it('MAI(300 m³, 30 yr) === 10 m³/yr', () => {
      expect(meanAnnualIncrement(300, 30)).toBe(10)
    })

    it('MAI(v, 0) === 0 (age ≤ 0 is undefined — returns zero)', () => {
      expect(meanAnnualIncrement(300, 0)).toBe(0)
    })

    it('MAI(v, age) === 0 for negative age', () => {
      expect(meanAnnualIncrement(300, -5)).toBe(0)
    })

    it('MAI(v, age) === v / age for age > 0 (formula identity)', () => {
      const v = 600
      const age = 40
      expect(meanAnnualIncrement(v, age)).toBeCloseTo(v / age, 10)
    })
  })

  describe('stockingDensity (biomass / area — carrying-capacity measure)', () => {
    it('stockingDensity(2500, 1000) ≈ 2.5 kg/m²', () => {
      expect(stockingDensity(2_500, 1_000)).toBeCloseTo(2.5, 10)
    })

    it('stockingDensity(b, 0) === 0 (undefined area — returns zero)', () => {
      expect(stockingDensity(2_500, 0)).toBe(0)
    })

    it('stockingDensity(b, area) === 0 for negative area', () => {
      expect(stockingDensity(2_500, -1)).toBe(0)
    })

    it('stockingDensity(b, a) === b / a for a > 0 (formula identity)', () => {
      const b = 5_000
      const a = 2_000
      expect(stockingDensity(b, a)).toBeCloseTo(b / a, 10)
    })
  })
})
