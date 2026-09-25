import { describe, it, expect } from 'vitest'
import {
  digitalRoot,
  horoRatio,
  imperialRatio,
  composeSteps,
  nextOctave,
  throughVoid,
  divThroughVoid,
  inverseOrbit,
  inverseClosure,
  affineStep,
} from './index'

describe('horo/arithmetic', () => {
  describe('digitalRoot', () => {
    it('computes base-10 digital root', () => {
      expect(digitalRoot(0)).toBe(0)
      expect(digitalRoot(5)).toBe(5)
      expect(digitalRoot(9)).toBe(9)
      expect(digitalRoot(10)).toBe(1)
      expect(digitalRoot(18)).toBe(9)
      expect(digitalRoot(23)).toBe(5)
      expect(digitalRoot(999)).toBe(9)
    })

    it('handles negative numbers', () => {
      expect(digitalRoot(-5)).toBe(5)
      expect(digitalRoot(-23)).toBe(5)
    })
  })

  describe('horoRatio', () => {
    it('normalizes digits as ratios', () => {
      expect(horoRatio(9)).toBe(0.9)
      expect(horoRatio(5, 10)).toBe(0.5)
      expect(horoRatio(1, 2)).toBe(0.5)
    })
  })

  describe('imperialRatio', () => {
    it('computes exact rationals', () => {
      expect(imperialRatio(1, 3)).toBeCloseTo(1 / 3)
      expect(imperialRatio(1, 2)).toBe(0.5)
    })
  })

  describe('composeSteps', () => {
    it('composes via product mod 9', () => {
      expect(composeSteps(2, 4)).toBe(8)
      expect(composeSteps(1, 1)).toBe(1)
      expect(composeSteps(3, 3)).toBe(9)
      expect(composeSteps(0, 5)).toBe(9)
      expect(composeSteps(9, 9)).toBe(9)
    })
  })

  describe('nextOctave', () => {
    it('transitions 9 to 1, others pass through', () => {
      expect(nextOctave(9)).toBe(1)
      expect(nextOctave(1)).toBe(1)
      expect(nextOctave(5)).toBe(5)
      expect(nextOctave(0)).toBe(0)
    })
  })

  describe('throughVoid', () => {
    it('reflects via 1 - n mod 9', () => {
      expect(throughVoid(1)).toBe(9)
      expect(throughVoid(9)).toBe(1)
      expect(throughVoid(5)).toBe(5) // fixed point
      expect(throughVoid(3)).toBe(7)
      expect(throughVoid(7)).toBe(3)
    })

    it('is an involution: throughVoid(throughVoid(n)) = n', () => {
      for (let n = 1; n <= 9; n++) {
        expect(throughVoid(throughVoid(n))).toBe(n)
      }
    })
  })

  describe('divThroughVoid', () => {
    it('is same as throughVoid', () => {
      expect(divThroughVoid(9)).toBe(1)
      expect(divThroughVoid(8)).toBe(2)
      expect(divThroughVoid(5)).toBe(5)
    })
  })

  describe('inverseOrbit', () => {
    it('computes orbit of 5^n mod 9 (halving direction)', () => {
      const orbit = inverseOrbit(1)
      expect(orbit).toHaveLength(6)
      expect(new Set(orbit)).toEqual(new Set([1, 5, 7, 8, 4, 2]))
    })

    it('closes after 6 steps (order of ⟨5⟩)', () => {
      const orbit = inverseOrbit(2)
      expect(orbit).toHaveLength(6)
    })
  })

  describe('inverseClosure', () => {
    it('reports the gaps ⟨5⟩ cannot reach', () => {
      const closure = inverseClosure(1)
      expect(closure.order).toBe(6)
      expect(closure.gaps).toEqual([3, 6, 9])
      expect(closure.voidCloses).toBe(true)
    })
  })

  describe('affineStep', () => {
    it('applies affine map x ↦ ax + b mod 9', () => {
      expect(affineStep(1, 2, 0)).toBe(2) // doubling
      expect(affineStep(2, 2, 0)).toBe(4)
      expect(affineStep(5, 2, 0)).toBe(1)
      expect(affineStep(1, 1, 1)).toBe(2) // +1
    })
  })
})

/**
 * Two reflections, one step apart — and only one is the ring's.
 *
 * `throughVoid` pivots on 5 and pairs (3,7) (4,6); `halfTurn` pivots on 9 and pairs
 * (3,6) (4,5). They are confused because they differ by exactly one unit, and the
 * difference decides whether the doubling ring survives the reflection.
 */
