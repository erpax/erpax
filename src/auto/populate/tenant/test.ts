/**
 * auto/populate/tenant (trinity proof) — a beforeValidate gate that pins a row to
 * the writer's tenant: it copies the FIRST `req.user.tenants[]` reference onto
 * `data.tenant`, so a row cannot be created against a tenant the writer does not
 * occupy. Pure: exercised with minimal typed args, no DB, no `any`. @see ./index.ts
 */
import { describe, it, expect } from 'vitest'
import type { CollectionBeforeValidateHook } from 'payload'
import { autoPopulateTenant } from '@/auto/populate/tenant'

type HookArgs = Parameters<CollectionBeforeValidateHook>[0]

const run = (args: Partial<HookArgs>): Promise<Record<string, unknown>> =>
  autoPopulateTenant({ data: {}, req: {}, operation: 'create', collection: undefined, ...args } as HookArgs) as Promise<
    Record<string, unknown>
  >

const userWithTenants = (tenants: Array<{ tenant?: number | string }>): HookArgs['req'] =>
  ({ user: { id: 'u-1', tenants } }) as unknown as HookArgs['req']

describe('auto/populate/tenant — tenant isolation from the request user', () => {
  it('stamps the FIRST tenant reference (numeric) onto data.tenant', async () => {
    const data: Record<string, unknown> = { name: 'row' }
    const out = await run({ data, req: userWithTenants([{ tenant: 42 }, { tenant: 7 }]) })
    expect(out.tenant).toBe(42)
    // mutates and returns the same data object
    expect(out).toBe(data)
  })

  it('supports a string tenant reference', async () => {
    const out = await run({ req: userWithTenants([{ tenant: 'tenant-abc' }]) })
    expect(out.tenant).toBe('tenant-abc')
  })

  it('does nothing without a request user (no tenant stamped)', async () => {
    const out = await run({ req: {} as HookArgs['req'] })
    expect(out.tenant).toBeUndefined()
  })

  it('does nothing when the user has no tenants', async () => {
    const out = await run({ req: userWithTenants([]) })
    expect(out.tenant).toBeUndefined()
  })

  it('does nothing when the first tenant reference is null/undefined (not stamped)', async () => {
    const undef = await run({ req: userWithTenants([{}]) })
    expect(undef.tenant).toBeUndefined()
    const nulled = await run({ req: userWithTenants([{ tenant: undefined }]) })
    expect(nulled.tenant).toBeUndefined()
  })
})
