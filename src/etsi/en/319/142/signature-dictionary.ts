/**
 * PAdES signature-dictionary builder — produces the PDF `/Sig` dictionary
 * a downstream PDF mutator (pdf-lib, hummus, qpdf) injects into the
 * document and then back-fills with the actual CMS bytes.
 *
 * The two-pass shape:
 *
 *   1. Builder emits the `/Sig` dict with placeholder `/ByteRange` and
 *      `/Contents <00...00>` (zero-padded hex). The PDF is serialised
 *      with the placeholder in place.
 *   2. The signer computes the CMS-detached signature over the byte range
 *      that wraps the placeholder, then back-patches `/Contents` with the
 *      actual hex-encoded CMS blob.
 *
 * Keeping the dictionary builder separate from the crypto means PDF/A-3
 * generators (Puppeteer + qpdf, pdf-lib) can produce the placeholder
 * shape without owning the cryptographic material — the BG signer
 * (`bg-pades-signer.ts`) closes the loop with a qualified seal cert.
 *
 * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
 * @standard ISO-32000-1:2008 §12.8 pdf-signature-dictionary
 * @standard rfc-5652 cryptographic-message-syntax
 * @audit ISO-19011:2018 audit-trail signature-evidence
 * @compliance EU 910/2014 eidas qualified-electronic-signature
 * @see ./profile.ts
 */

import {
  PADES_DEFAULT_LEVEL,
  PADES_DEFAULT_SUBFILTER,
  padesLevelOid,
  type PadesLevel,
  type PadesSubFilter,
} from '@/etsi/en/319/142/profile'

export interface PadesSignatureDictionaryInput {
  /** Optional human reason shown in the signature panel. */
  readonly reason?: string
  /** Signing location (e.g. `'Sofia, Bulgaria'`). */
  readonly location?: string
  /** Contact info (typically the signer's email). */
  readonly contactInfo?: string
  /** ISO-8601 signing timestamp. Defaults to now. */
  readonly signedAt?: string
  /** PAdES baseline level. Default: `'B-LT'` (long-term, archival). */
  readonly level?: PadesLevel
  /** PDF SubFilter. Default: `'ETSI.CAdES.detached'`. */
  readonly subFilter?: PadesSubFilter
  /**
   * Hex-bytes the placeholder reserves for the CMS blob. Default 16384
   * (8 KiB after hex decoding) — large enough for an RSA-2048 + cert chain
   * + OCSP for a B-LT signature. Bump for B-LTA archive timestamps.
   */
  readonly placeholderBytes?: number
}

export interface PadesSignatureDictionary {
  /** PDF cos-dict source ready for a PDF mutator to inject as the `/Sig` value. */
  readonly cosDictionary: string
  /** Bytes the placeholder reserves for the CMS signature blob. */
  readonly placeholderBytes: number
  /** PAdES level + subfilter the dictionary declares. */
  readonly level: PadesLevel
  readonly subFilter: PadesSubFilter
  /** Sentinel string the second-pass back-patcher locates to insert the CMS bytes. */
  readonly contentsPlaceholder: string
}

const HEX_PADDING_CHAR = '0'

/**
 * Build the PDF `/Sig` dictionary as a cos-dict source string. The
 * caller serialises this into the PDF (typically via `pdf-lib`'s
 * `PDFDict` builder or a templated PDF mutator).
 */
export function buildPadesSignatureDictionary(
  input: PadesSignatureDictionaryInput = {},
): PadesSignatureDictionary {
  const level = input.level ?? PADES_DEFAULT_LEVEL
  const subFilter = input.subFilter ?? PADES_DEFAULT_SUBFILTER
  const placeholderBytes = input.placeholderBytes ?? 16384
  const signedAt = input.signedAt ?? new Date().toISOString()

  // PDF date strings use the form `D:YYYYMMDDHHmmSS+HH'mm'`.
  const pdfDate = isoToPdfDate(signedAt)

  // Placeholder for the CMS bytes — `<` + zero-padded hex + `>`.
  const contentsPlaceholder = '<' + HEX_PADDING_CHAR.repeat(placeholderBytes) + '>'

  // Lines kept readable; the cos-dict source the mutator inserts is
  // valid PDF syntax (newlines + indentation are syntactic whitespace).
  const lines = [
    '<<',
    '/Type /Sig',
    '/Filter /Adobe.PPKLite',
    `/SubFilter /${subFilter}`,
    '/ByteRange [0 0 0 0]', // back-patched after the PDF is serialised
    `/Contents ${contentsPlaceholder}`,
    `/M (${pdfDate})`,
    `/Name (${escapePdfString(input.contactInfo ?? 'erpax')})`,
  ]
  if (input.reason) lines.push(`/Reason (${escapePdfString(input.reason)})`)
  if (input.location) lines.push(`/Location (${escapePdfString(input.location)})`)

  // PAdES baseline-level OID — declares the conformance the signature claims.
  lines.push(`/Prop_Build << /PAdES.Level (${level}) /PAdES.LevelOID (${padesLevelOid(level)}) >>`)
  lines.push('>>')

  return {
    cosDictionary: lines.join('\n'),
    placeholderBytes,
    level,
    subFilter,
    contentsPlaceholder,
  }
}

function isoToPdfDate(iso: string): string {
  // Normalize to UTC: D:YYYYMMDDHHmmSS+00'00'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return "D:00000000000000+00'00'"
  const yyyy = String(d.getUTCFullYear()).padStart(4, '0')
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(d.getUTCDate()).padStart(2, '0')
  const hh = String(d.getUTCHours()).padStart(2, '0')
  const mi = String(d.getUTCMinutes()).padStart(2, '0')
  const ss = String(d.getUTCSeconds()).padStart(2, '0')
  return `D:${yyyy}${mm}${dd}${hh}${mi}${ss}+00'00'`
}

function escapePdfString(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}
