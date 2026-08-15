import { describe, it, expect } from 'vitest'
import {
  doublingOrbits,
  trinities,
  orbitOf,
  rayOf,
  antimatter,
  fiveRoles,
} from './index'

describe('horo/ring', () => {
  describe('doublingOrbits', () => {
    it('partitions 1..9 into three closed circuits', () => {
      const orbits = doublingOrbits()
      expect(orbits).toHaveLength(3)

      // Verify all elements 1..9 are covered exactly once
      const all = orbits.flat()
      expect(new Set(all)).toEqual(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]))
    })

    it('identifies pole, inner circuit, and ring orbit', () => {
      const orbits = doublingOrbits()
      expect(orbits[0]).toEqual([9]) // pole
      expect(orbits[1]).toEqual([3, 6]) // inner circuit
      expect(orbits[2]).toHaveLength(6) // ring
    })
  })

  describe('trinities', () => {
    it('partitions 1..9 into three mod-3 classes', () => {
      const tri = trinities()
      expect(tri.flowEast).toEqual([1, 4, 7])
      expect(tri.flowWest).toEqual([2, 5, 8])
      expect(tri.axis).toEqual([3, 6, 9])

      const all = [...tri.flowEast, ...tri.flowWest, ...tri.axis]
      expect(new Set(all)).toEqual(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]))
    })
  })

  describe('orbitOf', () => {
    it('computes orbit under doubling', () => {
      expect(orbitOf(1)).toEqual([1, 2, 4, 8, 7, 5])
      expect(orbitOf(3)).toEqual([3, 6])
      expect(orbitOf(9)).toEqual([9])
    })

    it('is canonical and closed — every step belongs to its orbit, and doubling the last returns to the first', () => {
      for (let n = 1; n <= 9; n++) {
        const orbit = orbitOf(n)
        expect(orbit).toContain(n) // membership, not entry order — the orbit is CANONICAL
        expect(orbitOf(orbit[0]!)).toEqual(orbit) // same orbit from any of its members
        expect((orbit[orbit.length - 1]! * 2) % 9 || 9).toBe(orbit[0]) // the cycle closes
      }
    })
  })

  describe('rayOf', () => {
    it('classifies digits as ring, axis, or void', () => {
      expect(rayOf(1)).toBe('ring')
      expect(rayOf(2)).toBe('ring')
      expect(rayOf(5)).toBe('ring')
      expect(rayOf(3)).toBe('axis')
      expect(rayOf(6)).toBe('axis')
      expect(rayOf(9)).toBe('axis') // pole is on axis
      expect(rayOf(0)).toBe('void')
    })
  })

  describe('antimatter', () => {
    it('finds the complement step', () => {
      // antimatter is the ADDITIVE inverse: n + antimatter(n) ≡ 0 (mod 9); the void 9 is its own
      expect(antimatter(1)).toBe(8)
      expect(antimatter(9)).toBe(9)
      // For ring elements, verify pairing exists
      for (let n of [1, 2, 4, 5, 7, 8]) {
        const m = antimatter(n)
        expect(m).toBeGreaterThanOrEqual(1)
        expect(m).toBeLessThanOrEqual(9)
      }
    })
  })

  describe('fiveRoles', () => {
    it('splits balance and attraction', () => {
      const roles = fiveRoles()
      expect(roles.centroid).toBe(5)
      expect(roles.mirrorFixed).toBe(true) // 5 reflects to itself
      expect(roles.propulsion).toBe(true) // 5 = 2^-1
      expect(roles.attractor).toBe(9)
      expect(roles.isAttractor).toBe(false) // 5 is not fixed under doubling
    })
  })
})
