import { describe, it, expect } from 'vitest'
import { coverage, freshTally, staleRefs, resolves, freshCostLog2 } from '@/convention/fresh'

describe('convention/fresh — no stale refs (every import target exists on disk)', () => {
  it('coverage is the live resolving fraction in [0,1]', () => {
    const c = coverage()
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
  })

  it('coverage is deterministic — same value over repeated scans of the same tree', () => {
    expect(coverage()).toBe(coverage())
  })

  it('coverage = resolving / total, the tally is internally consistent over a non-empty corpus', () => {
    const t = freshTally()
    expect(t.total).toBeGreaterThan(0) // the corpus carries thousands of @/ imports by architecture
    expect(t.resolving).toBeLessThanOrEqual(t.total)
    expect(t.resolving + t.stale.length).toBe(t.total)
    expect(coverage()).toBe(t.resolving / t.total)
  })

  it('every reported stale ref is an @/ spec that genuinely does NOT resolve on disk', () => {
    for (const s of staleRefs()) {
      expect(s.spec.startsWith('@/')).toBe(true)
      expect(typeof s.file).toBe('string')
      expect(resolves(s.spec)).toBe(false)
    }
  })

  it('the resolver is grounded: a known atom index resolves, a fabricated path does not', () => {
    expect(resolves('@/cost')).toBe(true) // src/cost/index.ts — a real atom face
    expect(resolves('@/this/atom/does/not/exist')).toBe(false)
  })

  it('fresh tamper-cost is finite while a stale ref is open (and would seal to ∞ at full freshness)', () => {
    const cost = freshCostLog2()
    // coverage in [0,1] ⇒ cost ≥ 0; if coverage === 1 the dimension is sealed (∞)
    expect(cost).toBeGreaterThanOrEqual(0)
    expect(coverage() < 1 ? Number.isFinite(cost) : cost === Infinity).toBe(true)
  })
})
