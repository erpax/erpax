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
 * @see src/gl/accounts/period/end/adjustments/hooks/period-end-adjustment.ts
 */

import { describe, it, expect, beforeAll } from 'vitest'
import { periodEndAdjustmentPostingHook } from './adjustment'
import { journalEntryService } from '@/journal/entry/service'

/** Invoke the afterChange hook with a partial args shape (tests supply only the doc/op surface). */
type HookArgs = Parameters<typeof periodEndAdjustmentPostingHook>[0]
const runHook = (args: Partial<HookArgs>) => periodEndAdjustmentPostingHook(args as HookArgs)

// Greenfield: the test owns ALL its referenced entities (tenant · user · accounts). Accounts are
// keyed by their CODE (the standards-computed natural key — gl-accounts uses a text id), so the caller
// code round-trips as a valid relationship; createdBy resolves to a real user (FK to users).
let tenant: string
let user: string

/**
 * The suite's fixtures are FOUND-OR-CREATED, and named deterministically.
 *
 * They used to be created unconditionally, with `Date.now()` in the tenant slug and the user
 * email and FIXED gl-account ids + account numbers (6100 · 1590 · 7100 · 2150 · 5150 · 1300).
 * The account ids are the natural key the hook resolves by, so they cannot be randomised — which
 * meant the suite could only pass against a database it had never run against. On a fresh CI
 * database it passed; the second run anywhere died on
 * `UNIQUE constraint failed: gl_accounts.account_number`, and the whole payload-integration lane
 * shares ONE D1 across ~1,800 suites, so "never run before" is not a property a suite may assume.
 *
 * Find-or-create is idempotent in both directions: it seeds a fresh database and reuses a warm
 * one, with no clock anywhere ([[registry]] and the seed factory learned the same lesson — a
 * clock is not an identity, and two suites inside one millisecond share it).
 */
const TENANT_SLUG = 'tenant-period-end-adjustments'
const USER_EMAIL = 'period-end-adjustments@test.local'

beforeAll(async () => {
  const { getPayload } = await import('payload')
  const config = (await import('@payload-config')).default
  const payload = await getPayload({ config })

  /** The row with this natural key, or a newly created one — never a duplicate. */
  const findOrCreate = async (
    collection: string,
    where: Record<string, unknown>,
    data: Record<string, unknown>,
    /** Fields a REUSED row must carry for this run (a warm database may hold older values). */
    reconcile?: Record<string, unknown>,
  ): Promise<string> => {
    const found = await payload.find({ collection: collection as never, where: where as never, limit: 1, depth: 0 })
    const hit = (found as { docs?: Record<string, unknown>[] }).docs?.[0]
    if (hit?.id !== undefined) {
      const id = String(hit.id)
      if (reconcile && Object.entries(reconcile).some(([k, v]) => String(hit[k] ?? '') !== String(v))) {
        await payload.update({ collection: collection as never, id, data: reconcile as never })
      }
      return id
    }
    const made = await payload.create({ collection: collection as never, data: data as never })
    return String((made as { id: unknown }).id)
  }

  tenant = await findOrCreate(
    'tenants',
    { slug: { equals: TENANT_SLUG } },
    { name: 'Period-End Test', slug: TENANT_SLUG },
  )
  user = await findOrCreate(
    'users',
    { email: { equals: USER_EMAIL } },
    { email: USER_EMAIL, password: 'test-pass-1234', roles: ['admin'] },
  )
  const accounts: ReadonlyArray<[string, 'asset' | 'liability' | 'expense', 'debit' | 'credit', string]> = [
    ['depreciation_expense', 'expense', 'debit', '6100'],
    ['accumulated_depreciation', 'asset', 'credit', '1590'],
    ['interest_expense', 'expense', 'debit', '7100'],
    ['accrued_interest_payable', 'liability', 'credit', '2150'],
    ['inventory_variance', 'expense', 'debit', '5150'],
    ['inventory', 'asset', 'debit', '1300'],
  ]
  for (const [id, accountType, normalBalance, accountNumber] of accounts) {
    // The id IS the key the hook resolves by, so it stays fixed and the row is reused when it
    // is already there — the account number is unique-constrained and would collide otherwise.
    // A reused row is also REBOUND to this run's tenant: a warm database can hold the account
    // under a tenant an earlier run minted, and then the hook's line validation rejects it.
    await findOrCreate(
      'gl-accounts',
      { id: { equals: id } },
      { id, tenant, accountType, normalBalance, accountNumber, accountName: id },
      { tenant },
    )
  }
}, 120_000)

const baseReq = (capturedUpdate: { id?: unknown; data?: unknown }) =>
  ({
    user: { id: user },
    payload: {
      logger: {
        info: (): void => {},
        warn: (): void => {},
        error: (): void => {},
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

  it('books a balanced JE and back-links its id on the adjustment', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await runHook({
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
    await runHook({
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
    await runHook({
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
    await runHook({
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
    await runHook({
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
