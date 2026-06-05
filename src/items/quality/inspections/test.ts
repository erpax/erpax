import { describe, it, expect } from 'vitest'
import QualityInspections from '@/items/quality/inspections'

// Unified-node invariant test for the `quality-inspections` collection.
describe('quality-inspections collection node', () => {
  it('exports a valid collection config', () => {
    expect(QualityInspections.slug).toBe('quality-inspections')
    expect(Array.isArray(QualityInspections.fields)).toBe(true)
    expect(QualityInspections.fields.length).toBeGreaterThan(0)
  })
})
