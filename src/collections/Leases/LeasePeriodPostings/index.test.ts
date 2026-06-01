import { describe, it, expect } from 'vitest'
import LeasePeriodPostings from './index'

// Unified-node invariant test for the `lease-period-postings` collection.
describe('lease-period-postings collection node', () => {
  it('exports a valid collection config', () => {
    expect(LeasePeriodPostings.slug).toBe('lease-period-postings')
    expect(Array.isArray(LeasePeriodPostings.fields)).toBe(true)
    expect(LeasePeriodPostings.fields.length).toBeGreaterThan(0)
  })
})
