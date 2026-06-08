/**
 * accounting/coa — path IS the account code; the fs tree fold IS the chart of accounts.
 *
 * Every atom folder (`law/folder`, `readings`, `quantum/emr`) is one GL account keyed by its
 * full path — homonyms are distinct (leaf alone is never the code). `accountCodeOf` normalizes
 * the path; `accountCoordinateOf` pairs it with `coordinateAddress` for audit binds.
 *
 * Corpus self-accounting posts in **eb** (entropy-bit) — tamper-cost log₂ mass at the horo floor
 * ([[readme/entropy]]). Gap debits and seal credits hit the folder path; contra paths are also
 * atoms (`entropy`, `seal`, `balance`) — no separate GL code table.
 *
 * @see ../../path — ../../uuid/matrix — ../debit — ../corpus — ../SKILL.md
 */
import { canonicalMatrixPath } from '@/path'
import { coordinateAddress } from '@/uuid/matrix'
import { DebitCreditLogic, type JournalEntryLine, type ValidatedEntry } from '../debit'
import { ENTROPY_CURRENCY, ebToMilliEb, type PathPostingUnit } from '../corpus'

export { ENTROPY_CURRENCY, ebToMilliEb, milliEbToEb, MILLI_EB_SCALE } from '../corpus'
export type { PathPostingUnit } from '../corpus'

/** Contra paths — corpus atoms that close gap/seal pairs (path-keyed, not synthetic GL). */
export const ENTROPY_CONTRA_PATH = 'entropy' as const
export const SEAL_CONTRA_PATH = 'seal' as const
export const BALANCE_CONTRA_PATH = 'balance' as const

/**
 * Normalize atom path → chart-of-accounts account code.
 * Full path only — `agents/accounting` ≠ `accounting`.
 */
export function accountCodeOf(atomPath: string): string {
  const stripped = atomPath.trim().replace(/^\/+|\/+$/g, '').replace(/^src\//, '')
  return canonicalMatrixPath(stripped)
}

/** Matrix coordinate for audit — path · horo/measure · uuid prefix. */
export function accountCoordinateOf(atomPath: string): string {
  return coordinateAddress(accountCodeOf(atomPath))
}

/** Infer GL account type from posting side on a path account. */
export const accountTypeForPosting = (
  accountCode: string,
  debit: number,
  credit: number,
): 'asset' | 'liability' | 'equity' | 'expense' => {
  if (accountCode === ENTROPY_CONTRA_PATH) return 'liability'
  if (accountCode === SEAL_CONTRA_PATH) return 'asset'
  if (accountCode === BALANCE_CONTRA_PATH) return 'asset'
  if (debit > 0) return 'expense'
  if (credit > 0) return 'equity'
  return 'asset'
}

/**
 * Post one journal line to a path-keyed account.
 * `units` is the currency discriminator — corpus self-accounting uses `eb` (milli-eb integers).
 */
export function postEntry(
  accountCode: string,
  debit: number,
  credit: number,
  units: PathPostingUnit = ENTROPY_CURRENCY,
): JournalEntryLine {
  const code = accountCodeOf(accountCode)
  return {
    accountCode: code,
    accountType: accountTypeForPosting(code, debit, credit),
    debit,
    credit,
    description: units,
  }
}

/** Gap pair — disorder borrowed on folder path, entropy contra credited (karma-shaped). */
export function postGapOnPath(atomPath: string, amountEb: number): readonly JournalEntryLine[] {
  const milli = ebToMilliEb(amountEb)
  return [postEntry(atomPath, milli, 0), postEntry(ENTROPY_CONTRA_PATH, 0, milli)]
}

/** Seal pair — order credited on folder path, seal contra debited. */
export function postSealOnPath(atomPath: string, amountEb: number): readonly JournalEntryLine[] {
  const milli = ebToMilliEb(amountEb)
  return [postEntry(SEAL_CONTRA_PATH, milli, 0), postEntry(atomPath, 0, milli)]
}

/** Flatten entropy lines → balanced path-keyed journal lines. */
export function entropyLinesToPathEntry(
  atomPath: string,
  gaps: ReadonlyArray<{ readonly comparable: number }>,
  seals: ReadonlyArray<{ readonly comparable: number }>,
): ValidatedEntry {
  const lines: JournalEntryLine[] = [
    ...gaps.flatMap((g) => [...postGapOnPath(atomPath, g.comparable)]),
    ...seals.flatMap((s) => [...postSealOnPath(atomPath, s.comparable)]),
  ]
  const entry = DebitCreditLogic.validateEntry(lines)
  if (!entry.balanced) {
    throw new Error(
      `Path-keyed entropy entry unbalanced: debits ${entry.totalDebits} ≠ credits ${entry.totalCredits}`,
    )
  }
  return entry
}

/** Net milli-eb position per path account across an entry. */
export function balanceByPath(entry: ValidatedEntry): Record<string, number> {
  const bal: Record<string, number> = {}
  for (const l of entry.lines) {
    bal[l.accountCode] = (bal[l.accountCode] ?? 0) + l.debit - l.credit
  }
  return bal
}
