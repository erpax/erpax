import { describe, it, expect } from 'vitest'
import CurrencyRates from '@/currency/rates'

// Unified-node invariant test for the `currency-rates` collection.
describe('currency-rates collection node', () => {
  it('exports a valid collection config', () => {
    expect(CurrencyRates.slug).toBe('currency-rates')
    expect(Array.isArray(CurrencyRates.fields)).toBe(true)
    expect(CurrencyRates.fields.length).toBeGreaterThan(0)
  })
})
