import { describe, it, expect } from 'vitest'
import { RegulatoryReports } from './index'

// Unified-node invariant test for the `regulatory-reports` collection.
describe('regulatory-reports collection node', () => {
  it('exports a valid collection config', () => {
    expect(RegulatoryReports.slug).toBe('regulatory-reports')
    expect(Array.isArray(RegulatoryReports.fields)).toBe(true)
    expect(RegulatoryReports.fields.length).toBeGreaterThan(0)
  })
})
