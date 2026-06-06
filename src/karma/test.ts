import { describe, it, expect } from 'vitest'
import { karmaEntry, karma, balanced } from '@/karma'
import { isBalanced } from '@/entry'

// The entropy moral ledger: every posting balances (order debited, entropy credited);
// net karma = order created − destroyed.
describe('karma — the entropy moral ledger', () => {
  it('a karma posting is balanced — order debited, entropy credited', () => {
    const e = karmaEntry(8)
    expect(balanced(e)).toBe(true)
    expect(isBalanced(e)).toBe(true)
    expect(e.lines.find((l) => l.accountable === 'order')?.debit).toBe(8)
    expect(e.lines.find((l) => l.accountable === 'entropy')?.credit).toBe(8)
  })
  it('net karma = created − destroyed (positive = good karma, ↓entropy)', () => {
    expect(karma(10, 3)).toBe(7)
    expect(karma(2, 5)).toBe(-3) // net destruction = bad karma
    expect(karma(0, 0)).toBe(0)
  })
})
