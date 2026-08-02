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
import { orbit } from '@/rodin'

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
  cloudflareConfig: 'cloudflare-config',
} as const

export type InternalSecretPurpose = (typeof internalSecretPurpose)[keyof typeof internalSecretPurpose]

/**
 * Derive a deterministic secret from `PAYLOAD_SECRET` for a named purpose.
 * Used for all internal auth tokens so only `PAYLOAD_SECRET` must be managed.
 */
export function deriveSecretFromPayloadSecret(purpose: string): string {
  return deriveSecretFrom(process.env.PAYLOAD_SECRET, purpose)
}

/**
 * The same derivation, with the master supplied explicitly.
 *
 * A Worker handler receives its secrets in the `env` argument, not in `process.env`, so the
 * `process.env` reader above cannot serve it. Re-deriving the HMAC at the call site would be a
 * SECOND construction of the same key — and two derivations that can drift is precisely how an
 * internal token stops matching the endpoint that checks it. One construction, two entry points.
 */
export function deriveSecretFrom(master: string | undefined, purpose: string): string {
  if (!master) return ''
  return createHmac('sha256', master).update(DERIVED_V1 + purpose).digest('hex')
}

// ─── horo-dance key rotation ─────────────────────────────────────────────────
// Key rotation whose SCHEDULE dances the horo ring (the (ℤ/9ℤ)* doubling cycle,
// [[rodin]]) forward (×2) and reverse (×5, its inverse) across dimensions, and
// whose UNPREDICTABILITY is the one-way KDF above — never the ring. HONEST
// BOUNDARY (Kerckhoffs): the ring is public, deterministic, zero-entropy; it
// gives a non-repeating multi-dimensional forward/reverse schedule with a proven
// period 6. The secret is the master + HMAC one-wayness. The dance returns
// (×2 then ×5 ≡ ×1); the key never does (each step chains the KDF).

/** Dance direction: forward doubles (×2), reverse halves (×5, the inverse of 2 mod 9). */
export type HoroDirection = 'forward' | 'reverse'

/**
 * ratchet   — Kₑ = KDF(Kₑ₋₁, labelₑ): forward-secret (a leaked key cannot recover past keys).
 * stateless — Kₑ = KDF(master, labelₑ): reproducible from the master at any epoch, no forward secrecy.
 */
export type RotateMode = 'ratchet' | 'stateless'

/** The horo ring position at an epoch — period 6: forward [1,2,4,8,7,5], reverse [1,5,7,8,4,2]. Pure, public. */
export function horoPosition(epoch: number, direction: HoroDirection = 'forward'): number {
  const ring = orbit(direction === 'forward' ? 2 : 5)
  const i = ((Math.trunc(epoch) % ring.length) + ring.length) % ring.length
  return ring[i]!
}

/** The KDF purpose label for one rotation step — structured by the dance, unique per (epoch,dimension,direction). */
export function horoLabel(epoch: number, dimension: string | number, direction: HoroDirection): string {
  return `horo:${direction}:${String(dimension)}:e${Math.trunc(epoch)}:p${horoPosition(epoch, direction)}`
}

export interface RotateSpec {
  /** master secret (KEK / PAYLOAD_SECRET). undefined ⇒ '' — the deriveSecretFrom contract. */
  readonly master: string | undefined
  /** monotonic rotation epoch (0 = the master itself, before any rotation). */
  readonly epoch: number
  /** the dimension this key lives in — agnostic, any label. default 0. */
  readonly dimension?: string | number
  /** forward (×2) or reverse (×5) dance. default forward. */
  readonly direction?: HoroDirection
  /** forward-secret ratchet (default) or reproducible stateless derivation. */
  readonly mode?: RotateMode
}

/** One O(1) ratchet step — derive the next key from the CURRENT one (forward-secret, stateful). */
export function advanceKey(
  prevKey: string | undefined,
  epoch: number,
  dimension: string | number = 0,
  direction: HoroDirection = 'forward',
): string {
  return deriveSecretFrom(prevKey, horoLabel(epoch, dimension, direction))
}

/** Derive the rotated key for (epoch, dimension) — configurable ratchet|stateless, DRY over the SP 800-108 KDF. */
export function rotateKey(spec: RotateSpec): string {
  const { master, epoch, dimension = 0, direction = 'forward', mode = 'ratchet' } = spec
  const e = Math.max(0, Math.trunc(epoch))
  if (mode === 'stateless') return deriveSecretFrom(master, horoLabel(e, dimension, direction))
  let key = master ?? ''
  for (let i = 1; i <= e; i++) key = advanceKey(key, i, dimension, direction)
  return key
}

/** Fold N per-dimension keys into one cross-dimension key — order-sensitive (dimensions are distinct). */
export function foldDimensions(keys: readonly string[]): string {
  return keys.reduce<string>((acc, k, i) => deriveSecretFrom(acc + k, `horo:dim:${i}`), DERIVED_V1)
}
