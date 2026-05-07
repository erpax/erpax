/**
 * Secret embedded in live-preview URLs (`previewSecret` query param) and validated by
 * `GET /next/preview`. Override with `PREVIEW_SECRET`; otherwise derived from `PAYLOAD_SECRET`.
 */
import { deriveSecretFromPayloadSecret } from '@/utilities/deriveSecret'

export function getPreviewSecret(): string {
  return process.env.PREVIEW_SECRET || deriveSecretFromPayloadSecret('preview')
}
