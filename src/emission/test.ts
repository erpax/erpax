import { describe, it, expect } from 'vitest'
import { GWP, co2e, totalCo2e, emissionFromActivity, carbonIntensity } from '@/emission'

// Asserts RELATIONS and IDENTITIES anchored to IPCC AR5 values.
// Never a free-floating magic number — every expected value is derived from the
// named constants or from composition of the exported functions themselves.

describe('emission: greenhouse-gas inventory in CO₂-equivalent', () => {
  // -------------------------------------------------------------------------
  // 1. GWP anchor values and immutability
  // -------------------------------------------------------------------------
  describe('GWP constants (IPCC AR5, 100-yr)', () => {
    it('co2 = 1 (CO₂ is the numéraire by definition)', () => {
      expect(GWP.co2).toBe(1)
    })

    it('ch4 = 28 (IPCC AR5 Table 8.A.1)', () => {
      expect(GWP.ch4).toBe(28)
    })

    it('n2o = 265 (IPCC AR5 Table 8.A.1)', () => {
      expect(GWP.n2o).toBe(265)
    })

    it('GWP is frozen — callers cannot mutate the official constants', () => {
      expect(Object.isFrozen(GWP)).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // 2. co2e — single-gas conversion
  // -------------------------------------------------------------------------
  describe('co2e(gas, mass)', () => {
    it('ch4 × 10 = 280 (10 × GWP.ch4)', () => {
      expect(co2e('ch4', 10)).toBe(10 * GWP.ch4)
      expect(co2e('ch4', 10)).toBe(280)
    })

    it('co2 is the numéraire — co2e("co2", m) = m for any m', () => {
      expect(co2e('co2', 0)).toBe(0)
      expect(co2e('co2', 1)).toBe(1)
      expect(co2e('co2', 42.5)).toBe(42.5)
      expect(co2e('co2', 100)).toBe(100 * GWP.co2)
    })

    it('unknown gas contributes 0 (not silently inflated)', () => {
      expect(co2e('unknown', 5)).toBe(0)
      expect(co2e('nf3', 99)).toBe(0)
    })

    it('n2o × 3 = 795 (3 × GWP.n2o)', () => {
      expect(co2e('n2o', 3)).toBe(3 * GWP.n2o)
      expect(co2e('n2o', 3)).toBe(795)
    })
  })

  // -------------------------------------------------------------------------
  // 3. totalCo2e — composition identity
  // -------------------------------------------------------------------------
  describe('totalCo2e(emissions)', () => {
    it('100 kg CO₂ + 10 kg CH₄ = co2e("co2",100) + co2e("ch4",10) = 380', () => {
      const result = totalCo2e([
        { gas: 'co2', mass: 100 },
        { gas: 'ch4', mass: 10 },
      ])
      // composition — not a free magic number
      const expected = co2e('co2', 100) + co2e('ch4', 10)
      expect(result).toBe(expected)
      expect(result).toBe(380)
    })

    it('empty inventory → 0', () => {
      expect(totalCo2e([])).toBe(0)
    })

    it('unknown gases are additive-neutral in the total', () => {
      const withUnknown = totalCo2e([
        { gas: 'co2', mass: 50 },
        { gas: 'nf3', mass: 999 }, // unknown → 0
      ])
      const withoutUnknown = totalCo2e([{ gas: 'co2', mass: 50 }])
      expect(withUnknown).toBe(withoutUnknown)
    })

    it('single-entry total equals co2e() directly (no rounding drift)', () => {
      expect(totalCo2e([{ gas: 'n2o', mass: 7 }])).toBe(co2e('n2o', 7))
    })
  })

  // -------------------------------------------------------------------------
  // 4. emissionFromActivity and carbonIntensity
  // -------------------------------------------------------------------------
  describe('emissionFromActivity(activity, factor)', () => {
    it('1 000 activity units × 0.5 factor = 500 CO₂e (GHG Protocol)', () => {
      expect(emissionFromActivity(1000, 0.5)).toBe(500)
    })

    it('zero activity → zero emission', () => {
      expect(emissionFromActivity(0, 0.5)).toBe(0)
    })

    it('zero factor → zero emission', () => {
      expect(emissionFromActivity(1000, 0)).toBe(0)
    })
  })

  describe('carbonIntensity(total, output)', () => {
    it('500 CO₂e / 1 000 output = 0.5 intensity', () => {
      expect(carbonIntensity(500, 1000)).toBeCloseTo(0.5)
    })

    it('output = 0 → 0 (undefined intensity, not a division error)', () => {
      expect(carbonIntensity(500, 0)).toBe(0)
    })

    it('negative output → 0 (guard)', () => {
      expect(carbonIntensity(500, -1)).toBe(0)
    })

    it('zero total → 0 intensity for any positive output', () => {
      expect(carbonIntensity(0, 1000)).toBeCloseTo(0)
    })

    it('intensity × output = total (round-trip from emissionFromActivity)', () => {
      const total = emissionFromActivity(1000, 0.5) // 500
      const output = 1000
      const intensity = carbonIntensity(total, output)
      // intensity × output should recover total (modulo float)
      expect(intensity * output).toBeCloseTo(total)
    })
  })
})
