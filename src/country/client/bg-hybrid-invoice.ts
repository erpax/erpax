/**
 * BG hybrid invoice — PDF/A-3 envelope embedding the EN-16931 XML.
 *
 * EU 2014/55 lets B2G recipients accept either pure XML or a PDF/A-3
 * hybrid where the visual presentation lives in the PDF and the
 * machine-readable XML rides as an embedded file. BG follows the
 * Factur-X / ZUGFeRD pattern: same envelope, same MIME-type association.
 *
 * This module assembles the *manifest* — the metadata + embedded-file
 * descriptor a PDF generator (pdf-lib, qpdf, Puppeteer + post-process)
 * needs to produce a compliant hybrid. The actual PDF byte assembly
 * stays in `src/plugins/export/pdf.ts` (Puppeteer-driven); this module
 * is the contract surface that any generator can target.
 *
 * @standard ISO-19005-3:2012 pdf-a-3
 * @standard EN-16931:2017+A1:2019 §6 hybrid-invoice
 * @standard rfc-2046 mime-application-xml
 * @standard ISO-3166-1:2020 BG country-code
 * @audit ISO-19011:2018 audit-trail document-archival-evidence
 * @compliance EU 2014/55 b2g-e-invoicing-mandate
 * @see ../../standards/iso-19005
 */

import { buildPdfAXmp, PDF_A_HYBRID_INVOICE } from '@/iso/19005'

/**
 * Per-country e-invoice attachment metadata. Mirrors the Factur-X /
 * ZUGFeRD attachment slot but pinned to BG's EN-16931 profile.
 */
export interface BgHybridInvoiceManifest {
  /** Visible PDF title — shows in the document chrome and the XMP packet. */
  readonly title: string
  /** Optional supplier-side description for the audit trail. */
  readonly description?: string
  /** ISO-8601 timestamp the invoice was issued. */
  readonly issuedAt: string
  /** Embedded EN-16931 XML payload (already serialised by `peppol-export.service.ts` or equivalent). */
  readonly xmlPayload: string
  /** Filename the XML attachment carries inside the PDF (Factur-X uses `factur-x.xml`). */
  readonly xmlFileName?: string
  /** Optional human language tag (BCP-47) — default `'bg-BG'`. */
  readonly language?: string
}

/**
 * The opaque artifact a PDF generator consumes to produce the hybrid:
 *
 *   - `xmpMetadata` — XMP packet to inject into `/Metadata`
 *   - `attachment.fileName` — name to use for `/EmbeddedFile`
 *   - `attachment.relationship` — `/AFRelationship` value (per PDF/A-3 §6.8)
 *   - `attachment.mimeType` — registered IANA type for the embedded file
 *   - `attachment.bytes` — UTF-8 bytes of the XML payload
 */
export interface BgHybridInvoiceArtifact {
  readonly xmpMetadata: string
  readonly attachment: {
    readonly fileName: string
    readonly relationship: 'Source' | 'Data' | 'Alternative'
    readonly mimeType: string
    readonly description: string
    readonly bytes: Uint8Array
  }
}

/**
 * Build the PDF/A-3 hybrid-invoice artifact from an EN-16931 XML payload.
 *
 * Pinned defaults match the BG e-invoicing convention:
 *   - Embedded filename: `bg-en-16931.xml` (Factur-X uses `factur-x.xml`;
 *     BG hasn't standardised a filename — this is the project default).
 *   - `/AFRelationship`: `'Source'` — the XML is the source-of-truth
 *     payload, the PDF is the human-readable rendering.
 */
export function buildBgHybridInvoice(
  manifest: BgHybridInvoiceManifest,
): BgHybridInvoiceArtifact {
  const xmpMetadata = buildPdfAXmp({
    title: manifest.title,
    description: manifest.description,
    createdAt: manifest.issuedAt,
    language: manifest.language ?? 'bg-BG',
    profile: PDF_A_HYBRID_INVOICE,
  })

  const fileName = manifest.xmlFileName ?? 'bg-en-16931.xml'

  return {
    xmpMetadata,
    attachment: {
      fileName,
      relationship: 'Source',
      mimeType: 'application/xml',
      description: 'EN-16931 invoice payload (BG profile)',
      bytes: textEncoder.encode(manifest.xmlPayload),
    },
  }
}

const textEncoder = new TextEncoder()
