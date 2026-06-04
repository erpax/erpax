import { describe, it, expect } from 'vitest'
import ConsolidationEliminations from '@/consolidation/eliminations'

// Unified-node invariant test for the `consolidation-eliminations` collection.
describe('consolidation-eliminations collection node', () => {
  it('exports a valid collection config', () => {
    expect(ConsolidationEliminations.slug).toBe('consolidation-eliminations')
    expect(Array.isArray(ConsolidationEliminations.fields)).toBe(true)
    expect(ConsolidationEliminations.fields.length).toBeGreaterThan(0)
  })
})
