import { describe, expect, it } from 'vitest'

import { realiseSkillsForPath } from '@/agent/skill-context'
import { listAtomPaths } from '@/readme/compute'

import {
  activeFraction,
  assertSparsified,
  capabilityPerCost,
  loadBearing,
  NotSparsification,
  productOfFactors,
  report,
  representationRatio,
  UUID_BYTES,
  zeroing,
} from './index'

describe('sparsity — the corpus measured on its own claim', () => {
  /*
   * 120s, not the 30s default: this test SCANS the live corpus — 3,400 atom paths plus a skill
   * realisation — and the scan memoises. Warm it is 588ms; COLD it is ~49s, which is what a
   * fresh CI runner always gets. It went red on shard 15 for exactly that reason, and a bound
   * that fails on a cold cache measures the cache, not the claim.
   */
  it('THE LIVE MEASUREMENT: the router activates a tiny fraction of the pool', { timeout: 120_000 }, () => {
    const pool = listAtomPaths(process.cwd()).length
    const ctx = realiseSkillsForPath('src/sparsity/index.ts')
    const r = report({ pool, active: ctx.atomCount })
    // the claim was `capability ÷ cost → max` with nothing computing either term; both are computed
    expect(r.pool).toBeGreaterThan(1000)
    expect(r.active).toBeGreaterThan(0)
    expect(r.activeFraction).toBeLessThan(0.05) // few of many, per task
    expect(r.capabilityPerCost).toBeGreaterThan(20)
  })

  it('the active fraction is bounded and degenerate cases do not divide by zero', () => {
    expect(activeFraction({ pool: 0, active: 5 })).toBe(0)
    expect(activeFraction({ pool: 100, active: 200 })).toBe(1) // active is capped at the pool
    expect(capabilityPerCost({ pool: 100, active: 0 })).toBe(0)
  })
})

describe('sparsity — what the atom’s own prose forbids, now enforced', () => {
  it('SPARSITY IS NOT SMALLNESS: shrinking the pool LOWERS the score', () => {
    const sparse = { pool: 3000, active: 30 }
    const small = { pool: 60, active: 30 } // same active set, a fraction of the capability
    expect(capabilityPerCost(sparse)).toBeGreaterThan(capabilityPerCost(small))
    // a metric reading only the active count cannot tell these apart — both show 30
    expect(sparse.active).toBe(small.active)
  })

  it('and a pool-shrinking change is REFUSED as sparsification', () => {
    expect(() => assertSparsified({ pool: 3000, active: 30 }, { pool: 60, active: 20 })).toThrow(NotSparsification)
    expect(() => assertSparsified({ pool: 3000, active: 30 }, { pool: 60, active: 20 })).toThrow(/capability loss/)
    // activating less from the SAME pool is the real move, and it passes
    expect(() => assertSparsified({ pool: 3000, active: 30 }, { pool: 3000, active: 12 })).not.toThrow()
  })

  it('EAGER ACTIVATION is a large dense thing — the fraction says so', () => {
    expect(activeFraction({ pool: 3000, active: 3000 })).toBe(1)
    expect(capabilityPerCost({ pool: 3000, active: 3000 })).toBe(1)
  })

  it('THE FLOOR: one zero factor zeroes the product, so every live factor is load-bearing', () => {
    const live = [
      { name: 'desire', value: 0.6 },
      { name: 'proof', value: 0.9 },
      { name: 'distribution', value: 0.4 },
    ]
    expect(productOfFactors(live.map((f) => f.value))).toBeCloseTo(0.216, 10)
    expect(loadBearing(live)).toEqual(['desire', 'proof', 'distribution'])
    expect(zeroing(live)).toEqual([])

    const broken = [...live, { name: 'awareness', value: 0 }]
    expect(productOfFactors(broken.map((f) => f.value))).toBe(0)
    expect(zeroing(broken)).toEqual(['awareness'])
    // nothing is load-bearing once the product is already zero — the floor has been hit
    expect(loadBearing(broken)).toEqual([])
  })

  it('an empty product is zero, not one — no factors is no capability', () => {
    expect(productOfFactors([])).toBe(0)
  })
})

describe('sparsity — representation, the axis the corpus actually lives on', () => {
  it('a content-uuid is 128 bits whatever it addresses, so the ratio IMPROVES with size', () => {
    expect(UUID_BYTES).toBe(16)
    expect(representationRatio(1_000)).toBeGreaterThan(representationRatio(1_000_000))
    expect(representationRatio(16)).toBe(1) // addressing exactly itself buys nothing
    expect(representationRatio(0)).toBe(1) // degenerate, never a division by zero
  })

  it('the whole corpus addressed by one uuid is a ratio near zero', () => {
    expect(representationRatio(40 * 1024 * 1024)).toBeLessThan(1e-6)
  })
})
