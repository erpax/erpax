/**
 * Self-governance tests — Conservation Law 63.
 *
 * Slice WWWWWWWWW-cut1 (2026-05-11). Pins:
 *
 *   1. establishGovernance produces a structured rootUuid with the
 *      requested slot + capabilities + version.
 *   2. The genesis chain leaf is at depth 0; head === genesis initially.
 *   3. attestWithinGovernance extends the chain by 1 depth; new head
 *      references the prior head.
 *   4. verifyGovernance returns ok:true for an intact scope chain
 *      AND surfaces the scope's declared capability list.
 *   5. governanceHasCapability detects each declared flag.
 *   6. A scope with mutated rootUuid fails verifyGovernance.
 *
 * @audit Conservation Law 63 uuid-self-governance
 */
import { describe, it, expect } from 'vitest'
import {
  establishGovernance,
  attestWithinGovernance,
  verifyGovernance,
  governanceHasCapability,
} from './index'
import { decodeStructured, SLOT_TAGS, CAPABILITIES } from '@/services/uuid-format'
import type { ChainLink, LinkStore } from '@/services/uuid-chain'

interface TestEntity { kind: string; name: string }

function makeStore<P>(): LinkStore<P> & { put(link: ChainLink<P>): void } {
  const m = new Map<string, ChainLink<P>>()
  return {
    async getLink(uuid) { return m.get(uuid as unknown as string) ?? null },
    put(link) { m.set(link.leafUuid as unknown as string, link) },
  }
}

const TENANT = 'tenant-1'

describe('establishGovernance', () => {
  it('produces a structured rootUuid with the declared slot + capabilities + version', () => {
    const scope = establishGovernance<TestEntity>({
      entity: { kind: 'tenant', name: 'acme' },
      tenantId: TENANT,
      slotTag: SLOT_TAGS.tenant,
      capabilities: ['SIGNED', 'CHAINED', 'SHARED'],
      schemaVersion: 2,
      establishedAt: '2026-05-11T08:00:00.000Z',
    })
    expect(scope.slotName).toBe('tenant')
    expect(scope.capabilities).toBe(
      CAPABILITIES.SIGNED | CAPABILITIES.CHAINED | CAPABILITIES.SHARED,
    )
    expect(scope.schemaVersion).toBe(2)
    expect(scope.chainDepth).toBe(0)
    expect(scope.genesisLeafUuid).toBe(scope.headLeafUuid)
    // The rootUuid decodes back to the declared capabilities.
    const decoded = decodeStructured(scope.rootUuid)
    expect(decoded.slotName).toBe('tenant')
    expect([...decoded.capabilityNames].sort()).toEqual(['CHAINED', 'SHARED', 'SIGNED'])
    expect(decoded.schemaVersion).toBe(2)
  })

  it('two scopes with identical inputs produce byte-equal rootUuids (federation determinism)', () => {
    const args = {
      entity: { kind: 'agent', name: 'consistency-agent' } as TestEntity,
      tenantId: TENANT,
      slotTag: SLOT_TAGS.role,   // agents map under role slot
      capabilities: ['CHAINED', 'SIGNED'] as Array<keyof typeof CAPABILITIES>,
      schemaVersion: 1,
      establishedAt: '2026-05-11T08:00:00.000Z',
    }
    const a = establishGovernance<TestEntity>(args)
    const b = establishGovernance<TestEntity>(args)
    expect(a.rootUuid).toBe(b.rootUuid)
    expect(a.genesisLeafUuid).toBe(b.genesisLeafUuid)
  })
})

