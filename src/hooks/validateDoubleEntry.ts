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
import { DoubleEntryValidator } from '../services/DoubleEntryValidator'

export const validateDoubleEntry: CollectionBeforeValidateHook = async ({ data, operation }) => {
  // Only validate on create and update operations
  if (operation !== 'create' && operation !== 'update') {
    return data
  }

  // Skip if no postings provided
  if (!data.postings || !Array.isArray(data.postings) || data.postings.length === 0) {
    return data
  }

  // Validate double-entry bookkeeping
  const validationResult = DoubleEntryValidator.validate({
    postings: data.postings.map((posting) => ({
      glAccount: posting.glAccount,
      debitAmount: posting.debitAmount || 0,
      creditAmount: posting.creditAmount || 0,
    })),
  })

  // If there are errors, throw validation error
  if (validationResult.errors.length > 0) {
    throw new Error(
      `Double-entry validation failed: ${validationResult.errors.map((e) => e.message).join('; ')}`
    )
  }

  // If there are warnings, log them (but don't fail validation)
  if (validationResult.warnings.length > 0) {
    console.warn(
      `Double-entry warnings: ${validationResult.warnings.map((w) => w.message).join('; ')}`
    )
  }

  return data
}
