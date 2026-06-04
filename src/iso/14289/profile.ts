/**
 * ISO 14289 PDF/UA — PDF Universal Accessibility. Pinned conformance level
 * declarations for PDFs that need to be screen-reader-accessible per
 * EU 2014/55 (B2G procurement), the EU Accessibility Act, and BG
 * national accessibility law (Закон за хората с увреждания).
 *
 * Two parts in scope:
 *
 *   - PDF/UA-1 (ISO 14289-1:2014) — the dominant baseline. Requires
 *     tagged structure tree, language declaration, semantic reading
 *     order, alt text on every figure, and meta-element compliance.
 *   - PDF/UA-2 (ISO 14289-2:2024) — based on PDF 2.0; not yet widely
 *     supported by readers. Available here as a forward-compatibility
 *     hook.
 *
 * Tagged-PDF structure construction itself stays in the PDF generator
 * (Puppeteer + ghostscript / qpdf post-process); this module emits the
 * XMP `pdfuaid:part` declaration the conformance check tools (PAC,
 * veraPDF, PitStop) read.
 *
 * @standard ISO-14289-1:2014 pdf-ua-1
 * @standard ISO-14289-2:2024 pdf-ua-2
 * @standard W3C WCAG-2.1 web-content-accessibility-guidelines
 * @audit ISO-19011:2018 audit-trail accessibility-conformance-evidence
 * @compliance EU 2014/55 b2g-procurement-accessibility
 * @compliance EU 2019/882 european-accessibility-act
 * @see ../iso-19005 (PDF/A — typically combined with PDF/UA via PDF/A-2a)
 */

/** PDF/UA part — `1` (legacy / common) or `2` (PDF 2.0-based). */
export type PdfUaPart = 1 | 2

export interface PdfUaProfile {
  readonly part: PdfUaPart
}

/** Default accessibility profile — PDF/UA-1 (the only widely-supported one). */
export const PDF_UA_DEFAULT: PdfUaProfile = { part: 1 }

/**
 * Render a PDF/UA profile as the XMP `pdfuaid:part` value the document
 * metadata must declare for accessibility-check tools (PAC, veraPDF) to
 * recognise the conformance claim.
 */
export function pdfUaProfileToXmp(profile: PdfUaProfile): { part: string } {
  return { part: String(profile.part) }
}
