/**
 * Order → СУПТО sale fiscalization — the ecommerce *adapter* over the generic
 * revenue membrane (`fiscalize-revenue.ts`). On `order:activated` (payment
 * captured) the paid order is mapped into a `RevenueInput` and projected into a
 * *closed* `sales` row; the sale's own `sale:closed` event then issues the
 * fiscal receipt (касов бон / e-receipt). `order:cancelled` / `order:refunded`
 * сторно the linked sale. The shared no-bypass + чл. 3 ал. 1 scope logic lives
 * in the generic membrane — this file only does the order→revenue projection.
 *
 * @standard BG Наредба-Н-18 §СУПТО sale-register e-shop-alternative-regime
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @audit ISO-19011:2018 audit-trail event-driven
 * @see src/services/sales/fiscalize-revenue.ts · src/ecommerce/hooks/emitOrderLifecycleEvents.ts
 */

import type { Payload, PayloadRequest } from 'payload'
import { eventEmitter, type EventEmitterService } from '@/event/emitter.service'
import {
  fiscalizeRevenue,
  reverseRevenueFiscalization,
  type FiscalPaymentType,
  type RevenueInput,
  type RevenueItem,
} from './fiscalize-revenue'

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
  /** Raw order payment method (e.g. Stripe 'card', 'cash_on_delivery'). */
  paymentType?: string
  activatedAt?: string | Date
  lineItems?: ReadonlyArray<OrderLine>
}

/**
 * Map a raw order payment method to a fiscal payment type. The e-shop
 * alternative regime is remote-card by definition, so `card` is the default;
 * cash-on-delivery / transfer / voucher map through when the order carries them.
 */
export function toFiscalPaymentType(raw?: string): FiscalPaymentType {
  switch ((raw ?? '').toLowerCase()) {
    case 'cash':
    case 'cash_on_delivery':
    case 'cod':
      return 'cash'
    case 'bank_transfer':
    case 'bank':
    case 'wire':
    case 'sepa':
      return 'bank_transfer'
    case 'voucher':
    case 'gift_card':
      return 'voucher'
    default:
      return 'card'
  }
}

/** Project a (VAT-inclusive) order line into a fiscal sale item: net amount + integer VAT rate. */
function lineToSaleItem(li: OrderLine): RevenueItem {
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

/** Map an `order:activated` payload into the source-agnostic revenue input. */
export function orderToRevenueInput(p: OrderActivatedPayload, tenant: string): RevenueInput {
  return {
    sourceType: 'order',
    sourceId: p.orderId,
    tenant,
    paymentType: toFiscalPaymentType(p.paymentType),
    currency: p.currencyCode,
    total: p.total,
    items: (p.lineItems ?? []).map(lineToSaleItem),
    occurredAt: p.activatedAt,
  }
}

/** Fiscalize a paid order — the order adapter over the generic membrane. */
export async function fiscalizeOrder(
  payload: Payload,
  p: OrderActivatedPayload,
  tenant: string,
  req?: PayloadRequest,
): Promise<{ id: string | number } | undefined> {
  return fiscalizeRevenue(payload, orderToRevenueInput(p, tenant), req)
}

/** On a cancelled/refunded order, сторно the linked fiscal sale (if any, not already reversed). */
export async function reverseOrderFiscalization(
  payload: Payload,
  args: { orderId: string; reason?: string; req?: PayloadRequest },
): Promise<{ id: string | number } | undefined> {
  return reverseRevenueFiscalization(payload, {
    sourceType: 'order',
    sourceId: args.orderId,
    reason: args.reason,
    req: args.req,
  })
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
