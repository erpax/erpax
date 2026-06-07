import { describe, it, expect } from 'vitest'
import {
  valve,
  oneWay,
  flowThrough,
  VENOUS_FRACTION,
  capacitance,
  returnsReciprocal,
  veinReturn,
  returns,
} from '@/vein'

describe('vein — one-way valve (the ratchet)', () => {
  it('forward flow passes, backflow is blocked', () => {
    expect(valve(5)).toBe(5)
    expect(valve(-5)).toBe(0)
    expect(valve(0)).toBe(0)
    expect(oneWay()).toBe(true)
  })
  it('clamps any backward segment along a path (no regurgitation)', () => {
    expect(flowThrough([3, -2, 5, -1])).toEqual([3, 0, 5, 0])
  })
})

describe('vein — capacitance (the reservoir)', () => {
  it('holds ≈70% of total blood volume', () => {
    expect(VENOUS_FRACTION).toBeGreaterThanOrEqual(0.6)
    expect(VENOUS_FRACTION).toBeLessThanOrEqual(0.75)
    expect(capacitance()).toBe(true)
  })
})

describe('vein — reciprocal return (the closed loop)', () => {
  it('artery out + vein back conserves (every link reciprocal)', () => {
    expect(returnsReciprocal()).toBe(true)
  })
})

describe('vein — the conjunction', () => {
  it('every return claim is true', () => {
    for (const [k, v] of Object.entries(veinReturn())) expect(v, k).toBe(true)
  })
  it('the vein is the append-only return', () => {
    expect(returns()).toBe(true)
  })
})
