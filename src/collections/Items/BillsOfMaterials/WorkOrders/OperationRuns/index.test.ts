import { describe, it, expect } from 'vitest'
import OperationRuns from './index'

// Unified-node invariant test for the `operation-runs` collection.
describe('operation-runs collection node', () => {
  it('exports a valid collection config', () => {
    expect(OperationRuns.slug).toBe('operation-runs')
    expect(Array.isArray(OperationRuns.fields)).toBe(true)
    expect(OperationRuns.fields.length).toBeGreaterThan(0)
  })
})
