import { describe, it, expect } from 'vitest'
import PayrollRuns from './index'

// Unified-node invariant test for the `payroll-runs` collection.
describe('payroll-runs collection node', () => {
  it('exports a valid collection config', () => {
    expect(PayrollRuns.slug).toBe('payroll-runs')
    expect(Array.isArray(PayrollRuns.fields)).toBe(true)
    expect(PayrollRuns.fields.length).toBeGreaterThan(0)
  })
})
