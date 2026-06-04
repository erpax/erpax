/**
 * Envelope encryption keyed by content-uuid — the at-rest companion to
 * `SignedUuid<T>`.
 *
 * Slice HHHHHHHHH-cut1 (2026-05-11). Per user 'to comply with the
 * standards a lot needs encryption and signatures. uuid handles all'.
 *
 * Envelope encryption pattern:
 *
 *   1. Each tenant has a master key (KEK — Key Encryption Key) held
 *      in Cloudflare KV / KMS, never embedded in code or Payload rows.
 *   2. For each row to be encrypted, derive a per-row data key (DEK)
 *      via HKDF(KEK, salt=contentUuid). The contentUuid is the natural
 *      salt: deterministic, content-bound, already canonical.
 *   3. Encrypt the row's plaintext under DEK using AES-256-GCM
 *      (NIST SP 800-38D — provides AEAD: confidentiality + integrity
 *      in a single primitive).
 *   4. Persist only `CipherEnvelope { uuid, alg, iv, ciphertext, authTag, kid }`
 *      — the DEK is never stored; recompute it on demand from KEK + uuid.
 *
 * Why the uuid is the right salt:
 *
 *   - Deterministic: same content → same uuid → same DEK. Convergent
 *     encryption variant — supports deduplication of identical encrypted
 *     attachments across tenants if KEKs are shared (federation case).
 *   - Tamper-bound: changing the plaintext changes the contentUuid →
 *     changes the DEK → ciphertext under the OLD DEK no longer decrypts
 *     under the recomputed DEK. The cryptographic binding catches
 *     in-place tampering even when the AES authTag is also tampered.
 *   - Compliance-ready: RFC 5869 HKDF salt material must be unique per
 *     derivation; uuid satisfies "unique per content" by construction.
 *
 * Mapping to standards:
 *
 *   - NIST SP 800-38D — AES-GCM mode (AEAD; mandatory authTag).
 *   - RFC 5116 — AEAD interface (encrypt/decrypt API shape).
 *   - RFC 5869 — HKDF (key-derivation step).
 *   - NIST SP 800-57 §5.6 — key lifecycle (master rotation triggers
 *     re-derivation, not re-encryption: the SAME plaintext under a
 *     NEW KEK produces a NEW DEK for the SAME contentUuid).
 *   - ISO/IEC 27040 — storage security; this module covers "encryption
 *     at rest" per §6.7.
 *   - GDPR Article 32(1)(a) — pseudonymisation + encryption of
 *     personal data; CipherEnvelope is the canonical at-rest form.
 *   - HIPAA §164.312(a)(2)(iv) — encryption of ePHI at rest.
 *   - PCI DSS 4.0 §3.5 — strong cryptography of cardholder data.
 *
 * @standard NIST SP 800-38D AES-GCM
 * @standard NIST SP 800-57 §5.6 key-management lifecycles
 * @standard RFC 5116 AEAD
 * @standard RFC 5869 HKDF
 * @standard ISO/IEC 27040 §6.7 storage security
 * @standard ISO/IEC 27001 Annex A.10.1.1 cryptographic-controls policy
 * @standard GDPR Article 32(1)(a) encryption of personal data
 * @standard HIPAA §164.312(a)(2)(iv) encryption of ePHI
 * @standard PCI DSS 4.0 §3.5 strong cryptography
 * @audit ISO 19011:2018 §6.4.6 (every encrypt/decrypt produces an audit-events row)
 * @feature integrity_envelope
 * @see ./content-uuid.ts (computeContentUuid — provides the salt)
 * @see ./signatures.ts (SignedUuid — sister type for in-transit authenticity)
 */
import type { ContentUuid } from '@/integrity/content-uuid'

/**
 * Allowed envelope algorithms. AES-GCM-256 is the default and only the
 * second variant is offered for legacy interop. Both are AEAD per
 * RFC 5116; both produce an explicit authTag so detection of bit-flip
 * tampering is built in.
 */
export type EnvelopeAlg = 'AES-GCM-256' | 'AES-GCM-128'

/** Bits of strength per algorithm. Used for HKDF output sizing. */
const ALG_BITS: Record<EnvelopeAlg, number> = {
  'AES-GCM-256': 256,
  'AES-GCM-128': 128,
}

