/**
 * crypto — the one door to erpax's cryptographic primitives. Every hash, MAC, content uuid, random
 * value, password stretch, key derivation, cipher and signature in erpax goes through here, so each
 * primitive has one implementation.
 *
 * Post-quantum position: the symmetric side is SHA-256, HMAC-SHA256, HKDF, PBKDF2 and AES-256-GCM at
 * 256-bit keys. Signatures are ML-DSA (FIPS 204), with the parameter set decided in Cost.lean
 * (`the_signature_is_ml_dsa_44`). The one classical public-key primitive is `rsaSha256Sign`, kept
 * only because a counterpart's PKI (qualified certificates for PAdES) still requires it.
 *
 * @standard FIPS 180-4 SHA-256
 * @standard FIPS 198-1 HMAC
 * @standard FIPS 204 ML-DSA
 * @standard NIST SP-800-38D AES-GCM
 * @rfc 5869 HKDF
 * @rfc 9562 §5.8 uuidv8 content-uuid · §4.1 variant
 * @rfc 8018 §5.2 PBKDF2
 * @security NIST SP-800-132 password-based-key-derivation
 */
import { createCipheriv, createDecipheriv, createHash, createHmac, createSign, hkdfSync, pbkdf2, randomBytes as nodeRandomBytes } from 'node:crypto'

/** A value to hash: text (UTF-8) or bytes. Several parts are hashed as their concatenation. */
export type Part = string | Uint8Array

const toBytes = (part: Part): Uint8Array => (typeof part === 'string' ? Buffer.from(part, 'utf8') : part)

/** SHA-256 of the concatenated parts. */
export const sha256 = (...parts: readonly Part[]): Buffer => {
  const hash = createHash('sha256')
  for (const part of parts) hash.update(toBytes(part))
  return hash.digest()
}

/** SHA-256 of the concatenated parts, as lowercase hex. */
export const sha256Hex = (...parts: readonly Part[]): string => sha256(...parts).toString('hex')

/** HMAC-SHA256 of the concatenated parts under `key`. */
export const hmacSha256 = (key: Part, ...parts: readonly Part[]): Buffer => {
  const mac = createHmac('sha256', toBytes(key))
  for (const part of parts) mac.update(toBytes(part))
  return mac.digest()
}

