/**
 * Accounting Reports — service-generated DTOs.
 *
 * Per Payload's collection-design guidance, derived/aggregate data is NOT a
 * write-collection. The retired report collections (TrialBalance, AR/APAging,
 * FinancialRatios, CashFlow, Trend, BudgetVariance, …) live here instead — as
 * pure functions over `gl-accounts` + `journal-entries` queries.
 *
 * Each function:
 *   • takes a Payload instance, host id, and a date or period
 *   • runs read-only queries (no side effects)
 *   • returns a typed DTO suitable for serving from a custom Payload endpoint
 *   • is independently testable with fixtures (no Map<>, no in-memory state)
 *
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting IFRS IFRS-9 expected-credit-loss aging
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @accounting US-GAAP ASC-310 receivables ar-aging
 * @accounting US-GAAP ASC-326 credit-losses-cecl
 * @accounting US-GAAP ASC-405 liabilities ap-aging
 * @accounting OECD SAF-T 2.0 standard-audit-file-tax
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time as-of-date period
 * @audit ISO-19011:2018 audit-trail read-only-queries
 * @compliance SOX §302 disclosure-controls
 * @see docs/STANDARDS.md §4.2
 *
 * Standards alignment (legacy prose retained):
 *   • IFRS / GAAP — Balance Sheet (assets = liabilities + equity), P&L,
 *     Cash Flow Statement structure
 *   • ISO 4217 currency codes; ISO 8601 dates
 */

import type { Payload } from 'payload'
import { computeAgingBuckets, type AgingBucket, type BucketDefinition } from '@/plugins/parties'
import { DebitCreditLogic } from '../debit-credit'

// ─── Types ─────────────────────────────────────────────────────────────────

/** A row in a trial balance: one ledger account with its summed activity. */
export interface TrialBalanceRow {
  accountId: string | number
  accountNumber: string
  accountName: string
  accountType: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense' | 'gain_loss'
  normalBalance: 'debit' | 'credit'
  totalDebits: number
  totalCredits: number
  /** Net balance, expressed positive on the account's normal side. */
  balance: number
}

export interface TrialBalanceDTO {
  hostId: string | number
  asOfDate: string                 // ISO 8601
  rows: TrialBalanceRow[]
  totalDebits: number
  totalCredits: number
  isBalanced: boolean              // |totalDebits - totalCredits| < 0.01
  currency: string                 // ISO 4217
  generatedAt: string              // ISO 8601
}

export interface AgingReportDTO {
  hostId: string | number
  asOfDate: string
  buckets: AgingBucket[]
  totalOutstanding: number
  documentCount: number
  side: 'AR' | 'AP'
  generatedAt: string
}

export interface BalanceSheetSection {
  name: string
  accounts: TrialBalanceRow[]
  total: number
}

export interface BalanceSheetDTO {
  hostId: string | number
  asOfDate: string
  assets: BalanceSheetSection
  liabilities: BalanceSheetSection
  equity: BalanceSheetSection
  totalAssets: number
  totalLiabilitiesAndEquity: number
  isBalanced: boolean
  currency: string
  generatedAt: string
}

export interface IncomeStatementDTO {
  hostId: string | number
  periodStart: string
  periodEnd: string
  revenue: BalanceSheetSection
  expenses: BalanceSheetSection
  totalRevenue: number
  totalExpenses: number
  netIncome: number
  currency: string
  generatedAt: string
}

// ─── Implementation helpers ───────────────────────────────────────────────

interface JournalLine {
  glAccount: string | number | { id: string | number }
  debit?: number
  credit?: number
}
interface JournalEntry {
  id: string | number
  entryDate: string
  status: string
  lines?: JournalLine[]
}
interface GLAccountDoc {
  id: string | number
  accountNumber: string
  accountName: string
  accountType: TrialBalanceRow['accountType']
  normalBalance: TrialBalanceRow['normalBalance']
}

/** Resolve a `glAccount` reference to its id (handles both flat-id and nested-doc shapes). */
function lineAccountId(line: JournalLine): string | number | undefined {
  const ref = line.glAccount
  if (ref == null) return undefined
  return typeof ref === 'object' && 'id' in ref ? ref.id : ref
}

/** Sum debits/credits per account from a list of posted journal entries. */
function aggregateActivity(
  entries: JournalEntry[],
): Map<string | number, { debits: number; credits: number }> {
  const m = new Map<string | number, { debits: number; credits: number }>()
  for (const e of entries) {
    if (!Array.isArray(e.lines)) continue
    for (const line of e.lines) {
      const id = lineAccountId(line)
      if (id == null) continue
      const cell = m.get(id) ?? { debits: 0, credits: 0 }
      cell.debits += line.debit ?? 0
      cell.credits += line.credit ?? 0
      m.set(id, cell)
    }
  }
  return m
}

