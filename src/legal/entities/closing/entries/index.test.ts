import { describe, it, expect } from 'vitest'
import { ClosingEntries } from '@/legal/entities/closing/entries'

// Unified-node invariant test for the `closing-entries` collection.
describe('closing-entries collection node', () => {
  it('exports a valid collection config', () => {
    expect(ClosingEntries.slug).toBe('closing-entries')
    expect(Array.isArray(ClosingEntries.fields)).toBe(true)
    expect(ClosingEntries.fields.length).toBeGreaterThan(0)
  })
})
