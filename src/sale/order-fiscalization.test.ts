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
import type { EventEmitterService } from '@/event/emitter.service'
import {
  fiscalizeOrder,
  reverseOrderFiscalization,
  toFiscalPaymentType,
  wireOrderFiscalizationSubscriber,
  __resetOrderFiscalizationForTests,
  type OrderActivatedPayload,
} from '@/sale/order-fiscalization'

const ORDER: OrderActivatedPayload = {
  orderId: 'ord-1',
  total: 1_200_00,
  currencyCode: 'BGN',
  activatedAt: '2026-05-10T09:00:00Z',
  lineItems: [{ sku: 'WIDGET', quantity: 2, unitPrice: 600_00, lineTotal: 1_200_00, taxAmount: 200_00 }],
}

function mockPayload(opts: { existingSale?: boolean; device?: string | null; country?: string } = {}) {
  const { existingSale = false, device = '12345678', country = 'BG' } = opts
  const find = vi.fn(({ collection }: { collection: string }) => {
    if (collection === 'sales') return Promise.resolve({ docs: existingSale ? [{ id: 'sale-x' }] : [] })
    if (collection === 'fiscal-devices') return Promise.resolve({ docs: device ? [{ individualNumber: device }] : [] })
    return Promise.resolve({ docs: [] })
  })
  return {
    find,
    create: vi.fn().mockResolvedValue({ id: 'sale-1' }),
    findByID: vi.fn().mockResolvedValue({ config: { identity: { country } } }),
    logger: { error: vi.fn() },
  }
}
const asPayload = (m: unknown) => m as Payload

describe('toFiscalPaymentType', () => {
  it('defaults to card (the e-shop alternative regime)', () => {
    expect(toFiscalPaymentType()).toBe('card')
    expect(toFiscalPaymentType('stripe')).toBe('card')
  })
  it('maps cash-on-delivery, transfer, and voucher', () => {
    expect(toFiscalPaymentType('cash_on_delivery')).toBe('cash')
    expect(toFiscalPaymentType('SEPA')).toBe('bank_transfer')
    expect(toFiscalPaymentType('gift_card')).toBe('voucher')
  })
})

describe('fiscalizeOrder', () => {
  it('creates a closed fiscal sale with the tenant ФУ + net/VAT split line', async () => {
    const m = mockPayload()
    await fiscalizeOrder(asPayload(m), ORDER, 't1')
    const arg = m.create.mock.calls[0][0]
    expect(arg.collection).toBe('sales')
    expect(arg.data.source).toEqual({ type: 'order', ref: 'ord-1' })
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

  it('refuses to fiscalize (throws — no bypass) when an in-scope order has no fiscal device', async () => {
    const m = mockPayload({ device: null })
    await expect(fiscalizeOrder(asPayload(m), ORDER, 't1')).rejects.toThrow(/no СУПТО bypass/)
    expect(m.create).not.toHaveBeenCalled()
  })

  it('lawfully skips a bank-transfer order (чл. 3 ал. 1 — out of СУПТО scope)', async () => {
    const m = mockPayload({ device: null })
    const res = await fiscalizeOrder(asPayload(m), { ...ORDER, paymentType: 'bank_transfer' }, 't1')
    expect(res).toBeUndefined()
    expect(m.create).not.toHaveBeenCalled() // not a bypass — no касов бон required
  })
})

function mockReversalPayload(sale: { id: string; status?: string } | null = { id: 'sale-1', status: 'closed' }) {
  return {
    find: vi.fn().mockResolvedValue({ docs: sale ? [sale] : [] }),
    findByID: vi.fn().mockResolvedValue({
      id: 'sale-1', status: 'closed', fiscalDeviceNumber: '12345678', total: 1_200_00,
      items: [{ description: 'WIDGET', amount: 1_000_00 }], tenant: 't1',
    }),
    create: vi.fn().mockResolvedValue({ id: 'rev-1' }),
    update: vi.fn().mockResolvedValue({ id: 'sale-1', status: 'reversed' }),
    logger: { error: vi.fn() },
  }
}

describe('reverseOrderFiscalization', () => {
  it('сторнос the linked fiscal sale and seals the original', async () => {
    const m = mockReversalPayload()
    const rev = await reverseOrderFiscalization(asPayload(m), { orderId: 'ord-1', reason: 'customer refund' })
    expect(rev?.id).toBe('rev-1')
    // mirror created with negated total + reversalOf back-link
    expect(m.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ reversalOf: 'sale-1', total: -1_200_00 }) }),
    )
    // original sealed reversed
    expect(m.update).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'sale-1', data: expect.objectContaining({ status: 'reversed' }) }),
    )
  })

  it('skips when no sale is linked to the order', async () => {
    const m = mockReversalPayload(null)
    const rev = await reverseOrderFiscalization(asPayload(m), { orderId: 'ord-1' })
    expect(rev).toBeUndefined()
    expect(m.create).not.toHaveBeenCalled()
  })

  it('skips when the linked sale is already reversed (idempotent)', async () => {
    const m = mockReversalPayload({ id: 'sale-1', status: 'reversed' })
    await reverseOrderFiscalization(asPayload(m), { orderId: 'ord-1' })
    expect(m.create).not.toHaveBeenCalled()
  })
})

describe('wireOrderFiscalizationSubscriber', () => {
  beforeEach(() => __resetOrderFiscalizationForTests())

  function emitterSpy() {
    const handlers = new Map<string, (e: unknown) => Promise<void>>()
    const emitter = { subscribe: vi.fn((t: string, h: (e: unknown) => Promise<void>) => { handlers.set(t, h) }) }
    return { emitter: emitter as unknown as EventEmitterService, fire: (t: string, e: unknown) => handlers.get(t)!(e) }
  }

  it('subscribes to order:activated and fiscalizes the order payload', async () => {
    const m = mockPayload()
    const { emitter, fire } = emitterSpy()
    wireOrderFiscalizationSubscriber(asPayload(m), emitter)
    await fire('order:activated', { tenantId: 't1', payload: ORDER })
    expect(m.create).toHaveBeenCalledOnce()
  })

  it('сторнос the linked sale on order:refunded', async () => {
    const m = mockReversalPayload()
    const { emitter, fire } = emitterSpy()
    wireOrderFiscalizationSubscriber(asPayload(m), emitter)
    await fire('order:refunded', { tenantId: 't1', payload: { orderId: 'ord-1' } })
    expect(m.create).toHaveBeenCalledOnce()
    expect(m.update).toHaveBeenCalledOnce()
  })

  it('swallows errors (never breaks the emit)', async () => {
    const m = mockPayload()
    m.find.mockRejectedValue(new Error('db down'))
    const { emitter, fire } = emitterSpy()
    wireOrderFiscalizationSubscriber(asPayload(m), emitter)
    await fire('order:activated', { tenantId: 't1', payload: ORDER })
    expect(m.logger.error).toHaveBeenCalled()
  })
})
