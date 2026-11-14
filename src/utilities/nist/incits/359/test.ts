import { describe, it, expect } from 'vitest'
import {
  hasRole,
  hasStrictRole,
  hasAnyRole,
  hasAllRoles,
  hasCachedRole,
  permissionTripletToString,
  permissionStringToTriplet,
  BIT_READ,
  BIT_WRITE,
  BIT_DELETE,
  scopeResourceCollections,
  addRole,
  removeRole,
  assignedRoleIds,
} from '@/utilities/nist/incits/359'
import type { RoleDefinition } from '@/utilities/nist/incits/359'

// NIST INCITS 359 — core RBAC predicates over RoleDefinition rows + the Unix
// rwx vocabulary layer. Real invariants only: name gating, binding semantics
// (global ⊇ collection ⊇ document), strict vs non-strict, and the bit triplet
// round-trip.

const globalAdmin: RoleDefinition = {
  name: 'admin',
  binding: 'global',
  scopedCollection: null,
  resource: null,
}

const collectionEditor: RoleDefinition = {
  name: 'editor',
  binding: 'collection',
  scopedCollection: 'posts',
  resource: null,
}

const documentOwner: RoleDefinition = {
  name: 'owner',
  binding: 'document',
  scopedCollection: null,
  resource: { relationTo: 'posts', value: '42' },
}

describe('nist/incits/359 — RBAC predicates', () => {
  it('name mismatch is always false regardless of scope', () => {
    expect(hasRole(globalAdmin, 'editor')).toBe(false)
    expect(hasRole(globalAdmin, 'editor', 'posts')).toBe(false)
    expect(hasStrictRole(collectionEditor, 'admin', 'any')).toBe(false)
  })

  it('global binding satisfies name-only AND any resource (non-strict)', () => {
    expect(hasRole(globalAdmin, 'admin')).toBe(true)
    expect(hasRole(globalAdmin, 'admin', 'posts')).toBe(true)
    expect(hasRole(globalAdmin, 'admin', 'posts', 99)).toBe(true)
    // a non-global row never satisfies the name-only (global) query
    expect(hasRole(collectionEditor, 'editor')).toBe(false)
    expect(hasRole(documentOwner, 'owner')).toBe(false)
  })

  it("'any' token matches any binding carrying the role name (non-strict)", () => {
    expect(hasRole(globalAdmin, 'admin', 'any')).toBe(true)
    expect(hasRole(collectionEditor, 'editor', 'any')).toBe(true)
    expect(hasRole(documentOwner, 'owner', 'any')).toBe(true)
  })

  it('collection binding matches only its scopedCollection', () => {
    expect(hasRole(collectionEditor, 'editor', 'posts')).toBe(true)
    expect(hasRole(collectionEditor, 'editor', 'pages')).toBe(false)
    // collection binding is collection-wide → matches any id in that collection
    expect(hasRole(collectionEditor, 'editor', 'posts', 7)).toBe(true)
  })

  it('document binding matches its exact collection+id only', () => {
    expect(hasRole(documentOwner, 'owner', 'posts', 42)).toBe(true)
    expect(hasRole(documentOwner, 'owner', 'posts', 43)).toBe(false)
    expect(hasRole(documentOwner, 'owner', 'pages', 42)).toBe(false)
    // collection-only check on a document row matches by collection
    expect(hasRole(documentOwner, 'owner', 'posts')).toBe(true)
  })

  it('strict mode excludes global from instance/collection checks', () => {
    // name-only strict = global row only
    expect(hasStrictRole(globalAdmin, 'admin')).toBe(true)
    expect(hasStrictRole(collectionEditor, 'editor')).toBe(false)
    // global never satisfies a scoped strict check
    expect(hasStrictRole(globalAdmin, 'admin', 'posts')).toBe(false)
    expect(hasStrictRole(globalAdmin, 'admin', 'posts', 1)).toBe(false)
    // 'any' strict = collection or document binding only (not global)
    expect(hasStrictRole(globalAdmin, 'admin', 'any')).toBe(false)
    expect(hasStrictRole(collectionEditor, 'editor', 'any')).toBe(true)
    expect(hasStrictRole(documentOwner, 'owner', 'any')).toBe(true)
  })

  it('strict scoped checks require the matching binding kind', () => {
    expect(hasStrictRole(collectionEditor, 'editor', 'posts')).toBe(true)
    // a collection row does not strictly satisfy a document (id) check
    expect(hasStrictRole(collectionEditor, 'editor', 'posts', 7)).toBe(false)
    expect(hasStrictRole(documentOwner, 'owner', 'posts', 42)).toBe(true)
  })

  it('hasAnyRole is an OR over names and definitions', () => {
    const defs = [collectionEditor, documentOwner]
    expect(hasAnyRole(defs, ['admin', 'editor'], 'posts')).toBe(true)
    expect(hasAnyRole(defs, ['admin'], 'posts')).toBe(false)
    expect(hasAnyRole(defs, ['owner'], 'posts', 42)).toBe(true)
    expect(hasAnyRole(defs, ['owner'], 'posts', 1)).toBe(false)
  })

  it('hasAllRoles is an AND over every spec', () => {
    const defs = [globalAdmin, collectionEditor, documentOwner]
    expect(hasAllRoles(defs, 'admin')).toBe(true)
    expect(hasAllRoles(defs, 'admin', { name: 'editor', resource: 'posts' })).toBe(true)
    expect(
      hasAllRoles(defs, { name: 'owner', resource: { collection: 'posts', id: 42 } }),
    ).toBe(true)
    // one unsatisfiable spec fails the whole conjunction
    expect(hasAllRoles(defs, 'admin', { name: 'editor', resource: 'pages' })).toBe(false)
    expect(hasAllRoles(defs, 'missing')).toBe(false)
  })

  it('hasCachedRole is identical to hasRole', () => {
    expect(hasCachedRole).toBe(hasRole)
  })
})

