import { describe, it, expect } from 'vitest'
import { richness, shannon, simpson, evenness } from '@/diversity'
import { herfindahl } from '@/decentralization'

// diversity computed on pure math distributions. Asserts RELATIONS and IDENTITIES
// that break the instant the math drifts — never an opaque magic number.
describe('diversity: Shannon / Simpson / Pielou over abundance distributions', () => {

  // 1. Single class: all diversity is zero, evenness is trivially 1.
  describe('single class', () => {
    it('[5] — richness 1, shannon 0, simpson 0, evenness 1', () => {
      expect(richness([5])).toBe(1)
      expect(shannon([5])).toBe(0)
      expect(simpson([5])).toBe(0)
      expect(evenness([5])).toBe(1)
    })
    it('[7,0,0] — same: only one nonzero class', () => {
      expect(richness([7, 0, 0])).toBe(1)
      expect(shannon([7, 0, 0])).toBe(0)
      expect(simpson([7, 0, 0])).toBe(0)
      expect(evenness([7, 0, 0])).toBe(1)
    })
  })

  // 2. n equal classes: maximum diversity — shannon = ln(n), simpson = 1 − 1/n, evenness = 1.
  describe('n equal classes (maximum diversity)', () => {
    it('[1,1,1,1] n=4 — shannon ≈ ln(4), simpson ≈ 3/4, evenness ≈ 1', () => {
      expect(shannon([1, 1, 1, 1])).toBeCloseTo(Math.log(4))
      expect(simpson([1, 1, 1, 1])).toBeCloseTo(1 - 1 / 4)
      expect(evenness([1, 1, 1, 1])).toBeCloseTo(1)
    })
    it('[1,1,1] n=3 — shannon ≈ ln(3), simpson ≈ 2/3, evenness ≈ 1', () => {
      expect(shannon([1, 1, 1])).toBeCloseTo(Math.log(3))
      expect(simpson([1, 1, 1])).toBeCloseTo(1 - 1 / 3)
      expect(evenness([1, 1, 1])).toBeCloseTo(1)
    })
  })

  // 3. THE DUALITY IDENTITY: simpson(x) === 1 − herfindahl(x) for the same distribution.
  //    Σpᵢ² is the Herfindahl index — diversity and concentration are one phenomenon.
  describe('simpson = 1 − herfindahl (the core duality)', () => {
    it('[5,3,2] — simpson + herfindahl = 1 exactly', () => {
      const x = [5, 3, 2]
      expect(simpson(x)).toBeCloseTo(1 - herfindahl(x))
    })
    it('[10,1,1,1] — skewed distribution still satisfies the duality', () => {
      const x = [10, 1, 1, 1]
      expect(simpson(x)).toBeCloseTo(1 - herfindahl(x))
    })
  })

  // 4. shannon ≥ 0, simpson ∈ [0,1); invariant under abundance scaling.
  describe('range invariants and scale independence', () => {
    it('shannon ≥ 0 and simpson ∈ [0,1) for skewed [5,3,2]', () => {
      const x = [5, 3, 2]
      expect(shannon(x)).toBeGreaterThanOrEqual(0)
      expect(simpson(x)).toBeGreaterThanOrEqual(0)
      expect(simpson(x)).toBeLessThan(1)
    })
    it('[2,2] and [1,1] give identical shannon and simpson (scale-invariant)', () => {
      expect(shannon([2, 2])).toBeCloseTo(shannon([1, 1]))
      expect(simpson([2, 2])).toBeCloseTo(simpson([1, 1]))
    })
  })

})
