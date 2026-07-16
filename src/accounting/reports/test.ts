import { describe, it, expect } from 'vitest'
import { DoubleEntryValidator } from '@/double/entry/validator'
import { generateTrialBalance } from './index'

/**
 * The trial balance is what every other statement projects from — the balance sheet, the income statement,
 * and the statutory SAF-T export. Its only test asserted `typeof generateTrialBalance === 'function'`.
 *
 * A stub payload, so the sums are checkable without a DB: `find` answers per collection and PAGES, because
 * paging is exactly where the defect lived.
 */
const acct = (id: string, n: string, type: string, normal: 'debit' | 'credit') => ({
  id, accountNumber: n, accountName: n + '-name', accountType: type, normalBalance: normal,
})

const stub = (accounts: unknown[], entries: unknown[], pageSize = 1000) => ({
  find: async ({ collection, page = 1, limit = pageSize }: { collection: string; page?: number; limit?: number }) => {
    const all = collection === 'gl-accounts' ? accounts : entries
    const start = (page - 1) * limit
    const docs = all.slice(start, start + limit)
    return { docs, totalDocs: all.length, hasNextPage: start + limit < all.length, page }
  },
})

const entry = (accountId: string, debit: number, credit: number) => ({
  id: `je-${accountId}-${debit}-${credit}`,
  lines: [{ glAccount: accountId, debit, credit }],
})

describe('accounting/reports — the trial balance', () => {
  it('sums debits and credits per account, and balances', async () => {
    const p = stub(
      [acct('cash', '1000', 'asset', 'debit'), acct('rev', '4000', 'revenue', 'credit')],
      [entry('cash', 100, 0), entry('rev', 0, 100)],
    )
    const tb = await generateTrialBalance(p as never, 't1', new Date('2026-05-12'))
    expect(tb.totalDebits).toBe(100)
    expect(tb.totalCredits).toBe(100)
    expect(tb.isBalanced).toBe(true)
    expect(tb.rows.find((r) => r.accountId === 'cash')!.totalDebits).toBe(100)
  })

  it('an unbalanced ledger is REPORTED unbalanced — the report does not flatter the books', async () => {
    const p = stub([acct('cash', '1000', 'asset', 'debit')], [entry('cash', 100, 0)])
    const tb = await generateTrialBalance(p as never, 't1', new Date('2026-05-12'))
    expect(tb.isBalanced).toBe(false)
  })

  /**
   * THE DEFECT. It read `limit: 100000` with NOTHING checking totalDocs or hasNextPage. At 100 001 posted
   * entries the rest were dropped, the remainder summed, and `isBalanced: true` returned — because the
   * OMITTED entries were themselves balanced. A wrong trial balance that says it balances, feeding the
   * balance sheet, the income statement and the SAF-T export.
   *
   * This FAILS against the old code: with a page size of 2 and 6 entries, it would have seen 2.
   */
  it('reads EVERY page — a cap that drops rows is a report about a subset', async () => {
    const accounts = [acct('cash', '1000', 'asset', 'debit'), acct('rev', '4000', 'revenue', 'credit')]
    const entries = [
      entry('cash', 100, 0), entry('rev', 0, 100),
      entry('cash', 50, 0), entry('rev', 0, 50),
      entry('cash', 25, 0), entry('rev', 0, 25),
    ]
    const tb = await generateTrialBalance(stub(accounts, entries, 2) as never, 't1', new Date('2026-05-12'))
    expect(tb.totalDebits).toBe(175) // 100+50+25 — page 1 alone would say 100
    expect(tb.totalCredits).toBe(175)
    expect(tb.isBalanced).toBe(true)
  })

  it('pages the ACCOUNTS too — a missing account is a missing row, silently', async () => {
    const accounts = Array.from({ length: 5 }, (_, i) => acct(`a${i}`, `100${i}`, 'asset', 'debit'))
    const tb = await generateTrialBalance(stub(accounts, [entry('a4', 10, 0)], 2) as never, 't1', new Date())
    expect(tb.rows).toHaveLength(5) // the 5th account exists only beyond page 1
    expect(tb.rows.find((r) => r.accountId === 'a4')!.totalDebits).toBe(10)
  })

  /**
   * The balance law is ONE law. It read `< 0.01` here while the validator refuses on `> BALANCE_TOLERANCE`
   * — the same rule in two places, already disagreeing at exactly one cent.
   *
   * Written first as `credits = 100 - BALANCE_TOLERANCE`, asserting balanced. It FAILED, and it was right
   * to: 100 − 99.99 = 0.010000000000005 in float64 — ABOVE the bound. The bound names a cent and does not
   * mean one (double/entry/validator pins this: the same 1-cent gap is refused at 100 and admitted at 50).
   * My own test walked into the trap its own atom documents.
   *
   * So assert the LAW, not a magic pair: whatever the floats do, the report and the validator must give the
   * SAME verdict. One law, two callers, no drift — which is the only thing that was ever wrong here.
   */
  it('agrees with the validator on EVERY case — one law, two callers', async () => {
    const cases: [number, number][] = [
      [100, 100],      // exact
      [100, 99.99],    // the float accident: 0.010000000000005 > bound
      [50, 49.99],     // the same cent, and it lands UNDER the bound
      [100, 99.995],   // inside
      [100, 90],       // plainly unbalanced
    ]
    for (const [d, c] of cases) {
      const p = stub(
        [acct('cash', '1000', 'asset', 'debit'), acct('rev', '4000', 'revenue', 'credit')],
        [entry('cash', d, 0), entry('rev', 0, c)],
      )
      const tb = await generateTrialBalance(p as never, 't1', new Date('2026-05-12'))
      const validator = DoubleEntryValidator.validateBalance([
        { accountId: 'cash', debitAmount: d },
        { accountId: 'rev', creditAmount: c },
      ])
      expect(tb.isBalanced, `report and validator disagree on ${d} vs ${c}`).toBe(validator)
    }
  })
})
