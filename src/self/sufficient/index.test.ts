/**
 * self/sufficient — the law proved. Green by construction: decreasing external
 * dependence increases the effective tampering cost; full self-sufficiency at
 * full coverage is uncrackable. @see ./index.ts, src/self/sufficient/SKILL.md
 */
import { describe, it, expect } from 'vitest'
import {
  selfSufficiencyVerdict,
  internalise,
  selfSufficientCrackVerdict,
  type ExternalDependency,
} from '@/self/sufficient'

const DEPS: ReadonlyArray<ExternalDependency> = [
  { id: 'anthropic-api', kind: 'ai-model', compromiseBits: 40, internalisable: true },
  { id: 'plaid', kind: 'service', compromiseBits: 64 },
]

describe('self/sufficient: the weakest external link binds', () => {
  it('no liabilities ⇒ the digest/anchor floor binds, fully self-sufficient', () => {
    const v = selfSufficiencyVerdict({})
    expect(v.binding).not.toBe('dependency')
    expect(v.effectiveCostBits).toBe(106)
    expect(v.selfSufficiency).toBe(1)
    expect(v.weakestLink).toBeNull()
  })
  it('a cheap external dependency caps the effective cost at its compromise bits', () => {
    const v = selfSufficiencyVerdict({ liabilities: DEPS })
    expect(v.binding).toBe('dependency')
    expect(v.effectiveCostBits).toBe(40) // the AI-model API, not the 2^106 digest
    expect(v.weakestLink).toBe('anthropic-api')
    expect(v.dependenceCount).toBe(2)
    expect(v.selfSufficiency).toBeCloseTo(40 / 106, 6)
  })
})

describe('self/sufficient: decrease dependence ⇒ increase tampering cost', () => {
  it('internalising the binding dependency raises the floor', () => {
    const before = selfSufficiencyVerdict({ liabilities: DEPS })
    const { liabilities: afterDeps, verdict: after } = internalise(DEPS, 'anthropic-api')
    expect(after.effectiveCostBits).toBeGreaterThan(before.effectiveCostBits) // 64 > 40
    expect(after.weakestLink).toBe('plaid')
    const { verdict: full } = internalise(afterDeps, 'plaid')
    expect(full.binding).not.toBe('dependency')
    expect(full.effectiveCostBits).toBe(106) // the digest floor — fully self-sufficient
    expect(full.selfSufficiency).toBe(1)
  })
  it('internalisation is monotonic — removing a dep never lowers the cost', () => {
    let deps = DEPS
    let prev = selfSufficiencyVerdict({ liabilities: deps }).effectiveCostBits
    for (const id of ['anthropic-api', 'plaid']) {
      const step = internalise(deps, id)
      expect(step.verdict.effectiveCostBits).toBeGreaterThanOrEqual(prev)
      deps = step.liabilities
      prev = step.verdict.effectiveCostBits
    }
  })
})

describe('self/sufficient: the bridge to tamper-cost', () => {
  it('a cheap dependency makes the crack verdict bound by it (the weak anchor)', () => {
    const v = selfSufficientCrackVerdict({ liabilities: DEPS })
    expect(v.crackCostLog2).toBe(40)
    expect(v.binding).toBe('anchor') // the external dep IS the binding anchor
  })
  it('fully self-sufficient + full coverage ⇒ infinite crack cost', () => {
    const v = selfSufficientCrackVerdict({ liabilities: [], coverage: 1 })
    expect(v.crackCostLog2).toBe(Number.POSITIVE_INFINITY)
    expect(v.note).toMatch(/100% coverage/)
  })
})
