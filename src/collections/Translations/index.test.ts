import { describe, it, expect } from 'vitest'
import createAccountingCollection from './index'

// Unified-node invariant test for the `translations` collection.
describe('translations collection node', () => {
  it('exports a valid collection config', () => {
    expect(createAccountingCollection.slug).toBe('translations')
    expect(Array.isArray(createAccountingCollection.fields)).toBe(true)
    expect(createAccountingCollection.fields.length).toBeGreaterThan(0)
  })
})
