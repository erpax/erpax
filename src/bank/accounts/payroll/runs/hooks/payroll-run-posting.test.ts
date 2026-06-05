/**
 * PayrollRuns posting hook — IAS 19 / ASC 710 wages JE.
 *
 * Asserts the canonical journal-entry shape booked when a payroll run's
 * status flips to 'posted':
 *
 *   Dr Wages Expense + Dr employer-side accruals
 *     Cr Income Tax Payable + Cr SS Payable + Cr Pension Payable +
 *     Cr Other Deductions Payable + Cr Payroll Tax Payable +
 *     Cr Net Payroll Payable
 *
 * The Cr Net Payroll Payable is what the pain.001 disbursement (a
 * follow-up slice creating a PaymentRuns row) draws against on the
 * pay date.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @accounting IFRS IAS-19 employee-benefits
 * @accounting US-GAAP ASC-710 compensation-general
 * @audit ISO-19011:2018 audit-trail
 * @see src/bank/accounts/payroll/runs/hooks/payroll-run.ts
 */

import { describe, it, expect } from 'vitest'
import { payrollRunPostingHook } from '@/bank/accounts/payroll/runs/hooks/payroll-run'
import { journalEntryService } from '@/journal/entry/service'

/** Invoke the afterChange hook with a partial args shape (tests supply only the doc/op surface). */
type HookArgs = Parameters<typeof payrollRunPostingHook>[0]
const runHook = (args: Partial<HookArgs>) => payrollRunPostingHook(args as HookArgs)

const tenant = 'tenant-pr'
const user = 'user-pr'

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

