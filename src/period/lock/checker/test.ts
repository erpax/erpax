import { describe, it, expect } from 'vitest'
import { PeriodLockChecker } from './index'
import type { PeriodLock } from './index'

// The @invariant "closed periods cannot accept new postings (except reversals, prior-period-adjustments)"
// was a bare axiom (no proof beside it, rules/refutable). This is the proof leg — the §404 control an
// auditor signs: you cannot post to a closed period.
const lock = (status: 'open' | 'locked' | 'archived'): PeriodLock =>
  ({ fiscalYear: 2026, fiscalPeriod: 5, periodStartDate: '2026-05-01', periodEndDate: '2026-05-31', lockStatus: status }) as PeriodLock
const inMay = '2026-05-12'

describe('period/lock/checker — "closed periods refuse new postings, except reversals/PPA", proven', () => {
  it('an OPEN period accepts new postings', () => {
    const r = PeriodLockChecker.checkPeriod(inMay, [lock('open')])
    expect(r.isLocked).toBe(false)
    expect(r.allowNewPostings).toBe(true)
  })

  it('a LOCKED period REFUSES a normal posting — the invariant holds, admin override required', () => {
    const r = PeriodLockChecker.checkPeriod(inMay, [lock('locked')])
    expect(r.isLocked).toBe(true)
    expect(r.allowNewPostings).toBe(false) // the law: no new postings to a closed period
    expect(r.requiresAdminOverride).toBe(true)
  })

  it('the EXCEPTIONS hold: a reversal and a prior-period-adjustment are allowed in a locked period', () => {
    const rev = PeriodLockChecker.checkPeriod(inMay, [lock('locked')], true, false)
    expect(rev.allowReversals).toBe(true)
    expect(rev.requiresAdminOverride).toBe(false)
    const ppa = PeriodLockChecker.checkPeriod(inMay, [lock('locked')], false, true)
    expect(ppa.allowPriorPeriodAdjustments).toBe(true)
    expect(ppa.requiresAdminOverride).toBe(false)
  })

  it('an ARCHIVED period is read-only — no new postings', () => {
    expect(PeriodLockChecker.checkPeriod(inMay, [lock('archived')]).allowNewPostings).toBe(false)
  })

  it('FAILS CLOSED on an unparseable date — cannot place the period, so deny (the §404 bypass this fixed)', () => {
    const r = PeriodLockChecker.checkPeriod('not-a-date', [lock('locked')])
    expect(r.isLocked).toBe(true)
    expect(r.allowNewPostings).toBe(false) // an Invalid Date must NOT silently bypass the lock
    expect(r.requiresAdminOverride).toBe(true)
  })
})
