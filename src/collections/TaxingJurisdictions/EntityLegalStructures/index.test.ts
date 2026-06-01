import { describe, it, expect } from 'vitest'
import { EntityLegalStructures } from './index'

// Unified-node invariant test for the `entity-legal-structures` collection.
describe('entity-legal-structures collection node', () => {
  it('exports a valid collection config', () => {
    expect(EntityLegalStructures.slug).toBe('entity-legal-structures')
    expect(Array.isArray(EntityLegalStructures.fields)).toBe(true)
    expect(EntityLegalStructures.fields.length).toBeGreaterThan(0)
  })
})
