import { describe, it, expect } from 'vitest'
import { add, mul, fold } from '@/quantum/calculator'

describe('quantum/calculator — arithmetic in the digital-root (mod-9) substrate', () => {
  it('add folds the sum to its digital root', () => {
    expect(add(7, 5)).toBe(3) // 12 → 3
    expect(add(9, 9)).toBe(9) // 18 → 9
  })
  it('mul folds the product', () => {
    expect(mul(4, 7)).toBe(1) // 28 → 10 → 1
  })
  it('fold is the digital root', () => {
    expect(fold(12345)).toBe(6)
  })
})
