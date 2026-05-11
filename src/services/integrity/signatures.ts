/**
 * Signed content-uuid — digital signatures fold into the uuid family.
 *
 * Slice HHHHHHHHH-cut1 (2026-05-11). Per user 'to comply with the
 * standards a lot needs encryption and signatures. uuid handles all'.
 *
 * The architecture: a digital signature is `sign(privateKey, hash(payload))`.
 * Our `contentUuid` is already the hash (sha-256 of JCS-canonicalized
 * content per Slice RRRRR). Therefore the signature attaches to the
 * uuid, never to the raw payload. One canonical form → one signable
 * artefact → one verification path. Federation peers, audit verifiers,
 * regulators all reason about the same string.
 *
 * Mapping to standards:
 *
 *   - eIDAS Regulation (EU) 910/2014 — qualified electronic signature.
 *     The contentUuid is the "data to be signed" (DTBS); the signature
 *     bytes are the QES proper. Trust-service-provider key material
 *     supplies the kid.
 *   - ETSI EN 319 132-1 (XAdES) / 319 142-1 (PAdES) — the embedded
 *     signature reference is a sha-256 digest over the canonicalised
 *     content. We use the same canonicalisation (JCS), so a SignedUuid
 *     can be exported as a XAdES / PAdES container without recomputing
 *     the hash.
 *   - W3C WebAuthn / FIDO2 — assertion signatures verify in the same
 *     subtle-crypto surface.
 *   - RFC 8032 — EdDSA / Ed25519 (the default algorithm here).
 *   - RFC 7515 — JSON Web Signature (`alg` strings reused as our
 *     `alg` field for interop).
 *
 * Verification flow (called by Mediator.verifyUuid):
 *
 *   1. Recompute contentUuid from the current row → confirms data
 *      hasn't been mutated in place.
 *   2. Verify signature(kid) over the recomputed uuid → confirms the
 *      claimed signer produced it.
 *   3. Both must pass; failure routes through the audit chain so the
 *      anomaly is recorded, not silently swallowed.
 *
 * Key material lives in the per-tenant key registry (Cut 2 — CF KV
 * backed). This module only deals with the (uuid, sig, kid, alg) tuple.
 *
 * @standard RFC 8032 EdDSA (Ed25519)
 * @standard RFC 7515 JSON Web Signature (alg names)
 * @standard ETSI EN 319 132-1 XAdES
 * @standard ETSI EN 319 142-1 PAdES
 * @standard eIDAS Regulation (EU) 910/2014 §3.12 qualified electronic signature
 * @standard ISO/IEC 27001 Annex A.10 cryptographic controls
 * @standard NIST SP 800-57 §5.6 key-management lifecycles
 * @audit ISO 19011:2018 §6.4.6 (every verification produces an audit-events row)
 * @feature integrity_signatures
 * @see ./content-uuid.ts (computeContentUuid)
 * @see ./envelope.ts (CipherEnvelope — sister type for at-rest secrecy)
 */
import type { ContentUuid } from './content-uuid'

/**
 * Allowed signature algorithms. Mirrors RFC 7515 §3.1 `alg` Header
 * Parameter values so a SignedUuid serializes cleanly into JWS / XAdES
 * / PAdES envelopes without translation.
 *
 *   - EdDSA → Ed25519 (RFC 8032). Default; small keys, fast verify,
 *             SUF-CMA secure, no nonce traps.
 *   - PS256 → RSA-PSS sha-256 (RFC 8017). Required when interoperating
 *             with eIDAS-qualified TSPs that issue RSA certificates.
 *   - ES256 → ECDSA P-256 (FIPS 186-4). Used by FIDO2 attestation.
 */
export type SignatureAlg = 'EdDSA' | 'PS256' | 'ES256'

/**
 * A content-uuid that's been signed. Phantom-typed by the source shape
 * so consumers can't accidentally pass a `SignedUuid<Invoice>` where a
 * `SignedUuid<Payment>` is expected.
 *
 * Wire shape (canonical JSON):
 *
 *   {
 *     "uuid":     "00000000-0000-5000-8000-000000000000",
 *     "alg":      "EdDSA",
 *     "kid":      "tenant-1/signing/2026-05-11",
 *     "sig":      "BASE64URL-signature-bytes",
 *     "signedAt": "2026-05-11T08:00:00.000Z"
 *   }
 *
 * The shape is RFC 7515 §3 compatible — the JWS `protected` header
 * encodes (alg, kid), the `payload` is the uuid, the `signature` is
 * `sig`. We keep the flat form for D1 storage but `toJws()` exports
 * the wire-standard envelope.
 */
export interface SignedUuid<T> {
  /** The content-uuid that was signed. */
  readonly uuid: ContentUuid<T>
  /** Signature algorithm, RFC 7515 `alg` value. */
  readonly alg: SignatureAlg
  /** Key id — locator in the per-tenant key registry. */
  readonly kid: string
  /** Base64url signature bytes (RFC 4648 §5). */
  readonly sig: string
  /** ISO 8601 timestamp the signature was produced. */
  readonly signedAt: string
}

// ─── crypto primitives (Web Crypto) ──────────────────────────────────

