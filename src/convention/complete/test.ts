/**
 * convention/complete — the completeness convention measures itself. coverage = complete /
 * total must be a real fraction in [0,1] computed live over the tree, and stable across calls
 * (pure over the same tree — no default, no clock).
 */
import { describe, it, expect } from 'vitest'
import { coverage, total, complete } from '@/convention/complete'

describe('convention/complete — every atom is the full trinity, measured live', () => {
  it('coverage is a finite fraction in [0,1]', () => {
    const c = coverage()
    expect(Number.isFinite(c)).toBe(true)
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
  })

  it('coverage is deterministic over the same tree (no default, no clock)', () => {
    expect(coverage()).toBe(coverage())
  })

  it('coverage equals complete / total from the composed corpus walk', () => {
    const t = total()
    const k = complete()
    expect(t).toBeGreaterThan(0) // the corpus is non-empty by architecture
    expect(k).toBeGreaterThanOrEqual(0) // complete is a subset count
    expect(k).toBeLessThanOrEqual(t) // …of the same SKILL.md walk
    expect(coverage()).toBe(k / t)
  })

  it("this very atom is itself complete (it carries index.ts and test.ts), so coverage is > 0", () => {
    expect(complete()).toBeGreaterThan(0)
    expect(coverage()).toBeGreaterThan(0)
  })
})
