import { describe, it, expect } from 'vitest'
import AccountReconciliations from '@/gl/accounts/account/reconciliations'

// Unified-node invariant test for the `account-reconciliations` collection.
describe('account-reconciliations collection node', () => {
  it('exports a valid collection config', () => {
    expect(AccountReconciliations.slug).toBe('account-reconciliations')
    expect(Array.isArray(AccountReconciliations.fields)).toBe(true)
    expect(AccountReconciliations.fields.length).toBeGreaterThan(0)
  })
})
