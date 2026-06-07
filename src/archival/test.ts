import { describe, it, expect } from 'vitest'
import {
  pinForRetention,
  tenantPins,
  verifyPinning,
  type ArchiveBackend,
  type PinReceipt,
} from '@/archival'

// archival (./index.ts): long-retention pinning to MANY backends (defense in
// depth). pinForRetention swallows per-backend failures and returns only the
// receipts that succeeded; a receipt verifies/recovers only through its own
// backend, keyed by the content-uuid.
const makeBackend = (id: PinReceipt['backend'], opts: { fail?: boolean } = {}): ArchiveBackend => ({
  id,
  async pin({ contentUuid, retentionDays }) {
    if (opts.fail) throw new Error(`${id} unavailable`)
    return {
      backend: id,
      contentUuid,
      addressInBackend: `${id}:${contentUuid}`,
      pinnedAt: new Date().toISOString(),
      retentionDays,
    }
  },
  async verify(receipt) {
    return { ok: receipt.addressInBackend === `${id}:${receipt.contentUuid}` }
  },
  async recover() {
    return new ArrayBuffer(8)
  },
})

describe('archival — defense-in-depth long-term pinning', () => {
  it('pins to every listed backend (defense in depth)', async () => {
    const receipts = await pinForRetention({
      tenantId: 'tenant-pin',
      contentUuid: 'cuid-1',
      bytes: new ArrayBuffer(16),
      retentionDays: 3650,
      backends: [makeBackend('ipfs'), makeBackend('arweave'), makeBackend('filecoin')],
    })
    expect(receipts).toHaveLength(3)
    expect(receipts.map((r) => r.backend)).toEqual(['ipfs', 'arweave', 'filecoin'])
    expect(receipts.every((r) => r.contentUuid === 'cuid-1')).toBe(true)
    expect(receipts.every((r) => r.retentionDays === 3650)).toBe(true)
  })

  it('swallows a failing backend and still returns the survivors', async () => {
    const receipts = await pinForRetention({
      tenantId: 'tenant-partial',
      contentUuid: 'cuid-2',
      bytes: new ArrayBuffer(8),
      retentionDays: 365,
      backends: [makeBackend('ipfs', { fail: true }), makeBackend('arweave')],
    })
    expect(receipts).toHaveLength(1)
    expect(receipts[0].backend).toBe('arweave')
  })

  it('records pins per tenant', async () => {
    const tenantId = 'tenant-tally'
    expect(tenantPins(tenantId)).toHaveLength(0)
    await pinForRetention({ tenantId, contentUuid: 'a', bytes: new ArrayBuffer(1), retentionDays: 10, backends: [makeBackend('ipfs')] })
    await pinForRetention({ tenantId, contentUuid: 'b', bytes: new ArrayBuffer(1), retentionDays: 10, backends: [makeBackend('arweave'), makeBackend('filecoin')] })
    expect(tenantPins(tenantId)).toHaveLength(3)
  })

  it('verifyPinning passes a matching receipt and fails a kind mismatch', async () => {
    const ipfs = makeBackend('ipfs')
    const [receipt] = await pinForRetention({
      tenantId: 'tenant-verify',
      contentUuid: 'cuid-3',
      bytes: new ArrayBuffer(4),
      retentionDays: 100,
      backends: [ipfs],
    })
    expect((await verifyPinning(receipt, ipfs)).ok).toBe(true)
    const mismatch = await verifyPinning(receipt, makeBackend('arweave'))
    expect(mismatch.ok).toBe(false)
    expect(mismatch.reason).toMatch(/mismatch/)
  })
})
