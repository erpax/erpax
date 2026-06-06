import { describe, it, expect } from 'vitest'
import { typeUuid, sameType } from '@/quantum/type'

// Type identity = the content-uuid of its structural shape (structural typing by content-addressing).
describe('quantum/type — type identity as a content-uuid', () => {
  it('typeUuid is deterministic for a shape', () => {
    expect(typeUuid('{x:number}')).toBe(typeUuid('{x:number}'))
    expect(typeUuid('{x:number}')).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
  it('same shape ⇒ same type; different shape ⇒ different type', () => {
    expect(sameType('{x:number}', '{x:number}')).toBe(true)
    expect(sameType('{x:number}', '{x:string}')).toBe(false)
  })
})
