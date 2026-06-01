import { describe, it, expect } from 'vitest'
import JournalEntries from './index'

// Unified-node invariant test for the `journal-entries` collection.
describe('journal-entries collection node', () => {
  it('exports a valid collection config', () => {
    expect(JournalEntries.slug).toBe('journal-entries')
    expect(Array.isArray(JournalEntries.fields)).toBe(true)
    expect(JournalEntries.fields.length).toBeGreaterThan(0)
  })
})
