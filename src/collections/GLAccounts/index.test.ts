import { describe, it, expect } from 'vitest'
import GLAccounts from './index'

// Unified-node invariant test for the `gl-accounts` collection.
describe('gl-accounts collection node', () => {
  it('exports a valid collection config', () => {
    expect(GLAccounts.slug).toBe('gl-accounts')
    expect(Array.isArray(GLAccounts.fields)).toBe(true)
    expect(GLAccounts.fields.length).toBeGreaterThan(0)
  })
})
