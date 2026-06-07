import { describe, it, expect } from 'vitest'
import { categoriesBeforeChange } from '@/categories/hooks'
import { enforceDocumentTenantForUser } from '@/enforce/document/tenant/for/user'

// The Categories collection-module boundary (./index.ts barrel): the beforeChange
// chain is one ordered barrel that tenant-pins every row at the write boundary.
describe('categories/hooks — the category collection-module boundary', () => {
  it('exports an ordered beforeChange chain', () => {
    expect(Array.isArray(categoriesBeforeChange)).toBe(true)
    expect(categoriesBeforeChange.length).toBeGreaterThan(0)
    for (const hook of categoriesBeforeChange) {
      expect(typeof hook).toBe('function')
    }
  })

  it('the chain pins tenant — enforceDocumentTenantForUser is on the write path', () => {
    expect(categoriesBeforeChange).toContain(enforceDocumentTenantForUser)
  })
})
