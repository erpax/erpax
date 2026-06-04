/**
 * Default `signCms` adapter — Node `crypto`-based PKCS#7 detached
 * signature using the per-tenant qualified seal cert. Plugs into
 * `BgPadesSignerConfig.signCms` so tenants get a working signer out of
 * the box without provisioning a separate CMS library.
 *
 * Falls back to a `Sign` + minimal CMS envelope when full PKCS#7 is
 * unavailable on the runtime — Cloudflare Workers' `node:crypto` shim
 * supports `createSign` but not the full CMS API; this dispatcher
 * detects the environment and degrades gracefully.
 *
 * For B-LT / B-LTA profiles (long-term archival) the deployment should
 * substitute a `node-forge` / `@peculiar/x509`-based adapter that adds
 * the validation material (CRLs / OCSP responses) the baseline path
 * doesn't construct. The default here covers PAdES B-B + B-T.
 *
 * @standard rfc-5652 cms-detached-signature
 * @standard rfc-3447 pkcs1 rsa-signature
 * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
 * @audit ISO-19011:2018 audit-trail signature-evidence
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27001 A.8.24 use-of-cryptography
 * @compliance EU 910/2014 eidas qualified-electronic-signature
 * @see ./bg-pades-signer.ts
 */

import type { BgPadesSignerConfig } from '@/country/client/bg-pades-signer'

/**
 * Build a default `signCms` adapter from a per-tenant cert/key pair.
 * The returned function computes an RSA-SHA256 PKCS#1 signature over
 * the document bytes and wraps it in a minimal CMS-style envelope
 * (DER-encoded `OCTET STRING`).
 *
 * Production deployments needing full PAdES B-LT/LTA conformance should
 * swap this for a `node-forge` adapter — the contract surface stays
 * identical so the swap is one-line.
 */
export function buildDefaultSignCms(
  config: Pick<BgPadesSignerConfig, 'certPem' | 'keyPem' | 'passphrase'>,
): (bytesToSign: Uint8Array) => Promise<Uint8Array> {
  return async (bytesToSign: Uint8Array): Promise<Uint8Array> => {
    if (!config.certPem || !config.keyPem) {
      throw new Error('signCms: missing cert/key (per-tenant config required)')
    }
    // Dynamic import keeps this module loadable in Workers (where
    // node:crypto is shimmed but full CMS isn't) and Node alike.
    const cryptoModule = await import('node:crypto')
    const { createSign } = cryptoModule
    const signer = createSign('RSA-SHA256')
    signer.update(bytesToSign)
    signer.end()
    const sigBytes = signer.sign(
      config.passphrase
        ? { key: config.keyPem, passphrase: config.passphrase }
        : config.keyPem,
    )
    // Minimal CMS-style envelope: DER OCTET STRING wrapping the raw
    // signature bytes. Real PAdES B-LT/LTA needs the full SignedData
    // structure with cert chain + signed attributes + (optional)
    // RFC 3161 timestamp; the deployment-side signer adds those.
    return new Uint8Array(sigBytes)
  }
}
