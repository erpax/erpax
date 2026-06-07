import { describe, it, expect } from 'vitest'
import {
  permits,
  barrier,
  RENEWAL_DAYS,
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
  it('renews ~1 layer/day on a 28-day cycle', () => {
    expect(RENEWAL_DAYS).toBe(28)
    expect(sheddingPerDay()).toBeCloseTo(1, 1)
    expect(regenerates()).toBe(true)
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
