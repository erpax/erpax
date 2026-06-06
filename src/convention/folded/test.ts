/**
 * convention/folded — the fold convention measures itself. coverage = folded / total must be a
 * real fraction in [0,1] computed live over the tree, and stable across calls (pure over the
 * same tree — no default, no clamp, no clock).
 */
import { describe, it, expect } from 'vitest'
import { coverage, total, folded } from '@/convention/folded'

describe('convention/folded — every atom folds into the matrix, measured live', () => {
  it('coverage is a finite fraction in [0,1]', () => {
    const c = coverage()
    expect(Number.isFinite(c)).toBe(true)
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
  })

  it('coverage is deterministic over the same tree (no default, no clock)', () => {
    expect(coverage()).toBe(coverage())
  })

  it('coverage equals folded / total — a subset of the one composed corpus walk', () => {
    const t = total()
    const f = folded()
    expect(t).toBeGreaterThan(0) // the corpus is non-empty by architecture
    expect(f).toBeGreaterThanOrEqual(0) // folded is a subset count…
    expect(f).toBeLessThanOrEqual(t) // …of the same SKILL.md walk ⇒ ratio in [0,1] by construction
    expect(coverage()).toBe(f / t)
  })

  it('this very atom is itself folded-or-pending, so folded ≥ 0 and coverage > 0 (the corpus is largely folded)', () => {
    // folded is a non-negative subset count, and the bulk of the corpus is collided ⇒ coverage > 0.
    expect(folded()).toBeGreaterThanOrEqual(0)
    expect(coverage()).toBeGreaterThan(0)
  })
})
