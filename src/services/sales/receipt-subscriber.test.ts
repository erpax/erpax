/**
 * Receipt subscriber tests — sale:closed issues + persists a receipt, links it
 * back, idempotently.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §СУПТО касов-бон
 * @see src/services/sales/receipt-subscriber.ts
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Payload } from 'payload'
import type { EventEmitterService } from '@/services/event-emitter.service'
import { createReceiptForSale, wireReceiptSubscriber, __resetReceiptSubscriberForTests } from './receipt-subscriber'

const SALE = {
  id: 'sale-1',
  uuid: 'content-uuid-1',
  unp: '12345678-0042-0000001',
  fiscalDeviceNumber: '12345678',
  operatorCode: '0042',
  currency: 'BGN',
  paymentType: 'card',
  total: 1_200_00,
  tenant: 't1',
  items: [{ description: 'Widget', quantity: 2, unitPrice: 600_00, vatRate: 20, amount: 1_000_00 }],
}

function mockPayload(found: Array<Record<string, unknown>> = [SALE]) {
  return {
    create: vi.fn().mockResolvedValue({ id: 'rcp-1' }),
    update: vi.fn().mockResolvedValue({}),
    find: vi.fn().mockResolvedValue({ docs: found }),
    logger: { error: vi.fn() },
  }
}
const asPayload = (m: ReturnType<typeof mockPayload>) => m as unknown as Payload

const emitterSpy = () => ({ emit: vi.fn().mockResolvedValue(undefined), subscribe: vi.fn() })
const asEmitter = (e: ReturnType<typeof emitterSpy>) => e as unknown as EventEmitterService

describe('createReceiptForSale', () => {
  it('persists a receipts row carrying the УНП + computed VAT, and links it back', async () => {
    const m = mockPayload()
    await createReceiptForSale(asPayload(m), SALE)
    const data = m.create.mock.calls[0][0].data
    expect(m.create.mock.calls[0][0].collection).toBe('receipts')
    expect(data.unp).toBe('12345678-0042-0000001')
    expect(data.receiptNumber).toBe('12345678-0042-0000001')
    expect(data.sale).toBe('sale-1')
    expect(data.vatTotal).toBe(200_00)
    // Per-group VAT breakdown frozen on the receipt (Наредба Н-18 tax groups).
    expect(data.vatBreakdown).toEqual([{ group: 'Б', rate: 20, net: 1_000_00, vat: 200_00 }])
    // НАП fiscal QR carries the device + УНП + sum (device*УНП*date*time*sum).
    expect(data.qrData).toContain('12345678-0042-0000001')
    expect(data.qrData.startsWith('12345678*')).toBe(true)
    // Receipt linked back AND the касов бон number written onto the sale.
    expect(m.update).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'sales',
        id: 'sale-1',
        data: { receipt: 'rcp-1', fiscalReceiptNumber: '12345678-0042-0000001' },
      }),
    )
  })

  it('emits receipt:issued to deliver the e-receipt (alternative regime)', async () => {
    const m = mockPayload()
    const e = emitterSpy()
    await createReceiptForSale(asPayload(m), SALE, undefined, asEmitter(e))
    expect(e.emit).toHaveBeenCalledWith(
      expect.objectContaining({
        eventType: 'receipt:issued',
        aggregateType: 'receipt',
        payload: expect.objectContaining({ unp: '12345678-0042-0000001', receiptId: 'rcp-1' }),
      }),
    )
  })
})

describe('wireReceiptSubscriber', () => {
  beforeEach(() => __resetReceiptSubscriberForTests())

  function emitterSpy() {
    let handler: ((e: unknown) => Promise<void>) | undefined
    const emitter = { subscribe: vi.fn((_type: string, h: (e: unknown) => Promise<void>) => { handler = h }) }
    return { emitter: emitter as unknown as EventEmitterService, fire: (e: unknown) => handler!(e) }
  }

  it('subscribes to sale:closed and issues a receipt for the resolved sale', async () => {
    const m = mockPayload()
    const { emitter, fire } = emitterSpy()
    wireReceiptSubscriber(asPayload(m), emitter)
    await fire({ aggregateId: 'content-uuid-1' })
    expect(m.find).toHaveBeenCalledWith(
      expect.objectContaining({ collection: 'sales', where: { uuid: { equals: 'content-uuid-1' } } }),
    )
    expect(m.create).toHaveBeenCalledOnce()
  })

  it('is idempotent — skips a sale that already has a receipt', async () => {
    const m = mockPayload([{ ...SALE, receipt: 'rcp-existing' }])
    const { emitter, fire } = emitterSpy()
    wireReceiptSubscriber(asPayload(m), emitter)
    await fire({ aggregateId: 'content-uuid-1' })
    expect(m.create).not.toHaveBeenCalled()
  })

  it('swallows errors (never breaks the emit)', async () => {
    const m = mockPayload()
    m.find.mockRejectedValue(new Error('db down'))
    const { emitter, fire } = emitterSpy()
    wireReceiptSubscriber(asPayload(m), emitter)
    await fire({ aggregateId: 'content-uuid-1' })
    expect(m.logger.error).toHaveBeenCalled()
  })
})
