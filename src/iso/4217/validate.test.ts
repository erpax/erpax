/**
 * ISO 4217 currency-code validator tests.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-4217:2015 currency-codes
 * @see src/standards/iso-4217/validate.ts
 */

import { describe, it, expect } from 'vitest'
import { isIso4217 } from '@/iso/4217'

describe('ISO 4217 currency codes', () => {
  it('accepts 3-letter uppercase codes', () => {
    expect(isIso4217('EUR')).toBe(true)
    expect(isIso4217('JPY')).toBe(true)
    expect(isIso4217('CHF')).toBe(true)
    expect(isIso4217('USD')).toBe(true)
  })
  it('rejects lowercase / mixed-case', () => {
    expect(isIso4217('usd')).toBe(false)
    expect(isIso4217('Usd')).toBe(false)
  })
  it('rejects wrong length', () => {
    expect(isIso4217('US')).toBe(false)
    expect(isIso4217('USDX')).toBe(false)
  })
  it('rejects non-strings', () => {
    expect(isIso4217(840)).toBe(false)
    expect(isIso4217(null)).toBe(false)
    expect(isIso4217(undefined)).toBe(false)
  })
})
