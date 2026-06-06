import { describe, it, expect } from 'vitest'
import { collide, corpusChecks, corpusCollider } from '@/collider'

describe('collider — conventions collided to a tamper-cost (pure math, no default)', () => {
  it('all conventions clean ⟹ ∞ tamper-cost — by the math, not a default', () => {
    expect(collide([{ law: 'a', coverage: 1 }, { law: 'b', coverage: 1 }]).tamperCost).toBe(Infinity)
  })
  it('any violation ⟹ finite; joint coverage is the product', () => {
    const r = collide([{ law: 'a', coverage: 1 }, { law: 'b', coverage: 0.9 }])
    expect(Number.isFinite(r.tamperCost)).toBe(true)
    expect(r.coverage).toBeCloseTo(0.9, 10)
    expect(r.violations).toBe(1)
  })
  it('no default — the verdict is the product of the coverages, never assumed', () => {
    expect(collide([{ law: 'x', coverage: 0.5 }, { law: 'y', coverage: 0.5 }]).coverage).toBeCloseTo(0.25, 10)
  })
  it('the live corpus collides to a real verdict (pure computation over the tree)', () => {
    const c = corpusCollider()
    expect(c.coverage).toBeGreaterThan(0)
    expect(c.coverage).toBeLessThanOrEqual(1)
    expect(corpusChecks().length).toBeGreaterThanOrEqual(2)
  })
})
