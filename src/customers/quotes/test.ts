import { describe, it, expect } from 'vitest'
import { quotesPreset, quotesWhere } from '@/customers/quotes'
import SalesOrders, { lineNetOf, orderPresets, orderStages, quoteStages, totalsFromLines } from '@/customers/sales/orders'

// A quote is no longer a collection: it is a sales order at an earlier stage.
describe('quotes — the offer stage of sales orders', () => {
  it('selects the sales orders still at a quote stage', () => {
    expect(quotesWhere()).toEqual({ status: { in: ['pending_approval', 'sent', 'accepted', 'rejected', 'expired'] } })
  })

  it('is a saved list over sales orders, and Orders is its complement — no stage is in both', () => {
    expect(quotesPreset().relatedCollection).toBe('sales-orders')
    expect(orderPresets().map((p) => p.title)).toEqual(['Quotes', 'Orders'])
    expect(quoteStages().filter((s) => orderStages().includes(s))).toEqual([])
  })

  it('every quote and order stage is a status the collection actually has', () => {
    const status = SalesOrders.fields.find((f) => 'name' in f && f.name === 'status') as { options?: { value: string }[] }
    const values = new Set(status.options!.map((o) => o.value))
    for (const s of [...quoteStages(), ...orderStages()]) expect(values.has(s), s).toBe(true)
  })

  it('keeps the quote-only facts on the order: when it was sent, when it lapses, when it was accepted', () => {
    const names = new Set(SalesOrders.fields.flatMap((f) => ('name' in f ? [f.name] : [])))
    for (const n of ['sentAt', 'expiresAt', 'acceptedAt']) expect(names.has(n), n).toBe(true)
    expect(names.has('quote')).toBe(false) // an order no longer points at a separate quote
  })

  it('computes the totals from the lines, discount included', () => {
    expect(lineNetOf({ quantity: 3, unitPrice: 10, discount: 5 })).toBe(25)
    const data = { taxAmount: 4, lines: [{ quantity: 3, unitPrice: 10, discount: 5 }, { quantity: 1, unitPrice: 15 }] } as Record<string, unknown>
    void totalsFromLines({ data } as never)
    expect(data).toMatchObject({ subTotalAmount: 40, totalAmount: 44 })
  })
})
