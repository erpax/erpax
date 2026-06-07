import { describe, it, expect } from 'vitest'
import {
  BLANK_COUNTRY,
  BLANK_COUNTRY_NUMERIC,
  resolveCountry,
  resolveCountryOrDefault,
  isBlankCountry,
  countriesCompatible,
  countryDisplayLabel,
  getCountryAlphaFromNumeric,
  getCountryNumericFromAlpha,
  computeCountryUuid,
} from '@/country/fallback'
import { DEFAULT_COUNTRY } from '@/config/regional-defaults'

// CLDR ZZ is the country identity element (Conservation Law 54): it resolves
// any blank input to a non-null code and is compatible with every real
// country (./index.ts).

describe('country/fallback — ZZ resolution', () => {
  it('blank/nullish input resolves to ZZ; real codes pass through uppercased', () => {
    expect(BLANK_COUNTRY).toBe('ZZ')
    expect(resolveCountry(null)).toBe('ZZ')
    expect(resolveCountry(undefined)).toBe('ZZ')
    expect(resolveCountry('')).toBe('ZZ')
    expect(resolveCountry('   ')).toBe('ZZ')
    expect(resolveCountry('bg')).toBe('BG')
    expect(resolveCountry(' De ')).toBe('DE')
  })

  it('resolveCountryOrDefault swaps ZZ for the house default', () => {
    expect(resolveCountryOrDefault(null)).toBe(DEFAULT_COUNTRY)
    expect(resolveCountryOrDefault('FR')).toBe('FR')
  })

  it('isBlankCountry mirrors resolution', () => {
    expect(isBlankCountry(null)).toBe(true)
    expect(isBlankCountry('ZZ')).toBe(true)
    expect(isBlankCountry('BG')).toBe(false)
  })

  it('countryDisplayLabel renders ZZ as an em-dash, real codes as themselves', () => {
    expect(countryDisplayLabel(null)).toBe('—')
    expect(countryDisplayLabel('BG')).toBe('BG')
  })
})

describe('country/fallback — universal compatibility', () => {
  it('ZZ is compatible with every real country (absorbing element)', () => {
    expect(countriesCompatible('ZZ', 'BG')).toBe(true)
    expect(countriesCompatible('DE', null)).toBe(true) // null → ZZ
    expect(countriesCompatible(null, undefined)).toBe(true)
  })

  it('equal real countries are compatible; different ones are not', () => {
    expect(countriesCompatible('bg', 'BG')).toBe(true)
    expect(countriesCompatible('BG', 'DE')).toBe(false)
  })
})

describe('country/fallback — M.49 numeric bridge', () => {
  it('numeric 001 World ↔ ZZ', () => {
    expect(BLANK_COUNTRY_NUMERIC).toBe(1)
    expect(getCountryAlphaFromNumeric(1)).toBe('ZZ')
    expect(getCountryNumericFromAlpha('ZZ')).toBe(1)
  })

  it('round-trips real mappings, undefined when unmapped', () => {
    expect(getCountryAlphaFromNumeric(100)).toBe('BG')
    expect(getCountryNumericFromAlpha('BG')).toBe(100)
    expect(getCountryAlphaFromNumeric(99999)).toBeUndefined()
    expect(getCountryNumericFromAlpha('ZX')).toBeUndefined()
  })
})

describe('country/fallback — uuid family (Law 54)', () => {
  it('same code + tenant is stable; tenant namespaces the uuid', () => {
    expect(computeCountryUuid('BG', 'tenant-1')).toBe(computeCountryUuid('BG', 'tenant-1'))
    expect(computeCountryUuid('BG', 'tenant-1')).not.toBe(computeCountryUuid('BG', 'tenant-2'))
  })

  it('blank input collapses to the same uuid as ZZ', () => {
    expect(computeCountryUuid('', 'platform')).toBe(computeCountryUuid('ZZ', 'platform'))
  })
})
