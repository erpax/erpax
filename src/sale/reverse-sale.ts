/**
 * СУПТО сторно (reversal) — Наредба Н-18 correction of a completed sale.
 *
 * A reversal is NOT an edit: it is a NEW sale that mirrors the original with
 * negated amounts, links back via `reversalOf`, and gets its own УНП on the
 * same fiscal-device sequence (gapless). The original is then sealed
 * `closed → reversed` with a `reversedBy` back-link — its money/items stay
 * intact (the regulation's "preserve the reversed data"). This is the
 * `reverse` skill applied to a POS sale: derive the mirror, don't re-key;
 * preserve the source.
 *
 * @standard BG Наредба-Н-18 §СУПТО сторно reversal-preserves-original
 * @audit ISO-19011:2018 audit-trail
 * @see .claude/skills/reverse/SKILL.md · src/services/sales/sale-immutability.ts
 */

import type { Payload, PayloadRequest } from 'payload'

interface SaleItem {
  readonly description?: string
  readonly quantity?: number
  readonly unitPrice?: number
  readonly vatRate?: number
  readonly amount?: number
}

interface SaleDoc {
  readonly id: string | number
  readonly unp?: string
  readonly status?: string
  readonly fiscalDeviceNumber?: string
  readonly operatorCode?: string
  readonly currency?: string
  readonly paymentType?: string
  readonly total?: number
  readonly items?: ReadonlyArray<SaleItem>
  readonly tenant?: unknown
}

/** Negate an item's monetary fields, preserving its descriptive fields. */
function negateItem(item: SaleItem): SaleItem {
  return {
    ...item,
    quantity: typeof item.quantity === 'number' ? -item.quantity : item.quantity,
    amount: typeof item.amount === 'number' ? -item.amount : item.amount,
  }
}

export interface ReverseSaleResult {
  readonly reversal: SaleDoc
  readonly original: SaleDoc
}

/**
 * Issue a сторно for `originalSaleId`. Creates the mirror sale (its УНП is
 * assigned by the sequence hook on create), then seals the original.
 */
export async function reverseSale(
  payload: Payload,
  args: { collection?: string; originalSaleId: string | number; reason?: string; req?: PayloadRequest },
): Promise<ReverseSaleResult> {
  const collection = (args.collection ?? 'sales') as never
  const req = args.req

  const original = (await payload.findByID({
    collection,
    id: args.originalSaleId,
    overrideAccess: true,
    req,
  })) as unknown as SaleDoc

  if (original.status === 'reversed') {
    throw new Error(`Наредба Н-18: sale ${String(original.unp)} is already reversed.`)
  }

  const reversal = (await payload.create({
    collection,
    overrideAccess: true,
    req,
    data: {
      // УНП intentionally omitted — the sequence hook assigns the next per-ФУ number.
      fiscalDeviceNumber: original.fiscalDeviceNumber,
      operatorCode: original.operatorCode,
      tenant: original.tenant,
      currency: original.currency,
      paymentType: original.paymentType,
      saleDate: new Date().toISOString(),
      status: 'closed',
      reversalOf: original.id,
      reversalReason: args.reason,
      total: typeof original.total === 'number' ? -original.total : original.total,
      items: (original.items ?? []).map(negateItem),
    } as never,
  })) as unknown as SaleDoc

  const sealed = (await payload.update({
    collection,
    id: original.id,
    overrideAccess: true,
    req,
    data: { status: 'reversed', reversedBy: reversal.id } as never,
  })) as unknown as SaleDoc

  return { reversal, original: sealed }
}
