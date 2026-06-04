import { describe, it, expect } from 'vitest'
import { SegmentReporting } from '@/legal/entities/segment/reportings'

// Unified-node invariant test for the `segment-reporting` collection.
describe('segment-reporting collection node', () => {
  it('exports a valid collection config', () => {
    expect(SegmentReporting.slug).toBe('segment-reporting')
    expect(Array.isArray(SegmentReporting.fields)).toBe(true)
    expect(SegmentReporting.fields.length).toBeGreaterThan(0)
  })
})
