import { describe, it, expect } from 'vitest'
import BudgetPlanning from '@/budget/plannings'

// Unified-node invariant test for the `budget-planning` collection.
describe('budget-planning collection node', () => {
  it('exports a valid collection config', () => {
    expect(BudgetPlanning.slug).toBe('budget-planning')
    expect(Array.isArray(BudgetPlanning.fields)).toBe(true)
    expect(BudgetPlanning.fields.length).toBeGreaterThan(0)
  })
})
