/**
 * сторно tests — mirror of the reverse skill: a reversal is a new sale with
 * negated money that preserves + seals the original.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §СУПТО сторно
 * @see src/services/supto/reverse-sale.ts
 */

import { describe, it, expect, vi } from 'vitest'
import type { Payload } from 'payload'
import { reverseSale } from './reverse-sale'

const ORIGINAL = {
  id: 'sale-1',
  unp: '12345678-0042-0000001',
  status: 'closed',
  fiscalDeviceNumber: '12345678',
  operatorCode: '0042',
  currency: 'EUR',
  paymentType: 'cash',
  tenant: 't1',
  total: 1_200_00,
  items: [{ description: 'Widget', quantity: 2, unitPrice: 600_00, amount: 1_200_00 }],
}

function mockPayload(original = ORIGINAL) {
  return {
    findByID: vi.fn().mockResolvedValue(original),
    create: vi.fn().mockResolvedValue({ id: 'sale-2', unp: '12345678-0042-0000002', status: 'closed' }),
    update: vi.fn().mockResolvedValue({ ...original, status: 'reversed', reversedBy: 'sale-2' }),
  }
}

const asPayload = (m: ReturnType<typeof mockPayload>) => m as unknown as Payload

describe('reverseSale (сторно)', () => {
  it('creates a mirror sale with negated total + items, linked via reversalOf', async () => {
    const m = mockPayload()
    await reverseSale(asPayload(m), { originalSaleId: 'sale-1', reason: 'customer return' })

    expect(m.create).toHaveBeenCalledOnce()
    const created = m.create.mock.calls[0][0].data
    expect(created.total).toBe(-1_200_00)
    expect(created.items[0].amount).toBe(-1_200_00)
    expect(created.items[0].quantity).toBe(-2)
    expect(created.reversalOf).toBe('sale-1')
    expect(created.reversalReason).toBe('customer return')
    expect(created.fiscalDeviceNumber).toBe('12345678') // same ФУ → next sequence
    expect(created.unp).toBeUndefined() // sequence hook assigns it
    expect(created.status).toBe('closed')
  })

  it('seals the original closed → reversed with a reversedBy back-link', async () => {
    const m = mockPayload()
    const { original } = await reverseSale(asPayload(m), { originalSaleId: 'sale-1' })
    expect(m.update).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'sale-1', data: { status: 'reversed', reversedBy: 'sale-2' } }),
    )
    expect(original.status).toBe('reversed')
  })

  it('refuses to reverse an already-reversed sale', async () => {
    const m = mockPayload({ ...ORIGINAL, status: 'reversed' })
    await expect(reverseSale(asPayload(m), { originalSaleId: 'sale-1' })).rejects.toThrow(/already reversed/)
    expect(m.create).not.toHaveBeenCalled()
  })
})
