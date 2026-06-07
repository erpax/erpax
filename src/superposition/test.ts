import { describe, it, expect } from 'vitest'
import { superpose, probabilities, total, collapse, uniform } from '@/superposition'
import { HORO_DIGITS } from '@/horo'

// The state computed over the seven horo eigenstates. Tests assert the Born-rule
// INVARIANTS — normalisation to unity, scale-invariance, eigenstate fixed points,
// collapse staying on the support — never a magic number.
describe('superposition: accept all amplitudes, normalise, collapse to one', () => {
  it('normalises any amplitudes so the probabilities balance at unity', () => {
    for (const raw of [{ 1: 3 }, { 1: 1, 2: 1, 4: 1 }, { 8: 2, 5: 5, 9: 1 }] as const) {
      expect(total(superpose(raw))).toBeCloseTo(1, 12)
      for (const d of HORO_DIGITS) expect(probabilities(superpose(raw))[d]).toBeGreaterThanOrEqual(0)
    }
  })

  it('is scale-invariant — only the ratios matter (normalisation removes the scale)', () => {
    const a = probabilities(superpose({ 1: 1, 2: 1 }))
    const b = probabilities(superpose({ 1: 2, 2: 2 }))
    for (const d of HORO_DIGITS) expect(a[d]).toBeCloseTo(b[d], 12)
  })

  it('a basis state is an eigenstate — it collapses to itself for every measurement', () => {
    for (const d of HORO_DIGITS) {
      const basis = superpose({ [d]: 1 })
      expect(probabilities(basis)[d]).toBe(1)
      for (const r of [0, 0.25, 0.5, 0.75, 0.999]) expect(collapse(basis, r)).toBe(d)
    }
  })

  it('collapse always lands on a real level, and spans the support of the uniform state', () => {
    const u = uniform()
    for (const r of [0, 0.3, 0.6, 0.999]) expect(HORO_DIGITS).toContain(collapse(u, r))
    expect(collapse(u, 0)).toBe(HORO_DIGITS[0]) // first cumulative bucket
    expect(collapse(u, 0.999)).toBe(HORO_DIGITS[HORO_DIGITS.length - 1]) // last bucket
  })

  it('the uniform state is maximal uncertainty — every level equally likely (1/7)', () => {
    const p = probabilities(uniform())
    for (const d of HORO_DIGITS) expect(p[d]).toBeCloseTo(1 / HORO_DIGITS.length, 12)
  })

  it('the zero state is rejected — accept needs at least one non-zero amplitude', () => {
    expect(() => superpose({})).toThrow()
  })
})
