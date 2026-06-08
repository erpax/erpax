/**
 * UUID-based sharing with RBAC — tests.
 *
 * Slice SSSSSSSSS-cut1 (2026-05-11). Pins:
 *
 *   1. AccessRole lattice — admin > sign > write > read, audit
 *      orthogonal.
 *   2. computeShareUuid is stable + per-tenant + role-distinct.
 *   3. grantShare chain-links the audit leaf; signature is requested
 *      iff the role is sign/admin.
 *   4. grantShare is idempotent for the same (grantee, role, target).
 *   5. checkShare returns granted when an existing share's role
 *      satisfies the required role per the lattice.
 *   6. revokeShare flips the row + chain-links the revoke event.
 *   7. listShares requires at least one of grantee / target.
 *
 * @audit Conservation Law 59 uuid-based-sharing-with-rbac
 */
import { describe, it, expect, vi } from 'vitest'
import {
  rolesCompatible,
  computeShareUuid,
  grantShare,
  checkShare,
  revokeShare,
  listShares,
  type AccessRole,
  type GranteeUuid,
  type TargetUuid,
  type ShareUuid,
} from '@/uuid/share'
import type { UuidLinkedLeaf } from '@/integrity'

interface FakeRow extends Record<string, unknown> {
  id: string
  tenant: string
  shareUuid: string
  granteeUuid: string
  targetUuid: string
  accessRole: AccessRole
  grantedAt: string
  chainLeafUuid: string | null
  sealed: boolean
  revoked: boolean
}

interface FakeStore {
  shares: FakeRow[]
  audits: Array<{ event: string; signatureRequired: boolean; chainLinkStatus: string }>
}

function makeFakePayload(store: FakeStore) {
  return {
    find: vi.fn(async (args: { collection: string; where?: Record<string, unknown> }) => {
      if (args.collection !== 'shares') return { docs: [] }
      const w = args.where ?? {}
      // Parse the AND clauses we know the service emits.
      const ands = (w.and as Array<Record<string, unknown>>) ?? []
      return {
        docs: store.shares.filter((r) => ands.every((clause) => {
          for (const [field, predRaw] of Object.entries(clause)) {
            const pred = predRaw as Record<string, unknown>
            const value = r[field]
            if ('equals' in pred && value !== pred.equals) return false
            if ('not_equals' in pred && value === pred.not_equals) return false
          }
          return true
        })),
      }
    }),
    create: vi.fn(async (args: { collection: string; data: Record<string, unknown> }) => {
      if (args.collection === 'shares') {
        const row = { id: `share-${store.shares.length + 1}`, ...args.data, revoked: args.data.revoked ?? false } as FakeRow
        store.shares.push(row)
        return { id: row.id }
      }
      if (args.collection === 'audit-events') {
        store.audits.push({
          event: String(args.data.eventName),
          signatureRequired: (args.data.signatureRequired as boolean) ?? false,
          chainLinkStatus: (args.data.chainLinkStatus as string) ?? 'unbound',
        })
        return { id: `ae-${store.audits.length}` }
      }
      return { id: 'unknown' }
    }),
    update: vi.fn(async (args: { collection: string; id: string; data: Record<string, unknown> }) => {
      if (args.collection !== 'shares') return null
      const r = store.shares.find((x) => x.id === args.id)
      if (r) Object.assign(r, args.data)
      return r
    }),
  }
}

const FAKE_LEAF: UuidLinkedLeaf = {
  seq: 1,
  leafUuid: '00000000-0000-5000-8000-leafleafleaf',
  prevUuid: '00000000-0000-5000-8000-prevprevprev',
  occurredAt: '2026-05-11T08:00:00.000Z',
  payloadUuid: '00000000-0000-5000-8000-payldpayld',
} as unknown as UuidLinkedLeaf