describe('PayrollRuns posting hook — status → posted', () => {
  it('books a balanced wages JE for a 2-employee monthly run', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await runHook({
      doc: {
        id: 'PR-001',
        runId: 'PR-2026-04-MONTHLY',
        tenant,
        periodEnd: '2026-04-30',
        status: 'posted',
        lines: [
          {
            totalGross: 10_000_00,
            netPay: 7_000_00,
            incomeTaxWithheld: 2_000_00,
            socialSecurityEmployee: 800_00,
            socialSecurityEmployer: 1_200_00,
            pensionEmployee: 200_00,
            pensionEmployer: 500_00,
            payrollTaxesEmployer: 100_00,
            otherDeductions: 0,
          },
          {
            totalGross: 5_000_00,
            netPay: 3_500_00,
            incomeTaxWithheld: 1_000_00,
            socialSecurityEmployee: 400_00,
            socialSecurityEmployer: 600_00,
            pensionEmployee: 100_00,
            pensionEmployer: 250_00,
            payrollTaxesEmployer: 50_00,
            otherDeductions: 0,
          },
        ],
      },
      previousDoc: { id: 'PR-001', status: 'approved' },
      operation: 'update',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))

    expect(captured.id).toBe('PR-001')
    const linkedJeId = (captured.data as { journalEntry?: string })?.journalEntry
    expect(linkedJeId).toBeDefined()

    const entry = await journalEntryService.getEntry(tenant, String(linkedJeId))
    expect(entry).toBeDefined()
    expect(entry?.status).toBe('posted')

    const totalDebits = entry!.lines.reduce((s, l) => s + (l.debit ?? 0), 0)
    const totalCredits = entry!.lines.reduce((s, l) => s + (l.credit ?? 0), 0)
    expect(totalDebits).toBe(totalCredits)

    const lineFor = (account: string) =>
      entry!.lines.find((l) => l.accountId === account)

    // Dr side
    expect(lineFor('wages_expense')?.debit).toBe(15_000_00) // gross sum
    expect(lineFor('employer_social_security_expense')?.debit).toBe(1_800_00)
    expect(lineFor('employer_pension_expense')?.debit).toBe(750_00)
    expect(lineFor('employer_payroll_tax_expense')?.debit).toBe(150_00)

    // Cr side
    expect(lineFor('income_tax_payable')?.credit).toBe(3_000_00)
    expect(lineFor('social_security_payable')?.credit).toBe(
      // employee 1,200 + employer 1,800 = 3,000
      3_000_00,
    )
    expect(lineFor('pension_payable')?.credit).toBe(
      // employee 300 + employer 750 = 1,050
      1_050_00,
    )
    expect(lineFor('payroll_tax_payable')?.credit).toBe(150_00)
    expect(lineFor('net_payroll_payable')?.credit).toBe(10_500_00) // 7,000 + 3,500
  })

  it('skips zero-amount payable lines', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await runHook({
      doc: {
        id: 'PR-002',
        tenant,
        periodEnd: '2026-04-30',
        status: 'posted',
        lines: [
          {
            totalGross: 1_000_00,
            netPay: 1_000_00, // no deductions, no employer accruals
          },
        ],
      },
      previousDoc: { id: 'PR-002', status: 'approved' },
      operation: 'update',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))

    const linkedJeId = (captured.data as { journalEntry?: string })?.journalEntry
    expect(linkedJeId).toBeDefined()
    const entry = await journalEntryService.getEntry(tenant, String(linkedJeId))
    // Just two lines: Dr Wages 1,000 / Cr Net Payable 1,000.
    expect(entry?.lines).toHaveLength(2)
    expect(
      entry!.lines.find((l) => l.accountId === 'wages_expense')?.debit,
    ).toBe(1_000_00)
    expect(
      entry!.lines.find((l) => l.accountId === 'net_payroll_payable')?.credit,
    ).toBe(1_000_00)
  })

  it('skips when status is not transitioning to posted', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await runHook({
      doc: {
        id: 'PR-003',
        tenant,
        status: 'approved', // not posted
        lines: [{ totalGross: 1_000_00, netPay: 1_000_00 }],
      },
      previousDoc: { id: 'PR-003', status: 'pending_review' },
      operation: 'update',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    expect(captured.id).toBeUndefined()
  })

  it('idempotent — does not re-post if journalEntry already linked', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await runHook({
      doc: {
        id: 'PR-004',
        tenant,
        status: 'posted',
        journalEntry: 'existing-je',
        lines: [{ totalGross: 1_000_00, netPay: 1_000_00 }],
      },
      operation: 'update',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    expect(captured.id).toBeUndefined()
  })

  it('splits Dr Wages Expense by cost-center for IFRS 8 / ASC 280 segments', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await runHook({
      doc: {
        id: 'PR-CC-1',
        runId: 'PR-2026-04-MONTHLY',
        tenant,
        periodEnd: '2026-04-30',
        status: 'posted',
        lines: [
          // Engineering CC (employer SS = 200, no payroll tax)
          {
            costCenter: 'CC-ENG',
            totalGross: 10_000_00,
            netPay: 7_000_00,
            incomeTaxWithheld: 2_000_00,
            socialSecurityEmployee: 800_00,
            socialSecurityEmployer: 200_00,
            pensionEmployee: 200_00,
            pensionEmployer: 0,
            payrollTaxesEmployer: 0,
            otherDeductions: 0,
          },
          // Engineering CC — second engineer
          {
            costCenter: 'CC-ENG',
            totalGross: 5_000_00,
            netPay: 3_500_00,
            incomeTaxWithheld: 1_000_00,
            socialSecurityEmployee: 400_00,
            socialSecurityEmployer: 100_00,
            pensionEmployee: 100_00,
            pensionEmployer: 0,
            payrollTaxesEmployer: 0,
            otherDeductions: 0,
          },
          // Sales CC — separate segment
          {
            costCenter: 'CC-SALES',
            totalGross: 8_000_00,
            netPay: 6_000_00,
            incomeTaxWithheld: 1_500_00,
            socialSecurityEmployee: 500_00,
            socialSecurityEmployer: 150_00,
            pensionEmployee: 0,
            pensionEmployer: 0,
            payrollTaxesEmployer: 50_00,
            otherDeductions: 0,
          },
        ],
      },
      previousDoc: { id: 'PR-CC-1', status: 'approved' },
      operation: 'update',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))

    const linkedJeId = (captured.data as { journalEntry?: string })?.journalEntry
    const entry = await journalEntryService.getEntry(tenant, String(linkedJeId))
    expect(entry).toBeDefined()

    // Verify Σ debits = Σ credits invariant.
    const totalDebits = entry!.lines.reduce((s, l) => s + (l.debit ?? 0), 0)
    const totalCredits = entry!.lines.reduce((s, l) => s + (l.credit ?? 0), 0)
    expect(totalDebits).toBe(totalCredits)

    // Two Dr Wages Expense lines — one per cost-center.
    const wageLines = entry!.lines.filter(
      (l) => l.accountId === 'wages_expense' && l.debit !== undefined,
    )
    expect(wageLines).toHaveLength(2)

    // Find the engineering line — Σ engineering gross = 15,000.
    const engWages = wageLines.find((l) => l.costCenterId === 'CC-ENG')
    expect(engWages?.debit).toBe(15_000_00)

    // Sales line — Σ sales gross = 8,000.
    const salesWages = wageLines.find((l) => l.costCenterId === 'CC-SALES')
    expect(salesWages?.debit).toBe(8_000_00)

    // Sum of per-cost-center wages = total gross.
    const totalWages = wageLines.reduce((s, l) => s + (l.debit ?? 0), 0)
    expect(totalWages).toBe(23_000_00)

    // Employer SS expense also split — engineering 300, sales 150.
    const ssLines = entry!.lines.filter(
      (l) => l.accountId === 'employer_social_security_expense',
    )
    expect(ssLines).toHaveLength(2)
    expect(ssLines.find((l) => l.costCenterId === 'CC-ENG')?.debit).toBe(300_00)
    expect(ssLines.find((l) => l.costCenterId === 'CC-SALES')?.debit).toBe(150_00)

    // Cr side stays aggregated — single Net Payroll Payable line for total net.
    const netPayable = entry!.lines.find(
      (l) => l.accountId === 'net_payroll_payable',
    )
    expect(netPayable?.credit).toBe(16_500_00)
    expect(
      entry!.lines.filter((l) => l.accountId === 'net_payroll_payable'),
    ).toHaveLength(1)
  })

  it('falls back to employee.department when line.costCenter is null', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await runHook({
      doc: {
        id: 'PR-CC-2',
        tenant,
        periodEnd: '2026-04-30',
        status: 'posted',
        lines: [
          {
            // No line.costCenter — should fall back to employee.department.
            employee: { id: 'emp-1', department: 'CC-FALLBACK' },
            totalGross: 4_000_00,
            netPay: 4_000_00,
          },
        ],
      },
      previousDoc: { id: 'PR-CC-2', status: 'approved' },
      operation: 'update',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    const linkedJeId = (captured.data as { journalEntry?: string })?.journalEntry
    const entry = await journalEntryService.getEntry(tenant, String(linkedJeId))
    const wages = entry!.lines.find((l) => l.accountId === 'wages_expense')
    expect(wages?.costCenterId).toBe('CC-FALLBACK')
  })

  it('lines with no resolvable cost-center post under costCenterId=undefined', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await runHook({
      doc: {
        id: 'PR-CC-3',
        tenant,
        periodEnd: '2026-04-30',
        status: 'posted',
        lines: [
          {
            // No costCenter, no employee → unallocated.
            totalGross: 1_000_00,
            netPay: 1_000_00,
          },
        ],
      },
      previousDoc: { id: 'PR-CC-3', status: 'approved' },
      operation: 'update',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    const linkedJeId = (captured.data as { journalEntry?: string })?.journalEntry
    const entry = await journalEntryService.getEntry(tenant, String(linkedJeId))
    const wages = entry!.lines.find((l) => l.accountId === 'wages_expense')
    expect(wages?.costCenterId).toBeUndefined()
  })

  it('skips and warns when zero gross / no lines', async () => {
    const captured: { id?: unknown; data?: unknown } = {}
    await runHook({
      doc: {
        id: 'PR-005',
        tenant,
        status: 'posted',
        lines: [],
      },
      previousDoc: { id: 'PR-005', status: 'approved' },
      operation: 'update',
      req: baseReq(captured),
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    expect(captured.id).toBeUndefined()
  })
})
