import { describe, expect, it } from 'vitest'

import { invoiceMargin, lineMargin, unitCost, type InvoiceLineInput } from './index'

describe('margin — billing delivers cost + margin (materials + labor vs price)', () => {
  it('unit cost = materials + labor (the manufactured cost)', () => {
    expect(unitCost({ materials: 300, labor: 200 })).toBe(500)
    expect(unitCost({ materials: -50, labor: 200 })).toBe(200) // negatives floored
  })

  it('a line carries revenue, cost, gross margin, and margin %', () => {
    // price 1000c, cost 600c (400 materials + 200 labor), qty 3
    const m = lineMargin(1000, { materials: 400, labor: 200 }, 3)
    expect(m.revenue).toBe(3000)
    expect(m.cost).toBe(1800)
    expect(m.grossMargin).toBe(1200)
    expect(m.marginPct).toBeCloseTo(0.4)
  })

  it('a loss is knowledge too — margin can be negative', () => {
    const m = lineMargin(500, { materials: 400, labor: 300 }, 1) // cost 700 > price 500
    expect(m.grossMargin).toBe(-200)
    expect(m.marginPct).toBeCloseTo(-0.4)
  })

  it('zero revenue ⇒ marginPct 0 (defined, never NaN)', () => {
    expect(lineMargin(0, { materials: 100, labor: 0 }, 5).marginPct).toBe(0)
  })

  it('invoiceMargin rolls up the lines into the sale total', () => {
    const lines: InvoiceLineInput[] = [
      { unitPrice: 1000, cost: { materials: 400, labor: 200 }, qty: 3 }, // rev 3000, cost 1800
      { unitPrice: 500, cost: { materials: 100, labor: 50 }, qty: 4 }, // rev 2000, cost 600
    ]
    const m = invoiceMargin(lines)
    expect(m.revenue).toBe(5000)
    expect(m.cost).toBe(2400)
    expect(m.grossMargin).toBe(2600)
    expect(m.marginPct).toBeCloseTo(0.52)
  })

  it('empty invoice ⇒ all zero (the closed empty case)', () => {
    expect(invoiceMargin([])).toEqual({ revenue: 0, cost: 0, grossMargin: 0, marginPct: 0 })
  })
})
