/**
 * Tests for verify.ts — Conservation Law 24 checkCloneIntegrity.
 * Slice HHHHHH (TDD).
 */
import { describe, it, expect } from 'vitest'
import { publishSelf } from '@/cloning/publish'
import { checkCloneIntegrity, type CloneIntegrityResult } from '@/cloning/verify'

/** Narrow the discriminated result to its failure branch for assertions. */
const asFailure = (r: CloneIntegrityResult): Extract<CloneIntegrityResult, { ok: false }> =>
  r as Extract<CloneIntegrityResult, { ok: false }>

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
    const fail = asFailure(result)
    expect(fail.expected).toBe(pub.bundleUuid)
    expect(fail.actual).not.toBe(pub.bundleUuid)
  })

  it('returns ok=false when the clone is computed under a different tenant namespace', () => {
    const pub = publishSelf({ tenantId: 'erpax-self', sourceDid: 'did:erpax:s1', scope: 'genome' })
    const result = checkCloneIntegrity({
      publication: pub,
      cloneBundle: pub.bundle,
      cloneTenantId: 'wrong-tenant',
    })
    expect(result.ok).toBe(false)
    expect(asFailure(result).reason).toContain('tenant')
  })

  it('reports the divergence point (which section of the bundle differs)', () => {
    const pub = publishSelf({ tenantId: 'erpax-self', sourceDid: 'did:erpax:s1', scope: 'genome' })
    const tampered = { ...pub.bundle, agents: [] as typeof pub.bundle.agents }
    const result = checkCloneIntegrity({
      publication: pub,
      cloneBundle: tampered,
      cloneTenantId: 'erpax-self',
    })
    expect(result.ok).toBe(false)
    expect(asFailure(result).divergentSections).toContain('agents')
  })
})
