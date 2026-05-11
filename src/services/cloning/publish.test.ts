/**
 * Tests for publish.ts — wraps a GenomeBundle in a verifiable
 * federation envelope (slice AAAAAA pattern applied to the platform
 * itself). Slice HHHHHH (TDD).
 */
import { describe, it, expect } from 'vitest'
import { publishSelf } from './publish'

describe('publishSelf', () => {
  it('returns a GenomePublication with bundle + uuid + lineage metadata', () => {
    const pub = publishSelf({
      tenantId: 'erpax-self',
      sourceDid: 'did:erpax:source-instance-1',
      scope: 'genome',
    })
    expect(pub).toMatchObject({
      bundleUuid: expect.stringMatching(/^[0-9a-f-]{36}$/),
      scope: 'genome',
      sourceDid: 'did:erpax:source-instance-1',
      bundle: expect.objectContaining({ genomeVersion: '1.0' }),
      publishedAt: expect.any(String),
    })
  })

  it('bundleUuid is recomputable from the bundle (Law 8 self-verifies)', () => {
    const pub = publishSelf({ tenantId: 'erpax-self', sourceDid: 'did:erpax:s1', scope: 'genome' })
    // Re-running publishSelf with the same args should produce the same bundleUuid
    // (assuming the source tree hasn't changed).
    const pub2 = publishSelf({ tenantId: 'erpax-self', sourceDid: 'did:erpax:s1', scope: 'genome' })
    expect(pub.bundleUuid).toBe(pub2.bundleUuid)
  })

  it('scope=genome+state includes a placeholder for state-snapshot uri (impl in slice TTTTT)', () => {
    const pub = publishSelf({
      tenantId: 'erpax-self', sourceDid: 'did:erpax:s1', scope: 'genome+state',
    })
    expect(pub.scope).toBe('genome+state')
    // State snapshot uri is an open primitive — TTTTT cross-store ships it; for now,
    // confirm the field exists.
    expect(pub).toHaveProperty('stateSnapshotUri')
  })

  it('signature is present when a signer fn is provided', () => {
    const pub = publishSelf({
      tenantId: 'erpax-self', sourceDid: 'did:erpax:s1', scope: 'genome',
      sign: (payload) => ({ algorithm: 'ML-DSA-65', publicKey: 'pk-stub', signatureB64: 'sig-stub' }),
    })
    expect(pub.signature).toMatchObject({
      algorithm: 'ML-DSA-65',
      publicKey: 'pk-stub',
      signatureB64: 'sig-stub',
    })
  })

  it('signature is undefined when no signer fn is provided', () => {
    const pub = publishSelf({ tenantId: 'erpax-self', sourceDid: 'did:erpax:s1', scope: 'genome' })
    expect(pub.signature).toBeUndefined()
  })
})
