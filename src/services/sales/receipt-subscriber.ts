/**
 * Receipt issuance subscriber — on `sale:closed` ([[event]]), issue the fiscal
 * receipt (касов бон / e-receipt) and persist it as a `receipts` row, linking it
 * back onto the sale. Decoupled from the sale collection via the event membrane
 * (the GL-posting subscriber pattern). Idempotent: a sale that already carries a
 * receipt is skipped.
 *
 * @standard BG Наредба-Н-18 §СУПТО касов-бон issuance-on-close
 * @audit ISO-19011:2018 audit-trail event-driven
 * @see src/services/sales/fiscal-receipt.ts · src/services/sales/sale-event.ts
 */

import type { Payload, PayloadRequest } from 'payload'
import { eventEmitter, type EventEmitterService } from '@/services/event-emitter.service'
import { buildFiscalReceipt, type FiscalSaleInput } from './fiscal-receipt'

interface SaleDoc extends FiscalSaleInput {
  id: string | number
  tenant?: unknown
  receipt?: unknown
}

/** Build + persist a `receipts` row for a closed sale; link it back on the sale. */
export async function createReceiptForSale(
  payload: Payload,
  sale: SaleDoc,
  req?: PayloadRequest,
): Promise<{ id: string | number }> {
  const fr = buildFiscalReceipt(sale)
  const receipt = (await payload.create({
    collection: 'receipts' as never,
    overrideAccess: true,
    req,
    data: {
      receiptNumber: fr.unp,
      unp: fr.unp,
      sale: sale.id,
      fiscalDeviceNumber: fr.fiscalDeviceNumber,
      operatorCode: fr.operatorCode,
      issuedAt: fr.issuedAt,
      total: fr.total,
      vatTotal: fr.vatTotal,
      currency: fr.currency,
      paymentType: fr.paymentType,
      status: 'issued',
      lines: fr.lines,
      tenant: sale.tenant,
    } as never,
  })) as unknown as { id: string | number }

  await payload.update({
    collection: 'sales' as never,
    id: sale.id,
    overrideAccess: true,
    req,
    data: { receipt: receipt.id } as never,
  })

  return receipt
}

let wired = false

/** Wire the receipt subscriber to `sale:closed`. Idempotent across hot reloads. */
export function wireReceiptSubscriber(
  payload: Payload,
  emitter: EventEmitterService = eventEmitter,
  req?: PayloadRequest,
): void {
  if (wired) return
  wired = true
  emitter.subscribe('sale:closed', async (event) => {
    try {
      const aggregateId = String((event as { aggregateId?: unknown }).aggregateId ?? '')
      if (!aggregateId) return
      // The event keys the aggregate by content-uuid (the `event` skill).
      const found = await payload.find({
        collection: 'sales' as never,
        where: { uuid: { equals: aggregateId } },
        limit: 1,
        overrideAccess: true,
        req,
      })
      const sale = found.docs[0] as SaleDoc | undefined
      if (!sale || sale.receipt) return // idempotent: no sale, or already issued
      await createReceiptForSale(payload, sale, req)
    } catch (err) {
      payload.logger?.error?.({ msg: 'sale:closed receipt issuance failed', err: err instanceof Error ? err.message : String(err) })
    }
  })
}

/** Test-only reset of the idempotency latch. */
export function __resetReceiptSubscriberForTests(): void {
  wired = false
}
