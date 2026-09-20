import { describe, expect, it } from 'vitest'
import {
  countTotal,
  expectedClose,
  illegalUnits,
  investigable,
  needsDualControl,
  reconcile,
  type Units,
} from '@/float'

/** Three unit sets that share nothing but the law. */
const CASH: Units = [10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]
const CHIPS: Units = [500000, 100000, 50000, 10000, 2500, 500, 100]
const ROUNDS: Units = [1] // an armoury counts single items; the unit set is {1}

describe('float — the total is DERIVED, and there is no way to supply one', () => {
  it('sums a count of units', () => {
    expect(countTotal({ 10000: 12, 2000: 2, 500: 1, 100: 2, 20: 1, 10: 1, 5: 1 })).toBe(124735)
  })

  it('reads an empty count as zero, never as absent', () => {
    expect(countTotal({})).toBe(0)
  })

  it('stays exact, because amounts are minor units and not floats', () => {
    expect(countTotal({ 10: 1, 20: 1 })).toBe(30)
  })
})

describe('float — the unit set is the case, and the law does not change with it', () => {
  it('accepts each set’s own units and refuses the others’', () => {
    expect(illegalUnits({ 2500: 4 }, CHIPS)).toEqual([])
    expect(illegalUnits({ 2500: 4 }, CASH)).toEqual([2500]) // no 25-euro note exists
    expect(illegalUnits({ 1: 300 }, ROUNDS)).toEqual([])
  })

  it('refuses a fractional or negative quantity in any set', () => {
    expect(illegalUnits({ 100: 1.5 }, CASH)).toEqual([100])
    expect(illegalUnits({ 100: -1 }, CASH)).toEqual([100])
  })

  it('reconciles three different cases with one function', () => {
    const drawer = reconcile({ opening: 10000, movements: [{ amount: 5000 }], counted: { 10000: 1, 5000: 1 } }, CASH)
    const tray = reconcile({ opening: 100000, movements: [{ amount: 2500 }], counted: { 100000: 1, 2500: 1 } }, CHIPS)
    const armoury = reconcile({ opening: 300, movements: [{ amount: -20 }], counted: { 1: 280 } }, ROUNDS)
    expect([drawer.state, tray.state, armoury.state]).toEqual(['balanced', 'balanced', 'balanced'])
  })
})

describe('float — the variance is SIGNED, because an over is not a small short', () => {
  it('reports an over as positive: value arrived that nothing recorded', () => {
    const v = reconcile({ opening: 0, movements: [], counted: { 5: 1 } }, CASH)
    expect(v.variance).toBe(5)
    expect(v.state).toBe('over')
  })

  it('reports a short as negative, never as its magnitude', () => {
    const v = reconcile({ opening: 100, movements: [], counted: { 50: 1 } }, CASH)
    expect(v.variance).toBe(-50)
    expect(v.state).toBe('short')
  })

  it('takes paid-out movements as they are signed', () => {
    expect(expectedClose({ opening: 50000, movements: [{ amount: -20000 }], counted: {} })).toBe(30000)
  })
})

describe('float — an unusable count is unusable even when it agrees', () => {
  it('investigates an illegal count that happens to total correctly', () => {
    // A 25-euro note does not exist. It sums to the expected figure and is still not evidence.
    const v = reconcile({ opening: 2500, movements: [], counted: { 2500: 1 } }, CASH)
    expect(v.variance).toBe(0)
    expect(v.state).toBe('balanced')
    expect(investigable(v)).toBe(true)
  })

  it('does not investigate a clean count at the default zero tolerance', () => {
    const v = reconcile({ opening: 5, movements: [], counted: { 5: 1 } }, CASH)
    expect(investigable(v)).toBe(false)
  })

  it('absorbs a variance inside an explicit tolerance, and nothing beyond it', () => {
    const v = reconcile({ opening: 0, movements: [], counted: { 5: 1 } }, CASH)
    expect(investigable(v, 5)).toBe(false)
    expect(investigable(v, 4)).toBe(true)
  })
})

describe('float — four-eyes triggers at the threshold, in either direction', () => {
  it('fires at and above, not below', () => {
    expect(needsDualControl(1000, 1000)).toBe(true)
    expect(needsDualControl(-1000, 1000)).toBe(true)
    expect(needsDualControl(999, 1000)).toBe(false)
  })
})
