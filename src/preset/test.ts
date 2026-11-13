import { describe, it, expect } from 'vitest'
import { loadPresets, preset } from '@/preset'

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
