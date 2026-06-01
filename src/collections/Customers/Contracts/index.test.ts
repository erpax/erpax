import { describe, it, expect } from 'vitest'
import Contracts from './index'

// Unified-node invariant test for the `contracts` collection.
describe('contracts collection node', () => {
  it('exports a valid collection config', () => {
    expect(Contracts.slug).toBe('contracts')
    expect(Array.isArray(Contracts.fields)).toBe(true)
    expect(Contracts.fields.length).toBeGreaterThan(0)
  })
})
