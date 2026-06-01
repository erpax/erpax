import { describe, it, expect } from 'vitest'
import { RemediationPlans } from './index'

// Unified-node invariant test for the `remediation-plans` collection.
describe('remediation-plans collection node', () => {
  it('exports a valid collection config', () => {
    expect(RemediationPlans.slug).toBe('remediation-plans')
    expect(Array.isArray(RemediationPlans.fields)).toBe(true)
    expect(RemediationPlans.fields.length).toBeGreaterThan(0)
  })
})
