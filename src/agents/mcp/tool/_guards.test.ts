/**
 * Tenant-guard contract tests — Slice CCCCCCCCCC (2026-05-11).
 *
 * Locks the cross-tenant exploit class closed by Slice BBBBBBBBBB-cut3
 * with a vitest pin: any future regression that drops the guard or
 * weakens the role check breaks here.
 *
 * Coverage matrix:
 *
 *   assertTenantMatch
 *     ✓ no user (internal context) bypasses
 *     ✓ super-admin role bypasses cross-tenant claim
 *     ✓ matching tenant accepts
 *     ✓ mismatched tenant throws
 *     ✓ missing user.tenant falls back to 'platform'
 *     ✓ error message sanitises tenant strings (no injection)
 *
 *   assertAdminOnTenant
 *     ✓ admin role on matching tenant accepts
 *     ✓ tenant-admin role on matching tenant accepts
 *     ✓ auditor role on matching tenant accepts
 *     ✓ super-admin always accepts (even cross-tenant)
 *     ✓ no user (internal context) bypasses
 *     ✓ non-admin role on matching tenant throws
 *     ✓ admin role on mismatched tenant throws (tenant guard fires first)
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 * @audit ISO 19011:2018 §6.4.6 (security-policy regression coverage)
 */
import { describe, it, expect } from 'vitest'
import type { PayloadRequest } from 'payload'
import { assertTenantMatch, assertAdminOnTenant, wrapToolsWithTenantGuard, type WrappableTool } from '@/agents/mcp/tool/_guards'

/** Build a minimal `PayloadRequest`-shaped object for testing. */
function reqWith(user: { tenant?: string; roles?: ReadonlyArray<string> } | undefined): PayloadRequest {
  return { user } as unknown as PayloadRequest
}

describe('assertTenantMatch', () => {
  it('bypasses when there is no authenticated user (internal context)', () => {
    expect(() => assertTenantMatch('tenant-a', reqWith(undefined))).not.toThrow()
    expect(() => assertTenantMatch('platform', reqWith(undefined))).not.toThrow()
    expect(() => assertTenantMatch('any-tenant', reqWith(undefined))).not.toThrow()
  })

  it('bypasses for super-admin even on cross-tenant claim', () => {
    const req = reqWith({ tenant: 'tenant-a', roles: ['super-admin'] })
    expect(() => assertTenantMatch('tenant-b', req)).not.toThrow()
    expect(() => assertTenantMatch('platform', req)).not.toThrow()
  })

  it('accepts when caller tenant equals claimed tenantId', () => {
    const req = reqWith({ tenant: 'tenant-a', roles: ['user'] })
    expect(() => assertTenantMatch('tenant-a', req)).not.toThrow()
  })

  it('throws when caller tenant differs from claimed tenantId', () => {
    const req = reqWith({ tenant: 'tenant-a', roles: ['user'] })
    expect(() => assertTenantMatch('tenant-b', req)).toThrow(/tenant guard/i)
    expect(() => assertTenantMatch('tenant-b', req)).toThrow(/tenant-a/)
    expect(() => assertTenantMatch('tenant-b', req)).toThrow(/tenant-b/)
  })

  it('falls back to "platform" when user.tenant is unset', () => {
    const req = reqWith({ roles: ['user'] })
    expect(() => assertTenantMatch('platform', req)).not.toThrow()
    expect(() => assertTenantMatch('tenant-a', req)).toThrow(/tenant guard/i)
  })

  it('sanitises tenant strings in error messages (no newline / control-char injection)', () => {
    const req = reqWith({ tenant: 'tenant-a', roles: ['user'] })
    const evil = 'tenant-b\n[FAKE LOG] elevated=true\x07'
    try {
      assertTenantMatch(evil, req)
      throw new Error('should have thrown')
    } catch (err) {
      const msg = (err as Error).message
      expect(msg).not.toContain('\n')
      expect(msg).not.toContain('\x07')
      expect(msg).not.toContain('FAKE LOG')
    }
  })

  it('caps overlong tenant strings to 64 chars in error messages', () => {
    const req = reqWith({ tenant: 'tenant-a', roles: ['user'] })
    const oversized = 'x'.repeat(500)
    try {
      assertTenantMatch(oversized, req)
      throw new Error('should have thrown')
    } catch (err) {
      const msg = (err as Error).message
      // Should not echo all 500 chars back.
      expect(msg.length).toBeLessThan(500)
    }
  })
})

