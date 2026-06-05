import { describe, it, expect } from 'vitest'
import BeneficialOwners from '@/legal/entities/beneficial/owners'

// Unified-node invariant test for the `beneficial-owners` collection.
describe('beneficial-owners collection node', () => {
  it('exports a valid collection config', () => {
    expect(BeneficialOwners.slug).toBe('beneficial-owners')
    expect(Array.isArray(BeneficialOwners.fields)).toBe(true)
    expect(BeneficialOwners.fields.length).toBeGreaterThan(0)
  })
})
