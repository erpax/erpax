import { describe, it, expect } from 'vitest'
import { PDF_UA_DEFAULT, pdfUaProfileToXmp } from '@/iso/14289'

// ISO 14289 PDF/UA — the conformance declaration the validators read.
describe('iso/14289 — PDF/UA conformance profile → XMP pdfuaid:part', () => {
  it('the default profile is PDF/UA-1 (the only widely-supported one)', () => {
    expect(PDF_UA_DEFAULT.part).toBe(1)
  })

  it('renders the pdfuaid:part as a string', () => {
    expect(pdfUaProfileToXmp(PDF_UA_DEFAULT)).toEqual({ part: '1' })
    expect(pdfUaProfileToXmp({ part: 2 })).toEqual({ part: '2' })
  })
})
