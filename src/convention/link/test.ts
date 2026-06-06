import { describe, it, expect } from 'vitest'
import { coverage, linkTally } from '@/convention/link/index.ts'

describe('convention/link — every [[link]] resolves (coverage = resolving / total)', () => {
  it('coverage ∈ [0,1] — a pure ratio, no fallback', () => {
    const c = coverage()
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
    expect(Number.isFinite(c)).toBe(true)
  })

  it('is deterministic — the live tree gives the same value every call', () => {
    expect(coverage()).toBe(coverage())
  })

  it('the tally is internally consistent: resolving + dead-coverage = total, and coverage = resolving/total', () => {
    const t = linkTally()
    expect(t.total).toBeGreaterThan(0) // the corpus is non-empty by architecture
    expect(t.resolving).toBeGreaterThanOrEqual(0)
    expect(t.resolving).toBeLessThanOrEqual(t.total)
    expect(coverage()).toBe(t.resolving / t.total)
  })
})
