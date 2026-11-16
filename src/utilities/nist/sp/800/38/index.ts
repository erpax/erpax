/**
 * Field encryption at rest: AES-256-GCM (NIST SP 800-38D) through the crypto door, each value sealed
 * under the field-encryption key and bound to its field's name, so a value moved to another field
 * fails authentication. The key is derived from PAYLOAD_SECRET by the SP 800-108 KDF
 * (`internalSecretPurpose.fieldEncryption`); the master secret never leaves that module.
 *
 * @standard NIST SP-800-38D aes-gcm authenticated-encryption
 * @standard NIST FIPS-197 aes-256
 * @rfc 5116 authenticated-encryption-with-associated-data
 * @security ISO-27001 A.8.24 use-of-cryptography
 * @compliance GDPR Art.32(1)(a) pseudonymization-and-encryption
 * @compliance PCI-DSS-4.0 §3.6 strong-cryptography
 */
import { isSealed, open, seal } from '@/utilities/crypto'
import { deriveSecretFromPayloadSecret, internalSecretPurpose } from '@/utilities/nist/sp/800/108'

const fieldKey = (): Buffer => {
  const derived = deriveSecretFromPayloadSecret(internalSecretPurpose.fieldEncryption)
  if (!derived) throw new Error('Field encryption key unavailable: PAYLOAD_SECRET must be set (src/utilities/nist/sp/800/108).')
  return Buffer.from(derived, 'hex').subarray(0, 32)
}

/** A value sealed for `field`; null and undefined stay as they are. */
export const encryptField = (plaintext: string | null | undefined, field = ''): string | null =>
  plaintext === null || plaintext === undefined ? null : seal(fieldKey(), plaintext, field)

/** A sealed value opened for `field`; throws when it was sealed for another field or altered. */
export const decryptField = (token: string | null | undefined, field = ''): string | null =>
  token ? open(fieldKey(), token, field).toString('utf8') : null

/** Whether a value is a sealed token. */
export const isEncrypted = isSealed

/** The listed fields sealed, each bound to its name; empty and already sealed values are left alone. */
export const encryptFields = <T extends Record<string, unknown>>(obj: T, fields: readonly string[]): T => {
  const out: Record<string, unknown> = { ...obj }
  for (const field of fields) {
    const value = out[field]
    if (typeof value === 'string' && value.length > 0 && !isSealed(value)) out[field] = encryptField(value, field)
  }
  return out as T
}

/** The listed fields opened; values that are not sealed are left alone. */
export const decryptFields = <T extends Record<string, unknown>>(obj: T, fields: readonly string[]): T => {
  const out: Record<string, unknown> = { ...obj }
  for (const field of fields) {
    const value = out[field]
    if (isSealed(value)) out[field] = decryptField(value, field)
  }
  return out as T
}
