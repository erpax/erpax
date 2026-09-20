import { describe, expect, it } from 'vitest'
import { ITEMS, outstanding, reconcileArmoury, reportable } from '@/armory'

describe('armoury — items are counted one at a time, and nothing is absorbed', () => {
  it('counts in units of one and refuses any larger unit', () => {
    expect([...ITEMS]).toEqual([1])
    expect(reconcileArmoury({ opening: 10, movements: [], counted: { 5: 2 } }).illegal).toEqual([5])
  })

  it('balances when every issued item came back', () => {
    const v = reconcileArmoury({
      opening: 300,
      movements: [{ amount: -20, reference: 'issue' }, { amount: 20, reference: 'return' }],
      counted: { 1: 300 },
    })
    expect(v.state).toBe('balanced')
    expect(reportable(v)).toBe(false)
  })

  it('reports ONE missing item — the tolerance is zero and is not a dial', () => {
    const v = reconcileArmoury({ opening: 300, movements: [{ amount: -20 }], counted: { 1: 279 } })
    expect(v.variance).toBe(-1)
    expect(reportable(v)).toBe(true)
  })

  it('reports an UNEXPLAINED EXTRA item as loudly as a missing one', () => {
    const v = reconcileArmoury({ opening: 300, movements: [], counted: { 1: 301 } })
    expect(v.state).toBe('over')
    expect(reportable(v)).toBe(true)
  })
})

describe('armoury — the open custody chain is derived, never tracked separately', () => {
  it('counts what is issued and not yet returned', () => {
    expect(outstanding({ opening: 300, movements: [{ amount: -20 }, { amount: 5 }], counted: {} })).toBe(20)
  })

  it('is zero when nothing has been issued', () => {
    expect(outstanding({ opening: 300, movements: [{ amount: 10 }], counted: {} })).toBe(0)
  })
})
