import { describe, it, expect } from 'vitest'
import { isSwiftBic } from '@/iso/9362'

// ISO 9362:2022 §6 — BIC structure: 6 alpha + 2 alnum + optional 3 alnum branch.
describe('iso/9362 — BIC / SWIFT structural validator', () => {
  it('accepts 8-char and 11-char BICs', () => {
    expect(isSwiftBic('DEUTDEFF')).toBe(true)
    expect(isSwiftBic('DEUTDEFF500')).toBe(true)
  })

  it('rejects wrong length, lowercase, and digits in the institution prefix', () => {
    expect(isSwiftBic('DEUTDEF')).toBe(false) // 7 chars
    expect(isSwiftBic('DEUTDEFF5')).toBe(false) // 9 chars (not 8 or 11)
    expect(isSwiftBic('deutdeff')).toBe(false) // lowercase
    expect(isSwiftBic('DEUT1EFF')).toBe(false) // digit in 6-alpha prefix
  })

  it('is a type guard that rejects non-strings', () => {
    expect(isSwiftBic(12345678)).toBe(false)
    expect(isSwiftBic(null)).toBe(false)
    expect(isSwiftBic(undefined)).toBe(false)
  })
})
