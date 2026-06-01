import { describe, it, expect } from 'vitest'
import { AuditSamples } from './index'

// Unified-node invariant test for the `audit-samples` collection.
describe('audit-samples collection node', () => {
  it('exports a valid collection config', () => {
    expect(AuditSamples.slug).toBe('audit-samples')
    expect(Array.isArray(AuditSamples.fields)).toBe(true)
    expect(AuditSamples.fields.length).toBeGreaterThan(0)
  })
})