function makeMediator(opts: { signs?: boolean } = {}) {
  return {
    auditChainAppendLinked: vi.fn(async () => FAKE_LEAF),
    signUuid: opts.signs === false
      ? undefined
      : vi.fn(async (_uuid: string) => ({ uuid: FAKE_LEAF.leafUuid, alg: 'EdDSA', kid: 'k', sig: 'sig', signedAt: 'now' })),
  }
}

const GRANTEE = '00000000-0000-5000-8000-grantee01' as GranteeUuid<{ user: string }>
const TARGET = '00000000-0000-5000-8000-target001' as TargetUuid<{ row: string }>

describe('rolesCompatible — RBAC lattice', () => {
  it('admin satisfies every non-audit role', () => {
    expect(rolesCompatible('admin', 'read')).toBe(true)
    expect(rolesCompatible('admin', 'write')).toBe(true)
    expect(rolesCompatible('admin', 'sign')).toBe(true)
    expect(rolesCompatible('admin', 'admin')).toBe(true)
  })
  it('admin DOES NOT satisfy audit (orthogonal)', () => {
    expect(rolesCompatible('admin', 'audit')).toBe(false)
  })
  it('sign satisfies write + read but not admin or audit', () => {
    expect(rolesCompatible('sign', 'read')).toBe(true)
    expect(rolesCompatible('sign', 'write')).toBe(true)
    expect(rolesCompatible('sign', 'sign')).toBe(true)
    expect(rolesCompatible('sign', 'admin')).toBe(false)
    expect(rolesCompatible('sign', 'audit')).toBe(false)
  })
  it('write satisfies read', () => {
    expect(rolesCompatible('write', 'read')).toBe(true)
    expect(rolesCompatible('write', 'write')).toBe(true)
    expect(rolesCompatible('write', 'sign')).toBe(false)
  })
  it('audit only satisfies audit', () => {
    expect(rolesCompatible('audit', 'audit')).toBe(true)
    expect(rolesCompatible('audit', 'read')).toBe(false)
    expect(rolesCompatible('audit', 'write')).toBe(false)
    expect(rolesCompatible('audit', 'sign')).toBe(false)
    expect(rolesCompatible('audit', 'admin')).toBe(false)
  })
})

// Slice YYYYYYYYY-cut1 (2026-05-11) — structured shareUuid (Law 61).
describe('computeShareUuid emits structured uuidv8 with slot=share + capabilities derived from accessRole', () => {
  it('write share decodes as slot=share + SHARED only', async () => {
    const { decodeStructured } = await import('@/uuid/format')
    const u = computeShareUuid({ granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'write', tenantId: 't' })
    const parts = decodeStructured(u)
    expect(parts.slotName).toBe('share')
    expect(parts.capabilityNames).toContain('SHARED')
    expect(parts.capabilityNames).not.toContain('SIGNED')
    expect(parts.capabilityNames).not.toContain('SEALED')
  })

  it('admin share decodes as slot=share + SHARED + SIGNED + SEALED', async () => {
    const { decodeStructured } = await import('@/uuid/format')
    const u = computeShareUuid({ granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'admin', tenantId: 't' })
    const parts = decodeStructured(u)
    expect(parts.slotName).toBe('share')
    expect([...parts.capabilityNames].sort()).toEqual(['SEALED', 'SHARED', 'SIGNED'])
  })

  it('sign share matches admin capability set', async () => {
    const { decodeStructured } = await import('@/uuid/format')
    const u = computeShareUuid({ granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'sign', tenantId: 't' })
    const parts = decodeStructured(u)
    expect([...parts.capabilityNames].sort()).toEqual(['SEALED', 'SHARED', 'SIGNED'])
  })

  it('audit share decodes as slot=share + SHARED only (audit is observation-only)', async () => {
    const { decodeStructured } = await import('@/uuid/format')
    const u = computeShareUuid({ granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'audit', tenantId: 't' })
    const parts = decodeStructured(u)
    expect(parts.capabilityNames).toEqual(['SHARED'])
  })

  it('shareUuid is uuidv8 (version nibble = 8)', () => {
    const u = computeShareUuid({ granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'read', tenantId: 't' })
    expect(u).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-/)
  })
})

