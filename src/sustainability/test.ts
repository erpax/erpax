import { describe, it, expect } from 'vitest'
import {
  logisticGrowth,
  carryingYield,
  sustainableHarvest,
  netEntropy,
  isSustainable,
  type Cycle,
} from '@/sustainability'

// All assertions are RELATIONS / IDENTITIES that break the instant the math
// drifts -- no magic numbers are hand-asserted.

describe('sustainability: carrying-capacity + dissipative-structure budget', () => {
  const r = 0.5
  const K = 400

  // 1. Both Verhulst equilibria return exactly 0.
  it('logisticGrowth(K, r, K) === 0 and logisticGrowth(0, r, K) === 0 (both equilibria)', () => {
    expect(logisticGrowth(K, r, K)).toBe(0) // N=K: saturated, growth halts
    expect(logisticGrowth(0, r, K)).toBe(0) // N=0: no population, no growth
  })

  // 2. THE MSY IDENTITY: growth is maximal at N=K/2, equalling r·K/4.
  it('logisticGrowth(K/2, r, K) toBeCloseTo carryingYield(r, K) — peak equals MSY formula', () => {
    expect(logisticGrowth(K / 2, r, K)).toBeCloseTo(carryingYield(r, K))
  })

  // 3. sustainableHarvest: boundary is inclusive; one unit over is false.
  it('sustainableHarvest(x, x) true (boundary); sustainableHarvest(x+ε, x) false', () => {
    const x = 73.5
    expect(sustainableHarvest(x, x)).toBe(true) // boundary: equal is still sustainable
    expect(sustainableHarvest(x + 0.001, x)).toBe(false) // drawing down faster than regen
  })

  // 4a. netEntropy is purely produced − exported — no hidden offset.
  it('netEntropy(p, e) === p − e (no hidden offset)', () => {
    expect(netEntropy(80, 30)).toBe(50)
    expect(netEntropy(50, 80)).toBe(-30) // exporting more than produced: locally ordering
    expect(netEntropy(0, 0)).toBe(0)
  })

  // 4b. isSustainable is FALSE when exported < produced, even if harvest ≤ regen.
  it('isSustainable false when entropy budget does not close (exported < produced), even with healthy harvest', () => {
    const c: Cycle = { harvest: 100, regen: 200, entropyProduced: 60, entropyExported: 40 }
    // harvest ≤ regen: true; netEntropy = 20 > 0: entropy leaks → unsustainable
    expect(isSustainable(c)).toBe(false)
  })

  // 4c. isSustainable TRUE when harvest ≤ regen AND exported ≥ produced.
  it('isSustainable true when harvest ≤ regen AND exported ≥ produced (both conditions hold)', () => {
    const c: Cycle = { harvest: 100, regen: 200, entropyProduced: 60, entropyExported: 70 }
    // harvest ≤ regen: true; netEntropy = -10 ≤ 0: order maintained by export → sustainable
    expect(isSustainable(c)).toBe(true)
  })

  // 5. Overharvest makes a cycle unsustainable regardless of the entropy budget.
  it('isSustainable false when harvest > regen, regardless of entropy budget', () => {
    const c: Cycle = { harvest: 300, regen: 100, entropyProduced: 10, entropyExported: 999 }
    // entropyExported >> entropyProduced: budget perfect; but stock collapses → unsustainable
    expect(isSustainable(c)).toBe(false)
  })
})
