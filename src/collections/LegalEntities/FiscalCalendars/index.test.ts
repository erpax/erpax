import { describe, it, expect } from 'vitest'
import { FiscalCalendars } from './index'

// Unified-node invariant test for the `fiscal-calendars` collection.
describe('fiscal-calendars collection node', () => {
  it('exports a valid collection config', () => {
    expect(FiscalCalendars.slug).toBe('fiscal-calendars')
    expect(Array.isArray(FiscalCalendars.fields)).toBe(true)
    expect(FiscalCalendars.fields.length).toBeGreaterThan(0)
  })
})
