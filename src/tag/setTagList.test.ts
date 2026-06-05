import { describe, it, expect } from 'vitest'
import type { Payload } from 'payload'
import { findOrCreateTags, tagListOn, setTagList } from '@/tag/setTagList'

// A minimal in-memory Payload — enough to exercise the tag engine's
// find/create/delete with the `{ and: [{ field: { equals|in } }] }` shapes it
// uses, plus depth:1 population of `tag` on taggings (so tagListOn reads names).
interface Row { id: number; [k: string]: unknown }
function memPayload(): { payload: Payload; db: Record<string, Row[]> } {
  const db: Record<string, Row[]> = { tags: [], taggings: [] }
  let seq = 0
  const matchClause = (doc: Row, clause: Record<string, unknown>): boolean =>
    Object.entries(clause).every(([field, cond]) => {
      const c = cond as { equals?: unknown; in?: unknown[] }
      if (c && typeof c === 'object' && 'equals' in c) return String(doc[field]) === String(c.equals)
      if (c && typeof c === 'object' && 'in' in c) return (c.in ?? []).map(String).includes(String(doc[field]))
      return true
    })
  const matchWhere = (doc: Row, where: unknown): boolean => {
    if (!where) return true
    const w = where as { and?: unknown[] }
    if (w.and) return w.and.every((c) => matchWhere(doc, c))
    return matchClause(doc, where as Record<string, unknown>)
  }
  const populate = (collection: string, doc: Row, depth: number): Row => {
    if (collection === 'taggings' && depth >= 1 && doc.tag != null) {
      const tag = db.tags.find((t) => String(t.id) === String(doc.tag))
      if (tag) return { ...doc, tag }
    }
    return doc
  }
  const payload = {
    find: async ({ collection, where, depth = 0 }: { collection: string; where?: unknown; depth?: number }) => {
      const docs = db[collection].filter((d) => matchWhere(d, where)).map((d) => populate(collection, d, depth))
      return { docs, totalDocs: docs.length }
    },
    create: async ({ collection, data }: { collection: string; data: Record<string, unknown> }) => {
      const row: Row = { id: ++seq, ...data }
      db[collection].push(row)
      return row
    },
    delete: async ({ collection, id }: { collection: string; id: number | string }) => {
      db[collection] = db[collection].filter((d) => String(d.id) !== String(id))
      return { id }
    },
    findByID: async ({ collection, id }: { collection: string; id: number | string }) =>
      db[collection].find((d) => String(d.id) === String(id)) ?? null,
  } as unknown as Payload
  return { payload, db }
}

describe('tag/setTagList — save_tags + tag_list_on port (the write engine)', () => {
  it('find-or-creates tags, deduping by normalised name', async () => {
    const { payload, db } = memPayload()
    const ids1 = await findOrCreateTags(payload, ['Alpha', 'Beta'])
    expect(ids1.length).toBe(2)
    expect(db.tags.length).toBe(2)
    const ids2 = await findOrCreateTags(payload, ['alpha', 'Gamma']) // alpha already exists (lower-cased)
    expect(db.tags.length).toBe(3) // only gamma is new
    expect(ids2[0]).toBe(ids1[0]) // same id reused for alpha
  })

  it('reconciles taggings to the list and reads them back (add new, drop removed, clear)', async () => {
    const { payload, db } = memPayload()
    const target = { taggable: 'rec-uuid-1', taggableType: 'posts', context: 'topics' }

    const r1 = await setTagList(payload, target, 'ruby, rails, payload')
    expect(r1).toMatchObject({ added: 3, removed: 0 })
    expect(db.taggings.length).toBe(3)
    expect(await tagListOn(payload, target)).toEqual(['payload', 'rails', 'ruby']) // sorted names

    const r2 = await setTagList(payload, target, 'ruby, payload, nextjs') // drop rails, add nextjs
    expect(r2).toMatchObject({ added: 1, removed: 1 })
    expect(db.taggings.length).toBe(3)
    expect(await tagListOn(payload, target)).toEqual(['nextjs', 'payload', 'ruby'])

    const r3 = await setTagList(payload, target, '') // clear
    expect(r3.removed).toBe(3)
    expect(await tagListOn(payload, target)).toEqual([])
  })

  it('is idempotent — re-setting the same list changes nothing', async () => {
    const { payload, db } = memPayload()
    const target = { taggable: 'r', taggableType: 'posts', context: 'topics' }
    await setTagList(payload, target, 'a, b')
    const again = await setTagList(payload, target, 'b, a') // same set, different order
    expect(again).toMatchObject({ added: 0, removed: 0 })
    expect(db.taggings.length).toBe(2)
  })

  it('contexts and records isolate — no bleed across context or taggable', async () => {
    const { payload } = memPayload()
    const base = { taggableType: 'posts' }
    await setTagList(payload, { ...base, taggable: 'r1', context: 'topics' }, 'a, b')
    await setTagList(payload, { ...base, taggable: 'r1', context: 'moods' }, 'happy')
    await setTagList(payload, { ...base, taggable: 'r2', context: 'topics' }, 'c')
    expect(await tagListOn(payload, { ...base, taggable: 'r1', context: 'topics' })).toEqual(['a', 'b'])
    expect(await tagListOn(payload, { ...base, taggable: 'r1', context: 'moods' })).toEqual(['happy'])
    expect(await tagListOn(payload, { ...base, taggable: 'r2', context: 'topics' })).toEqual(['c'])
  })
})
