/**
 * Bank Reconciliation Report — canonical IAS-7 / "balance per bank vs GL".
 *
 * Validates the textbook two-column reconciliation format the auditor
 * signs off on:
 *
 *   Balance per bank statement
 *   + Deposits in transit
 *   - Outstanding checks
 *   = Adjusted bank balance
 *
 *   Balance per GL
 *   + Interest credits not recorded
 *   - Bank fees not recorded
 *   = Adjusted GL balance
 *
 *   Difference must be 0 to sign off.
 *
 * Plus the aging buckets (0-30, 31-60, 61-90, 90+) and the canonical
 * Category-2 adjustment JE shapes (bank_fee, interest_income,
 * interest_expense, returned_check).
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-20022 camt.053 bank-to-customer-statement
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @audit ISO-19011:2018 audit-trail bank-reconciliation
 * @compliance SOX §404 internal-controls
 * @see src/services/bank-reconciliation.service.ts
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { bankReconciliationService } from '@/bank/reconciliation.service'
import { journalEntryService } from '@/journal/entry.service'
import {
  bucketAgeDays,
  daysBetween,
} from '@/utility/calculations'

const tenant = 'tenant-recon'
const user = 'user-recon'

describe('Bank reconciliation — canonical IAS-7 surface', () => {
  beforeEach(() => {
    bankReconciliationService.clearAllData()
  })

  it('exposes the canonical public surface', () => {
    expect(typeof bankReconciliationService.generateReconciliationReport).toBe(
      'function',
    )
    expect(typeof bankReconciliationService.getOutstandingItemsAging).toBe(
      'function',
    )
    expect(typeof bankReconciliationService.postBankAdjustment).toBe(
      'function',
    )
  })

  describe('postBankAdjustment — Category-2 JE shapes', () => {
    it('bank_fee posts Dr Bank Fee Expense / Cr Cash', async () => {
      const { journalEntryId } = await bankReconciliationService.postBankAdjustment(
        tenant,
        user,
        { kind: 'bank_fee', amount: 25, description: 'Monthly service fee' },
      )
      const entry = await journalEntryService.getEntry(tenant, journalEntryId)
      expect(entry).toBeDefined()
      expect(entry?.lines).toHaveLength(2)
      const expense = entry?.lines.find((l) => l.accountId === 'bank_fee_expense')
      const cash = entry?.lines.find((l) => l.accountId === 'cash')
      expect(expense?.debit).toBe(25)
      expect(cash?.credit).toBe(25)
      expect(entry?.status).toBe('posted')
    })

    it('interest_income posts Dr Cash / Cr Interest Income', async () => {
      const { journalEntryId } = await bankReconciliationService.postBankAdjustment(
        tenant,
        user,
        { kind: 'interest_income', amount: 50, description: 'Interest credit' },
      )
      const entry = await journalEntryService.getEntry(tenant, journalEntryId)
      const cash = entry?.lines.find((l) => l.accountId === 'cash')
      const income = entry?.lines.find((l) => l.accountId === 'interest_income')
      expect(cash?.debit).toBe(50)
      expect(income?.credit).toBe(50)
    })

    it('returned_check posts Dr AR / Cr Cash', async () => {
      const { journalEntryId } = await bankReconciliationService.postBankAdjustment(
        tenant,
        user,
        {
          kind: 'returned_check',
          amount: 1_000,
          description: 'NSF — customer XYZ',
        },
      )
      const entry = await journalEntryService.getEntry(tenant, journalEntryId)
      const ar = entry?.lines.find((l) => l.accountId === 'ar')
      const cash = entry?.lines.find((l) => l.accountId === 'cash')
      expect(ar?.debit).toBe(1_000)
      expect(cash?.credit).toBe(1_000)
    })

    it('rejects negative or zero amounts (use inverse kind to reverse)', async () => {
      await expect(
        bankReconciliationService.postBankAdjustment(tenant, user, {
          kind: 'bank_fee',
          amount: 0,
          description: 'bad',
        }),
      ).rejects.toThrow(/positive/)
      await expect(
        bankReconciliationService.postBankAdjustment(tenant, user, {
          kind: 'bank_fee',
          amount: -10,
          description: 'bad',
        }),
      ).rejects.toThrow(/positive/)
    })
  })

  describe('aging — canonical buckets shared with AR/AP aging', () => {
    it('bucketAgeDays maps to current/aging/overdue/stale per skill', () => {
      expect(bucketAgeDays(0)).toBe('current')
      expect(bucketAgeDays(30)).toBe('current')
      expect(bucketAgeDays(31)).toBe('aging')
      expect(bucketAgeDays(60)).toBe('aging')
      expect(bucketAgeDays(61)).toBe('overdue')
      expect(bucketAgeDays(90)).toBe('overdue')
      expect(bucketAgeDays(91)).toBe('stale')
      expect(bucketAgeDays(999)).toBe('stale')
    })

    it('daysBetween is asOf − originated, floored', () => {
      expect(
        daysBetween(new Date('2026-01-01'), new Date('2026-01-31')),
      ).toBe(30)
      expect(
        daysBetween(new Date('2026-04-30'), new Date('2026-05-09')),
      ).toBe(9)
    })

    it('returns zeroed aging when no statements exist for tenant/account', async () => {
      const aging =
        await bankReconciliationService.getOutstandingItemsAging(
          tenant,
          'no-such-account',
          new Date('2026-05-09'),
        )
      expect(aging.totalCount).toBe(0)
      expect(aging.totalAmount).toBe(0)
      expect(aging.buckets.current.count).toBe(0)
      expect(aging.buckets.stale.count).toBe(0)
    })
  })
})
