/**
 * Inventory Movement Posting Hook — fires `inventory:adjusted` on
 * `InventoryMovements.status → 'posted'` for the movement kinds that
 * don't have an upstream source-document GL path.
 *
 * Coverage map:
 *   • receipt        → SKIP (covered by bill:activated → inventory:purchased)
 *   • sale           → SKIP (covered by invoice:activated → inventory:sold)
 *   • return_in      → SKIP (covered by invoice/credit-note path)
 *   • return_out     → SKIP (covered by bill/credit-memo path)
 *   • opening        → SKIP (initial balance — no JE)
 *   • transfer       → EMIT inventory:adjusted (zero-net P&L)
 *   • adjustment     → EMIT inventory:adjusted (cycle-count variance)
 *   • write_off      → EMIT inventory:adjusted (IAS 2 §28 NRV / IAS 36 impairment)
 *   • consumption    → EMIT inventory:adjusted (Dr WIP / Cr Inventory)
 *
 * @accounting IFRS IAS-2 §10 §36 inventories cost-formulas
 * @accounting IFRS IAS-2 §28 net-realisable-value
 * @accounting US-GAAP ASC-330 inventory
 * @audit ISO-19011:2018 audit-trail stock-ledger-evidence
 * @compliance SOX §404 internal-controls cycle-count
 * @see src/services/gl-posting.service.ts postInventoryAdjusted
 * @see docs/adr/0001-event-driven-gl-posting.md
 */

import { v4 as uuid } from 'uuid'
import type { CollectionAfterChangeHook } from 'payload'
import { eventEmitter } from '@/event/emitter.service'
import type { InventoryAdjustedEvent } from '@/types/events'

type AdjustedKind = InventoryAdjustedEvent['payload']['kind']

const EMIT_KINDS = new Set<AdjustedKind>([
  'transfer',
  'adjustment',
  'write_off',
  'consumption',
])

type MovementDoc = Record<string, unknown> & {
  id: string | number
  status?: string
  kind?: string
  tenant?: string | { id?: string }
  movementId?: string
  item?: string | { id?: string }
  quantity?: number
  unitCost?: number
  extendedCost?: number
  fromLocation?: string | { id?: string }
  toLocation?: string | { id?: string }
  movementAt?: string | Date
  currency?: string
  journalEntry?: string | { id?: string } | null
}

const idOf = (v: unknown): string | undefined => {
  if (typeof v === 'string' || typeof v === 'number') return String(v)
  if (typeof v === 'object' && v !== null && 'id' in v) {
    const id = (v as { id?: unknown }).id
    if (id !== undefined) return String(id)
  }
  return undefined
}

const isStatusTransitionToPosted = (
  doc: MovementDoc,
  previousDoc?: MovementDoc,
): boolean => {
  if (doc?.status !== 'posted') return false
  if (!previousDoc) return true
  return previousDoc.status !== 'posted'
}

export const inventoryMovementPostingHook: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
  operation,
}) => {
  const mv = doc as MovementDoc
  if (!mv || (operation !== 'create' && operation !== 'update')) return doc
  if (!isStatusTransitionToPosted(mv, previousDoc as MovementDoc | undefined)) {
    return doc
  }

  // Idempotency: if already linked to a JE, skip.
  if (idOf(mv.journalEntry)) return doc

  const kind = mv.kind as AdjustedKind | undefined
  if (!kind || !EMIT_KINDS.has(kind)) {
    // Skipped kinds (receipt / sale / return_in / return_out / opening)
    // are covered by the bill / invoice / order GL paths or are no-ops.
    return doc
  }

  try {
    const tenant = idOf(mv.tenant)
    const userId = req.user?.id
    if (!tenant || !userId) {
      req.payload.logger.warn(
        `inventory-movement ${mv.id}: missing tenant or user — cannot post`,
      )
      return doc
    }

    const itemId = idOf(mv.item)
    if (!itemId) {
      req.payload.logger.warn(
        `inventory-movement ${mv.id}: missing item — cannot post`,
      )
      return doc
    }

    const quantity = Number(mv.quantity ?? 0)
    const unitCost = Number(mv.unitCost ?? 0)
    const extendedCost =
      Number(mv.extendedCost ?? 0) || Math.abs(quantity) * unitCost

    if (extendedCost <= 0) {
      req.payload.logger.warn(
        `inventory-movement ${mv.id}: zero/negative extendedCost — cannot post`,
      )
      return doc
    }

    const event: InventoryAdjustedEvent = {
      eventId: uuid(),
      eventType: 'inventory:adjusted',
      tenantId: tenant,
      aggregateId: String((mv as { uuid?: unknown }).uuid ?? mv.id),
      aggregateType: 'inventory_transfer',
      timestamp: new Date(),
      userId: String(userId),
      payload: {
        movementId: String(mv.movementId ?? mv.id),
        kind,
        itemId,
        quantity,
        unitCost,
        extendedCost,
        fromLocationId: idOf(mv.fromLocation),
        toLocationId: idOf(mv.toLocation),
        movementAt: new Date(mv.movementAt ?? new Date()),
        currencyCode: String(mv.currency ?? 'EUR'),
        // Slice QQQ: thread the IAS-2 §25 cost-formula election so the
        // GL handler picks the right unitCost basis. Defaults to
        // weighted_average when the movement row predates Slice QQQ.
        valuationMethod:
          (mv as { valuationMethod?: 'fifo' | 'weighted_average' | 'specific_identification' })
            .valuationMethod ?? 'weighted_average',
      },
    }

    await eventEmitter.emit(event)
    req.payload.logger.info(
      `✓ inventory:adjusted emitted for movement ${mv.id} (${kind})`,
    )
  } catch (error) {
    req.payload.logger.error(
      { err: error },
      `✗ Error emitting inventory:adjusted for ${mv.id}:`,
    )
  }

  return doc
}
