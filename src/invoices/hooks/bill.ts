/**
 * Bill GL Posting Hook — emits `bill:activated` so glPostingService books
 * the canonical accrual entry:
 *
 *   Dr Expense / Inventory      lineAmount  (per line.expenseCategory)
 *     Cr Accounts Payable          lineAmount
 *   (+ Dr Input-Tax-Asset / Cr AP   taxAmount,   when applicable)
 *
 * Replaces the phantom-method `glPostingService.postBill(tenant, data)`
 * call (no such method existed on `GLPostingService` — it's an
 * event-subscriber class). Now emits the canonical event so the
 * existing `postBillActivated` subscriber posts the JE.
 *
 * Fires once on the status transition into the active set
 * (issued / open / approved / past_due). Drafts skip.
 *
 * @accounting IFRS IAS-37 provisions-contingent-liabilities
 * @accounting US-GAAP ASC-405 liabilities
 * @accounting US-GAAP ASC-705 cost-of-sales-and-services
 * @audit ISO-19011:2018 audit-trail double-entry-posting
 * @compliance SOX §404 internal-controls
 * @security ISO-27002 §5.4 segregation-of-duties
 * @see docs/STANDARDS.md §4.2
 * @see docs/adr/0001-event-driven-gl-posting.md
 */

import { v4 as uuid } from 'uuid'
import type { CollectionAfterChangeHook } from 'payload'
import { eventEmitter } from '@/event/emitter.service'
import { emitDomainEvent } from '@/emit/domain/event'
import type {
  BillActivatedEvent,
  BillReversedEvent,
  BillLineItem,
  InventoryPurchasedEvent,
} from '@/types/events'

const ACTIVE_STATUSES = new Set([
  'issued',
  'open',
  'approved',
  'active',
  'past_due',
])

const REVERSED_STATUSES = new Set([
  'cancelled',
  'reversed',
  'voided',
])

const justActivated = (
  doc: Record<string, unknown>,
  previousDoc?: Record<string, unknown>,
): boolean => {
  const status = doc.status as string | undefined
  if (!status || !ACTIVE_STATUSES.has(status)) return false
  if (!previousDoc) return true
  return !ACTIVE_STATUSES.has(previousDoc.status as string)
}

const justReversed = (
  doc: Record<string, unknown>,
  previousDoc?: Record<string, unknown>,
): boolean => {
  const status = doc.status as string | undefined
  if (!status || !REVERSED_STATUSES.has(status)) return false
  if (!previousDoc) return false
  return ACTIVE_STATUSES.has(previousDoc.status as string)
}

const toLineItem = (line: Record<string, unknown>): BillLineItem => ({
  id: String(line.id ?? uuid()),
  itemId: line.itemId ? String(line.itemId) : undefined,
  description: String(line.description ?? ''),
  quantity: Number(line.quantity ?? 0),
  unitPrice: Number(line.unitPrice ?? 0),
  amount: Number(line.amount ?? 0),
  expenseCategory: String(
    line.expenseCategory ?? line.category ?? 'general_expense',
  ),
})

export const billAccountingHook: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
  operation,
}) => {
  if (!doc || (operation !== 'create' && operation !== 'update')) return doc

  const docR = doc as Record<string, unknown>
  const prevR = previousDoc as Record<string, unknown> | undefined

  const tenant =
    typeof doc.tenant === 'object' && doc.tenant !== null
      ? (doc.tenant as { id?: string }).id
      : doc.tenant
  const userId = req.user?.id
  if (!tenant || !userId) return doc

  const tenantId = String(tenant)
  const userIdStr = String(userId)

  // ── bill:activated — first transition into an active state ─────────────
  if (justActivated(docR, prevR)) {
    try {
      const lineItems = Array.isArray(doc.lineItems)
        ? (doc.lineItems as Array<Record<string, unknown>>).map(toLineItem)
        : []
      const event: BillActivatedEvent = {
        eventId: uuid(),
        eventType: 'bill:activated',
        tenantId,
        aggregateId: String((doc as { uuid?: unknown }).uuid ?? doc.id),
        aggregateType: 'bill',
        timestamp: new Date(),
        userId: userIdStr,
        payload: {
          billId: String(doc.id),
          vendorId: String(doc.vendorId ?? doc.seller ?? ''),
          amount: Number(doc.totalAmount ?? doc.amount ?? 0),
          taxAmount: Number(doc.taxAmount ?? 0),
          lineItems,
          currencyCode: String(doc.currency ?? 'EUR'),
          billDate: new Date((doc.billDate ?? doc.date ?? new Date()) as string | Date),
        },
      }
      await eventEmitter.emit(event)
      req.payload.logger.info(
        `✓ bill:activated emitted for bill ${doc.billNumber ?? doc.id}`,
      )

      // Slice LLL: emit `inventory:purchased` for every line item that
      // resolves to an inventory item. Closes the IAS-2 / ASC-330
      // inventory-receipt GL gap. Lines without an `itemId` (pure
      // expense lines) skip — only physical/inventory items book
      // through the inventory ledger.
      const billDate = new Date(
        (doc.billDate ?? doc.date ?? new Date()) as string | Date,
      )
      for (const li of lineItems) {
        if (!li.itemId || li.amount <= 0 || li.quantity <= 0) continue
        // Heuristic: if expenseCategory is left at the default 'general_expense'
        // we treat this as a non-inventory expense line and skip.
        if (li.expenseCategory === 'general_expense' || li.expenseCategory === 'expense') continue
        const purchased: InventoryPurchasedEvent = {
          eventId: uuid(),
          eventType: 'inventory:purchased',
          tenantId,
          aggregateId: li.itemId,
          aggregateType: 'inventory_transfer',
          timestamp: new Date(),
          userId: userIdStr,
          payload: {
            billId: String(doc.id),
            itemId: li.itemId,
            quantity: li.quantity,
            costPerUnit: li.amount / li.quantity,
            totalCost: li.amount,
            purchaseDate: billDate,
          },
        }
        await emitDomainEvent(req, purchased, `bill ${doc.billNumber ?? doc.id} line ${li.id}`)
      }
    } catch (error) {
      req.payload.logger.error(
        { err: error },
        `✗ Error emitting bill:activated for ${doc.id}:`,
      )
    }
  }

  // ── bill:reversed — active → cancelled/reversed/voided ─────────────────
  // Slice LLL: closes the AP-side dead-handler gap. Symmetric to
  // invoice:reversed; glPostingService.postBillReversed reverses the
  // accrual entry.
  if (justReversed(docR, prevR)) {
    const reversed: BillReversedEvent = {
      eventId: uuid(),
      eventType: 'bill:reversed',
      tenantId,
      aggregateId: String((doc as { uuid?: unknown }).uuid ?? doc.id),
      aggregateType: 'bill',
      timestamp: new Date(),
      userId: userIdStr,
      payload: {
        billId: String(doc.id),
        reversalDate: new Date(),
        reason: doc.cancellationReason
          ? String(doc.cancellationReason)
          : `status transition ${prevR?.status ?? '?'} → ${docR.status}`,
      },
    }
    await emitDomainEvent(req, reversed, String(doc.billNumber ?? doc.id))
  }

  return doc
}