describe('attestWithinGovernance — extends the chain by 1 depth', () => {
  it('newHead references the prior head and advances depth', () => {
    const scope = establishGovernance<TestEntity>({
      entity: { kind: 'tenant', name: 'acme' },
      tenantId: TENANT,
      slotTag: SLOT_TAGS.tenant,
      capabilities: ['CHAINED'],
      schemaVersion: 1,
      establishedAt: '2026-05-11T08:00:00.000Z',
    })
    const r = attestWithinGovernance({
      scope,
      attestation: { decision: 'approve-budget-2026', value: 100000 },
      occurredAt: '2026-05-11T08:01:00.000Z',
    })
    expect(r.chainLink.prevUuid).toBe(scope.headLeafUuid)
    expect(r.chainLink.depth).toBe(1)
    expect(r.updatedScope.headLeafUuid).toBe(r.chainLink.leafUuid)
    expect(r.updatedScope.chainDepth).toBe(1)
    // Genesis leaf unchanged.
    expect(r.updatedScope.genesisLeafUuid).toBe(scope.genesisLeafUuid)
  })

  it('two attestations advance to depth 2 with prev linkage', () => {
    let scope = establishGovernance<TestEntity>({
      entity: { kind: 'tenant', name: 'acme' },
      tenantId: TENANT,
      slotTag: SLOT_TAGS.tenant,
      capabilities: ['CHAINED'],
      schemaVersion: 1,
      establishedAt: '2026-05-11T08:00:00.000Z',
    })
    const r1 = attestWithinGovernance({
      scope, attestation: { x: 1 }, occurredAt: '2026-05-11T08:01:00.000Z',
    })
    scope = r1.updatedScope
    const r2 = attestWithinGovernance({
      scope, attestation: { x: 2 }, occurredAt: '2026-05-11T08:02:00.000Z',
    })
    expect(r2.chainLink.depth).toBe(2)
    expect(r2.chainLink.prevUuid).toBe(r1.chainLink.leafUuid)
    expect(r2.updatedScope.chainDepth).toBe(2)
  })
})

describe('verifyGovernance — chain walk + capability read-back', () => {
  it('returns ok:true for an intact 3-leaf scope', async () => {
    const store = makeStore<TestEntity>()
    let scope = establishGovernance<TestEntity>({
      entity: { kind: 'tenant', name: 'acme' },
      tenantId: TENANT,
      slotTag: SLOT_TAGS.tenant,
      capabilities: ['SIGNED', 'CHAINED', 'SHARED'],
      schemaVersion: 1,
      establishedAt: '2026-05-11T08:00:00.000Z',
    })
    // Genesis leaf needs to be persisted by the test.
    // We synthesise it from the scope's metadata.
    const genesis = await import('@/services/uuid-chain').then(async (m) => m.forgeGenesisLink<TestEntity>({
      payloadUuid: (await import('@/services/integrity/content-uuid').then((c) => c.computeContentUuid(
        { entity: { kind: 'tenant', name: 'acme' }, capabilities: scope.capabilities, schemaVersion: 1, establishedAt: '2026-05-11T08:00:00.000Z' },
        TENANT,
      ))) as never,
      tenantId: TENANT,
      occurredAt: '2026-05-11T08:00:00.000Z',
    }))
    store.put(genesis)
    // Two attestations.
    for (let i = 1; i <= 2; i++) {
      const r = attestWithinGovernance({
        scope,
        attestation: { step: i },
        occurredAt: `2026-05-11T08:0${i}:00.000Z`,
      })
      store.put(r.chainLink)
      scope = r.updatedScope
    }
    const v = await verifyGovernance({ scope, store })
    expect(v.ok).toBe(true)
    expect(v.verifiedLeaves).toBe(3)
    expect(v.headDepth).toBe(2)
    expect([...v.capabilities].sort()).toEqual(['CHAINED', 'SHARED', 'SIGNED'])
  })

  it('returns ok:false when the rootUuid is not structured (Law 61 violation)', async () => {
    const store = makeStore<TestEntity>()
    // Synthesise a scope with a NON-structured rootUuid (legacy/non-structured).
    const scope = {
      rootUuid: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' as never,
      tenantId: TENANT,
      slotName: 'tenant' as const,
      capabilities: CAPABILITIES.CHAINED,
      schemaVersion: 1,
      establishedAt: '2026-05-11T08:00:00.000Z',
      genesisLeafUuid: '00000000-0000-5000-8000-genesisgenes' as never,
      headLeafUuid: '00000000-0000-5000-8000-genesisgenes' as never,
      chainDepth: 0,
    }
    const v = await verifyGovernance({ scope, store })
    expect(v.ok).toBe(false)
    expect(v.firstFailureReason).toMatch(/not a structured uuidv8/)
  })
})

describe('governanceHasCapability', () => {
  it('detects every declared capability', () => {
    const scope = establishGovernance<TestEntity>({
      entity: { kind: 'tenant', name: 'acme' },
      tenantId: TENANT,
      slotTag: SLOT_TAGS.tenant,
      capabilities: ['SIGNED', 'CHAINED', 'SHARED'],
      schemaVersion: 1,
    })
    expect(governanceHasCapability(scope, 'SIGNED')).toBe(true)
    expect(governanceHasCapability(scope, 'CHAINED')).toBe(true)
    expect(governanceHasCapability(scope, 'SHARED')).toBe(true)
    expect(governanceHasCapability(scope, 'SEALED')).toBe(false)
    expect(governanceHasCapability(scope, 'ENCRYPTED')).toBe(false)
  })
})
