/**
 * preset — a saved list over one collection, as a seed row.
 *
 * When two collections are merged, what an operator loses is the two lists. A query preset gives
 * them back without a table: a row holding a title, a filter and the visible columns, bound to one
 * collection. This atom is the one place that row is built and loaded, so every merge states its
 * lists the same way instead of growing its own copy.
 *
 * A deployment configures itself: `seedPresets` is an after-change hook on tenants, so creating a
 * tenant loads every saved list the merged collections declare, inside that request's transaction.
 * Nobody has to run a command against the deployment.
 *
 * @invariant a preset is identified by its title and its collection — loading twice creates nothing
 * @invariant the hook loads once per request: it marks the hook context, and a second tenant in one request reads the mark
 * @see ./SKILL.md
 */
import type { CollectionAfterChangeHook, CollectionSlug, Payload, PayloadRequest, Where } from 'payload'

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
  req?: PayloadRequest,
): Promise<{ created: number; unchanged: number }> {
  let created = 0
  let unchanged = 0
  for (const p of presets) {
    const found = await payload.find({
      collection: 'payload-query-presets',
      where: { and: [{ title: { equals: p.title } }, { relatedCollection: { equals: p.relatedCollection } }] },
      depth: 0,
      limit: 1,
      req,
    })
    if (found.docs.length > 0) {
      unchanged++
      continue
    }
    await payload.create({ collection: 'payload-query-presets', data: p as never, depth: 0, req })
    created++
  }
  return { created, unchanged }
}

/** Every saved list the merged collections declare. Imported on demand: those collections import this atom. */
export async function declaredPresets(): Promise<Preset[]> {
  const [parties, orders, work, provisions, memos] = await Promise.all([
    import('@/collections/parties'),
    import('@/collections/sales-orders'),
    import('@/collections/maintenance-work-orders'),
    import('@/collections/provisions'),
    import('@/collections/credit-memos'),
  ])
  return [...parties.partyPresets(), ...orders.orderPresets(), ...work.maintenancePresets(), ...provisions.provisionPresets(), ...memos.memoPresets()]
}

/** The key under which the request's hook context records that the saved lists were loaded. */
export const presetsSeededKey = (): string => 'presetsSeeded'

/**
 * After a tenant is CREATED: load the saved lists that are not there yet. It passes `req`, so the
 * writes join the request's transaction, and it marks the hook context so one request loads once.
 * A failure is thrown, not swallowed: a tenant created without its lists is the half-configured
 * deployment this hook exists to prevent.
 */
export const seedPresets: CollectionAfterChangeHook = async ({ doc, operation, req, context }) => {
  if (operation !== 'create' || context[presetsSeededKey()]) return doc
  context[presetsSeededKey()] = true
  await loadPresets(req.payload, await declaredPresets(), req)
  return doc
}
