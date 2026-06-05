/**
 * Payroll Run Posting Hook — books the canonical IAS 19 / ASC 710 JE.
 *
 * Fires on `PayrollRuns.status → 'posted'`. Builds a balanced journal
 * entry with the Dr side SPLIT BY COST-CENTER (IFRS 8 / ASC 280 segment
 * reporting) and the Cr side aggregated:
 *
 *   per cost-center cc:
 *     cc.totalGross           Dr Wages Expense                tagged costCenterId=cc
 *     cc.employerSs           Dr Employer Social Security Exp tagged costCenterId=cc
 *     cc.employerPension      Dr Employer Pension Expense     tagged costCenterId=cc
 *     cc.employerPayrollTax   Dr Payroll Tax Expense          tagged costCenterId=cc
 *
 *     Σ income tax withheld         Cr Income Tax Payable
 *     Σ employee SS + employer SS   Cr Social Security Payable
 *     Σ employee pension + employer Cr Pension Payable
 *     Σ other deductions            Cr Other Deductions Payable
 *     Σ employer payroll taxes      Cr Payroll Tax Payable
 *     Σ netPay                      Cr Net Payroll Payable
 *
 * The Dr side carries the analytical-dimension tag (`costCenterId`
 * field on `JournalEntryLine`) so segment-P&L reports roll up labor
 * cost by region / department / project. Lines with no resolvable
 * cost-center fall under `costCenterId: undefined` — segment reports
 * surface them as "unallocated".
 *
 * The Cr side stays aggregated — those payables are corporate
 * liabilities (bank later draws against them on tax-payment / pension
 * remittance runs), not segment-specific.
 *
 * The Net Payroll Payable Cr line is what the pain.001 disbursement
 * (PaymentRuns row, created by payroll-disbursement.hook on status →
 * 'disbursed') draws against on the pay date.
 *
 * SOX §404 four-eyes is enforced upstream by `enforceSegregationOfDuties`
 * on the same collection's beforeChange — the user posting cannot also
 * be the user who created the run.
 *
 * @accounting IFRS IAS-19 employee-benefits short-term
 * @accounting IFRS IAS-19 §51 defined-contribution-plans
 * @accounting IFRS IFRS-8 operating-segments
 * @accounting US-GAAP ASC-710 compensation-general
 * @accounting US-GAAP ASC-715 compensation-retirement-benefits
 * @accounting US-GAAP ASC-280 segment-reporting
 * @standard ISO-8601-1:2019 date-time period payment-date
 * @standard ISO-4217:2015 currency-codes
 * @audit ISO-19011:2018 audit-trail payroll-evidence
 * @compliance SOX §302 disclosure-controls
 * @compliance SOX §404 internal-controls four-eyes
 * @security ISO-27002 §5.4 segregation-of-duties
 * @see src/plugins/accounting/collections/PayrollRuns.ts
 * @see src/services/journal-entry.service.ts
 * @see docs/adr/0001-event-driven-gl-posting.md
 */

import type { CollectionAfterChangeHook } from 'payload'
import {
  journalEntryService,
  type JournalEntryLine,
} from '@/journal/entry/service'

// Canonical GL accounts for the payroll JE. Mirrors the gl-posting
// service's GL_ACCOUNTS constants — kept inline here so this hook
// stays self-contained and the chart of accounts can be remapped
// per-tenant in a future slice via Employees.compensationAccount /
// CostCenters.payrollAccount overrides.
const ACC = {
  WAGES_EXPENSE: 'wages_expense',
  EMPLOYER_SS_EXPENSE: 'employer_social_security_expense',
  EMPLOYER_PENSION_EXPENSE: 'employer_pension_expense',
  EMPLOYER_PAYROLL_TAX_EXPENSE: 'employer_payroll_tax_expense',
  INCOME_TAX_PAYABLE: 'income_tax_payable',
  SOCIAL_SECURITY_PAYABLE: 'social_security_payable',
  PENSION_PAYABLE: 'pension_payable',
  OTHER_DEDUCTIONS_PAYABLE: 'other_deductions_payable',
  PAYROLL_TAX_PAYABLE: 'payroll_tax_payable',
  NET_PAYROLL_PAYABLE: 'net_payroll_payable',
} as const

