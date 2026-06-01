/**
 * Crypto-shred — GDPR erasure against content-addressing.
 *
 * A content-uuid is f(content), and the hash-chain needs the row to remain — so a
 * content-addressed store CANNOT delete: a row-delete breaks the chain and the
 * tamper-evidence. The reconciliation: wrap erasable fields in a CipherEnvelope
 * (uuid-format ENCRYPTED capability) keyed per subject; GDPR Art.17 erasure =
 * **destroy the key**, not the row. The ciphertext + uuid persist (chain intact);
 * the plaintext is unrecoverable forever. You erase the CONTENT, never the RECORD.
 *
 * The load-bearing invariant: the content-uuid MUST be taken over the ENVELOPE
 * (ciphertext + keyId), never the plaintext — else destroying the key would change
 * the recomputed uuid and break the chain. This module models that invariant + the
 * one-way lifecycle; the actual AEAD/key-store is a binding concern.
 *
 * @standard GDPR (EU 2016/679) Art.17 (erasure) · Art.5(1)(c) (minimisation) · Art.25 (by design)
 * @standard NIST SP 800-88 r1 §2.5 (cryptographic erase as sanitisation)
 * @audit content-uuid over the CipherEnvelope ⇒ shred preserves the chain (Law 8/55/60)
 */

export type ShredState = 'plaintext' | 'encrypted' | 'shredded'

/** The lifecycle is one-way: plaintext → encrypted → shredded. No reversal, no skip. */
const ORDER: Record<ShredState, number> = { plaintext: 0, encrypted: 1, shredded: 2 }

export const canTransition = (from: ShredState, to: ShredState): boolean =>
  ORDER[to] === ORDER[from] + 1

/** Only 'plaintext' or 'encrypted' (key present) is recoverable; 'shredded' is gone forever. */
export const isRecoverable = (s: ShredState): boolean => s !== 'shredded'

/**
 * Does crypto-shred preserve the chain? ONLY if the content-uuid is taken over the
 * CipherEnvelope (ciphertext + keyId), not the plaintext. If it hashes the
 * plaintext, destroying the key changes the recomputed uuid ⇒ the chain breaks.
 */
export const shredPreservesChain = (uuidOverEnvelope: boolean): boolean => uuidOverEnvelope

/** GDPR erasure of a content-addressed row = destroy its key (shred), never delete the row. */
export interface ErasureOutcome {
  readonly rowDeleted: false // never — would break the chain
  readonly keyDestroyed: true // the erasure act
  readonly state: 'shredded'
  readonly recoverable: false
  readonly chainIntact: true // uuid is over the envelope, so it is unchanged
}

export function erase(uuidOverEnvelope: boolean): ErasureOutcome {
  if (!uuidOverEnvelope) {
    throw new Error(
      'crypto-shred: the content-uuid must be computed over the CipherEnvelope, not the plaintext — else erasing the key breaks the chain',
    )
  }
  return { rowDeleted: false, keyDestroyed: true, state: 'shredded', recoverable: false, chainIntact: true }
}
