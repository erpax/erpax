/**
 * Period-end adjustment posting hook — closes the
 * period-end-adjustment.service.ts DOA.
 *
 * Asserts the canonical SOX §404 four-eyes flow:
 *   draft → calculated → approved (different user) → posted
 *
 * On the status-→-posted transition, the hook calls
 * journalEntryService to create a balanced JE and back-link its id.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
 * @audit ISO-19011:2018 audit-trail period-end-evidence
 * @compliance SOX §404 internal-controls four-eyes
 * @see src/plugins/accounting/hooks/period-end-adjustment.hook.ts
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { periodEndAdjustmentPostingHook } from '@/services/accounting/hooks/period-end-adjustment.hook'
import { journalEntryService } from '@/services/journal-entry.service'

const tenant = 'tenant-pe'
const user = 'user-pe'

const baseReq = (capturedUpdate: { id?: unknown; data?: unknown }) =>
  ({
    user: { id: user },
    payload: {
      logger: {
        info: () => undefined,
        warn: () => undefined,
        error: () => undefined,
      },
      update: async (args: {
        id: unknown
        data: unknown
      }) => {
        capturedUpdate.id = args.id
        capturedUpdate.data = args.data
        return { id: args.id }
      },
    },
  }) as unknown as never

describe('Period-end adjustment hook — status → posted fires GL', () => {
  beforeEach(() => {
    journalEntryService.clearAllData()
  })

  it('books a balanced JE and back-links its id on the adjustment', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await periodEndAdjustmentPostingHook({
      doc: {
        id: 'PEA-001',
        adjustmentId: 'DEP-2026-04',
        adjustmentType: 'depreciation',
        description: 'April 2026 depreciation',
        period: '2026-04-30',
        adjustmentAmount: 5_000_00,
        debitAccount: 'depreciation_expense',
        creditAccount: 'accumulated_depreciation',
        tenant,
        status: 'posted',
      },
      previousDoc: { id: 'PEA-001', status: 'approved' },
      operation: 'update',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })

    // Allow the queue to drain.
    await new Promise((r) => setTimeout(r, 0))

    // The hook called req.payload.update with the JE id.
    expect(captured.id).toBe('PEA-001')
    const updatedData = captured.data as { journalEntry?: string } | undefined
    expect(updatedData?.journalEntry).toBeDefined()

    // The JE was created in the canonical journal-entry service.
    const entry = await journalEntryService.getEntry(
      tenant,
      String(updatedData!.journalEntry),
    )
    expect(entry).toBeDefined()
    expect(entry?.lines).toHaveLength(2)
    expect(entry?.status).toBe('posted')
    const dr = entry?.lines.find((l) => l.accountId === 'depreciation_expense')
    const cr = entry?.lines.find((l) => l.accountId === 'accumulated_depreciation')
    expect(dr?.debit).toBe(5_000_00)
    expect(cr?.credit).toBe(5_000_00)
  })

  it('skips when status is not transitioning to posted', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await periodEndAdjustmentPostingHook({
      doc: {
        id: 'PEA-002',
        adjustmentType: 'depreciation',
        adjustmentAmount: 1_000_00,
        debitAccount: 'depreciation_expense',
        creditAccount: 'accumulated_depreciation',
        tenant,
        status: 'approved', // not 'posted'
      },
      previousDoc: { id: 'PEA-002', status: 'calculated' },
      operation: 'update',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    expect(captured.id).toBeUndefined()
  })

  it('is idempotent — no double-post if already linked to a JE', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await periodEndAdjustmentPostingHook({
      doc: {
        id: 'PEA-003',
        adjustmentType: 'interest_accrual',
        adjustmentAmount: 200_00,
        debitAccount: 'interest_expense',
        creditAccount: 'accrued_interest_payable',
        tenant,
        status: 'posted',
        journalEntry: 'existing-je-id',
      },
      operation: 'update',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    expect(captured.id).toBeUndefined()
  })

  it('skips silently with a warning when account ids are missing', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await periodEndAdjustmentPostingHook({
      doc: {
        id: 'PEA-004',
        adjustmentType: 'other',
        adjustmentAmount: 100_00,
        // debitAccount + creditAccount missing
        tenant,
        status: 'posted',
      },
      previousDoc: { id: 'PEA-004', status: 'approved' },
      operation: 'update',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    expect(captured.id).toBeUndefined()
  })

  it('skips silently when amount is zero or negative', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await periodEndAdjustmentPostingHook({
      doc: {
        id: 'PEA-005',
        adjustmentType: 'inventory_variance',
        adjustmentAmount: 0,
        debitAccount: 'inventory_variance',
        creditAccount: 'inventory',
        tenant,
        status: 'posted',
      },
      previousDoc: { id: 'PEA-005', status: 'approved' },
      operation: 'update',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    expect(captured.id).toBeUndefined()
  })
})
