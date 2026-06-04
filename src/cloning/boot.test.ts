/**
 * Tests for boot.ts — ingest a published genome into a clone.
 * Slice HHHHHH (TDD).
 *
 * boot mutates global registries; tests use a sandbox boot mode that
 * returns the parsed registrations instead of mutating, so the test
 * suite is deterministic.
 */
import { describe, it, expect } from 'vitest'
import { publishSelf } from '@/cloning/publish'
import { bootFromFederation, type BootOutcome } from '@/cloning/boot'

/** Narrow the discriminated boot outcome to its failure branch for assertions. */
const asBootFailure = (r: BootOutcome): Extract<BootOutcome, { ok: false }> =>
  r as Extract<BootOutcome, { ok: false }>

describe('bootFromFederation (sandbox mode)', () => {
  it('parses a published genome and reports what would be registered', async () => {
    const pub = publishSelf({ tenantId: 'erpax-self', sourceDid: 'did:erpax:s1', scope: 'genome' })
    const result = await bootFromFederation({
      publication: pub,
      cloneTenantId: 'erpax-self',
      cloneDid: 'did:erpax:clone-1',
      sandbox: true,
    })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.cloneDid).toBe('did:erpax:clone-1')
      expect(result.registered.collections).toBe(pub.bundle.collections.length)
      expect(result.registered.chains).toBe(pub.bundle.chains.length)
      expect(result.registered.agents).toBe(pub.bundle.agents.length)
      expect(result.registered.roles).toBe(pub.bundle.roles.length)
      expect(result.registered.mcpTools).toBe(pub.bundle.mcpTools.length)
    }
  })

  it('refuses to boot when checkCloneIntegrity (Law 24) fails', async () => {
    const pub = publishSelf({ tenantId: 'erpax-self', sourceDid: 'did:erpax:s1', scope: 'genome' })
    // Tamper the bundle before boot.
    const tampered = {
      ...pub,
      bundle: { ...pub.bundle, agents: [] as typeof pub.bundle.agents },
    }
    const result = await bootFromFederation({
      publication: tampered,
      cloneTenantId: 'erpax-self',
      cloneDid: 'did:erpax:clone-2',
      sandbox: true,
    })
    expect(result.ok).toBe(false)
    const fail = asBootFailure(result)
    expect(fail.failedAt).toBe('integrity-check')
    expect(fail.reason).toContain('agents')
  })

  it('refuses when scope mismatch — clone requests genome+state but pub is genome-only', async () => {
    const pub = publishSelf({ tenantId: 'erpax-self', sourceDid: 'did:erpax:s1', scope: 'genome' })
    const result = await bootFromFederation({
      publication: pub,
      cloneTenantId: 'erpax-self',
      cloneDid: 'did:erpax:clone-3',
      requireScope: 'genome+state',
      sandbox: true,
    })
    expect(result.ok).toBe(false)
    expect(asBootFailure(result).failedAt).toBe('scope-mismatch')
  })

  it('records divergencePoint = sourceMerkleAnchor + bootedAt timestamp', async () => {
    const pub = publishSelf({
      tenantId: 'erpax-self', sourceDid: 'did:erpax:s1', scope: 'genome',
      merkleAnchor: 'merkle-root-abcdef',
    })
    const result = await bootFromFederation({
      publication: pub,
      cloneTenantId: 'erpax-self',
      cloneDid: 'did:erpax:clone-4',
      sandbox: true,
    })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.divergencePoint).toMatchObject({
        sourceMerkleAnchor: 'merkle-root-abcdef',
        bootedAt: expect.any(String),
      })
    }
  })
})
