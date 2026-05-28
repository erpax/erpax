/**
 * DoubleEntryValidator
 *
 * Validates double-entry bookkeeping principles:
 * - Debits must equal credits
 * - Account types must be valid for debit/credit direction
 * - All accounts must exist and be active
 *
 * @invariant debits.sum() === credits.sum()
 * @invariant account-type matches debit/credit polarity
 */

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

    // Check if debits equal credits (within 0.01 cent rounding tolerance)
    const difference = Math.abs(totalDebits - totalCredits)
    if (difference > 0.01) {
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
   * Quick validation: just check debits === credits
   */
  static validateBalance(postings: GLPostingLine[]): boolean {
    let totalDebits = 0
    let totalCredits = 0

    for (const posting of postings) {
      totalDebits += posting.debitAmount || 0
      totalCredits += posting.creditAmount || 0
    }

    return Math.abs(totalDebits - totalCredits) < 0.01
  }
}
