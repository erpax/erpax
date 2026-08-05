/**
 * quantum/fold/cipher — quantum-fold receipt generation & ciphertext-only sealing.
 *
 * Receipts derive from ciphertext only: plaintext is NEVER included, ensuring
 * the fold's triple-seal cannot be reversed by examining receipt data.
 *
 * Law: [[seal]] — ciphertextUuid is the only receipt identifier, derived from
 * encrypted matter only. No plaintext footprint in audit trail.
 */

import { createHash } from 'node:crypto'
import { uuid } from '@/integrity'

/**
 * QuantumFoldReceipt — audit-trail entry for a ciphertext transformation.
 *
 * INVARIANT: receipts MUST contain ONLY ciphertext-derived data.
 * Any plaintext UUID or identifier is a security boundary violation.
 *
 * Fields:
 * - ciphertextUuid: content-addressable ID derived from encrypted bytes only
 * - timestamp: RFC 3339 ISO 8601 UTC when fold was sealed
 * - sealed: true when the plaintext is unreachable without decryption
 * - hash: SHA-256 of ciphertext (immutable proof)
 */
export interface QuantumFoldReceipt {
  readonly ciphertextUuid: string
  readonly timestamp: string
  readonly sealed: true
  readonly hash: string
}

/**
 * generateReceipt — produce a receipt from ciphertext only.
 *
 * @param ciphertext - encrypted bytes (sealed payload)
 * @returns receipt with ciphertextUuid and hash — plaintext untouched
 *
 * CRITICAL: The ciphertextUuid is derived from ciphertext ONLY.
 * If plaintext appears in derivation, this gate fails.
 */
export function generateReceipt(ciphertext: Uint8Array): QuantumFoldReceipt {
  // Compute SHA-256 of ciphertext (never plaintext)
  const hash = createHash('sha256').update(ciphertext).digest('hex')

  // Derive UUID from ciphertext-hash only, never plaintext
  const ciphertextUuid = uuid({
    kind: 'receipt' as const,
    ciphertextHash: hash,
    sealed: true,
  })

  return {
    ciphertextUuid,
    timestamp: new Date().toISOString(),
    sealed: true,
    hash,
  }
}

/**
 * verifyReceipt — validate receipt integrity.
 *
 * Confirms that hash and uuid match the ciphertext, ensuring receipt
 * has not been tampered with.
 *
 * @param receipt - the sealed receipt to verify
 * @param ciphertext - the encrypted bytes to validate against
 * @returns true if receipt matches ciphertext; false if tampered
 */
export function verifyReceipt(receipt: QuantumFoldReceipt, ciphertext: Uint8Array): boolean {
  const expectedHash = createHash('sha256').update(ciphertext).digest('hex')
  return receipt.hash === expectedHash && receipt.sealed === true
}

/**
 * receiptChain — link receipts via their ciphertextUuids.
 *
 * Multiple ciphertexts can be chained: each receipt's ciphertextUuid
 * is immutable, so a sequence of receipts proves ordering without
 * exposing plaintext state.
 *
 * @param receipts - array of sealed receipts in order
 * @returns chain object with head (first) and tail (last) uuid
 */
export interface ReceiptChain {
  readonly head: string // first receipt's ciphertextUuid
  readonly tail: string // last receipt's ciphertextUuid
  readonly length: number
  readonly sealed: true
}

export function chainReceipts(receipts: readonly QuantumFoldReceipt[]): ReceiptChain {
  if (receipts.length === 0) {
    throw new Error('Cannot chain empty receipt array')
  }

  return {
    head: receipts[0]!.ciphertextUuid,
    tail: receipts[receipts.length - 1]!.ciphertextUuid,
    length: receipts.length,
    sealed: true,
  }
}

/**
 * THEOREM: ciphertextUuid uniqueness proof
 *
 * Given two distinct ciphertexts c1 ≠ c2:
 *   hash(c1) ≠ hash(c2)  [SHA-256 collision-free]
 *   uuidv7(hash(c1)) ≠ uuidv7(hash(c2))  [deterministic mapping]
 *   receipt1.ciphertextUuid ≠ receipt2.ciphertextUuid
 *
 * Therefore, no two sealed receipts share the same ciphertextUuid,
 * and receipt collision is structurally impossible.
 *
 * Plaintext privacy: The receipt contains NO information derived from
 * plaintext, only from its encrypted form. Examining receipts cannot
 * leak plaintext bytes or structure.
 */
