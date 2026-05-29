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
import { requiresFiscalization } from '@/standards/naredba-n-18/scope'
import { reverseSale } from './reverse-sale'

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

/** Resolve the tenant's registered fiscal-device (ФУ) individual number, if any. */
export async function resolveDeviceNumber(
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
 * Project a revenue source into a *closed* fiscal `sales` row. Idempotent per
 * `(sourceType, sourceId)`. Lawfully skips чл. 3 ал. 1-exempt payments (bank
 * transfer / direct debit / PSP / postal money transfer → no касов бон). For an
 * in-scope (cash/card/voucher) source it throws when the tenant has no
 * registered ФУ — never a silent СУПТО bypass.
 */
export async function fiscalizeRevenue(
  payload: Payload,
  input: RevenueInput,
  req?: PayloadRequest,
): Promise<{ id: string | number } | undefined> {
  // Idempotent: skip if a sale already fiscalizes this source.
  const existing = await findSaleForSource(payload, input.sourceType, input.sourceId, req)
  if (existing) return undefined

  // Lawful exemption (Наредба Н-18 чл. 3 ал. 1) — out of СУПТО scope, not a bypass.
  if (!requiresFiscalization(input.paymentType)) return undefined

  const fiscalDeviceNumber = await resolveDeviceNumber(payload, input.tenant, req)
  if (!fiscalDeviceNumber) {
    // No СУПТО bypass: an in-scope paid source MUST be fiscalized. A tenant with
    // no registered ФУ is a compliance misconfiguration — fail loudly (the
    // subscriber routes this to the error log / dead-letter), never skip.
    throw new Error(
      `Наредба Н-18: cannot fiscalize ${input.sourceType} ${input.sourceId} — tenant ${input.tenant || 'unknown'} has no registered fiscal device (no СУПТО bypass).`,
    )
  }

  const items = input.items ?? []
  const sale = (await payload.create({
    collection: 'sales' as never,
    overrideAccess: true,
    req,
    data: {
      source: { type: input.sourceType, ref: input.sourceId },
      fiscalDeviceNumber,
      saleDate: (input.occurredAt ? new Date(input.occurredAt) : new Date()).toISOString(),
      items,
      total: Number(input.total ?? items.reduce((s, i) => s + i.amount, 0)),
      currency: input.currency ?? 'BGN',
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