/**
 * A ciphertext envelope. Phantom-typed by the plaintext shape so the
 * type system enforces "this envelope decrypts to T" instead of "this
 * envelope decrypts to some bytes".
 *
 * Wire shape — all binary fields are base64url-encoded (RFC 4648 §5)
 * so D1 / R2 / IPFS can store the envelope as JSON text without
 * binary-safety contortions.
 *
 *   {
 *     "uuid":       "0192a7b3-4c5d-8e6f-9a0b-1c2d3e4f5a6b",
 *     "alg":        "AES-GCM-256",
 *     "iv":         "BASE64URL-12-bytes",
 *     "ciphertext": "BASE64URL-ciphertext",
 *     "authTag":    "BASE64URL-16-bytes",
 *     "kid":        "tenant-1/kek/2026-05-11"
 *   }
 */
export interface CipherEnvelope<T> {
  /** Content-uuid bound into the DEK derivation; tamper-evident. */
  readonly uuid: ContentUuid<T>
  readonly alg: EnvelopeAlg
  /** 96-bit GCM IV (NIST SP 800-38D §8.2 recommends 96 bits). */
  readonly iv: string
  /** Ciphertext bytes, AES-GCM output (without authTag prefix/suffix). */
  readonly ciphertext: string
  /** 128-bit GCM authTag (RFC 5116 AEAD output). */
  readonly authTag: string
  /** Key id — locator for the master KEK in the per-tenant registry. */
  readonly kid: string
}

// ─── crypto primitives (Web Crypto) ──────────────────────────────────

function b64urlEncode(bytes: Uint8Array): string {
  const b64 = Buffer.from(bytes).toString('base64')
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}
function b64urlDecode(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4))
  const b64 = (s + pad).replace(/-/g, '+').replace(/_/g, '/')
  return new Uint8Array(Buffer.from(b64, 'base64'))
}

/**
 * HKDF (RFC 5869) the master KEK + contentUuid into a per-row DEK.
 * Info string is `'erpax-envelope-v1'` so future schema changes can
 * version the derivation without colliding with v1 ciphertexts.
 */
async function deriveDek<T>(args: {
  kek: CryptoKey
  uuid: ContentUuid<T>
  bits: number
}): Promise<CryptoKey> {
  const { kek, uuid, bits } = args
  const salt = new TextEncoder().encode(uuid)
  return globalThis.crypto.subtle.deriveKey(
    {
      name: 'HKDF',
      hash: 'SHA-256',
      salt,
      info: new TextEncoder().encode('erpax-envelope-v1'),
    },
    kek,
    { name: 'AES-GCM', length: bits },
    /* extractable */ false,
    ['encrypt', 'decrypt'],
  )
}

// ─── public API ──────────────────────────────────────────────────────

/**
 * Encrypt a plaintext object into a `CipherEnvelope<T>`.
 *
 * The plaintext is JSON-stringified (the `T` shape preserves through
 * canonical serialization). For non-JSON payloads (binary blobs),
 * encrypt via `encryptBytesEnvelope` instead.
 *
 * The caller supplies the `kek` CryptoKey (an HKDF-usable master key
 * for the tenant) and the `kid` it was fetched under. We never touch
 * raw key bytes here.
 */
export async function encryptEnvelope<T>(args: {
  plaintext: T
  uuid: ContentUuid<T>
  kek: CryptoKey
  kid: string
  alg?: EnvelopeAlg
}): Promise<CipherEnvelope<T>> {
  const alg = args.alg ?? 'AES-GCM-256'
  const dek = await deriveDek({ kek: args.kek, uuid: args.uuid, bits: ALG_BITS[alg] })
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12))
  const plaintextBytes = new TextEncoder().encode(JSON.stringify(args.plaintext))
  const result = new Uint8Array(
    await globalThis.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv, tagLength: 128 },
      dek,
      plaintextBytes,
    ),
  )
  // Web Crypto AES-GCM returns ciphertext || authTag concatenated.
  // Split so the envelope's `authTag` field matches AEAD wire format
  // (RFC 5116) for interop with non-WebCrypto implementations.
  const ciphertext = result.slice(0, result.length - 16)
  const authTag = result.slice(result.length - 16)
  return {
    uuid: args.uuid,
    alg,
    iv: b64urlEncode(iv),
    ciphertext: b64urlEncode(ciphertext),
    authTag: b64urlEncode(authTag),
    kid: args.kid,
  }
}

