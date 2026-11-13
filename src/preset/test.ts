import { describe, it, expect } from 'vitest'
import { PRESETS_SEEDED, declaredPresets, loadPresets, preset, seedPresets } from '@/preset'

describe('preset — a saved list is a row', () => {
  const p = preset('Quotes', 'sales-orders', { status: { in: ['sent'] } }, ['orderNumber', 'status'])

  it('binds a title, a filter and columns to one collection, shared with everyone', () => {
    expect(p).toMatchObject({ title: 'Quotes', relatedCollection: 'sales-orders', isShared: true, where: { status: { in: ['sent'] } } })
    expect(p.columns).toEqual([{ accessor: 'orderNumber', active: true }, { accessor: 'status', active: true }])
    expect(p.access.read.constraint).toBe('everyone')
  })

  it('loads idempotently, telling presets of one title apart by collection', async () => {
    const rows: Record<string, unknown>[] = []
    const payload = {
      find: async ({ where }: { where: { and: [{ title: { equals: string } }, { relatedCollection: { equals: string } }] } }) => ({
        docs: rows.filter((r) => r.title === where.and[0].title.equals && r.relatedCollection === where.and[1].relatedCollection.equals),
      }),
      create: async ({ data }: { data: Record<string, unknown> }) => { rows.push(data); return data },
    } as unknown as Parameters<typeof loadPresets>[0]
    const other = preset('Quotes', 'purchase-orders', {}, [])
    expect(await loadPresets(payload, [p, other])).toEqual({ created: 2, unchanged: 0 })
    expect(await loadPresets(payload, [p, other])).toEqual({ created: 0, unchanged: 2 })
  })
})

describe('preset — a deployment loads its own saved lists', () => {
  const fake = () => {
    const rows: Record<string, unknown>[] = []
    const seen: unknown[] = []
    const payload = {
      find: async ({ where, req }: { where: { and: [{ title: { equals: string } }, { relatedCollection: { equals: string } }] }; req?: unknown }) => {
        seen.push(req)
        return { docs: rows.filter((r) => r.title === where.and[0].title.equals && r.relatedCollection === where.and[1].relatedCollection.equals) }
      },
      create: async ({ data, req }: { data: Record<string, unknown>; req?: unknown }) => { seen.push(req); rows.push(data); return data },
    }
    return { payload, rows, seen }
  }

  it('declares the lists of every merged collection, each title once per collection', async () => {
    const all = await declaredPresets()
    const keys = all.map((p) => `${p.relatedCollection}:${p.title}`)
    expect(new Set(keys).size).toBe(keys.length)
    for (const c of ['parties', 'sales-orders', 'maintenance-work-orders', 'provisions', 'credit-memos']) expect(all.some((p) => p.relatedCollection === c), c).toBe(true)
  })

  it('loads them when a tenant is created, inside that request, and marks the context', async () => {
    const { payload, rows, seen } = fake()
    const req = { payload }
    const context: Record<string, unknown> = {}
    const doc = { id: 't1' }
    expect(await seedPresets({ doc, operation: 'create', req, context } as never)).toBe(doc)
    expect(rows.length).toBe((await declaredPresets()).length)
    expect(seen.every((r) => r === req)).toBe(true)
    expect(context[PRESETS_SEEDED]).toBe(true)
  })

  it('does nothing on an update, and nothing a second time in one request', async () => {
    const { payload, rows } = fake()
    await seedPresets({ doc: {}, operation: 'update', req: { payload }, context: {} } as never)
    await seedPresets({ doc: {}, operation: 'create', req: { payload }, context: { [PRESETS_SEEDED]: true } } as never)
    expect(rows).toHaveLength(0)
  })

  it('a failure is thrown, not swallowed', async () => {
    const payload = { find: async () => { throw new Error('database refused') }, create: async () => ({}) }
    await expect(seedPresets({ doc: {}, operation: 'create', req: { payload }, context: {} } as never)).rejects.toThrow(/database refused/)
  })
})
