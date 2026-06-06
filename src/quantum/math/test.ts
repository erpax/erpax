import { describe, it, expect } from 'vitest'
import { root, uuidDigit, closedUnderAdd } from '@/quantum/math'

// Math on the uuid/matrix substrate: the digital root (mod-9) and its closure under addition.
describe('quantum/math — math grounded in the digital-root / mod-9 substrate', () => {
  it('root folds a number to 1..9 (the digital root)', () => {
    expect(root(12345)).toBe(6) // 1+2+3+4+5=15 → 6
    expect(root(9)).toBe(9)
    expect(root(18)).toBe(9)
  })
  it('digital roots are closed under addition (mod-9)', () => {
    expect(closedUnderAdd(7, 5)).toBe(true)
    expect(closedUnderAdd(123, 456)).toBe(true)
    expect(closedUnderAdd(0, 0)).toBe(true)
  })
  it('a content-uuid folds to its own digit (1..9)', () => {
    const d = uuidDigit('0fa7a355-0000-8000-8000-000000000000')
    expect(d).toBeGreaterThanOrEqual(0)
    expect(d).toBeLessThanOrEqual(9)
  })
})