interface PayrollLine {
  totalGross?: number
  netPay?: number
  incomeTaxWithheld?: number
  socialSecurityEmployee?: number
  socialSecurityEmployer?: number
  pensionEmployee?: number
  pensionEmployer?: number
  payrollTaxesEmployer?: number
  otherDeductions?: number
  /** Cost-center analytical dimension — drives the per-segment Dr split. */
  costCenter?: string | number | (Record<string, unknown> & { id?: string | number })
  /** Falls back via employee.department when line.costCenter is null. */
  employee?: string | number | (Record<string, unknown> & { id?: string | number; department?: unknown })
}

type RunDoc = Record<string, unknown> & {
  id: string | number
  status?: string
  tenant?: string | { id?: string }
  runId?: string
  paymentDate?: string | Date
  periodEnd?: string | Date
  lines?: PayrollLine[]
  journalEntry?: string | { id?: string } | null
}

const idOf = (v: unknown): string | undefined => {
  if (typeof v === 'string' || typeof v === 'number') return String(v)
  if (typeof v === 'object' && v !== null && 'id' in v) {
    const id = (v as { id?: unknown }).id
    if (id !== undefined) return String(id)
  }
  return undefined
}

const isStatusTransitionToPosted = (
  doc: RunDoc,
  previousDoc?: RunDoc,
): boolean => {
  if (doc?.status !== 'posted') return false
  if (!previousDoc) return true
  return previousDoc.status !== 'posted'
}

const sum = (lines: PayrollLine[], pick: (l: PayrollLine) => number): number =>
  lines.reduce((acc, l) => acc + pick(l), 0)

/**
 * Resolve the effective cost-center for a payroll line.
 * Precedence: line.costCenter → employee.department → undefined.
 */
const lineCostCenter = (line: PayrollLine): string | undefined => {
  const direct = idOf(line.costCenter)
  if (direct) return direct
  const employee = line.employee
  if (
    employee &&
    typeof employee === 'object' &&
    'department' in employee
  ) {
    return idOf((employee as Record<string, unknown>).department)
  }
  return undefined
}

interface CostCenterTotals {
  costCenterId?: string
  totalGross: number
  employerSs: number
  employerPension: number
  employerPayrollTax: number
}

/**
 * Group lines by cost-center and accumulate the Dr-side amounts. Lines
 * without a resolvable cost-center fall under the special undefined
 * key — they post to the same expense accounts but without a segment
 * tag, so segment reports show them as "unallocated".
 */
const groupByCostCenter = (lines: PayrollLine[]): CostCenterTotals[] => {
  const map = new Map<string | undefined, CostCenterTotals>()
  for (const line of lines) {
    const cc = lineCostCenter(line)
    const cur =
      map.get(cc) ??
      ({
        costCenterId: cc,
        totalGross: 0,
        employerSs: 0,
        employerPension: 0,
        employerPayrollTax: 0,
      } as CostCenterTotals)
    cur.totalGross += Number(line.totalGross ?? 0)
    cur.employerSs += Number(line.socialSecurityEmployer ?? 0)
    cur.employerPension += Number(line.pensionEmployer ?? 0)
    cur.employerPayrollTax += Number(line.payrollTaxesEmployer ?? 0)
    map.set(cc, cur)
  }
  return Array.from(map.values())
}