describe('computeShareUuid — stable + per-tenant + role-distinct', () => {
  it('is stable for the same inputs', () => {
    const a = computeShareUuid({ granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'read', tenantId: 't-1' })
    const b = computeShareUuid({ granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'read', tenantId: 't-1' })
    expect(a).toBe(b)
  })
  it('differs across tenants', () => {
    const a = computeShareUuid({ granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'read', tenantId: 't-1' })
    const b = computeShareUuid({ granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'read', tenantId: 't-2' })
    expect(a).not.toBe(b)
  })
  it('differs across roles (same grantee + target)', () => {
    const r = computeShareUuid({ granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'read', tenantId: 't' })
    const w = computeShareUuid({ granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'write', tenantId: 't' })
    expect(r).not.toBe(w)
  })
})

describe('grantShare — chain-linked + signature-required for sign/admin', () => {
  it('write grant chain-links the leaf but does NOT request signature', async () => {
    const store: FakeStore = { shares: [], audits: [] }
    const payload = makeFakePayload(store)
    const mediator = makeMediator()
    const out = await grantShare(
      { tenantId: 't', granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'write' },
      { payload: payload as never, mediator },
    )
    expect(out.binding.accessRole).toBe('write')
    expect(out.binding.sealed).toBe(false)
    expect(store.audits[0]!.event).toBe('share:granted')
    expect(store.audits[0]!.signatureRequired).toBe(false)
    expect(mediator.signUuid).not.toHaveBeenCalled()
  })

  it('admin grant requests signature → leaf sealed', async () => {
    const store: FakeStore = { shares: [], audits: [] }
    const payload = makeFakePayload(store)
    const mediator = makeMediator()
    const out = await grantShare(
      { tenantId: 't', granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'admin' },
      { payload: payload as never, mediator },
    )
    expect(out.binding.sealed).toBe(true)
    expect(store.audits[0]!.signatureRequired).toBe(true)
    expect(mediator.signUuid).toHaveBeenCalled()
  })

  it('sign grant requests signature → leaf sealed', async () => {
    const store: FakeStore = { shares: [], audits: [] }
    const mediator = makeMediator()
    const out = await grantShare(
      { tenantId: 't', granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'sign' },
      { payload: makeFakePayload(store) as never, mediator },
    )
    expect(out.binding.sealed).toBe(true)
    expect(store.audits[0]!.signatureRequired).toBe(true)
  })

  it('is idempotent — second call with same (grantee, role, target) returns the existing binding without a new leaf', async () => {
    const store: FakeStore = { shares: [], audits: [] }
    const payload = makeFakePayload(store)
    const mediator = makeMediator()
    const first = await grantShare(
      { tenantId: 't', granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'read' },
      { payload: payload as never, mediator },
    )
    const second = await grantShare(
      { tenantId: 't', granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'read' },
      { payload: payload as never, mediator },
    )
    expect(first.binding.shareUuid).toBe(second.binding.shareUuid)
    expect(store.shares).toHaveLength(1)             // not duplicated
    expect(store.audits).toHaveLength(1)             // no new audit leaf
  })
})

