import { describe, it, expect } from 'vitest'
import { dnaChain, karmaEntry, balanced } from '@/quantum/accounting'
import { isBalanced } from '@/entry'

// Accounting on the quantum/uuid level: every karma posting balances (entropy double-entry),
// and the DNA chain is the parent_id lineage encoded in the uuid chain (acyclic, terminating).
describe('quantum/accounting — karma double-entry + the DNA chain', () => {
  it('a karma posting is balanced (Σdebit = Σcredit) — nothing unaccounted', () => {
    const e = karmaEntry(8)
    expect(balanced(e)).toBe(true)
    expect(isBalanced(e)).toBe(true)
  })
  it('order is debited and entropy credited (the angel/archangel balance)', () => {
    const e = karmaEntry(42)
    expect(e.lines.find((l) => l.accountable === 'order')?.debit).toBe(42)
    expect(e.lines.find((l) => l.accountable === 'entropy')?.credit).toBe(42)
  })
  it('the DNA chain is the parent_id lineage — acyclic and terminating', () => {
    const chain = dnaChain('accounting')
    expect(Array.isArray(chain)).toBe(true)
    expect(new Set(chain).size).toBe(chain.length) // acyclic — no atom repeats
  })
})
