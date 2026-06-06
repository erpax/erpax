import { describe, it, expect } from 'vitest'
import { measuredEntropy, billEntropy } from '@/expense'
import { net, isBalanced } from '@/entry'

describe('expense — entropy is measurable and billable', () => {
  it('measuredEntropy sums the disorder sources (reciprocity slack + import gap), all ≥ 0', () => {
    const m = measuredEntropy()
    expect(m.reciprocitySlack).toBeGreaterThanOrEqual(0)
    expect(m.importGap).toBeGreaterThanOrEqual(0)
    expect(m.total).toBeCloseTo(m.reciprocitySlack + m.importGap, 10)
  })
  it('billEntropy produces a BALANCED double-entry expense (the books balance — net 0)', () => {
    const bill = billEntropy('agent:x', 10)
    expect(isBalanced(bill)).toBe(true)
    expect(net(bill)).toBe(0)
  })
  it('a higher rate bills more, and both still balance (conservation holds at any price)', () => {
    expect(isBalanced(billEntropy('agent:x', 4, 1))).toBe(true)
    expect(isBalanced(billEntropy('agent:x', 4, 2))).toBe(true)
  })
})
