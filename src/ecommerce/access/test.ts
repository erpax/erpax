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
