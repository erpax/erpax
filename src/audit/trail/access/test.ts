import { describe, it, expect } from 'vitest'
import {
  auditTrailRead,
  auditTrailCreate,
  auditTrailModifyDenied,
} from '@/audit/trail/access'

// The audit trail is append-only (./index.ts): read is tenant-scoped (super-admin
// sees all), create is super-admin-only, update/delete is denied outright.

type AccessArgs = Parameters<typeof auditTrailRead>[0]

// A super-admin is an `admin` with an EMPTY tenant scope (derived, never stored).
const superAdmin = { id: 'sa', roles: ['admin'], tenants: [] }
// A tenant user: a non-admin bound to one tenant.
const tenantUser = { id: 'u1', roles: ['user'], tenants: [{ tenant: 'tenant-1', roles: ['user'] }] }

const reqWith = (user: unknown): AccessArgs => ({ req: { user } } as unknown as AccessArgs)

describe('audit/trail/access — append-only, tenant-scoped access', () => {
  it('read denies an unauthenticated request', () => {
    expect(auditTrailRead(reqWith(undefined))).toBe(false)
  })

  it('read grants a super-admin all tenants', () => {
    expect(auditTrailRead(reqWith(superAdmin))).toBe(true)
  })

  it('read constrains a tenant user to their own tenant', () => {
    const result = auditTrailRead(reqWith(tenantUser))
    expect(result).toEqual({ tenant: { equals: 'tenant-1' } })
  })

  it('create is super-admin-only', () => {
    expect(auditTrailCreate(reqWith(superAdmin))).toBe(true)
    expect(auditTrailCreate(reqWith(tenantUser))).toBe(false)
    expect(auditTrailCreate(reqWith(undefined))).toBe(false)
  })

  it('update/delete is denied outright — append-only evidence', () => {
    expect(auditTrailModifyDenied(reqWith(superAdmin))).toBe(false)
    expect(auditTrailModifyDenied(reqWith(tenantUser))).toBe(false)
    expect(auditTrailModifyDenied(reqWith(undefined))).toBe(false)
  })
})
