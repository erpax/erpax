import { describe, it, expect } from 'vitest'
import { calculateAverage, calculateAverageRounded } from '@/average/calculator'

describe('average/calculator — calculateAverage', () => {
  it('empty array collapses to the additive identity 0 (never NaN)', () => {
    const r = calculateAverage([])
    expect(r).toBe(0)
    expect(Number.isNaN(r)).toBe(false)
  })

  it('single element is its own mean', () => {
    expect(calculateAverage([42])).toBe(42)
  })

  it('arithmetic mean of a uniform set', () => {
    expect(calculateAverage([2, 4, 6])).toBe(4)
  })

  it('handles negatives and fractions', () => {
    expect(calculateAverage([-1, 1])).toBe(0)
    expect(calculateAverage([1, 2])).toBeCloseTo(1.5, 10)
  })

  it('matches the sum/length definition for an arbitrary set', () => {
    const xs = [3, 7, 11, 13, 5]
    const expected = xs.reduce((s, v) => s + v, 0) / xs.length
    expect(calculateAverage(xs)).toBe(expected)
  })
})

describe('average/calculator — calculateAverageRounded', () => {
  it('empty array collapses to 0', () => {
    expect(calculateAverageRounded([])).toBe(0)
  })

  it('rounds the mean to the nearest integer (half rounds up)', () => {
    // mean = 1.5 → Math.round → 2
    expect(calculateAverageRounded([1, 2])).toBe(2)
    // mean = 2.4 → 2
    expect(calculateAverageRounded([2, 2, 3])).toBe(2)
  })

  it('equals Math.round of the raw mean', () => {
    const xs = [1, 2, 2, 2]
    expect(calculateAverageRounded(xs)).toBe(Math.round(calculateAverage(xs)))
  })
})
