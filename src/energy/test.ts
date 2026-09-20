import { describe, expect, it } from 'vitest'
import {
  WATER_CYCLE,
  WATER_CYCLE_IDEAL,
  allocate,
  conserves,
  loopGain,
  selfSustaining,
  type Source,
} from '@/energy'

const battery: Source = { id: 'battery', available: 133, maxPower: 400, efficiency: 0.95, priority: 2 }
const solar: Source = { id: 'solar', available: 999, maxPower: 60, efficiency: 1, priority: 1 }
const cell: Source = { id: 'fuel-cell', available: 500, maxPower: 250, efficiency: 0.55, priority: 3 }

describe('energy — allocation is the motor mixer in different units', () => {
  it('draws the cheapest priority first and only tops up from the next', () => {
    const a = allocate([battery, solar, cell], 200)
    const by = Object.fromEntries(a.draws.map((d) => [d.id, d]))
    expect(by.solar!.delivered).toBe(60)
    expect(by.battery!.delivered).toBe(140)
    expect(by['fuel-cell']!.delivered).toBe(0)
    expect(a.shortfall).toBe(0)
  })

  it('charges the source for its own inefficiency — drawn exceeds delivered', () => {
    const a = allocate([battery], 190)
    const d = a.draws[0]!
    expect(d.delivered).toBe(190)
    expect(d.drawn).toBeCloseTo(190 / 0.95, 9)
    expect(a.losses).toBeCloseTo(190 / 0.95 - 190, 9)
  })

  it('conserves: everything drawn is delivered or lost', () => {
    for (const demand of [0, 50, 200, 1000]) {
      expect(conserves(allocate([battery, solar, cell], demand))).toBe(true)
    }
  })

  it('REPORTS A SHORTFALL rather than claiming a demand it did not meet', () => {
    const a = allocate([solar], 500)
    expect(a.delivered).toBe(60)
    expect(a.shortfall).toBe(440)
  })

  it('treats a negative demand as none, and still conserves', () => {
    const a = allocate([battery], -5)
    expect(a.demand).toBe(0)
    expect(a.delivered).toBe(0)
    expect(conserves(a)).toBe(true)
  })
})

describe('energy — a chain gains the PRODUCT of its stages, so a loop decays', () => {
  it('multiplies the stage efficiencies', () => {
    expect(loopGain([{ name: 'a', efficiency: 0.5 }, { name: 'b', efficiency: 0.5 }])).toBe(0.25)
  })

  it('REFUSES a stage claiming more than 100% rather than computing with it', () => {
    expect(Number.isNaN(loopGain([{ name: 'over-unity', efficiency: 1.2 }]))).toBe(true)
    expect(selfSustaining([{ name: 'over-unity', efficiency: 1.2 }])).toBe(false)
  })

  it('is self-sustaining only when every stage is lossless — which no real stage is', () => {
    expect(selfSustaining([{ name: 'ideal', efficiency: 1 }])).toBe(true)
    expect(selfSustaining([{ name: 'ideal', efficiency: 1 }, { name: 'real', efficiency: 0.999 }])).toBe(false)
  })
})

describe('energy — the water cycle, with the arithmetic shown', () => {
  it('runs at about a third with the best commercial hardware', () => {
    const g = loopGain(WATER_CYCLE)
    expect(g).toBeCloseTo(0.7 * 0.9 * 0.55, 9)
    expect(g).toBeLessThan(0.35)
    expect(selfSustaining(WATER_CYCLE)).toBe(false)
  })

  it('reaches exactly 1.0 with PERFECT hardware — closed, never generative', () => {
    // Splitting water costs the same 285.8 kJ/mol that burning the hydrogen returns. At the
    // thermodynamic limit the loop breaks even and leaves NOTHING to do work with.
    expect(loopGain(WATER_CYCLE_IDEAL)).toBe(1)
    expect(selfSustaining(WATER_CYCLE_IDEAL)).toBe(true)
  })

  it('cannot power anything: adding ANY load to the ideal loop ends it', () => {
    // A load is a stage with efficiency below 1. One is enough.
    const withLoad = [...WATER_CYCLE_IDEAL, { name: 'any useful work at all', efficiency: 0.99 }]
    expect(selfSustaining(withLoad)).toBe(false)
  })
})
