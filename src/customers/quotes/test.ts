import { describe, it, expect } from 'vitest'
import Quotes from '@/customers/quotes'

// Unified-node invariant test for the `quotes` collection.
describe('quotes collection node', () => {
  it('exports a valid collection config', () => {
    expect(Quotes.slug).toBe('quotes')
    expect(Array.isArray(Quotes.fields)).toBe(true)
    expect(Quotes.fields.length).toBeGreaterThan(0)
  })
})
