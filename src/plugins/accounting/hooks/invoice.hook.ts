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
import type { InvoiceActivatedEvent, InvoiceLineItem } from '@/types/events'

const ACTIVE_STATUSES = new Set([
  'issued',
  'open',
  'active',
  'past_due',
  'grace_period',
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
  if (
    !justActivated(
      doc as Record<string, unknown>,
      previousDoc as Record<string, unknown> | undefined,
    )
  ) {
    return doc
  }

  try {
    const tenant =
      typeof doc.tenant === 'object' && doc.tenant !== null
        ? (doc.tenant as { id?: string }).id
        : doc.tenant
    const userId = req.user?.id
    if (!tenant || !userId) return doc

    const lineItems = Array.isArray(doc.lineItems)
      ? (doc.lineItems as Array<Record<string, unknown>>).map(toLineItem)
      : []

    const event: InvoiceActivatedEvent = {
      eventId: uuid(),
      eventType: 'invoice:activated',
      tenantId: String(tenant),
      aggregateId: String(doc.id),
      aggregateType: 'invoice',
      timestamp: new Date(),
      userId: String(userId),
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
  } catch (error) {
    req.payload.logger.error(
      { err: error },
      `✗ Error emitting invoice:activated for ${doc.id}:`,
    )
  }

  return doc
}
