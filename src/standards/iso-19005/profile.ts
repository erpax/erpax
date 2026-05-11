/**
 * ISO 19005 PDF/A — long-term archival PDF profiles. Pins the
 * conformance level + part metadata that every archival PDF the project
 * produces must declare.
 *
 * Three parts in scope (all currently in active use):
 *
 *   - PDF/A-1 (ISO 19005-1:2005) — based on PDF 1.4. Levels 'a' (accessible)
 *     and 'b' (basic). Legacy support only — new outputs should target
 *     PDF/A-2 or PDF/A-3.
 *   - PDF/A-2 (ISO 19005-2:2011) — based on PDF 1.7. Adds JPEG2000,
 *     transparency, layers. Default archival target.
 *   - PDF/A-3 (ISO 19005-3:2012) — extends PDF/A-2 with arbitrary file
 *     attachments. The basis for hybrid e-invoices (Factur-X / ZUGFeRD /
 *     EN-16931 PDF/A-3 envelope).
 *
 * @standard ISO-19005-1:2005 pdf-a-1
 * @standard ISO-19005-2:2011 pdf-a-2
 * @standard ISO-19005-3:2012 pdf-a-3
 * @standard ISO-32000-1:2008 pdf-1.7
 * @audit ISO-19011:2018 audit-trail document-archival-evidence
 * @compliance EU 2014/55 b2g-e-invoicing-archival
 * @see ./metadata.ts
 */

/** PDF/A part — `1`, `2`, or `3` per ISO 19005-{1,2,3}. */
export type PdfAPart = 1 | 2 | 3

/** PDF/A conformance level. */
export type PdfAConformance =
  | 'a' // Accessible — full Unicode + tagged structure (PDF/A-1a / 2a / 3a)
  | 'b' // Basic     — visual reproducibility only            (PDF/A-1b / 2b / 3b)
  | 'u' // Unicode   — PDF/A-2u / PDF/A-3u (Unicode mapping, untagged)

export interface PdfAProfile {
  readonly part: PdfAPart
  readonly conformance: PdfAConformance
}

/** Default archival profile for new outputs — PDF/A-2b is the safe baseline. */
export const PDF_A_DEFAULT: PdfAProfile = { part: 2, conformance: 'b' }

/** Hybrid invoice envelope — PDF/A-3b carries an embedded EN-16931 XML. */
export const PDF_A_HYBRID_INVOICE: PdfAProfile = { part: 3, conformance: 'b' }

/**
 * Render a PDF/A profile as the XMP `pdfaid:part` + `pdfaid:conformance`
 * value pair the document metadata must declare for compliance check
 * tools (veraPDF, PitStop) to recognise the profile.
 */
export function pdfAProfileToXmp(profile: PdfAProfile): {
  part: string
  conformance: string
} {
  return {
    part: String(profile.part),
    conformance: profile.conformance.toUpperCase(),
  }
}
