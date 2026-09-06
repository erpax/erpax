import { describe, it, expect } from 'vitest'
import { netsToZero, reverseEntry, reverseLines, variance, type ReversibleLine } from './index'

const origin: ReversibleLine[] = [
  { glAccount: '4000', debit: 1000 },
  { glAccount: '2100', credit: 600 },
  { glAccount: '2200', credit: 400 },
]

describe('reverse — the mirror of a balanced entry', () => {
  it('swaps each side and keeps the account and the amount', () => {
    expect(reverseLines(origin)).toEqual([
      { glAccount: '4000', credit: 1000 },
      { glAccount: '2100', debit: 600 },
      { glAccount: '2200', debit: 400 },
    ])
  })

  // The property the operation exists for. Asserted by SUMMING, not by trusting that swapping two
  // fields must work out — a reversal that re-derived its figures could disagree with its origin.
  it('the pair nets to zero: the ledger is left as it was found', () => {
    expect(variance(origin)).toBe(0)
    expect(netsToZero(origin, reverseLines(origin))).toBe(true)
  })

  // An UNBALANCED origin still reverses to something that nets with it. Reversal does not repair a
  // bad entry, and must not pretend to — the imbalance survives in both, and cancels in the pair.
  it('nets to zero even when the origin is unbalanced, without silently fixing it', () => {
    const bad: ReversibleLine[] = [{ glAccount: '4000', debit: 100 }, { glAccount: '2100', credit: 60 }]
    expect(variance(bad)).toBe(40)
    expect(variance(reverseLines(bad))).toBe(-40)
    expect(netsToZero(bad, reverseLines(bad))).toBe(true)
  })

  // Reversing twice is the identity — the involution [[duality]]/mirror describes, here on money.
  it('is an involution: reversing a reversal returns the original', () => {
    expect(reverseLines(reverseLines(origin))).toEqual(origin)
  })

  it('leaves a zero side absent rather than writing an explicit 0', () => {
    const r = reverseLines([{ glAccount: '4000', debit: 500, credit: 0 }])
    expect(r[0]).toEqual({ glAccount: '4000', credit: 500 })
    expect(Object.hasOwn(r[0]!, 'debit')).toBe(false)
  })

  // SAF-T §3 asks for a distinct posting date and a link to the origin. A reversal with no origin
  // is an adjustment wearing the word, and nothing downstream could pair the two.
  it('carries its origin and its own posting date', () => {
    const r = reverseEntry('JE-1', origin, '2026-09-06')
    expect(r.reversesEntryId).toBe('JE-1')
    expect(r.postingDate).toBe('2026-09-06')
    expect(r.lines).toHaveLength(origin.length)
  })

  it('an empty entry reverses to an empty entry', () => {
    expect(reverseLines([])).toEqual([])
    expect(netsToZero([], [])).toBe(true)
  })
})
