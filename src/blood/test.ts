/**
 * blood — the proof, asserted. The courier delivers cooperatively, regenerates
 * continuously, and conserves what it carries. See ./index.ts for the construction.
 */
import { describe, it, expect } from 'vitest'
import {
  hillSaturation,
  cooperativeBinding,
  standingPopulation,
  steadyStateTurnover,
  deliveryConserves,
  carrier,
  isCourier,
} from '@/blood'

describe('blood — cooperative binding (the sigmoidal Hill curve)', () => {
  it('loads nearly full at the lung (~98% at 100 mmHg)', () => {
    expect(hillSaturation(100)).toBeGreaterThan(0.95)
  })
  it('unloads at the tissue (~75% at 40 mmHg)', () => {
    expect(hillSaturation(40)).toBeGreaterThan(0.65)
    expect(hillSaturation(40)).toBeLessThan(0.85)
  })
  it('cooperativity (n≈2.8) out-loads a non-cooperative (n=1) carrier arterially', () => {
    expect(hillSaturation(100, 26.6, 2.8)).toBeGreaterThan(hillSaturation(100, 26.6, 1))
  })
  it('the curve is monotone in pO2 (more pressure ⇒ more saturation)', () => {
    expect(hillSaturation(60)).toBeGreaterThan(hillSaturation(40))
    expect(hillSaturation(100)).toBeGreaterThan(hillSaturation(60))
  })
  it('cooperativeBinding holds', () => {
    expect(cooperativeBinding()).toBe(true)
  })
})

describe('blood — steady-state turnover (Little’s law)', () => {
  it('production × lifespan reproduces the standing count (~20–30 trillion RBC)', () => {
    const pop = standingPopulation()
    expect(pop).toBeGreaterThan(20e12)
    expect(pop).toBeLessThan(30e12)
  })
  it('steadyStateTurnover holds', () => {
    expect(steadyStateTurnover()).toBe(true)
  })
})

describe('blood — delivery conserves (double-entry of carried value)', () => {
  it('loaded = delivered + returned', () => {
    expect(deliveryConserves()).toBe(true)
  })
})

describe('blood — the conjunction', () => {
  it('every carrier claim is true', () => {
    for (const [k, v] of Object.entries(carrier())) expect(v, k).toBe(true)
  })
  it('blood is the courier organ', () => {
    expect(isCourier()).toBe(true)
  })
})
