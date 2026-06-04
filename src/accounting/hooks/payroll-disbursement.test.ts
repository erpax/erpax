/**
 * Payroll disbursement hook — pain.001 leg of the payroll cycle.
 *
 * Asserts that on PayrollRuns.status → 'disbursed', the hook creates
 * a payment-runs row (messageType = pain_001) with one transaction
 * per payroll line drawing against the employee's IBAN.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
 * @audit ISO-19011:2018 audit-trail
 * @see src/plugins/accounting/hooks/payroll-disbursement.hook.ts
 */

import { describe, it, expect } from 'vitest'
import { payrollDisbursementHook } from '@/accounting/hooks/payroll-disbursement.hook'

/** Invoke the afterChange hook with a partial args shape (tests supply only the doc/op surface). */
type HookArgs = Parameters<typeof payrollDisbursementHook>[0]
const runHook = (args: Partial<HookArgs>) => payrollDisbursementHook(args as HookArgs)

interface CreatedDoc {
  collection: string
  data: Record<string, unknown>
}
interface UpdatedDoc {
  collection: string
  id: unknown
  data: Record<string, unknown>
}

const baseReq = (
  created: CreatedDoc[],
  updated: UpdatedDoc[],
  employees: Record<string, Record<string, unknown>> = {},
) =>
  ({
    user: { id: 'user-treasury' },
    payload: {
      logger: {
        info: (): void => {},
        warn: (): void => {},
        error: (): void => {},
      },
      create: async (args: { collection: string; data: Record<string, unknown> }) => {
        const id = `created-${created.length + 1}`
        created.push({ collection: args.collection, data: args.data })
        return { id, ...args.data }
      },
      update: async (args: {
        collection: string
        id: unknown
        data: Record<string, unknown>
      }) => {
        updated.push({
          collection: args.collection,
          id: args.id,
          data: args.data,
        })
        return { id: args.id, ...args.data }
      },
      findByID: async (args: { collection: string; id: string | number }) => {
        if (args.collection !== 'employees') return null
        return employees[String(args.id)] ?? null
      },
    },
  }) as unknown as never

