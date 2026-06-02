import { describe, it, expect } from 'vitest'
import {
  toDoubleEntry,
  net,
  isBalanced,
  reverse,
  consolidate,
  accountableBalances,
  accountedFor,
  type Flow,
} from './index'

describe('entry — all is accounted for in all directions; the wiring closes through the ledger', () => {
  it('ANY flow reduces to a balanced double-entry: payer credits (gives), payee debits (takes)', () => {
    const e = toDoubleEntry({ payer: 'A', payee: 'B', amount: 100 })
    expect(e.lines).toEqual([
      { accountable: 'A', debit: 0, credit: 100 },
      { accountable: 'B', debit: 100, credit: 0 },
    ])
    expect(net(e)).toBe(0)
    expect(isBalanced(e)).toBe(true)
    expect(accountableBalances(e)).toEqual({ A: -100, B: 100 }) // A out, B in — the two signs of one transfer
  })

  it('the REVERSE is inherent (the reverse skill): reverse swaps debit↔credit, reverse∘reverse = identity', () => {
    const e = toDoubleEntry({ payer: 'A', payee: 'B', amount: 100 })
    const r = reverse(e)
    expect(accountableBalances(r)).toEqual({ A: 100, B: -100 }) // the undo
    expect(isBalanced(r)).toBe(true)
    expect(reverse(r)).toEqual(e) // dual of a dual is the original
  })

  it('MOUNTING N ledgers CONSOLIDATES; intercompany pairs eliminate to net zero (ASC 810-10-45)', () => {
    const book = consolidate([
      toDoubleEntry({ payer: 'A', payee: 'B', amount: 100 }),
      toDoubleEntry({ payer: 'B', payee: 'A', amount: 100 }), // the return leg — different direction
    ])
    expect(isBalanced(book)).toBe(true)
    expect(accountableBalances(book)).toEqual({ A: 0, B: 0 }) // every intercompany position nets out
  })

  it('ALL accounted for in ALL directions ⇒ wiring complete; a malformed flow is NOT accountable', () => {
    const closed: Flow[] = [
      { payer: 'A', payee: 'B', amount: 100 },
      { payer: 'B', payee: 'C', amount: 100 },
      { payer: 'C', payee: 'A', amount: 100 }, // a closed cycle — every edge closed
    ]
    expect(accountedFor(closed)).toBe(true)
    expect(accountableBalances(consolidate(closed.map(toDoubleEntry)))).toEqual({ A: 0, B: 0, C: 0 })
    expect(accountedFor([{ payer: 'A', payee: 'B', amount: Number.NaN }])).toBe(false) // un-accountable ⇒ caught
  })
})
