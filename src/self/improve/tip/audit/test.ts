import { describe, it, expect } from 'vitest'
import { scoreGap, secretNamesPresent } from './index'

describe('self/improve/tip/audit — unblock / (cost × risk)', () => {
  it('ranks by unblock per unit of cost and risk', () => {
    const cheap = scoreGap({ unblock: 10, cost: 1, risk: 1 })
    const costly = scoreGap({ unblock: 10, cost: 5, risk: 2 })
    expect(cheap).toBeGreaterThan(costly)
  })

  it('never divides by zero — a zero cost or risk is floored to one', () => {
    expect(Number.isFinite(scoreGap({ unblock: 3, cost: 0, risk: 0 }))).toBe(true)
    expect(scoreGap({ unblock: 3, cost: 0, risk: 0 })).toBe(scoreGap({ unblock: 3, cost: 1, risk: 1 }))
  })

  it('an unblock of zero scores zero — noise never outranks work', () => {
    expect(scoreGap({ unblock: 0, cost: 1, risk: 1 })).toBe(0)
  })

  it('reports only that secrets EXIST — never a value', () => {
    const s = secretNamesPresent(process.cwd()) as unknown as Record<string, unknown>
    for (const v of Object.values(s)) expect(typeof v).toBe('boolean')
  })
})
