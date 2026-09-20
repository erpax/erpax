import { describe, expect, it } from 'vitest'
import { disposition, reconcileOffice, reportable } from '@/treasury'

describe('treasury — a public office reconciles like any other, and disposes unlike any other', () => {
  it('balances a counted office', () => {
    const v = reconcileOffice({ opening: 10000, movements: [{ amount: 5000 }], counted: { 10000: 1, 5000: 1 } })
    expect(v.state).toBe('balanced')
    expect(disposition(v)).toBe('none')
  })

  it('SURRENDERS an over — public money has no owner who may keep it', () => {
    const v = reconcileOffice({ opening: 10000, movements: [], counted: { 10000: 1, 500: 1 } })
    expect(v.variance).toBe(500)
    expect(disposition(v)).toBe('surrender-to-fund')
  })

  it('raises a deficiency on a short, rather than carrying it forward', () => {
    const v = reconcileOffice({ opening: 10000, movements: [], counted: { 5000: 1 } })
    expect(v.variance).toBe(-5000)
    expect(disposition(v)).toBe('raise-deficiency')
  })

  it('has no disposition that means silence — every non-zero variance names an action', () => {
    const over = reconcileOffice({ opening: 0, movements: [], counted: { 5: 1 } })
    const short = reconcileOffice({ opening: 5, movements: [], counted: {} })
    expect(disposition(over)).not.toBe('none')
    expect(disposition(short)).not.toBe('none')
  })

  it('reports at ONE CENT, because there is nobody who may absorb a difference', () => {
    expect(reportable(reconcileOffice({ opening: 0, movements: [], counted: { 1: 1 } }))).toBe(true)
    expect(reportable(reconcileOffice({ opening: 1, movements: [], counted: { 1: 1 } }))).toBe(false)
  })
})
