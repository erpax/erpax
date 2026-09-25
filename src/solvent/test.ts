import { describe, it, expect } from 'vitest'
import {
  ANTOINE_PCE,
  GAS_CONSTANT,
  arrheniusRate,
  atomPath,
  boilingPointK,
  equilibriumRatio,
  firstOrderDecay,
  halfLifeSeconds,
  solventBalance,
  vapourPressure,
} from '@/solvent'
import { atomAddress } from '@/atom/address'

describe('solvent — the atom', () => {
  it('lives where it says it lives', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })
})

/**
 * The Antoine coefficients are RECEIVED. The check that they are the right ones is
 * that they reproduce a value measured independently of them: PCE's vapour pressure
 * at 25 °C is ~2.47 kPa (18.5 mmHg) in every handbook, and the correlation is not
 * fitted there — 298.15 K sits BELOW Polak's interval. Agreeing anyway is evidence
 * the coefficients were transcribed correctly.
 */
describe('solvent — Antoine, against a value measured outside its own fit', () => {
  it('reproduces the handbook vapour pressure of PCE at 25 °C', () => {
    const r = vapourPressure(ANTOINE_PCE, 298.15)
    expect(r.pressureBar * 100).toBeGreaterThan(2.3) // kPa
    expect(r.pressureBar * 100).toBeLessThan(2.6)
    expect(r.species).toBe('tetrachloroethylene')
  })

  it('says when it was asked outside the interval it was fitted on', () => {
    expect(vapourPressure(ANTOINE_PCE, 298.15).extrapolated).toBe(true) // below 301.03 K
    expect(vapourPressure(ANTOINE_PCE, 350).extrapolated).toBe(false)
    expect(vapourPressure(ANTOINE_PCE, 400).extrapolated).toBe(true) // above 380.84 K
    expect(ANTOINE_PCE.minK).toBeLessThan(ANTOINE_PCE.maxK)
    expect(ANTOINE_PCE.source).toContain('NIST')
  })

  it('rises with temperature — monotone, as a vapour pressure must be', () => {
    let previous = 0
    for (const t of [305, 320, 340, 360, 380]) {
      const p = vapourPressure(ANTOINE_PCE, t).pressureBar
      expect(p).toBeGreaterThan(previous)
      previous = p
    }
  })

  it('inverts: the boiling point at a pressure is the temperature that makes it', () => {
    for (const t of [310, 340, 375]) {
      const p = vapourPressure(ANTOINE_PCE, t).pressureBar
      expect(boilingPointK(ANTOINE_PCE, p)).toBeCloseTo(t, 6)
    }
    // PCE boils near 394 K at one atmosphere — an extrapolation, and close anyway
    expect(boilingPointK(ANTOINE_PCE, 1.01325)).toBeGreaterThan(385)
    expect(boilingPointK(ANTOINE_PCE, 1.01325)).toBeLessThan(400)
  })

  it('the equilibrium ratio is a function of temperature, not a constant', () => {
    const cold = equilibriumRatio(ANTOINE_PCE, 310)
    const warm = equilibriumRatio(ANTOINE_PCE, 360)
    expect(warm).toBeGreaterThan(cold)
    // at its boiling point the ratio is 1 by definition — saturation equals total
    expect(equilibriumRatio(ANTOINE_PCE, boilingPointK(ANTOINE_PCE, 1.01325))).toBeCloseTo(1, 9)
  })
})

describe('solvent — the kinetics the source called "Arrhenius-like" and never wrote', () => {
  it('Arrhenius rises with temperature and falls with activation energy', () => {
    const hot = arrheniusRate(1e13, 50_000, 350)
    const cold = arrheniusRate(1e13, 50_000, 300)
    expect(hot).toBeGreaterThan(cold)
    expect(arrheniusRate(1e13, 80_000, 350)).toBeLessThan(hot)
    // zero activation energy leaves the pre-exponential alone
    expect(arrheniusRate(7, 0, 300)).toBeCloseTo(7, 12)
    expect(GAS_CONSTANT).toBeCloseTo(8.314462618, 9)
    expect(() => arrheniusRate(1, 1, 0)).toThrow()
  })

  it('first-order decay halves in exactly one half-life', () => {
    const k = 0.003
    expect(firstOrderDecay(100, k, halfLifeSeconds(k))).toBeCloseTo(50, 9)
    expect(firstOrderDecay(100, k, 2 * halfLifeSeconds(k))).toBeCloseTo(25, 9)
    expect(firstOrderDecay(100, k, 0)).toBe(100)
    expect(() => halfLifeSeconds(0)).toThrow()
  })
})

/**
 * The poster stated the mass balance as `m_solv = m_solv + m_soil` — an equation
 * whose only solution is that no soil exists.
 */
describe('solvent — input = output + fugitive', () => {
  it('names the loss nobody metered', () => {
    const b = solventBalance({ purchased: 1000, recovered: 820, retained: 60 })
    expect(b.fugitive).toBe(120)
    expect(b.conserves).toBe(true)
    expect(b.fugitiveFraction).toBeCloseTo(0.12, 12)
  })

  it('refuses a negative fugitive instead of reporting it as a credit', () => {
    const b = solventBalance({ purchased: 100, recovered: 90, retained: 30 })
    expect(b.fugitive).toBe(-20)
    expect(b.conserves).toBe(false)
    expect(b.fugitiveFraction).toBe(0) // never a negative emission
  })

  it('a perfectly closed loop loses nothing', () => {
    const b = solventBalance({ purchased: 500, recovered: 500, retained: 0 })
    expect(b.fugitive).toBe(0)
    expect(b.conserves).toBe(true)
    expect(b.fugitiveFraction).toBe(0)
  })
})
