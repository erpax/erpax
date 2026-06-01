import { describe, it, expect } from 'vitest'
import { ManagementCertifications } from './index'

// Unified-node invariant test for the `management-certifications` collection.
describe('management-certifications collection node', () => {
  it('exports a valid collection config', () => {
    expect(ManagementCertifications.slug).toBe('management-certifications')
    expect(Array.isArray(ManagementCertifications.fields)).toBe(true)
    expect(ManagementCertifications.fields.length).toBeGreaterThan(0)
  })
})