describe('horo/arithmetic — the ring mirror is not the number-line mirror', () => {
  const ring = (): number[] => {
    const out: number[] = []
    for (let x = 1, i = 0; i < 6; i++, x = (x * 2) % 9 || 9) out.push(x)
    return out
  }

  it('halfTurn is multiplication by 2³ on every ring element', async () => {
    const { halfTurn } = await import('@/horo')
    for (const x of ring()) expect(halfTurn(x)).toBe((x * 8) % 9 || 9)
  })

  it('halfTurn pivots on 9, the ring zero — throughVoid pivots on 5', async () => {
    const { halfTurn, throughVoid } = await import('@/horo')
    expect(halfTurn(9)).toBe(9)
    expect(throughVoid(5)).toBe(5)
    expect([1, 2, 3, 4].map((n) => halfTurn(n))).toEqual([8, 7, 6, 5])
    expect([1, 2, 3, 4].map((n) => throughVoid(n))).toEqual([9, 8, 7, 6])
  })

  it('and only halfTurn leaves the doubling ring closed', async () => {
    const { halfTurn, throughVoid } = await import('@/horo')
    const r = ring()
    expect(r.every((x) => r.includes(halfTurn(x)))).toBe(true)
    expect(r.every((x) => r.includes(throughVoid(x)))).toBe(false)
    // exactly the three that escape: 1↦9, 4↦6, 7↦3
    expect(r.filter((x) => !r.includes(throughVoid(x)))).toEqual([1, 4, 7])
  })

  it('the two mirrors differ by one step of the ring', async () => {
    const { halfTurn, throughVoid } = await import('@/horo')
    for (let n = 1; n <= 9; n++) {
      expect(halfTurn(n)).toBe(((((throughVoid(n) - 1) % 9) + 9) % 9) || 9)
    }
  })

  it('halfTurn is an involution — three steps of 60° there and back is 360°', async () => {
    const { halfTurn } = await import('@/horo')
    for (let n = 1; n <= 9; n++) expect(halfTurn(halfTurn(n))).toBe(n)
    expect(3 * 60).toBe(180) // half the 6-cycle
  })

  it('the diagonal touches 4 of 9 — opens at 1, closes at 9, repeats at 9', async () => {
    const { diagonal } = await import('@/horo')
    const d = diagonal()
    expect(d).toEqual([1, 4, 9, 7, 7, 9, 4, 1, 9])
    expect([...new Set(d)].sort((a, b) => a - b)).toEqual([1, 4, 7, 9])
    expect(d[0]).toBe(1)
    expect(d[8]).toBe(9)
  })

  it('but its residues are a 3-cycle at 120°, never a 4-cycle at 90°', async () => {
    const { diagonal } = await import('@/horo')
    const sq = [...new Set(diagonal())].filter((x) => x !== 9)
    expect(sq).toEqual([1, 4, 7])
    // closed under multiplication — a real subgroup
    expect(sq.every((a) => sq.every((b) => sq.includes((a * b) % 9 || 9)))).toBe(true)
    expect(360 / sq.length).toBe(120)
    // Lagrange: (Z/9Z)* has order 6, so no subgroup of order 4 exists to carry a 90° step
    expect(6 % 4).not.toBe(0)
  })
})

/**
 * Only a LINEAR mirror survives casting out nines.
 *
 * 8 + 8 = 16, and reflecting its digits (1,6) ↦ (9,4) under throughVoid lands on 4 —
 * while folding first, dr(16) = 7, and reflecting lands on 3. The digit-wise reflection
 * and the reflection of the number are different answers, and they differ by exactly
 * the one unit that separates the two mirrors.
 */
describe('horo/arithmetic — the fold keeps the linear mirror and loses the affine one', () => {
  const dr = (n: number): number => (((n - 1) % 9) + 9) % 9 + 1
  const digits = (n: number): number[] => String(n).split('').map(Number)

  it('8 + 8 = 16 folds to 7, and the two mirrors disagree on it', async () => {
    const { throughVoid, halfTurn } = await import('@/horo')
    expect(dr(8 + 8)).toBe(7)
    expect(digits(16)).toEqual([1, 6])

    // reflect the DIGITS, then fold
    expect(digits(16).map(throughVoid)).toEqual([9, 4])
    expect(dr(9 + 4)).toBe(4)
    expect(digits(16).map(halfTurn)).toEqual([8, 3])
    expect(dr(8 + 3)).toBe(2)

    // fold FIRST, then reflect
    expect(throughVoid(7)).toBe(3) // ≠ 4 — the affine mirror does not survive the fold
    expect(halfTurn(7)).toBe(2) //   = 2 — the linear one does
  })

  it('over all 81 pairs: halfTurn always commutes with the fold, throughVoid never', async () => {
    const { throughVoid, halfTurn } = await import('@/horo')
    let affineHolds = 0
    let linearHolds = 0
    for (let x = 1; x <= 9; x++) {
      for (let y = 1; y <= 9; y++) {
        if (dr(throughVoid(x) + throughVoid(y)) === throughVoid(dr(x + y))) affineHolds++
        if (dr(halfTurn(x) + halfTurn(y)) === halfTurn(dr(x + y))) linearHolds++
      }
    }
    expect(linearHolds).toBe(81)
    expect(affineHolds).toBe(0)
  })

  it('and the affine defect is exactly one — the unit the mirrors differ by', async () => {
    const { throughVoid } = await import('@/horo')
    for (let x = 1; x <= 9; x++) {
      for (let y = 1; y <= 9; y++) {
        const defect = (((dr(throughVoid(x) + throughVoid(y)) - throughVoid(dr(x + y))) % 9) + 9) % 9
        expect(defect).toBe(1)
      }
    }
  })
})
