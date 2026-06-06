/**
 * convention/lawful — the lawful convention is its own test: coverage is a real fraction over the
 * live corpus, deterministic, and the law-marker actually discriminates. No hand-asserted number —
 * the value is whatever the real tree computes; we assert only the invariants that must always hold.
 */
import { describe, it, expect } from 'vitest'
import { coverage, lawful, total, LAW_MARKER } from './index'

describe('convention/lawful', () => {
  it('coverage ∈ [0,1] — a fraction by construction, no clamp needed', () => {
    const c = coverage()
    expect(Number.isFinite(c)).toBe(true)
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
  })

  it('is deterministic — the same live tree yields the same coverage', () => {
    expect(coverage()).toBe(coverage())
  })

  it('lawful ≤ total and total > 0 — the corpus is non-empty, lawful is a subset', () => {
    expect(total()).toBeGreaterThan(0)
    expect(lawful()).toBeGreaterThanOrEqual(0)
    expect(lawful()).toBeLessThanOrEqual(total())
  })

  it('coverage = lawful / total — the ratio is exactly the composition, no fallback', () => {
    expect(coverage()).toBe(lawful() / total())
  })

  it('LAW_MARKER discriminates — it matches a `**Law` line and rejects prose without one', () => {
    expect(LAW_MARKER.test('**Law — [[law]]: every atom states its invariant**')).toBe(true)
    expect(LAW_MARKER.test('this atom describes behaviour but names no rule')).toBe(false)
  })

  it("this atom's own SKILL.md is lawful — it states its **Law, so it self-counts", () => {
    // The audit measures the live tree including this atom; a law-less lawful atom
    // would be self-refuting. So lawful ≥ 1 (at minimum, this one).
    expect(lawful()).toBeGreaterThanOrEqual(1)
  })
})
