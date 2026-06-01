import { describe, it, expect } from 'vitest'
import createAccountingCollection from './index'

// Unified-node invariant test for the `leave-requests` collection.
describe('leave-requests collection node', () => {
  it('exports a valid collection config', () => {
    expect(createAccountingCollection.slug).toBe('leave-requests')
    expect(Array.isArray(createAccountingCollection.fields)).toBe(true)
    expect(createAccountingCollection.fields.length).toBeGreaterThan(0)
  })
})
