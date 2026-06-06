/**
 * convention/reciprocal — the symmetric-entanglement convention measures itself. coverage =
 * reciprocal / total must be a real fraction in [0,1] computed live over the uuid-matrix, and
 * stable across calls (pure over the same edge set — no default, no clock).
 */
import { describe, it, expect } from 'vitest'
import { coverage, total, reciprocal, reciprocalTally } from '@/convention/reciprocal'

describe('convention/reciprocal — every directed edge is reciprocated, measured live', () => {
  it('coverage is a finite fraction in [0,1]', () => {
    const c = coverage()
    expect(Number.isFinite(c)).toBe(true)
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
  })

  it('coverage is deterministic over the same edge set (no default, no clock)', () => {
    expect(coverage()).toBe(coverage())
  })

  it('coverage equals reciprocal / total from the composed matrix edges', () => {
    const t = total()
    const r = reciprocal()
    expect(t).toBeGreaterThan(0) // the corpus is non-empty by architecture
    expect(r).toBeGreaterThanOrEqual(0) // reciprocal is a subset count
    expect(r).toBeLessThanOrEqual(t) // …of the same edge set
    expect(coverage()).toBe(r / t)
  })

  it('the tally is internally consistent: reciprocal + oneWay = total', () => {
    const { total: t, reciprocal: r, oneWay } = reciprocalTally()
    expect(r + oneWay.length).toBe(t)
  })
})
