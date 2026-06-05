import { describe, it, expect } from 'vitest'
import ExpenseReports from '@/employees/expense/reports'

// Unified-node invariant test for the `expense-reports` collection.
describe('expense-reports collection node', () => {
  it('exports a valid collection config', () => {
    expect(ExpenseReports.slug).toBe('expense-reports')
    expect(Array.isArray(ExpenseReports.fields)).toBe(true)
    expect(ExpenseReports.fields.length).toBeGreaterThan(0)
  })
})
