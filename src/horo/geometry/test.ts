import { describe, it, expect } from 'vitest'
import { PI, algebraSqrt } from '@/algebra'
import {
  circleLoop,
  lemniscate,
  atVoid,
  turningNumber,
  sequenceForward,
  sequenceReflected,
  cornerLimit,
  cornerSweep,
  isMergePoint,
  pivotSingularities,
} from './index'

describe('horo/geometry', () => {
  describe('circleLoop', () => {
    it('traces a unit circle', () => {
      const p0 = circleLoop(0)
      expect(p0.x).toBeCloseTo(1)
      expect(p0.y).toBeCloseTo(0)

      const pHalf = circleLoop(PI / 2)
      expect(pHalf.x).toBeCloseTo(0, 9)
      expect(pHalf.y).toBeCloseTo(1)
    })

    it('never reaches the void', () => {
      const samples = 100
      for (let i = 0; i < samples; i++) {
        const t = (i / samples) * 2 * PI
        const p = circleLoop(t)
        expect(atVoid(p)).toBe(false)
      }
    })
  })

  describe('lemniscate', () => {
    it('traces a figure-eight', () => {
      const p0 = lemniscate(0)
      expect(p0.x).toBeCloseTo(1)

      // Gerono: y = sin(2t)/2, so at t = π/2 the eight CROSSES THE VOID — y is 0, not a lobe height.
      const pHalf = lemniscate(PI / 2)
      expect(pHalf.x).toBeCloseTo(0, 9)
      expect(pHalf.y).toBeCloseTo(0, 9)
      const pLobe = lemniscate(PI / 4)
      expect(pLobe.y).toBeCloseTo(0.5)
    })

    it('crosses the void at fold points', () => {
      const pFold1 = lemniscate(PI / 2)
      expect(atVoid(pFold1)).toBe(true)

      const pFold2 = lemniscate((3 * PI) / 2)
      expect(atVoid(pFold2)).toBe(true)
    })
  })

  describe('atVoid', () => {
    it('detects points near origin', () => {
      expect(atVoid({ x: 0, y: 0 })).toBe(true)
      expect(atVoid({ x: 1e-10, y: 1e-10 })).toBe(true)
      expect(atVoid({ x: 0.1, y: 0 })).toBe(false)
    })
  })

  describe('turningNumber', () => {
    it('computes turning number of circle as 1', () => {
      const turn = turningNumber(circleLoop, 1000)
      expect(turn).toBeCloseTo(1, 0)
    })

    it('computes turning number of lemniscate as 0', () => {
      const turn = turningNumber(lemniscate, 1000)
      expect(turn).toBeCloseTo(0, 0)
    })
  })

  describe('sequences', () => {
    it('forward sequence threads flow, axis, pole, void and reopening', () => {
      expect(sequenceForward()).toEqual([1, 2, 4, 8, 7, 5, 3, 6, 9, 0, 1])
    })

    it('reflected sequence is the forward nine through the void, 0 held, 1 → 9', () => {
      expect(sequenceReflected()).toEqual([9, 8, 6, 2, 3, 5, 7, 4, 1, 0, 9])
    })
  })

  describe('cornerLimit', () => {
    it('computes max speed for corner', () => {
      const limit = cornerLimit(10, 1)
      expect(limit.radius).toBe(10)
      expect(limit.curvature).toBeCloseTo(0.1)
      expect(limit.maxSpeed).toBeGreaterThan(0)
      expect(limit.maxSpeed).toBeCloseTo(algebraSqrt(10))
    })
  })

  describe('cornerSweep', () => {
    it('sweeps limits over radii', () => {
      const limits = cornerSweep(1, [10, 20, 30])
      expect(limits).toHaveLength(3)
      expect(limits[0].radius).toBe(10)
      expect(limits[1].radius).toBe(20)
      expect(limits[2].radius).toBe(30)
    })
  })

  describe('pivotSingularities — one theorem, not three coincidences', () => {
    it('fixedByMirror ⟺ inverseOfDoubling for EVERY digit — the same congruence 2n ≡ 1 (mod 9)', () => {
      for (const s of pivotSingularities()) {
        expect(s.fixedByMirror).toBe(s.inverseOfDoubling)
      }
    })

    it('counts are 0 or 3 only — nothing holds exactly one or two of the three', () => {
      for (const s of pivotSingularities()) {
        expect([0, 3]).toContain(s.count)
      }
      expect(pivotSingularities().filter((s) => s.count === 3).map((s) => s.digit)).toEqual([5])
    })

    it('the pivot of base b is b/2 — 2·(b/2) = b ≡ 1 (mod b−1), for every even base 4–16', () => {
      for (const b of [4, 6, 8, 10, 12, 14, 16]) {
        const m = b - 1
        const digits = [...Array(b - 1).keys()].map((i) => i + 1)
        const mirrorFixed = digits.filter((n) => ((((1 - n) % m) + m) % m) === n % m)
        const inverseOf2 = digits.filter((n) => (2 * n) % m === 1)
        const carryVoid = digits.filter((n) => (2 * n) % b === 0) // double written `10` in base b
        expect(mirrorFixed).toEqual([b / 2])
        expect(inverseOf2).toEqual([b / 2])
        expect(carryVoid).toEqual([b / 2])
      }
    })
  })

  describe('isMergePoint', () => {
    it('true iff the composed step is 1 or 9', () => {
      expect(isMergePoint(9, 1)).toBe(true) // 9×1 → 9
      expect(isMergePoint(1, 2)).toBe(false) // → 2
      expect(isMergePoint(5, 9)).toBe(true) // 45 → 9: the pole composes to a merge from anywhere
      expect(isMergePoint(1, 1)).toBe(true) // → 1
      expect(isMergePoint(2, 4)).toBe(false) // → 8
    })
  })
})
