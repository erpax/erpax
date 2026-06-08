import { describe, it, expect } from 'vitest'
import {
  auditTrailRead,
  auditTrailCreate,
  auditTrailModifyDenied,
} from '@/audit/trail/access'

// The audit trail is append-only (./index.ts): read is tenant-scoped (super-admin
// sees all), create is super-admin-only, update/delete is denied outright.

type ReadArgs = Parameters<typeof auditTrailRead>[0]
type CreateArgs = Parameters<typeof auditTrailCreate>[0]

// A super-admin is an `admin` with an EMPTY tenant scope (derived, never stored).
const superAdmin = { id: 'sa', roles: ['admin'], tenants: [] }
// A tenant user: a non-admin bound to one tenant.
const tenantUser = { id: 'u1', roles: ['user'], tenants: [{ tenant: 'tenant-1', roles: ['user'] }] }

const readReq = (user: unknown): ReadArgs => ({ req: { user } } as unknown as ReadArgs)
const createReq = (user: unknown): CreateArgs => ({ req: { user } } as unknown as CreateArgs)

describe('audit/trail/access — append-only, tenant-scoped access', () => {
  it('read denies an unauthenticated request', () => {
    expect(auditTrailRead(readReq(undefined))).toBe(false)
  })

  it('read grants a super-admin all tenants', () => {
    expect(auditTrailRead(readReq(superAdmin))).toBe(true)
  })

  it('read constrains a tenant user to their own tenant', () => {
    const result = auditTrailRead(readReq(tenantUser))
    expect(result).toEqual({ tenant: { equals: 'tenant-1' } })
  })

  it('create is super-admin-only', () => {
    expect(auditTrailCreate(createReq(superAdmin))).toBe(true)
    expect(auditTrailCreate(createReq(tenantUser))).toBe(false)
    expect(auditTrailCreate(createReq(undefined))).toBe(false)
  })

  it('update/delete is denied outright — append-only evidence', () => {
    expect(auditTrailModifyDenied(readReq(superAdmin))).toBe(false)
    expect(auditTrailModifyDenied(readReq(tenantUser))).toBe(false)
    expect(auditTrailModifyDenied(readReq(undefined))).toBe(false)
  })
})
