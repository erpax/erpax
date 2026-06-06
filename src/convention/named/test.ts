import { describe, it, expect } from 'vitest'
import { coverage, nameTally } from '@/convention/named'

describe('convention/named — the name is the path', () => {
  it('coverage is the name-matches-leaf fraction in [0,1]', () => {
    const c = coverage()
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
  })

  it('coverage is deterministic — the same live tree yields the same value', () => {
    expect(coverage()).toBe(coverage())
  })

  it('coverage = matching / total — the pure ratio, no fallback', () => {
    const t = nameTally()
    expect(t.matching).toBeLessThanOrEqual(t.total)
    expect(t.matching).toBeGreaterThanOrEqual(0)
    expect(t.total).toBeGreaterThan(0) // the corpus is non-empty by architecture
    expect(coverage()).toBe(t.matching / t.total)
    expect(t.divergent.length).toBe(t.total - t.matching) // every non-match is recorded
  })
})
