import { describe, it, expect } from 'vitest'
import { InternalAuditFunction } from './index'

// Unified-node invariant test for the `internal-audit-function` collection.
describe('internal-audit-function collection node', () => {
  it('exports a valid collection config', () => {
    expect(InternalAuditFunction.slug).toBe('internal-audit-function')
    expect(Array.isArray(InternalAuditFunction.fields)).toBe(true)
    expect(InternalAuditFunction.fields.length).toBeGreaterThan(0)
  })
})
