import { describe, it, expect } from 'vitest'
import RegulatoryDeferralAccounts from './index'

// Unified-node invariant test for the `regulatory-deferral-accounts` collection.
describe('regulatory-deferral-accounts collection node', () => {
  it('exports a valid collection config', () => {
    expect(RegulatoryDeferralAccounts.slug).toBe('regulatory-deferral-accounts')
    expect(Array.isArray(RegulatoryDeferralAccounts.fields)).toBe(true)
    expect(RegulatoryDeferralAccounts.fields.length).toBeGreaterThan(0)
  })
})
