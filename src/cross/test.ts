import { describe, it, expect } from 'vitest'
import {
  roleForOperation,
  mergeCapabilities,
  decideCross,
  capabilityOfRole,
  resolveRoleCapability,
  crossAccessSet,
  ANGELIC_HIERARCHY,
  DEFAULT_ROLE_CAPABILITY,
  AXIS,
  HELIX,
  digitalRoot,
  type CrudOp,
} from '@/cross'

// cross (./index.ts): capability rides ROLES on the read<write<sign<admin
// lattice (audit ⊥); merging roles takes the lattice MAX, and an op is
// authorised iff the merged capability reaches the op's required role.
describe('cross — the agnostic role-capability access factory', () => {
  it('roleForOperation maps CRUD to the minimum authorising role', () => {
    expect(roleForOperation('read')).toBe('read')
    expect(roleForOperation('create')).toBe('write')
    expect(roleForOperation('update')).toBe('write')
    expect(roleForOperation('delete')).toBe('admin')
  })

  it('mergeCapabilities takes the lattice MAX (merging roles merges reach)', () => {
    expect(mergeCapabilities(['read', 'write'])).toBe('write')
    expect(mergeCapabilities(['write', 'admin', 'read'])).toBe('admin')
    expect(mergeCapabilities(['read', 'sign'])).toBe('sign')
    // null = no roles
    expect(mergeCapabilities([])).toBe(null)
  })

  it('audit is ⊥ — orthogonal, outranked by any concrete role; alone it stays audit', () => {
    expect(mergeCapabilities(['audit'])).toBe('audit')
    expect(mergeCapabilities(['audit', 'read'])).toBe('read')
    expect(mergeCapabilities(['audit', 'admin'])).toBe('admin')
  })

  it('decideCross: authorised iff merged capability reaches the op role', () => {
    expect(decideCross('read', ['read'])).toBe(true)
    expect(decideCross('delete', ['read'])).toBe(false)
    expect(decideCross('delete', ['admin'])).toBe(true)
    expect(decideCross('create', ['write'])).toBe(true)
    expect(decideCross('create', ['read'])).toBe(false)
    // an admin role satisfies every op
    for (const op of ['create', 'read', 'update', 'delete'] as CrudOp[]) {
      expect(decideCross(op, ['admin'])).toBe(true)
    }
    // no roles ⇒ never authorised
    expect(decideCross('read', [])).toBe(false)
  })

  it('the angelic hierarchy is a trinity of trinities — 9 choirs in 3 spheres', () => {
    expect(ANGELIC_HIERARCHY).toHaveLength(9)
    const spheres = new Set(ANGELIC_HIERARCHY.map((c) => c.sphere))
    expect([...spheres].sort()).toEqual([1, 2, 3])
    // sphere ⇒ capability: 1 admin, 2 sign, 3 write/read (Angels read)
    expect(ANGELIC_HIERARCHY.filter((c) => c.sphere === 1).every((c) => c.capability === 'admin')).toBe(true)
    expect(ANGELIC_HIERARCHY.filter((c) => c.sphere === 2).every((c) => c.capability === 'sign')).toBe(true)
    const angels = ANGELIC_HIERARCHY.find((c) => c.choir === 'angels')!
    expect(angels.capability).toBe('read')
  })

  it('the axis and helix are both closed to 9 under the rodin digital root', () => {
    expect(AXIS.map(digitalRoot)).toEqual([3, 6, 9])
    // the 1·2·4·8·7·5 doubling helix avoids the 3·6·9 axis entirely
    expect(HELIX.some((n) => AXIS.includes(n as 3 | 6 | 9))).toBe(false)
    // both sets union to the digits 1..9 (closed)
    expect(new Set([...AXIS, ...HELIX]).size).toBe(9)
  })

  it('DEFAULT_ROLE_CAPABILITY seeds every role onto a choir; read is the floor', () => {
    expect(DEFAULT_ROLE_CAPABILITY['super-admin']).toBe('admin')
    expect(DEFAULT_ROLE_CAPABILITY.director).toBe('sign')
    expect(DEFAULT_ROLE_CAPABILITY.accountant).toBe('write')
    expect(DEFAULT_ROLE_CAPABILITY.viewer).toBe('read')
    // unseeded role falls to the base Angel (read)
    expect(capabilityOfRole('no-such-role' as never)).toBe('read')
  })

  it('resolveRoleCapability: entity wins, seed defaults, read is the floor', () => {
    expect(resolveRoleCapability('viewer', 'admin')).toBe('admin') // entity overrides
    expect(resolveRoleCapability('director')).toBe('sign')          // seed default
    expect(resolveRoleCapability('mystery-role')).toBe('read')      // floor
  })

  it('crossAccessSet yields one Access fn per CRUD op (the same factory for all)', () => {
    const set = crossAccessSet()
    expect(Object.keys(set).sort()).toEqual(['create', 'delete', 'read', 'update'])
    for (const op of ['create', 'read', 'update', 'delete'] as CrudOp[]) {
      expect(typeof set[op]).toBe('function')
    }
  })
})
