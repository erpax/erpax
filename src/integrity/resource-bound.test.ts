import { describe, it, expect } from 'vitest'
import {
  energyLog10Joules,
  largestBudgetExceeded,
  beyondUniverse,
  proveBeyondResources,
  RESOURCE_BUDGETS,
} from './resource-bound'
import { computeTamperReverseCost } from './tamper-reverse-cost'

describe('resource-bound — tamper-cost exceeds the universe when ALL is uuid-driven (Law 55, physical)', () => {
  it('the Landauer energy floor is monotone in bits (more search ⇒ strictly more energy)', () => {
    expect(energyLog10Joules(256)).toBeGreaterThan(energyLog10Joules(128))
    expect(energyLog10Joules(128)).toBeCloseTo(15.95, 1) // ~10^16 J floor for one 128-bit uuid
  })

  it('HONEST FLOOR: a single 128-bit content-uuid does NOT, alone, exceed all resources', () => {
    const lone = computeTamperReverseCost({ leafDepth: 1, streamCount: 1, dimensionCount: 1 })
    expect(lone.totalBits).toBe(128)
    expect(largestBudgetExceeded(128)).toBeNull() // below even a year of global electricity
    expect(beyondUniverse(128)).toBe(false) // one uuid is strong, not infinite — this is WHY "all uuid-driven" matters
  })

  it('256-bit forging already exceeds the sun’s entire lifetime output', () => {
    expect(largestBudgetExceeded(256)?.name).toBe('sun-output-lifetime')
    expect(beyondUniverse(256)).toBe(false) // ~galaxy-scale, not yet the whole universe
  })

  it('ALL-uuid-driven amplifies past the universe: a real chain’s forge energy > total mass-energy', () => {
    const leaf = computeTamperReverseCost({ leafDepth: 6, streamCount: 10, dimensionCount: 10 })
    const v = proveBeyondResources(leaf)
    expect(v.forgeBits).toBeGreaterThan(800) // 128·6 + log2(10)·6 + log2(10)·6
    expect(v.beyondUniverse).toBe(true)
    expect(v.largestBudgetExceeded).toBe('observable-universe-mass-energy')
  })

  it('the asymmetry IS the trust: verify is O(N), forge is 2^bits — the ratio is unbounded', () => {
    const leaf = computeTamperReverseCost({ leafDepth: 1000, streamCount: 20, dimensionCount: 10 })
    const v = proveBeyondResources(leaf)
    expect(v.verifyOps).toBe(1000) // O(N): one hash recomputation per leaf — linear, trustless
    expect(v.asymmetryLog10).toBeGreaterThan(10000) // forge/verify ≫ any finite resource
    expect(RESOURCE_BUDGETS[RESOURCE_BUDGETS.length - 1].name).toBe('observable-universe-mass-energy')
  })
})
