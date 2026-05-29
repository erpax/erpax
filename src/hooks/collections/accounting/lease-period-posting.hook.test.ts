/**
 * Lease period posting hook — IAS 16 §36-§38 / §29-§31 evidence trail.
 *
 * Asserts the canonical period entry on LeasePeriodPostings.status →
 * 'posted':
 *
 *   Dr Interest Expense                interest
 *     Cr Lease Liability                  interest
 *   Dr Lease Liability                 principalRepayment
 *     Cr Cash                             principalRepayment
 *   Dr ROU Amortisation Expense        rouAmortisation
 *     Cr Accumulated ROU Amortisation     rouAmortisation
 *
 * Σ debits = Σ credits invariant holds for any non-trivial split.
 *
 * Why mocks for journalEntryService + resolveGlAccount: the hook's job
 * is to convert the lease-period doc into the right balanced JE shape
 * and link it back. The downstream service writes through real Payload
 * to a real DB; the test exercises the hook's mapping, not the DB
 * round-trip (that path is covered by the JournalEntries collection's
 * own beforeValidate/beforeChange hook suite). Per Conservation Law
 * note in payload.config.ts:477, dev push is off in test mode and the
 * migrate path has known drift, so booting Payload here would be both
 * slow and unreliable for a logic test.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @accounting IFRS IFRS-16 §29-§31 §36-§38 leases
 * @accounting US-GAAP ASC-842-20-35 lessee-subsequent-measurement
 * @audit ISO-19011:2018 audit-trail
 * @see src/plugins/accounting/hooks/lease-period-posting.hook.ts
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { leasePeriodPostingHook } from './lease-period-posting.hook'
import { journalEntryService } from '@/services/journal-entry.service'
import * as glResolver from '@/services/gl-account-resolver'

/** Invoke the afterChange hook with a partial args shape (tests supply only the doc/op surface). */
type HookArgs = Parameters<typeof leasePeriodPostingHook>[0]
const runHook = (args: Partial<HookArgs>) => leasePeriodPostingHook(args as HookArgs)

const tenant = 'tenant-lease'
const user = 'user-lease'

const baseReq = (capturedUpdate: { id?: unknown; data?: unknown }) =>
  ({
    user: { id: user },
    payload: {
      logger: {
        info: (): void => {},
        warn: (): void => {},
        error: (): void => {},
      },
      update: async (args: { id: unknown; data: unknown }) => {
        capturedUpdate.id = args.id
        capturedUpdate.data = args.data
        return { id: args.id }
      },
    },
  }) as unknown as never

// Capture the lines the hook hands to journalEntryService.createEntry,
// without actually persisting. createEntry returns a synthetic JE row
// the hook stores as `journalEntry`; getEntry serves it back to test
// assertions; postEntry just marks it posted.
interface CapturedEntry {
  tenantId: string
  description: string
  lines: Array<{
    accountId: string
    debit?: number
    credit?: number
    description: string
    costCenterId?: string
  }>
  sourceType: string
  sourceId: string
  sourceEvent: string
  status: 'draft' | 'posted'
}
const store = new Map<string, CapturedEntry>()
let seq = 0

