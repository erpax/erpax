import { describe, it, expect } from 'vitest'
import {
  PDF_A_DEFAULT,
  PDF_A_HYBRID_INVOICE,
  pdfAProfileToXmp,
  buildPdfAXmp,
} from '@/iso/19005'

// ISO 19005 PDF/A — archival conformance profile + XMP metadata packet.
describe('iso/19005 — PDF/A profiles → XMP', () => {
  it('the default archival profile is PDF/A-2b', () => {
    expect(PDF_A_DEFAULT).toEqual({ part: 2, conformance: 'b' })
  })

  it('the hybrid invoice envelope is PDF/A-3b', () => {
    expect(PDF_A_HYBRID_INVOICE).toEqual({ part: 3, conformance: 'b' })
  })

  it('renders pdfaid:part as string and uppercases conformance', () => {
    expect(pdfAProfileToXmp(PDF_A_DEFAULT)).toEqual({ part: '2', conformance: 'B' })
    expect(pdfAProfileToXmp(PDF_A_HYBRID_INVOICE)).toEqual({ part: '3', conformance: 'B' })
  })
})

describe('iso/19005 — buildPdfAXmp packet', () => {
  it('declares the default PDF/A-2b block with defaults applied', () => {
    const xmp = buildPdfAXmp({ title: 'Invoice 42', createdAt: '2026-06-07T00:00:00.000Z' })
    expect(xmp).toContain('<pdfaid:part>2</pdfaid:part>')
    expect(xmp).toContain('<pdfaid:conformance>B</pdfaid:conformance>')
    expect(xmp).toContain('<dc:title>')
    expect(xmp).toContain('Invoice 42')
    expect(xmp).toContain('<rdf:li>erpax</rdf:li>') // default creator
    expect(xmp).toContain('bg-BG') // default language
    expect(xmp).toContain('2026-06-07T00:00:00.000Z')
  })

  it('XML-escapes the title', () => {
    const xmp = buildPdfAXmp({ title: 'A & B <c> "d"' })
    expect(xmp).toContain('A &amp; B &lt;c&gt; &quot;d&quot;')
    expect(xmp).not.toContain('A & B <c>')
  })

  it('omits the pdfuaid declaration unless accessibility is set', () => {
    expect(buildPdfAXmp({ title: 'x' })).not.toContain('pdfuaid')
  })

  it('adds the pdfuaid:part block when an accessibility profile is supplied', () => {
    const xmp = buildPdfAXmp({ title: 'x', accessibility: { part: 1 } })
    expect(xmp).toContain('xmlns:pdfuaid="http://www.aiim.org/pdfua/ns/id/"')
    expect(xmp).toContain('<pdfuaid:part>1</pdfuaid:part>')
  })

  it('includes dc:description only when provided', () => {
    expect(buildPdfAXmp({ title: 'x' })).not.toContain('<dc:description>')
    expect(buildPdfAXmp({ title: 'x', description: 'desc' })).toContain('desc')
  })
})
