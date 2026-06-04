/**
 * Anchoring — the honest-stub contract. The bundled notary stub is a LOCAL dev
 * double, never tamper-evidence: `verifyAnchor` must never pass it, the guard
 * must refuse it in a tamper-evident context, and anchor leaves must commit the
 * FULL 256-bit content digest. @see ./index.ts, src/tamper/cost
 */
import { describe, it, expect } from 'vitest'
import {
  NOTARY_STUB_BACKEND, anchorRoot, listAnchors, verifyAnchor, isExternalAnchor, anchorLeaf,
  type ChainBackend, type AnchorReceipt,
} from '@/anchoring'
import { computeContentDigest, computeContentUuid } from '@/integrity/content-uuid'

describe('anchoring: the stub is honest — never false assurance', () => {
  it('the notary stub is NOT an external anchor', () => {
    expect(isExternalAnchor(NOTARY_STUB_BACKEND)).toBe(false)
  })

  it('verifyAnchor never passes a stub receipt — self-consistent ≠ tamper-evidence', async () => {
    const receipt = await anchorRoot({ tenantId: 't1', merkleRoot: 'root-aaa', backend: NOTARY_STUB_BACKEND })
    const v = await verifyAnchor(receipt, NOTARY_STUB_BACKEND)
    expect(v.external).toBe(false)
    expect(v.ok).toBe(false)
    expect(v.reason).toMatch(/not an external anchor/)
  })

  it("the stub's own verify catches a tampered tx-id (not unconditional true)", async () => {
    const receipt = await anchorRoot({ tenantId: 't1', merkleRoot: 'root-bbb', backend: NOTARY_STUB_BACKEND })
    const tampered: AnchorReceipt = { ...receipt, transactionId: 'notary:forged' }
    expect((await NOTARY_STUB_BACKEND.verify(tampered)).ok).toBe(false)
    expect((await NOTARY_STUB_BACKEND.verify(receipt)).ok).toBe(true)
  })

  it("the stub's own verify rejects a root it never anchored", async () => {
    const phantom: AnchorReceipt = {
      chainKind: 'notary-signature', merkleRoot: 'root-never', transactionId: 'notary:whatever',
      anchoredAt: '2026-01-01T00:00:00.000Z',
    }
    expect((await NOTARY_STUB_BACKEND.verify(phantom)).ok).toBe(false)
  })
})

describe('anchoring: the guard refuses a non-external backend in a tamper-evident context', () => {
  it('anchorRoot({ requireExternal: true }) throws on the stub', async () => {
    await expect(
      anchorRoot({ tenantId: 't1', merkleRoot: 'root-ccc', backend: NOTARY_STUB_BACKEND, requireExternal: true }),
    ).rejects.toThrow(/non-external/)
  })

  it('without requireExternal the stub still records the receipt (dev convenience)', async () => {
    await anchorRoot({ tenantId: 't-rec', merkleRoot: 'root-ddd', backend: NOTARY_STUB_BACKEND })
    expect(listAnchors('t-rec').some((r) => r.merkleRoot === 'root-ddd')).toBe(true)
  })
})

describe('anchoring: a REAL external backend passes verifyAnchor', () => {
  const EXTERNAL_FAKE: ChainBackend = {
    kind: 'bitcoin-opreturn',
    external: true,
    async anchor(merkleRoot) {
      return { chainKind: 'bitcoin-opreturn', transactionId: `btc-${merkleRoot}`, merkleRoot, anchoredAt: '2026-01-01T00:00:00.000Z' }
    },
    async verify(receipt) {
      return receipt.transactionId === `btc-${receipt.merkleRoot}` ? { ok: true } : { ok: false, reason: 'mismatch' }
    },
  }

  it('verifyAnchor returns ok:true + external:true for a valid external receipt', async () => {
    const receipt = await anchorRoot({ tenantId: 't1', merkleRoot: 'root-eee', backend: EXTERNAL_FAKE, requireExternal: true })
    expect(await verifyAnchor(receipt, EXTERNAL_FAKE)).toEqual({ ok: true, external: true })
  })

  it('verifyAnchor flags a kind mismatch', async () => {
    const wrong: AnchorReceipt = { chainKind: 'ethereum-l2', transactionId: 'x', merkleRoot: 'y', anchoredAt: 'z' }
    const v = await verifyAnchor(wrong, EXTERNAL_FAKE)
    expect(v.ok).toBe(false)
    expect(v.reason).toMatch(/kind mismatch/)
  })
})

describe('anchoring: the leaf commits the FULL 256-bit digest (the collision-gap bridge)', () => {
  it('anchorLeaf is the full content digest, not the truncated uuid', () => {
    const content = { amount: 100, party: 'acme' }
    const leaf = anchorLeaf(content, 't1')
    expect(leaf).toBe(computeContentDigest(content, 't1'))
    expect(leaf).toMatch(/^[0-9a-f]{64}$/) // 256 bits, not the uuid's 128
    expect(leaf).not.toBe(computeContentUuid(content, 't1').replace(/-/g, ''))
  })

  it('is deterministic and content-sensitive', () => {
    expect(anchorLeaf({ a: 1 }, 't1')).toBe(anchorLeaf({ a: 1 }, 't1'))
    expect(anchorLeaf({ a: 1 }, 't1')).not.toBe(anchorLeaf({ a: 2 }, 't1'))
  })
})