/** 16 bytes as a canonical uuid string, 8-4-4-4-12. */
export const formatUuid = (bytes16: Uint8Array): string => {
  const hex = Buffer.from(bytes16.subarray(0, 16)).toString('hex')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`
}

/** A uuid string's 16 bytes. */
export const uuidBytes = (uuid: string): Buffer => Buffer.from(uuid.replace(/-/g, ''), 'hex')

/** RFC 9562 §5.8: a digest's first 16 bytes stamped version 8 and variant 10, as a uuid string. */
export const uuidV8 = (digest: Uint8Array): string => {
  const bytes = Buffer.from(digest.subarray(0, 16))
  bytes[6] = (bytes[6]! & 0x0f) | 0x80
  bytes[8] = (bytes[8]! & 0x3f) | 0x80
  return formatUuid(bytes)
}

/** The uuid cross: the parts crossed into one v8 uuid, uuidV8(SHA-256(parts)). */
export const cross = (...parts: readonly Part[]): string => uuidV8(sha256(...parts))

/** A random v4 uuid, from the platform's CSPRNG. */
export const randomUuid = (): string => globalThis.crypto.randomUUID()

/** `n` random bytes, from the platform's CSPRNG. */
export const randomBytes = (n: number): Buffer => nodeRandomBytes(n)

// ── Password stretching ───────────────────────────────────────────────────────────────────────────
// Cloudflare Workers refuse a PBKDF2 call above 100,000 iterations. A larger count is reached in capped
// rounds: each round keys PBKDF2 with the previous round's output and salts it with the uuid cross of
// the stored salt and the round, so the per-user salt holds in every round and the work equals the
// count. Payload's own hashing applies the same construction (patches/payload@4.0.0-beta.9.patch);
// src/collections/users/hashing.test.ts proves a stored hash equals `stretch`'s output.

/** The most PBKDF2 iterations one call may run on Cloudflare Workers. */
export const PBKDF2_ROUND_CAP = 100000

/** The salt of round `round`: the uuid cross of the stored salt and the round. */
export const roundSalt = (salt: string, round: number): string => cross(`${salt}:${round}`)

const pbkdf2Once = (password: Part, salt: string, iterations: number, keyLength: number): Promise<Buffer> =>
  new Promise((resolve, reject) => pbkdf2(toBytes(password), salt, iterations, keyLength, 'sha256', (err, key) => (err ? reject(err) : resolve(key))))

/** PBKDF2-HMAC-SHA256 at `iterations`, in rounds of at most PBKDF2_ROUND_CAP (one plain call at or below it). */
export const stretch = async ({ iterations, keyLength, password, salt }: { iterations: number; keyLength: number; password: Part; salt: string }): Promise<Buffer> => {
  if (iterations <= PBKDF2_ROUND_CAP) return pbkdf2Once(password, salt, iterations, keyLength)
  let key: Part = password
  for (let round = 0, left = iterations; left > 0; round++, left -= PBKDF2_ROUND_CAP) {
    key = await pbkdf2Once(key, roundSalt(salt, round), Math.min(left, PBKDF2_ROUND_CAP), keyLength)
  }
  return key as Buffer
}

// ── Key derivation ────────────────────────────────────────────────────────────────────────────────

/** RFC 5869 HKDF-SHA256: `length` bytes of key from the input key material, a salt and a context. */
export const hkdf = ({ key, salt, info, length = 32 }: { key: Part; salt: Part; info: Part; length?: number }): Buffer =>
  Buffer.from(hkdfSync('sha256', toBytes(key), toBytes(salt), toBytes(info), length))

// ── Authenticated encryption ──────────────────────────────────────────────────────────────────────
// AES-256-GCM (NIST SP 800-38D) with a random 96-bit IV and a 128-bit tag, serialized as one token,
// `iv.ciphertext.tag` in base64url. The additional data binds a ciphertext to where it belongs (a
// field name, a content uuid): opened anywhere else, it fails authentication.

const KEY_BYTES = 32
const IV_BYTES = 12
const TAG_BYTES = 16
const SEALED = /^[A-Za-z0-9_-]{16}\.[A-Za-z0-9_-]*\.[A-Za-z0-9_-]{22}$/

const aesKey = (key: Uint8Array): Uint8Array => {
  if (key.length !== KEY_BYTES) throw new Error(`crypto: an AES-256 key is ${KEY_BYTES} bytes, not ${key.length}`)
  return key
}

/** Encrypt and authenticate `plaintext` under a 32-byte key, bound to `aad`. */
export const seal = (key: Uint8Array, plaintext: Part, aad: Part = ''): string => {
  const iv = nodeRandomBytes(IV_BYTES)
  const cipher = createCipheriv('aes-256-gcm', aesKey(key), iv, { authTagLength: TAG_BYTES })
  cipher.setAAD(toBytes(aad))
  const ciphertext = Buffer.concat([cipher.update(toBytes(plaintext)), cipher.final()])
  return [iv, ciphertext, cipher.getAuthTag()].map((b) => b.toString('base64url')).join('.')
}

/** Whether a value has the shape of a sealed token. */
export const isSealed = (value: unknown): value is string => typeof value === 'string' && SEALED.test(value)

/** Decrypt a sealed token; throws when the key, the additional data or a byte of it is wrong. */
export const open = (key: Uint8Array, token: string, aad: Part = ''): Buffer => {
  if (!isSealed(token)) throw new Error('crypto: not a sealed token')
  const [iv, ciphertext, tag] = token.split('.').map((part) => Buffer.from(part, 'base64url')) as [Buffer, Buffer, Buffer]
  const decipher = createDecipheriv('aes-256-gcm', aesKey(key), iv, { authTagLength: TAG_BYTES })
  decipher.setAAD(toBytes(aad))
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(ciphertext), decipher.final()])
}

// ── Signatures ────────────────────────────────────────────────────────────────────────────────────
// ML-DSA through Web Crypto: native in Node 24 and in Workers with the `webcrypto_modern_algorithms`
// compatibility flag. The set is Cost.lean's choice, the cheapest whose category meets the collision
// strength of the SHA-256 digests erpax signs.

/** The signature algorithm, decided in Cost.lean (`the_signature_is_ml_dsa_44`). */
export const SIGNATURE = 'ML-DSA-44' as const

/** A fresh ML-DSA key pair. */
export const signingKeys = async (extractable = false): Promise<CryptoKeyPair> =>
  (await globalThis.crypto.subtle.generateKey({ name: SIGNATURE }, extractable, ['sign', 'verify'])) as CryptoKeyPair

/** An ML-DSA signature over the concatenated parts. */
export const sign = async (privateKey: CryptoKey, ...parts: readonly Part[]): Promise<Buffer> =>
  Buffer.from(await globalThis.crypto.subtle.sign({ name: SIGNATURE }, privateKey, Buffer.concat(parts.map(toBytes))))

/** Whether `signature` is an ML-DSA signature over the concatenated parts; a malformed one is false. */
export const verify = async (publicKey: CryptoKey, signature: Uint8Array, ...parts: readonly Part[]): Promise<boolean> =>
  globalThis.crypto.subtle.verify({ name: SIGNATURE }, publicKey, Uint8Array.from(signature), Buffer.concat(parts.map(toBytes))).catch(() => false)

/**
 * RSASSA-PKCS1-v1_5 with SHA-256 under a PEM key (RFC 8017 §8.2). Classical and broken by Shor; it is
 * here only because a counterpart's PKI requires it (PAdES with a qualified certificate), never for
 * erpax's own records.
 */
export const rsaSha256Sign = (keyPem: string, data: Part, passphrase?: string): Buffer =>
  createSign('RSA-SHA256').update(toBytes(data)).sign(passphrase ? { key: keyPem, passphrase } : keyPem)
