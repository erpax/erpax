/**
 * Cache each referenced item's on-hand inventory from the invoice lines,
 * recomputed on every line create / update / delete (and on reparent). The
 * same invoice-line edge that feeds the invoice's totals feeds the item's
 * inventory — the other parent the line rolls up to.
 *
 * Faithful port of erpax `ItemInventoryConcern#set_inventory`:
 *   items_in  = Σ quantity over lines where this item is the buyer's item (purchases IN)
 *   items_out = Σ quantity over lines where this item is the seller's item (sales OUT)
 *   inventory_quantity = items_in − items_out
 *
 * A signed dual-relation aggregate (one child edge → two parent roles with
 * opposite sign), so it's its own hook rather than the single-relation
 * `recomputeParentAggregates` factory. Same re-entrancy + best-effort
 * discipline as that factory.
 *
 * @standard US-GAAP ASC-330 inventory
 * @accounting IFRS IAS-2 inventories
 * @audit ISO-19011:2018 audit-trail on-hand-provenance
 * @see ~/github/ceccec/erpax ItemInventoryConcern (items_in/items_out/items_available)
 * @see src/hooks/factories/recompute-parent-aggregates.ts (the single-relation sibling)
 */
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, PayloadRequest, Where } from 'payload'

const CTX_IN_PROGRESS = '_recomputeItemInventoryInProgress'

function relId(v: unknown): string | undefined {
  if (v == null) return undefined
  if (typeof v === 'string') return v
  if (typeof v === 'number') return String(v)
  if (typeof v === 'object' && 'id' in (v as object)) {
    const id = (v as { id: unknown }).id
    return id == null ? undefined : String(id)
  }
  return undefined
}

function num(v: unknown): number {
  const n = typeof v === 'number' ? v : Number(v)
  return Number.isFinite(n) ? n : 0
}

async function sumQuantity(
  req: PayloadRequest,
  relField: 'items.buyerItem' | 'items.sellerItem',
  itemId: string,
  tenantId: string | undefined,
): Promise<number> {
  const relWhere = { [relField]: { equals: itemId } }
  const where: Where = tenantId ? { and: [relWhere, { tenant: { equals: tenantId } }] } : relWhere
  const { docs } = await req.payload.find({
    collection: 'invoice-lines',
    where,
    depth: 0,
    pagination: false,
    overrideAccess: true,
    req,
  })
  return (docs as Array<{ quantity?: { quantity?: unknown } }>).reduce(
    (sum, l) => sum + num(l.quantity?.quantity),
    0,
  )
}

async function recomputeItem(
  req: PayloadRequest,
  itemId: string,
  tenantId: string | undefined,
): Promise<void> {
  const ctx = req.context as Record<string, unknown>
  const inProgress = (ctx[CTX_IN_PROGRESS] as Set<string> | undefined) ?? new Set<string>()
  ctx[CTX_IN_PROGRESS] = inProgress
  if (inProgress.has(itemId)) return
  inProgress.add(itemId)

  try {
    const itemsIn = await sumQuantity(req, 'items.buyerItem', itemId, tenantId)
    const itemsOut = await sumQuantity(req, 'items.sellerItem', itemId, tenantId)

    const item = (await req.payload
      .findByID({ collection: 'items', id: itemId, depth: 0, overrideAccess: true, req })
      .catch((): null => null)) as { inventory?: Record<string, unknown> } | null
    if (!item) return

    await req.payload.update({
      collection: 'items',
      id: itemId,
      data: {
        inventory: {
          ...(item.inventory ?? {}),
          inventoryQuantity: itemsIn - itemsOut,
        },
      },
      depth: 0,
      overrideAccess: true,
      req,
    })
  } finally {
    inProgress.delete(itemId)
  }
}

function affectedItemIds(
  doc: Record<string, unknown> | undefined,
  previousDoc: Record<string, unknown> | undefined,
): Set<string> {
  const ids = new Set<string>()
  for (const d of [doc, previousDoc]) {
    const items = (d?.items as { buyerItem?: unknown; sellerItem?: unknown } | undefined) ?? undefined
    const b = relId(items?.buyerItem)
    if (b) ids.add(b)
    const s = relId(items?.sellerItem)
    if (s) ids.add(s)
  }
  return ids
}

async function run(
  req: PayloadRequest,
  doc: Record<string, unknown> | undefined,
  previousDoc: Record<string, unknown> | undefined,
): Promise<void> {
  const tenantId = relId((doc ?? previousDoc)?.tenant)
  for (const id of affectedItemIds(doc, previousDoc)) {
    try {
      await recomputeItem(req, id, tenantId)
    } catch (err) {
      req.payload.logger.warn({ err }, `recomputeItemInventory: items#${id} failed`)
    }
  }
}

export const itemInventory: {
  afterChange: CollectionAfterChangeHook
  afterDelete: CollectionAfterDeleteHook
} = {
  afterChange: async ({ req, doc, previousDoc }) => {
    await run(req, doc as Record<string, unknown>, previousDoc as Record<string, unknown> | undefined)
    return doc
  },
  afterDelete: async ({ req, doc }) => {
    await run(req, doc as Record<string, unknown>, undefined)
    return doc
  },
}
