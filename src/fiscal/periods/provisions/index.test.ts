import { describe, it, expect } from 'vitest'
import Provisions from '@/fiscal/periods/provisions'

// Unified-node invariant test for the `provisions` collection.
describe('provisions collection node', () => {
  it('exports a valid collection config', () => {
    expect(Provisions.slug).toBe('provisions')
    expect(Array.isArray(Provisions.fields)).toBe(true)
    expect(Provisions.fields.length).toBeGreaterThan(0)
  })
})
