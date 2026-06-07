import { describe, it, expect } from 'vitest'
import { ClosingPeriodChecker } from '@/period/end/closing'

// Period-end closing: a period closes only once, closing entries must balance
// (Σ revenue = Σ expense in magnitude), and reversals flip the sign into the next
// period — the double-entry cross carried across the period boundary.
describe('period/end/closing — ClosingPeriodChecker: balance + once-only closing', () => {
  it('a fresh monthly period is eligible to close', () => {
    const r = ClosingPeriodChecker.checkClosingEligibility(2026, 5, 'monthly', [])
    expect(r.isEligible).toBe(true)
    expect(r.errors).toHaveLength(0)
    expect(r.canAutoGenerateReversals).toBe(true)
  })

  it('a period already closed cannot be closed again (idempotent guard)', () => {
    const r = ClosingPeriodChecker.checkClosingEligibility(2026, 5, 'monthly', ['2026-P05'])
    expect(r.isEligible).toBe(false)
    expect(r.errors.some((e) => e.includes('already been closed'))).toBe(true)
  })

  it('a period beyond the type max is rejected (monthly > 12)', () => {
    const r = ClosingPeriodChecker.checkClosingEligibility(2026, 13, 'monthly', [])
    expect(r.isEligible).toBe(false)
  })

  it('closing entries balance only when revenues = expenses within tolerance', () => {
    const balanced = ClosingPeriodChecker.validateClosingBalance(10000, 10000)
    expect(balanced.isBalanced).toBe(true)
    expect(balanced.difference).toBe(0)

    const off = ClosingPeriodChecker.validateClosingBalance(10000, 9500)
    expect(off.isBalanced).toBe(false)
    expect(off.difference).toBe(500)
    expect(off.errors.length).toBeGreaterThan(0)

    // within default 0.01 tolerance still balances
    expect(ClosingPeriodChecker.validateClosingBalance(100.0, 100.005).isBalanced).toBe(true)
  })

  it('reversals flip the net amount sign and post to the next period', () => {
    const reversals = ClosingPeriodChecker.generateReversals(
      [
        { journalEntryId: 'JE-1', accountsClosed: '4000', netAmount: 500, postedDate: '2026-05-31' },
        { journalEntryId: 'JE-2', accountsClosed: '5000', netAmount: -300, postedDate: '2026-05-31' },
      ],
      '2026-06-01',
    )
    expect(reversals).toHaveLength(2)
    // net +500 reverses to a credit of 500 (debit 0)
    expect(reversals[0].creditAmount).toBe(500)
    expect(reversals[0].debitAmount).toBe(0)
    // net -300 reverses to a debit of 300 (credit 0)
    expect(reversals[1].debitAmount).toBe(300)
    expect(reversals[1].creditAmount).toBe(0)
    // all reversals post into the next period
    expect(reversals.every((r) => r.postedDate === '2026-06-01')).toBe(true)
    // each reversal is itself a one-sided posting (the other side is the income-summary close)
    for (const r of reversals) {
      expect(r.debitAmount === 0 || r.creditAmount === 0).toBe(true)
    }
  })

  it('status transitions follow the closing lifecycle, rejecting illegal jumps', () => {
    expect(ClosingPeriodChecker.validateStatusTransition('in-progress', 'pending-approval').isValid).toBe(true)
    expect(ClosingPeriodChecker.validateStatusTransition('approved', 'posted').isValid).toBe(true)
    // cannot jump straight from in-progress to posted
    const illegal = ClosingPeriodChecker.validateStatusTransition('in-progress', 'posted')
    expect(illegal.isValid).toBe(false)
    expect(illegal.errors.length).toBeGreaterThan(0)
  })

  it('an archived next period blocks reversal posting; locked merely warns', () => {
    expect(ClosingPeriodChecker.checkNextPeriodOpenForReversals('archived').canPost).toBe(false)
    const locked = ClosingPeriodChecker.checkNextPeriodOpenForReversals('locked')
    expect(locked.canPost).toBe(true)
    expect(locked.warnings.length).toBeGreaterThan(0)
    expect(ClosingPeriodChecker.checkNextPeriodOpenForReversals('open').canPost).toBe(true)
  })

  it('regulatory code is deterministic SAF-T/XBRL formatting', () => {
    expect(ClosingPeriodChecker.computeRegulatoryCode('monthly', 2026, 5)).toBe('P05_2026')
    expect(ClosingPeriodChecker.computeRegulatoryCode('quarterly', 2026, 2, 'xbrl')).toBe('Q2_2026')
  })
})
