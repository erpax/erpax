/**
 * Purpose-bound secret derivation from `PAYLOAD_SECRET` (HMAC-SHA256).
 *
 * Single env-var custodianship: only `PAYLOAD_SECRET` must be rotated/secured;
 * every internal subsystem secret (preview tokens, cron auth, field
 * encryption KEK) is derived deterministically. Third-party keys (Stripe,
 * Resend, …) stay as their own env vars.
 *
 * @standard NIST SP-800-108 key-derivation-function
 * @standard NIST FIPS-198-1 hmac
 * @standard NIST FIPS-180-4 sha-256
 * @rfc 2104 hmac
 * @rfc 5869 hkdf hmac-based-key-derivation
 * @security ISO-27001 A.8.24 use-of-cryptography
 * @security ISO-27002 §8.24 use-of-cryptography
 * @security ISO-27002 §5.17 authentication-information secret-management
 * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
 * @see docs/STANDARDS.md §4.4
 */

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
  fieldEncryption: 'field-encryption',
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
