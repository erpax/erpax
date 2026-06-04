/**
 * Balanced-Entry Hook — Payload `beforeValidate` factory enforcing the
 * double-entry-bookkeeping invariant `Σ debits === Σ credits` via the
 * canonical `DebitCreditLogic.validateEntry`.
 *
 * Single source of truth for "is this row of debit/credit pairs balanced?"
 * — same arithmetic, same tolerance, same error format whether the caller
 * is a Payload collection (`JournalEntries`, `GLPostings`) or a service-
 * layer code path. Eliminates the four+ inline `reduce` reimplementations
 * scattered across `JournalEntries.ts`, `GLPostings.ts`,
 * `journal-entry.service.ts`, and `services/reports.ts`.
 *
 * Behaviour:
 *   1. Read `data[linesField]` (default `'lines'`) — array of `{debit, credit}`.
 *   2. Compute `totalDebits`, `totalCredits` via `DebitCreditLogic.validateEntry`.
 *   3. Write them back to `data[debitTotalField]` / `data[creditTotalField]`
 *      (defaults `'debitTotal'` / `'creditTotal'`).
 *   4. Set `data[balancedField]` (default `'isBalanced'`) when supplied.
 *   5. Throw with debit/credit values on imbalance.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @standard IEEE-754-2019 binary-floating-point integer-cents-only
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 * @accounting OECD SAF-T §3 journal-entries
 * @audit ISO-19011:2018 audit-trail double-entry-invariant
 * @compliance SOX §404 internal-controls
 * @see src/plugins/accounting/debit-credit.ts
 * @see docs/STANDARDS.md §4.2
 */

import type { CollectionBeforeValidateHook } from 'payload'
import { DebitCreditLogic, type AccountType, type JournalEntryLine } from '@/accounting/debit-credit'

export interface BalancedEntryOptions {
  /** Field on the document holding the array of debit/credit lines (default: `'lines'`). */
  linesField?: string
  /** Field on each line holding the debit amount (default: `'debit'`). */
  debitField?: string
  /** Field on each line holding the credit amount (default: `'credit'`). */
  creditField?: string
  /** Where to write the computed total debit (default: `'debitTotal'`). */
  debitTotalField?: string
  /** Where to write the computed total credit (default: `'creditTotal'`). */
  creditTotalField?: string
  /** Where to write the boolean balanced flag (default: `'isBalanced'`). Pass `false` to skip. */
  balancedField?: string | false
  /** Optional override for the per-line account-type extractor (default: line.accountType ?? 'asset'). */
  accountTypeFor?: (line: Record<string, unknown>) => AccountType
}

/**
 * Build a `beforeValidate` hook that delegates balance-checking to the
 * canonical `DebitCreditLogic.validateEntry` over the configured lines
 * field. Drop into any collection whose document carries an array of
 * `{ debit, credit }` rows.
 */
export function validateBalancedEntry(
  options: BalancedEntryOptions = {},
): CollectionBeforeValidateHook {
  const linesField = options.linesField ?? 'lines'
  const debitField = options.debitField ?? 'debit'
  const creditField = options.creditField ?? 'credit'
  const debitTotalField = options.debitTotalField ?? 'debitTotal'
  const creditTotalField = options.creditTotalField ?? 'creditTotal'
  const balancedField = options.balancedField === false ? false : (options.balancedField ?? 'isBalanced')
  const accountTypeFor =
    options.accountTypeFor ?? ((l: Record<string, unknown>) => ((l.accountType as AccountType) ?? 'asset'))

  return async ({ data }) => {
    if (!data || !Array.isArray((data as Record<string, unknown>)[linesField])) {
      return data
    }
    const rows = (data as Record<string, unknown>)[linesField] as Array<Record<string, unknown>>
    const lines: JournalEntryLine[] = rows.map((r) => ({
      accountCode: String(r.accountCode ?? ''),
      accountType: accountTypeFor(r),
      debit: Number(r[debitField]) || 0,
      credit: Number(r[creditField]) || 0,
    }))
    const result = DebitCreditLogic.validateEntry(lines)
    ;(data as Record<string, unknown>)[debitTotalField] = result.totalDebits
    ;(data as Record<string, unknown>)[creditTotalField] = result.totalCredits
    if (balancedField) {
      ;(data as Record<string, unknown>)[balancedField] = result.balanced
    }
    if (!result.balanced) {
      throw new Error(
        `Journal entry must balance: debits ${result.totalDebits} ≠ credits ${result.totalCredits} (variance ${result.variance})`,
      )
    }
    return data
  }
}
