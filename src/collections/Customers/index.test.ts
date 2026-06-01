import { describe, it, expect } from 'vitest'
import { Customers } from './index'

// Unified-node invariant test for the `customers` collection.
describe('customers collection node', () => {
  it('exports a valid collection config', () => {
    expect(Customers.slug).toBe('customers')
    expect(Array.isArray(Customers.fields)).toBe(true)
    expect(Customers.fields.length).toBeGreaterThan(0)
  })
})
