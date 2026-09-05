import { describe, it, expect } from 'vitest'
import { formatAmount, formatCurrency } from './index'

describe('format/amount — integer cents in, decimal string out', () => {
  it('renders exactly two decimals, whatever the magnitude', () => {
    expect(formatAmount(1234)).toBe('12.34')
    expect(formatAmount(0)).toBe('0.00')
    expect(formatAmount(1)).toBe('0.01')
    expect(formatAmount(100)).toBe('1.00')
    expect(formatAmount(123456789)).toBe('1234567.89')
  })

  it('keeps the sign, because a credit note is a negative document', () => {
    expect(formatAmount(-500)).toBe('-5.00')
    expect(formatAmount(-1)).toBe('-0.01')
  })

  it('formatCurrency is the display face of the same number', () => {
    expect(formatCurrency(1234)).toBe('$' + formatAmount(1234))
    expect(formatCurrency(-500)).toBe('$-5.00')
  })
})
