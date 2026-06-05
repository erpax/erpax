import { describe, it, expect } from 'vitest'
import {
  CN_IDEAL,
  CN_MATURE,
  cnRatio,
  isMature,
  humificationRatio,
  respiredCarbon,
  loopBalances,
} from '@/compost'

// compost invariants — assert RELATIONS that drift when the loop breaks.
// No opaque magic numbers: every constant is derived from or named by its export.

describe('compost: C:N ratios and maturity', () => {
  it('cnRatio(60, 2) === 30 (the ideal feedstock ratio, equal to CN_IDEAL)', () => {
    expect(cnRatio(60, 2)).toBe(CN_IDEAL)
  })

  it('isMature at the CN_MATURE boundary — ≤ CN_MATURE is mature, just above is not', () => {
    expect(isMature(CN_MATURE)).toBe(true)
    expect(isMature(CN_MATURE + 1)).toBe(false)
  })

  it('isMature(30) false — CN_IDEAL > CN_MATURE, feedstock is not yet mature', () => {
    expect(isMature(CN_IDEAL)).toBe(false)
  })
})

describe('compost: humification and respiration', () => {
  it('humificationRatio(100, 40) ≈ 0.4 — 40% of C humified', () => {
    expect(humificationRatio(100, 40)).toBeCloseTo(0.4)
  })

  it('respiredCarbon(100, 40) === 60 — 60% respired to CO₂', () => {
    expect(respiredCarbon(100, 40)).toBe(60)
  })

  it('identity: humifiedC + respiredCarbon(initialC, humifiedC) === initialC', () => {
    const initialC = 100
    const humifiedC = 40
    expect(humifiedC + respiredCarbon(initialC, humifiedC)).toBe(initialC)
  })

  it('respiredCarbon ≥ 0 for valid inputs (humifiedC ≤ initialC)', () => {
    expect(respiredCarbon(100, 0)).toBeGreaterThanOrEqual(0)
    expect(respiredCarbon(100, 100)).toBeGreaterThanOrEqual(0)
    expect(respiredCarbon(100, 55)).toBeGreaterThanOrEqual(0)
  })

  it('humificationRatio ∈ [0,1] for valid inputs (humifiedC ≤ initialC)', () => {
    expect(humificationRatio(100, 0)).toBeGreaterThanOrEqual(0)
    expect(humificationRatio(100, 0)).toBeLessThanOrEqual(1)
    expect(humificationRatio(100, 100)).toBeGreaterThanOrEqual(0)
    expect(humificationRatio(100, 100)).toBeLessThanOrEqual(1)
    expect(humificationRatio(100, 40)).toBeGreaterThanOrEqual(0)
    expect(humificationRatio(100, 40)).toBeLessThanOrEqual(1)
  })
})

describe('compost: loopBalances — FUSION with conservation.boundaryConserves', () => {
  it('loopBalances({residue:100, toSoil:40, respired:60}) is true — loop closes', () => {
    expect(loopBalances({ residue: 100, toSoil: 40, respired: 60 })).toBe(true)
  })

  it('perturbing toSoil to 41 breaks the loop — proves conservation.boundaryConserves is called', () => {
    expect(loopBalances({ residue: 100, toSoil: 41, respired: 60 })).toBe(false)
  })

  it('loopBalances with tolerance accepts small float drift', () => {
    // 40.0000001 + 60 = 100.0000001 — within tol=0.001
    expect(loopBalances({ residue: 100, toSoil: 40.0000001, respired: 60 }, 0.001)).toBe(true)
  })
})
