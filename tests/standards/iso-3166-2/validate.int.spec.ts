/**
 * ISO 3166-2 subdivision-code validator tests.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-3166-2:2020 subdivision-codes
 * @see src/standards/iso-3166-2/validate.ts
 */

import { describe, it, expect } from 'vitest'
import { isIso3166_2 } from '@/standards/iso-3166-2'

describe('ISO 3166-2 subdivision codes', () => {
  it('accepts country-region format', () => {
    expect(isIso3166_2('US-CA')).toBe(true)
    expect(isIso3166_2('DE-BY')).toBe(true)
    expect(isIso3166_2('AU-NSW')).toBe(true)
    expect(isIso3166_2('US-01')).toBe(true) // numeric subdivision
  })
  it('rejects without separator', () => {
    expect(isIso3166_2('USCA')).toBe(false)
  })
  it('rejects too-short region', () => {
    expect(isIso3166_2('US-')).toBe(false)
  })
  it('rejects too-long region', () => {
    expect(isIso3166_2('US-CALI')).toBe(false)
  })
})
