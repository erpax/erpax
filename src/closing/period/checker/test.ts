import { describe, it, expect } from 'vitest'
import { ClosingPeriodChecker } from '@/closing/period/checker'

// ClosingPeriodChecker is a static, pure validator: in-range + not-already-closed,
// balanced entries, legal state transition, reversals that post to the next period.
describe('closing/period/checker — the period-closing gate', () => {
  describe('checkClosingEligibility', () => {
    it('accepts an in-range, unclosed period', () => {
      const v = ClosingPeriodChecker.checkClosingEligibility(2026, 5, 'monthly', [])
      expect(v.isEligible).toBe(true)
      expect(v.errors).toEqual([])
      expect(v.canAutoGenerateReversals).toBe(true)
    })

    it('rejects a period that exceeds the max for its type', () => {
      const v = ClosingPeriodChecker.checkClosingEligibility(2026, 13, 'monthly', [])
      expect(v.isEligible).toBe(false)
      expect(v.errors.some((e) => e.includes('exceeds max'))).toBe(true)
    })

    it('rejects an already-closed period (key YYYY-Pnn)', () => {
      const v = ClosingPeriodChecker.checkClosingEligibility(2026, 5, 'monthly', ['2026-P05'])
      expect(v.isEligible).toBe(false)
      expect(v.errors.some((e) => e.includes('already been closed'))).toBe(true)
    })

    it('rejects an out-of-bounds fiscal year', () => {
      const v = ClosingPeriodChecker.checkClosingEligibility(1800, 1, 'monthly', [])
      expect(v.isEligible).toBe(false)
    })
  })

  describe('validateClosingBalance', () => {
    it('balances when revenues equal expenses within tolerance', () => {
      const r = ClosingPeriodChecker.validateClosingBalance(1000.0, 1000.005)
      expect(r.isBalanced).toBe(true)
      expect(r.errors).toEqual([])
    })

    it('flags an out-of-tolerance imbalance', () => {
      const r = ClosingPeriodChecker.validateClosingBalance(1000, 900)
      expect(r.isBalanced).toBe(false)
      expect(r.difference).toBe(100)
      expect(r.errors).toHaveLength(1)
    })
  })

  describe('validateStatusTransition', () => {
    it('allows a legal forward move', () => {
      expect(ClosingPeriodChecker.validateStatusTransition('approved', 'posted').isValid).toBe(true)
    })

    it('blocks an illegal jump', () => {
      const r = ClosingPeriodChecker.validateStatusTransition('in-progress', 'finalized')
      expect(r.isValid).toBe(false)
      expect(r.errors).toHaveLength(1)
    })

    it('finalized is terminal', () => {
      expect(ClosingPeriodChecker.validateStatusTransition('finalized', 'posted').isValid).toBe(false)
      expect(ClosingPeriodChecker.validateStatusTransition('finalized', 'finalized').isValid).toBe(true)
    })
  })

  describe('getMaxPeriodForType', () => {
    it('maps each known type to its ceiling, defaulting to 12', () => {
      expect(ClosingPeriodChecker.getMaxPeriodForType('monthly')).toBe(12)
      expect(ClosingPeriodChecker.getMaxPeriodForType('quarterly')).toBe(4)
      expect(ClosingPeriodChecker.getMaxPeriodForType('weekly')).toBe(53)
      expect(ClosingPeriodChecker.getMaxPeriodForType('custom')).toBe(999)
      expect(ClosingPeriodChecker.getMaxPeriodForType('something-else')).toBe(12)
    })
  })

  describe('computeRegulatoryCode', () => {
    it('pads SAF-T period codes to two digits', () => {
      expect(ClosingPeriodChecker.computeRegulatoryCode('monthly', 2026, 5)).toBe('P05_2026')
    })

    it('emits quarterly Q-codes under XBRL', () => {
      expect(ClosingPeriodChecker.computeRegulatoryCode('quarterly', 2026, 2, 'xbrl')).toBe('Q2_2026')
    })
  })

  describe('generateReversals', () => {
    it('flips sign and posts each reversal to the next period start', () => {
      const reversals = ClosingPeriodChecker.generateReversals(
        [
          { journalEntryId: 'JE-1', accountsClosed: '4000', netAmount: 500, postedDate: '2026-05-31' },
          { journalEntryId: 'JE-2', accountsClosed: '5000', netAmount: -200, postedDate: '2026-05-31' },
        ],
        '2026-06-01',
      )
      expect(reversals).toHaveLength(2)
      // netAmount 500 → reversalAmount -500 → credit 500, debit 0
      expect(reversals[0]!.creditAmount).toBe(500)
      expect(reversals[0]!.debitAmount).toBe(0)
      expect(reversals[0]!.sequenceNumber).toBe(1)
      expect(reversals[0]!.postedDate).toBe('2026-06-01')
      expect(reversals[0]!.reversesClosingEntryId).toBe('JE-1')
      // netAmount -200 → reversalAmount 200 → debit 200
      expect(reversals[1]!.debitAmount).toBe(200)
      expect(reversals[1]!.creditAmount).toBe(0)
    })
  })

  describe('checkNextPeriodOpenForReversals', () => {
    it('blocks posting into an archived period', () => {
      expect(ClosingPeriodChecker.checkNextPeriodOpenForReversals('archived').canPost).toBe(false)
    })

    it('allows but warns on a locked period', () => {
      const r = ClosingPeriodChecker.checkNextPeriodOpenForReversals('locked')
      expect(r.canPost).toBe(true)
      expect(r.warnings).toHaveLength(1)
    })

    it('allows a clean post into an open period', () => {
      const r = ClosingPeriodChecker.checkNextPeriodOpenForReversals('open')
      expect(r.canPost).toBe(true)
      expect(r.warnings).toEqual([])
    })
  })
})