describe('nist/incits/359 — Unix rwx permission vocabulary', () => {
  it('bits are the canonical 4/2/1 octal positions', () => {
    expect(BIT_READ).toBe(0b100)
    expect(BIT_WRITE).toBe(0b010)
    expect(BIT_DELETE).toBe(0b001)
    expect(BIT_READ | BIT_WRITE | BIT_DELETE).toBe(7)
  })

  it('triplet renders rwx strings', () => {
    expect(permissionTripletToString({ owner: 7, group: 5, other: 5 })).toBe('rwxr-xr-x')
    expect(permissionTripletToString({ owner: 6, group: 4, other: 0 })).toBe('rw-r-----')
  })

  it('string parses back into digits (round-trip)', () => {
    expect(permissionStringToTriplet('rwxr-xr-x')).toEqual({ owner: 7, group: 5, other: 5 })
    const rt = permissionStringToTriplet(permissionTripletToString({ owner: 4, group: 2, other: 1 }))
    expect(rt).toEqual({ owner: 4, group: 2, other: 1 })
  })

  it('rejects malformed length and treats invalid chars as off', () => {
    expect(permissionStringToTriplet('rwx')).toBeNull()
    expect(permissionStringToTriplet('rwxr-xr-xextra')).toBeNull()
    // unknown chars in a position are simply not the expected r/w/x → off
    expect(permissionStringToTriplet('zzzzzzzzz')).toEqual({ owner: 0, group: 0, other: 0 })
  })

  it('scopeResourceCollections is the frozen polymorphic resource set', () => {
    expect(scopeResourceCollections).toContain('posts')
    expect(scopeResourceCollections).toContain('tenants')
    expect(new Set(scopeResourceCollections).size).toBe(scopeResourceCollections.length)
  })
})

