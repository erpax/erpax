import { describe, expect, it } from 'vitest'
import { polymorphicId, relationId, relationIdString } from '@/field/relation'

describe('field/relation — the id inside a relationship value', () => {
  it('reads an unpopulated scalar and a populated document alike', () => {
    expect(relationId(7)).toBe(7)
    expect(relationId('abc')).toBe('abc')
    expect(relationId({ id: 7, name: 'x' })).toBe(7)
  })

  it('answers undefined for an absent or unreadable value', () => {
    for (const v of [undefined, null, {}, { id: null }, { id: {} }, []]) {
      expect(relationId(v)).toBeUndefined()
    }
  })

  // The variant that returned string|undefined stringified a numeric id. Callers keying a Map on it
  // depend on that, so it is a named export rather than a cast at each site.
  it('relationIdString stringifies without turning an absent id into "undefined"', () => {
    expect(relationIdString(7)).toBe('7')
    expect(relationIdString({ id: 7 })).toBe('7')
    expect(relationIdString(null)).toBeUndefined()
  })

  // A polymorphic relationship carries { relationTo, value }; relationId cannot see through it, and
  // silently answering undefined there is how a tag count goes to zero without an error.
  it('polymorphicId reads { value }, which relationId cannot', () => {
    expect(polymorphicId({ relationTo: 'posts', value: 3 })).toBe(3)
    expect(relationId({ relationTo: 'posts', value: 3 })).toBeUndefined()
    expect(polymorphicId({ id: 4 })).toBe(4)
    expect(polymorphicId(null)).toBeNull()
    expect(polymorphicId(5)).toBe(5)
  })
})
