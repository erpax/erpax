import { describe, it, expect } from 'vitest'
import Terminals from '@/terminals'

// Unified-node invariant test for the `terminals` collection.
describe('terminals collection node', () => {
  it('exports a valid collection config', () => {
    expect(Terminals.slug).toBe('terminals')
    expect(Array.isArray(Terminals.fields)).toBe(true)
    expect(Terminals.fields.length).toBeGreaterThan(0)
  })
})