export const payrollRunPostingHook: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
  operation,
}) => {
  const run = doc as RunDoc
  if (!run || (operation !== 'create' && operation !== 'update')) return doc
  if (!isStatusTransitionToPosted(run, previousDoc as RunDoc | undefined)) {
    return doc
  }

  // Idempotency: skip if JE already linked.
  if (idOf(run.journalEntry)) return doc

  try {
    const tenant = idOf(run.tenant)
    const userId = req.user?.id
    if (!tenant || !userId) {
      req.payload.logger.warn(
        `payroll-run ${run.id}: missing tenant or user — cannot post`,
      )
      return doc
    }

    const lines = Array.isArray(run.lines) ? run.lines : []
    if (lines.length === 0) {
      req.payload.logger.warn(
        `payroll-run ${run.id}: no lines — cannot post`,
      )
      return doc
    }

    const totalGross = sum(lines, (l) => Number(l.totalGross ?? 0))
    const incomeTaxWithheld = sum(
      lines,
      (l) => Number(l.incomeTaxWithheld ?? 0),
    )
    const employeeSs = sum(lines, (l) => Number(l.socialSecurityEmployee ?? 0))
    const employeePension = sum(lines, (l) => Number(l.pensionEmployee ?? 0))
    const otherDeductions = sum(lines, (l) => Number(l.otherDeductions ?? 0))
    const totalNet = sum(lines, (l) => Number(l.netPay ?? 0))

    // Per-cost-center totals drive the Dr-side segment split (IFRS 8 /
    // ASC 280). Cr-side amounts are corporate liabilities — kept aggregated.
    const byCostCenter = groupByCostCenter(lines)
    const employerSs = byCostCenter.reduce((s, c) => s + c.employerSs, 0)
    const employerPension = byCostCenter.reduce((s, c) => s + c.employerPension, 0)
    const employerPayrollTax = byCostCenter.reduce(
      (s, c) => s + c.employerPayrollTax,
      0,
    )

    if (totalGross <= 0) {
      req.payload.logger.warn(
        `payroll-run ${run.id}: zero gross total — nothing to post`,
      )
      return doc
    }

    const description = `Payroll run ${run.runId ?? run.id}`

    const entryLines: JournalEntryLine[] = []
    // Dr side — gross + employer accruals, split by cost-center (IFRS 8 /
    // ASC 280 segment dimension). One Dr line per (account × cost-center)
    // tuple. Lines without a resolvable cost-center post under the same
    // expense accounts but with `costCenterId` undefined — segment reports
    // surface these as "unallocated".
    for (const cc of byCostCenter) {
      if (cc.totalGross > 0) {
        entryLines.push({
          accountId: ACC.WAGES_EXPENSE,
          debit: cc.totalGross,
          description,
          costCenterId: cc.costCenterId,
        })
      }
      if (cc.employerSs > 0) {
        entryLines.push({
          accountId: ACC.EMPLOYER_SS_EXPENSE,
          debit: cc.employerSs,
          description,
          costCenterId: cc.costCenterId,
        })
      }
      if (cc.employerPension > 0) {
        entryLines.push({
          accountId: ACC.EMPLOYER_PENSION_EXPENSE,
          debit: cc.employerPension,
          description,
          costCenterId: cc.costCenterId,
        })
      }
      if (cc.employerPayrollTax > 0) {
        entryLines.push({
          accountId: ACC.EMPLOYER_PAYROLL_TAX_EXPENSE,
          debit: cc.employerPayrollTax,
          description,
          costCenterId: cc.costCenterId,
        })
      }
    }

    // Cr side — payables
    if (incomeTaxWithheld > 0) {
      entryLines.push({
        accountId: ACC.INCOME_TAX_PAYABLE,
        credit: incomeTaxWithheld,
        description,
      })
    }
    const socialSecurityCredit = employeeSs + employerSs
    if (socialSecurityCredit > 0) {
      entryLines.push({
        accountId: ACC.SOCIAL_SECURITY_PAYABLE,
        credit: socialSecurityCredit,
        description,
      })
    }
    const pensionCredit = employeePension + employerPension
    if (pensionCredit > 0) {
      entryLines.push({
        accountId: ACC.PENSION_PAYABLE,
        credit: pensionCredit,
        description,
      })
    }
    if (otherDeductions > 0) {
      entryLines.push({
        accountId: ACC.OTHER_DEDUCTIONS_PAYABLE,
        credit: otherDeductions,
        description,
      })
    }
    if (employerPayrollTax > 0) {
      entryLines.push({
        accountId: ACC.PAYROLL_TAX_PAYABLE,
        credit: employerPayrollTax,
        description,
      })
    }
    if (totalNet > 0) {
      entryLines.push({
        accountId: ACC.NET_PAYROLL_PAYABLE,
        credit: totalNet,
        description,
      })
    }

    const entry = await journalEntryService.createEntry(tenant, {
      entryDate: new Date((run.periodEnd as string | Date | undefined) ?? new Date()),
      description,
      lines: entryLines,
      sourceType: 'payroll_run',
      sourceId: String(run.id),
      sourceEvent: 'payroll:posted',
      userId: String(userId),
    })
    await journalEntryService.postEntry(tenant, entry.id, String(userId))

    await req.payload.update({
      collection: 'payroll-runs',
      id: run.id as string | number,
      data: { journalEntry: entry.id },
      overrideAccess: true,
    })

    req.payload.logger.info(
      `✓ payroll-run ${run.id} posted as JE ${entry.id} (gross ${totalGross} / net ${totalNet})`,
    )
  } catch (error) {
    req.payload.logger.error(
      { err: error },
      `✗ Error posting payroll-run ${run.id}:`,
    )
  }

  return doc
}
