import { describe, it, expect } from 'vitest'
import PerformanceObligations, { completionError, varianceDays } from '@/collections/performance-obligations'

// Unified-node invariant test for the `performance-obligations` collection.
describe('performance-obligations collection node', () => {
  it('exports a valid collection config', () => {
    expect(PerformanceObligations.slug).toBe('performance-obligations')
    expect(Array.isArray(PerformanceObligations.fields)).toBe(true)
    expect(PerformanceObligations.fields.length).toBeGreaterThan(0)
  })

  it('carries its milestones as rows (folded from the contract-performance collection)', () => {
    expect(PerformanceObligations.fields.map((f) => ('name' in f ? f.name : undefined))).toContain('milestones')
  })
})

describe('performance-obligations — milestones (IFRS-15 §31-38)', () => {
  it('variance is actual minus planned, in days, once both exist', () => {
    expect(varianceDays('2026-03-01', '2026-03-11')).toBe(10)
    expect(varianceDays('2026-03-11', '2026-03-01')).toBe(-10)
    expect(varianceDays('2026-03-01', undefined)).toBeNull()
  })

  it('a completed milestone says when it completed', () => {
    expect(completionError(undefined, 'complete')).toMatch(/actual completion date/)
    expect(completionError('2026-03-11', 'complete')).toBe(true)
    expect(completionError(undefined, 'in_progress')).toBe(true)
  })
})
