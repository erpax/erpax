import { describe, expect, it } from 'vitest'

import { faceOf } from '@/rules/face'

// The file that stood here asserted expect(true).toBe(true) — it passed for every
// possible state of sale and forbade nothing. What sale actually owes its
// callers is its FACE: import { X } from '@/sale' breaks the moment the barrel
// stops offering X, and nothing else in the tree reports that.
const OFFERED = [
  "SubmitSalesAuditResult",
  "assignSaleUnpHook",
  "collectSales",
  "deriveSaleOperatorCodeHook",
  "emitSaleClosedHook",
  "enforceSaleImmutability",
  "submitSalesAuditFile",
  "validateRefsHook"
] as const

describe('sale — the face it owes its callers', () => {
  it('offers every name a caller may import', () => {
    const live = new Set(faceOf('sale'))
    const lost = OFFERED.filter((n) => !live.has(n))
    expect(lost).toEqual([])
  })

  it('offers 8 name(s) — a silent drop changes the count', () => {
    expect(faceOf('sale').length).toBeGreaterThanOrEqual(OFFERED.length)
  })

  it('names nothing twice — a duplicated export is an ambiguous import', () => {
    const live = faceOf('sale')
    expect(new Set(live).size).toBe(live.length)
  })
})
