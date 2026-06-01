/**
 * Validate Double-Entry Bookkeeping
 *
 * Ensures journal entries maintain double-entry principle:
 * sum(debits) = sum(credits)
 *
 * Runs on beforeValidate hook for JournalEntries.
 * Throws error if validation fails.
 */

import { CollectionBeforeValidateHook } from 'payload'
import { DoubleEntryValidator } from '../../services/DoubleEntryValidator'

export const validateDoubleEntry: CollectionBeforeValidateHook = async ({ data, operation }) => {
  // Only validate on create and update operations
  if (operation !== 'create' && operation !== 'update') {
    return data
  }

  // Skip if no lines provided (JournalEntries.lines — see GLAccounts/journal schema)
  const lines = (data as {
    lines?: Array<{ glAccount?: string | { id: string }; debit?: number; credit?: number }>
  }).lines
  if (!Array.isArray(lines) || lines.length === 0) {
    return data
  }

  // Validate double-entry bookkeeping: Σ debit = Σ credit (IAS-1 §27 accrual; the harmony invariant)
  const validationResult = DoubleEntryValidator.validate(
    lines.map((line) => ({
      accountId: line.glAccount ?? '',
      debitAmount: line.debit ?? 0,
      creditAmount: line.credit ?? 0,
    })),
  )

  // errors / warnings are string[]
  if (validationResult.errors.length > 0) {
    throw new Error(`Double-entry validation failed: ${validationResult.errors.join('; ')}`)
  }
  if (validationResult.warnings.length > 0) {
    console.warn(`Double-entry warnings: ${validationResult.warnings.join('; ')}`)
  }

  return data
}
