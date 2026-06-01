import { describe, it, expect } from 'vitest'
import DataSubjectRequests from './index'

// Unified-node invariant test for the `data-subject-requests` collection.
describe('data-subject-requests collection node', () => {
  it('exports a valid collection config', () => {
    expect(DataSubjectRequests.slug).toBe('data-subject-requests')
    expect(Array.isArray(DataSubjectRequests.fields)).toBe(true)
    expect(DataSubjectRequests.fields.length).toBeGreaterThan(0)
  })
})
