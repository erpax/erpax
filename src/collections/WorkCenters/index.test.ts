import { describe, it, expect } from 'vitest'
import WorkCenters from './index'

// Unified-node invariant test for the `work-centers` collection.
describe('work-centers collection node', () => {
  it('exports a valid collection config', () => {
    expect(WorkCenters.slug).toBe('work-centers')
    expect(Array.isArray(WorkCenters.fields)).toBe(true)
    expect(WorkCenters.fields.length).toBeGreaterThan(0)
  })
})
