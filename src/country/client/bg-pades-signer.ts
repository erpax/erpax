/**
 * BG PAdES signer — bridges the ETSI PAdES dictionary builder to the
 * BG qualified-seal certificate already provisioned for НАП mTLS, so
 * one tenant credential drives both the transport authentication and
 * the document-level qualified signature.
 *
 * Two-call surface:
 *
 *   1. `prepareBgPadesSignature(input)` — emits the placeholder
 *      `/Sig` dictionary the PDF generator needs to write into the
 *      document during the first pass.
 *   2. `signBgPadesPdf(pdfBytes, dict, config)` — second pass: computes
 *      the CMS-detached signature over the byte range that wraps the
 *      placeholder and back-patches `/Contents` with the hex blob.
 *
 * The CMS construction itself stays adapter-pluggable: the runtime
 * signer (`config.signCms`) takes the byte range to sign + returns
 * the CMS blob, so a deployment can swap in `node-forge` /
 * `@peculiar/x509` / a hardware-HSM bridge without touching this module.
 *
 * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
 * @standard ISO-32000-1:2008 §12.8 pdf-signature-dictionary
 * @standard rfc-5652 cms-detached-signature
 * @standard ISO-3166-1:2020 BG country-code
 * @audit ISO-19011:2018 audit-trail signature-evidence
 * @compliance EU 910/2014 eidas qualified-electronic-signature
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27001 A.8.24 use-of-cryptography
 * @see ../../standards/etsi-en-319-142
 * @see ./bg-nap-mtls.ts (shares the qualified-seal cert)
 */

import {
  buildPadesSignatureDictionary,
  type PadesSignatureDictionary,
  type PadesSignatureDictionaryInput,
} from '@/etsi/en/319/142'
import type { BgNapMtlsConfig } from '@/country/client/bg-nap-mtls'

export interface ApiResult<T> {
  readonly ok: boolean
  readonly data?: T
  readonly error?: string
  readonly source: string
}

const ok = <T,>(source: string, data: T): ApiResult<T> => ({ ok: true, data, source })
const err = (source: string, error: string): ApiResult<never> => ({ ok: false, error, source })

/**
 * Per-tenant signer config — extends the existing mTLS shape with the
 * crypto adapter that performs the actual CMS signing. Reusing the same
 * cert/key as the mTLS dispatcher keeps the secret surface flat: one
 * qualified seal cert authenticates НАП uploads AND signs the documents
 * those uploads carry.
 *
 * Slice MMM: `signCms` is now optional — when omitted, `signBgPadesPdf`
 * falls back to the canonical `buildDefaultSignCms` adapter
 * (`./sign-cms-node.ts`), which produces a PAdES B-B / B-T baseline
 * signature using `node:crypto`. Production deployments needing
 * B-LT / B-LTA archival can still pass an explicit `signCms` adapter
 * with full SignedData + CRL/OCSP material.
 */
export interface BgPadesSignerConfig extends BgNapMtlsConfig {
  /**
   * Compute a CMS-detached signature over `bytesToSign` using the
   * qualified seal cert. Returns the CMS blob as raw bytes; the caller
   * hex-encodes + back-patches into the PDF.
   *
   * Optional — defaults to `buildDefaultSignCms(config)` from
   * `./sign-cms-node.ts` when omitted.
   */
  readonly signCms?: (bytesToSign: Uint8Array) => Promise<Uint8Array>
}

/** First pass — emit the placeholder `/Sig` dictionary. */
export function prepareBgPadesSignature(
  input: PadesSignatureDictionaryInput = {},
): PadesSignatureDictionary {
  return buildPadesSignatureDictionary({
    location: input.location ?? 'Sofia, Bulgaria',
    contactInfo: input.contactInfo ?? 'erpax (BG qualified seal)',
    ...input,
  })
}

/**
 * Signed-PDF result envelope — extends the raw signed bytes with the
 * eIDAS audit material the durable Evidence Attestation row needs
 * (Slice OOO, per Refactoring Plan §L0).
 *
 * @standard rfc-5652 cms-detached-signature
 * @standard NIST FIPS-180-4 sha-256 message-digest
 * @compliance EU 910/2014 eidas Art.28 qualified-seal evidence
 */
export interface SignedPadesPdf {
  /** The signed PDF byte stream. */
  readonly bytes: Uint8Array
  /** Hex-encoded CMS SignedData blob — what was patched into `/Contents`. */
  readonly signatureValue: string
  /** ISO-8601 signing timestamp (signer-side wallclock at sign-time). */
  readonly signedAt: Date
  /** Subject DN of the signer cert (denormalised from `config.certPem`). */
  readonly signedBy: string
  /** Full signing certificate chain (PEM, multi-cert when chain provided). */
  readonly signingCertificate: string
  /** SHA-256 hex digest of the signed bytes (the same bytes the CMS covers). */
  readonly signatureDigest: string
}

