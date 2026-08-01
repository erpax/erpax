import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'

import { asSystem, principalMay, principals, type Subsystem } from './index'

describe('principal — act as someone, never as no one', () => {
  it('reads exactly like a person to the access layer — no special code path', () => {
    const p = asSystem('seed', 't1')
    // getUserContext(req) reads { id, tenants[0].tenant, roles }. A principal that needed its own
    // branch in the checker would BE a second door — the thing this exists to remove.
    expect(p.id).toBe('system:seed')
    expect(p.tenants[0].tenant).toBe('t1')
    expect(Array.isArray(p.roles)).toBe(true)
  })

  it('a tenantless principal is REFUSED — it would be a bypass wearing an identity', () => {
    // scopedAccess returns { tenant: { equals: user.tenant } }; an empty tenant matches nothing or
    // everything depending on coercion, and neither of those is a policy
    expect(() => asSystem('job', '')).toThrow(/needs a tenant/)
    expect(() => asSystem('job', '   ')).toThrow(/bypass wearing an identity/)
  })

  it('no principal holds admin — a subsystem that needs it has the wrong job', () => {
    for (const p of principals('t1')) {
      expect(p.roles).not.toContain('admin')
      expect(p.roles).not.toContain('super-admin')
      expect(p.roles.length).toBeGreaterThan(0) // a principal with no capability is not a principal
    }
  })

  it('the privileged surface is ENUMERABLE — you can read the whole of it', () => {
    const all = principals('t1')
    expect(all.map((p) => p.subsystem).sort()).toEqual(['hook', 'import', 'job', 'migration', 'seed'])
    // with overrideAccess:true there is nothing to enumerate: every bypass holds every privilege
    for (const p of all) expect(p.scope.length).toBeGreaterThan(20)
  })

  it('principalMay lets a caller fail LOUDLY instead of reading an empty table', () => {
    const p = asSystem('seed', 't1')
    expect(principalMay(p, 'user')).toBe(true)
    expect(principalMay(p, 'admin' as never)).toBe(false)
    // a denied read and an empty result are indistinguishable downstream — that is precisely why
    // this migration is done a subsystem at a time rather than swept
  })

  it('CAPABILITY differs by subsystem — not just the name and the tenant', () => {
    // the first draft gave every principal `user`, which made all five READ-ONLY by accident: the
    // factory gates create/update on roleScopedAccess('admin', writeRole = 'accountant'). The one
    // migrated site survived only because `tags` is not factory-built. That was luck.
    expect(principalMay(asSystem('seed', 't1'), 'accountant' as never)).toBe(true)
    expect(principalMay(asSystem('job', 't1'), 'accountant' as never)).toBe(true)
    // a hook runs INSIDE an authorised write; letting it write would let it widen its own trigger
    expect(principalMay(asSystem('hook', 't1'), 'accountant' as never)).toBe(false)
  })

  it('DELETE is unreachable for every principal — enforced, not merely declared', () => {
    // the factory gates delete on tenantAdmin. No principal holds admin, so the access function
    // refuses; the map does not have to forbid it.
    for (const p of principals('t1')) {
      expect(principalMay(p, 'admin' as never)).toBe(false)
      expect(principalMay(p, 'super-admin' as never)).toBe(false)
    }
  })

  it('the same subsystem in two tenants is two principals — never one shared identity', () => {
    const a = asSystem('job', 'tenant-a')
    const b = asSystem('job', 'tenant-b')
    expect(a.tenants[0].tenant).not.toBe(b.tenants[0].tenant)
    expect(a.id).toBe(b.id) // same ROLE, different scope — the tenant is what separates them
  })

  it('every declared subsystem is reachable and none is a stub', () => {
    for (const s of ['seed', 'hook', 'job', 'migration', 'import'] as Subsystem[]) {
      const p = asSystem(s, 't1')
      expect(p.subsystem).toBe(s)
      expect(p.scope).toMatch(/\w/)
    }
  })
})

describe('principal — judged by the constitution', () => {
  const change: Change = {
    atom: 'principal',
    dualities: [
      { builds: 'asSystem', breaks: 'a tenantless principal is refused' },
      { builds: 'principals', breaks: 'no principal holds admin' },
      { builds: 'principalMay', breaks: 'a missing capability answers false, not empty' },
    ],
    anchors: ['ISO/IEC 27001 A.5.15', 'ISO/IEC 27001 A.8.2'],
    claims: [
      {
        text: 'this removes the overrideAccess backdoor',
        boundary:
          'it builds the identity that makes removal possible — it does not remove it. 138 call ' +
          'sites still bypass; they move one subsystem at a time, verified, ledger last. And a ' +
          'principal only proves the check RAN and passed, never that the capability granted is ' +
          'the right one: the role map is declared by a human and is exactly as good as that judgement',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'identity⊕scope', ring: [5, 5] },
    ],
    served: [{ result: 'the enumerable privileged surface', recompute: 'src/principal/index.ts' }],
    postings: [
      { debit: 'operation/system', credit: 'principal/scope', amount: 5 },
      { debit: 'principal/scope', credit: 'operation/system', amount: 5 },
    ],
    edges: [
      { from: 'principal', to: 'auth' },
      { from: 'auth', to: 'principal' },
    ],
    quantities: [
      { name: 'declared subsystems', value: 5, derivation: 'src/principal/index.ts' },
      { name: 'call sites still bypassing', value: 138, derivation: 'src/rules/bypass/index.ts' },
    ],
    keepers: [],
    seed: ['src/principal/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})
