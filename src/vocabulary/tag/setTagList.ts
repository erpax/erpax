/**
 * tag/setTagList — port of acts_as_taggable_on `Core#save_tags` + `tag_list_on`:
 * the WRITE engine that makes "a text field replaced by computed taggings" real.
 *
 * `setTagList(payload, target, "a, b, c")` parses the string, find-or-creates the
 * tags (content-uuid dedup REPLACES the gem's `find_or_create_all_with_like` +
 * unique-index race — same name ⇒ same id), then reconciles: create the taggings
 * that are new, delete the ones dropped. `tagListOn` is the read companion —
 * the names a record currently carries in a context (the gem's `<context>_list`).
 *
 * The polymorphic target is referenced by content-uuid (`taggable`) + slug
 * (`taggableType`), the same two plain columns `taggedWith` reads and the
 * `taggable` plugin injects (one column for all targets, under D1's 100-col cap).
 *
 * The `taggingsCount` counter cache is NOT touched here — it is maintained by the
 * taggings counter hook (`tags/taggings/counter`), the single source of truth, so
 * EVERY write path (this engine, a direct create, a cascade delete) stays correct.
 *
 * @standard ISO-25964-1:2011 thesaurus assignment
 * @standard RFC-4122 §4.3 uuid content-addressed-dedup
 * @see ./list.ts (parse/reconcile) · ./taggedWith.ts (reverse read) · ../tags/taggings/counter.ts
 */
import type { CollectionSlug, Payload, Where } from 'payload'
import { parseTagList, reconcileTags } from './list'

/** The default tagging context (the gem's `:tags`). */
export const DEFAULT_CONTEXT = 'tags'

/** A record to tag: its content-uuid + collection slug, with optional context/tenant/tagger scope. */
export interface TagTarget {
  /** The target record's content-uuid (the `taggable` column). */
  readonly taggable: string
  /** The target record's collection slug (the `taggableType` column). */
  readonly taggableType: string
  /** Tag context / namespace (the gem's `:on`); default 'tags'. */
  readonly context?: string
  /** Tenant isolation (matches the auto-populated `tenant` on tags/taggings). */
  readonly tenantId?: string | number
  /** Restrict to taggings applied by this tagger (the gem's `owned_by`). */
  readonly taggerId?: string | number
}

/** Normalise a relationship value (id, populated `{ id }`, or `{ value }`) to its id. */
const relId = (v: unknown): string | number | null => {
  if (v == null) return null
  if (typeof v === 'object') {
    const o = v as { value?: string | number; id?: string | number }
    return o.value ?? o.id ?? null
  }
  return v as string | number
}

const tenantClauseOf = (tenantId?: string | number): Where[] =>
  tenantId != null ? [{ tenant: { equals: tenantId } } as Where] : []

/**
 * Find-or-create tags by name (the gem's `find_or_create_all_with_like_by_name`).
 * Content-uuid makes create idempotent (same name+tenant ⇒ same id), so this is
 * a find-by-name then create-the-missing. Returns the tag ids, deduped, in order.
 */
export async function findOrCreateTags(
  payload: Payload,
  names: readonly string[],
  tenantId?: string | number,
): Promise<Array<string | number>> {
  const clean = parseTagList(names) // normalise + dedupe even if already split
  if (clean.length === 0) return []
  const existing = await payload.find({
    collection: 'tags' as CollectionSlug,
    where: { and: [{ name: { in: clean } }, ...tenantClauseOf(tenantId)] } as Where,
    limit: 10_000,
    depth: 0,
    pagination: false,
    overrideAccess: true,
  })
  const byName = new Map<string, string | number>()
  for (const d of existing.docs as Array<{ id: string | number; name?: string }>) {
    if (d.name) byName.set(d.name, d.id)
  }
  const ids: Array<string | number> = []
  for (const name of clean) {
    let id = byName.get(name)
    if (id == null) {
      const created = await payload.create({
        collection: 'tags' as CollectionSlug,
        data: { name, ...(tenantId != null ? { tenant: tenantId } : {}) } as Record<string, unknown>,
        overrideAccess: true,
      })
      id = created.id
      byName.set(name, id)
    }
    ids.push(id)
  }
  return ids
}

/** Build the `taggings` filter for a (taggable, type, context [, tagger, tenant]) target. */
const taggingWhere = (t: TagTarget, context: string): Where => ({
  and: [
    { taggable: { equals: t.taggable } },
    { taggableType: { equals: t.taggableType } },
    { context: { equals: context } },
    ...(t.taggerId != null ? [{ tagger: { equals: t.taggerId } } as Where] : []),
    ...tenantClauseOf(t.tenantId),
  ],
})

/**
 * Read a record's tag names in a context (port of `tag_list_on`): the editable
 * face of the taggings. Sorted + deduped for a stable display.
 */
export async function tagListOn(payload: Payload, t: TagTarget): Promise<string[]> {
  const context = t.context ?? DEFAULT_CONTEXT
  const res = await payload.find({
    collection: 'taggings' as CollectionSlug,
    where: taggingWhere(t, context),
    limit: 100_000,
    depth: 1, // populate `tag` → { name }
    pagination: false,
    overrideAccess: true,
  })
  const names: string[] = []
  for (const row of res.docs as Array<{ tag?: unknown }>) {
    const tag = row.tag
    const name = tag && typeof tag === 'object' ? (tag as { name?: string }).name : undefined
    if (name) names.push(name)
  }
  return [...new Set(names)].sort()
}

/**
 * Reconcile a record's taggings in a context to `list` (port of `save_tags`):
 * parse → find/create tags → diff vs current → create the new taggings, delete
 * the removed ones. Returns the counts changed and the resolved names.
 */
export async function setTagList(
  payload: Payload,
  t: TagTarget,
  list: string | readonly string[] | null | undefined,
): Promise<{ added: number; removed: number; names: string[] }> {
  const context = t.context ?? DEFAULT_CONTEXT
  const desiredNames = parseTagList(list)
  const desiredIds = await findOrCreateTags(payload, desiredNames, t.tenantId)

  const current = await payload.find({
    collection: 'taggings' as CollectionSlug,
    where: taggingWhere(t, context),
    limit: 100_000,
    depth: 0,
    pagination: false,
    overrideAccess: true,
  })
  const currentByTag = new Map<string, string | number>()
  for (const row of current.docs as Array<{ id: string | number; tag?: unknown }>) {
    const tid = relId(row.tag)
    if (tid != null) currentByTag.set(String(tid), row.id)
  }

  const { add, remove } = reconcileTags([...currentByTag.keys()], desiredIds.map(String))

  for (const tagId of add) {
    await payload.create({
      collection: 'taggings' as CollectionSlug,
      data: {
        tag: tagId,
        taggable: t.taggable,
        taggableType: t.taggableType,
        context,
        ...(t.taggerId != null ? { tagger: t.taggerId } : {}),
        ...(t.tenantId != null ? { tenant: t.tenantId } : {}),
      } as Record<string, unknown>,
      overrideAccess: true,
    })
  }
  for (const tagId of remove) {
    const id = currentByTag.get(String(tagId))
    if (id != null) {
      await payload.delete({ collection: 'taggings' as CollectionSlug, id, overrideAccess: true })
    }
  }
  return { added: add.length, removed: remove.length, names: desiredNames }
}
