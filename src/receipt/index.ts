/**
 * receipt — the governance receipt IS a uuid. A trust layer splits trust into four primitives
 * (signed receipt + hash-linked audit chain + capability + identity); erpax wires all four through
 * ONE content-addressed, chained, signable uuid by composing `uuid-linked-chain`: the leafUuid =
 * sha256(prevReceipt || content-uuid(decision) || ts) is the receipt id, the Merkle audit-chain
 * link, the identity, and (since caps are decision content) the capability — all at once.
 *
 * Pure composition over the existing uuid primitives; deterministic given an explicit timestamp.
 *
 * @standard RFC 8785 JSON canonicalization (the content the uuid addresses)
 * @standard NIST FIPS 180-4 SHA-256 (the chain + content hash)
 * @see src/services/integrity/uuid-linked-chain.ts · ../uuid-format (capability bits) · ./SKILL.md
 */
import {
  buildNextLeaf,
  verifyUuidLinkedChain,
  type UuidLinkedLeaf,
  type ChainVerifyResult,
} from '@/integrity/uuid-linked-chain'

/**
 * A governance decision — the content a receipt records. The `actor` is a keypair-holder uuid
 * (human / agent / service / device — the actor-merge), not an account; `capabilities` are the
 * granted verbs (read/api/execute…) and ride INSIDE the content-uuid, so they need no separate store.
 */
export interface Decision {
  readonly action: string
  readonly actor: string
  readonly outcome: 'allow' | 'block' | 'escalate'
  readonly tier: string
  readonly capabilities: readonly string[]
}

/** A receipt is a uuid-linked-chain leaf carrying a decision — one uuid = id + chain link + identity + caps. */
export type Receipt = UuidLinkedLeaf

/**
 * Issue the next receipt in a chain. `head` is the current chain head (null for the first/genesis
 * receipt). The leafUuid content-addresses (prev || decision || ts), so the receipt id is the audit
 * link and a tamper detector at once. Pass an explicit `timestampIso` for a deterministic receipt;
 * attach `signature` (an Ed25519 SignedUuid over the leafUuid) for holder-binding.
 */
export function issueReceipt(args: {
  decision: Decision
  head: { leafUuid: string; seq: number } | null
  timestampIso: string
  signature?: string
}): Receipt {
  return buildNextLeaf({
    head: args.head,
    payload: args.decision,
    timestampIso: args.timestampIso,
    ...(args.signature ? { signature: args.signature } : {}),
  })
}

/**
 * Verify a receipt chain: every link re-derives from its content; a break pinpoints the tampered
 * receipt (no external anchor needed — the uuid is the proof). Pass `decisions` (in seq order) to
 * also re-derive each payload-uuid and catch decision-content tampering, not just structural breaks.
 */
export function verifyReceiptChain(
  receipts: readonly Receipt[],
  decisions?: readonly Decision[],
): Promise<ChainVerifyResult> {
  // Fail-closed: passing `decisions` is a request to verify EVERY receipt's
  // decision content. If the array length doesn't match the receipts, the
  // request cannot be honored for every leaf — a short array would leave tail
  // receipts unchecked (decisions[seq] === undefined) and a long array carries
  // decisions with no receipt to bind. Surface this as an explicit verification
  // failure rather than silently verifying only the overlap.
  if (decisions && decisions.length !== receipts.length) {
    return Promise.resolve({
      ok: false,
      chainLength: receipts.length,
      brokenAtSeq: Math.min(decisions.length, receipts.length),
      reason: `decisions/receipts length mismatch: ${decisions.length} decisions for ${receipts.length} receipts — cannot verify every receipt's content`,
    })
  }
  return verifyUuidLinkedChain({
    leaves: receipts,
    // The underlying verifier is fail-closed on a missing payload: if a decision
    // is absent it returns ok:false (payload unavailable), never throws.
    ...(decisions ? { retrievePayload: async (leaf: Receipt) => decisions[leaf.seq] } : {}),
  })
}