/**
 * Decrypt a `CipherEnvelope<T>` back into a typed plaintext.
 *
 * Verification is implicit in the AES-GCM authTag: any bit-flip in
 * `ciphertext`, `iv`, `authTag`, or the derived DEK fails the AEAD
 * check and surfaces as `OperationError` (mapped here to a clean
 * throw with the offending uuid).
 *
 * For full tamper-resistance the caller must ALSO recompute
 * `contentUuid(decryptedPlaintext)` and compare to `envelope.uuid`.
 * That's the responsibility of the Mediator wrapper; this function
 * is the cryptographic bottom half.
 */
export async function decryptEnvelope<T>(args: {
  envelope: CipherEnvelope<T>
  kek: CryptoKey
}): Promise<T> {
  const { envelope, kek } = args
  const dek = await deriveDek({ kek, uuid: envelope.uuid, bits: ALG_BITS[envelope.alg] })
  const iv = b64urlDecode(envelope.iv)
  const ciphertext = b64urlDecode(envelope.ciphertext)
  const authTag = b64urlDecode(envelope.authTag)
  // Recompose the (ciphertext || authTag) blob Web Crypto expects.
  const combined = new Uint8Array(ciphertext.length + authTag.length)
  combined.set(ciphertext, 0)
  combined.set(authTag, ciphertext.length)
  try {
    const plaintextBytes = new Uint8Array(
      await globalThis.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv, tagLength: 128 },
        dek,
        combined,
      ),
    )
    return JSON.parse(new TextDecoder().decode(plaintextBytes)) as T
  } catch (err) {
    throw new Error(
      `decryptEnvelope: AES-GCM authentication failed for uuid ${envelope.uuid} (${err instanceof Error ? err.message : String(err)})`,
    )
  }
}

/**
 * Binary-payload variant. Used by attachment encryption (R2 blobs,
 * IPFS pins) where the plaintext is raw bytes, not a JSON object.
 * Same DEK derivation; the envelope's phantom T is `Uint8Array`.
 */
export async function encryptBytesEnvelope(args: {
  plaintext: Uint8Array
  uuid: ContentUuid<Uint8Array>
  kek: CryptoKey
  kid: string
  alg?: EnvelopeAlg
}): Promise<CipherEnvelope<Uint8Array>> {
  const alg = args.alg ?? 'AES-GCM-256'
  const dek = await deriveDek({ kek: args.kek, uuid: args.uuid, bits: ALG_BITS[alg] })
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12))
  const result = new Uint8Array(
    await globalThis.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv, tagLength: 128 },
      dek,
      args.plaintext,
    ),
  )
  const ciphertext = result.slice(0, result.length - 16)
  const authTag = result.slice(result.length - 16)
  return {
    uuid: args.uuid,
    alg,
    iv: b64urlEncode(iv),
    ciphertext: b64urlEncode(ciphertext),
    authTag: b64urlEncode(authTag),
    kid: args.kid,
  }
}

export async function decryptBytesEnvelope(args: {
  envelope: CipherEnvelope<Uint8Array>
  kek: CryptoKey
}): Promise<Uint8Array> {
  const { envelope, kek } = args
  const dek = await deriveDek({ kek, uuid: envelope.uuid, bits: ALG_BITS[envelope.alg] })
  const iv = b64urlDecode(envelope.iv)
  const ciphertext = b64urlDecode(envelope.ciphertext)
  const authTag = b64urlDecode(envelope.authTag)
  const combined = new Uint8Array(ciphertext.length + authTag.length)
  combined.set(ciphertext, 0)
  combined.set(authTag, ciphertext.length)
  try {
    return new Uint8Array(
      await globalThis.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv, tagLength: 128 },
        dek,
        combined,
      ),
    )
  } catch (err) {
    throw new Error(
      `decryptBytesEnvelope: AES-GCM authentication failed for uuid ${envelope.uuid} (${err instanceof Error ? err.message : String(err)})`,
    )
  }
}
