/**
 * EU-fallback rate resolver tests — pin the national → ECB chain so any
 * EU country's FX-rate lookup degrades gracefully when the national
 * publisher is unavailable.
 *
 * Tests mock `fetch` so neither БНБ nor ECB live endpoints are hit.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard SDMX 2.1 statistical-data-and-metadata-exchange
 * @audit ISO-19011:2018 audit-trail external-system-evidence
 * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
 * @see src/services/country-api-clients.ts
 * @see src/config/country-apis.ts (ECB_RATES pan-EU entry)
 */

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  lookupEcbExchangeRate,
  lookupEuFallbackRate,
} from '@/services/country-api-clients'
import { COUNTRY_APIS } from '@/config/country-apis'

const ECB_DAILY = '<gesmes:Envelope><Cube><Cube time="2026-05-09"><Cube currency="USD" rate="1.0823" /><Cube currency="GBP" rate="0.8541" /></Cube></Cube></gesmes:Envelope>'

describe('lookupEcbExchangeRate — daily reference fixing', () => {
  afterEach(() => vi.restoreAllMocks())

  it('parses the canonical SDMX shape into EcbRate', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(ECB_DAILY, { status: 200, headers: { 'Content-Type': 'application/xml' } }),
    )
    const result = await lookupEcbExchangeRate('USD', '2026-05-09')
    expect(result.ok).toBe(true)
    expect(result.source).toBe('ECB')
    expect(result.data).toEqual({
      currency: 'USD',
      units: 1,
      rate: 1.0823,
      date: '2026-05-09',
    })
  })

  it('falls back to the latest <Cube time> block when the requested date isn\'t in the feed', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(ECB_DAILY, { status: 200 }),
    )
    const result = await lookupEcbExchangeRate('GBP', '2030-01-01')
    expect(result.ok).toBe(true)
    expect(result.data?.currency).toBe('GBP')
    expect(result.data?.rate).toBe(0.8541)
  })

  it('returns ok:false on non-200 + currency missing', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response('', { status: 503 }))
    expect((await lookupEcbExchangeRate('USD')).ok).toBe(false)

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(ECB_DAILY, { status: 200 }),
    )
    const r = await lookupEcbExchangeRate('XYZ', '2026-05-09')
    expect(r.ok).toBe(false)
    expect(r.error).toMatch(/No ECB fixing for XYZ/)
  })
})

describe('lookupEuFallbackRate — national → ECB chain', () => {
  afterEach(() => vi.restoreAllMocks())

  it('returns the national fixing when available (BG → БНБ)', async () => {
    const bnbXml =
      '<?xml version="1.0"?><ROWSET>' +
      '<ROW><CODE>USD</CODE><RATIO>1</RATIO><RATE>1.83456</RATE></ROW>' +
      '</ROWSET>'
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(bnbXml, { status: 200 }),
    )
    const result = await lookupEuFallbackRate('BG', 'USD', '2026-05-09')
    expect(result.ok).toBe(true)
    expect(result.source).toBe('БНБ')
  })

  it('falls back to ECB when the national publisher returns no fixing', async () => {
    // First call (БНБ): empty.
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        new Response('<?xml version="1.0"?><ROWSET></ROWSET>', { status: 200 }),
      )
      // Second call (ECB): hit.
      .mockResolvedValueOnce(new Response(ECB_DAILY, { status: 200 }))
    const result = await lookupEuFallbackRate('BG', 'USD', '2026-05-09')
    expect(result.ok).toBe(true)
    expect(result.source).toBe('ECB')
    expect(result.data?.rate).toBe(1.0823)
  })

  it('uses ECB directly for EU countries without a national resolver', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(ECB_DAILY, { status: 200 }),
    )
    const result = await lookupEuFallbackRate('FR', 'GBP', '2026-05-09')
    expect(result.ok).toBe(true)
    expect(result.source).toBe('ECB')
  })
})

describe('ECB_RATES catalogued in every EU country bundle', () => {
  it.each(['BG', 'DE', 'FR', 'ES', 'IT', 'NL', 'PL', 'PT', 'RO'])(
    '%s catalogue includes the ECB rates entry',
    (country) => {
      const apis = COUNTRY_APIS[country] ?? []
      const ecb = apis.find(
        (api) => api.kind === 'statistics' && api.authority === 'European Central Bank',
      )
      expect(ecb, `${country} country bundle should include ECB_RATES via spread`).toBeDefined()
    },
  )
})
