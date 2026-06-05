import { describe, it, expect } from 'vitest'
import KycChecks from '@/customers/kyc/checks'

// Unified-node invariant test for the `kyc-checks` collection.
describe('kyc-checks collection node', () => {
  it('exports a valid collection config', () => {
    expect(KycChecks.slug).toBe('kyc-checks')
    expect(Array.isArray(KycChecks.fields)).toBe(true)
    expect(KycChecks.fields.length).toBeGreaterThan(0)
  })
})
