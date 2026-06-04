/**
 * Blockchain anchoring — Slice BBBBBB. Per spec scope expansion #2.
 *
 * Periodically write a Merkle root of recent audit leaves to a public
 * chain (Bitcoin OP_RETURN / Ethereum L2 / Cardano metadata / Bluesky
 * AT-proto). Regulators verify ERPax integrity by resolving the
 * anchor → fetching audit leaves → recomputing the Merkle root →
 * confirming match. Removes the need to trust ERPax.
 *
 * The anchor is the ONE external entropy a zero-entropy store borrows
 * (services/anchor, services/tamper-cost): un-anchored ⇒ a writer rewrites the
 * deterministic whole for free. So a backend that does NOT pin to entropy no
 * party controls is NOT tamper-evidence, and must never be mistaken for one:
 *   - `ChainBackend.external` marks whether a backend is a real external anchor.
 *   - `verifyAnchor().ok` is TRUE only when the backend is external AND the
 *     receipt verifies — a non-external stub can never return a passing verdict.
 *   - `anchorRoot({ requireExternal: true })` refuses a non-external backend.
 * The bundled `NOTARY_STUB_BACKEND` is a LOCAL dev double (external: false): it
 * verifies only self-consistency (the receipt matches its own root, and that
 * root was anchored in this process), never external order.
 *
 * Anchor leaves must commit the FULL 256-bit content digest (`anchorLeaf` →
 * services/integrity/content-uuid `computeContentDigest`), NOT the truncated
 * 106-bit uuid — else the chosen-content collision floor is 2^53, not 2^128
 * (services/tamper-cost `anchorCommitmentBits`).
 *
 * @standard W3C Verifiable Credentials Data Model 2.0
 * @standard ISO 19011:2018 §6.4.6 (third-party-verifiable audit trail)
 * @standard RFC 3161 (TSA) · eIDAS (EU 910/2014) — the real external anchors
 * @audit Conservation Law 55/62 (tamper cost; the anchor is mandatory external entropy)
 */

import { computeContentDigest, uuid } from '@/integrity/content-uuid'

export type ChainKind = 'bitcoin-opreturn' | 'ethereum-l2' | 'cardano-metadata' | 'atproto' | 'notary-signature'

export interface AnchorReceipt {
  readonly chainKind: ChainKind
  readonly transactionId: string                    // tx hash / record id
  readonly merkleRoot: string                       // the audit-chain root anchored
  readonly anchoredAt: string
  readonly verifyUrl?: string                       // public explorer link
  readonly fee?: { amount: string; currency: string }
}

export interface ChainBackend {
  readonly kind: ChainKind
  /**
   * Does this backend pin the root to entropy NO single party controls (a real
   * TSA/blockchain)? A local stub does not — its receipts are not tamper-evidence.
   */
  readonly external: boolean
  anchor(merkleRoot: string): Promise<AnchorReceipt>
  verify(receipt: AnchorReceipt): Promise<{ ok: boolean; reason?: string }>
}

/** The verdict of `verifyAnchor`: `ok` means REAL tamper-evidence (external ∧ verified). */
export interface AnchorVerification {
  /** TRUE only when the backend is an external anchor AND the receipt verifies. */
  readonly ok: boolean
  readonly reason?: string
  /** does the backend pin to entropy no party controls? A stub does not. */
  readonly external: boolean
}

/** Is this backend a REAL external anchor — i.e. can its receipts be tamper-evidence at all? */
export const isExternalAnchor = (backend: ChainBackend): boolean => backend.external

/**
 * The value an anchor/Merkle leaf must commit for a content object: the FULL
 * 256-bit content digest (collision 2^128), NOT the 106-bit uuid (collision
 * 2^53). Pair with `crackVerdict({ anchorCommitmentBits: CONTENT_DIGEST_BITS })`.
 */
export const anchorLeaf = (content: Record<string, unknown>, tenantId: string): string =>
  computeContentDigest(content, tenantId)

const RECEIPTS_BY_TENANT = new Map<string, AnchorReceipt[]>()

export async function anchorRoot(args: {
  tenantId: string
  merkleRoot: string
  backend: ChainBackend
  /** in a tamper-evident context, refuse a non-external (stub) backend. */
  requireExternal?: boolean
}): Promise<AnchorReceipt> {
  if (args.requireExternal && !args.backend.external) {
    throw new Error(
      `[anchoring] refusing to anchor with non-external backend '${args.backend.kind}' in a tamper-evident context — configure a real TSA/blockchain anchor`,
    )
  }
  const receipt = await args.backend.anchor(args.merkleRoot)
  let arr = RECEIPTS_BY_TENANT.get(args.tenantId)
  if (!arr) { arr = []; RECEIPTS_BY_TENANT.set(args.tenantId, arr) }
  arr.push(receipt)
  return receipt
}

export function listAnchors(tenantId: string): ReadonlyArray<AnchorReceipt> {
  return RECEIPTS_BY_TENANT.get(tenantId) ?? []
}

/**
 * Verify a receipt. `ok` is TRUE only for a REAL external anchor whose receipt
 * verifies — a non-external backend (stub) can be self-consistent yet still
 * returns `ok: false`, because self-consistency is not tamper-evidence.
 */
export async function verifyAnchor(receipt: AnchorReceipt, backend: ChainBackend): Promise<AnchorVerification> {
  if (receipt.chainKind !== backend.kind) {
    return { ok: false, external: backend.external, reason: `backend kind mismatch (receipt=${receipt.chainKind}, backend=${backend.kind})` }
  }
  const inner = await backend.verify(receipt)
  if (!backend.external) {
    return {
      ok: false,
      external: false,
      reason: inner.ok
        ? `backend '${backend.kind}' is not an external anchor — receipt is self-consistent but NOT tamper-evidence; configure a real TSA/blockchain backend`
        : inner.reason ?? 'stub verification failed',
    }
  }
  return inner.reason === undefined ? { ok: inner.ok, external: true } : { ok: inner.ok, external: true, reason: inner.reason }
}

/** Deterministic notary tx-id derived from the root, so `verify` can recompute it. */
const notaryTxId = (merkleRoot: string): string => `notary:${uuid(merkleRoot)}`

/**
 * A LOCAL notary stub (external: false) — for tests and unconfigured dev. It is
 * NOT an external anchor: `verifyAnchor` will never pass it. On its own it does
 * an honest self-consistency check — the receipt's tx-id must match its root and
 * the root must have been anchored by THIS process — never an unconditional yes.
 */
function makeNotaryStub(): ChainBackend {
  const anchored = new Set<string>()
  return {
    kind: 'notary-signature',
    external: false,
    async anchor(merkleRoot) {
      anchored.add(merkleRoot)
      return {
        chainKind: 'notary-signature',
        transactionId: notaryTxId(merkleRoot),
        merkleRoot,
        anchoredAt: new Date().toISOString(),
        fee: { amount: '0', currency: 'USD' },
      }
    },
    async verify(receipt) {
      if (receipt.chainKind !== 'notary-signature') return { ok: false, reason: 'not a notary receipt' }
      if (receipt.transactionId !== notaryTxId(receipt.merkleRoot)) {
        return { ok: false, reason: 'receipt transactionId does not match its merkleRoot (tampered)' }
      }
      if (!anchored.has(receipt.merkleRoot)) {
        return { ok: false, reason: 'merkleRoot was never anchored by this stub instance' }
      }
      return { ok: true }
    },
  }
}

/** Stub backend used in tests + when no chain is configured. NOT tamper-evidence. */
export const NOTARY_STUB_BACKEND: ChainBackend = makeNotaryStub()
