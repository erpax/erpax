import { describe, it, expect } from 'vitest'
import { EntityTypes } from '@/entity/types'

// Unified-node invariant test for the `entity-types` collection.
describe('entity-types collection node', () => {
  it('exports a valid collection config', () => {
    expect(EntityTypes.slug).toBe('entity-types')
    expect(Array.isArray(EntityTypes.fields)).toBe(true)
    expect(EntityTypes.fields.length).toBeGreaterThan(0)
  })
})
