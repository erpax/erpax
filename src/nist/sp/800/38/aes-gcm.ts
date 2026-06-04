/**
 * AES-256-GCM authenticated encryption — field-level encrypt-at-rest.
 *
 * Key is derived per `internalSecretPurpose.fieldEncryption` from
 * `@/standards/nist-sp-800-108` (HMAC-SHA256). The app's master secret never
 * leaves the KDF module.
 *
 * Wire format: `<iv-hex>:<auth-tag-hex>:<ciphertext-hex>`.
 *
 * @standard NIST SP-800-38D aes-gcm authenticated-encryption
 * @standard NIST FIPS-197 aes-256
 * @standard NIST FIPS-180-4 sha-256
 * @rfc 5116 authenticated-encryption-with-associated-data
 * @security ISO-27001 A.8.24 use-of-cryptography
 * @security ISO-27002 §8.24 use-of-cryptography
 * @compliance GDPR Art.32(1)(a) pseudonymization-and-encryption
 * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
 * @see docs/STANDARDS.md §4.4
 */

import crypto from 'crypto'

import { deriveSecretFromPayloadSecret, internalSecretPurpose } from '@/nist/sp/800/108'

const ALGORITHM = 'aes-256-gcm'
const ENCODING = 'hex'
const IV_LENGTH = 16 // bytes
const _AUTH_TAG_LENGTH = 16 // bytes

/**
 * Get encryption key — derived from the app's internal master secret.
 *
 * Per the standards system (`src/standards/nist-sp-800-108/kdf.ts`), the
 * project enforces *single-secret custodianship* via `PAYLOAD_SECRET` and
 * derives every per-purpose key from it. The error message mentions
 * `PAYLOAD_SECRET` explicitly so test failures point ops at the right
 * env var instead of suggesting a competing `ENCRYPTION_KEY` variable.
 */
function getEncryptionKey(): Buffer {
  const derived = deriveSecretFromPayloadSecret(internalSecretPurpose.fieldEncryption)
  if (!derived) {
    throw new Error(
      'Field encryption key unavailable: PAYLOAD_SECRET must be set ' +
        '(single-secret custodianship — see src/standards/nist-sp-800-108/kdf.ts).',
    )
  }
  // HMAC-SHA256 returns 64-char hex (32 bytes). AES-256-GCM needs exactly 32 bytes.
  return Buffer.from(derived, 'hex').subarray(0, 32)
}

/**
 * Encrypt a plaintext string.
 *
 * @standard NIST SP-800-38D §6 ghash + §7.1 encrypt
 */
export function encryptField(plaintext: string | null | undefined): string | null {
  // Only `null` / `undefined` short-circuit. Empty strings are valid input and
  // round-trip correctly through GCM — see the `should encrypt empty string`
  // test in `tests/standards/nist-sp-800-38/aes-gcm.int.spec.ts`.
  if (plaintext === null || plaintext === undefined) {
    return null
  }

  try {
    const key = getEncryptionKey()
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

    let encrypted = cipher.update(plaintext, 'utf8', ENCODING)
    encrypted += cipher.final(ENCODING)

    const authTag = cipher.getAuthTag()

    // Format: iv + authTag + encrypted
    const result = iv.toString(ENCODING) + ':' + authTag.toString(ENCODING) + ':' + encrypted

    return result
  } catch (error) {
    throw new Error(
      `Encryption failed: ${(error as Error).message}`,
    )
  }
}

/**
 * Decrypt an encrypted string.
 *
 * @standard NIST SP-800-38D §7.2 decrypt-and-verify
 */
export function decryptField(encrypted: string | null | undefined): string | null {
  if (!encrypted) {
    return null
  }

  try {
    const key = getEncryptionKey()
    const parts = encrypted.split(':')

    if (parts.length !== 3) {
      throw new Error('Invalid encrypted data format')
    }

    const iv = Buffer.from(parts[0], ENCODING)
    const authTag = Buffer.from(parts[1], ENCODING)
    const encryptedData = parts[2]

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
    decipher.setAuthTag(authTag)

    let decrypted = decipher.update(encryptedData, ENCODING, 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  } catch (error) {
    throw new Error(
      `Decryption failed: ${(error as Error).message}`,
    )
  }
}

/**
 * Check if a value is encrypted (has correct format).
 *
 * Strict format check: three colon-separated lowercase-hex segments where
 * the IV is exactly `IV_LENGTH` bytes (32 hex chars), the auth tag is
 * 16 bytes (32 hex chars), and the ciphertext is at least 1 hex byte
 * (2 chars). `Buffer.from(_, 'hex')` silently returns a partial buffer
 * for non-hex input, so we use a regex instead.
 */
export function isEncrypted(value: unknown): boolean {
  if (typeof value !== 'string') {
    return false
  }

  const parts = value.split(':')
  if (parts.length !== 3) {
    return false
  }

  const [iv, authTag, ciphertext] = parts
  const ivHexLen = IV_LENGTH * 2
  const tagHexLen = _AUTH_TAG_LENGTH * 2
  const HEX_RE = /^[0-9a-f]+$/i

  if (iv.length !== ivHexLen || !HEX_RE.test(iv)) return false
  if (authTag.length !== tagHexLen || !HEX_RE.test(authTag)) return false
  if (ciphertext.length < 2 || ciphertext.length % 2 !== 0 || !HEX_RE.test(ciphertext)) return false

  return true
}

/**
 * Bulk encrypt multiple fields.
 */
export function encryptFields<T extends Record<string, unknown>>(
  obj: T,
  fieldsToEncrypt: string[],
): T {
  const encrypted: Record<string, unknown> = { ...obj }

  for (const field of fieldsToEncrypt) {
    const value = encrypted[field]
    if (typeof value === 'string' && value.length > 0) {
      encrypted[field] = encryptField(value)
    }
  }

  return encrypted as T
}

/**
 * Bulk decrypt multiple fields.
 */
export function decryptFields<T extends Record<string, unknown>>(
  obj: T,
  fieldsToDecrypt: string[],
): T {
  const decrypted: Record<string, unknown> = { ...obj }

  for (const field of fieldsToDecrypt) {
    const value = decrypted[field]
    if (typeof value === 'string' && value.length > 0 && isEncrypted(value)) {
      decrypted[field] = decryptField(value)
    }
  }

  return decrypted as T
}

/**
 * Generate an encryption key (run once, store in `.env`).
 */
export function generateEncryptionKey(): string {
  return crypto.randomBytes(32).toString('base64')
}
