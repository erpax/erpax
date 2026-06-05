/**
 * taggings/counter — the `taggings_count` counter cache (port of the gem's
 * `counter_cache: true` on `Tagging.belongs_to :tag`). One source of truth for
 * the denormalised use-count that drives most/least-used and tag clouds: every
 * tagging CREATE increments its tag's `taggingsCount`, every DELETE decrements.
 *
 * Wired as a taggings lifecycle hook (not inside `setTagList`) so EVERY write
 * path stays correct — the reconcile engine, a direct create, a cascade delete.
 * Best-effort + guarded (a counter slip must never break the original write);
 * the read-modify-write is not atomic, the same accepted trade-off as the gem
 * outside a locking transaction.
 *
 * @audit ISO-19011:2018 audit-trail denormalised-aggregate
 * @see ./index.ts (wires these) · ../index.ts (the Tags.taggingsCount field) · ../../tag/setTagList.ts
 */
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Payload } from 'payload'
import type { CollectionSlug } from 'payload'

const relId = (v: unknown): string | number | null => {
  if (v == null) return null
  if (typeof v === 'object') {
    const o = v as { value?: string | number; id?: string | number }
    return o.value ?? o.id ?? null
  }
  return v as string | number
}

/** Adjust a tag's `taggingsCount` by ±1, clamped at 0. Guarded — never throws into the caller. */
async function adjustCount(payload: Payload, tagId: string | number | null, delta: number): Promise<void> {
  if (tagId == null) return
  try {
    const tag = (await payload.findByID({
      collection: 'tags' as CollectionSlug,
      id: tagId,
      depth: 0,
      overrideAccess: true,
    })) as { taggingsCount?: number } | null
    const current = typeof tag?.taggingsCount === 'number' ? tag.taggingsCount : 0
    await payload.update({
      collection: 'tags' as CollectionSlug,
      id: tagId,
      data: { taggingsCount: Math.max(0, current + delta) },
      overrideAccess: true,
    })
  } catch {
    /* best-effort counter cache — a slip must not break the tagging write */
  }
}

/** afterChange — a newly CREATED tagging increments its tag's use-count. */
export const taggingCounterAfterChange: CollectionAfterChangeHook = async ({ operation, doc, req }) => {
  if (operation === 'create') {
    await adjustCount(req.payload, relId((doc as { tag?: unknown }).tag), +1)
  }
  return doc
}

/** afterDelete — a removed tagging decrements its tag's use-count. */
export const taggingCounterAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  await adjustCount(req.payload, relId((doc as { tag?: unknown }).tag), -1)
  return doc
}
