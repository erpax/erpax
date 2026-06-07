import { describe, it, expect } from 'vitest'
import { isIso3166_2 } from '@/iso/3166/2'

describe('iso/3166/2 — subdivision-code shape validator', () => {
  it('accepts alpha-2 country + hyphen + 1..3 alphanumeric subdivision', () => {
    expect(isIso3166_2('US-CA')).toBe(true)
    expect(isIso3166_2('DE-BY')).toBe(true)
    expect(isIso3166_2('AU-NSW')).toBe(true)
    expect(isIso3166_2('JP-13')).toBe(true) // numeric subdivision allowed
  })

  it('rejects malformed codes', () => {
    expect(isIso3166_2('USCA')).toBe(false) // no hyphen
    expect(isIso3166_2('US-')).toBe(false) // empty subdivision
    expect(isIso3166_2('US-CALI')).toBe(false) // subdivision too long (>3)
    expect(isIso3166_2('usa-CA')).toBe(false) // country part not alpha-2 upper
    expect(isIso3166_2('us-ca')).toBe(false) // case-sensitive
    expect(isIso3166_2(null as unknown)).toBe(false)
  })
})