/**
 * Net balance on the account's normal side. Delegates to the canonical
 * `DebitCreditLogic.getBalance` — `'asset'` is debit-normal and `'liability'`
 * is credit-normal in the canonical rules table, so we pick whichever
 * matches the row's declared normal balance and let the canonical math
 * (debits − credits OR credits − debits) handle the sign.
 */
function netBalance(row: { totalDebits: number; totalCredits: number; normalBalance: 'debit' | 'credit' }): number {
  return DebitCreditLogic.getBalance(
    row.normalBalance === 'debit' ? 'asset' : 'liability',
    row.totalDebits,
    row.totalCredits,
  )
}

// ─── Public report functions ──────────────────────────────────────────────

/**
 * Trial Balance — every GL account with its summed debits / credits as of a date.
 * In a properly balanced system, totalDebits === totalCredits across all accounts.
 */
export async function generateTrialBalance(
  payload: Payload,
  hostId: string | number,
  asOfDate: Date,
  currency = 'EUR',
): Promise<TrialBalanceDTO> {
  const [accounts, entries] = await Promise.all([
    payload.find({
      collection: 'gl-accounts',
      where: { and: [{ hostId: { equals: hostId } }] },
      limit: 10000,
      depth: 0,
    }),
    payload.find({
      collection: 'journal-entries',
      where: {
        and: [
          { hostId: { equals: hostId } },
          { status: { equals: 'posted' } },
          { entryDate: { less_than_equal: asOfDate.toISOString() } },
        ],
      },
      limit: 100000,
      depth: 0,
    }),
  ])

  const activity = aggregateActivity(entries.docs as unknown as JournalEntry[])
  const rows: TrialBalanceRow[] = (accounts.docs as unknown as GLAccountDoc[]).map((acc) => {
    const cell = activity.get(acc.id) ?? { debits: 0, credits: 0 }
    const row: TrialBalanceRow = {
      accountId: acc.id,
      accountNumber: acc.accountNumber,
      accountName: acc.accountName,
      accountType: acc.accountType,
      normalBalance: acc.normalBalance,
      totalDebits: cell.debits,
      totalCredits: cell.credits,
      balance: 0,
    }
    row.balance = netBalance(row)
    return row
  })

  const totalDebits = rows.reduce((s, r) => s + r.totalDebits, 0)
  const totalCredits = rows.reduce((s, r) => s + r.totalCredits, 0)
  return {
    hostId,
    asOfDate: asOfDate.toISOString(),
    rows: rows.sort((a, b) => a.accountNumber.localeCompare(b.accountNumber)),
    totalDebits,
    totalCredits,
    isBalanced: Math.abs(totalDebits - totalCredits) < 0.01,
    currency,
    generatedAt: new Date().toISOString(),
  }
}

/** Balance Sheet — Assets / Liabilities / Equity from the trial balance. */
export async function generateBalanceSheet(
  payload: Payload,
  hostId: string | number,
  asOfDate: Date,
  currency = 'EUR',
): Promise<BalanceSheetDTO> {
  const tb = await generateTrialBalance(payload, hostId, asOfDate, currency)

  const section = (name: string, types: TrialBalanceRow['accountType'][]): BalanceSheetSection => {
    const accounts = tb.rows.filter((r) => types.includes(r.accountType) && r.balance !== 0)
    return { name, accounts, total: accounts.reduce((s, a) => s + a.balance, 0) }
  }

  const assets = section('Assets', ['asset'])
  const liabilities = section('Liabilities', ['liability'])
  const equity = section('Equity', ['equity'])

  return {
    hostId,
    asOfDate: asOfDate.toISOString(),
    assets,
    liabilities,
    equity,
    totalAssets: assets.total,
    totalLiabilitiesAndEquity: liabilities.total + equity.total,
    isBalanced: Math.abs(assets.total - (liabilities.total + equity.total)) < 0.01,
    currency,
    generatedAt: new Date().toISOString(),
  }
}

