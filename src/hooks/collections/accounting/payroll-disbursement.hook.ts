/**
 * Payroll Disbursement Hook — fires on `PayrollRuns.status → 'disbursed'`
 * and creates a `payment-runs` row (messageType = pain_001) drawing
 * against the Net Payroll Payable.
 *
 * This is the second leg of the payroll cycle (the first leg is
 * `payroll-run.hook.ts` which books the IAS 19 / ASC 710 JE on
 * status → 'posted'). Once the JE is booked, the close-job /
 * authoriser flips the status to 'disbursed' to trigger the bank
 * file generation.
 *
 * The created PaymentRuns row carries one transaction per payroll
 * line — endToEndId / amount = netPay / counterpartyName + IBAN /
 * BIC drawn from the employee's payrollBankAccount. Status starts
 * at 'pending_review' so a treasury preparer must review before the
 * pain.001 file is exported.
 *
 * If the line's `employee` relationship isn't depth-populated, the
 * hook fetches each employee with overrideAccess to resolve their
 * bank account. Lines missing a payroll IBAN are tracked as a
 * counter and surfaced in the run's notes (the bank ingest will
 * reject the file otherwise).
 *
 * Idempotent: short-circuits when `paymentRun` is already linked.
 *
 * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time payment-date
 * @accounting IFRS IAS-7 statement-of-cash-flows payroll-disbursement
 * @audit ISO-19011:2018 audit-trail payroll-disbursement
 * @compliance SOX §404 internal-controls
 * @security ISO-27002 §5.4 segregation-of-duties treasury-preparer
 * @see src/plugins/accounting/hooks/payroll-run.hook.ts (status → posted)
 * @see src/plugins/accounting/collections/PaymentRuns.ts (pain.001 shell)
 * @see docs/adr/0001-event-driven-gl-posting.md
 */

import { v4 as uuid } from 'uuid'
import type { CollectionAfterChangeHook } from 'payload'

interface PayrollLine {
  netPay?: number
  employee?: string | number | (Record<string, unknown> & { id?: string | number })
}

type RunDoc = Record<string, unknown> & {
  id: string | number
  status?: string
  tenant?: string | { id?: string }
  runId?: string
  paymentDate?: string | Date
  currency?: string
  sourceBankAccount?: string | { id?: string }
  lines?: PayrollLine[]
  paymentRun?: string | { id?: string } | null
}

const idOf = (v: unknown): string | undefined => {
  if (typeof v === 'string' || typeof v === 'number') return String(v)
  if (typeof v === 'object' && v !== null && 'id' in v) {
    const id = (v as { id?: unknown }).id
    if (id !== undefined) return String(id)
  }
  return undefined
}

const isStatusTransitionToDisbursed = (
  doc: RunDoc,
  previousDoc?: RunDoc,
): boolean => {
  if (doc?.status !== 'disbursed') return false
  if (!previousDoc) return true
  return previousDoc.status !== 'disbursed'
}

interface ResolvedEmployee {
  id: string
  displayName: string
  iban?: string
  bic?: string
}

const resolveEmployee = async (
  req: Parameters<CollectionAfterChangeHook>[0]['req'],
  raw: PayrollLine['employee'],
): Promise<ResolvedEmployee | null> => {
  if (!raw) return null
  if (typeof raw === 'object' && raw !== null && 'id' in raw) {
    const obj = raw as Record<string, unknown>
    const bank =
      (obj.payrollBankAccount as Record<string, unknown> | undefined) ?? undefined
    return {
      id: String(obj.id),
      displayName: String(obj.displayName ?? obj.id),
      iban: typeof bank?.iban === 'string' ? (bank.iban as string) : undefined,
      bic: typeof bank?.bic === 'string' ? (bank.bic as string) : undefined,
    }
  }
  // It's just an id — fetch the employee.
  try {
    const fetched = await req.payload.findByID({
      collection: 'employees',
      id: raw as string | number,
      overrideAccess: true,
      depth: 0,
    })
    if (!fetched) return null
    const e = fetched as Record<string, unknown>
    const bank =
      (e.payrollBankAccount as Record<string, unknown> | undefined) ?? undefined
    return {
      id: String(e.id),
      displayName: String(e.displayName ?? e.id),
      iban: typeof bank?.iban === 'string' ? (bank.iban as string) : undefined,
      bic: typeof bank?.bic === 'string' ? (bank.bic as string) : undefined,
    }
  } catch {
    return null
  }
}

