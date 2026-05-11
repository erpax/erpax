/**
 * PDF/A profile + XMP metadata builder tests.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-19005-1:2005 pdf-a-1
 * @standard ISO-19005-2:2011 pdf-a-2
 * @standard ISO-19005-3:2012 pdf-a-3
 * @audit ISO-19011:2018 audit-trail document-archival-evidence
 * @see src/standards/iso-19005
 */

import { describe, expect, it } from 'vitest'
import {
  buildPdfAXmp,
  PDF_A_DEFAULT,
  PDF_A_HYBRID_INVOICE,
  pdfAProfileToXmp,
} from '@/standards/iso-19005'

describe('PDF/A profile constants', () => {
  it('default is PDF/A-2b (safe archival baseline)', () => {
    expect(PDF_A_DEFAULT).toEqual({ part: 2, conformance: 'b' })
  })
  it('hybrid invoice envelope is PDF/A-3b (file attachments allowed)', () => {
    expect(PDF_A_HYBRID_INVOICE).toEqual({ part: 3, conformance: 'b' })
  })
})

describe('pdfAProfileToXmp', () => {
  it('upper-cases the conformance letter (XMP convention)', () => {
    expect(pdfAProfileToXmp({ part: 2, conformance: 'b' })).toEqual({
      part: '2',
      conformance: 'B',
    })
    expect(pdfAProfileToXmp({ part: 3, conformance: 'a' })).toEqual({
      part: '3',
      conformance: 'A',
    })
  })
})

describe('buildPdfAXmp — XMP packet shape', () => {
  it('declares pdfaid:part + pdfaid:conformance with the profile values', () => {
    const xmp = buildPdfAXmp({ title: 'Invoice INV-2026-001', profile: PDF_A_HYBRID_INVOICE })
    expect(xmp).toContain('<pdfaid:part>3</pdfaid:part>')
    expect(xmp).toContain('<pdfaid:conformance>B</pdfaid:conformance>')
  })

  it('embeds the title, defaults language to bg-BG, defaults creator to erpax', () => {
    const xmp = buildPdfAXmp({ title: 'Месечен отчет' })
    expect(xmp).toContain('Месечен отчет')
    expect(xmp).toContain('xml:lang="bg-BG"')
    expect(xmp).toContain('<rdf:li>erpax</rdf:li>')
  })

  it('escapes XML special characters in title + description', () => {
    const xmp = buildPdfAXmp({ title: 'A & B <test>', description: 'Quote " test' })
    expect(xmp).toContain('A &amp; B &lt;test&gt;')
    expect(xmp).toContain('Quote &quot; test')
  })

  it('starts + ends with the canonical XMP packet markers', () => {
    const xmp = buildPdfAXmp({ title: 'X' })
    expect(xmp).toMatch(/^<\?xpacket begin=/)
    expect(xmp).toMatch(/<\?xpacket end="w"\?>$/)
  })

  it('includes the pdfaid namespace declaration', () => {
    const xmp = buildPdfAXmp({ title: 'X' })
    expect(xmp).toContain('xmlns:pdfaid="http://www.aiim.org/pdfa/ns/id/"')
  })
})