beforeEach(() => {
  store.clear()
  seq = 0
  vi.spyOn(journalEntryService, 'createEntry').mockImplementation(
    async (tenantId, req) => {
      const id = `JE-FAKE-${++seq}`
      store.set(id, {
        tenantId,
        description: req.description,
        lines: req.lines.map((l) => ({ ...l })),
        sourceType: req.sourceType,
        sourceId: req.sourceId,
        sourceEvent: req.sourceEvent,
        status: 'draft',
      })
      return { id, lines: req.lines, status: 'draft' } as unknown as Awaited<
        ReturnType<typeof journalEntryService.createEntry>
      >
    },
  )
  vi.spyOn(journalEntryService, 'postEntry').mockImplementation(
    async (_tenantId, id) => {
      const e = store.get(id)
      if (e) e.status = 'posted'
      return { id, status: 'posted' } as unknown as Awaited<
        ReturnType<typeof journalEntryService.postEntry>
      >
    },
  )
  vi.spyOn(journalEntryService, 'getEntry').mockImplementation(
    async (_tenantId, id) => {
      const e = store.get(id)
      if (!e) return null
      return {
        id,
        tenantId: e.tenantId,
        lines: e.lines,
        status: e.status,
        description: e.description,
        sourceType: e.sourceType,
        sourceId: e.sourceId,
        sourceEvent: e.sourceEvent,
      } as unknown as Awaited<ReturnType<typeof journalEntryService.getEntry>>
    },
  )
  // The resolver normally hits gl-accounts; mock it to return the role
  // name itself (the legacy-fallback shape) so assertions stay readable.
  vi.spyOn(glResolver, 'resolveGlAccount').mockImplementation(
    async (_payload, _tenant, role) => role,
  )
})

