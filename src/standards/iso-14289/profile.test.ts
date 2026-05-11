/**
 * PDF/UA profile tests + integration with the iso-19005 XMP builder.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-14289-1:2014 pdf-ua-1
 * @standard ISO-14289-2:2024 pdf-ua-2
 * @audit ISO-19011:2018 audit-trail accessibility-conformance-evidence
 * @see src/standards/iso-14289
 */

import { describe, expect, it } from 'vitest'
import { PDF_UA_DEFAULT, pdfUaProfileToXmp } from '@/standards/iso-14289'
import { buildPdfAXmp } from '@/standards/iso-19005'

describe('PDF/UA profile constants', () => {
  it('default is PDF/UA-1 (only widely-supported profile)', () => {
    expect(PDF_UA_DEFAULT).toEqual({ part: 1 })
  })
})

describe('pdfUaProfileToXmp', () => {
  it('returns string-typed part for direct XMP injection', () => {
    expect(pdfUaProfileToXmp({ part: 1 })).toEqual({ part: '1' })
    expect(pdfUaProfileToXmp({ part: 2 })).toEqual({ part: '2' })
  })
})

describe('buildPdfAXmp — accessibility option (combined PDF/A + PDF/UA)', () => {
  it('omits the pdfuaid namespace + element when accessibility is unset', () => {
    const xmp = buildPdfAXmp({ title: 'Plain' })
    expect(xmp).not.toContain('pdfuaid')
    expect(xmp).toContain('<pdfaid:part>2</pdfaid:part>')
  })

  it('declares pdfuaid:part when accessibility is set', () => {
    const xmp = buildPdfAXmp({ title: 'Accessible', accessibility: { part: 1 } })
    expect(xmp).toContain('xmlns:pdfuaid="http://www.aiim.org/pdfua/ns/id/"')
    expect(xmp).toContain('<pdfuaid:part>1</pdfuaid:part>')
  })

  it('keeps PDF/A + PDF/UA declarations side-by-side (B2G dual baseline)', () => {
    const xmp = buildPdfAXmp({
      title: 'Dual',
      profile: { part: 2, conformance: 'a' }, // PDF/A-2a (accessible variant)
      accessibility: { part: 1 },
    })
    expect(xmp).toContain('<pdfaid:part>2</pdfaid:part>')
    expect(xmp).toContain('<pdfaid:conformance>A</pdfaid:conformance>')
    expect(xmp).toContain('<pdfuaid:part>1</pdfuaid:part>')
  })
})
