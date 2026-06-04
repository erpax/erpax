/**
 * Secret embedded in live-preview URLs (`previewSecret` query param) and validated by
 * `GET /next/preview`. Derived from `PAYLOAD_SECRET` (same as other internal secrets).
 *
 * @standard NIST SP-800-108 key-derivation-function
 * @rfc 5869 hkdf
 * @security ISO-27002 §5.17 authentication-information secret-management
 */
import {
  deriveSecretFromPayloadSecret,
  internalSecretPurpose,
} from '@/nist/sp/800/108'

export function getPreviewSecret(): string {
  return deriveSecretFromPayloadSecret(internalSecretPurpose.preview)
}
