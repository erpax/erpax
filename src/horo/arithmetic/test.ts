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