describe('checkShare — lattice-aware enforcement', () => {
  it('returns granted when the held role satisfies the required role', async () => {
    const store: FakeStore = { shares: [], audits: [] }
    const payload = makeFakePayload(store)
    const mediator = makeMediator()
    await grantShare(
      { tenantId: 't', granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'write' },
      { payload: payload as never, mediator },
    )
    const result = await checkShare(
      { tenantId: 't', granteeUuid: GRANTEE, targetUuid: TARGET, requiredRole: 'read' },
      { payload: payload as never },
    )
    expect(result.granted).toBe(true)
    expect(result.heldRole).toBe('write')
  })

  it('returns denied when no share exists', async () => {
    const store: FakeStore = { shares: [], audits: [] }
    const result = await checkShare(
      { tenantId: 't', granteeUuid: GRANTEE, targetUuid: TARGET, requiredRole: 'read' },
      { payload: makeFakePayload(store) as never },
    )
    expect(result.granted).toBe(false)
    expect(result.reason).toMatch(/no share binding/)
  })

  it('returns denied when the held role does not satisfy the required role', async () => {
    const store: FakeStore = { shares: [], audits: [] }
    const payload = makeFakePayload(store)
    const mediator = makeMediator()
    await grantShare(
      { tenantId: 't', granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'read' },
      { payload: payload as never, mediator },
    )
    const result = await checkShare(
      { tenantId: 't', granteeUuid: GRANTEE, targetUuid: TARGET, requiredRole: 'admin' },
      { payload: payload as never },
    )
    expect(result.granted).toBe(false)
    expect(result.reason).toMatch(/required role is admin/)
  })
})

describe('revokeShare — chain-linked revoke event + flag', () => {
  it('flips revoked: true and adds a chain-linked event', async () => {
    const store: FakeStore = { shares: [], audits: [] }
    const payload = makeFakePayload(store)
    const mediator = makeMediator()
    const granted = await grantShare(
      { tenantId: 't', granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'write' },
      { payload: payload as never, mediator },
    )
    const revoke = await revokeShare(
      { tenantId: 't', shareUuid: granted.binding.shareUuid },
      { payload: payload as never, mediator },
    )
    expect(revoke.revoked).toBe(true)
    expect(store.shares[0]!.revoked).toBe(true)
    expect(store.audits.map((a) => a.event)).toEqual(['share:granted', 'share:revoked'])
    // Revoking a non-sealed grant doesn't request signature.
    expect(store.audits[1]!.signatureRequired).toBe(false)
  })

  it('revoking a sealed share writes a sealed revoke event', async () => {
    const store: FakeStore = { shares: [], audits: [] }
    const payload = makeFakePayload(store)
    const mediator = makeMediator()
    const granted = await grantShare(
      { tenantId: 't', granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'admin' },
      { payload: payload as never, mediator },
    )
    expect(granted.binding.sealed).toBe(true)
    await revokeShare(
      { tenantId: 't', shareUuid: granted.binding.shareUuid },
      { payload: payload as never, mediator },
    )
    expect(store.audits[1]!.signatureRequired).toBe(true)   // sealed revoke symmetry
  })

  it('is idempotent — revoking a non-existent share returns revoked:false without throwing', async () => {
    const store: FakeStore = { shares: [], audits: [] }
    const result = await revokeShare(
      { tenantId: 't', shareUuid: '00000000-0000-5000-8000-doesnotexist' as ShareUuid },
      { payload: makeFakePayload(store) as never, mediator: makeMediator() },
    )
    expect(result.revoked).toBe(false)
    expect(result.reason).toMatch(/no active share/)
  })
})

describe('listShares — bounded query', () => {
  it('throws when neither grantee nor target is supplied (unbounded scan refused)', async () => {
    const store: FakeStore = { shares: [], audits: [] }
    await expect(
      listShares({ tenantId: 't' }, { payload: makeFakePayload(store) as never }),
    ).rejects.toThrow(/at least one of/)
  })

  it('filters by grantee', async () => {
    const store: FakeStore = { shares: [], audits: [] }
    const payload = makeFakePayload(store)
    await grantShare(
      { tenantId: 't', granteeUuid: GRANTEE, targetUuid: TARGET, accessRole: 'read' },
      { payload: payload as never, mediator: makeMediator() },
    )
    const list = await listShares(
      { tenantId: 't', granteeUuid: GRANTEE },
      { payload: payload as never },
    )
    expect(list).toHaveLength(1)
    expect(list[0]!.accessRole).toBe('read')
  })
})
