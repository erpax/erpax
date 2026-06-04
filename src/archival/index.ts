/**
 * Long-term decentralized archival — Slice EEEEEE. Per spec scope expansion #5.
 *
 * IPFS / Arweave / Filecoin pinning interface for tenants under
 * regulatory long-retention rules (banks 10y, gov 30y, healthcare 50y,
 * archives unlimited). Beyond TTTTT in-platform redundancy.
 *
 * @standard W3C IPFS CID v1 — sha-256 maps to ERPax content-uuid
 * @standard Arweave Pay-Once-Store-Forever
 * @standard Filecoin storage proofs (Spacegap / Spacetime)
 */

export type ArchiveBackendId = 'ipfs' | 'arweave' | 'filecoin' | 'r2-glacier'

export interface PinReceipt {
  readonly backend: ArchiveBackendId
  readonly contentUuid: string
  readonly addressInBackend: string                  // CID for IPFS, txId for Arweave, dealId for Filecoin
  readonly pinnedAt: string
  readonly retentionDays: number
  readonly verifyUrl?: string
  readonly cost?: { amount: string; currency: string }
}

export interface ArchiveBackend {
  readonly id: ArchiveBackendId
  pin(args: { contentUuid: string; bytes: ArrayBuffer; retentionDays: number }): Promise<PinReceipt>
  verify(receipt: PinReceipt): Promise<{ ok: boolean; reason?: string }>
  recover(receipt: PinReceipt): Promise<ArrayBuffer>
}

const PINNED_BY_TENANT = new Map<string, PinReceipt[]>()

export async function pinForRetention(args: {
  tenantId: string
  contentUuid: string
  bytes: ArrayBuffer
  retentionDays: number
  backends: ReadonlyArray<ArchiveBackend>          // pin to all listed (defense in depth)
}): Promise<ReadonlyArray<PinReceipt>> {
  const receipts: PinReceipt[] = []
  for (const b of args.backends) {
    try {
      const r = await b.pin({ contentUuid: args.contentUuid, bytes: args.bytes, retentionDays: args.retentionDays })
      receipts.push(r)
    } catch { /* swallow — at least one backend must succeed; caller checks length */ }
  }
  let arr = PINNED_BY_TENANT.get(args.tenantId)
  if (!arr) { arr = []; PINNED_BY_TENANT.set(args.tenantId, arr) }
  arr.push(...receipts)
  return receipts
}

export function tenantPins(tenantId: string): ReadonlyArray<PinReceipt> {
  return PINNED_BY_TENANT.get(tenantId) ?? []
}

export async function verifyPinning(receipt: PinReceipt, backend: ArchiveBackend): Promise<{ ok: boolean; reason?: string }> {
  if (receipt.backend !== backend.id) return { ok: false, reason: 'backend kind mismatch' }
  return backend.verify(receipt)
}
