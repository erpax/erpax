import { describe, it, expect } from 'vitest'
import {
  accessVerdict,
  actorFromRequest,
  actorFromScope,
  mcpTenantVerdict,
  mcpAdminMutateVerdict,
  crossCrudVerdict,
  agentTenantVerdict,
  sandboxVerdict,
  docsReadVerdict,
  computedAccess,
} from '@/access'
import type { ToolGrant } from '@/sandbox'

const grant: ToolGrant = {
  toolUuid: 'tool-uuid',
  capabilities: ['read', 'execute'],
  allowedHosts: [],
  credentialHandles: [],
}

describe('access — L4 MCP tenant guards (computed, mirrors _guards)', () => {
  it('allows internal context without tenant check', () => {
    expect(mcpTenantVerdict({ internal: true }, 'any-tenant').allowed).toBe(true)
  })

  it('allows super-admin cross-tenant', () => {
    expect(
      mcpTenantVerdict({ tenantId: 't-a', roles: ['super-admin'] }, 't-b').allowed,
    ).toBe(true)
  })

  it('blocks tenant mismatch for normal caller', () => {
    const v = mcpTenantVerdict({ tenantId: 't-a', roles: ['user'] }, 't-b')
    expect(v.allowed).toBe(false)
    expect(v.reason).toContain("claimed tenantId='t-b'")
  })

  it('admin-mutate requires admin role after tenant match', () => {
    expect(mcpAdminMutateVerdict({ tenantId: 't-a', roles: ['viewer'] }, 't-a').allowed).toBe(false)
    expect(mcpAdminMutateVerdict({ tenantId: 't-a', roles: ['admin'] }, 't-a').allowed).toBe(true)
    expect(mcpAdminMutateVerdict({ tenantId: 't-a', roles: ['auditor'] }, 't-a').allowed).toBe(true)
  })
})

describe('access — L1 payload cross lattice', () => {
  it('viewer can read but not delete', () => {
    expect(crossCrudVerdict({ roles: ['viewer'] }, 'read').allowed).toBe(true)
    expect(crossCrudVerdict({ roles: ['viewer'] }, 'delete').allowed).toBe(false)
  })

  it('admin satisfies every CRUD op', () => {
    for (const op of ['create', 'read', 'update', 'delete'] as const) {
      expect(crossCrudVerdict({ roles: ['admin'] }, op).allowed).toBe(true)
    }
  })
})

describe('access — L5/L6 agent tenant (delegates team/comms)', () => {
  it('allows matching scope and target tenant', () => {
    expect(agentTenantVerdict('tenant-a', 'tenant-a').allowed).toBe(true)
  })

  it('blocks cross-tenant agent paths', () => {
    const v = agentTenantVerdict('tenant-a', 'tenant-b')
    expect(v.allowed).toBe(false)
    expect(v.reason).toContain('mismatch')
  })
})

describe('access — L7 sandbox + L8 docs', () => {
  it('sandbox verdict delegates to permits', () => {
    expect(sandboxVerdict(grant, { capability: 'execute' }).allowed).toBe(true)
    expect(sandboxVerdict(grant, { capability: 'write' }).allowed).toBe(false)
  })

  it('docs routes are public read', () => {
    expect(docsReadVerdict('/access/SKILL').allowed).toBe(true)
  })
})

describe('access — accessVerdict unified entry', () => {
  it('dispatches MCP level with tenantId', () => {
    const v = accessVerdict(
      { tenantId: 't-a', roles: ['user'] },
      { level: 'mcp', tenantId: 't-b', toolName: 'erpax.events.list' },
      'execute',
    )
    expect(v.allowed).toBe(false)
    expect(v.level).toBe('mcp')
  })

  it('dispatches emit level through agent tenant verdict', () => {
    const actor = actorFromScope('tenant-a', 'agent-1')
    const v = accessVerdict(actor, { level: 'emit', tenantId: 'tenant-b' }, 'emit')
    expect(v.allowed).toBe(false)
  })

  it('actorFromRequest mirrors req.user tenant field', () => {
    const actor = actorFromRequest({
      user: { id: '1', tenant: 'shop-1', roles: ['admin'] },
    } as never)
    expect(actor.tenantId).toBe('shop-1')
    expect(actor.internal).toBe(false)
    expect(actorFromRequest({} as never).internal).toBe(true)
  })

  it('computedAccess namespace re-exports the layer', () => {
    expect(computedAccess.accessVerdict).toBe(accessVerdict)
    expect(computedAccess.mcpTenantVerdict).toBe(mcpTenantVerdict)
  })
})