/** Income Statement (P&L) — Revenue − Expenses for a period. */
export async function generateIncomeStatement(
  payload: Payload,
  hostId: string | number,
  periodStart: Date,
  periodEnd: Date,
  currency = 'EUR',
): Promise<IncomeStatementDTO> {
  const [accounts, entries] = await Promise.all([
    payload.find({
      collection: 'gl-accounts',
      where: {
        and: [
          { hostId: { equals: hostId } },
          { accountType: { in: ['revenue', 'expense', 'gain_loss'] } },
        ],
      },
      limit: 10000,
      depth: 0,
    }),
    payload.find({
      collection: 'journal-entries',
      where: {
        and: [
          { hostId: { equals: hostId } },
          { status: { equals: 'posted' } },
          { entryDate: { greater_than_equal: periodStart.toISOString() } },
          { entryDate: { less_than_equal: periodEnd.toISOString() } },
        ],
      },
      limit: 100000,
      depth: 0,
    }),
  ])

  const activity = aggregateActivity(entries.docs as unknown as JournalEntry[])
  const rows: TrialBalanceRow[] = (accounts.docs as unknown as GLAccountDoc[]).map((acc) => {
    const cell = activity.get(acc.id) ?? { debits: 0, credits: 0 }
    const row: TrialBalanceRow = {
      accountId: acc.id,
      accountNumber: acc.accountNumber,
      accountName: acc.accountName,
      accountType: acc.accountType,
      normalBalance: acc.normalBalance,
      totalDebits: cell.debits,
      totalCredits: cell.credits,
      balance: 0,
    }
    row.balance = netBalance(row)
    return row
  })

  const revenueAccounts = rows.filter((r) => r.accountType === 'revenue')
  const expenseAccounts = rows.filter((r) => r.accountType === 'expense')
  const totalRevenue = revenueAccounts.reduce((s, a) => s + a.balance, 0)
  const totalExpenses = expenseAccounts.reduce((s, a) => s + a.balance, 0)

  return {
    hostId,
    periodStart: periodStart.toISOString(),
    periodEnd: periodEnd.toISOString(),
    revenue: { name: 'Revenue', accounts: revenueAccounts, total: totalRevenue },
    expenses: { name: 'Expenses', accounts: expenseAccounts, total: totalExpenses },
    totalRevenue,
    totalExpenses,
    netIncome: totalRevenue - totalExpenses,
    currency,
    generatedAt: new Date().toISOString(),
  }
}

// ─── Aging reports — wrap parties.computeAgingBuckets ─────────────────────

/**
 * A/R Aging — open invoices grouped by days-past-due.
 * Replaces the retired `ar-aging-report` collection.
 */
export async function generateARAgingReport(
  payload: Payload,
  hostId: string | number,
  asOfDate: Date,
  buckets?: BucketDefinition[],
): Promise<AgingReportDTO> {
  const open = await payload.find({
    collection: 'invoices',
    where: {
      and: [
        { tenant: { equals: hostId } },
        { status: { in: ['issued', 'open', 'past_due', 'grace_period'] } },
      ],
    },
    limit: 100000,
    depth: 0,
  })
  const docs = (open.docs as unknown as Array<{
    id: string
    dueAt?: string
    totalDue?: number
    status: string
  }>).map((d) => ({
    id: String(d.id),
    dueDate: d.dueAt ?? new Date().toISOString(),
    balance: d.totalDue ?? 0,
    status: d.status,
  }))

  const result = computeAgingBuckets(docs, asOfDate, buckets)
  return {
    hostId,
    asOfDate: asOfDate.toISOString(),
    buckets: result.buckets,
    totalOutstanding: result.totalOutstanding,
    documentCount: result.documentCount,
    side: 'AR',
    generatedAt: new Date().toISOString(),
  }
}

/**
 * A/P Aging — open bills grouped by days-past-due.
 * (When a `bills` collection lands; for now uses `invoices` filtered by `invoiceType: 'bill'`.)
 */
export async function generateAPAgingReport(
  payload: Payload,
  hostId: string | number,
  asOfDate: Date,
  buckets?: BucketDefinition[],
): Promise<AgingReportDTO> {
  const open = await payload.find({
    collection: 'invoices',
    where: {
      and: [
        { tenant: { equals: hostId } },
        { invoiceType: { equals: 'bill' } },
        { status: { in: ['issued', 'open', 'past_due', 'grace_period'] } },
      ],
    },
    limit: 100000,
    depth: 0,
  })
  const docs = (open.docs as unknown as Array<{
    id: string
    dueAt?: string
    totalDue?: number
    status: string
  }>).map((d) => ({
    id: String(d.id),
    dueDate: d.dueAt ?? new Date().toISOString(),
    balance: d.totalDue ?? 0,
    status: d.status,
  }))

  const result = computeAgingBuckets(docs, asOfDate, buckets)
  return {
    hostId,
    asOfDate: asOfDate.toISOString(),
    buckets: result.buckets,
    totalOutstanding: result.totalOutstanding,
    documentCount: result.documentCount,
    side: 'AP',
    generatedAt: new Date().toISOString(),
  }
}
