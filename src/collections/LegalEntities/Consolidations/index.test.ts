import { describe, it, expect } from 'vitest'
import { Consolidations } from './index'

// Unified-node invariant test for the `consolidations` collection.
describe('consolidations collection node', () => {
  it('exports a valid collection config', () => {
    expect(Consolidations.slug).toBe('consolidations')
    expect(Array.isArray(Consolidations.fields)).toBe(true)
    expect(Consolidations.fields.length).toBeGreaterThan(0)
  })
})
