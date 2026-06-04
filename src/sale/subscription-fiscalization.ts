/**
 * Subscription → СУПТО sale fiscalization — the recurring-billing adapter over
 * the generic revenue membrane (`fiscalize-revenue.ts`). A card-charged
 * subscription is an in-scope consumer sale (Наредба Н-18 чл. 3 ал. 1 — card
 * payment), so every `subscription:invoiced` charge MUST produce a касов бон.
 * Without this the recurring revenue stream bypasses СУПТО entirely.
 *
 * Each Stripe invoice is one charge → one fiscal sale: idempotency keys on the
 * `invoiceId` (NOT the subscriptionId — the subscription is charged every
 * period with a fresh invoice, each needing its own УНП). The charged `amount`
 * is the VAT-inclusive gross; the net is backed out at the tenant/device
 * **resolved** standard rate (the config cascade — never a hardcoded 20%).
 *
 * @standard BG Наредба-Н-18 §СУПТО sale-register · §чл.3-ал.1 card-payment-in-scope
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers performance-obligation
 * @audit ISO-19011:2018 audit-trail event-driven
 * @see src/services/sales/fiscalize-revenue.ts · src/services/sales/fiscal-context.ts
 */

import type { Payload, PayloadRequest } from 'payload'
import { eventEmitter, type EventEmitterService } from '@/event/emitter.service'
import { fiscalizeRevenue, type RevenueInput } from '@/sale/fiscalize-revenue'
import { resolveFiscalContext } from '@/sale/fiscal-context'

/** `subscription:invoiced` payload (see `src/types/events.ts`). */
export interface SubscriptionInvoicedPayload {
  subscriptionId: string
  invoiceId: string
  /** VAT-inclusive gross charged this period (cents). */
  amount: number
  currencyCode?: string
  periodStart?: string | Date
  periodEnd?: string | Date
}

const round = (v: number): number => (v >= 0 ? Math.floor(v + 0.5) : -Math.floor(-v + 0.5))

/**
 * Map a `subscription:invoiced` charge into the source-agnostic revenue input,
 * backing the net out of the VAT-inclusive gross at the resolved `standardRate`.
 */
export function subscriptionToRevenueInput(
  p: SubscriptionInvoicedPayload,
  tenant: string,
  standardRate: number,
): RevenueInput {
  const gross = Number(p.amount ?? 0)
  const net = standardRate > 0 ? round((gross * 100) / (100 + standardRate)) : gross
  return {
    sourceType: 'subscription',
    sourceId: p.invoiceId, // one Stripe invoice = one charge = one касов бон
    tenant,
    paymentType: 'card', // recurring Stripe charge → in СУПТО scope
    currency: p.currencyCode,
    total: gross,
    items: [
      {
        description: `Абонамент (период ${p.periodStart ? new Date(p.periodStart).toISOString().slice(0, 10) : ''})`,
        quantity: 1,
        unitPrice: net,
        vatRate: standardRate,
        amount: net,
      },
    ],
    occurredAt: p.periodStart,
  }
}

/** Fiscalize a subscription charge — resolves the config cascade, then delegates. */
export async function fiscalizeSubscriptionCharge(
  payload: Payload,
  p: SubscriptionInvoicedPayload,
  tenant: string,
  req?: PayloadRequest,
): Promise<{ id: string | number } | undefined> {
  if (!p?.invoiceId) return undefined
  // Resolve the cascade ONCE; reuse the device standard rate for the net split
  // and thread the same context through the membrane (no double resolution).
  const ctx = await resolveFiscalContext(payload, { tenant, req })
  const input = subscriptionToRevenueInput(p, tenant, ctx.standardRate)
  return fiscalizeRevenue(payload, input, req, ctx)
}

let wired = false

/**
 * Wire the subscription→sale fiscalization membrane: `subscription:invoiced`
 * issues a касов бон for the period's charge. Idempotent across hot reloads.
 *
 * Reversal note: `subscription:refunded` does not carry the original invoiceId,
 * so a precise per-charge сторно cannot be targeted from the event alone — a
 * subscription refund сторно is issued manually (or wired once the refund event
 * carries the charge's invoiceId). Logged below so it is never silently dropped.
 */
export function wireSubscriptionFiscalizationSubscriber(
  payload: Payload,
  emitter: EventEmitterService = eventEmitter,
  req?: PayloadRequest,
): void {
  if (wired) return
  wired = true
  emitter.subscribe('subscription:invoiced', async (event) => {
    try {
      const e = event as { tenantId?: unknown; payload?: unknown }
      const p = e.payload as SubscriptionInvoicedPayload | undefined
      if (!p?.invoiceId) return
      await fiscalizeSubscriptionCharge(payload, p, String(e.tenantId ?? ''), req)
    } catch (err) {
      payload.logger?.error?.({ msg: 'subscription:invoiced fiscalization failed', err: err instanceof Error ? err.message : String(err) })
    }
  })
  emitter.subscribe('subscription:refunded', async (event) => {
    // No silent cap: a subscription refund needs a сторно касов бон, but the
    // event lacks the original invoiceId to target the exact charge. Surface it.
    const p = (event as { payload?: { subscriptionId?: unknown; stripeRefundId?: unknown } }).payload
    payload.logger?.warn?.({
      msg: 'subscription:refunded — manual сторно касов бон required (event lacks the charge invoiceId)',
      subscriptionId: p?.subscriptionId ? String(p.subscriptionId) : undefined,
      stripeRefundId: p?.stripeRefundId ? String(p.stripeRefundId) : undefined,
    })
  })
}

/** Test-only reset of the idempotency latch. */
export function __resetSubscriptionFiscalizationForTests(): void {
  wired = false
}
