/**
 * BG country-API clients — pin the syntactic validators + ASPSP discovery
 * surface that lives in `src/services/country-api-clients.ts`.
 *
 * The BNB exchange-rate client is exercised by an integration test inside
 * the standards mirror so any drift in the BNB XML shape is caught — the
 * test mocks `fetch` rather than hitting the live endpoint (BNB rate-limits
 * unauthenticated callers and the test must work offline / in CI).
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-3166-1:2020 BG country-code
 * @standard ISO-4217:2015 currency-codes
 * @standard PSD2 EU 2015/2366 ais-pis
 * @audit ISO-19011:2018 audit-trail external-system-evidence
 * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
 * @see src/services/country-api-clients.ts
 */

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  discoverBgAspsps,
  lookupBnbExchangeRate,
  validateBgEik,
  validateBgVatId,
} from '@/services/country-api-clients'

describe('validateBgVatId — syntactic check (no API call)', () => {
  it('accepts BG + 9 or 10 digits', () => {
    expect(validateBgVatId('BG123456789')).toBe(true)
    expect(validateBgVatId('BG1234567890')).toBe(true)
    expect(validateBgVatId('bg1234567890')).toBe(true) // case-insensitive
    expect(validateBgVatId(' BG123456789 ')).toBe(true) // trims
  })

  it('rejects non-BG prefixes + wrong digit counts + non-string input', () => {
    expect(validateBgVatId('DE123456789')).toBe(false)
    expect(validateBgVatId('BG12345678')).toBe(false) // 8 digits
    expect(validateBgVatId('BG12345678901')).toBe(false) // 11 digits
    expect(validateBgVatId('BG12345A789')).toBe(false) // letter in body
    expect(validateBgVatId(123456789)).toBe(false)
    expect(validateBgVatId(null)).toBe(false)
    expect(validateBgVatId(undefined)).toBe(false)
  })
})

describe('validateBgEik — Bulstat 9 or 13 digits', () => {
  it('accepts 9-digit (legal entity) and 13-digit (sole-prop / branch)', () => {
    expect(validateBgEik('123456789')).toBe(true)
    expect(validateBgEik('1234567890123')).toBe(true)
    expect(validateBgEik(' 123456789 ')).toBe(true) // trims
  })

  it('rejects EGN (10 digits — personal id, not business)', () => {
    expect(validateBgEik('1234567890')).toBe(false)
  })

  it('rejects letters / wrong lengths / non-string', () => {
    expect(validateBgEik('12345678A')).toBe(false)
    expect(validateBgEik('12345678')).toBe(false)
    expect(validateBgEik('123456789012')).toBe(false) // 12 digits
    expect(validateBgEik(123456789)).toBe(false)
  })
})

describe('discoverBgAspsps — PSD2 ASPSP discovery from BANK_APIS.BG', () => {
  it('returns at least the systemic banks (UniCredit / DSK / Postbank / Fibank)', () => {
    const aspsps = discoverBgAspsps()
    const names = aspsps.map((a) => a.name).join(' | ')
    expect(names).toContain('UniCredit Bulbank')
    expect(names).toContain('DSK Bank')
    expect(names).toContain('Postbank')
    expect(names).toContain('Fibank')
  })

  it('skips the BNB register (kind: bank_directory, not open_banking)', () => {
    const aspsps = discoverBgAspsps()
    const names = aspsps.map((a) => a.name)
    expect(names.every((n) => !n.includes('Регистър'))).toBe(true)
  })

  it('every entry has endpoint + authority populated', () => {
    for (const aspsp of discoverBgAspsps()) {
      expect(aspsp.endpoint).toMatch(/^https?:\/\//)
      expect(aspsp.authority.length).toBeGreaterThan(0)
    }
  })
})

describe('lookupBnbExchangeRate — BNB daily fixing (mocked fetch)', () => {
  afterEach(() => vi.restoreAllMocks())

  it('parses the canonical BNB XML shape into BnbRate', async () => {
    const xml =
      '<?xml version="1.0"?><ROWSET>' +
      '<ROW><CODE>USD</CODE><RATIO>1</RATIO><RATE>1.83456</RATE></ROW>' +
      '</ROWSET>'
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(xml, { status: 200, headers: { 'Content-Type': 'application/xml' } }),
    )
    const result = await lookupBnbExchangeRate('USD', '2026-05-09')
    expect(result.ok).toBe(true)
    expect(result.source).toBe('БНБ')
    expect(result.data).toEqual({
      currency: 'USD',
      units: 1,
      rate: 1.83456,
      date: '2026-05-09',
    })
  })

  it('handles JPY-style "100 units" rates (RATIO != 1)', async () => {
    const xml =
      '<?xml version="1.0"?><ROWSET>' +
      '<ROW><CODE>JPY</CODE><RATIO>100</RATIO><RATE>1.21037</RATE></ROW>' +
      '</ROWSET>'
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(xml, { status: 200 }),
    )
    const result = await lookupBnbExchangeRate('JPY', '2026-05-09')
    expect(result.ok).toBe(true)
    expect(result.data?.units).toBe(100)
    expect(result.data?.rate).toBe(1.21037)
  })

  it('returns ok:false on HTTP error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response('', { status: 503 }))
    const result = await lookupBnbExchangeRate('USD')
    expect(result.ok).toBe(false)
    expect(result.error).toContain('HTTP 503')
  })

  it('returns ok:false when no fixing exists for that day/currency', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('<?xml version="1.0"?><ROWSET></ROWSET>', { status: 200 }),
    )
    const result = await lookupBnbExchangeRate('XYZ')
    expect(result.ok).toBe(false)
    expect(result.error).toMatch(/No fixing/)
  })
})
