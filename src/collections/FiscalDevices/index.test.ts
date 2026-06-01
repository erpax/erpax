import { describe, it, expect } from 'vitest'
import FiscalDevices from './index'

// Unified-node invariant test for the `fiscal-devices` collection.
describe('fiscal-devices collection node', () => {
  it('exports a valid collection config', () => {
    expect(FiscalDevices.slug).toBe('fiscal-devices')
    expect(Array.isArray(FiscalDevices.fields)).toBe(true)
    expect(FiscalDevices.fields.length).toBeGreaterThan(0)
  })
})
