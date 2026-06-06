/**
 * convention/honest — the honest-split convention measures itself. coverage = honest / total
 * must be a real fraction in [0,1] computed live over the tree, and stable across calls (pure
 * over the same tree — no default, no clock).
 */
import { describe, it, expect } from 'vitest'
import { coverage, total, honest, isHonest } from '@/convention/honest'

describe('convention/honest — metaphysics named as convention, never asserted, measured live', () => {
  it('coverage is a finite fraction in [0,1]', () => {
    const c = coverage()
    expect(Number.isFinite(c)).toBe(true)
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
  })

  it('coverage is deterministic over the same tree (no default, no clock)', () => {
    expect(coverage()).toBe(coverage())
  })

  it('coverage equals honest / total from the composed corpus walk', () => {
    const t = total()
    const h = honest()
    expect(t).toBeGreaterThan(0) // the corpus is non-empty by architecture
    expect(h).toBeGreaterThanOrEqual(0) // honest is a subset count
    expect(h).toBeLessThanOrEqual(t) // …of the same SKILL.md walk
    expect(coverage()).toBe(h / t)
  })

  it("this very atom's SKILL.md is itself honest (it names the phrases, never asserts them)", () => {
    expect(isHonest('src/convention/honest/SKILL.md')).toBe(true)
    expect(honest()).toBeGreaterThan(0)
    expect(coverage()).toBeGreaterThan(0)
  })
})
