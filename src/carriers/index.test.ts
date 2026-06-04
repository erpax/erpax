import { describe, it, expect } from 'vitest'
import Carriers from '@/carriers'

// Unified-node invariant test for the `carriers` collection.
describe('carriers collection node', () => {
  it('exports a valid collection config', () => {
    expect(Carriers.slug).toBe('carriers')
    expect(Array.isArray(Carriers.fields)).toBe(true)
    expect(Carriers.fields.length).toBeGreaterThan(0)
  })
})
