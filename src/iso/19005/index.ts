/**
 * Public surface of the ISO 19005 PDF/A standards module.
 *
 * @standard ISO-19005-1:2005 pdf-a-1
 * @standard ISO-19005-2:2011 pdf-a-2
 * @standard ISO-19005-3:2012 pdf-a-3
 * @see ./profile.ts
 * @see ./metadata.ts
 */

export {
  type PdfAPart,
  type PdfAConformance,
  type PdfAProfile,
  PDF_A_DEFAULT,
  PDF_A_HYBRID_INVOICE,
  pdfAProfileToXmp,
} from '@/iso/19005/profile'

export { buildPdfAXmp, type PdfAMetadataInput } from '@/iso/19005/metadata'
