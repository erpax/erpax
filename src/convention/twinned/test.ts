/**
 * convention/twinned — the twinned convention measures itself. coverage = pointing / total must
 * be a real fraction in [0,1] computed live over the tree, and stable across calls (pure over the
 * same tree — no default, no clock).
 */
import { describe, it, expect } from 'vitest'
import { coverage, total, pointing, hasTwin, pointsToRealIndex } from '@/convention/twinned'

const SELF = 'src/convention/twinned/SKILL.md'

describe('convention/twinned — every Matter-twin line points to a real index.ts, measured live', () => {
  it('coverage is a finite fraction in [0,1]', () => {
    const c = coverage()
    expect(Number.isFinite(c)).toBe(true)
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
  })

  it('coverage is deterministic over the same tree (no default, no clock)', () => {
    expect(coverage()).toBe(coverage())
  })

  it('coverage equals pointing / total from the composed corpus walk', () => {
    const t = total()
    const k = pointing()
    expect(t).toBeGreaterThan(0) // many atoms carry a Matter-twin line by architecture
    expect(k).toBeGreaterThanOrEqual(0) // pointing is a subset count
    expect(k).toBeLessThanOrEqual(t) // …of the same Matter-twin-bearing walk
    expect(coverage()).toBe(k / t)
  })

  it('this very atom carries a Matter-twin line that resolves to a real index.ts', () => {
    expect(hasTwin(SELF)).toBe(true)
    expect(pointsToRealIndex(SELF)).toBe(true) // its sibling index.ts is the canonical twin
    expect(pointing()).toBeGreaterThan(0)
    expect(coverage()).toBeGreaterThan(0)
  })
})
