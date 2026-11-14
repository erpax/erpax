import { describe, it, expect } from 'vitest'
import type { CollectionConfig, Field } from 'payload'
import { itemFieldNames, itemFields, skuFields, variantsOverride, withItemFields } from '@/components/ecommerce/catalogue'

// What the plugin's product and variant bring, reduced to the names the fold has to live beside.
const pluginProductFields = (): Field[] => [
  { name: 'inventory', type: 'number' },
  { name: 'enableVariants', type: 'checkbox' },
  { name: 'priceInEUR', type: 'number' },
]
const pluginVariant = (): CollectionConfig => ({
  slug: 'variants',
  admin: { group: false },
  fields: [{ name: 'title', type: 'text' }, { name: 'product', type: 'relationship', relationTo: 'products' }, { name: 'inventory', type: 'number' }],
})
const named = (fields: Field[]) => new Map(fields.flatMap((f) => ('name' in f ? [[f.name, f] as const] : [])))

describe('catalogue — the item master folded into the e-commerce plugin product', () => {
  it('adds the item master beside the plugin fields, which stay first and untouched', () => {
    const fields = withItemFields(pluginProductFields())
    expect(fields.slice(0, 3)).toEqual(pluginProductFields())
    expect(itemFieldNames()).toEqual(['code', 'sku', 'barcode', 'address', 'pricing', 'taxation', 'ledger', 'stock', 'physical', 'discounts', 'fulfillment', 'visibility', 'metadata'])
  })

  it('the item stock is `stock`, never the plugin `inventory` number the checkout decrements', () => {
    const fields = named(itemFields())
    expect(fields.has('inventory')).toBe(false)
    const stock = fields.get('stock')
    expect(stock?.type).toBe('group')
    const inner = stock?.type === 'group' ? stock.fields.map((f) => ('name' in f ? f.name : '')) : []
    expect(inner).toEqual(['inventoryQuantity', 'inventoryManagement', 'inventoryPolicy'])
  })

  it('code and owner are optional — a storefront-only product has neither', () => {
    const fields = named(itemFields())
    expect((fields.get('code') as { required?: boolean; unique?: boolean })).toMatchObject({ unique: true })
    expect((fields.get('code') as { required?: boolean }).required).toBeUndefined()
    expect((fields.get('address') as { required?: boolean }).required).toBeUndefined()
    expect(fields.has('name')).toBe(false) // the product title is the name
    expect(fields.has('product')).toBe(false) // an item no longer points at a product: it is one
  })

  it('keeps the GL and tax accounts pointing at the chart of accounts', () => {
    const group = (name: string) => { const g = named(itemFields()).get(name); return g?.type === 'group' ? named(g.fields) : new Map<string, Field>() }
    for (const [g, f] of [['ledger', 'debitAccount'], ['ledger', 'creditAccount'], ['taxation', 'taxDebitAccount'], ['taxation', 'taxCreditAccount']] as const) {
      expect((group(g).get(f) as { relationTo?: string }).relationTo, `${g}.${f}`).toBe('gl-accounts')
    }
  })

  it('refuses a plugin that grew a field the item master would shadow', () => {
    expect(() => withItemFields([...pluginProductFields(), { name: 'stock', type: 'number' }])).toThrow(/stock/)
    expect(() => withItemFields([...pluginProductFields(), { name: 'sku', type: 'text' }])).toThrow(/sku/)
  })
})

describe('catalogue — the SKU level is the plugin variant', () => {
  it('a variant carries its own unique sku and barcode', async () => {
    const folded = await variantsOverride({ defaultCollection: pluginVariant() })
    expect(folded.slug).toBe('variants')
    const fields = named(folded.fields)
    for (const f of skuFields()) {
      const name = 'name' in f ? f.name : ''
      expect(fields.get(name)).toMatchObject({ type: 'text', unique: true, index: true })
    }
    expect(folded.fields.slice(0, 3)).toEqual(pluginVariant().fields) // the plugin's own fields first
    expect(folded.admin?.group).not.toBe(false) // shown under the e-commerce nav group
  })
  it('refuses a plugin variant that already has a sku', () => {
    const taken = { ...pluginVariant(), fields: [...pluginVariant().fields, { name: 'sku', type: 'text' } as Field] }
    expect(() => variantsOverride({ defaultCollection: taken })).toThrow(/sku/)
  })
})
