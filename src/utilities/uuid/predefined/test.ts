import { describe, it, expect } from 'vitest'
import { decodeStructured } from '@/utilities/uuid/format'
import { parse } from '@/utilities/uuid/handle'
import { catalogue, entry, indexOf, isPredefined, PREDEFINED_SCHEMA, shapeOf, SLOT_OF, tailOf } from '@/utilities/uuid/predefined'

describe('predefined — every built-in thing as a uuid program', () => {
  it('reuses an existing slot for each kind, at schema 0 with no capability', () => {
    for (const kind of ['app', 'provider', 'collection', 'role', 'locale'] as const) {
      const parts = decodeStructured(entry(kind, 'x').id)
      expect(parts.slotName).toBe(SLOT_OF[kind])
      expect(parts.schemaVersion).toBe(PREDEFINED_SCHEMA)
      expect(parts.capabilities).toBe(0)
    }
    expect(SLOT_OF).toEqual({ app: 'tenant', provider: 'kvBinding', collection: 'collectionRow', role: 'role', locale: 'locale' })
  })
  it('the id depends on kind and name only; the uuid also on the definition', () => {
    const a = entry('app', 'sales', { title: 'Sales' })
    const b = entry('app', 'sales', { title: 'Selling' })
    expect(a.id).toBe(b.id)
    expect(a.uuid).not.toBe(b.uuid)
    expect(a.id).not.toBe(a.uuid)
  })
  it('is the same every time, and differs by kind and by name', () => {
    expect(entry('role', 'admin')).toEqual(entry('role', 'admin'))
    expect(entry('role', 'admin').id).not.toBe(entry('locale', 'admin').id)
    expect(entry('role', 'admin').id).not.toBe(entry('role', 'user').id)
  })
  it('its handle reads back to its id, under a tail no collection can have', () => {
    const item = entry('provider', 'google')
    expect(parse(item.handle)!.uuid).toBe(item.id)
    expect(tailOf('provider')).toBe('@provider')
  })
  it('tells a predefined program from a tenant row in the same slot', () => {
    expect(isPredefined(entry('collection', 'invoices').uuid)).toBe(true)
    expect(isPredefined('0190a5b2-7c3d-4e41-9f20-3b5c6d7e8f90')).toBe(false)
    expect(isPredefined('not a uuid')).toBe(false)
  })
  it('a collection is defined by the shape its rows follow, whatever order the fields are written in', () => {
    const fields = [{ name: 'title', type: 'text' }, { type: 'row', fields: [{ name: 'party', type: 'relationship', relationTo: ['parties', 'users'] }] }, { name: 'lines', type: 'array', fields: [{ name: 'qty', type: 'number' }] }]
    expect(shapeOf(fields)).toEqual(['lines.qty:number', 'lines:array', 'party:relationship→parties|users', 'title:text'])
    expect(shapeOf([...fields].reverse())).toEqual(shapeOf(fields))
  })
  it('a catalogue lists every source, and is found by either uuid', () => {
    const entries = catalogue({
      apps: [{ slug: 'sales', title: 'Sales', anchors: ['invoices'] }],
      providers: [{ slug: 'google', title: 'Google Workspace', source: 'x' }],
      collections: [{ slug: 'invoices', fields: [{ name: 'title', type: 'text' }], custom: { app: 'sales' } }],
      roles: ['admin'],
      locales: ['bg'],
    })
    expect(entries.map((e) => `${e.kind}:${e.name}`)).toEqual(['app:sales', 'provider:google', 'collection:invoices', 'role:admin', 'locale:bg'])
    expect(entries[2]!.definition).toEqual({ app: 'sales', shape: ['title:text'] })
    const index = indexOf(entries)
    expect(index.size).toBe(10)
    expect(index.get(entries[0]!.id)).toBe(entries[0])
    expect(index.get(entries[0]!.uuid)).toBe(entries[0])
  })
  it('a changed collection shape changes its uuid and keeps its id', () => {
    const before = catalogue({ collections: [{ slug: 'invoices', fields: [{ name: 'title', type: 'text' }] }] })[0]!
    const after = catalogue({ collections: [{ slug: 'invoices', fields: [{ name: 'title', type: 'text' }, { name: 'total', type: 'number' }] }] })[0]!
    expect(after.id).toBe(before.id)
    expect(after.uuid).not.toBe(before.uuid)
  })
})
