import { describe, it, expect } from 'vitest'
import * as barrel from './index'

describe('ecommerce/access — the canonical entry point', () => {
  it('offers every member the folder holds, so no caller reaches past the barrel', () => {
    expect(Object.hasOwn(barrel, 'isAdmin')).toBe(true)
    expect(Object.hasOwn(barrel, 'isCustomer')).toBe(true)
    expect(Object.hasOwn(barrel, 'isDocumentOwner')).toBe(true)
    expect(Object.hasOwn(barrel, 'adminOnlyFieldAccess')).toBe(true)
    expect(Object.hasOwn(barrel, 'customerOnlyFieldAccess')).toBe(true)
    expect(Object.hasOwn(barrel, 'adminOrPublishedStatus')).toBe(true)
  })

  it('offers exactly what it names — a barrel that grew a member silently is a face nobody reviewed', () => {
    expect(Object.keys(barrel).sort()).toEqual(['adminOnlyFieldAccess', 'adminOrPublishedStatus', 'commerceHasCustomerRole', 'commerceHasStaffRole', 'commerceHasTenantAdminRole', 'customerOnlyFieldAccess', 'isAdmin', 'isCustomer', 'isDocumentOwner'])
  })
})

// The products read rule: an anonymous list is a list. A refusal here became a 500 on the page.
describe('ecommerce/access — an anonymous products read is a filter, never a refusal', () => {
  it('scopes to published rows of public tenants, and matches nothing when there are none', async () => {
    const { vi } = await import('vitest')
    const ids: number[][] = [[], [7]]
    vi.doMock('@/allow/public/read/tenant', () => ({ getAllowPublicReadTenantIds: async () => ids.shift() }))
    vi.resetModules()
    const { adminOrPublishedStatus } = await import('@/ecommerce/access/adminOrPublishedStatus')
    const req = { user: null, payload: {} } as never
    expect(await adminOrPublishedStatus({ req } as never)).toEqual({ and: [{ _status: { equals: 'published' } }, { tenant: { in: [] } }] })
    expect(await adminOrPublishedStatus({ req } as never)).toEqual({ and: [{ _status: { equals: 'published' } }, { tenant: { in: [7] } }] })
    vi.doUnmock('@/allow/public/read/tenant')
  })
})
