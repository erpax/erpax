import { describe, it, expect } from 'vitest'
import Connections from '@/connections'

// connections — the ONE universal directed edge between two typeless users
// (./index.ts). The edge — never the user — carries the relation in `context`;
// B2B/C2B/C2C/B2G are directions on this single `from → to` graph, never
// separate collections. Asserts the real static CollectionConfig invariants.
describe('connections — the one directed social/commercial/civic edge', () => {
  it('is a single `connections` collection (all platforms merge onto one graph)', () => {
    expect(Connections.slug).toBe('connections')
    expect(Connections.admin?.useAsTitle).toBe('context')
    expect(Connections.timestamps).toBe(true)
  })

  const fieldByName = (name: string) =>
    Connections.fields.find((f) => 'name' in f && f.name === name)

  it('carries the relation on the edge: from → to are required user relationships', () => {
    for (const end of ['from', 'to'] as const) {
      const f = fieldByName(end)
      expect(f?.type).toBe('relationship')
      // narrowed by type guard below.
      if (f && f.type === 'relationship') {
        expect(f.relationTo).toBe('users')
        expect(f.required).toBe(true)
      }
    }
  })

  it('the `context` select IS the dimension — one field, every direction', () => {
    const ctx = fieldByName('context')
    expect(ctx?.type).toBe('select')
    if (ctx && ctx.type === 'select') {
      expect(ctx.required).toBe(true)
      expect(ctx.defaultValue).toBe('follow')
      const values = ctx.options.map((o) => (typeof o === 'string' ? o : o.value))
      // social · commercial · employment · civic all live on the one axis.
      for (const v of ['follow', 'block', 'customer', 'supplier', 'employer', 'governs', 'regulated_by']) {
        expect(values).toContain(v)
      }
    }
  })

  it('derives `reciprocal` (read-only) — mutuality is computed, not user-set', () => {
    const f = fieldByName('reciprocal')
    expect(f?.type).toBe('checkbox')
    if (f && f.type === 'checkbox') {
      expect(f.defaultValue).toBe(false)
      expect(f.admin?.readOnly).toBe(true)
    }
  })
})
