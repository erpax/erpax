/**
 * Secret embedded in live-preview URLs (`previewSecret` query param) and validated by
 * `GET /next/preview`. Derived from `PAYLOAD_SECRET` (same as other internal secrets).
 */
import {
  deriveSecretFromPayloadSecret,
  internalSecretPurpose,
} from '@/utilities/deriveSecret'

export function getPreviewSecret(): string {
  return deriveSecretFromPayloadSecret(internalSecretPurpose.preview)
}
