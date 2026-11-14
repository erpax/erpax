import { describe, it, expect } from 'vitest'
import { FiscalPeriods } from '@/collections/fiscal-periods'

// Unified-node invariant test for the `fiscal-periods` collection.
describe('fiscal-periods collection node', () => {
  it('keeps every version natively — the snapshot of each change (the folded fiscal-period-snapshots collection)', () => {
    expect(FiscalPeriods.versions).toEqual({ maxPerDoc: 0 }) // 0 = keep all: the config in force at a past posting is evidence
    expect(FiscalPeriods.fields.some((x) => 'name' in x && x.name === 'changeReason')).toBe(true)
  })
  it('exports a valid collection config', () => {
    expect(FiscalPeriods.slug).toBe('fiscal-periods')
    expect(Array.isArray(FiscalPeriods.fields)).toBe(true)
    expect(FiscalPeriods.fields.length).toBeGreaterThan(0)
  })
})
