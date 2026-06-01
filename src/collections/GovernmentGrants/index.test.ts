import { describe, it, expect } from 'vitest'
import GovernmentGrants from './index'

// Unified-node invariant test for the `government-grants` collection.
describe('government-grants collection node', () => {
  it('exports a valid collection config', () => {
    expect(GovernmentGrants.slug).toBe('government-grants')
    expect(Array.isArray(GovernmentGrants.fields)).toBe(true)
    expect(GovernmentGrants.fields.length).toBeGreaterThan(0)
  })
})
