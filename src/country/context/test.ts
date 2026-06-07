import { describe, it, expect } from 'vitest'
import { resolveCountryContext } from '@/country/context'
import { DEFAULT_COUNTRY, COUNTRY_PROFILES } from '@/config/regional-defaults'

// The single canonical merge (./index.ts): every country branch resolves here
// rather than reading COUNTRY_PROFILES / COUNTRY_SPECIFICS / COUNTRY_APIS
// directly. Resolution is first-non-null wins (explicit → iban → address →
// tenant → default) and always returns a non-null bundle with a `source`
// diagnostic recording how the country was chosen.

const BG_IBAN = 'BG80BNBG96611020345678'

describe('country/context — first-non-null resolution order', () => {
  it('explicit country wins over every other signal', () => {
    const ctx = resolveCountryContext({
      country: 'de',
      iban: BG_IBAN,
      address: { country: 'FR' },
      tenant: { country: 'IT' },
    })
    expect(ctx.country).toBe('DE') // upper-cased
    expect(ctx.source).toBe('explicit')
  })

  it('falls through to IBAN when no explicit country', () => {
    const ctx = resolveCountryContext({ iban: BG_IBAN, address: { country: 'FR' } })
    expect(ctx.country).toBe('BG')
    expect(ctx.source).toBe('iban')
  })

  it('falls through to address, then tenant', () => {
    expect(resolveCountryContext({ address: { country: 'fr' } })).toMatchObject({
      country: 'FR',
      source: 'address',
    })
    expect(
      resolveCountryContext({ tenant: { config: { country: 'IT' } } }),
    ).toMatchObject({ country: 'IT', source: 'tenant' })
  })

  it('always returns a non-null bundle — house default when nothing supplied', () => {
    const ctx = resolveCountryContext()
    expect(ctx.country).toBe(DEFAULT_COUNTRY)
    expect(ctx.source).toBe('default')
  })

  it('ignores malformed signals (no extractable 2-letter code) and keeps falling through', () => {
    // country 'x' is 1 char (rejected); iban '1' is too short to yield a code.
    const ctx = resolveCountryContext({ country: 'x', iban: '1' })
    expect(ctx.country).toBe(DEFAULT_COUNTRY)
    expect(ctx.source).toBe('default')
  })
})

describe('country/context — the merged bundle', () => {
  it('binds the curated profile for a known country', () => {
    const ctx = resolveCountryContext({ country: 'BG' })
    expect(ctx.known).toBe(true)
    expect(ctx.profile).toEqual(COUNTRY_PROFILES.BG)
    expect(ctx.specifics).not.toBeNull()
  })

  it('helpers are bound to the resolved country', () => {
    const ctx = resolveCountryContext({ country: 'BG' })
    // classifyTaxId('BG', <vat>) → labels the BG VAT id
    expect(ctx.helpers.validateTaxId('BG123456789')).toBe('VAT (BG)')
    expect(ctx.helpers.validateIban(BG_IBAN)).toBe(true)
    expect(ctx.helpers.validateIban('nope')).toBe(false)
    expect(ctx.helpers.fiscalYearStartMonth()).toBe(1)
    expect(ctx.helpers.currencyDecimals('EUR')).toBe(2)
  })

  it('apisOfKind filters the unioned API list', () => {
    const ctx = resolveCountryContext({ country: 'BG' })
    expect(Array.isArray(ctx.apis)).toBe(true)
    // every filtered entry actually carries the requested kind
    const banks = ctx.helpers.apisOfKind('open_banking')
    for (const a of banks) expect(a.kind).toBe('open_banking')
    expect(banks.length).toBeLessThanOrEqual(ctx.apis.length)
  })

  it('an uncurated country still resolves to a non-null bundle', () => {
    const ctx = resolveCountryContext({ country: 'ZZ' })
    expect(ctx.country).toBe('ZZ')
    expect(ctx.known).toBe(false)
    expect(ctx.profile).toBeTruthy()
    expect(ctx.profile.currency).toBeTruthy()
  })
})
