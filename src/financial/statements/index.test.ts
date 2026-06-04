import { describe, it, expect } from 'vitest'
import FinancialStatements from '@/financial/statements'

// Unified-node invariant test for the `financial-statements` collection.
describe('financial-statements collection node', () => {
  it('exports a valid collection config', () => {
    expect(FinancialStatements.slug).toBe('financial-statements')
    expect(Array.isArray(FinancialStatements.fields)).toBe(true)
    expect(FinancialStatements.fields.length).toBeGreaterThan(0)
  })
})
