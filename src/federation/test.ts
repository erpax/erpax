import { describe, it, expect } from 'vitest'
import { exportRow, importRow } from '@/federation'
import type { FederatedRow, TrustEntry } from '@/federation'
import { computeContentUuid } from '@/integrity'

// Federation (Slice AAAAAA): a content-addressed row crosses the tenant boundary
// inside a verifiable envelope; the receiver re-verifies Law 8 independently and
// only ingests when the trust graph permits. Proven on the REAL exchange code.

const SOURCE = 'urn:erpax:tenant:acme-bank'
const LOCAL = 'urn:erpax:tenant:beta-corp'

function fullTrust(overrides: Partial<TrustEntry> = {}): TrustEntry {
  return {
    peerTenant: SOURCE,
    trustLevel: 'verified-content-only',
    acceptedCollections: ['invoices'],
    ...overrides,
  }
}

describe('federation — verifiable inter-tenant exchange', () => {
  it('exportRow wraps the row in a 1.0 envelope with a recomputable content-uuid', () => {
    const row = { invoiceNo: 'INV-1', total: 42 }
    const env = exportRow({ sourceTenant: SOURCE, sourceCollection: 'invoices', row })
    expect(env.envelopeVersion).toBe('1.0')
    expect(env.sourceTenant).toBe(SOURCE)
    expect(env.sourceCollection).toBe('invoices')
    // Law 8: the declared uuid IS computeContentUuid under the source namespace.
    expect(env.uuid).toBe(computeContentUuid(row, SOURCE))
    // Non-content fields are stripped from the body.
    expect(env.content).toMatchObject(row)
  })

  it('importRow ingests a trusted, accepted, integrity-verified row exactly once', async () => {
    const env = exportRow({ sourceTenant: SOURCE, sourceCollection: 'invoices', row: { invoiceNo: 'INV-9', total: 7 } })
    const ingested: Record<string, unknown>[] = []
    const res = await importRow({
      envelope: env,
      trust: [fullTrust()],
      localTenant: LOCAL,
      isAlreadyImported: async () => false,
      ingest: async (c) => { ingested.push(c); return { id: 'local-1' } },
    })
    expect(res.ok).toBe(true)
    expect(res.localId).toBe('local-1')
    // Provenance is stamped onto the ingested content.
    expect(ingested).toHaveLength(1)
    expect(ingested[0]!.federationProvenance).toMatchObject({
      sourceTenant: SOURCE,
      sourceCollection: 'invoices',
      sourceUuid: env.uuid,
      trustLevel: 'verified-content-only',
    })
  })

  it('rejects an unsupported envelope version', async () => {
    const env = exportRow({ sourceTenant: SOURCE, sourceCollection: 'invoices', row: { a: 1 } })
    const bad: FederatedRow = { ...env, envelopeVersion: '2.0' as FederatedRow['envelopeVersion'] }
    const res = await importRow({
      envelope: bad,
      trust: [fullTrust()],
      localTenant: LOCAL,
      isAlreadyImported: async () => false,
      ingest: async () => { throw new Error('must not ingest') },
    })
    expect(res.ok).toBe(false)
    expect(res.failedAt).toBe('envelope-shape')
  })

  it('rejects an untrusted source', async () => {
    const env = exportRow({ sourceTenant: SOURCE, sourceCollection: 'invoices', row: { a: 1 } })
    const res = await importRow({
      envelope: env,
      trust: [fullTrust({ trustLevel: 'untrusted' })],
      localTenant: LOCAL,
      isAlreadyImported: async () => false,
      ingest: async () => { throw new Error('must not ingest') },
    })
    expect(res.ok).toBe(false)
    expect(res.failedAt).toBe('untrusted-source')
  })

  it('rejects a collection not in the accepted list', async () => {
    const env = exportRow({ sourceTenant: SOURCE, sourceCollection: 'payroll', row: { a: 1 } })
    const res = await importRow({
      envelope: env,
      trust: [fullTrust({ acceptedCollections: ['invoices'] })],
      localTenant: LOCAL,
      isAlreadyImported: async () => false,
      ingest: async () => { throw new Error('must not ingest') },
    })
    expect(res.ok).toBe(false)
    expect(res.failedAt).toBe('collection-not-accepted')
  })

  it('rejects a tampered body whose content-uuid no longer recomputes', async () => {
    const env = exportRow({ sourceTenant: SOURCE, sourceCollection: 'invoices', row: { total: 100 } })
    const tampered: FederatedRow = { ...env, content: { total: 999 } }
    const res = await importRow({
      envelope: tampered,
      trust: [fullTrust()],
      localTenant: LOCAL,
      isAlreadyImported: async () => false,
      ingest: async () => { throw new Error('must not ingest') },
    })
    expect(res.ok).toBe(false)
    expect(res.failedAt).toBe('content-uuid-mismatch')
  })

  it('is idempotent — an already-imported uuid is not ingested twice', async () => {
    const env = exportRow({ sourceTenant: SOURCE, sourceCollection: 'invoices', row: { a: 1 } })
    const res = await importRow({
      envelope: env,
      trust: [fullTrust()],
      localTenant: LOCAL,
      isAlreadyImported: async () => true,
      ingest: async () => { throw new Error('must not ingest') },
    })
    expect(res.ok).toBe(false)
    expect(res.failedAt).toBe('duplicate-already-imported')
  })

  it('a signed trust level requires a verifying signature', async () => {
    const env = exportRow({ sourceTenant: SOURCE, sourceCollection: 'invoices', row: { a: 1 } })
    const res = await importRow({
      envelope: env,
      trust: [fullTrust({ trustLevel: 'verified-classical-signed' })],
      localTenant: LOCAL,
      isAlreadyImported: async () => false,
      ingest: async () => { throw new Error('must not ingest') },
    })
    expect(res.ok).toBe(false)
    expect(res.failedAt).toBe('signature-invalid')
  })

  it('a signed trust level with a valid signature ingests', async () => {
    const env = exportRow({
      sourceTenant: SOURCE,
      sourceCollection: 'invoices',
      row: { a: 1 },
      signature: { algorithm: 'ed25519', publicKey: 'pk', signatureB64: 'sig' },
    })
    const res = await importRow({
      envelope: env,
      trust: [fullTrust({ trustLevel: 'verified-classical-signed' })],
      localTenant: LOCAL,
      isAlreadyImported: async () => false,
      ingest: async () => ({ id: 'signed-1' }),
      verifySignature: async () => true,
    })
    expect(res.ok).toBe(true)
    expect(res.localId).toBe('signed-1')
  })
})
