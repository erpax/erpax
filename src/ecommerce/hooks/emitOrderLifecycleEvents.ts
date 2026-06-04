/**
 * Orders afterChange — emit IFRS 15 / ASC 606 lifecycle events.
 *
 * Closes the loop opened in `src/types/events.ts` (Order events) +
 * `src/services/gl-posting.service.ts` (Order GL handlers): every order
 * status transition in the ecommerce-plugin Orders collection emits a
 * domain event so the canonical `glPostingService` can post the
 * corresponding double-entry.
 *
 * Without this trigger the GL stays silent on every direct/marketplace
 * sale — same "data is money" gap that Slice ZZ-2 closed for
 * Subscriptions, now closed for Orders.
 *
 * Status → event mapping (Payload ecommerce-plugin Order status):
 *   - `pending` / `processing` (entering active)  → `order:activated`
 *   - `completed`                                  → `order:completed`
 *   - `cancelled`                                  → `order:cancelled`
 *   - `refunded`                                   → `order:refunded`
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time activated-at completed-at cancelled-at refunded-at
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @accounting IFRS IAS-2 inventories cogs-recognition
 * @accounting US-GAAP ASC-330 inventory cogs-recognition
 * @audit ISO-19011:2018 audit-trail order-lifecycle
 * @compliance SOX §404 internal-controls quote-to-cash
 * @see src/services/gl-posting.service.ts
 * @see src/types/events.ts OrderActivatedEvent
 * @see docs/STANDARDS.md §4.2
 */

import type { CollectionAfterChangeHook } from 'payload'
import { emitEvent } from '@/event/emitter.service'

const ACTIVE_STATUSES = new Set(['pending', 'processing', 'paid', 'on-hold'])

interface OrderDocLike {
  id: string | number
  tenant?: string | number | { id: string | number } | null
  customer?: string | number | { id: string | number } | null
  status?: string | null
  subtotal?: number | null
  taxAmount?: number | null
  total?: number | null
  amount?: number | null // ecommerce-plugin name on some collections
  currency?: string | null
  currencyCode?: string | null
  items?: Array<{
    item?: string | number | { id: string | number } | null
    sku?: string | null
    quantity?: number | null
    unitPrice?: number | null
    lineTotal?: number | null
    costAmount?: number | null
    taxAmount?: number | null
  }> | null
  activatedAt?: string | Date | null
  completedAt?: string | Date | null
  cancelledAt?: string | Date | null
  refundedAt?: string | Date | null
  refundAmount?: number | null
  cancellationReason?: string | null
  shippedAt?: string | Date | null
  carrier?: string | null
  trackingNumber?: string | null
}

function refId(v: string | number | { id: string | number } | null | undefined): string {
  if (v === undefined || v === null) return ''
  return typeof v === 'object' ? String(v.id) : String(v)
}

function asDate(v: string | Date | null | undefined, fallback: Date): Date {
  if (v instanceof Date) return v
  if (typeof v === 'string' && v.length > 0) {
    const d = new Date(v)
    if (!Number.isNaN(d.getTime())) return d
  }
  return fallback
}

export const emitOrderLifecycleEvents: CollectionAfterChangeHook = async ({
  doc: rawDoc,
  previousDoc: rawPrev,
  operation,
  req,
}) => {
  const doc = rawDoc as OrderDocLike
  const previousDoc = rawPrev as OrderDocLike | null
  if (!doc) return doc

  const tenantId = refId(doc.tenant)
  const customerId = refId(doc.customer)
  const userId = req.user?.id ? String(req.user.id) : 'system'
  const now = new Date()
  const currencyCode = (doc.currencyCode ?? doc.currency ?? 'EUR').toUpperCase()

  const wasActive = ACTIVE_STATUSES.has(String(previousDoc?.status ?? ''))
  const isActive = ACTIVE_STATUSES.has(String(doc.status ?? ''))

  // ── order:activated — first transition into an active state ─────────────
  if ((operation === 'create' && isActive) || (!wasActive && isActive)) {
    const subtotal = Number(doc.subtotal ?? 0)
    const taxAmount = Number(doc.taxAmount ?? 0)
    const total = Number(doc.total ?? doc.amount ?? subtotal + taxAmount)
    if (total > 0) {
      const lineItems = (doc.items ?? []).map((li) => ({
        itemId: refId(li.item),
        sku: li.sku ?? undefined,
        quantity: Number(li.quantity ?? 0),
        unitPrice: Number(li.unitPrice ?? 0),
        lineTotal: Number(li.lineTotal ?? 0),
        costAmount: typeof li.costAmount === 'number' ? li.costAmount : undefined,
        taxAmount: typeof li.taxAmount === 'number' ? li.taxAmount : undefined,
      }))
      await emitEvent(
        'order:activated',
        tenantId,
        userId,
        {
          orderId: String(doc.id),
          customerId,
          subtotal,
          taxAmount,
          total,
          currencyCode,
          activatedAt: asDate(doc.activatedAt, now),
          lineItems,
        },
        String(doc.id),
        'order',
      )
    }
  }

  // ── order:completed ─────────────────────────────────────────────────────
  if (previousDoc?.status !== 'completed' && doc.status === 'completed') {
    await emitEvent(
      'order:completed',
      tenantId,
      userId,
      { orderId: String(doc.id), completedAt: asDate(doc.completedAt, now) },
      String(doc.id),
      'order',
    )
  }

  // ── order:cancelled — reverse the activation entry ──────────────────────
  if (previousDoc?.status !== 'cancelled' && doc.status === 'cancelled') {
    const reversalAmount = Number(doc.total ?? doc.amount ?? 0)
    await emitEvent(
      'order:cancelled',
      tenantId,
      userId,
      {
        orderId: String(doc.id),
        cancelledAt: asDate(doc.cancelledAt, now),
        reversalAmount,
        currencyCode,
        reason: doc.cancellationReason ?? undefined,
      },
      String(doc.id),
      'order',
    )
  }

  // ── order:refunded — full or partial refund ─────────────────────────────
  if (previousDoc?.status !== 'refunded' && doc.status === 'refunded') {
    const refundAmount = Number(doc.refundAmount ?? doc.total ?? 0)
    if (refundAmount > 0) {
      await emitEvent(
        'order:refunded',
        tenantId,
        userId,
        {
          orderId: String(doc.id),
          refundedAt: asDate(doc.refundedAt, now),
          amount: refundAmount,
          currencyCode,
        },
        String(doc.id),
        'order',
      )
    }
  }

  // ── order:shipped — informational only (no GL impact) ───────────────────
  if (previousDoc?.shippedAt == null && doc.shippedAt != null) {
    await emitEvent(
      'order:shipped',
      tenantId,
      userId,
      {
        orderId: String(doc.id),
        shippedAt: asDate(doc.shippedAt, now),
        carrier: doc.carrier ?? undefined,
        trackingNumber: doc.trackingNumber ?? undefined,
      },
      String(doc.id),
      'order',
    )
  }

  return doc
}
