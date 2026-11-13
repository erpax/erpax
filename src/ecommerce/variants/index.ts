/**
 * ecommerce/variants — a product's variants are derived by a hook, not typed in by hand.
 *
 * The ecommerce plugin stores a product's variant TYPES (size, colour) and each type's OPTIONS, and
 * then leaves an author to create one variant per combination. Every one of those variants is
 * determined by data already entered: it is the cartesian product of the options. So the variants
 * are computed when the product is saved, and the author confirms price and stock rather than
 * enumerating combinations.
 *
 * `combinations` and `missing` are pure. `deriveVariants` is the hook: it reads the options, finds
 * the variants the product already has, and creates only the combinations that do not exist — as
 * drafts, so nothing becomes sellable until someone prices it. It passes `req`, so the variants
 * land in the product's own transaction, and it never deletes: removing an option leaves its
 * variants for a human to retire, because a variant may already be on an order.
 *
 * @invariant combinations(groups).length = Π groups[i].length, and an empty group yields none
 * @invariant a combination is identified by its SET of options — order never makes a second variant
 * @invariant saving a product twice creates no variant the first save already created
 * @see ./SKILL.md
 */
import type { CollectionAfterChangeHook } from 'payload'

/** Every way to pick one option from each group, in group order. */
export function combinations<T>(groups: readonly (readonly T[])[]): T[][] {
  if (groups.length === 0 || groups.some((g) => g.length === 0)) return []
  return groups.reduce<T[][]>((acc, group) => acc.flatMap((prefix) => group.map((o) => [...prefix, o])), [[]])
}

/** A combination's identity: its options as a set — sorted, so order cannot make a second variant. */
export const keyOf = (options: readonly string[]): string => [...options].sort().join('|')

/** The combinations no existing variant covers. */
export function missing(wanted: readonly (readonly string[])[], existing: readonly (readonly string[])[]): string[][] {
  const have = new Set(existing.map(keyOf))
  const out: string[][] = []
  for (const combo of wanted) {
    const key = keyOf(combo)
    if (have.has(key)) continue
    have.add(key)
    out.push([...combo])
  }
  return out
}

const idOf = (v: unknown): string | undefined =>
  typeof v === 'string' ? v : v && typeof v === 'object' && typeof (v as { id?: unknown }).id === 'string' ? (v as { id: string }).id : undefined

/** After a product is saved: create, as drafts, the variants its option combinations still lack. */
export const deriveVariants: CollectionAfterChangeHook = async ({ doc, req, context }) => {
  if (context.variantsDerived || !doc?.enableVariants) return doc
  const types = ((doc.variantTypes ?? []) as unknown[]).map(idOf).filter((x): x is string => x !== undefined)
  if (types.length === 0) return doc

  const options = await req.payload.find({
    collection: 'variantOptions',
    where: { variantType: { in: types } },
    depth: 0,
    pagination: false,
    req,
    select: { variantType: true, label: true },
  })
  const groups = types.map((t) => options.docs.filter((o) => idOf(o.variantType) === t))
  const existing = await req.payload.find({
    collection: 'variants',
    where: { product: { equals: doc.id } },
    depth: 0,
    draft: true,
    pagination: false,
    req,
    select: { options: true },
  })
  const todo = missing(
    combinations(groups.map((g) => g.map((o) => o.id))),
    existing.docs.map((v) => ((v.options ?? []) as unknown[]).map(idOf).filter((x): x is string => x !== undefined)),
  )
  const labelOf = new Map(options.docs.map((o) => [o.id, o.label]))
  const tenant = idOf(doc.tenant)
  for (const combo of todo) {
    await req.payload.create({
      collection: 'variants',
      data: {
        product: doc.id,
        options: combo,
        title: `${doc.title ?? ''} — ${combo.map((id) => labelOf.get(id) ?? id).join(' / ')}`.trim(),
        _status: 'draft',
        ...(tenant === undefined ? {} : { tenant }),
      },
      depth: 0,
      draft: true,
      req,
      context: { variantsDerived: true },
    })
  }
  return doc
}
