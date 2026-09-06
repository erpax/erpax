import { describe, expect, it } from 'vitest'
import {
  BILL_ACTIVE_STATUSES,
  INVOICE_ACTIVE_STATUSES,
  REVERSED_STATUSES,
  justActivated,
  justReversed,
} from '@/invoices/hooks/transition'

const doc = (status: string): Record<string, unknown> => ({ status })
const AR = INVOICE_ACTIVE_STATUSES
const AP = BILL_ACTIVE_STATUSES

describe('invoices/hooks/transition — the crossing, not the state', () => {
  it('activation fires on the crossing and not on a re-save', () => {
    expect(justActivated(AR, doc('issued'))).toBe(true) // a create that arrives active
    expect(justActivated(AR, doc('issued'), doc('draft'))).toBe(true)
    expect(justActivated(AR, doc('issued'), doc('open'))).toBe(false) // already active
    expect(justActivated(AR, doc('draft'), doc('draft'))).toBe(false)
  })

  // The two sets are NOT the same, and folding them into one silently broke AP: a bill becomes
  // live on 'approved', which AR does not have, and AR stays live through 'grace_period', which
  // AP does not have. The set is the parameter; only the edge detection is shared.
  it('AP activates on approved and AR does not — AR runs through grace_period and AP does not', () => {
    expect(justActivated(AP, doc('approved'), doc('draft'))).toBe(true)
    expect(justActivated(AR, doc('approved'), doc('draft'))).toBe(false)
    expect(justActivated(AR, doc('grace_period'), doc('draft'))).toBe(true)
    expect(justActivated(AP, doc('grace_period'), doc('draft'))).toBe(false)
    expect(AP.has('approved')).toBe(true)
    expect(AR.has('grace_period')).toBe(true)
  })

  // The asymmetry is the point: a document that ARRIVES cancelled reverses nothing — there is no
  // prior GL entry to undo, so emitting a reversal event would book an unwind of nothing.
  it('a create is never a reversal, however cancelled it arrives', () => {
    expect(justReversed(AR, doc('cancelled'))).toBe(false)
    expect(justReversed(AR, doc('cancelled'), doc('issued'))).toBe(true)
    expect(justReversed(AP, doc('voided'), doc('approved'))).toBe(true)
    expect(justReversed(AR, doc('cancelled'), doc('draft'))).toBe(false)
  })

  it('an unknown status is neither', () => {
    expect(justActivated(AR, doc('weird'), doc('draft'))).toBe(false)
    expect(justReversed(AR, doc('weird'), doc('issued'))).toBe(false)
    expect(justActivated(AR, {}, doc('draft'))).toBe(false)
    expect([...REVERSED_STATUSES]).toEqual(['cancelled', 'reversed', 'voided'])
  })
})
