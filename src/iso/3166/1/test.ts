import { describe, it, expect } from 'vitest'
import { isIso3166Alpha2, isIso3166Alpha3 } from '@/iso/3166/1'

describe('iso/3166/1 — country-code shape validators', () => {
  it('alpha-2 accepts exactly 2 uppercase letters', () => {
    expect(isIso3166Alpha2('US')).toBe(true)
    expect(isIso3166Alpha2('DE')).toBe(true)
    expect(isIso3166Alpha2('us')).toBe(false) // case-sensitive
    expect(isIso3166Alpha2('USA')).toBe(false) // too long
    expect(isIso3166Alpha2('U1')).toBe(false) // digit
    expect(isIso3166Alpha2(42 as unknown)).toBe(false)
  })

  it('alpha-3 accepts exactly 3 uppercase letters', () => {
    expect(isIso3166Alpha3('USA')).toBe(true)
    expect(isIso3166Alpha3('GBR')).toBe(true)
    expect(isIso3166Alpha3('US')).toBe(false) // too short
    expect(isIso3166Alpha3('usa')).toBe(false) // case-sensitive
    expect(isIso3166Alpha3(undefined as unknown)).toBe(false)
  })
})
