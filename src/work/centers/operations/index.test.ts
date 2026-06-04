import { describe, it, expect } from 'vitest'
import Operations from '@/work/centers/operations'

// Unified-node invariant test for the `operations` collection.
describe('operations collection node', () => {
  it('exports a valid collection config', () => {
    expect(Operations.slug).toBe('operations')
    expect(Array.isArray(Operations.fields)).toBe(true)
    expect(Operations.fields.length).toBeGreaterThan(0)
  })
})
