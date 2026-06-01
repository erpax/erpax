import { describe, it, expect } from 'vitest'
import DunningCycles from './index'

// Unified-node invariant test for the `dunning-cycles` collection.
describe('dunning-cycles collection node', () => {
  it('exports a valid collection config', () => {
    expect(DunningCycles.slug).toBe('dunning-cycles')
    expect(Array.isArray(DunningCycles.fields)).toBe(true)
    expect(DunningCycles.fields.length).toBeGreaterThan(0)
  })
})
