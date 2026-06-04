import { describe, it, expect } from 'vitest'
import ConsentRecords from '@/consent/records'

// Unified-node invariant test for the `consent-records` collection.
describe('consent-records collection node', () => {
  it('exports a valid collection config', () => {
    expect(ConsentRecords.slug).toBe('consent-records')
    expect(Array.isArray(ConsentRecords.fields)).toBe(true)
    expect(ConsentRecords.fields.length).toBeGreaterThan(0)
  })
})
