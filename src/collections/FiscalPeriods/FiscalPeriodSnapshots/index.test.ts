import { describe, it, expect } from 'vitest'
import { FiscalPeriodSnapshots } from './index'

// Unified-node invariant test for the `fiscal-period-snapshots` collection.
describe('fiscal-period-snapshots collection node', () => {
  it('exports a valid collection config', () => {
    expect(FiscalPeriodSnapshots.slug).toBe('fiscal-period-snapshots')
    expect(Array.isArray(FiscalPeriodSnapshots.fields)).toBe(true)
    expect(FiscalPeriodSnapshots.fields.length).toBeGreaterThan(0)
  })
})