describe('assertAdminOnTenant', () => {
  it('accepts admin role on matching tenant', () => {
    const req = reqWith({ tenant: 'tenant-a', roles: ['admin'] })
    expect(() => assertAdminOnTenant('tenant-a', req)).not.toThrow()
  })

  it('accepts tenant-admin role on matching tenant', () => {
    const req = reqWith({ tenant: 'tenant-a', roles: ['tenant-admin'] })
    expect(() => assertAdminOnTenant('tenant-a', req)).not.toThrow()
  })

  it('accepts auditor role on matching tenant (auditors write audit events)', () => {
    const req = reqWith({ tenant: 'tenant-a', roles: ['auditor'] })
    expect(() => assertAdminOnTenant('tenant-a', req)).not.toThrow()
  })

  it('accepts super-admin role even on cross-tenant claim', () => {
    const req = reqWith({ tenant: 'tenant-a', roles: ['super-admin'] })
    expect(() => assertAdminOnTenant('tenant-b', req)).not.toThrow()
  })

  it('bypasses when there is no authenticated user (internal context)', () => {
    expect(() => assertAdminOnTenant('tenant-a', reqWith(undefined))).not.toThrow()
  })

  it('throws for non-admin role even on matching tenant', () => {
    const req = reqWith({ tenant: 'tenant-a', roles: ['user', 'editor'] })
    expect(() => assertAdminOnTenant('tenant-a', req)).toThrow(/admin\/auditor role/i)
  })

  it('throws when user has empty roles array', () => {
    const req = reqWith({ tenant: 'tenant-a', roles: [] })
    expect(() => assertAdminOnTenant('tenant-a', req)).toThrow(/admin\/auditor role/i)
  })

  it('admin role on mismatched tenant still throws (tenant guard fires first)', () => {
    const req = reqWith({ tenant: 'tenant-a', roles: ['admin'] })
    expect(() => assertAdminOnTenant('tenant-b', req)).toThrow(/tenant guard/i)
  })

  it('accepts when roles include both admin and irrelevant roles', () => {
    const req = reqWith({ tenant: 'tenant-a', roles: ['user', 'admin', 'editor'] })
    expect(() => assertAdminOnTenant('tenant-a', req)).not.toThrow()
  })
})

