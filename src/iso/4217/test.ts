import { describe, it, expect } from 'vitest'
import { isIso4217 } from '@/iso/4217'

describe('iso/4217 — currency-code shape validator', () => {
  it('accepts exactly 3 uppercase letters', () => {
    expect(isIso4217('USD')).toBe(true)
    expect(isIso4217('EUR')).toBe(true)
    expect(isIso4217('JPY')).toBe(true)
  })

  it('rejects wrong length, case, digits, and non-strings', () => {
    expect(isIso4217('US')).toBe(false) // too short
    expect(isIso4217('USDD')).toBe(false) // too long
    expect(isIso4217('usd')).toBe(false) // case-sensitive
    expect(isIso4217('US1')).toBe(false) // digit
    expect(isIso4217(978 as unknown)).toBe(false) // numeric code not accepted
  })
})
