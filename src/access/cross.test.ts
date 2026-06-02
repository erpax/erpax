import type { Access, PayloadRequest } from 'payload'

import { describe, expect, it } from 'vitest'

import type { UserRole } from '@/types/auth'

import {
  actorCapabilityResolved,
  ANGELIC_HIERARCHY,
  AXIS,
  capabilityOfRole,
  crossAccess,
  type CrudOp,
  decideCross,
  DEFAULT_ROLE_CAPABILITY,
  digitalRoot,
  HELIX,
  mergeCapabilities,
  resolveRoleCapability,
  roleForOperation,
} from './cross'
import { ROLE_IDS } from './roles-registry'

const mkReq = (roles: string[] | null): PayloadRequest =>
  ({ user: roles ? { roles } : null }) as unknown as PayloadRequest

/** Call an Access factory with a minimal mocked request (cross is synchronous). */
const run = (op: CrudOp, roles: string[] | null): boolean =>
  (crossAccess(op) as unknown as (a: { req: PayloadRequest }) => boolean)({ req: mkReq(roles) })

describe('cross — who can do what via roles (the 3·6·9 governing axis)', () => {
  it('maps each operation to its lattice role', () => {
    expect(roleForOperation('read')).toBe('read')
    expect(roleForOperation('create')).toBe('write')
    expect(roleForOperation('update')).toBe('write')
    expect(roleForOperation('delete')).toBe('admin')
  })

  describe('the angelic hierarchy (the math)', () => {
    it('is 9 choirs in 3 spheres — a trinity of trinities (3 per sphere)', () => {
      expect(ANGELIC_HIERARCHY).toHaveLength(9)
      expect(new Set(ANGELIC_HIERARCHY.map((c) => c.sphere))).toEqual(new Set([1, 2, 3]))
      for (const s of [1, 2, 3] as const) {
        expect(ANGELIC_HIERARCHY.filter((c) => c.sphere === s)).toHaveLength(3)
      }
    })
    it('closes on the Source: axis 3+6+9 and helix 1+2+4+8+7+5 each digital-root to 9', () => {
      const dr = (ns: readonly number[]) => digitalRoot(ns.reduce((a, b) => a + b, 0))
      expect(dr(AXIS)).toBe(9)
      expect(dr(HELIX)).toBe(9)
    })
    it('sphere governs the capability: 1→admin, 2→sign, base Angels→read', () => {
      expect(ANGELIC_HIERARCHY.filter((c) => c.sphere === 1).every((c) => c.capability === 'admin')).toBe(true)
      expect(ANGELIC_HIERARCHY.filter((c) => c.sphere === 2).every((c) => c.capability === 'sign')).toBe(true)
      expect(ANGELIC_HIERARCHY.find((c) => c.choir === 'angels')?.capability).toBe('read')
    })
  })

  describe('merging roles merges their reach (lattice max)', () => {
    it('takes the highest concrete capability', () => {
      expect(mergeCapabilities(['read', 'write'])).toBe('write')
      expect(mergeCapabilities(['admin', 'read'])).toBe('admin')
      expect(mergeCapabilities(['write', 'sign'])).toBe('sign')
    })
    it('audit is orthogonal — alone it stays audit; with a concrete role the concrete wins', () => {
      expect(mergeCapabilities(['audit'])).toBe('audit')
      expect(mergeCapabilities(['audit', 'read'])).toBe('read')
    })
    it('no roles → null', () => {
      expect(mergeCapabilities([])).toBeNull()
    })
  })

  describe('decideCross — the merged capability satisfies the operation', () => {
    it('read needs read; write covers create/update; delete needs admin', () => {
      expect(decideCross('read', ['read'])).toBe(true)
      expect(decideCross('create', ['read'])).toBe(false)
      expect(decideCross('create', ['write'])).toBe(true)
      expect(decideCross('delete', ['write'])).toBe(false)
      expect(decideCross('delete', ['admin'])).toBe(true)
    })
    it('audit is observation-only — it satisfies no CRUD op', () => {
      expect(decideCross('read', ['audit'])).toBe(false)
    })
    it('no capability → denied', () => {
      expect(decideCross('read', [])).toBe(false)
    })
  })

  describe('the seeded role → choir map', () => {
    it('places each role on its sphere capability', () => {
      expect(capabilityOfRole('super-admin' as UserRole)).toBe('admin')
      expect(capabilityOfRole('admin' as UserRole)).toBe('admin')
      expect(capabilityOfRole('director' as UserRole)).toBe('sign')
      expect(capabilityOfRole('compliance-officer' as UserRole)).toBe('sign')
      expect(capabilityOfRole('accountant' as UserRole)).toBe('write')
      expect(capabilityOfRole('user' as UserRole)).toBe('write')
      expect(capabilityOfRole('viewer' as UserRole)).toBe('read')
      expect(capabilityOfRole('auditor' as UserRole)).toBe('read')
    })
    it('assigns EVERY registered role to a choir (registry ↔ map aligned)', () => {
      for (const id of ROLE_IDS) {
        expect(DEFAULT_ROLE_CAPABILITY[id]).toBeDefined()
      }
    })
  })

  describe('harmonized resolution — Role entity ⊕ seed', () => {
    it('entity capability overrides the seed; seed defaults; read is the floor', () => {
      expect(resolveRoleCapability('accountant', 'sign')).toBe('sign') // entity wins over seed 'write'
      expect(resolveRoleCapability('accountant', null)).toBe('write') // computed seed
      expect(resolveRoleCapability('accountant')).toBe('write')
      expect(resolveRoleCapability('unknown-role')).toBe('read') // floor
    })
    it('actorCapabilityResolved loads the live Role entities and harmonizes with the seed', async () => {
      const reqWith = (
        roles: string[],
        docs: Array<{ name: string; capability?: string | null }>,
      ): PayloadRequest =>
        ({ user: { roles }, payload: { find: async () => ({ docs }) } }) as unknown as PayloadRequest
      // entity sets accountant → sign, overriding the seed (write)
      expect(
        await actorCapabilityResolved(reqWith(['accountant'], [{ name: 'accountant', capability: 'sign' }])),
      ).toBe('sign')
      // no entity row → falls back to the computed seed (write)
      expect(await actorCapabilityResolved(reqWith(['accountant'], []))).toBe('write')
      // anonymous → null
      expect(await actorCapabilityResolved({ user: null } as unknown as PayloadRequest)).toBeNull()
    })
  })

  describe('crossAccess — the agnostic Payload Access factory', () => {
    it('denies the anonymous (no user)', () => {
      expect(run('read', null)).toBe(false)
    })
    it('super-admin (admin) may delete; a default role may not', () => {
      expect(run('delete', ['super-admin'])).toBe(true)
      expect(run('delete', ['viewer'])).toBe(false)
    })
    it('a default role may still read', () => {
      expect(run('read', ['viewer'])).toBe(true)
    })
  })
})

// keep the Access type import used (the factory's contract under test)
export type _CrossAccessContract = Access
