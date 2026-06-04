import { describe, it, expect } from 'vitest'
import createAccountingCollection from '@/standards'

// Unified-node invariant test for the `standards` collection.
describe('standards collection node', () => {
  it('exports a valid collection config', () => {
    expect(createAccountingCollection.slug).toBe('standards')
    expect(Array.isArray(createAccountingCollection.fields)).toBe(true)
    expect(createAccountingCollection.fields.length).toBeGreaterThan(0)
  })
})