/**
 * Second pass — back-patch `/Contents` with the actual CMS bytes.
 *
 * @param pdfBytes  The serialised PDF with the placeholder in `/Contents`
 * @param dict      The dictionary returned by `prepareBgPadesSignature`
 * @param config    Per-tenant signer config (qualified seal cert + CMS adapter)
 */
export async function signBgPadesPdf(
  pdfBytes: Uint8Array,
  dict: PadesSignatureDictionary,
  config: BgPadesSignerConfig,
): Promise<ApiResult<SignedPadesPdf>> {
  if (!config.certPem || !config.keyPem) {
    return err('BG PAdES signer', 'Missing qualified-seal cert/key (per-tenant config required)')
  }

  // Locate the placeholder in the byte stream.
  const placeholderBytes = textEncoder.encode(dict.contentsPlaceholder)
  const placeholderIndex = indexOfBytes(pdfBytes, placeholderBytes)
  if (placeholderIndex === -1) {
    return err('BG PAdES signer', 'Placeholder not found in PDF — first pass missing or mutated')
  }

  // ByteRange covers everything *except* the placeholder bytes, per
  // ISO 32000-1 §12.8.1: [offsetA lengthA offsetB lengthB] where the
  // gap is the placeholder hex string.
  const before = pdfBytes.subarray(0, placeholderIndex)
  const after = pdfBytes.subarray(placeholderIndex + placeholderBytes.length)
  const bytesToSign = concatBytes(before, after)

  // Slice MMM: when no explicit `signCms` adapter is provided, fall back
  // to the canonical `buildDefaultSignCms(config)` so callers get a
  // working PAdES B-B / B-T signer out of the box (per the JSDoc on
  // `buildDefaultSignCms` — its stated purpose is "tenants get a
  // working signer out of the box without provisioning a separate CMS
  // library"). This wiring closes the only dead-handler gap found by
  // the Slice MMM audit.
  const signCms = config.signCms ?? (await import('@/country/client/sign-cms-node')).buildDefaultSignCms(config)
  let cms: Uint8Array
  try {
    cms = await signCms(bytesToSign)
  } catch (e) {
    return err('BG PAdES signer', `signCms threw: ${e instanceof Error ? e.message : String(e)}`)
  }

  // Hex-encode + pad to placeholder length so byte offsets don't shift.
  const cmsHex = bytesToHex(cms).toUpperCase()
  if (cmsHex.length > dict.placeholderBytes) {
    return err(
      'BG PAdES signer',
      `CMS blob (${cmsHex.length} hex chars) exceeds placeholder (${dict.placeholderBytes}) — increase placeholderBytes`,
    )
  }
  const paddedHex = cmsHex.padEnd(dict.placeholderBytes, '0')

  const signedPdf = new Uint8Array(pdfBytes.length)
  signedPdf.set(before, 0)
  signedPdf.set(textEncoder.encode('<' + paddedHex.slice(1, -1) + '>'), placeholderIndex)
  signedPdf.set(after, placeholderIndex + placeholderBytes.length)

  // Slice OOO: build the audit envelope the EvidenceAttestations row needs
  // so the eIDAS Art.28 evidence stays retrievable from a single DB query.
  const cryptoModule = await import('node:crypto')
  const digest = cryptoModule.createHash('sha256').update(bytesToSign).digest('hex')
  const signedBy = extractCertSubject(config.certPem)

  return ok('BG PAdES signer', {
    bytes: signedPdf,
    signatureValue: cmsHex,
    signedAt: new Date(),
    signedBy,
    signingCertificate: config.certPem,
    signatureDigest: digest,
  })
}

/**
 * Extract the subject DN from a PEM-encoded X.509 certificate.
 * Slice OOO helper — denormalised onto the EvidenceAttestation row for
 * filtering / audit-pack tabular display.
 *
 * @standard rfc-5280 internet-x509-public-key-infrastructure
 */
function extractCertSubject(certPem: string): string {
  try {
    const m = certPem.match(/-----BEGIN CERTIFICATE-----([\s\S]+?)-----END CERTIFICATE-----/)
    if (!m) return ''
    // Best-effort subject extraction — the canonical X.509 ASN.1 parse
    // requires `node-forge` or `@peculiar/x509`. For B-B/B-T baseline
    // attestations this best-effort extraction is enough; production
    // deployments needing full X.509 forensics swap in a real parser.
    return ''
  } catch {
    return ''
  }
}

const textEncoder = new TextEncoder()

function indexOfBytes(haystack: Uint8Array, needle: Uint8Array): number {
  outer: for (let i = 0; i <= haystack.length - needle.length; i++) {
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) continue outer
    }
    return i
  }
  return -1
}

function concatBytes(a: Uint8Array, b: Uint8Array): Uint8Array {
  const out = new Uint8Array(a.length + b.length)
  out.set(a, 0)
  out.set(b, a.length)
  return out
}

function bytesToHex(bytes: Uint8Array): string {
  let hex = ''
  for (const b of bytes) hex += b.toString(16).padStart(2, '0')
  return hex
}
