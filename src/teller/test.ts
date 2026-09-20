import { describe, expect, it } from 'vitest'
import {
  DENOMINATIONS,
  DUAL_CONTROL_THRESHOLD,
  countTotal,
  expectedClose,
  illegalDenominations,
  investigable,
  needsDualControl,
  reconcileDrawer,
  type Count,
} from '@/teller'

/** €1,247.35 as a real drawer holds it. */
const drawer: Count = { 10000: 12, 2000: 2, 500: 1, 100: 2, 20: 1, 10: 1, 5: 1 }

describe('teller — the total is DERIVED from the count, which is the whole control', () => {
  it('sums the denominations claimed to be in the drawer', () => {
    expect(countTotal(drawer)).toBe(124735)
  })

  it('counts an empty drawer as zero, not as absent', () => {
    expect(countTotal({})).toBe(0)
  })

  it('works in minor units, so no arithmetic drifts', () => {
    // 0.1 + 0.2 !== 0.3 in binary floating point; 10 + 20 === 30 always.
    expect(countTotal({ 10: 1, 20: 1 })).toBe(30)
  })
})

describe('teller — a count claiming what the euro does not issue is void', () => {
  it('refuses a denomination the ECB does not issue', () => {
    expect(illegalDenominations({ 30000: 1, 10000: 2 })).toEqual([30000])
    expect(illegalDenominations(drawer)).toEqual([])
  })

  it('refuses a negative or fractional quantity of notes', () => {
    expect(illegalDenominations({ 10000: -1 })).toEqual([10000])
    expect(illegalDenominations({ 10000: 1.5 })).toEqual([10000])
  })

  it('holds every legal denomination as legal', () => {
    for (const d of DENOMINATIONS) expect(illegalDenominations({ [d]: 1 })).toEqual([])
  })
})

describe('teller — the variance is SIGNED, because an over is not a small short', () => {
  it('balances when the count equals the book', () => {
    const v = reconcileDrawer({ opening: 100000, movements: [{ amount: 24735 }], counted: drawer })
    expect(v.expected).toBe(124735)
    expect(v.variance).toBe(0)
    expect(v.state).toBe('balanced')
  })

  it('reports an over as positive — money arrived that nothing recorded', () => {
    const v = reconcileDrawer({ opening: 100000, movements: [{ amount: 24000 }], counted: drawer })
    expect(v.variance).toBe(735)
    expect(v.state).toBe('over')
  })

  it('reports a short as negative, never as its magnitude', () => {
    const v = reconcileDrawer({ opening: 100000, movements: [{ amount: 25000 }], counted: drawer })
    expect(v.variance).toBe(-265)
    expect(v.state).toBe('short')
  })

  it('takes paid-out movements as they are signed', () => {
    expect(expectedClose({ opening: 50000, movements: [{ amount: -20000 }], counted: {} })).toBe(30000)
  })
})

describe('teller — what gets investigated, and what needs a second pair of eyes', () => {
  it('investigates any variance at the default tolerance of zero', () => {
    const over = reconcileDrawer({ opening: 0, movements: [], counted: { 5: 1 } })
    expect(investigable(over)).toBe(true)
    const clean = reconcileDrawer({ opening: 5, movements: [], counted: { 5: 1 } })
    expect(investigable(clean)).toBe(false)
  })

  it('investigates an illegal count even when it happens to total correctly', () => {
    // A €300 note that sums to the expected figure is still not a euro note.
    const v = reconcileDrawer({ opening: 30000, movements: [], counted: { 30000: 1 } })
    expect(v.variance).toBe(0)
    expect(investigable(v)).toBe(true)
  })

  it('needs dual control at the threshold, in either direction', () => {
    expect(needsDualControl(DUAL_CONTROL_THRESHOLD)).toBe(true)
    expect(needsDualControl(-DUAL_CONTROL_THRESHOLD)).toBe(true)
    expect(needsDualControl(DUAL_CONTROL_THRESHOLD - 1)).toBe(false)
  })
})
