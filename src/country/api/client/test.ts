import { describe, it, expect } from 'vitest'
import {
  validateBgVatId,
  validateBgEik,
  discoverBgAspsps,
  listAllCountryApis,
  lookupCompaniesHouse,
  lookupKvk,
  lookupInseeSirene,
  lookupJpHoujinBangou,
} from '@/country/api/client'

// Pure, no-network surfaces of the official-API clients (./index.ts):
//   - syntactic validators (no API call needed)
//   - ASPSP discovery + catalogue dispatch over @/country/api
//   - the missing-credential guards, which return the canonical
//     { ok:false, error, source } shape BEFORE any fetch happens.
// Network-bound clients (VIES SOAP, БНБ/ECB XML, register lookups) need a
// live publisher and are exercised via the guards' early-return only.

describe('country/api/client — BG syntactic validators', () => {
  it('validateBgVatId: BG + 9 or 10 digits, case-insensitive', () => {
    expect(validateBgVatId('BG123456789')).toBe(true)
    expect(validateBgVatId('bg123456789')).toBe(true)
    expect(validateBgVatId('BG1234567890')).toBe(true)
    expect(validateBgVatId('123456789')).toBe(false) // missing prefix
    expect(validateBgVatId('BG12345678901')).toBe(false) // too long
    expect(validateBgVatId(42)).toBe(false) // non-string
  })

  it('validateBgEik: 9 (legal entity) or 13 (branch) digits only', () => {
    expect(validateBgEik('123456789')).toBe(true)
    expect(validateBgEik('1234567890123')).toBe(true)
    expect(validateBgEik('1234567890')).toBe(false) // 10 = EGN personal id
    expect(validateBgEik('12345678')).toBe(false) // too short
    expect(validateBgEik('')).toBe(false)
    expect(validateBgEik(123456789)).toBe(false) // non-string
  })
})

describe('country/api/client — catalogue dispatch (no network)', () => {
  it('discoverBgAspsps returns only open_banking ASPSPs, shaped for the form', () => {
    const aspsps = discoverBgAspsps()
    expect(aspsps.length).toBeGreaterThan(0)
    for (const a of aspsps) {
      expect(a).toHaveProperty('name')
      expect(a).toHaveProperty('endpoint')
      expect(a).toHaveProperty('authority')
    }
  })

  it('listAllCountryApis unions business + banking + GLOBAL, case-insensitive', () => {
    const bg = listAllCountryApis('BG')
    const bgLower = listAllCountryApis('bg')
    expect(bg.length).toBeGreaterThan(0)
    expect(bgLower.length).toBe(bg.length) // upper-cased internally
    // every discovered open_banking ASPSP is present in the unioned list
    const endpoints = new Set(bg.map((a) => a.endpoint))
    for (const a of discoverBgAspsps()) expect(endpoints.has(a.endpoint)).toBe(true)
  })

  it('an uncatalogued country yields an empty-but-GLOBAL list (never throws)', () => {
    expect(() => listAllCountryApis('ZZ')).not.toThrow()
    expect(Array.isArray(listAllCountryApis('ZZ'))).toBe(true)
  })
})

describe('country/api/client — missing-credential guards return the canonical shape', () => {
  it('key/bearer-required clients short-circuit to { ok:false, error, source }', async () => {
    const ch = await lookupCompaniesHouse('123', '')
    expect(ch).toEqual({ ok: false, error: 'API key required', source: 'Companies House' })

    const kvk = await lookupKvk('123', '')
    expect(kvk).toMatchObject({ ok: false, source: 'KvK' })

    const insee = await lookupInseeSirene('123', '')
    expect(insee).toMatchObject({ ok: false, source: 'INSEE SIRENE' })

    const jp = await lookupJpHoujinBangou('123', '')
    expect(jp).toMatchObject({ ok: false, source: 'NTA Houjin Bangou' })
  })

  it('every guard result carries ok and source — the branch-without-exceptions contract', async () => {
    for (const r of [
      await lookupCompaniesHouse('1', ''),
      await lookupKvk('1', ''),
      await lookupInseeSirene('1', ''),
      await lookupJpHoujinBangou('1', ''),
    ]) {
      expect(r.ok).toBe(false)
      expect(typeof r.source).toBe('string')
      expect(typeof r.error).toBe('string')
    }
  })
})
