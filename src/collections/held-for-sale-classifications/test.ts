import { describe, it, expect } from 'vitest'
import HeldForSaleClassifications from '@/collections/held-for-sale-classifications'

// Unified-node invariant test for the `held-for-sale-classifications` collection.
describe('held-for-sale-classifications collection node', () => {
  it('exports a valid collection config', () => {
    expect(HeldForSaleClassifications.slug).toBe('held-for-sale-classifications')
    expect(Array.isArray(HeldForSaleClassifications.fields)).toBe(true)
    expect(HeldForSaleClassifications.fields.length).toBeGreaterThan(0)
  })
  it('names its source by one polymorphic relationship, not a slug and an id as text', () => {
    const names = HeldForSaleClassifications.fields.flatMap((x) => ('name' in x ? [x.name] : []))
    expect(names).not.toContain('sourceCollection')
    expect(names).not.toContain('sourceId')
    const source = HeldForSaleClassifications.fields.find((x) => 'name' in x && x.name === 'source') as { type?: string; relationTo?: unknown; required?: boolean }
    expect(source.type).toBe('relationship')
    expect(source.relationTo).toEqual(["fixed-assets","investment-properties","business-combinations"])
    expect(source.required).toBe(true)
  })
})
