/**
 * PDF/A metadata builder — produces the XMP packet that an archival PDF
 * must embed for ISO 19005 compliance. Keeps the metadata generation in
 * one place so every PDF the project produces declares the same shape.
 *
 * The packet is a standalone XML string the caller injects into the PDF
 * (Puppeteer + a downstream PDF/A converter, or pdf-lib's `setMetadata`).
 *
 * @standard ISO-19005-1:2005 §6.7 metadata-stream
 * @standard W3C XMP-1.0 metadata-platform
 * @standard rfc-3066 language-tag (xml:lang)
 * @audit ISO-19011:2018 audit-trail document-archival-evidence
 * @see ./profile.ts
 */

import type { PdfAProfile } from './profile'
import { pdfAProfileToXmp, PDF_A_DEFAULT } from './profile'
import type { PdfUaProfile } from '@/iso/14289'
import { pdfUaProfileToXmp } from '@/iso/14289'

export interface PdfAMetadataInput {
  /** Display title (`dc:title`). */
  readonly title: string
  /** Producer / creator org (`dc:creator`). Default: `'erpax'`. */
  readonly creator?: string
  /** Subject / description (`dc:description`). */
  readonly description?: string
  /** ISO-8601 creation timestamp (`xmp:CreateDate`). Defaults to now. */
  readonly createdAt?: string
  /** Document language as BCP-47 tag (`dc:language`). Default: `'bg-BG'`. */
  readonly language?: string
  /** PDF/A profile to declare. Default: PDF/A-2b. */
  readonly profile?: PdfAProfile
  /**
   * Optional PDF/UA accessibility profile. When set, the XMP packet adds
   * the `pdfuaid:part` declaration alongside the `pdfaid:*` block — a
   * PDF that ships both is typically PDF/A-2a + PDF/UA-1 for B2G
   * procurement compliance.
   */
  readonly accessibility?: PdfUaProfile
}

const xmlEscape = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

/**
 * Build the XMP packet a PDF/A producer must embed in `/Metadata`. The
 * returned string is suitable for direct insertion into a PDF stream
 * object (`<< /Type /Metadata /Subtype /XML /Length N >>`).
 */
export function buildPdfAXmp(input: PdfAMetadataInput): string {
  const profile = input.profile ?? PDF_A_DEFAULT
  const { part, conformance } = pdfAProfileToXmp(profile)
  const createdAt = input.createdAt ?? new Date().toISOString()
  const language = input.language ?? 'bg-BG'
  const creator = input.creator ?? 'erpax'
  const uaPart = input.accessibility ? pdfUaProfileToXmp(input.accessibility).part : null

  return `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="erpax/iso-19005">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about=""
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:xmp="http://ns.adobe.com/xap/1.0/"
      xmlns:pdf="http://ns.adobe.com/pdf/1.3/"
      xmlns:pdfaid="http://www.aiim.org/pdfa/ns/id/"${
        uaPart !== null ? `\n      xmlns:pdfuaid="http://www.aiim.org/pdfua/ns/id/"` : ''
      }>
      <dc:title>
        <rdf:Alt>
          <rdf:li xml:lang="${xmlEscape(language)}">${xmlEscape(input.title)}</rdf:li>
        </rdf:Alt>
      </dc:title>
      <dc:creator>
        <rdf:Seq><rdf:li>${xmlEscape(creator)}</rdf:li></rdf:Seq>
      </dc:creator>${
        input.description
          ? `
      <dc:description>
        <rdf:Alt>
          <rdf:li xml:lang="${xmlEscape(language)}">${xmlEscape(input.description)}</rdf:li>
        </rdf:Alt>
      </dc:description>`
          : ''
      }
      <dc:language><rdf:Bag><rdf:li>${xmlEscape(language)}</rdf:li></rdf:Bag></dc:language>
      <xmp:CreateDate>${xmlEscape(createdAt)}</xmp:CreateDate>
      <xmp:CreatorTool>${xmlEscape(creator)}</xmp:CreatorTool>
      <pdf:Producer>${xmlEscape(creator)}</pdf:Producer>
      <pdfaid:part>${part}</pdfaid:part>
      <pdfaid:conformance>${conformance}</pdfaid:conformance>${
        uaPart !== null ? `\n      <pdfuaid:part>${uaPart}</pdfuaid:part>` : ''
      }
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`
}
