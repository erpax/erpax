import { describe, it, expect } from 'vitest'
import { machineRate, typeThroughput } from './index'

describe('machine — the shop-floor spread (mined from etrima real rates)', () => {
  it('a machine-hour decomposes into a double-entry spread: price = cost + margin, cost = pay + overhead', () => {
    const s = machineRate({ payPerHour: 6, costPerHour: 9, pricePerHour: 14 }, 8)
    expect(s.revenue).toBe(112) // 14 × 8
    expect(s.cost).toBe(72) // 9 × 8
    expect(s.pay).toBe(48) // 6 × 8
    expect(s.margin).toBe(s.revenue - s.cost) // 40 — the contribution margin
    expect(s.overhead).toBe(s.cost - s.pay) // 24 — absorbed overhead
    expect(s.revenue).toBe(s.cost + s.margin) // conservation, like the corpus books elsewhere
    expect(s.cost).toBe(s.pay + s.overhead)
  })

  it('markup is margin ÷ cost, and 0 when cost is 0 (no divide-by-zero)', () => {
    expect(machineRate({ payPerHour: 5, costPerHour: 10, pricePerHour: 15 }, 1).markup).toBeCloseTo(0.5)
    expect(machineRate({ payPerHour: 0, costPerHour: 0, pricePerHour: 0 }, 3).markup).toBe(0)
  })

  it('a loss machine (price < cost) yields a negative margin — surfaced, not hidden', () => {
    expect(machineRate({ payPerHour: 8, costPerHour: 12, pricePerHour: 10 }, 4).margin).toBe(-8)
  })

  it('type throughput scales with machines-per-worker and inverse work-seconds', () => {
    const t = { kind: 'sewing', code: 'SW', machinesPerWorker: 2, costPerMinute: 0.15, pricePerMinute: 0.25 }
    expect(typeThroughput(t, 60, 30)).toBe(240) // 60min × 60s × 2 / 30s = 240 units
    expect(typeThroughput(t, 60, 0)).toBe(0) // guarded — no infinite throughput
  })
})
