/**
 * items/inventory/movements/source — stock movements are derived from the documents that cause them.
 *
 * A goods receipt, a shipment and a return are not kinds of inventory movement: they share no
 * fields with one. They are the DOCUMENTS that move stock, and the movement is their consequence —
 * which item, how many, which way, when, and from which document. All of that is on the document,
 * so a movement typed by hand is a second copy that can disagree with the first.
 *
 * Three pure projections, one per document, and one hook factory. A movement is written when the
 * document reaches the state in which stock has actually moved — a receipt accepted, a shipment
 * shipped, a return restocked — once per line, identified by the document and the line, so a
 * second save writes nothing. Movements are created as DRAFTS: the document knows the quantity but
 * not the cost, and posting a movement to the ledger is a step that needs it.
 *
 * @invariant inbound quantities are positive and outbound negative — the sign the collection defines
 * @invariant a line without an item, or with nothing usable, yields no movement
 * @invariant one document line yields at most one movement, however often the document is saved
 * @see ./SKILL.md
 */
import type { CollectionAfterChangeHook } from 'payload'
import type { GoodsReceipt, InventoryMovement, Return, Shipment } from '@/payload-types'

/** A movement as a document determines it — everything but the cost, which the document does not know. */
export interface DerivedMovement {
  readonly movementId: string
  readonly kind: InventoryMovement['kind']
  readonly item: string
  readonly quantity: number
  readonly movementAt: string
  readonly sourceDocumentType: NonNullable<InventoryMovement['sourceDocumentType']>
  readonly sourceDocumentId: string
  readonly status: 'draft'
  readonly tenant?: string
}

const idOf = (v: unknown): string | undefined =>
  typeof v === 'string' ? v : v && typeof v === 'object' && typeof (v as { id?: unknown }).id === 'string' ? (v as { id: string }).id : undefined

const tenantOf = (doc: { tenant?: unknown }): { tenant?: string } => {
  const tenant = idOf(doc.tenant)
  return tenant === undefined ? {} : { tenant }
}

/** A goods receipt brings IN what was received in good condition, line by line. */
export function fromGoodsReceipt(doc: Pick<GoodsReceipt, 'id' | 'receivedDate' | 'lines' | 'tenant'>): DerivedMovement[] {
  return doc.lines.flatMap((line, i) => {
    const item = idOf(line.item)
    const good = line.quantityReceived - (line.quantityDamaged ?? 0)
    if (item === undefined || good <= 0) return []
    return [{
      movementId: `GR-${doc.id}-${line.id ?? i}`, kind: 'receipt' as const, item, quantity: good,
      movementAt: doc.receivedDate, sourceDocumentType: 'goods_receipt' as const, sourceDocumentId: doc.id,
      status: 'draft' as const, ...tenantOf(doc),
    }]
  })
}

/** A shipment takes OUT what it ships, line by line — a negative quantity. */
export function fromShipment(doc: Pick<Shipment, 'id' | 'shippedAt' | 'lines' | 'tenant'>, now: string): DerivedMovement[] {
  return (doc.lines ?? []).flatMap((line, i) => {
    const item = idOf(line.item)
    if (item === undefined || line.quantity <= 0) return []
    return [{
      movementId: `SH-${doc.id}-${line.id ?? i}`, kind: 'sale' as const, item, quantity: -line.quantity,
      movementAt: doc.shippedAt ?? now, sourceDocumentType: 'shipment' as const, sourceDocumentId: doc.id,
      status: 'draft' as const, ...tenantOf(doc),
    }]
  })
}

/** A return brings back IN only the lines marked for restocking. */
export function fromReturn(doc: Pick<Return, 'id' | 'restockedAt' | 'lines' | 'tenant'>, now: string): DerivedMovement[] {
  return doc.lines.flatMap((line, i) => {
    const item = idOf(line.item)
    if (item === undefined || !line.restock || line.quantityReturned <= 0) return []
    return [{
      movementId: `RT-${doc.id}-${line.id ?? i}`, kind: 'return_in' as const, item, quantity: line.quantityReturned,
      movementAt: doc.restockedAt ?? now, sourceDocumentType: 'return' as const, sourceDocumentId: doc.id,
      status: 'draft' as const, ...tenantOf(doc),
    }]
  })
}

/** Each document: the states in which stock has moved, and its projection. DECLARED per document. */
const SOURCES = {
  'goods-receipts': { moved: ['accepted', 'partial'], project: (d: unknown) => fromGoodsReceipt(d as GoodsReceipt) },
  shipments: {
    moved: ['shipped', 'in_transit', 'out_for_delivery', 'delivered'],
    project: (d: unknown, now: string) => fromShipment(d as Shipment, now),
  },
  returns: { moved: ['restocked', 'refunded', 'closed'], project: (d: unknown, now: string) => fromReturn(d as Return, now) },
} as const

export type MovementSource = keyof typeof SOURCES

/**
 * After a stock document is saved: when it ENTERS a state in which stock has moved, write the
 * movements its lines determine that do not exist yet.
 */
export const deriveMovements = (source: MovementSource): CollectionAfterChangeHook => async ({ doc, previousDoc, req, context }) => {
  const { moved, project } = SOURCES[source]
  const was = (previousDoc as { status?: string } | undefined)?.status
  const is = (doc as { status?: string }).status
  if (context.movementsDerived || is === undefined || !(moved as readonly string[]).includes(is)) return doc
  if (was !== undefined && (moved as readonly string[]).includes(was)) return doc

  const wanted = project(doc, new Date().toISOString())
  if (wanted.length === 0) return doc
  const existing = await req.payload.find({
    collection: 'inventory-movements',
    where: { sourceDocumentId: { equals: (doc as { id: string }).id } },
    depth: 0,
    pagination: false,
    req,
    select: { movementId: true },
  })
  const have = new Set(existing.docs.map((m) => m.movementId))
  for (const movement of wanted) {
    if (have.has(movement.movementId)) continue
    // `valuationMethod` is left to the collection's own default — the document does not choose it.
    await req.payload.create({ collection: 'inventory-movements', data: movement as never, depth: 0, req, context: { movementsDerived: true } })
  }
  return doc
}
