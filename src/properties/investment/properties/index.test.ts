import { describe, it, expect } from 'vitest'
import InvestmentProperties from '@/properties/investment/properties'

// Unified-node invariant test for the `investment-properties` collection.
describe('investment-properties collection node', () => {
  it('exports a valid collection config', () => {
    expect(InvestmentProperties.slug).toBe('investment-properties')
    expect(Array.isArray(InvestmentProperties.fields)).toBe(true)
    expect(InvestmentProperties.fields.length).toBeGreaterThan(0)
  })
})
