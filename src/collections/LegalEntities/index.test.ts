import { describe, it, expect } from 'vitest'
import LegalEntities from './index'

// Unified-node invariant test for the `legal-entities` collection.
describe('legal-entities collection node', () => {
  it('exports a valid collection config', () => {
    expect(LegalEntities.slug).toBe('legal-entities')
    expect(Array.isArray(LegalEntities.fields)).toBe(true)
    expect(LegalEntities.fields.length).toBeGreaterThan(0)
  })
})
