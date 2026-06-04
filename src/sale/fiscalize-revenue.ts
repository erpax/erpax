/**
 * Generic revenue → СУПТО fiscal-sale membrane (the `event` skill).
 *
 * One projection from *any* revenue source (ecommerce order, subscription
 * charge, future POS/invoice) into the Наредба Н-18 fiscal `sales` register.
 * Every source-specific bridge (`order-fiscalization`, `subscription-fiscalization`)
 * is a thin adapter that maps its event payload into a `RevenueInput` and
 * delegates here — so the no-bypass invariant, the чл. 3 ал. 1 scope rule, the
 * ФУ resolution, idempotency, and the сторно logic live in exactly ONE place
 * (DRY). A sale records its origin in a polymorphic `source` group
 * (`{type, ref}` — the [[sti]] discriminator), which keys idempotency + сторно.
 *
 * The source document is the *mutable* commercial record; the fiscal sale is the
 * *immutable*, gapless-УНП register entry — joined by this membrane.
 *
 * @standard BG Наредба-Н-18 §СУПТО sale-register · §чл.3-ал.1 fiscalization-scope
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @audit ISO-19011:2018 audit-trail event-driven
 * @see src/services/sales/order-fiscalization.ts · src/services/sales/subscription-fiscalization.ts
 */

import type { Payload, PayloadRequest } from 'payload'
import { requiresFiscalization } from '@/naredba/n/18/scope'
import { resolveFiscalContext, type FiscalContext } from '@/sale/fiscal-context'
import { reverseSale } from '@/sale/reverse-sale'

/** The fiscal sale payment types (Наредба Н-18 / касов бон). */
export type FiscalPaymentType = 'cash' | 'card' | 'bank_transfer' | 'voucher'

/** A revenue source kind — the `sales.source.type` discriminator. */
export type RevenueSourceType = 'order' | 'subscription' | 'invoice' | 'pos'

export interface RevenueItem {
  description: string
  quantity: number
  unitPrice: number
  vatRate: number
  /** Net amount (cents). */
  amount: number
}

/** Source-agnostic input every adapter maps into. Payment type is already mapped. */
export interface RevenueInput {
  readonly sourceType: RevenueSourceType
  readonly sourceId: string
  readonly tenant: string
  readonly paymentType: FiscalPaymentType
  readonly currency?: string
  readonly total?: number
  readonly items?: ReadonlyArray<RevenueItem>
  readonly occurredAt?: string | Date
}

/** Find the fiscal sale that already fiscalizes `(sourceType, sourceId)`, if any. */
async function findSaleForSource(
  payload: Payload,
  sourceType: RevenueSourceType,
  sourceId: string,
  req?: PayloadRequest,
): Promise<{ id?: string | number; status?: string } | undefined> {
  const found = await payload.find({
    collection: 'sales' as never,
    where: { 'source.type': { equals: sourceType }, 'source.ref': { equals: sourceId } } as never,
    limit: 1,
    overrideAccess: true,
    req,
  })
  return found.docs[0] as { id?: string | number; status?: string } | undefined
}

/**
 * Project a revenue source into a *closed* fiscal `sales` row, resolving every
 * value through the config cascade (tenant→device — `resolveFiscalContext`).
 * Idempotent per `(sourceType, sourceId)`. The decision tree, in order:
 *
 *   1. already fiscalized → skip (idempotent).
 *   2. tenant NOT under a fiscal-device regime → skip (out of jurisdiction —
 *      no касов бон obligation; NOT a bypass, NOT an error).
 *   3. payment lawfully exempt (Наредба Н-18 чл. 3 ал. 1) → skip (out of scope).
 *   4. in-regime + in-scope + NO active ФУ → throw (compliance misconfiguration;
 *      no СУПТО bypass — surfaced to the dead-letter, never silent).
 *   5. otherwise → create the закрита sale using the resolved device + currency.
 *
 * Pass a pre-resolved `ctx` to avoid a second cascade resolution (the adapter
 * that already needed the device rate, e.g. subscriptions, threads it through).
 */
export async function fiscalizeRevenue(
  payload: Payload,
  input: RevenueInput,
  req?: PayloadRequest,
  ctx?: FiscalContext,
): Promise<{ id: string | number } | undefined> {
  // 1. Idempotent: skip if a sale already fiscalizes this source.
  const existing = await findSaleForSource(payload, input.sourceType, input.sourceId, req)
  if (existing) return undefined

  const fiscal = ctx ?? (await resolveFiscalContext(payload, { tenant: input.tenant, req }))

  // 2. Out of jurisdiction — the tenant's country mandates no fiscal device.
  if (!fiscal.applies) return undefined

  // 3. Lawful exemption (Наредба Н-18 чл. 3 ал. 1) — out of СУПТО scope.
  if (!requiresFiscalization(input.paymentType)) return undefined

  // 4. In-regime + in-scope + no device = misconfiguration. No silent bypass.
  if (!fiscal.deviceNumber) {
    throw new Error(
      `Наредба Н-18: cannot fiscalize ${input.sourceType} ${input.sourceId} — tenant ${input.tenant || 'unknown'} is under the ${fiscal.regime} regime but has no registered fiscal device (no СУПТО bypass).`,
    )
  }

  const items = input.items ?? []
  const sale = (await payload.create({
    collection: 'sales' as never,
    overrideAccess: true,
    req,
    data: {
      source: { type: input.sourceType, ref: input.sourceId },
      fiscalDeviceNumber: fiscal.deviceNumber,
      // Cascade-resolved default operator + virtual-POS terminal for automated
      // sales (the УНП hook derives ZZZZ from `operator`; the receipt picks up
      // `terminal`). A future explicit per-source value would override here.
      ...(fiscal.operatorId ? { operator: fiscal.operatorId } : {}),
      ...(fiscal.terminalId ? { terminal: fiscal.terminalId } : {}),
      saleDate: (input.occurredAt ? new Date(input.occurredAt) : new Date()).toISOString(),
      items,
      total: Number(input.total ?? items.reduce((s, i) => s + i.amount, 0)),
      currency: input.currency ?? fiscal.currency,
      paymentType: input.paymentType,
      status: 'closed',
      tenant: input.tenant,
    } as never,
  })) as unknown as { id: string | number }

  return sale
}

/** Сторно the fiscal sale fiscalizing `(sourceType, sourceId)` — if any, not already reversed. */
export async function reverseRevenueFiscalization(
  payload: Payload,
  args: { sourceType: RevenueSourceType; sourceId: string; reason?: string; req?: PayloadRequest },
): Promise<{ id: string | number } | undefined> {
  const sale = await findSaleForSource(payload, args.sourceType, args.sourceId, args.req)
  if (!sale?.id || sale.status === 'reversed') return undefined
  const { reversal } = await reverseSale(payload, { originalSaleId: sale.id, reason: args.reason, req: args.req })
  return reversal
}