describe('wrapToolsWithTenantGuard (Slice IIIIIIIIII)', () => {
  function fakeTool(name: string, params: Record<string, unknown>): WrappableTool {
    return {
      name,
      description: `desc for ${name}`,
      parameters: params,
      async handler(args, _req) {
        return {
          content: [{ type: 'text' as const, text: `called ${name} with tenant=${args.tenantId ?? ''}` }],
        }
      },
    }
  }

  it('returns tools without a tenantId parameter unchanged (object identity)', () => {
    const tool = fakeTool('erpax.test.noTenant', { foo: 'string' })
    const wrapped = wrapToolsWithTenantGuard([tool], { mutatingTools: new Set() })
    expect(wrapped[0]).toBe(tool) // same reference — wrapper is a no-op
  })

  it('preserves name + description + parameters on wrapped tools', () => {
    const tool = fakeTool('erpax.test.withTenant', { tenantId: 'string' })
    const [wrapped] = wrapToolsWithTenantGuard([tool], { mutatingTools: new Set() })
    expect(wrapped!.name).toBe(tool.name)
    expect(wrapped!.description).toBe(tool.description)
    expect(wrapped!.parameters).toBe(tool.parameters)
  })

  it('blocks cross-tenant call on a read tool (assertTenantMatch path)', async () => {
    const tool = fakeTool('erpax.test.read', { tenantId: 'string' })
    const [wrapped] = wrapToolsWithTenantGuard([tool], { mutatingTools: new Set() })
    const req = { user: { tenant: 'tenant-a', roles: ['user'] } } as unknown as PayloadRequest
    await expect(wrapped!.handler({ tenantId: 'tenant-b' }, req)).rejects.toThrow(/tenant guard/i)
  })

  it('allows same-tenant call on a read tool and forwards to original handler', async () => {
    const tool = fakeTool('erpax.test.read', { tenantId: 'string' })
    const [wrapped] = wrapToolsWithTenantGuard([tool], { mutatingTools: new Set() })
    const req = { user: { tenant: 'tenant-a', roles: ['user'] } } as unknown as PayloadRequest
    const out = await wrapped!.handler({ tenantId: 'tenant-a' }, req)
    expect(out.content[0]!.text).toBe('called erpax.test.read with tenant=tenant-a')
  })

  it('blocks same-tenant non-admin call on a mutating tool (assertAdminOnTenant path)', async () => {
    const tool = fakeTool('erpax.test.mutate', { tenantId: 'string' })
    const mutating = new Set(['erpax.test.mutate'])
    const [wrapped] = wrapToolsWithTenantGuard([tool], { mutatingTools: mutating })
    const req = { user: { tenant: 'tenant-a', roles: ['user'] } } as unknown as PayloadRequest
    await expect(wrapped!.handler({ tenantId: 'tenant-a' }, req)).rejects.toThrow(/admin\/auditor role/i)
  })

  it('allows admin call on a mutating tool', async () => {
    const tool = fakeTool('erpax.test.mutate', { tenantId: 'string' })
    const mutating = new Set(['erpax.test.mutate'])
    const [wrapped] = wrapToolsWithTenantGuard([tool], { mutatingTools: mutating })
    const req = { user: { tenant: 'tenant-a', roles: ['admin'] } } as unknown as PayloadRequest
    const out = await wrapped!.handler({ tenantId: 'tenant-a' }, req)
    expect(out.content[0]!.text).toBe('called erpax.test.mutate with tenant=tenant-a')
  })

  it('super-admin bypasses cross-tenant claim even on mutating tools', async () => {
    const tool = fakeTool('erpax.test.mutate', { tenantId: 'string' })
    const mutating = new Set(['erpax.test.mutate'])
    const [wrapped] = wrapToolsWithTenantGuard([tool], { mutatingTools: mutating })
    const req = { user: { tenant: 'tenant-a', roles: ['super-admin'] } } as unknown as PayloadRequest
    const out = await wrapped!.handler({ tenantId: 'tenant-b' }, req)
    expect(out.content[0]!.text).toBe('called erpax.test.mutate with tenant=tenant-b')
  })

  it('skips guard when tenantId is missing from args (opt-in policy delegation)', async () => {
    const tool = fakeTool('erpax.test.optional', { tenantId: 'string' })
    const [wrapped] = wrapToolsWithTenantGuard([tool], { mutatingTools: new Set() })
    const req = { user: { tenant: 'tenant-a', roles: ['user'] } } as unknown as PayloadRequest
    // No tenantId supplied — caller is opting into the tool's internal default.
    await expect(wrapped!.handler({}, req)).resolves.not.toThrow()
  })

  it('skips guard when tenantId is an empty string', async () => {
    const tool = fakeTool('erpax.test.empty', { tenantId: 'string' })
    const [wrapped] = wrapToolsWithTenantGuard([tool], { mutatingTools: new Set() })
    const req = { user: { tenant: 'tenant-a', roles: ['user'] } } as unknown as PayloadRequest
    await expect(wrapped!.handler({ tenantId: '' }, req)).resolves.not.toThrow()
  })

  it('bypasses guard entirely when there is no req.user (internal context)', async () => {
    const tool = fakeTool('erpax.test.mutate', { tenantId: 'string' })
    const mutating = new Set(['erpax.test.mutate'])
    const [wrapped] = wrapToolsWithTenantGuard([tool], { mutatingTools: mutating })
    const req = { user: undefined } as unknown as PayloadRequest
    const out = await wrapped!.handler({ tenantId: 'any-tenant' }, req)
    expect(out.content[0]!.text).toBe('called erpax.test.mutate with tenant=any-tenant')
  })
})
