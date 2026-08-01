import { exactAbs } from '@/algebra'
/**
 * DoubleEntryValidator — the law an ERP exists to guarantee.
 *
 * Validates double-entry bookkeeping: every entry has two sides, and the sides agree.
 *
 * The two claims below were once written as `debits.sum() === credits.sum()` and "account-type matches
 * debit/credit polarity" — with no test beside them ([[rules]]/refutable found this atom holding the
 * fundamental law of accounting with nothing able to contradict it). Both were false about this code:
 *
 * - Equality is not what runs, and it CANNOT be: these are IEEE-754 floats, where 0.1+0.2 ≠ 0.3. The code
 *   admits a 1-cent tolerance, and that tolerance IS the law. Stating `===` described an implementation
 *   nobody wrote and hid the real question — what gap posts.
 * - Polarity is a WARNING, never a refusal: `valid` stays true when a debit-normal account is credited. As
 *   an "@invariant" it forbade nothing. It is a heuristic, and a real one — a contra-account (see
 *   ACCOUNT_POLARITY) legitimately inverts, so wrong-looking polarity is a signal, not an error.
 *
 * @invariant |Σdebits − Σcredits| ≤ BALANCE_TOLERANCE ⇒ valid (a tolerance over floats, never equality)
 * @invariant a posting carries exactly one side, non-negative — direction is the column, never the sign
 * @invariant polarity mismatch ⇒ warning, never error — advisory, because contra-accounts invert
 *
 * @standard IAS 1 — an entry balances
 * @see src/double/entry/validator/test.ts — the proof that refutes each claim above
 */

/**
 * The gap a posting may carry and still balance. This is the shipped value, preserved deliberately.
 *
 * Two reasons a tolerance could exist, and only one of them is true here:
 *
 * - FLOAT DRIFT is real but tiny: 0.1+0.2 = 0.30000000000000004, so exact equality over summed float
 *   amounts is unimplementable. The error is ~ε·Σ|amounts| ≈ 1e-13 for realistic ledgers — TEN ORDERS OF
 *   MAGNITUDE below a cent. Float drift alone would justify ~1e-9, not 1e-2.
 * - So the cent is an ACCOUNTING choice, not a numerics one: it absorbs a genuine 1-cent imbalance, of the
 *   kind that arrives from tax or allocation rounding upstream.
 *
 * OPEN — and deliberately not decided here: at MINOR_UNIT the ledger admits an entry that really does not
 * balance, by one cent, per entry. Whether that is right is an accounting judgement (it hides upstream
 * rounding bugs; it also unblocks legitimate allocation remainders) and it changes what posts, so it is not
 * a thing to tighten while adding a test. The value is named so the question can be asked; it is unchanged
 * so no entry's fate changes in the diff that gave this atom its proof.
 *
 * @invariant BALANCE_TOLERANCE ≫ float drift — this bound is an accounting policy, never a numerics fix
 */
import { superpose, thoughtAddress, type Thought } from '@/think'

export const MINOR_UNIT = 0.01
export const BALANCE_TOLERANCE = MINOR_UNIT

export interface GLPostingLine {
  accountId: string | { id: string }
  debitAmount?: number
  creditAmount?: number
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
  totalDebits: number
  totalCredits: number
  difference: number
}

/**
 * Account type definitions with debit/credit polarity.
 * Debit-normal: balance increases with debits
 * Credit-normal: balance increases with credits
 */
export const ACCOUNT_POLARITY: Record<string, 'debit' | 'credit'> = {
  // Asset accounts (debit-normal)
  asset: 'debit',
  'current-asset': 'debit',
  'fixed-asset': 'debit',
  'accumulated-depreciation': 'credit', // Contra-asset

  // Liability accounts (credit-normal)
  liability: 'credit',
  'current-liability': 'credit',
  'long-term-liability': 'credit',

  // Equity accounts (credit-normal)
  equity: 'credit',
  'retained-earnings': 'credit',
  'common-stock': 'credit',

  // Revenue accounts (credit-normal)
  revenue: 'credit',
  'operating-revenue': 'credit',

  // Expense accounts (debit-normal)
  expense: 'debit',
  'operating-expense': 'debit',
  'administrative-expense': 'debit',
  'cogs': 'debit',

  // Other
  'other-income': 'credit',
  'other-expense': 'debit',
  'gain': 'credit',
  'loss': 'debit',
}

export class DoubleEntryValidator {
  /**
   * Validate posting lines for double-entry compliance.
   * Sums debits and credits; checks polarity; validates account types.
   */
  static validate(
    postings: GLPostingLine[],
    glAccountTypes?: Record<string, string>
  ): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []
    let totalDebits = 0
    let totalCredits = 0

    if (!postings || postings.length === 0) {
      errors.push('Journal entry must have at least one posting')
      return { valid: false, errors, warnings, totalDebits, totalCredits, difference: 0 }
    }

    if (postings.length < 2) {
      errors.push('Journal entry must have at least two postings (one debit, one credit)')
      return { valid: false, errors, warnings, totalDebits, totalCredits, difference: 0 }
    }

