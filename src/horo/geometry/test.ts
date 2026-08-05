import { describe, it, expect } from 'vitest'
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
} from './index'

describe('horo/geometry', () => {
  describe('circleLoop', () => {
    it('traces a unit circle', () => {
      const p0 = circleLoop(0)
      expect(p0.x).toBeCloseTo(1)
      expect(p0.y).toBeCloseTo(0)

      const pHalf = circleLoop(Math.PI / 2)
      expect(pHalf.x).toBeCloseTo(0, 9)
      expect(pHalf.y).toBeCloseTo(1)
    })

    it('never reaches the void', () => {
      const samples = 100
      for (let i = 0; i < samples; i++) {
        const t = (i / samples) * 2 * Math.PI
        const p = circleLoop(t)
        expect(atVoid(p)).toBe(false)
      }
    })
  })

  describe('lemniscate', () => {
    it('traces a figure-eight', () => {
      const p0 = lemniscate(0)
      expect(p0.x).toBeCloseTo(1)

      const pHalf = lemniscate(Math.PI / 2)
      expect(pHalf.x).toBeCloseTo(0, 9)
      expect(pHalf.y).toBeCloseTo(0.5)
    })

    it('crosses the void at fold points', () => {
      const pFold1 = lemniscate(Math.PI / 2)
      expect(atVoid(pFold1)).toBe(true)

      const pFold2 = lemniscate((3 * Math.PI) / 2)
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
    it('forward sequence is doubling orbit', () => {
      expect(sequenceForward()).toEqual([1, 2, 4, 8, 7, 5])
    })

    it('reflected sequence is halving orbit', () => {
      expect(sequenceReflected()).toEqual([1, 5, 7, 8, 4, 2])
    })
  })

  describe('cornerLimit', () => {
    it('computes max speed for corner', () => {
      const limit = cornerLimit(10, 1)
      expect(limit.radius).toBe(10)
      expect(limit.maxLateralAccel).toBe(1)
      expect(limit.maxSpeed).toBeGreaterThan(0)
      expect(limit.maxSpeed).toBeCloseTo(Math.sqrt(10))
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

  describe('isMergePoint', () => {
    it('detects 9 → 1 transition', () => {
      expect(isMergePoint(9, 1)).toBe(true)
      expect(isMergePoint(1, 2)).toBe(false)
      expect(isMergePoint(5, 9)).toBe(false)
    })
  })
})
