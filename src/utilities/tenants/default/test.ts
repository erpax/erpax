/**
 * tenantDefault: the selected tenant when the user may read it, else the user's first.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import type { PayloadRequest } from 'payload'
import { describe, expect, it, vi } from 'vitest'

import { tenantDefault } from '@/utilities/tenants/default'

const reqOf = (cookie: string | undefined, user: unknown, readable: number) =>
  ({
    headers: new Headers(cookie ? { cookie } : {}),
    user,
    payload: { collections: { tenants: {} }, db: { defaultIDType: 'text' }, count: vi.fn(async () => ({ totalDocs: readable })) },
  }) as unknown as PayloadRequest

const member = { id: 'u', roles: ['user'], tenants: [{ tenant: 't1', roles: ['user'] }, { tenant: 't2', roles: ['user'] }] }

describe('tenantDefault', () => {
  it('takes the selected tenant when the user may read it', async () => {
    expect(await tenantDefault({ req: reqOf('payload-tenant=t2', member, 1) })).toBe('t2')
  })

  it('refuses a selected tenant the user cannot read', async () => {
    expect(await tenantDefault({ req: reqOf('payload-tenant=other', member, 0) })).toBeNull()
  })

  it("falls back to the user's first tenant when nothing is selected (MCP, REST)", async () => {
    const req = reqOf(undefined, member, 0)
    expect(await tenantDefault({ req })).toBe('t1')
    expect(req.payload.count).not.toHaveBeenCalled()
  })

  it('gives a user with no tenant (a super-admin) nothing to default to', async () => {
    expect(await tenantDefault({ req: reqOf(undefined, { id: 's', roles: ['admin'], tenants: [] }, 0) })).toBeNull()
    expect(await tenantDefault({ req: reqOf(undefined, undefined, 0) })).toBeNull()
  })
})
