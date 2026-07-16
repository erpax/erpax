import { describe, it, expect } from 'vitest'
import {
  permits,
  barrier,
  RENEWAL_DAYS,
  RENEWAL_DAYS_RANGE,
  STRATUM_LAYERS,
  STRATUM_LAYERS_RANGE,
  sheddingPerDay,
  regenerates,
  SETPOINT_C,
  regulate,
  homeostasis,
  integument,
  protects,
} from '@/skin'

describe('skin — barrier (selectively permeable)', () => {
  it('permits the sanctioned, blocks threats', () => {
    expect(permits('sanctioned')).toBe(true)
    expect(permits('pathogen')).toBe(false)
    expect(permits('dehydration')).toBe(false)
    expect(barrier()).toBe(true)
  })
})

describe('skin — regenerates (continuous renewal from seed)', () => {
  // This test USED to assert sheddingPerDay() ≈ 1 — the value STRATUM_LAYERS had been pinned at 28 to
  // produce (28/28). The constant was bent to the conclusion and the test confirmed the bend: at the honest
  // low of the measured 10–30 range the same check FAILS. A measurement is not a theorem; assert the LAW
  // (renewal is continuous and the corneum turns over within its window), never a fitted point.
  it('renews continuously — the rate FOLLOWS from the measured ranges, it is not a target', () => {
    expect(sheddingPerDay()).toBeGreaterThan(0)
    expect(sheddingPerDay()).toBe(STRATUM_LAYERS / RENEWAL_DAYS) // derived, not asserted
    expect(regenerates()).toBe(true)
  })

  it('the law holds across the whole measured range — not only at its cherry-picked top', () => {
    const [loL, hiL] = STRATUM_LAYERS_RANGE
    const [loD, hiD] = RENEWAL_DAYS_RANGE
    expect(STRATUM_LAYERS).toBeGreaterThanOrEqual(loL)
    expect(STRATUM_LAYERS).toBeLessThanOrEqual(hiL)
    // the real shedding rate spans the ranges — "≈1/day" was only ever the extreme
    expect(loL / hiD).toBeLessThan(1)
    expect(hiL / loD).toBeGreaterThan(1)
  })
})

describe('skin — homeostasis (negative feedback to the setpoint)', () => {
  it('one step moves toward the setpoint', () => {
    expect(Math.abs(regulate(41) - SETPOINT_C)).toBeLessThan(Math.abs(41 - SETPOINT_C))
  })
  it('thermoregulation converges to 37 °C, monotonically, from above and below', () => {
    expect(homeostasis(41)).toBe(true)
    expect(homeostasis(30)).toBe(true)
  })
})

describe('skin — the conjunction', () => {
  it('every barrier claim is true', () => {
    for (const [k, v] of Object.entries(integument())) expect(v, k).toBe(true)
  })
  it('the skin is the self/non-self boundary', () => {
    expect(protects()).toBe(true)
  })
})
