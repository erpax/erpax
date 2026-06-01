import { describe, it, expect } from 'vitest'
import FinancialProfiles from './index'

// Unified-node invariant test for the `financial-profiles` collection.
describe('financial-profiles collection node', () => {
  it('exports a valid collection config', () => {
    expect(FinancialProfiles.slug).toBe('financial-profiles')
    expect(Array.isArray(FinancialProfiles.fields)).toBe(true)
    expect(FinancialProfiles.fields.length).toBeGreaterThan(0)
  })
})
