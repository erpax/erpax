import { describe, it, expect } from 'vitest'
import {
  anchorLeaf,
  anchorRoot,
  verifyAnchor,
  listAnchors,
  isExternalAnchor,
  NOTARY_STUB_BACKEND,
  type ChainBackend,
  type AnchorReceipt,
} from '@/anchoring'
import { computeContentDigest } from '@/integrity'

// anchoring (./index.ts): the anchor is the one borrowed external entropy. A
// backend that does NOT pin to entropy no party controls is not tamper-evidence,
// so verifyAnchor passes ONLY an external anchor — never the stub — and the leaf
// commits the full 256-bit content digest, never the truncated uuid.
describe('anchoring — only an external anchor is tamper-evidence', () => {
  it('anchorLeaf commits the FULL content digest (not the truncated uuid)', () => {
    const content = { invoiceId: 'INV-1', total: 100 }
    const tenantId = 'tenant-a'
    expect(anchorLeaf(content, tenantId)).toBe(computeContentDigest(content, tenantId))
  })

  it('NOTARY_STUB_BACKEND is NOT an external anchor', () => {
    expect(NOTARY_STUB_BACKEND.external).toBe(false)
    expect(isExternalAnchor(NOTARY_STUB_BACKEND)).toBe(false)
  })

  it('verifyAnchor refuses the stub even when its receipt is self-consistent', async () => {
    const tenantId = 'tenant-verify'
    const receipt = await anchorRoot({ tenantId, merkleRoot: 'root-xyz', backend: NOTARY_STUB_BACKEND })
    // The stub honestly verifies its own self-consistency...
    const inner = await NOTARY_STUB_BACKEND.verify(receipt)
    expect(inner.ok).toBe(true)
    // ...but verifyAnchor still returns ok:false because a stub is not tamper-evidence.
    const verdict = await verifyAnchor(receipt, NOTARY_STUB_BACKEND)
    expect(verdict.ok).toBe(false)
    expect(verdict.external).toBe(false)
    expect(verdict.reason).toBeDefined()
  })

  it('the stub detects a tampered receipt (tx-id no longer matches its root)', async () => {
    const tenantId = 'tenant-tamper'
    const receipt = await anchorRoot({ tenantId, merkleRoot: 'root-real', backend: NOTARY_STUB_BACKEND })
    const tampered: AnchorReceipt = { ...receipt, merkleRoot: 'root-forged' }
    const inner = await NOTARY_STUB_BACKEND.verify(tampered)
    expect(inner.ok).toBe(false)
  })

  it('anchorRoot({ requireExternal: true }) refuses a non-external backend', async () => {
    await expect(
      anchorRoot({ tenantId: 't', merkleRoot: 'r', backend: NOTARY_STUB_BACKEND, requireExternal: true }),
    ).rejects.toThrow(/non-external/)
  })

  it('anchorRoot records receipts per tenant', async () => {
    const tenantId = 'tenant-list'
    expect(listAnchors(tenantId)).toHaveLength(0)
    await anchorRoot({ tenantId, merkleRoot: 'r1', backend: NOTARY_STUB_BACKEND })
    await anchorRoot({ tenantId, merkleRoot: 'r2', backend: NOTARY_STUB_BACKEND })
    expect(listAnchors(tenantId)).toHaveLength(2)
  })

  it('a REAL external anchor whose receipt verifies returns ok:true', async () => {
    const externalBackend: ChainBackend = {
      kind: 'notary-signature',
      external: true,
      async anchor(merkleRoot) {
        return {
          chainKind: 'notary-signature',
          transactionId: `ext:${merkleRoot}`,
          merkleRoot,
          anchoredAt: new Date().toISOString(),
        }
      },
      async verify(receipt) {
        return { ok: receipt.transactionId === `ext:${receipt.merkleRoot}` }
      },
    }
    const receipt = await anchorRoot({ tenantId: 't-ext', merkleRoot: 'root-ext', backend: externalBackend, requireExternal: true })
    const verdict = await verifyAnchor(receipt, externalBackend)
    expect(verdict.ok).toBe(true)
    expect(verdict.external).toBe(true)
  })

  it('verifyAnchor fails on a backend-kind mismatch', async () => {
    const receipt: AnchorReceipt = {
      chainKind: 'bitcoin-opreturn',
      transactionId: 'tx',
      merkleRoot: 'r',
      anchoredAt: new Date().toISOString(),
    }
    const verdict = await verifyAnchor(receipt, NOTARY_STUB_BACKEND)
    expect(verdict.ok).toBe(false)
    expect(verdict.reason).toMatch(/mismatch/)
  })
})
