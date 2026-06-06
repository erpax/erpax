import { describe, it, expect } from 'vitest'
import { deviceCost, exceedsDevice, redundancyEliminated, WORKING_RATIO } from '@/quantum/train'

describe('quantum/train — infinite agents cannot exceed the device (the content-addressed bound)', () => {
  it('device cost is the distinct work, never agents × work — the agent count never multiplies it', () => {
    expect(deviceCost(1, 800)).toBe(800)
    expect(deviceCost(1e6, 800)).toBe(800)
    expect(deviceCost(1e12, 800)).toBe(800) // infinitely many agents, same cost — they collapse to the cache
  })
  it('the device is exceeded only by DISTINCT work, never by adding agents', () => {
    const cap = 1000
    expect(exceedsDevice(1, 800, cap)).toBe(false)
    expect(exceedsDevice(1e12, 800, cap)).toBe(false) // adding agents cannot exceed it
    expect(exceedsDevice(1, 1500, cap)).toBe(true) // only distinct work past capacity does
  })
  it('content-addressing eliminates the redundant recompute (1 − distinct/total)', () => {
    expect(redundancyEliminated(1000, 250)).toBeCloseTo(0.75, 10)
    expect(redundancyEliminated(0, 0)).toBe(0)
  })
  it('the working ratio is the rodin 2/3 (symbolic, not a measured energy figure)', () => {
    expect(WORKING_RATIO).toBeCloseTo(2 / 3, 10)
  })
})