describe('Payroll disbursement hook — status → disbursed', () => {
  it('creates a pain.001 payment-runs row with one tx per employee net pay', async () => {
    const created: CreatedDoc[] = []
    const updated: UpdatedDoc[] = []
    const employees = {
      'emp-1': {
        id: 'emp-1',
        displayName: 'Alice Engineer',
        payrollBankAccount: { iban: 'BG80BNBG96611020345678', bic: 'BNBGBGSF' },
      },
      'emp-2': {
        id: 'emp-2',
        displayName: 'Bob Engineer',
        payrollBankAccount: { iban: 'DE89370400440532013000' },
      },
    }
    await runHook({
      doc: {
        id: 'PR-001',
        runId: 'PR-2026-04-MONTHLY',
        tenant: 'tenant-1',
        sourceBankAccount: 'BA-1',
        paymentDate: '2026-05-01',
        currency: 'EUR',
        status: 'disbursed',
        lines: [
          { employee: 'emp-1', netPay: 7_000_00 },
          { employee: 'emp-2', netPay: 3_500_00 },
        ],
      },
      previousDoc: { id: 'PR-001', status: 'posted' },
      operation: 'update',
      req: baseReq(created, updated, employees),
      collection: undefined as never,
      context: {} as never,
    })

    expect(created).toHaveLength(1)
    expect(created[0].collection).toBe('payment-runs')
    const pr = created[0].data
    expect(pr.messageType).toBe('pain_001')
    expect(pr.numberOfTransactions).toBe(2)
    expect(pr.controlSum).toBe(10_500_00)
    expect(pr.status).toBe('pending_review')

    const txs = pr.transactions as Array<{
      counterpartyName: string
      counterpartyIban: string
      counterpartyBic?: string
      amount: number
    }>
    expect(txs[0].counterpartyName).toBe('Alice Engineer')
    expect(txs[0].counterpartyIban).toBe('BG80BNBG96611020345678')
    expect(txs[0].counterpartyBic).toBe('BNBGBGSF')
    expect(txs[1].counterpartyName).toBe('Bob Engineer')
    expect(txs[1].counterpartyIban).toBe('DE89370400440532013000')

    // Back-link: PayrollRun.paymentRun was set to the created id.
    expect(updated).toHaveLength(1)
    expect(updated[0].collection).toBe('payroll-runs')
    expect(updated[0].id).toBe('PR-001')
    expect(updated[0].data.paymentRun).toBe('created-1')
  })

  it('skips employees with missing IBAN but still creates the run', async () => {
    const created: CreatedDoc[] = []
    const updated: UpdatedDoc[] = []
    const employees = {
      'emp-1': {
        id: 'emp-1',
        displayName: 'With IBAN',
        payrollBankAccount: { iban: 'BG80BNBG96611020345678' },
      },
      'emp-2': {
        id: 'emp-2',
        displayName: 'Missing IBAN',
        payrollBankAccount: {},
      },
    }
    await runHook({
      doc: {
        id: 'PR-002',
        runId: 'PR-2026-04-MONTHLY',
        tenant: 'tenant-1',
        sourceBankAccount: 'BA-1',
        paymentDate: '2026-05-01',
        currency: 'EUR',
        status: 'disbursed',
        lines: [
          { employee: 'emp-1', netPay: 1_000_00 },
          { employee: 'emp-2', netPay: 500_00 },
        ],
      },
      previousDoc: { id: 'PR-002', status: 'posted' },
      operation: 'update',
      req: baseReq(created, updated, employees),
      collection: undefined as never,
      context: {} as never,
    })

    expect(created).toHaveLength(1)
    const pr = created[0].data
    expect(pr.numberOfTransactions).toBe(1) // only emp-1
    expect(pr.controlSum).toBe(1_000_00)
  })

  it('does not create a payment-run when ALL employees miss IBAN', async () => {
    const created: CreatedDoc[] = []
    const updated: UpdatedDoc[] = []
    const employees = {
      'emp-1': { id: 'emp-1', displayName: 'X', payrollBankAccount: {} },
    }
    await runHook({
      doc: {
        id: 'PR-003',
        tenant: 'tenant-1',
        sourceBankAccount: 'BA-1',
        paymentDate: '2026-05-01',
        currency: 'EUR',
        status: 'disbursed',
        lines: [{ employee: 'emp-1', netPay: 500_00 }],
      },
      previousDoc: { id: 'PR-003', status: 'posted' },
      operation: 'update',
      req: baseReq(created, updated, employees),
      collection: undefined as never,
      context: {} as never,
    })
    expect(created).toHaveLength(0)
    expect(updated).toHaveLength(0)
  })

  it('skips when status not transitioning to disbursed', async () => {
    const created: CreatedDoc[] = []
    const updated: UpdatedDoc[] = []
    await runHook({
      doc: {
        id: 'PR-004',
        tenant: 'tenant-1',
        sourceBankAccount: 'BA-1',
        paymentDate: '2026-05-01',
        currency: 'EUR',
        status: 'posted',
        lines: [{ employee: 'emp-1', netPay: 1_000_00 }],
      },
      previousDoc: { id: 'PR-004', status: 'approved' },
      operation: 'update',
      req: baseReq(created, updated),
      collection: undefined as never,
      context: {} as never,
    })
    expect(created).toHaveLength(0)
  })

  it('idempotent — does not re-create when paymentRun already linked', async () => {
    const created: CreatedDoc[] = []
    const updated: UpdatedDoc[] = []
    await runHook({
      doc: {
        id: 'PR-005',
        tenant: 'tenant-1',
        sourceBankAccount: 'BA-1',
        paymentDate: '2026-05-01',
        currency: 'EUR',
        status: 'disbursed',
        paymentRun: 'existing-pr',
        lines: [{ employee: 'emp-1', netPay: 1_000_00 }],
      },
      operation: 'update',
      req: baseReq(created, updated),
      collection: undefined as never,
      context: {} as never,
    })
    expect(created).toHaveLength(0)
  })

  it('handles depth-populated employee object (no extra fetch needed)', async () => {
    const created: CreatedDoc[] = []
    const updated: UpdatedDoc[] = []
    await runHook({
      doc: {
        id: 'PR-006',
        tenant: 'tenant-1',
        sourceBankAccount: 'BA-1',
        paymentDate: '2026-05-01',
        currency: 'EUR',
        status: 'disbursed',
        lines: [
          {
            employee: {
              id: 'emp-pop',
              displayName: 'Inline Employee',
              payrollBankAccount: {
                iban: 'FR1420041010050500013M02606',
                bic: 'PSSTFRPP',
              },
            },
            netPay: 2_500_00,
          },
        ],
      },
      previousDoc: { id: 'PR-006', status: 'posted' },
      operation: 'update',
      req: baseReq(created, updated),
      collection: undefined as never,
      context: {} as never,
    })
    expect(created).toHaveLength(1)
    const txs = created[0].data.transactions as Array<{
      counterpartyName: string
      counterpartyIban: string
    }>
    expect(txs[0].counterpartyName).toBe('Inline Employee')
    expect(txs[0].counterpartyIban).toBe('FR1420041010050500013M02606')
  })
})
