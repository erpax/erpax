import { describe, it, expect } from 'vitest'
import {
  fire,
  spikeAmplitude,
  THRESHOLD_MV,
  allOrNothing,
  canFire,
  REFRACTORY_MS,
  refractory,
  conductionSpeed,
  saltatoryFaster,
  nerveSignal,
  fires,
} from '@/nerve'

describe('nerve — all-or-nothing (the threshold step = the gate)', () => {
  it('sub-threshold ⇒ no spike; at/above ⇒ spike', () => {
    expect(fire(THRESHOLD_MV - 1)).toBe(0)
    expect(fire(THRESHOLD_MV)).toBe(1)
    expect(fire(0)).toBe(1)
  })
  it('amplitude is constant once fired — never graded', () => {
    expect(spikeAmplitude(0)).toBe(spikeAmplitude(THRESHOLD_MV))
    expect(spikeAmplitude(THRESHOLD_MV - 5)).toBe(0)
  })
  it('allOrNothing holds', () => {
    expect(allOrNothing()).toBe(true)
  })
})

describe('nerve — refractory (idempotent spike)', () => {
  it('cannot re-fire within the refractory window', () => {
    expect(canFire(0)).toBe(false)
    expect(canFire(REFRACTORY_MS)).toBe(true)
  })
  it('refractory holds', () => {
    expect(refractory()).toBe(true)
  })
})

describe('nerve — saltatory (the myelinated leap)', () => {
  it('myelinated conduction is faster than unmyelinated', () => {
    expect(conductionSpeed(true)).toBeGreaterThan(conductionSpeed(false))
    expect(saltatoryFaster()).toBe(true)
  })
})

describe('nerve — the conjunction', () => {
  it('every signal claim is true', () => {
    for (const [k, v] of Object.entries(nerveSignal())) expect(v, k).toBe(true)
  })
  it('the nerve fires as the gate', () => {
    expect(fires()).toBe(true)
  })
})
