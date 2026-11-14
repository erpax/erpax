import { describe, it, expect } from 'vitest'
import { Items } from '@/collections/items'

// Unified-node invariant test for the `items` collection.
describe('items collection node', () => {
  it('exports a valid collection config', () => {
    expect(Items.slug).toBe('items')
    expect(Array.isArray(Items.fields)).toBe(true)
    expect(Items.fields.length).toBeGreaterThan(0)
  })
  it('links to the storefront catalogue — optional product and variant relationships (the etrima item → variant → product chain)', () => {
    const rel = (name: string) => Items.fields.find((f) => 'name' in f && f.name === name) as { type?: string; relationTo?: string; required?: boolean; index?: boolean }
    expect(rel('product')).toMatchObject({ type: 'relationship', relationTo: 'products', index: true })
    expect(rel('variant')).toMatchObject({ type: 'relationship', relationTo: 'variants', index: true })
    expect(rel('product').required).toBeUndefined() // a purchased-only item has no storefront product
    expect(rel('variant').required).toBeUndefined()
  })
})