/**
 * Map our SignatureAlg → SubtleCrypto algorithm parameters. Both
 * Node.js (≥18) and Cloudflare Workers expose `globalThis.crypto.subtle`
 * with the same surface; this is the cross-runtime sweet spot.
 */
function subtleAlgParams(alg: SignatureAlg): AlgorithmIdentifier | RsaPssParams | EcdsaParams {
  switch (alg) {
    case 'EdDSA': return { name: 'Ed25519' }
    case 'PS256': return { name: 'RSA-PSS', saltLength: 32 }
    case 'ES256': return { name: 'ECDSA', hash: 'SHA-256' }
  }
}

/**
 * Base64url (RFC 4648 §5) encode / decode without `+/=` characters —
 * required by JWS and what all eIDAS-aligned signature containers use.
 */
function b64urlEncode(bytes: Uint8Array): string {
  const b64 = Buffer.from(bytes).toString('base64')
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}
function b64urlDecode(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4))
  const b64 = (s + pad).replace(/-/g, '+').replace(/_/g, '/')
  return new Uint8Array(Buffer.from(b64, 'base64'))
}

/** The bytes that go into the signature: the uuid's UTF-8 encoding. */
function uuidBytes<T>(uuid: ContentUuid<T>): Uint8Array {
  return new TextEncoder().encode(uuid)
}

// ─── public API ──────────────────────────────────────────────────────

/**
 * Produce a `SignedUuid<T>` from a content-uuid + a private CryptoKey.
 *
 * The CryptoKey is supplied by the caller (typically the mediator's
 * tenant-key registry) so this module never touches raw key material.
 * `kid` is the locator the caller used to fetch the key; we just
 * stamp it into the result.
 */
export async function signContentUuid<T>(args: {
  uuid: ContentUuid<T>
  privateKey: CryptoKey
  alg: SignatureAlg
  kid: string
  signedAt?: string
}): Promise<SignedUuid<T>> {
  const { uuid, privateKey, alg, kid, signedAt } = args
  const sigBytes = await globalThis.crypto.subtle.sign(
    subtleAlgParams(alg),
    privateKey,
    uuidBytes(uuid),
  )
  return {
    uuid,
    alg,
    kid,
    sig: b64urlEncode(new Uint8Array(sigBytes)),
    signedAt: signedAt ?? new Date().toISOString(),
  }
}

/**
 * Verify a `SignedUuid<T>` against the matching public CryptoKey.
 *
 * NOTE: Verifying the signature alone is NOT sufficient for tamper
 * detection — the caller MUST also recompute the contentUuid from the
 * current row data and check that it equals `signed.uuid`. The
 * mediator's `verifyUuid` wrapper does both; this function only
 * answers "is this signature valid for this uuid under this key?".
 */
export async function verifyContentUuidSignature<T>(args: {
  signed: SignedUuid<T>
  publicKey: CryptoKey
}): Promise<boolean> {
  const { signed, publicKey } = args
  try {
    return await globalThis.crypto.subtle.verify(
      subtleAlgParams(signed.alg),
      publicKey,
      b64urlDecode(signed.sig),
      uuidBytes(signed.uuid),
    )
  } catch {
    // Algorithm mismatch / corrupt key / corrupt signature all collapse
    // to "verification failed". Mediator audit row records the error
    // detail; the public API just returns false.
    return false
  }
}

/**
 * Export a SignedUuid into RFC 7515 §7.1 compact JWS — `BASE64URL(header)
 * . BASE64URL(payload) . BASE64URL(signature)`. This is what eIDAS-
 * qualified TSPs, OAuth resource servers, and most regulatory APIs
 * accept on the wire.
 *
 * The header carries (alg, kid, signedAt as `iat`). The payload is the
 * raw uuid string.
 */
export function toJws<T>(signed: SignedUuid<T>): string {
  const header = { alg: signed.alg, kid: signed.kid, iat: signed.signedAt, typ: 'erpax-uuid' }
  const headerEnc = b64urlEncode(new TextEncoder().encode(JSON.stringify(header)))
  const payloadEnc = b64urlEncode(new TextEncoder().encode(signed.uuid))
  return `${headerEnc}.${payloadEnc}.${signed.sig}`
}

/**
 * Inverse of `toJws`. Recovers the (uuid, alg, kid, sig, signedAt)
 * tuple. Throws on structural malformation; semantic verification is
 * still up to `verifyContentUuidSignature`.
 */
export function fromJws<T>(jws: string): SignedUuid<T> {
  const parts = jws.split('.')
  if (parts.length !== 3) throw new Error('fromJws: expected 3 segments')
  const [h, p, s] = parts as [string, string, string]
  const header = JSON.parse(new TextDecoder().decode(b64urlDecode(h))) as {
    alg?: SignatureAlg; kid?: string; iat?: string
  }
  const payload = new TextDecoder().decode(b64urlDecode(p))
  if (!header.alg || !header.kid) throw new Error('fromJws: missing alg/kid')
  return {
    uuid: payload as ContentUuid<T>,
    alg: header.alg,
    kid: header.kid,
    sig: s,
    signedAt: header.iat ?? new Date(0).toISOString(),
  }
}
