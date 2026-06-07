import { describe, it, expect, beforeEach } from 'vitest'
import { setBudget, recordCost, estimateMicroUsd, getBudget, __resetBudgets } from '@/beyond/cost'
import type { CostMetric } from '@/beyond/types'

const metric = (over: Partial<CostMetric> = {}): CostMetric => ({
  cpuMs: 0,
  storageBytes: 0,
  egressBytes: 0,
  ...over,
})

// Law 15 — cost: every step prices CPU/egress/AI tokens in micro-USD and accrues
// against a per-tenant cap; the step is refused once the cap is crossed.
describe('beyond/cost — micro-USD pricing + budget gate', () => {
  beforeEach(() => {
    __resetBudgets()
  })

  it('estimateMicroUsd prices CPU at 0.02 µUSD/ms', () => {
    expect(estimateMicroUsd(metric({ cpuMs: 100 }))).toBe(2)
  })

  it('estimateMicroUsd sums CPU, egress and AI tokens', () => {
    // cpu: 50*0.02=1 ; egress: 2048/1024*0.05=0.1 ; ai: (100+100)*0.0001=0.02
    const total = estimateMicroUsd(metric({ cpuMs: 50, egressBytes: 2048, aiTokensIn: 100, aiTokensOut: 100 }))
    expect(total).toBeCloseTo(1.12, 5)
  })

  it('a free step costs nothing', () => {
    expect(estimateMicroUsd(metric())).toBe(0)
  })

  it('recordCost accrues spend and returns the remaining budget', () => {
    setBudget('t-1', 100)
    const res = recordCost('t-1', metric({ cpuMs: 1000 })) // 1000*0.02 = 20
    expect(res.ok).toBe(true)
    expect(res.remaining).toBe(80)
    expect(getBudget('t-1')?.spentMicroUsd).toBe(20)
  })

  it('an explicit microUsd overrides the estimate', () => {
    setBudget('t-1', 100)
    const res = recordCost('t-1', metric({ cpuMs: 1000, microUsd: 5 }))
    expect(res.ok).toBe(true)
    expect(getBudget('t-1')?.spentMicroUsd).toBe(5)
  })

  it('the step is refused once spend crosses the cap', () => {
    setBudget('t-1', 10)
    const res = recordCost('t-1', metric({ cpuMs: 1000 })) // 20 > 10
    expect(res.ok).toBe(false)
    expect(res.remaining).toBeUndefined()
  })

  it('with no budget set the cap is infinite — never refused', () => {
    const res = recordCost('t-fresh', metric({ cpuMs: 1_000_000 }))
    expect(res.ok).toBe(true)
  })
})
