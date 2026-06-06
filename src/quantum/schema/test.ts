import { describe, it, expect } from 'vitest'
import { schemaUuid, sameSchema, drifted } from '@/quantum/schema'

// Schema identity = the content-uuid of its canonical form; any change → new uuid → re-verify.
describe('quantum/schema — schema identity + drift as a content-uuid', () => {
  it('schemaUuid is deterministic for a canonical form', () => {
    expect(schemaUuid('{name,price}')).toBe(schemaUuid('{name,price}'))
    expect(schemaUuid('{name,price}')).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
  it('same shape ⇒ same schema (merge); different shape ⇒ different', () => {
    expect(sameSchema('{name,price}', '{name,price}')).toBe(true)
    expect(sameSchema('{name,price}', '{name,price,tax}')).toBe(false)
  })
  it('a schema change drifts from its published version (re-verify by architecture)', () => {
    const v1 = schemaUuid('{name,price}')
    expect(drifted(v1, '{name,price}')).toBe(false)
    expect(drifted(v1, '{name,price,tax}')).toBe(true)
  })
})
