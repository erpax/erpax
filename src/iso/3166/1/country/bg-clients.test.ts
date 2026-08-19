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
  lookupBgTradeRegister,
  lookupBnbExchangeRate,
  validateBgEik,
  validateBgVatId,
} from '@/country/api/client'

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

describe('lookupBnbExchangeRate — БНБ daily fixing (mocked fetch)', () => {
  afterEach(() => vi.restoreAllMocks())

  // The REAL shape БНБ serves since Bulgaria adopted the euro. Note row 0:
  // it is a HEADER row whose values are the column labels, and it is the trap
  // that a first-match regex falls into.
  const feed = (rows: string) =>
    '<?xml version="1.0"?><ROWSET>' +
    '<ROW><F_ORDER>0</F_ORDER><NAME_>Currency</NAME_><CODE>Code</CODE>' +
    '<REVERSERATE>Euro per unit of foreign currency</REVERSERATE>' +
    '<RATE>Foreign currency per 1 euro</RATE><CURR_DATE>Date</CURR_DATE></ROW>' +
    rows +
    '</ROWSET>'
  const row = (code: string, reverse: string, rate: string, day = '18.08.2026') =>
    `<ROW><F_ORDER>1</F_ORDER><NAME_>x</NAME_><CODE>${code}</CODE>` +
    `<REVERSERATE>${reverse}</REVERSERATE><RATE>${rate}</RATE>` +
    `<CURR_DATE>${day}</CURR_DATE></ROW>`
  const serve = (xml: string) =>
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(xml, { status: 200, headers: { 'Content-Type': 'application/xml' } }),
    )

  it('parses the euro-era feed: rate is EUR per unit, inverse is units per EUR', async () => {
    serve(feed(row('USD', '0.8639', '1.1576')))
    const result = await lookupBnbExchangeRate('USD', '2026-08-18')
    expect(result.ok).toBe(true)
    expect(result.source).toBe('БНБ')
    expect(result.data).toEqual({
      currency: 'USD',
      quote: 'EUR',
      units: 1,
      rate: 0.8639,
      quotePerUnit: 0.8639,
      inverse: 1.1576,
      date: '2026-08-18',
    })
  })

  it('SKIPS the header row — its CODE is the literal label "Code", not a currency', async () => {
    // A first-match regex reads the header and returns currency "Code".
    serve(feed(row('USD', '0.8639', '1.1576')))
    const result = await lookupBnbExchangeRate('USD')
    expect(result.data?.currency).toBe('USD')
    expect(result.data?.rate).toBe(0.8639)
  })

  it('quotes per SINGLE unit — the RATIO column is gone from the feed', async () => {
    serve(feed(row('JPY', '0.005409', '184.87')))
    const result = await lookupBnbExchangeRate('JPY')
    expect(result.data?.units).toBe(1)
    expect(result.data?.rate).toBe(0.005409)
    expect(result.data?.inverse).toBe(184.87)
  })

  it('takes the date from the FEED (DD.MM.YYYY → ISO), never from the request', async () => {
    serve(feed(row('USD', '0.8639', '1.1576', '18.08.2026')))
    const result = await lookupBnbExchangeRate('USD')
    expect(result.data?.date).toBe('2026-08-18')
  })

  it('REFUSES an unparseable fixing date instead of substituting today', async () => {
    // Falling back to `new Date()` here dated an 18.08 fixing as 19.08 — the
    // publisher never said that, so it is a fabricated date.
    serve(feed(row('USD', '0.8639', '1.1576', 'not-a-date')))
    const result = await lookupBnbExchangeRate('USD')
    expect(result.ok).toBe(false)
    expect(result.error).toMatch(/Unparseable fixing date/)
  })

  it('REFUSES a back-dated request instead of mislabelling today’s fixing', async () => {
    // The endpoint ignores date parameters and always answers with the current
    // fixing. Returning it under the requested date would be a fabricated rate.
    serve(feed(row('USD', '0.8639', '1.1576', '18.08.2026')))
    const result = await lookupBnbExchangeRate('USD', '2026-06-15')
    expect(result.ok).toBe(false)
    expect(result.error).toMatch(/only the current fixing/)
  })

  it('returns ok:false on HTTP error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response('', { status: 503 }))
    const result = await lookupBnbExchangeRate('USD')
    expect(result.ok).toBe(false)
    expect(result.error).toContain('HTTP 503')
  })

  it('returns ok:false when the currency is not in the fixing', async () => {
    serve(feed(row('USD', '0.8639', '1.1576')))
    const result = await lookupBnbExchangeRate('XYZ')
    expect(result.ok).toBe(false)
    expect(result.error).toMatch(/No fixing/)
  })
})

describe('lookupBgTradeRegister — Търговски Регистър by дело (mocked fetch)', () => {
  afterEach(() => vi.restoreAllMocks())

  const deed = (uic: string) => [
    {
      incomingNumber: '20260817102911',
      applicationTypeName: 'Заявление Г1 ',
      incomingLinkedDeeds: [
        {
          uic,
          companyName: 'ИНФОРМАЦИОННО ОБСЛУЖВАНЕ',
          companyFullName: '"ИНФОРМАЦИОННО ОБСЛУЖВАНЕ" АД',
          legalForm: 5,
          status: 2,
        },
      ],
    },
  ]
  const serveJson = (v: unknown) =>
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(v), { status: 200 }),
    )

  it('reads the merchant off the дело’s linked entries', async () => {
    serveJson(deed('831641791'))
    const r = await lookupBgTradeRegister('831641791')
    expect(r.ok).toBe(true)
    expect(r.data).toEqual({
      eik: '831641791',
      name: 'ИНФОРМАЦИОННО ОБСЛУЖВАНЕ',
      fullName: '"ИНФОРМАЦИОННО ОБСЛУЖВАНЕ" АД',
      status: 2,
      legalForm: 5,
      applications: 1,
    })
  })

  it('REFUSES the SPA shell — the portal answers 200 with HTML for a wrong path', async () => {
    // This is why the previous endpoint looked alive: an unknown path is
    // rewritten to the app shell, so HTML arrives under a 200.
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('<!DOCTYPE html><html><head><title>ЕПЗЕУ</title>', { status: 200 }),
    )
    const r = await lookupBgTradeRegister('831641791')
    expect(r.ok).toBe(false)
    expect(r.error).toMatch(/portal shell/)
  })

  it('does not attribute another merchant’s entry to this ЕИК', async () => {
    serveJson(deed('999999999'))
    const r = await lookupBgTradeRegister('831641791')
    expect(r.ok).toBe(false)
    expect(r.error).toMatch(/no matching entry/)
  })

  it('reports an empty дело rather than inventing a merchant', async () => {
    serveJson([])
    const r = await lookupBgTradeRegister('831641791')
    expect(r.ok).toBe(false)
    expect(r.error).toMatch(/No дело/)
  })

  it('surfaces the portal rate limit', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response('', { status: 429 }))
    const r = await lookupBgTradeRegister('831641791')
    expect(r.ok).toBe(false)
    expect(r.error).toContain('HTTP 429')
  })
})
