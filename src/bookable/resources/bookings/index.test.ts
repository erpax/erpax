import { describe, it, expect } from 'vitest'
import Bookings from '@/bookable/resources/bookings'

// Unified-node invariant test for the `bookings` collection.
describe('bookings collection node', () => {
  it('exports a valid collection config', () => {
    expect(Bookings.slug).toBe('bookings')
    expect(Array.isArray(Bookings.fields)).toBe(true)
    expect(Bookings.fields.length).toBeGreaterThan(0)
  })
})
