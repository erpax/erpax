/**
 * Order → СУПТО sale fiscalization — the membrane bridging the ecommerce order
 * chain into the Наредба Н-18 fiscal sale register. On `order:activated`
 * (payment captured), the paid order is projected into a *closed* `sales` row
 * carrying the tenant's registered fiscal-device (ФУ) number; the sale's own
 * `sale:closed` event then issues the fiscal receipt (касов бон / e-receipt) via
 * the receipt subscriber. This is the e-shop alternative (virtual-device) regime
 * — no hardware, an electronic receipt with QR.
 *
 * The ecommerce order is the *mutable* commercial document; the fiscal sale is
 * the *immutable*, gapless-УНП register entry — distinct concerns joined by this
 * event membrane (the `event` skill). Idempotent: an order already fiscalized
 * (a sale links back to it) is skipped.
 *
 * @standard BG Наредба-Н-18 §СУПТО sale-register e-shop-alternative-regime
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @audit ISO-19011:2018 audit-trail event-driven
 * @see src/ecommerce/hooks/emitOrderLifecycleEvents.ts · src/services/sales/sale-event.ts
 */

import type { Payload, PayloadRequest } from 'payload'
import { eventEmitter, type EventEmitterService } from '@/services/event-emitter.service'
import { reverseSale } from './reverse-sale'

interface OrderLine {
  itemId?: string
  sku?: string
  quantity?: number
  unitPrice?: number
  lineTotal?: number
  taxAmount?: number
}

export interface OrderActivatedPayload {
  orderId: string
  customerId?: string
  total?: number
  currencyCode?: string
  activatedAt?: string | Date
  lineItems?: ReadonlyArray<OrderLine>
}

interface SaleItem {
  description: string
  quantity: number
  unitPrice: number
  vatRate: number
  amount: number
}

/** Project a (VAT-inclusive) order line into a fiscal sale item: net amount + integer VAT rate. */
function lineToSaleItem(li: OrderLine): SaleItem {
  const gross = Number(li.lineTotal ?? 0)
  const tax = Number(li.taxAmount ?? 0)
  const net = gross - tax
  const vatRate = net > 0 && tax > 0 ? Math.round((tax / net) * 100) : 0
  return {
    description: li.sku ?? li.itemId ?? '',
    quantity: Number(li.quantity ?? 1),
    unitPrice: Number(li.unitPrice ?? 0),
    vatRate,
    amount: net,
  }
}

/** Resolve the tenant's registered fiscal-device (ФУ) individual number, if any. */
async function resolveDeviceNumber(
  payload: Payload,
  tenant: string,
  req?: PayloadRequest,
): Promise<string | undefined> {
  const found = await payload.find({
    collection: 'fiscal-devices' as never,
    where: (tenant ? { tenant: { equals: tenant } } : {}) as never,
    limit: 1,
    overrideAccess: true,
    req,
  })
  const dev = found.docs[0] as { individualNumber?: unknown } | undefined
  return typeof dev?.individualNumber === 'string' ? dev.individualNumber : undefined
}

/** Build + persist a closed fiscal `sales` row from a paid order; idempotent per order. */
export async function fiscalizeOrder(
  payload: Payload,
  p: OrderActivatedPayload,
  tenant: string,
  req?: PayloadRequest,
): Promise<{ id: string | number } | undefined> {
  // Idempotent: skip if a sale already references this order.
  const existing = await payload.find({
    collection: 'sales' as never,
    where: { order: { equals: p.orderId } } as never,
    limit: 1,
    overrideAccess: true,
    req,
  })
  if (existing.docs.length > 0) return undefined

  const fiscalDeviceNumber = await resolveDeviceNumber(payload, tenant, req)
  if (!fiscalDeviceNumber) {
    payload.logger?.error?.({ msg: 'order fiscalization skipped — no fiscal device for tenant', tenant, orderId: p.orderId })
    return undefined
  }

  const items = (p.lineItems ?? []).map(lineToSaleItem)
  const sale = (await payload.create({
    collection: 'sales' as never,
    overrideAccess: true,
    req,
    data: {
      order: p.orderId,
      fiscalDeviceNumber,
      saleDate: (p.activatedAt ? new Date(p.activatedAt) : new Date()).toISOString(),
      items,
      total: Number(p.total ?? items.reduce((s, i) => s + i.amount, 0)),
      currency: p.currencyCode ?? 'BGN',
      paymentType: 'card',
      status: 'closed',
      tenant,
    } as never,
  })) as unknown as { id: string | number }

  return sale
}

/** On a cancelled/refunded order, сторно the linked fiscal sale (if any, not already reversed). */
export async function reverseOrderFiscalization(
  payload: Payload,
  args: { orderId: string; reason?: string; req?: PayloadRequest },
): Promise<{ id: string | number } | undefined> {
  const found = await payload.find({
    collection: 'sales' as never,
    where: { order: { equals: args.orderId } } as never,
    limit: 1,
    overrideAccess: true,
    req: args.req,
  })
  const sale = found.docs[0] as { id?: string | number; status?: string } | undefined
  if (!sale?.id || sale.status === 'reversed') return undefined
  const { reversal } = await reverseSale(payload, { originalSaleId: sale.id, reason: args.reason, req: args.req })
  return reversal
}

let wired = false

/**
 * Wire the order↔sale fiscalization membrane: `order:activated` creates the
 * fiscal sale; `order:cancelled` / `order:refunded` сторно it. Idempotent
 * across hot reloads and replays.
 */
export function wireOrderFiscalizationSubscriber(
  payload: Payload,
  emitter: EventEmitterService = eventEmitter,
  req?: PayloadRequest,
): void {
  if (wired) return
  wired = true
  emitter.subscribe('order:activated', async (event) => {
    try {
      const e = event as { tenantId?: unknown; payload?: unknown }
      const p = e.payload as OrderActivatedPayload | undefined
      if (!p?.orderId) return
      await fiscalizeOrder(payload, p, String(e.tenantId ?? ''), req)
    } catch (err) {
      payload.logger?.error?.({ msg: 'order:activated fiscalization failed', err: err instanceof Error ? err.message : String(err) })
    }
  })
  const reverseHandler = async (event: unknown) => {
    try {
      const p = (event as { payload?: { orderId?: unknown; reason?: unknown } }).payload
      if (!p?.orderId) return
      await reverseOrderFiscalization(payload, {
        orderId: String(p.orderId),
        reason: typeof p.reason === 'string' ? p.reason : undefined,
        req,
      })
    } catch (err) {
      payload.logger?.error?.({ msg: 'order reversal fiscalization failed', err: err instanceof Error ? err.message : String(err) })
    }
  }
  emitter.subscribe('order:cancelled', reverseHandler)
  emitter.subscribe('order:refunded', reverseHandler)
}

/** Test-only reset of the idempotency latch. */
export function __resetOrderFiscalizationForTests(): void {
  wired = false
}