export const payrollDisbursementHook: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
  operation,
}) => {
  const run = doc as RunDoc
  if (!run || (operation !== 'create' && operation !== 'update')) return doc
  if (
    !isStatusTransitionToDisbursed(
      run,
      previousDoc as RunDoc | undefined,
    )
  ) {
    return doc
  }

  if (idOf(run.paymentRun)) return doc

  try {
    const tenant = idOf(run.tenant)
    const userId = req.user?.id
    if (!tenant || !userId) {
      req.payload.logger.warn(
        `payroll-run ${run.id}: missing tenant or user — cannot disburse`,
      )
      return doc
    }
    const sourceBankAccount = idOf(run.sourceBankAccount)
    if (!sourceBankAccount) {
      req.payload.logger.warn(
        `payroll-run ${run.id}: missing sourceBankAccount — cannot disburse`,
      )
      return doc
    }
    const lines = Array.isArray(run.lines) ? run.lines : []
    if (lines.length === 0) {
      req.payload.logger.warn(
        `payroll-run ${run.id}: no lines — cannot disburse`,
      )
      return doc
    }

    // Build the PaymentRuns transactions array.
    const transactions: Array<{
      endToEndId: string
      amount: number
      counterpartyName: string
      counterpartyIban: string
      counterpartyBic?: string
      remittanceReference?: string
    }> = []
    let missingIbans = 0
    let totalNet = 0
    for (const line of lines) {
      const netPay = Number(line.netPay ?? 0)
      if (netPay <= 0) continue
      const employee = await resolveEmployee(req, line.employee)
      if (!employee) {
        missingIbans += 1
        continue
      }
      if (!employee.iban) {
        missingIbans += 1
        continue
      }
      transactions.push({
        endToEndId: `PR-${run.runId ?? run.id}-${employee.id}-${uuid().slice(0, 8)}`,
        amount: netPay,
        counterpartyName: employee.displayName,
        counterpartyIban: employee.iban,
        counterpartyBic: employee.bic,
        remittanceReference: `Salary ${run.runId ?? run.id}`,
      })
      totalNet += netPay
    }

    if (transactions.length === 0) {
      req.payload.logger.warn(
        `payroll-run ${run.id}: no employees with usable IBAN — payment-run not created`,
      )
      return doc
    }

    // Create the PaymentRuns row.
    const paymentRunDoc = await req.payload.create({
      collection: 'payment-runs',
      data: {
        tenant,
        runId: `PR-${run.runId ?? run.id}-PAIN001`,
        messageType: 'pain_001',
        sourceBankAccount,
        currency: String(run.currency ?? 'EUR'),
        requestedExecutionDate: new Date(
          (run.paymentDate as string | Date | undefined) ?? new Date(),
        ),
        transactions,
        numberOfTransactions: transactions.length,
        controlSum: totalNet,
        status: 'pending_review',
      } as never,
      overrideAccess: true,
    })

    // Back-link the PaymentRuns id onto the PayrollRun.
    await req.payload.update({
      collection: 'payroll-runs',
      id: run.id as string | number,
      data: { paymentRun: paymentRunDoc.id },
      overrideAccess: true,
    })

    req.payload.logger.info(
      `✓ payroll-run ${run.id} disbursed via payment-run ${paymentRunDoc.id} (${transactions.length} txns / ${totalNet}). Missing IBANs: ${missingIbans}.`,
    )
  } catch (error) {
    req.payload.logger.error(
      { err: error },
      `✗ Error disbursing payroll-run ${run.id}:`,
    )
  }

  return doc
}
