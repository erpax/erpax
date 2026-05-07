import { createHmac } from 'node:crypto'

/** Prefix isolates purposes and allows rotating derivation without changing master secret semantics */
const DERIVED_V1 = 'erpax:derived:v1:'

/**
 * Named purposes for app-internal secrets (preview URLs, job runners, etc.).
 * All are deterministic HMAC-SHA256 keys — do **not** add separate env vars for these.
 * Third-party keys (Stripe, Resend, …) stay as their own env vars.
 */
export const internalSecretPurpose = {
  preview: 'preview',
  cron: 'cron',
} as const

export type InternalSecretPurpose = (typeof internalSecretPurpose)[keyof typeof internalSecretPurpose]

/**
 * Derive a deterministic secret from `PAYLOAD_SECRET` for a named purpose.
 * Used for all internal auth tokens so only `PAYLOAD_SECRET` must be managed.
 */
export function deriveSecretFromPayloadSecret(purpose: string): string {
  const master = process.env.PAYLOAD_SECRET
  if (!master) return ''
  return createHmac('sha256', master).update(DERIVED_V1 + purpose).digest('hex')
}
