/**
 * ISO 3166-1 alpha-2: the codes a country field accepts, and the field.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-3166-1:2020 country-codes alpha-2
 */
import { describe, expect, it } from 'vitest'

import { countryCodeField } from '@/fields/select/countryCodeField'
import { COUNTRY_CODES, countryOptions, isCountryCode } from '@/utilities/iso/3166/1'

describe('iso/3166/1', () => {
  it('lists each alpha-2 code once', () => {
    expect(new Set(COUNTRY_CODES).size).toBe(COUNTRY_CODES.length)
    for (const code of COUNTRY_CODES) expect(code).toMatch(/^[A-Z]{2}$/)
    for (const code of ['BG', 'DE', 'RO', 'US']) expect(isCountryCode(code), code).toBe(true)
    expect(isCountryCode('XX')).toBe(false)
  })

  it('labels each code, falling back to the code itself', () => {
    expect(countryOptions.find((o) => o.value === 'BG')?.label).toBe('Bulgaria')
    for (const o of countryOptions) expect(o.label.length).toBeGreaterThan(0)
  })

  it('is the select every country field uses, one shared type, indexed', () => {
    expect(countryCodeField({ required: true })).toMatchObject({ type: 'select', name: 'countryCode', interfaceName: 'Iso3166Country', index: true, required: true })
  })
})
