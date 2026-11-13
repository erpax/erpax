/**
 * preset — a saved list over one collection, as a seed row.
 *
 * When two collections are merged, what an operator loses is the two lists. A query preset gives
 * them back without a table: a row holding a title, a filter and the visible columns, bound to one
 * collection. This atom is the one place that row is built and loaded, so every merge states its
 * lists the same way instead of growing its own copy.
 *
 * @invariant a preset is identified by its title and its collection — loading twice creates nothing
 * @see ./SKILL.md
 */
import type { CollectionSlug, Payload, Where } from 'payload'

/** One saved list: shared with everyone, since it stands where a collection's own list stood. */
export interface Preset {
  readonly title: string
  readonly relatedCollection: CollectionSlug
  readonly isShared: true
  readonly where: Where
  readonly columns: readonly { readonly accessor: string; readonly active: true }[]
  readonly access: Record<'read' | 'update' | 'delete', { readonly constraint: 'everyone' }>
}

/** Build a preset from its title, collection, filter and the columns that view cares about. */
export function preset(title: string, relatedCollection: CollectionSlug, where: Where, columns: readonly string[]): Preset {
  return {
    title,
    relatedCollection,
    isShared: true,
    where,
    columns: columns.map((accessor) => ({ accessor, active: true })),
    access: { read: { constraint: 'everyone' }, update: { constraint: 'everyone' }, delete: { constraint: 'everyone' } },
  }
}

/** Write the presets that are not there yet. A preset already present is left as its users have it. */
export async function loadPresets(
  payload: Pick<Payload, 'find' | 'create'>,
  presets: readonly Preset[],
): Promise<{ created: number; unchanged: number }> {
  let created = 0
  let unchanged = 0
  for (const p of presets) {
    const found = await payload.find({
      collection: 'payload-query-presets',
      where: { and: [{ title: { equals: p.title } }, { relatedCollection: { equals: p.relatedCollection } }] },
      depth: 0,
      limit: 1,
    })
    if (found.docs.length > 0) {
      unchanged++
      continue
    }
    await payload.create({ collection: 'payload-query-presets', data: p as never, depth: 0 })
    created++
  }
  return { created, unchanged }
}
