import { describe, it, expect } from 'vitest'
import { vendorsPreset, vendorsWhere } from '@/vendors'

// vendors is no longer a collection: it is the vendor side of `parties`, as a filter and a saved list.
describe('vendors — a view of parties', () => {
  it('selects the parties holding the vendor role', () => {
    expect(vendorsWhere()).toEqual({ roles: { in: ['vendor'] } })
  })

  it('is a saved list over the parties collection, filtered by that role', () => {
    const preset = vendorsPreset()
    expect(preset.relatedCollection).toBe('parties')
    expect(preset.where).toEqual(vendorsWhere())
    expect(preset.columns.map((c) => c.accessor)).toContain('name')
  })
})
