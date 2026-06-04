/**
 * Blockchain anchoring — Slice BBBBBB. Per spec scope expansion #2.
 *
 * Periodically write a Merkle root of recent audit leaves to a public
 * chain (Bitcoin OP_RETURN / Ethereum L2 / Cardano metadata / Bluesky
 * AT-proto). Regulators verify ERPax integrity by resolving the
 * anchor → fetching audit leaves by uuid → recomputing Merkle root →
 * confirming match. Removes need to trust ERPax.
 *
 * @standard W3C Verifiable Credentials Data Model 2.0
 * @standard ISO 19011:2018 §6.4.6 (third-party-verifiable audit trail)
 */

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
  anchor(merkleRoot: string): Promise<AnchorReceipt>
  verify(receipt: AnchorReceipt): Promise<{ ok: boolean; reason?: string }>
}

const RECEIPTS_BY_TENANT = new Map<string, AnchorReceipt[]>()

export async function anchorRoot(args: {
  tenantId: string
  merkleRoot: string
  backend: ChainBackend
}): Promise<AnchorReceipt> {
  const receipt = await args.backend.anchor(args.merkleRoot)
  let arr = RECEIPTS_BY_TENANT.get(args.tenantId)
  if (!arr) { arr = []; RECEIPTS_BY_TENANT.set(args.tenantId, arr) }
  arr.push(receipt)
  return receipt
}

export function listAnchors(tenantId: string): ReadonlyArray<AnchorReceipt> {
  return RECEIPTS_BY_TENANT.get(tenantId) ?? []
}

export async function verifyAnchor(receipt: AnchorReceipt, backend: ChainBackend): Promise<{ ok: boolean; reason?: string }> {
  if (receipt.chainKind !== backend.kind) {
    return { ok: false, reason: `backend kind mismatch (receipt=${receipt.chainKind}, backend=${backend.kind})` }
  }
  return backend.verify(receipt)
}

/** Stub backend used in tests + when no chain is configured. */
export const NOTARY_STUB_BACKEND: ChainBackend = {
  kind: 'notary-signature',
  async anchor(merkleRoot) {
    return {
      chainKind: 'notary-signature',
      transactionId: `notary-${Date.now()}-${merkleRoot.slice(0, 8)}`,
      merkleRoot,
      anchoredAt: new Date().toISOString(),
      fee: { amount: '0', currency: 'USD' },
    }
  },
  async verify() { return { ok: true } },
}
