/**
 * crypto — the one door to erpax's cryptographic primitives. Every hash, MAC, content uuid, random
 * value and password stretch in erpax goes through here, so each primitive has one implementation.
 *
 * Post-quantum position: everything here is symmetric or hash-based (SHA-256, HMAC-SHA256, PBKDF2 over
 * HMAC-SHA256) at 256-bit strength, which quantum search (Grover) only square-roots. Nothing here uses
 * a public-key primitive that Shor's algorithm breaks.
 *
 * @standard FIPS 180-4 SHA-256
 * @standard FIPS 198-1 HMAC
 * @rfc 9562 §5.8 uuidv8 content-uuid · §4.1 variant
 * @rfc 8018 §5.2 PBKDF2
 * @security NIST SP-800-132 password-based-key-derivation
 */
import { createHash, createHmac, pbkdf2, randomBytes as nodeRandomBytes } from 'node:crypto'

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
