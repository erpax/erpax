/**
 * Order→sale fiscalization tests — a paid order projects into a closed fiscal
 * sale carrying the tenant's ФУ number, idempotently; the sale's own
 * `sale:closed` event then issues the receipt.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §СУПТО sale-register e-shop-alternative-regime
 * @see src/services/sales/order-fiscalization.ts
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Payload } from 'payload'
import type { EventEmitterService } from '@/services/event-emitter.service'
import {
  fiscalizeOrder,
  wireOrderFiscalizationSubscriber,
  __resetOrderFiscalizationForTests,
  type OrderActivatedPayload,
} from './order-fiscalization'

const ORDER: OrderActivatedPayload = {
  orderId: 'ord-1',
  total: 1_200_00,
  currencyCode: 'BGN',
  activatedAt: '2026-05-10T09:00:00Z',
  lineItems: [{ sku: 'WIDGET', quantity: 2, unitPrice: 600_00, lineTotal: 1_200_00, taxAmount: 200_00 }],
}

function mockPayload(opts: { existingSale?: boolean; device?: string | null } = {}) {
  const { existingSale = false, device = '12345678' } = opts
  const find = vi.fn(({ collection }: { collection: string }) => {
    if (collection === 'sales') return Promise.resolve({ docs: existingSale ? [{ id: 'sale-x' }] : [] })
    if (collection === 'fiscal-devices') return Promise.resolve({ docs: device ? [{ individualNumber: device }] : [] })
    return Promise.resolve({ docs: [] })
  })
  return {
    find,
    create: vi.fn().mockResolvedValue({ id: 'sale-1' }),
    logger: { error: vi.fn() },
  }
}
const asPayload = (m: ReturnType<typeof mockPayload>) => m as unknown as Payload

describe('fiscalizeOrder', () => {
  it('creates a closed fiscal sale with the tenant ФУ + net/VAT split line', async () => {
    const m = mockPayload()
    await fiscalizeOrder(asPayload(m), ORDER, 't1')
    const arg = m.create.mock.calls[0][0]
    expect(arg.collection).toBe('sales')
    expect(arg.data.order).toBe('ord-1')
    expect(arg.data.fiscalDeviceNumber).toBe('12345678')
    expect(arg.data.status).toBe('closed')
    expect(arg.data.paymentType).toBe('card')
    expect(arg.data.tenant).toBe('t1')
    // 1200.00 gross − 200.00 VAT = 1000.00 net @ 20%
    expect(arg.data.items[0]).toMatchObject({ description: 'WIDGET', amount: 1_000_00, vatRate: 20 })
  })

  it('is idempotent — skips an order already fiscalized', async () => {
    const m = mockPayload({ existingSale: true })
    await fiscalizeOrder(asPayload(m), ORDER, 't1')
    expect(m.create).not.toHaveBeenCalled()
  })

  it('skips (logs) when the tenant has no registered fiscal device', async () => {
    const m = mockPayload({ device: null })
    await fiscalizeOrder(asPayload(m), ORDER, 't1')
    expect(m.create).not.toHaveBeenCalled()
    expect(m.logger.error).toHaveBeenCalled()
  })
})

describe('wireOrderFiscalizationSubscriber', () => {
  beforeEach(() => __resetOrderFiscalizationForTests())

  function emitterSpy() {
    let handler: ((e: unknown) => Promise<void>) | undefined
    const emitter = { subscribe: vi.fn((_t: string, h: (e: unknown) => Promise<void>) => { handler = h }) }
    return { emitter: emitter as unknown as EventEmitterService, fire: (e: unknown) => handler!(e) }
  }

  it('subscribes to order:activated and fiscalizes the order payload', async () => {
    const m = mockPayload()
    const { emitter, fire } = emitterSpy()
    wireOrderFiscalizationSubscriber(asPayload(m), emitter)
    await fire({ tenantId: 't1', payload: ORDER })
    expect(m.create).toHaveBeenCalledOnce()
  })

  it('swallows errors (never breaks the emit)', async () => {
    const m = mockPayload()
    m.find.mockRejectedValue(new Error('db down'))
    const { emitter, fire } = emitterSpy()
    wireOrderFiscalizationSubscriber(asPayload(m), emitter)
    await fire({ tenantId: 't1', payload: ORDER })
    expect(m.logger.error).toHaveBeenCalled()
  })
})
