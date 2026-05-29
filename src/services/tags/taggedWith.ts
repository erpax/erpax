/**
 * taggedWith — port of `acts_as_taggable_on`'s `tagged_with` to Payload's
 * TWO-STEP polymorphic query. Within Payload's strict limits there is no
 * single deep join across a polymorphic relationship, so we: (1) resolve
 * tag names → tag ids, (2) query the `taggings` join for that collection
 * + context, then reduce to `taggable` ids per mode. This is the
 * position-8 (`queries`) merge: one space, sliced by `(context, tag)`.
 *
 * NOTE (verify with Payload): polymorphic-relationship `where` keys are
 * `taggable.relationTo` / `taggable.value`, and the stored shape is
 * `{ relationTo, value }`. Confirmed against Payload's documented
 * polymorphic query API; adjust the keys here if a version differs.
 * Slug literals are cast to `CollectionSlug` until `generate:types`
 * regenerates the union with `tags`/`taggings`.
 *
 * @standard ISO-25964-1:2011 thesauri retrieval
 * @see ../../collections/Taggings.ts
 * @see the `tags` + `queries` skills
 */
import type { CollectionSlug, Payload, Where } from 'payload'

export interface TaggedWithOptions {
  readonly tenantId?: string | number
  /** Tag names to match (normalised lower-case to match stored tags). */
  readonly tags: ReadonlyArray<string>
  /** Restrict to a context (acts_as_taggable_on `:on`). */
  readonly context?: string
  /** OR (`any`, default) vs. AND (`all`: must carry every tag). */
  readonly mode?: 'any' | 'all'
  /** Return ids NOT tagged with these tags. */
  readonly exclude?: boolean
  /** Restrict to taggings applied by this tagger (`owned_by`). */
  readonly taggerId?: string | number
}

type TaggableValue = { relationTo?: string; value?: string | number } | string | number | null | undefined

const idOfTaggable = (taggable: TaggableValue): string | number | null => {
  if (taggable == null) return null
  if (typeof taggable === 'object') return taggable.value ?? null
  return taggable
}

/**
 * Resolve the ids of `collectionSlug` records matching the tag query.
 */
export async function taggedWith(
  payload: Payload,
  collectionSlug: string,
  opts: TaggedWithOptions,
): Promise<Array<string | number>> {
  const names = opts.tags.map((t) => t.trim().toLowerCase()).filter(Boolean)
  if (names.length === 0) return []
  const tenantClause = opts.tenantId != null ? [{ tenant: { equals: opts.tenantId } }] : []

  // 1. tag names → tag ids (normalised match).
  const tagDocs = await payload.find({
    collection: 'tags' as CollectionSlug,
    where: { and: [{ name: { in: names } }, ...tenantClause] } as Where,
    limit: 10_000,
    depth: 0,
    pagination: false,
  })
  const tagIds = tagDocs.docs.map((d) => d.id)
  if (tagIds.length === 0) return []

  // 2. taggings on this collection (+ context, + tagger) for those tags.
  const taggings = await payload.find({
    collection: 'taggings' as CollectionSlug,
    where: {
      and: [
        { tag: { in: tagIds } },
        { 'taggable.relationTo': { equals: collectionSlug } },
        ...(opts.context != null ? [{ context: { equals: opts.context } }] : []),
        ...(opts.taggerId != null ? [{ tagger: { equals: opts.taggerId } }] : []),
        ...tenantClause,
      ],
    } as Where,
    limit: 100_000,
    depth: 0,
    pagination: false,
  })

  // Reduce taggings → taggable ids (track distinct tags per target for `all`).
  const tagsByTarget = new Map<string | number, Set<string | number>>()
  for (const t of taggings.docs as Array<{ taggable?: TaggableValue; tag?: string | number }>) {
    const targetId = idOfTaggable(t.taggable)
    if (targetId == null) continue
    const set = tagsByTarget.get(targetId) ?? new Set<string | number>()
    if (t.tag != null) set.add(t.tag)
    tagsByTarget.set(targetId, set)
  }

  const matched =
    opts.mode === 'all'
      ? [...tagsByTarget.entries()].filter(([, tags]) => tags.size >= tagIds.length).map(([id]) => id)
      : [...tagsByTarget.keys()]

  if (!opts.exclude) return matched

  // exclude: every id of the collection NOT in `matched`.
  const all = await payload.find({
    collection: collectionSlug as CollectionSlug,
    where: (opts.tenantId != null ? { tenant: { equals: opts.tenantId } } : {}) as Where,
    limit: 100_000,
    depth: 0,
    pagination: false,
  })
  const matchedSet = new Set(matched)
  return all.docs.map((d) => d.id).filter((id) => !matchedSet.has(id))
}
