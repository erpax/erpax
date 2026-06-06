import { describe, it, expect } from 'vitest'
import { aspects, covers, coverage, brainstorm, consultationRoi } from '@/quantum/consultant'

describe('quantum/consultant — covers all aspects of life, trained by coordinated brainstorming', () => {
  it('aspects span the whole corpus (many top-level atoms); coverage is total', () => {
    expect(aspects().length).toBeGreaterThan(50)
    expect(coverage()).toBe(1)
  })
  it('covers an aspect the corpus holds, not one it does not', () => {
    expect(covers('quantum')).toBe(true)
    expect(covers('__not_an_aspect__')).toBe(false)
  })
  it('coordinated brainstorming diverges then converges (throws on no perspective)', () => {
    expect(brainstorm(['a', 'b', 'c'], (c) => c.join('+'))).toBe('a+b+c')
    expect(() => brainstorm([], (c) => c.join('+'))).toThrow()
  })
  it('a cache-hit consultation is infinite ROI; a miss amortises its sunk cost', () => {
    expect(consultationRoi(100, true)).toBe(Number.POSITIVE_INFINITY)
    expect(consultationRoi(100, false, 50)).toBe(2)
  })
})
