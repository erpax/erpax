import { describe, it, expect } from 'vitest'
import { researchCost, researchExpense, researchValue, researchLedger, type ResearchRun } from '@/quantum/research'
import { net, isBalanced } from '@/entry'

const run: ResearchRun = { agent: 'a', agents: 5, tokens: 1000, entropyReduced: 8000 }

describe('quantum/research — research is a billable expense; worth = entropy reduced − cost', () => {
  it('cost is agents × tokens (the real resource spend)', () => {
    expect(researchCost(run)).toBe(5000)
  })
  it('the expense and the value are each balanced double-entries', () => {
    expect(isBalanced(researchExpense(run))).toBe(true)
    expect(isBalanced(researchValue(run, 1))).toBe(true)
  })
  it('the ledger consolidates to a balanced entry; worth = value − cost', () => {
    const l = researchLedger(run, 1)
    expect(net(l.entry)).toBe(0)
    expect(l.worth).toBe(8000 - 5000)
    expect(l.worthwhile).toBe(true)
  })
  it('wasteful research (cost > value) is not worthwhile', () => {
    const l = researchLedger({ agent: 'a', agents: 9, tokens: 1000, entropyReduced: 10 }, 1)
    expect(l.worth).toBeLessThan(0)
    expect(l.worthwhile).toBe(false)
  })
})
