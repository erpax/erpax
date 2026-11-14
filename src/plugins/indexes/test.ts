import { describe, it, expect } from 'vitest'
import type { CollectionConfig, Config, Field } from 'payload'
import { indexesPlugin, withIndexes } from '@/plugins/indexes'

const tenant = { name: 'tenant', type: 'relationship', relationTo: 'tenants' } as unknown as Field
const invoices: CollectionConfig = {
  slug: 'invoices',
  admin: { useAsTitle: 'title' },
  fields: [tenant, { name: 'number', type: 'text', unique: true, index: true }, { name: 'uuid', type: 'text', unique: true }, { name: 'title', type: 'text' }, { name: 'note', type: 'text' }],
}
const options = { tenantScoped: ['invoices'] }
const field = (c: CollectionConfig, name: string) => c.fields.find((f) => 'name' in f && f.name === name) as Record<string, unknown>

describe('withIndexes — unique is per tenant, the title is indexed', () => {
  const out = withIndexes(invoices, options)
  it('turns a unique field of a tenant-scoped collection into a compound unique index with the tenant', () => {
    expect(out.indexes).toEqual([{ fields: ['tenant', 'number'], unique: true }])
    expect(field(out, 'number').unique).toBe(undefined)
    expect(field(out, 'number').index).toBe(undefined)
  })
  it('leaves the content address collection-wide', () => {
    expect(field(out, 'uuid').unique).toBe(true)
  })
  it('indexes the title field, and no other', () => {
    expect(field(out, 'title').index).toBe(true)
    expect(field(out, 'note').index).toBe(undefined)
  })
  it('keeps unique fields where the collection is not split by tenant, or has no tenant field', () => {
    expect(field(withIndexes(invoices, { tenantScoped: [] }), 'number').unique).toBe(true)
    const bare = { ...invoices, fields: invoices.fields.filter((f) => f !== tenant) }
    expect(field(withIndexes(bare, options), 'number').unique).toBe(true)
    expect(withIndexes(bare, options).indexes).toBe(undefined)
  })
  it('adds to the indexes a collection already has and does not repeat one', () => {
    const had = withIndexes({ ...invoices, indexes: [{ fields: ['tenant', 'number'], unique: true }, { fields: ['title', 'note'] }] }, options)
    expect(had.indexes).toEqual([{ fields: ['tenant', 'number'], unique: true }, { fields: ['title', 'note'] }])
    expect(field(had, 'number').unique).toBe(undefined)
  })
  it('a title that is already unique or virtual is left alone', () => {
    const unique = withIndexes({ slug: 'a', admin: { useAsTitle: 'code' }, fields: [{ name: 'code', type: 'text', unique: true }] }, { tenantScoped: [] })
    expect(field(unique, 'code').index).toBe(undefined)
    const virtual = withIndexes({ slug: 'b', admin: { useAsTitle: 'label' }, fields: [{ name: 'label', type: 'text', virtual: true }] }, { tenantScoped: [] })
    expect(field(virtual, 'label').index).toBe(undefined)
  })
  it('leaves a localized unique field as it is — the adapter cannot index it together with the tenant', () => {
    const localized = withIndexes({ slug: 'invoices', fields: [tenant, { name: 'label', type: 'text', unique: true, localized: true }] }, options)
    expect(field(localized, 'label').unique).toBe(true)
    expect(localized.indexes).toBe(undefined)
  })
  it('as a plugin it applies to every collection', () => {
    const config = indexesPlugin(options)({ collections: [invoices, { slug: 'x', fields: [] }] } as unknown as Config) as Config
    expect(config.collections![0]!.indexes).toEqual([{ fields: ['tenant', 'number'], unique: true }])
    expect(config.collections![1]!.indexes).toBe(undefined)
  })
})