describe('Lease period posting — status → posted', () => {

  it('books the canonical 3-pair JE for a period with interest + principal + amortisation', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await runHook({
      doc: {
        id: 'LPP-001',
        postingId: 'LPP-2026-05-LEASE-001',
        tenant,
        lease: 'LEASE-001',
        periodEnd: '2026-05-31',
        // Period 1 of 36 — Jan example: 169,543.24 lease liability,
        // 4.5%/yr → monthly rate 0.00375, interest = 635.79
        // payment = 5,000 → principal = 4,364.21
        // ROU amortisation = 166,543.24 / 36 = 4,626.20
        interest: 635_79,
        principalRepayment: 4_364_21,
        cashPayment: 5_000_00,
        rouAmortisation: 4_626_20,
        status: 'posted',
      },
      previousDoc: { id: 'LPP-001', status: 'calculated' },
      operation: 'update',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })

    const linkedJeId = (captured.data as { journalEntry?: string })?.journalEntry
    expect(linkedJeId).toBeDefined()

    const entry = await journalEntryService.getEntry(tenant, String(linkedJeId))
    expect(entry).toBeDefined()
    expect(entry?.status).toBe('posted')

    const totalDebits = entry!.lines.reduce((s, l) => s + (l.debit ?? 0), 0)
    const totalCredits = entry!.lines.reduce((s, l) => s + (l.credit ?? 0), 0)
    expect(totalDebits).toBe(totalCredits)

    const lineFor = (account: string, side: 'debit' | 'credit') =>
      entry!.lines.find((l) => l.accountId === account && l[side] !== undefined)

    // Interest accretion pair
    expect(lineFor('lease_interest_expense', 'debit')?.debit).toBe(635_79)
    // Liability is touched by both interest (Cr) and principal (Dr) — find both.
    const liabilityCr = entry!.lines.find(
      (l) => l.accountId === 'lease_liability' && l.credit !== undefined,
    )
    const liabilityDr = entry!.lines.find(
      (l) => l.accountId === 'lease_liability' && l.debit !== undefined,
    )
    expect(liabilityCr?.credit).toBe(635_79)
    expect(liabilityDr?.debit).toBe(4_364_21)

    // Cash payment pair
    expect(lineFor('cash', 'credit')?.credit).toBe(4_364_21)

    // ROU amortisation pair
    expect(lineFor('rou_amortisation_expense', 'debit')?.debit).toBe(4_626_20)
    expect(
      lineFor('accumulated_rou_amortisation', 'credit')?.credit,
    ).toBe(4_626_20)
  })

  it('honors per-line GL account overrides + carries cost-center on Dr lines', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await runHook({
      doc: {
        id: 'LPP-002',
        tenant,
        lease: 'LEASE-002',
        periodEnd: '2026-05-31',
        interest: 100_00,
        principalRepayment: 900_00,
        cashPayment: 1_000_00,
        rouAmortisation: 800_00,
        interestExpenseAccount: 'gl-int-7400',
        leaseLiabilityAccount: 'gl-liab-2300',
        cashAccount: 'gl-cash-1000',
        rouAmortisationAccount: 'gl-amort-7500',
        accumulatedRouAmortisationAccount: 'gl-acc-amort-1700',
        costCenter: 'CC-OPS',
        status: 'posted',
      },
      previousDoc: { id: 'LPP-002', status: 'calculated' },
      operation: 'update',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })
    const linkedJeId = (captured.data as { journalEntry?: string })?.journalEntry
    const entry = await journalEntryService.getEntry(tenant, String(linkedJeId))
    expect(entry).toBeDefined()

    // Custom accounts win over canonical defaults.
    expect(
      entry!.lines.find((l) => l.accountId === 'gl-int-7400')?.debit,
    ).toBe(100_00)
    expect(
      entry!.lines.find(
        (l) => l.accountId === 'gl-cash-1000' && l.credit !== undefined,
      )?.credit,
    ).toBe(900_00)
    expect(
      entry!.lines.find((l) => l.accountId === 'gl-amort-7500')?.debit,
    ).toBe(800_00)

    // Dr lines carry the cost-center analytical dimension.
    const interestLine = entry!.lines.find(
      (l) => l.accountId === 'gl-int-7400',
    )
    const amortLine = entry!.lines.find(
      (l) => l.accountId === 'gl-amort-7500',
    )
    expect(interestLine?.costCenterId).toBe('CC-OPS')
    expect(amortLine?.costCenterId).toBe('CC-OPS')
  })

  it('skips zero amounts cleanly — final period with only amortisation residual', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await runHook({
      doc: {
        id: 'LPP-003',
        tenant,
        lease: 'LEASE-003',
        periodEnd: '2029-04-30',
        // Final period: liability already at 0, just rounding amortisation left.
        interest: 0,
        principalRepayment: 0,
        cashPayment: 0,
        rouAmortisation: 4_626_60, // last month plus rounding
        status: 'posted',
      },
      previousDoc: { id: 'LPP-003', status: 'calculated' },
      operation: 'update',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })
    const linkedJeId = (captured.data as { journalEntry?: string })?.journalEntry
    const entry = await journalEntryService.getEntry(tenant, String(linkedJeId))
    // Just two lines: Dr ROU Amort Exp 4,626.60 / Cr Acc. ROU Amort 4,626.60.
    expect(entry?.lines).toHaveLength(2)
    expect(entry?.lines[0].debit).toBe(4_626_60)
    expect(entry?.lines[1].credit).toBe(4_626_60)
  })

  it('skips when status not transitioning to posted', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await runHook({
      doc: {
        id: 'LPP-004',
        tenant,
        lease: 'LEASE-004',
        periodEnd: '2026-05-31',
        interest: 100_00,
        principalRepayment: 900_00,
        rouAmortisation: 800_00,
        status: 'calculated',
      },
      operation: 'create',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })
    expect(captured.id).toBeUndefined()
  })

  it('idempotent — does not re-post when journalEntry already linked', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await runHook({
      doc: {
        id: 'LPP-005',
        tenant,
        lease: 'LEASE-005',
        periodEnd: '2026-05-31',
        interest: 100_00,
        principalRepayment: 900_00,
        rouAmortisation: 800_00,
        status: 'posted',
        journalEntry: 'existing-je',
      },
      operation: 'update',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })
    expect(captured.id).toBeUndefined()
  })

  it('skips when all amounts are zero', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await runHook({
      doc: {
        id: 'LPP-006',
        tenant,
        lease: 'LEASE-006',
        periodEnd: '2026-05-31',
        interest: 0,
        principalRepayment: 0,
        rouAmortisation: 0,
        status: 'posted',
      },
      previousDoc: { id: 'LPP-006', status: 'calculated' },
      operation: 'update',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })
    expect(captured.id).toBeUndefined()
  })
})
