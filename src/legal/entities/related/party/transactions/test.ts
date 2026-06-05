import { describe, it, expect } from 'vitest'
import { RelatedPartyTransactions } from '@/legal/entities/related/party/transactions'

// Unified-node invariant test for the `related-party-transactions` collection.
describe('related-party-transactions collection node', () => {
  it('exports a valid collection config', () => {
    expect(RelatedPartyTransactions.slug).toBe('related-party-transactions')
    expect(Array.isArray(RelatedPartyTransactions.fields)).toBe(true)
    expect(RelatedPartyTransactions.fields.length).toBeGreaterThan(0)
  })
})
