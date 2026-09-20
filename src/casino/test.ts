import { describe, expect, it } from 'vitest'
import { CHIPS, drop, needsSecondAuthoriser, reconcileTray } from '@/casino'

describe('casino — the tray obeys the same law as the drawer, on its own scale', () => {
  it('balances a tray counted in house chips', () => {
    const v = reconcileTray({ opening: 100000, movements: [{ amount: 2500 }], counted: { 100000: 1, 2500: 1 } })
    expect(v.state).toBe('balanced')
  })

  it('voids a count claiming a chip the house does not issue', () => {
    const v = reconcileTray({ opening: 300, movements: [], counted: { 300: 1 } })
    expect(v.illegal).toEqual([300])
  })

  it('takes the scale as a PARAMETER — a house has more than one', () => {
    const tournament = [1000, 500, 100]
    const v = reconcileTray({ opening: 1600, movements: [], counted: { 1000: 1, 500: 1, 100: 1 } }, tournament)
    expect(v.state).toBe('balanced')
    // the same count against the cash scale is void, which is the point of passing the scale
    expect(reconcileTray({ opening: 1600, movements: [], counted: { 1000: 1, 500: 1, 100: 1 } }).illegal).toEqual([1000])
  })
})

describe('casino — the drop and the variance answer different questions', () => {
  it('reports the drop as movements alone, excluding the opening float', () => {
    const session = { opening: 100000, movements: [{ amount: 50000 }, { amount: -10000 }], counted: {} }
    expect(drop(session)).toBe(40000)
  })

  it('reports a drop of zero for a table that only broke even', () => {
    expect(drop({ opening: 100000, movements: [{ amount: 500 }, { amount: -500 }], counted: {} })).toBe(0)
  })

  it('separates a winning table from an uncountable one', () => {
    // A table can take money AND fail to count: the drop is positive, the variance is not zero.
    const session = { opening: 0, movements: [{ amount: 10000 }], counted: { 2500: 3 } }
    expect(drop(session)).toBe(10000)
    expect(reconcileTray(session).state).toBe('short')
  })
})

describe('casino — four-eyes at the house floor', () => {
  it('fires at the house floor in either direction, and takes an override', () => {
    expect(needsSecondAuthoriser(500000)).toBe(true)
    expect(needsSecondAuthoriser(-500000)).toBe(true)
    expect(needsSecondAuthoriser(499999)).toBe(false)
    // a house that sets its own floor gets its own answer
    expect(needsSecondAuthoriser(1000, 1000)).toBe(true)
  })

  it('keeps the chip scale descending, so a count reads largest first', () => {
    expect([...CHIPS]).toEqual([...CHIPS].sort((a, b) => b - a))
  })
})
