/**
 * convention/sourced — the cites-its-@standard convention measures itself. coverage = sourced /
 * total must be a real fraction in [0,1] computed live over the tree, and stable across calls (pure
 * over the same tree — no default, no clock).
 */
import { describe, it, expect } from 'vitest'
import { coverage, total, sourced, isSourced } from '@/convention/sourced'

describe('convention/sourced — every atom cites its @standard, measured live', () => {
  it('coverage is a finite fraction in [0,1]', () => {
    const c = coverage()
    expect(Number.isFinite(c)).toBe(true)
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
  })

  it('coverage is deterministic over the same tree (no default, no clock)', () => {
    expect(coverage()).toBe(coverage())
  })

  it('coverage equals sourced / total from the composed corpus walk', () => {
    const t = total()
    const s = sourced()
    expect(t).toBeGreaterThan(0) // the corpus is non-empty by architecture
    expect(s).toBeGreaterThanOrEqual(0) // sourced is a subset count
    expect(s).toBeLessThanOrEqual(t) // …of the same SKILL.md walk
    expect(coverage()).toBe(s / t)
  })

  it('this very atom is itself sourced (its SKILL.md and index.ts both carry @standard)', () => {
    expect(isSourced('src/convention/sourced/SKILL.md')).toBe(true)
    expect(sourced()).toBeGreaterThan(0)
    expect(coverage()).toBeGreaterThan(0)
  })
})
