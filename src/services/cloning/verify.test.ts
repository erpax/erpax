/**
 * Tests for verify.ts — Conservation Law 24 checkCloneIntegrity.
 * Slice HHHHHH (TDD).
 */
import { describe, it, expect } from 'vitest'
import { publishSelf } from './publish'
import { collectGenome, computeGenomeUuid } from './genome'
import { checkCloneIntegrity } from './verify'

describe('checkCloneIntegrity (Conservation Law 24)', () => {
  it('returns ok=true when the published bundleUuid matches recompute', () => {
    const pub = publishSelf({ tenantId: 'erpax-self', sourceDid: 'did:erpax:s1', scope: 'genome' })
    const result = checkCloneIntegrity({
      publication: pub,
      cloneBundle: pub.bundle,
      cloneTenantId: 'erpax-self',
    })
    expect(result.ok).toBe(true)
  })

  it('returns ok=false when the clone\'s bundle differs from the published one', () => {
    const pub = publishSelf({ tenantId: 'erpax-self', sourceDid: 'did:erpax:s1', scope: 'genome' })
    // Tamper: drop a chain from the clone's bundle.
    const tampered = { ...pub.bundle, chains: pub.bundle.chains.slice(0, -1) }
    const result = checkCloneIntegrity({
      publication: pub,
      cloneBundle: tampered,
      cloneTenantId: 'erpax-self',
    })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.expected).toBe(pub.bundleUuid)
      expect(result.actual).not.toBe(pub.bundleUuid)
    }
  })

  it('returns ok=false when the clone is computed under a different tenant namespace', () => {
    const pub = publishSelf({ tenantId: 'erpax-self', sourceDid: 'did:erpax:s1', scope: 'genome' })
    const result = checkCloneIntegrity({
      publication: pub,
      cloneBundle: pub.bundle,
      cloneTenantId: 'wrong-tenant',
    })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.reason).toContain('tenant')
  })

  it('reports the divergence point (which section of the bundle differs)', () => {
    const pub = publishSelf({ tenantId: 'erpax-self', sourceDid: 'did:erpax:s1', scope: 'genome' })
    const tampered = { ...pub.bundle, agents: [] }
    const result = checkCloneIntegrity({
      publication: pub,
      cloneBundle: tampered,
      cloneTenantId: 'erpax-self',
    })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.divergentSections).toContain('agents')
  })
})
