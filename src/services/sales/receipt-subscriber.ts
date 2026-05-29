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
import { v4 as uuid } from 'uuid'
import { eventEmitter, type EventEmitterService } from '@/services/event-emitter.service'
import { buildFiscalReceipt, type FiscalSaleInput } from './fiscal-receipt'
import { buildReceiptQrData } from './virtual-device'

interface SaleDoc extends FiscalSaleInput {
  id: string | number
  uuid?: unknown
  tenant?: unknown
  terminal?: unknown
  receipt?: unknown
}

/** Resolve a relationship value to its id (string, number, or `{ id }` object). */
function relId(v: unknown): string | number | undefined {
  if (typeof v === 'string' || typeof v === 'number') return v
  if (v && typeof v === 'object' && 'id' in v) {
    const id = (v as { id?: unknown }).id
    if (typeof id === 'string' || typeof id === 'number') return id
  }
  return undefined
}

/**
 * Build + persist a `receipts` row for a closed sale; link it back on the sale,
 * then emit `receipt:issued` (the [[event]] membrane) so the e-receipt is
 * delivered to the customer via the notification fan-out (alternative regime).
 */
export async function createReceiptForSale(
  payload: Payload,
  sale: SaleDoc,
  req?: PayloadRequest,
  emitter: EventEmitterService = eventEmitter,
): Promise<{ id: string | number }> {
  const fr = buildFiscalReceipt(sale)
  // НАП fiscal QR (device*УНП*date*time*sum) — required on the e-receipt (alternative regime).
  const qrData = buildReceiptQrData(fr)
  const terminal = relId(sale.terminal)
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
      qrData,
      ...(terminal !== undefined ? { virtualPosTerminal: terminal } : {}),
      tenant: sale.tenant,
    } as never,
  })) as unknown as { id: string | number }

  // Link the receipt back AND write the касов бон number onto the sale register row.
  await payload.update({
    collection: 'sales' as never,
    id: sale.id,
    overrideAccess: true,
    req,
    data: { receipt: receipt.id, fiscalReceiptNumber: fr.unp } as never,
  })

  // Emit `receipt:issued` — the delivery membrane. The notification fan-out
  // e-mails the e-receipt (УНП + QR) to the customer (alternative regime).
  await emitter.emit({
    eventId: uuid(),
    eventType: 'receipt:issued',
    tenantId: relId(sale.tenant) !== undefined ? String(relId(sale.tenant)) : 'unknown',
    // `event` skill: key the aggregate by the receipt's content-uuid, not the row id.
    aggregateId: String((receipt as { uuid?: unknown }).uuid ?? receipt.id),
    aggregateType: 'receipt',
    timestamp: new Date(),
    payload: {
      receiptId: receipt.id,
      unp: fr.unp,
      total: fr.total,
      vatTotal: fr.vatTotal,
      currency: fr.currency,
      qrData,
    },
  } as unknown as Parameters<typeof emitter.emit>[0])

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