// ── The assignments live on the user (`users.roleAssignments`) — the former `user-roles` join collection ──
describe('nist/incits/359 — role assignment is a set on the user', () => {
  type Call = { op: string; collection: string; id?: unknown; data?: Record<string, unknown> }
  /** A payload over one user and a list of role definitions; records every write. */
  const world = (held: unknown[], roles: Array<{ id: string; name: string; binding: string }>) => {
    const calls: Call[] = []
    const user: { id: string; roleAssignments: unknown[] } = { id: 'u1', roleAssignments: held }
    const payload = {
      find: async ({ collection }: { collection: string }) => {
        calls.push({ op: 'find', collection })
        return { docs: collection === 'roles' ? roles.filter((r) => r.binding === 'global') : [] }
      },
      findByID: async ({ collection, id }: { collection: string; id: unknown }) => {
        calls.push({ op: 'findByID', collection, id })
        return collection === 'users' ? user : null
      },
      create: async ({ collection, data }: { collection: string; data: Record<string, unknown> }) => {
        calls.push({ op: 'create', collection, data })
        return { id: 'r-new', ...data }
      },
      update: async ({ collection, id, data }: { collection: string; id: unknown; data: Record<string, unknown> }) => {
        calls.push({ op: 'update', collection, id, data })
        user.roleAssignments = data.roleAssignments as unknown[]
        return user
      },
      delete: async ({ collection }: { collection: string }) => { calls.push({ op: 'delete', collection }); return {} },
    }
    const run = <T,>(fn: (p: never, r: never, a: { userId: string; roleName: string }) => Promise<T>, roleName: string) =>
      fn(payload as never, {} as never, { userId: 'u1', roleName })
    return { calls, user, run, writes: () => calls.filter((c) => c.op !== 'find' && c.op !== 'findByID') }
  }
  const auditor = { id: 'r1', name: 'auditor', binding: 'global' }

  it('granting appends the role definition to the user — no separate assignment row', async () => {
    const w = world(['r0'], [auditor])
    await w.run(addRole, 'auditor')
    expect(w.writes()).toEqual([{ op: 'update', collection: 'users', id: 'u1', data: { roleAssignments: ['r0', 'r1'] } }])
  })
  it('granting a role already held writes nothing (a set cannot hold a duplicate)', async () => {
    const w = world(['r1'], [auditor])
    await w.run(addRole, 'auditor')
    expect(w.writes()).toEqual([])
    // held as a populated document, not an id — still recognised
    const populated = world([{ id: 'r1', name: 'auditor' }], [auditor])
    await populated.run(addRole, 'auditor')
    expect(populated.writes()).toEqual([])
  })
  it('granting an undefined role first creates its definition, then assigns it', async () => {
    const w = world([], [])
    await w.run(addRole, 'reviewer')
    expect(w.writes().map((c) => `${c.op}:${c.collection}`)).toEqual(['create:roles', 'update:users'])
    expect(w.user.roleAssignments).toEqual(['r-new'])
  })
  it('revoking removes only that role and never deletes a document', async () => {
    const w = world(['r0', 'r1', 'r2'], [auditor])
    await w.run(removeRole, 'auditor')
    expect(w.writes()).toEqual([{ op: 'update', collection: 'users', id: 'u1', data: { roleAssignments: ['r0', 'r2'] } }])
  })
  it('revoking a role not held, or one with no definition, writes nothing', async () => {
    const notHeld = world(['r0'], [auditor])
    await notHeld.run(removeRole, 'auditor')
    expect(notHeld.writes()).toEqual([])
    const undefinedRole = world(['r0'], [])
    await undefinedRole.run(removeRole, 'ghost')
    expect(undefinedRole.writes()).toEqual([])
  })
  it('reads the held ids whether stored as ids or populated documents', async () => {
    const w = world(['r0', { id: 'r1' }, 7], [])
    expect(await assignedRoleIds({ findByID: async () => w.user } as never, {} as never, 'u1')).toEqual(['r0', 'r1', '7'])
  })
})
