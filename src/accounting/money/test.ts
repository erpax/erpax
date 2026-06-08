import { describe, it, expect } from 'vitest'
import { MoneyFormatter } from './index'

describe('accounting/money — integer-cents convention', () => {
  it('MoneyFormatter.divideCents throws on zero divisor', () => {
    expect(() => MoneyFormatter.divideCents(100, 0)).toThrow('Cannot divide by zero')
  })
})
