/**
 * Money DTO tests — integer-cents amount + ISO 4217 currency.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-4217:2015 currency-codes
 * @standard IEEE-754-2019 binary-floating-point avoid-for-money
 * @accounting IFRS IAS-21 foreign-currency-translation
 * @see src/standards/_money/money.ts
 */

import { describe, it, expect } from 'vitest'
import { isMoney } from '@/standards/_money'

describe('Money DTO', () => {
  it('accepts integer cents + ISO 4217 currency', () => {
    expect(isMoney({ amountCents: 12345, currency: 'EUR' })).toBe(true)
  })
  it('rejects float cents (must be integer)', () => {
    expect(isMoney({ amountCents: 12.34, currency: 'EUR' })).toBe(false)
  })
  it('rejects bad currency code', () => {
    expect(isMoney({ amountCents: 100, currency: 'eur' })).toBe(false)
    expect(isMoney({ amountCents: 100, currency: 'BG' })).toBe(false)
  })
  it('rejects missing fields', () => {
    expect(isMoney({})).toBe(false)
    expect(isMoney({ amountCents: 100 })).toBe(false)
    expect(isMoney({ currency: 'EUR' })).toBe(false)
  })
  it('rejects non-objects', () => {
    expect(isMoney(null)).toBe(false)
    expect(isMoney('EUR 100')).toBe(false)
    expect(isMoney(100)).toBe(false)
  })
})
