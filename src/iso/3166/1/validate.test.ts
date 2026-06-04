/**
 * ISO 3166-1 country-code validator tests (alpha-2 + alpha-3).
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-3166-1:2020 country-codes
 * @see src/standards/iso-3166-1/validate.ts
 */

import { describe, it, expect } from 'vitest'
import { isIso3166Alpha2, isIso3166Alpha3 } from '@/iso/3166/1'

describe('ISO 3166-1 alpha-2 country codes', () => {
  it('accepts 2-letter uppercase', () => {
    expect(isIso3166Alpha2('US')).toBe(true)
    expect(isIso3166Alpha2('DE')).toBe(true)
    expect(isIso3166Alpha2('GB')).toBe(true)
  })
  it('rejects lowercase, wrong length, non-strings', () => {
    expect(isIso3166Alpha2('us')).toBe(false)
    expect(isIso3166Alpha2('USA')).toBe(false)
    expect(isIso3166Alpha2('U')).toBe(false)
    expect(isIso3166Alpha2(840)).toBe(false)
  })
})

describe('ISO 3166-1 alpha-3 country codes', () => {
  it('accepts 3-letter uppercase', () => {
    expect(isIso3166Alpha3('USA')).toBe(true)
    expect(isIso3166Alpha3('DEU')).toBe(true)
  })
  it('rejects 2-letter (alpha-2 not alpha-3)', () => {
    expect(isIso3166Alpha3('US')).toBe(false)
  })
})
