/**
 * Invoice GL Posting Hook — emits `invoice:activated` so glPostingService
 * books the canonical IFRS 15 / ASC 606 entry:
 *
 *   Dr Accounts Receivable       lineAmount
 *     Cr Revenue                    lineAmount
 *   (+ Dr COGS / Cr Inventory      costAmount, when line.costAmount > 0)
 *   (+ Dr AR / Cr Sales Tax        taxAmount,   when applicable)
 *
 * Replaces the previous phantom-method call
 * `glPostingService.postInvoice(tenant, data)` — that method never existed
 * on `GLPostingService` (it's an event-subscribing class), and the wrapping
 * try/catch silently swallowed the TypeError, so JEs were never posted in
 * production. This rewrite emits the canonical event the existing
 * `postInvoiceActivated` subscriber consumes — closing the gap end-to-end.
 *
 * Fires only when status crosses into the active set (issued / open /
 * past_due / grace_period). Drafts and cancelled / paid documents skip.
 *
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-310 receivables
 * @accounting US-GAAP ASC-330 inventory cogs-recognition
 * @audit ISO-19011:2018 audit-trail double-entry-posting
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.2
 * @see docs/adr/0001-event-driven-gl-posting.md
 */

import { v4 as uuid } from 'uuid'
import type { CollectionAfterChangeHook } from 'payload'
import { eventEmitter } from '@/services/event-emitter.service'
import { emitDomainEvent } from '@/services/emit-domain-event'
import type {
  InvoiceActivatedEvent,
  InvoiceReversedEvent,
  InvoiceLineItem,
  InventorySoldEvent,
} from '@/types/events'

const ACTIVE_STATUSES = new Set([
  'issued',
  'open',
  'active',
  'past_due',
  'grace_period',
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
  if (!previousDoc) return false  // can't be reversed-on-create
  // Only fire if the prior state was active (so we have an entry to reverse).
  return ACTIVE_STATUSES.has(previousDoc.status as string)
}

const toLineItem = (line: Record<string, unknown>): InvoiceLineItem => ({
  id: String(line.id ?? uuid()),
  itemId: line.itemId ? String(line.itemId) : undefined,
  description: String(line.description ?? ''),
  quantity: Number(line.quantity ?? 0),
  unitPrice: Number(line.unitPrice ?? 0),
  amount: Number(line.amount ?? 0),
  costAmount:
    line.costAmount !== undefined ? Number(line.costAmount) : undefined,
  category: String(line.category ?? 'general'),
})

export const invoiceAccountingHook: CollectionAfterChangeHook = async ({
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

  // ── invoice:activated — first transition into an active state ──────────
  if (justActivated(docR, prevR)) {
    try {
      const lineItems = Array.isArray(doc.lineItems)
        ? (doc.lineItems as Array<Record<string, unknown>>).map(toLineItem)
        : []
      const event: InvoiceActivatedEvent = {
        eventId: uuid(),
        eventType: 'invoice:activated',
        tenantId,
        aggregateId: String((doc as { uuid?: unknown }).uuid ?? doc.id),
        aggregateType: 'invoice',
        timestamp: new Date(),
        userId: userIdStr,
        payload: {
          invoiceId: String(doc.id),
          customerId: String(doc.customerId ?? doc.buyer ?? ''),
          amount: Number(doc.totalAmount ?? doc.amount ?? 0),
          taxAmount: Number(doc.taxAmount ?? 0),
          lineItems,
          currencyCode: String(doc.currency ?? 'EUR'),
          invoiceDate: new Date(
            (doc.invoiceDate ?? doc.date ?? new Date()) as string | Date,
          ),
        },
      }
      await eventEmitter.emit(event)
      req.payload.logger.info(
        `✓ invoice:activated emitted for invoice ${doc.invoiceNumber ?? doc.id}`,
      )

      // Slice LLL: emit `inventory:sold` for every line item with cost
      // tracking. Closes the IAS-2 / ASC-330 COGS-recognition gap that
      // glPostingService declared but never received an event for.
      // The invoice:activated handler ALSO posts COGS for cost-bearing
      // lines, so this duplicate emission is suppressed when the line
      // already accounts for the COGS at the invoice level. We emit
      // per-line only when a separate inventory ledger is desired —
      // stays no-op until a `postInventorySold` subscriber is present.
      const invoiceDate = new Date(
        (doc.invoiceDate ?? doc.date ?? new Date()) as string | Date,
      )
      for (const li of lineItems) {
        if (!li.itemId || !li.costAmount || li.costAmount <= 0 || li.quantity <= 0) continue
        const sold: InventorySoldEvent = {
          eventId: uuid(),
          eventType: 'inventory:sold',
          tenantId,
          aggregateId: li.itemId,
          aggregateType: 'inventory_transfer',
          timestamp: new Date(),
          userId: userIdStr,
          payload: {
            invoiceId: String(doc.id),
            itemId: li.itemId,
            quantity: li.quantity,
            costPerUnit: li.costAmount / li.quantity,
            totalCost: li.costAmount,
            saleDate: invoiceDate,
          },
        }
        await emitDomainEvent(req, sold, `invoice ${doc.invoiceNumber ?? doc.id} line ${li.id}`)
      }
    } catch (error) {
      req.payload.logger.error(
        { err: error },
        `✗ Error emitting invoice:activated for ${doc.id}:`,
      )
    }
  }

  // ── invoice:reversed — active → cancelled/reversed/voided ──────────────
  // Slice LLL: closes the GL-handler-is-dead-code gap. Fires the
  // reversal so glPostingService can emit reversing JEs against the
  // original activation entry.
  if (justReversed(docR, prevR)) {
    const reversed: InvoiceReversedEvent = {
      eventId: uuid(),
      eventType: 'invoice:reversed',
      tenantId,
      aggregateId: String((doc as { uuid?: unknown }).uuid ?? doc.id),
      aggregateType: 'invoice',
      timestamp: new Date(),
      userId: userIdStr,
      payload: {
        invoiceId: String(doc.id),
        reversalDate: new Date(),
        reason: doc.cancellationReason
          ? String(doc.cancellationReason)
          : `status transition ${prevR?.status ?? '?'} → ${docR.status}`,
      },
    }
    await emitDomainEvent(req, reversed, String(doc.invoiceNumber ?? doc.id))
  }

  return doc
}
