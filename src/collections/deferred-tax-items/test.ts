import { describe, it, expect } from 'vitest'
import DeferredTaxItems from '@/collections/deferred-tax-items'

// Unified-node invariant test for the `deferred-tax-items` collection.
describe('deferred-tax-items collection node', () => {
  it('exports a valid collection config', () => {
    expect(DeferredTaxItems.slug).toBe('deferred-tax-items')
    expect(Array.isArray(DeferredTaxItems.fields)).toBe(true)
    expect(DeferredTaxItems.fields.length).toBeGreaterThan(0)
  })
  it('names its source by one polymorphic relationship, not a slug and an id as text', () => {
    const names = DeferredTaxItems.fields.flatMap((x) => ('name' in x ? [x.name] : []))
    expect(names).not.toContain('sourceCollection')
    expect(names).not.toContain('sourceId')
    const source = DeferredTaxItems.fields.find((x) => 'name' in x && x.name === 'source') as { type?: string; relationTo?: unknown; required?: boolean }
    expect(source.type).toBe('relationship')
    expect(source.relationTo).toEqual(["fixed-assets","inventory-movements","provisions"])
    expect(source.required).toBe(undefined)
  })
})
