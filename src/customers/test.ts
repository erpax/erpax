import { describe, it, expect } from 'vitest'
import { customersPreset, customersWhere } from '@/customers'

// customers is no longer a collection: it is the customer side of `parties`, as a filter and a saved list.
describe('customers — a view of parties', () => {
  it('selects the parties holding the customer role', () => {
    expect(customersWhere()).toEqual({ roles: { in: ['customer'] } })
  })

  it('is a saved list over the parties collection, filtered by that role', () => {
    const preset = customersPreset()
    expect(preset.relatedCollection).toBe('parties')
    expect(preset.where).toEqual(customersWhere())
    expect(preset.columns.map((c) => c.accessor)).toContain('name')
  })
})
