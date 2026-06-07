import { describe, it, expect } from 'vitest'
import type { Config } from 'payload'
import { uuidPlugin } from '@/uuid'

describe('uuid', () => {
  const plugin = uuidPlugin()

  // The plugin runs synchronously and returns a Config; the Payload `Plugin`
  // type widens the return to `Config | Promise<Config>`, so narrow it here.
  const apply = (config: unknown): Config => plugin(config as Config) as Config

  it('returns the config unchanged when collections is empty', () => {
    const result = apply({ collections: [] })
    expect(result.collections).toEqual([])
  })

  it('injects a uuid field at position 0 for a bare collection', () => {
    const result = apply({
      collections: [{ slug: 'invoices', fields: [{ name: 'amount', type: 'number' as const }] }],
    })
    const fields = result.collections![0].fields!
    expect(fields[0]).toMatchObject({ name: 'uuid', type: 'text' })
  })

  it('does NOT set required on the injected uuid field', () => {
    const result = apply({
      collections: [{ slug: 'orders', fields: [] }],
    })
    const uuidField = result.collections![0].fields![0] as Record<string, unknown>
    expect(uuidField.required).toBeUndefined()
  })

  it('appends a beforeChange hook to the collection hooks', () => {
    const result = apply({
      collections: [{ slug: 'products', fields: [] }],
    })
    const hooks = result.collections![0].hooks
    expect(hooks?.beforeChange).toHaveLength(1)
    expect(typeof hooks?.beforeChange![0]).toBe('function')
  })

  it('preserves existing beforeChange hooks, appending after them', () => {
    const existingHook = async () => ({})
    const result = apply({
      collections: [{ slug: 'items', fields: [], hooks: { beforeChange: [existingHook] } }],
    })
    const hooks = result.collections![0].hooks!.beforeChange!
    expect(hooks).toHaveLength(2)
    expect(hooks[0]).toBe(existingHook)
  })

  it('skips injection for a collection that already declares a uuid field', () => {
    const existingUuid = { name: 'uuid', type: 'text' as const }
    const result = apply({
      collections: [{ slug: 'legacy', fields: [existingUuid, { name: 'title', type: 'text' as const }] }],
    })
    const fields = result.collections![0].fields!
    // Must not duplicate the uuid field
    expect(
      fields.filter((f) => 'name' in f && (f as { name: string }).name === 'uuid'),
    ).toHaveLength(1)
    // Should have no injected beforeChange hook
    expect(result.collections![0].hooks?.beforeChange ?? []).toHaveLength(0)
  })

  it('handles multiple collections independently', () => {
    const result = apply({
      collections: [
        { slug: 'a', fields: [] },
        { slug: 'b', fields: [{ name: 'uuid', type: 'text' as const }] },
        { slug: 'c', fields: [{ name: 'price', type: 'number' as const }] },
      ],
    })
    const [a, b, c] = result.collections!
    expect((a.fields![0] as { name: string }).name).toBe('uuid')
    expect(b.fields!).toHaveLength(1) // untouched
    expect((c.fields![0] as { name: string }).name).toBe('uuid')
  })
})
