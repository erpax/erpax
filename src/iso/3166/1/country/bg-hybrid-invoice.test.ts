/**
 * BG hybrid-invoice manifest builder — pin the PDF/A-3 envelope shape
 * and the embedded EN-16931 XML attachment metadata.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-19005-3:2012 pdf-a-3
 * @standard EN-16931:2017+A1:2019 §6 hybrid-invoice
 * @standard ISO-3166-1:2020 BG country-code
 * @audit ISO-19011:2018 audit-trail document-archival-evidence
 * @compliance EU 2014/55 b2g-e-invoicing-mandate
 * @see src/services/country-clients/bg-hybrid-invoice.ts
 */

import { describe, expect, it } from 'vitest'
import { buildBgHybridInvoice } from '@/country/client'

const SAMPLE_EN_16931_XML =
  '<?xml version="1.0" encoding="UTF-8"?><Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"><ID>INV-2026-001</ID></Invoice>'

describe('buildBgHybridInvoice — PDF/A-3 manifest', () => {
  it('embeds the EN-16931 XML payload as UTF-8 bytes', () => {
    const artifact = buildBgHybridInvoice({
      title: 'Фактура INV-2026-001',
      issuedAt: '2026-05-09T12:00:00Z',
      xmlPayload: SAMPLE_EN_16931_XML,
    })
    const decoded = new TextDecoder().decode(artifact.attachment.bytes)
    expect(decoded).toBe(SAMPLE_EN_16931_XML)
  })

  it('declares the attachment as Source (PDF is the rendering, XML is the SoT)', () => {
    const artifact = buildBgHybridInvoice({
      title: 'X',
      issuedAt: '2026-05-09T12:00:00Z',
      xmlPayload: '<x/>',
    })
    expect(artifact.attachment.relationship).toBe('Source')
  })

  it('uses the BG-default attachment filename when none is supplied', () => {
    const artifact = buildBgHybridInvoice({
      title: 'X',
      issuedAt: '2026-05-09T12:00:00Z',
      xmlPayload: '<x/>',
    })
    expect(artifact.attachment.fileName).toBe('bg-en-16931.xml')
  })

  it('honours a custom xmlFileName override (e.g. for Factur-X interop)', () => {
    const artifact = buildBgHybridInvoice({
      title: 'X',
      issuedAt: '2026-05-09T12:00:00Z',
      xmlPayload: '<x/>',
      xmlFileName: 'factur-x.xml',
    })
    expect(artifact.attachment.fileName).toBe('factur-x.xml')
  })

  it('flags the attachment as application/xml MIME (per EN-16931 §6)', () => {
    const artifact = buildBgHybridInvoice({
      title: 'X',
      issuedAt: '2026-05-09T12:00:00Z',
      xmlPayload: '<x/>',
    })
    expect(artifact.attachment.mimeType).toBe('application/xml')
  })

  it('XMP metadata declares PDF/A-3B + bg-BG language', () => {
    const artifact = buildBgHybridInvoice({
      title: 'Фактура',
      issuedAt: '2026-05-09T12:00:00Z',
      xmlPayload: '<x/>',
    })
    expect(artifact.xmpMetadata).toContain('<pdfaid:part>3</pdfaid:part>')
    expect(artifact.xmpMetadata).toContain('<pdfaid:conformance>B</pdfaid:conformance>')
    expect(artifact.xmpMetadata).toContain('xml:lang="bg-BG"')
    expect(artifact.xmpMetadata).toContain('Фактура')
  })
})
