import { describe, it, expect } from 'vitest'
import { tenantIdFromRelation } from '@/tenant'

describe('tenant', () => {
  it('returns null for null input', () => {
    expect(tenantIdFromRelation(null)).toBeNull()
  })

  it('returns null for undefined input', () => {
    expect(tenantIdFromRelation(undefined)).toBeNull()
  })

  it('returns the string directly when given a plain id string', () => {
    expect(tenantIdFromRelation('abc123')).toBe('abc123')
  })

  it('extracts .id from a populated object', () => {
    const tenantDoc = { id: 'tenant-42', name: 'Acme' } as unknown as Parameters<typeof tenantIdFromRelation>[0]
    expect(tenantIdFromRelation(tenantDoc)).toBe('tenant-42')
  })

  it('distinguishes object path from string path — same id value, different input shape', () => {
    const asString = 'xyz'
    const asObject = { id: 'xyz' } as unknown as Parameters<typeof tenantIdFromRelation>[0]
    expect(tenantIdFromRelation(asString)).toBe(tenantIdFromRelation(asObject))
  })

  it('returns empty string when object has empty string id', () => {
    const tenantDoc = { id: '' } as unknown as Parameters<typeof tenantIdFromRelation>[0]
    // object branch: returns tenant.id, even if empty
    expect(tenantIdFromRelation(tenantDoc)).toBe('')
  })

  it('returns an empty string input unchanged (string branch)', () => {
    expect(tenantIdFromRelation('')).toBe('')
  })
})
