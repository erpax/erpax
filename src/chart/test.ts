import { describe, it, expect } from 'vitest'
import { chart, normalize } from '@/chart'

describe('chart — pure spec + normalizer', () => {
  it('computes the range and normalizes to [0,1]', () => {
    const c = chart([3, 1, 4, 1, 5])
    expect(c.min).toBe(1)
    expect(c.max).toBe(5)
    expect(normalize(c, 1)).toBe(0)
    expect(normalize(c, 5)).toBe(1)
    expect(normalize(c, 3)).toBe(0.5)
  })
  it('empty or flat series normalize to 0 (no divide-by-zero)', () => {
    expect(normalize(chart([]), 0)).toBe(0)
    expect(normalize(chart([2, 2]), 2)).toBe(0)
  })
})