    // Sum debits and credits
    for (let i = 0; i < postings.length; i++) {
      const posting = postings[i]
      const debit = posting.debitAmount || 0
      const credit = posting.creditAmount || 0

      if (debit < 0) {
        errors.push(`Posting ${i + 1}: Debit amount cannot be negative (${debit})`)
      }
      if (credit < 0) {
        errors.push(`Posting ${i + 1}: Credit amount cannot be negative (${credit})`)
      }
      if (debit > 0 && credit > 0) {
        errors.push(`Posting ${i + 1}: Cannot have both debit and credit in same posting`)
      }

      totalDebits += debit
      totalCredits += credit
    }

    const difference = exactAbs(totalDebits - totalCredits)
    if (difference > BALANCE_TOLERANCE) {
      errors.push(
        `Debits ($${totalDebits.toFixed(2)}) do not equal credits ($${totalCredits.toFixed(2)}). Difference: $${difference.toFixed(2)}`
      )
    }

    // Validate account polarity if glAccountTypes provided
    if (glAccountTypes) {
      for (let i = 0; i < postings.length; i++) {
        const posting = postings[i]
        const accountId =
          typeof posting.accountId === 'string' ? posting.accountId : posting.accountId?.id
        const accountType = glAccountTypes[accountId]
        const debit = posting.debitAmount || 0
        const credit = posting.creditAmount || 0

        if (!accountType) {
          warnings.push(`Posting ${i + 1}: Account type not found for ${accountId}`)
          continue
        }

        const expectedPolarity = ACCOUNT_POLARITY[accountType]
        if (debit > 0 && expectedPolarity === 'credit') {
          warnings.push(
            `Posting ${i + 1}: ${accountType} account (${accountId}) is credit-normal; debiting may indicate error`
          )
        }
        if (credit > 0 && expectedPolarity === 'debit') {
          warnings.push(
            `Posting ${i + 1}: ${accountType} account (${accountId}) is debit-normal; crediting may indicate error`
          )
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      totalDebits,
      totalCredits,
      difference,
    }
  }

  /**
   * Quick balance check — the sides only, skipping polarity and per-line refusals.
   *
   * It once read `< 0.01` while validate() refuses on `> 0.01`: the same law stated twice, and already
   * disagreeing at exactly one cent, where this said unbalanced and validate() posted it. Nothing had ever
   * contradicted either. Both now read the one bound.
   */
  static validateBalance(postings: GLPostingLine[]): boolean {
    let totalDebits = 0
    let totalCredits = 0

    for (const posting of postings) {
      totalDebits += posting.debitAmount || 0
      totalCredits += posting.creditAmount || 0
    }

    return exactAbs(totalDebits - totalCredits) <= BALANCE_TOLERANCE
  }
}

/** The trial balance held quantum — every entry at once, coherent iff each one balances. */
export interface QuantumLedger {
  /** how many entries are held at once. */
  readonly states: number
  /** true iff EVERY entry balances — the trial balance reads as ONE. A single unbalanced entry decoheres it. */
  readonly coherent: boolean
  /** the indices of the entries that do NOT balance — the decoherence, named. */
  readonly decohered: readonly number[]
  /** the order-independent fold of every entry's address — the trial balance as a single uuid ([[think]]). */
  readonly root: string
  readonly totalDebits: number
  readonly totalCredits: number
}

/**
 * The theorem, applied quantum, in the ERP. The double-entry law — `|Σdebits − Σcredits| ≤ BALANCE_TOLERANCE`
 * per entry (`validateBalance`) — is the invariant an ERP exists to guarantee. `quantumLedger` holds ALL entries
 * at once and reads them as ONE: it is COHERENT iff every entry balances ([[think]].superpose — N states read as
 * one), and a single unbalanced entry DECOHERES the whole trial balance. The `root` is the order-independent
 * fold of the entries — the trial balance as one content-address, so the same books in any order carry the same
 * uuid.
 *
 * Nothing new is derived: it REUSES the present balance theorem (`validateBalance`) and the present quantum step
 * ([[think]].superpose). It only names what the ERP already is — the theorems applied quantum. Honest boundary:
 * coherence here is exactly "every entry balances"; "quantum" is the superposition overlay (held at once, one
 * root), the double-entry balance is the real invariant ([[rules]]/refutable · [[rodin]]).
 *
 * @invariant coherent ⇔ every entry balances — one unbalanced entry decoheres the trial balance
 * @invariant the root is order-independent — the same entries in any order fold to the same uuid
 */
export function quantumLedger(entries: readonly GLPostingLine[][]): QuantumLedger {
  const decohered: number[] = []
  let totalDebits = 0
  let totalCredits = 0
  const thoughts: Thought<boolean>[] = entries.map((lines, i) => {
    const balanced = DoubleEntryValidator.validateBalance(lines)
    if (!balanced) decohered.push(i)
    for (const l of lines) {
      totalDebits += l.debitAmount || 0
      totalCredits += l.creditAmount || 0
    }
    return { value: balanced, cached: false, address: thoughtAddress('entry:' + JSON.stringify(lines)) }
  })
  const s = superpose(thoughts)
  return { states: entries.length, coherent: decohered.length === 0, decohered, root: s.root, totalDebits, totalCredits }
}
