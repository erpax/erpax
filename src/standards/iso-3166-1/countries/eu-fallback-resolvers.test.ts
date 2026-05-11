/**
 * EU pan-fallback resolver tests — pin the national → EU dispatch shape
 * for the three pan-EU API categories that mirror the FX-rate fallback:
 *
 *   - VAT validation        — national VAT register → VIES
 *   - Sanctions screening   — national broader-screen → EU consolidated
 *   - E-invoicing discovery — national directory     → PEPPOL Directory
 *
 * Tests mock `fetch` so neither national nor EU live endpoints are hit.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard EN-16931:2017 §B2G semantic-model
 * @standard Peppol-BIS-3.0 billing
 * @audit ISO-19011:2018 audit-trail external-system-evidence
 * @compliance EU 2006/112/EC vat-system-directive
 * @compliance AMLD-5 ubo-screening
 * @compliance EU 2014/55 b2g-e-invoicing-mandate
 * @see src/services/country-api-clients.ts
 */

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  lookupVatValidationFallback,
  lookupSanctionsFallback,
  lookupEInvoicingParticipantFallback,
} from '@/services/country-api-clients'

describe('lookupVatValidationFallback — national → VIES chain', () => {
  afterEach(() => vi.restoreAllMocks())

  it('routes to VIES when no national resolver is registered (BG)', async () => {
    // VIES SOAP response shape — minimal valid block.
    const viesXml =
      `<?xml version="1.0"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">` +
      `<soap:Body><checkVatResponse>` +
      `<countryCode>BG</countryCode><vatNumber>123456789</vatNumber>` +
      `<valid>true</valid><name>ACME EOOD</name>` +
      `</checkVatResponse></soap:Body></soap:Envelope>`
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(viesXml, { status: 200, headers: { 'Content-Type': 'text/xml' } }),
    )
    const result = await lookupVatValidationFallback('BG', '123456789')
    expect(result.ok).toBe(true)
    expect(result.source).toBe('VIES')
    expect(result.data?.valid).toBe(true)
    expect(result.data?.name).toBe('ACME EOOD')
  })

  it('uppercases the country code before dispatch', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('<valid>false</valid>', { status: 200 }),
    )
    const result = await lookupVatValidationFallback('bg', '123456789')
    expect(result.ok).toBe(true)
    expect(result.data?.countryCode).toBe('BG')
  })
})

describe('lookupSanctionsFallback — national → EU consolidated', () => {
  afterEach(() => vi.restoreAllMocks())

  it('returns the EU consolidated XML when no national resolver is registered', async () => {
    const xml = '<?xml version="1.0"?><CONSOLIDATED_LIST />'
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(xml, { status: 200, headers: { 'Content-Type': 'application/xml' } }),
    )
    const result = await lookupSanctionsFallback('BG')
    expect(result.ok).toBe(true)
    expect(result.source).toBe('EU CFSP')
    expect(result.data).toBe(xml)
  })

  it('returns ok:false on EU endpoint HTTP failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response('', { status: 503 }))
    const result = await lookupSanctionsFallback('BG')
    expect(result.ok).toBe(false)
  })
})

describe('lookupEInvoicingParticipantFallback — national → PEPPOL', () => {
  afterEach(() => vi.restoreAllMocks())

  it('routes to PEPPOL Directory when no national resolver is registered', async () => {
    const peppolJson = JSON.stringify({
      'total-result-count': 1,
      matches: [
        {
          participantID: { value: '0007:5567321707' },
          entities: [{ name: [{ name: 'Acme EOOD' }] }],
          docTypes: [
            { value: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2::Invoice' },
          ],
        },
      ],
    })
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(peppolJson, { status: 200, headers: { 'Content-Type': 'application/json' } }),
    )
    const result = await lookupEInvoicingParticipantFallback('BG', '0007:5567321707')
    expect(result.ok).toBe(true)
    expect(result.source).toBe('Peppol Directory')
    expect(result.data?.registered).toBe(true)
  })

  it('reports unregistered participants without erroring', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ 'total-result-count': 0, matches: [] }), { status: 200 }),
    )
    const result = await lookupEInvoicingParticipantFallback('BG', '0007:5567321707')
    expect(result.ok).toBe(true)
    expect(result.data?.registered).toBe(false)
  })
})
