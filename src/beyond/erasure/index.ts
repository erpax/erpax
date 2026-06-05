/**
 * Law 20 (boundary side) — Crypto-shredding. Slice ZZZZZ.
 *
 * `reversibility.ts` owns the INTERIOR of erasure: every transition carries a
 * typed inverse, so a right-to-erasure request is met by running inverses, never
 * by deleting a posted row. But `isFullyReversible` goes false at the system
 * BOUNDARY — content-uuid identity and the append-only chain forbid excising the
 * bytes. This module is that boundary: when the value cannot be inverted away,
 * GDPR Art. 17 is satisfied by destroying the KEY, not the data.
 *
 * One move resolves two limits at once: encrypt each record under a per-record
 * key, content-address the CIPHERTEXT (not the plaintext), and hold the key in a
 * vault.
 *   - Integrity / dedup / federation still ride the ciphertext-uuid.
 *   - Confidentiality is restored — the hash of a known plaintext reveals nothing,
 *     because identical plaintext under different keys yields different ciphertext
 *     (the dedup-oracle leak is closed).
 *   - TRUE erasure is real and irrevocable EVERYWHERE at once: destroy the key and
 *     every federated copy of the ciphertext is unrecoverable noise — the tombstone
 *     and provenance survive, the content does not. You don't shred the data (you
 *     can't); you shred the key.
 *
 * This is the PROTOCOL over an injected `Cipher`. Production MUST inject
 * authenticated AES-256-GCM (Web Crypto `crypto.subtle`) with a random IV per
 * record — never a toy cipher. The protocol (seal / open / shred and their
 * guarantees) is what `erasure.test.ts` verifies, independent of cipher strength.
 *
 * @standard ISO 27040 §6.3 cryptographic-erasure
 * @standard NIST SP 800-88 Rev.1 media-sanitization (cryptographic erase)
 * @compliance GDPR Art. 17 right-to-erasure (irrevocable via key destruction)
 */

/** A symmetric authenticated cipher. PRODUCTION: AES-256-GCM via Web Crypto. */
export interface Cipher {
  encrypt: (plaintext: string, key: string) => string
  decrypt: (ciphertext: string, key: string) => string
}

/** A record at rest: the ciphertext + the id of the key that unlocks it, addressed by the CIPHERTEXT. */
export interface SealedRecord {
  keyId: string
  ciphertext: string
  /** content-uuid of the CIPHERTEXT — integrity & dedup without exposing plaintext. */
  contentUuid: string
}

/** The key vault — the ONLY place plaintext is recoverable from. Shredding here erases everywhere. */
export type KeyVault = Map<string, string>

/** Seal plaintext under a key: store the ciphertext, address it by its content-uuid. */
export function seal(
  plaintext: string,
  keyId: string,
  key: string,
  cipher: Cipher,
  uuidOfCiphertext: (ciphertext: string) => string,
): SealedRecord {
  const ciphertext = cipher.encrypt(plaintext, key)
  return { keyId, ciphertext, contentUuid: uuidOfCiphertext(ciphertext) }
}

/** Open a sealed record. If its key has been shredded, the content is irrecoverable. */
export function open(
  record: SealedRecord,
  vault: KeyVault,
  cipher: Cipher,
): { recovered: boolean; plaintext?: string } {
  const key = vault.get(record.keyId)
  if (key == null) return { recovered: false } // key shredded → ciphertext is unrecoverable noise
  return { recovered: true, plaintext: cipher.decrypt(record.ciphertext, key) }
}

/**
 * Crypto-shred: destroy the key. The ciphertext (and its content-uuid) persist
 * for integrity and audit, but the content is gone EVERYWHERE the key was the
 * only door — irreversible, idempotent. This is erpax's true erasure, the
 * boundary that `isFullyReversible` (reversibility.ts) hands off to.
 */
export function shred(keyId: string, vault: KeyVault): { erased: boolean } {
  return { erased: vault.delete(keyId) }
}
