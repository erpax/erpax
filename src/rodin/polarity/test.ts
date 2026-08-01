import { describe, expect, it } from 'vitest'

import { throughVoid, VOID_PIVOT } from '@/horo'

import { double, FIXED, FORWARD, helices, isBoundary, mirrored, opposite, REVERSE } from './index'

describe('rodin/polarity — the 3↔6 boundary, proven where it is stated', () => {
  it('doubling SWAPS 3 and 6 around the fixed 9 — a 2-cycle, which is what makes it a polarity', () => {
    expect(double(FORWARD)).toBe(REVERSE)
    expect(double(REVERSE)).toBe(FORWARD)
    expect(double(FIXED)).toBe(FIXED) // the pole is still; the boundaries turn around it
    expect(double(double(FORWARD))).toBe(FORWARD) // order 2 — one object, two orientations
    expect(opposite(FORWARD)).toBe(REVERSE)
    expect(opposite(REVERSE)).toBe(FORWARD)
    expect(opposite(FIXED)).toBe(FIXED) // the pole has no opposite
  })

  it('the boundaries are exactly 3 and 6 — the pole and the flow are not boundaries', () => {
    expect(isBoundary(3)).toBe(true)
    expect(isBoundary(6)).toBe(true)
    expect(isBoundary(9)).toBe(false)
    for (const u of [1, 2, 4, 5, 7, 8]) expect(isBoundary(u)).toBe(false)
    expect(isBoundary(12)).toBe(true) // by digital root, at any octave
    expect(FORWARD + REVERSE).toBe(FIXED) // the pair sums to the pole
  })

  it('forward ⟨2⟩ and reverse ⟨5⟩ are the same ring wound opposite ways', () => {
    const { forward, reverse } = helices()
    expect([...forward]).toEqual([1, 2, 4, 8, 7, 5])
    expect([...reverse]).toEqual([1, 5, 7, 8, 4, 2])
    expect([...reverse]).toEqual([forward[0]!, ...[...forward].slice(1).reverse()]) // one reversed
    expect((2 * VOID_PIVOT) % 9).toBe(1) // 5 is 2⁻¹ — the proof they are inverse, not a resemblance
    expect(forward).toHaveLength(reverse.length)
  })

  it('the MIRROR pairs the axis differently — 3↔6 is a doubling fact, not a mirror fact', () => {
    const m = mirrored()
    expect(m[FORWARD]).toBe(7) // throughVoid(3) = 7, NOT 6
    expect(m[REVERSE]).toBe(4) // throughVoid(6) = 4, NOT 3
    expect(m[FIXED]).toBe(1) // and the pole reflects to the unit
    expect(throughVoid(FORWARD)).not.toBe(REVERSE) // the conflation this atom exists to prevent
  })
})
