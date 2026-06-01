import { describe, it, expect } from 'vitest'
import WorkOrders from './index'

// Unified-node invariant test for the `work-orders` collection.
describe('work-orders collection node', () => {
  it('exports a valid collection config', () => {
    expect(WorkOrders.slug).toBe('work-orders')
    expect(Array.isArray(WorkOrders.fields)).toBe(true)
    expect(WorkOrders.fields.length).toBeGreaterThan(0)
  })
})
