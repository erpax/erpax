/**
 * Subscription-fiscalization tests — a card-charged subscription is in СУПТО
 * scope (чл. 3 ал. 1): each subscription:invoiced charge → one касов бон, keyed
 * by invoiceId; gross is VAT-inclusive (net backed out at the standard rate).
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §СУПТО · §чл.3-ал.1 card-payment-in-scope
 * @see src/services/sales/subscription-fiscalization.ts
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Payload } from 'payload'
import type { EventEmitterService } from '@/event/emitter.service'
import {
  subscriptionToRevenueInput,
  fiscalizeSubscriptionCharge,
  wireSubscriptionFiscalizationSubscriber,
  __resetSubscriptionFiscalizationForTests,
  type SubscriptionInvoicedPayload,
} from '@/sale/subscription-fiscalization'

const CHARGE: SubscriptionInvoicedPayload = {
  subscriptionId: 'sub-1',
  invoiceId: 'inv-1',
  amount: 1_200_00, // VAT-inclusive gross
  currencyCode: 'BGN',
  periodStart: '2026-05-01T00:00:00Z',
  periodEnd: '2026-05-31T23:59:59Z',
}

function mockPayload(device: string | null = '12345678', country = 'BG') {
  const find = vi.fn(({ collection }: { collection: string }) => {
    if (collection === 'sales') return Promise.resolve({ docs: [] })
    if (collection === 'fiscal-devices') return Promise.resolve({ docs: device ? [{ individualNumber: device }] : [] })
    return Promise.resolve({ docs: [] })
  })
  const findByID = vi.fn().mockResolvedValue({ config: { identity: { country } } })
  return { find, findByID, create: vi.fn().mockResolvedValue({ id: 'sale-1' }), logger: { error: vi.fn(), warn: vi.fn() } }
}
const asPayload = (m: ReturnType<typeof mockPayload>) => m as unknown as Payload

describe('subscriptionToRevenueInput', () => {
  it('keys on the invoiceId (one charge = one касов бон), pays by card', () => {
    const input = subscriptionToRevenueInput(CHARGE, 't1', 20)
    expect(input.sourceType).toBe('subscription')
    expect(input.sourceId).toBe('inv-1') // per-charge, not per-subscription
    expect(input.paymentType).toBe('card')
    expect(input.total).toBe(1_200_00)
  })

  it('backs out net from the VAT-inclusive gross at the resolved standard rate', () => {
    const input = subscriptionToRevenueInput(CHARGE, 't1', 20)
    // 1200.00 gross @ 20% incl → net 1000.00, vat 200.00
    expect(input.items?.[0]).toMatchObject({ amount: 1_000_00, vatRate: 20 })
    // a device-configured 19% rate would split differently (config-driven, not hardcoded)
    expect(subscriptionToRevenueInput(CHARGE, 't1', 19).items?.[0].vatRate).toBe(19)
  })
})

describe('fiscalizeSubscriptionCharge', () => {
  it('creates a closed fiscal sale for the charge', async () => {
    const m = mockPayload()
    await fiscalizeSubscriptionCharge(asPayload(m), CHARGE, 't1')
    const arg = m.create.mock.calls[0][0]
    expect(arg.data.source).toEqual({ type: 'subscription', ref: 'inv-1' })
    expect(arg.data.status).toBe('closed')
    expect(arg.data.paymentType).toBe('card')
  })

  it('throws (no bypass) when an in-scope charge has no fiscal device', async () => {
    const m = mockPayload(null)
    await expect(fiscalizeSubscriptionCharge(asPayload(m), CHARGE, 't1')).rejects.toThrow(/no СУПТО bypass/)
  })

  it('skips a charge with no invoiceId', async () => {
    const m = mockPayload()
    const res = await fiscalizeSubscriptionCharge(asPayload(m), { ...CHARGE, invoiceId: '' }, 't1')
    expect(res).toBeUndefined()
    expect(m.create).not.toHaveBeenCalled()
  })
})

describe('wireSubscriptionFiscalizationSubscriber', () => {
  beforeEach(() => __resetSubscriptionFiscalizationForTests())

  function emitterSpy() {
    const handlers = new Map<string, (e: unknown) => Promise<void>>()
    const emitter = { subscribe: vi.fn((t: string, h: (e: unknown) => Promise<void>) => { handlers.set(t, h) }) }
    return { emitter: emitter as unknown as EventEmitterService, fire: (t: string, e: unknown) => handlers.get(t)!(e) }
  }

  it('subscribes to subscription:invoiced and fiscalizes the charge', async () => {
    const m = mockPayload()
    const { emitter, fire } = emitterSpy()
    wireSubscriptionFiscalizationSubscriber(asPayload(m), emitter)
    await fire('subscription:invoiced', { tenantId: 't1', payload: CHARGE })
    expect(m.create).toHaveBeenCalledOnce()
  })

  it('logs (never silently drops) a subscription refund that needs a manual сторно', async () => {
    const m = mockPayload()
    const { emitter, fire } = emitterSpy()
    wireSubscriptionFiscalizationSubscriber(asPayload(m), emitter)
    await fire('subscription:refunded', { tenantId: 't1', payload: { subscriptionId: 'sub-1', stripeRefundId: 're_1' } })
    expect(m.logger.warn).toHaveBeenCalled()
  })

  it('swallows errors (never breaks the emit)', async () => {
    const m = mockPayload()
    m.find.mockRejectedValue(new Error('db down'))
    const { emitter, fire } = emitterSpy()
    wireSubscriptionFiscalizationSubscriber(asPayload(m), emitter)
    await fire('subscription:invoiced', { tenantId: 't1', payload: CHARGE })
    expect(m.logger.error).toHaveBeenCalled()
  })
})
