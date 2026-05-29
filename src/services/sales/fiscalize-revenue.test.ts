/**
 * Generic revenue-fiscalization tests — the one membrane every source delegates
 * to: idempotency by (sourceType, sourceId), чл. 3 ал. 1 scope, no-bypass throw,
 * polymorphic source group, сторно.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §СУПТО sale-register · §чл.3-ал.1
 * @see src/services/sales/fiscalize-revenue.ts
 */

import { describe, it, expect, vi } from 'vitest'
import type { Payload } from 'payload'
import { fiscalizeRevenue, reverseRevenueFiscalization, type RevenueInput } from './fiscalize-revenue'

const INPUT: RevenueInput = {
  sourceType: 'order',
  sourceId: 'ord-1',
  tenant: 't1',
  paymentType: 'card',
  currency: 'BGN',
  total: 1_200_00,
  occurredAt: '2026-05-10T09:00:00Z',
  items: [{ description: 'WIDGET', quantity: 2, unitPrice: 600_00, vatRate: 20, amount: 1_000_00 }],
}

function mockPayload(opts: { existing?: { id: string; status?: string } | null; device?: string | null } = {}) {
  const { existing = null, device = '12345678' } = opts
  const find = vi.fn(({ collection }: { collection: string }) => {
    if (collection === 'sales') return Promise.resolve({ docs: existing ? [existing] : [] })
    if (collection === 'fiscal-devices') return Promise.resolve({ docs: device ? [{ individualNumber: device }] : [] })
    return Promise.resolve({ docs: [] })
  })
  return {
    find,
    create: vi.fn().mockResolvedValue({ id: 'sale-1' }),
    findByID: vi.fn().mockResolvedValue({ id: 'sale-1', status: 'closed', fiscalDeviceNumber: '12345678', total: 1_200_00, items: [], tenant: 't1' }),
    update: vi.fn().mockResolvedValue({ id: 'sale-1', status: 'reversed' }),
    logger: { error: vi.fn() },
  }
}
const asPayload = (m: ReturnType<typeof mockPayload>) => m as unknown as Payload

describe('fiscalizeRevenue', () => {
  it('creates a closed sale recording the polymorphic source {type, ref}', async () => {
    const m = mockPayload()
    await fiscalizeRevenue(asPayload(m), INPUT)
    const arg = m.create.mock.calls[0][0]
    expect(arg.collection).toBe('sales')
    expect(arg.data.source).toEqual({ type: 'order', ref: 'ord-1' })
    expect(arg.data.fiscalDeviceNumber).toBe('12345678')
    expect(arg.data.status).toBe('closed')
    expect(arg.data.paymentType).toBe('card')
  })

  it('queries idempotency by source.type + source.ref', async () => {
    const m = mockPayload()
    await fiscalizeRevenue(asPayload(m), INPUT)
    expect(m.find).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'sales',
        where: { 'source.type': { equals: 'order' }, 'source.ref': { equals: 'ord-1' } },
      }),
    )
  })

  it('is idempotent — skips a source already fiscalized', async () => {
    const m = mockPayload({ existing: { id: 'sale-x' } })
    const res = await fiscalizeRevenue(asPayload(m), INPUT)
    expect(res).toBeUndefined()
    expect(m.create).not.toHaveBeenCalled()
  })

  it('lawfully skips a bank-transfer source (чл. 3 ал. 1 — out of scope)', async () => {
    const m = mockPayload({ device: null })
    const res = await fiscalizeRevenue(asPayload(m), { ...INPUT, paymentType: 'bank_transfer' })
    expect(res).toBeUndefined()
    expect(m.create).not.toHaveBeenCalled()
  })

  it('throws (no bypass) for an in-scope source when the tenant has no ФУ', async () => {
    const m = mockPayload({ device: null })
    await expect(fiscalizeRevenue(asPayload(m), INPUT)).rejects.toThrow(/no СУПТО bypass/)
    expect(m.create).not.toHaveBeenCalled()
  })
})

describe('reverseRevenueFiscalization', () => {
  it('сторнос the linked sale and seals the original', async () => {
    const m = mockPayload({ existing: { id: 'sale-1', status: 'closed' } })
    m.create.mockResolvedValue({ id: 'rev-1' }) // reverseSale creates the negated mirror
    const rev = await reverseRevenueFiscalization(asPayload(m), { sourceType: 'order', sourceId: 'ord-1', reason: 'refund' })
    expect(rev?.id).toBe('rev-1')
    expect(m.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ reversalOf: 'sale-1' }) }),
    )
  })

  it('skips when no sale is linked', async () => {
    const m = mockPayload({ existing: null })
    const rev = await reverseRevenueFiscalization(asPayload(m), { sourceType: 'order', sourceId: 'ord-1' })
    expect(rev).toBeUndefined()
  })

  it('skips an already-reversed sale (idempotent)', async () => {
    const m = mockPayload({ existing: { id: 'sale-1', status: 'reversed' } })
    await reverseRevenueFiscalization(asPayload(m), { sourceType: 'order', sourceId: 'ord-1' })
    expect(m.create).not.toHaveBeenCalled()
  })
})
