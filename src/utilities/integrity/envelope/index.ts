/**
 * Envelope encryption keyed by content uuid: each tenant holds a key-encryption key (KEK); each
 * record's data key is HKDF(KEK, salt = its content uuid), never stored; the record is sealed under
 * that key with AES-256-GCM and bound to the uuid as additional data. Rotating the KEK re-derives
 * every data key without re-encrypting a byte of key material. All of it goes through the crypto door.
 *
 * @standard NIST SP 800-38D AES-GCM
 * @standard NIST SP 800-57 §5.6 key-management lifecycles
 * @standard RFC 5116 AEAD
 * @standard RFC 5869 HKDF
 * @standard ISO/IEC 27040 §6.7 storage security
 * @standard GDPR Article 32(1)(a) encryption of personal data
 * @standard PCI DSS 4.0 §3.5 strong cryptography
 */
import { hkdf, open, seal } from '@/utilities/crypto'
import type { ContentUuid } from '@/utilities/integrity/content'

/** A record at rest: its content uuid, the key that sealed it, and the sealed token. */
export interface CipherEnvelope<T> {
  readonly uuid: ContentUuid<T>
  readonly alg: 'AES-256-GCM'
  readonly kid: string
  readonly sealed: string
}

const INFO = 'erpax-envelope-v1'

/** The record's data key: HKDF of the KEK, salted with its content uuid. */
const dataKey = (kek: Uint8Array, uuid: string): Buffer => hkdf({ key: kek, salt: uuid, info: INFO })

/** Seal `plaintext` (as JSON) under the data key its content uuid derives from the tenant's KEK. */
export const encryptEnvelope = <T>({ plaintext, uuid, kek, kid }: { plaintext: T; uuid: ContentUuid<T>; kek: Uint8Array; kid: string }): CipherEnvelope<T> => ({
  uuid,
  alg: 'AES-256-GCM',
  kid,
  sealed: seal(dataKey(kek, uuid), JSON.stringify(plaintext), uuid),
})

/** Open an envelope; throws when the KEK, the uuid or a byte of the token is wrong. */
export const decryptEnvelope = <T>({ envelope, kek }: { envelope: CipherEnvelope<T>; kek: Uint8Array }): T =>
  JSON.parse(open(dataKey(kek, envelope.uuid), envelope.sealed, envelope.uuid).toString('utf8')) as T
