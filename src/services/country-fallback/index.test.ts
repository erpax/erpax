/**
 * Country-fallback tests — Conservation Law 54 applied to country.
 *
 * Slice NNNNNNNNN-cut1 (2026-05-11). Structural mirror of the
 * currency-fallback + locale-fallback test suites.
 *
 *   1. Every blank input maps to `ZZ`.
 *   2. Inputs are upper-cased + trimmed.
 *   3. `ZZ` is universally compatible; real codes match only on equality.
 *   4. Display label for `ZZ` is the em-dash placeholder.
 *   5. UN M.49 numeric ↔ alpha-2 round-trips for the curated set.
 *   6. `computeCountryUuid` is stable + per-tenant namespaced.
 *
 * @standard ISO 3166-1 §6 user-assigned codes (ZZ)
 * @standard CLDR ZZ Unknown Region
 * @standard UN M.49 — 001 World numeric
 * @audit Conservation Law 54 universal-identity-element (country instance)
 */
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
} from './index'

describe('resolveCountry — every blank input maps to ZZ; non-blank is uppercased', () => {
  it('undefined → ZZ', () => {
    expect(resolveCountry(undefined)).toBe(BLANK_COUNTRY)
  })
  it('null → ZZ', () => {
    expect(resolveCountry(null)).toBe(BLANK_COUNTRY)
  })
  it('empty string → ZZ', () => {
    expect(resolveCountry('')).toBe(BLANK_COUNTRY)
  })
  it('whitespace-only → ZZ', () => {
    expect(resolveCountry('   ')).toBe(BLANK_COUNTRY)
  })
  it('"ZZ" is idempotent', () => {
    expect(resolveCountry('ZZ')).toBe(BLANK_COUNTRY)
  })
  it('lowercase input is upper-cased', () => {
    expect(resolveCountry('bg')).toBe('BG')
    expect(resolveCountry('de')).toBe('DE')
  })
  it('surrounding whitespace is trimmed', () => {
    expect(resolveCountry('  fr  ')).toBe('FR')
  })
})

describe('resolveCountryOrDefault — UX-friendly variant', () => {
  it('blank → DEFAULT_COUNTRY (not ZZ)', () => {
    // DEFAULT_COUNTRY is 'BG' per regional-defaults; assert not blank.
    expect(resolveCountryOrDefault(undefined)).not.toBe(BLANK_COUNTRY)
  })
  it('non-blank flows through unchanged', () => {
    expect(resolveCountryOrDefault('de')).toBe('DE')
  })
})

describe('isBlankCountry', () => {
  it('detects every blank-equivalent input', () => {
    expect(isBlankCountry(undefined)).toBe(true)
    expect(isBlankCountry(null)).toBe(true)
    expect(isBlankCountry('')).toBe(true)
    expect(isBlankCountry('zz')).toBe(true)   // case-insensitive via resolver
  })
  it('returns false for real countries', () => {
    expect(isBlankCountry('BG')).toBe(false)
    expect(isBlankCountry('US')).toBe(false)
  })
})

describe('countriesCompatible — ZZ is universal', () => {
  it('equal codes are compatible', () => {
    expect(countriesCompatible('BG', 'BG')).toBe(true)
    expect(countriesCompatible('de', 'DE')).toBe(true)   // case normalises
  })
  it('ZZ on either side is compatible', () => {
    expect(countriesCompatible('BG', 'ZZ')).toBe(true)
    expect(countriesCompatible('ZZ', 'DE')).toBe(true)
    expect(countriesCompatible('ZZ', 'ZZ')).toBe(true)
  })
  it('null/undefined/empty also compatible (resolve to ZZ)', () => {
    expect(countriesCompatible('BG', null)).toBe(true)
    expect(countriesCompatible(undefined, 'DE')).toBe(true)
  })
  it('different real countries are NOT compatible', () => {
    expect(countriesCompatible('BG', 'DE')).toBe(false)
    expect(countriesCompatible('US', 'CA')).toBe(false)
  })
})

describe('countryDisplayLabel', () => {
  it('ZZ renders as em-dash placeholder', () => {
    expect(countryDisplayLabel('ZZ')).toBe('—')
    expect(countryDisplayLabel(null)).toBe('—')
  })
  it('Real codes render as themselves (CLDR labels via translations)', () => {
    expect(countryDisplayLabel('BG')).toBe('BG')
    expect(countryDisplayLabel('us')).toBe('US')   // uppercased
  })
})

describe('UN M.49 numeric ↔ ISO 3166-1 alpha-2 round-trips', () => {
  it('001 ↔ ZZ (World ↔ Unknown Region)', () => {
    expect(getCountryAlphaFromNumeric(BLANK_COUNTRY_NUMERIC)).toBe(BLANK_COUNTRY)
    expect(getCountryNumericFromAlpha(BLANK_COUNTRY)).toBe(BLANK_COUNTRY_NUMERIC)
  })
  it('100 ↔ BG', () => {
    expect(getCountryAlphaFromNumeric(100)).toBe('BG')
    expect(getCountryNumericFromAlpha('BG')).toBe(100)
  })
  it('276 ↔ DE', () => {
    expect(getCountryAlphaFromNumeric(276)).toBe('DE')
    expect(getCountryNumericFromAlpha('DE')).toBe(276)
  })
  it('840 ↔ US', () => {
    expect(getCountryAlphaFromNumeric(840)).toBe('US')
    expect(getCountryNumericFromAlpha('US')).toBe(840)
  })
  it('unmapped numeric returns undefined (not a throw)', () => {
    expect(getCountryAlphaFromNumeric(9999)).toBeUndefined()
    expect(getCountryNumericFromAlpha('XX')).toBeUndefined()
  })
})

describe('computeCountryUuid — uuid-family bridge (Law 54)', () => {
  it('is stable for the same (code, tenant) pair', () => {
    const a = computeCountryUuid('BG', 'tenant-1')
    const b = computeCountryUuid('BG', 'tenant-1')
    expect(a).toBe(b)
    expect(a).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-/)
  })

  it('differs across tenants for the same code', () => {
    expect(computeCountryUuid('BG', 'tenant-1')).not.toBe(computeCountryUuid('BG', 'tenant-2'))
  })

  it('case-insensitive: bg / BG / Bg all hash to the same uuid', () => {
    const a = computeCountryUuid('bg', 'platform')
    const b = computeCountryUuid('BG', 'platform')
    const c = computeCountryUuid('Bg', 'platform')
    expect(a).toBe(b)
    expect(b).toBe(c)
  })

  it('blank-equivalent inputs all hash to the same ZZ uuid', () => {
    const a = computeCountryUuid('ZZ', 'platform')
    const b = computeCountryUuid('', 'platform')
    const c = computeCountryUuid(null as unknown as string, 'platform')
    expect(a).toBe(b)
    expect(b).toBe(c)
  })
})
