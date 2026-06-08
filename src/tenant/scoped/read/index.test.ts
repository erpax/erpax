/**
 * tenantScopedRead tests — multi-tenant boundary enforcement.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.3 information-access-restriction
 * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see docs/STANDARDS.md §4.4 §7
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

import { authenticatedOrPublished } from '@/authenticated/or/published'
import {
  tenantScopedCollectionReadAccess,
  tenantScopedPostsReadAccess,
} from '@/tenant/scoped/read'
import { wherePublished } from '@/scope'

const getAllowPublicReadTenantIds = vi.fn()

vi.mock('@/allow/public/read/tenant', () => ({
  getAllowPublicReadTenantIds: (...args: unknown[]) => getAllowPublicReadTenantIds(...args),
  clearAllowPublicReadTenantIdsCache: vi.fn(),
}))

describe('tenantScopedRead access', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const anonReq = { user: null, payload: {} } as Parameters<typeof tenantScopedCollectionReadAccess>[0]['req']
  const authReq = { user: { id: 1 }, payload: {} } as unknown as Parameters<
    typeof tenantScopedCollectionReadAccess
  >[0]['req']

  describe('tenantScopedCollectionReadAccess', () => {
    it('allows any authenticated user', async () => {
      await expect(tenantScopedCollectionReadAccess({ req: authReq })).resolves.toBe(true)
    })

    it('denies anonymous when no public-read tenants', async () => {
      getAllowPublicReadTenantIds.mockResolvedValueOnce([])
      await expect(tenantScopedCollectionReadAccess({ req: anonReq })).resolves.toBe(false)
    })

    it('scopes anonymous reads to public tenants', async () => {
      getAllowPublicReadTenantIds.mockResolvedValueOnce([10, 20])
      await expect(tenantScopedCollectionReadAccess({ req: anonReq })).resolves.toEqual({
        tenant: { in: [10, 20] },
      })
    })
  })

  describe('tenantScopedPostsReadAccess', () => {
    it('allows any authenticated user', async () => {
      await expect(tenantScopedPostsReadAccess({ req: authReq })).resolves.toBe(true)
    })

    it('denies anonymous when no public-read tenants', async () => {
      getAllowPublicReadTenantIds.mockResolvedValueOnce([])
      await expect(tenantScopedPostsReadAccess({ req: anonReq })).resolves.toBe(false)
    })

    it('requires published + tenant for anonymous', async () => {
      getAllowPublicReadTenantIds.mockResolvedValueOnce([7])
      await expect(tenantScopedPostsReadAccess({ req: anonReq })).resolves.toEqual({
        and: [wherePublished, { tenant: { in: [7] } }],
      })
    })
  })
})

describe('authenticatedOrPublished', () => {
  it('allows authenticated users without status filter', () => {
    const result = authenticatedOrPublished({
      req: { user: { id: 1 } } as never,
    } as never)
    expect(result).toBe(true)
  })

  it('restricts guests to published documents', () => {
    const result = authenticatedOrPublished({
      req: { user: null } as never,
    } as never)
    expect(result).toEqual(wherePublished)
  })
})
