import { describe, it, expect } from 'vitest'
import { FiscalPeriods } from './index'

// Unified-node invariant test for the `fiscal-periods` collection.
describe('fiscal-periods collection node', () => {
  it('exports a valid collection config', () => {
    expect(FiscalPeriods.slug).toBe('fiscal-periods')
    expect(Array.isArray(FiscalPeriods.fields)).toBe(true)
    expect(FiscalPeriods.fields.length).toBeGreaterThan(0)
  })
})
