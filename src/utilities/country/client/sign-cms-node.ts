/**
 * Default `signCms` adapter: an RSA-SHA256 signature (the crypto door's `rsaSha256Sign`) under the
 * tenant's qualified seal certificate, for `BgPadesSignerConfig.signCms`. RSA is classical; it is used
 * here only because the qualified certificates a PAdES signature needs are issued on RSA keys.
 *
 * The bytes are the raw signature. PAdES B-LT/B-LTA needs the full CMS SignedData (certificate chain,
 * signed attributes, an RFC 3161 timestamp), which the deployment's signer adds.
 *
 * @standard rfc-5652 cms-detached-signature
 * @standard rfc-8017 pkcs1 rsa-signature
 * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
 * @security ISO-27001 A.8.24 use-of-cryptography
 * @compliance EU 910/2014 eidas qualified-electronic-signature
 * @see ./bg-pades-signer.ts
 */
import type { BgPadesSignerConfig } from '@/utilities/country/client/bg-pades-signer'
import { rsaSha256Sign } from '@/utilities/crypto'

export function buildDefaultSignCms(
  config: Pick<BgPadesSignerConfig, 'certPem' | 'keyPem' | 'passphrase'>,
): (bytesToSign: Uint8Array) => Promise<Uint8Array> {
  return async (bytesToSign: Uint8Array): Promise<Uint8Array> => {
    if (!config.certPem || !config.keyPem) throw new Error('signCms: missing cert/key (per-tenant config required)')
    return new Uint8Array(rsaSha256Sign(config.keyPem, bytesToSign, config.passphrase))
  }
}
