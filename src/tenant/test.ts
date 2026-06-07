import { describe, it, expect } from 'vitest'
import { tenantIdFromRelation } from '@/tenant'

// tenant — the atom's face re-exports `tenantIdFromRelation`: normalise a Payload
// relationship value (id string OR a populated document) to the tenant id string,
// so the write path always seals against one isolated organization's boundary.
describe('tenant — tenantIdFromRelation normalises a relation to its tenant id', () => {
  it('passes a plain id string through unchanged', () => {
    expect(tenantIdFromRelation('tenant-1')).toBe('tenant-1')
  })

  it('extracts .id from a populated document', () => {
    expect(tenantIdFromRelation({ id: 'tenant-42' } as any)).toBe('tenant-42')
  })

  it('null / undefined map to null (no tenant, never a leak)', () => {
    expect(tenantIdFromRelation(null)).toBeNull()
    expect(tenantIdFromRelation(undefined)).toBeNull()
  })
})
