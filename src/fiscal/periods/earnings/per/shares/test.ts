import { describe, it, expect } from 'vitest'
import EarningsPerShare from '@/fiscal/periods/earnings/per/shares'

// Unified-node invariant test for the `earnings-per-share` collection.
describe('earnings-per-share collection node', () => {
  it('exports a valid collection config', () => {
    expect(EarningsPerShare.slug).toBe('earnings-per-share')
    expect(Array.isArray(EarningsPerShare.fields)).toBe(true)
    expect(EarningsPerShare.fields.length).toBeGreaterThan(0)
  })
})
