/**
 * Enforce GL Posting Immutability
 *
 * Prevents modification of posted GL postings except by superadmin/admin with documentation.
 * Once postedDate is set, posting becomes read-only unless admin override is provided.
 *
 * Runs on beforeChange hook for GLPostings.
 * Throws error if modification not allowed.
 */

import { CollectionBeforeChangeHook } from 'payload'
import { getUser } from '@/access/auth'

export const enforcePostingImmutability: CollectionBeforeChangeHook = async ({
  req,
  data,
  operation,
  originalDoc,
}) => {
  // Only validate on update operations
  if (operation !== 'update' || !originalDoc) {
    return data
  }

  // Check if this is a posted posting
  const isPosted = originalDoc.postedDate != null

  // If not posted, allow modification
  if (!isPosted) {
    return data
  }

  // Check if user is super-admin or admin
  const isSuperAdminOrAdmin =
    getUser(req)?.roles?.some((role) => role === 'super-admin' || role === 'admin') ?? false

  // If not admin, throw immutability error
  if (!isSuperAdminOrAdmin) {
    throw new Error(
      'Cannot modify posted GL posting. Contact admin if modification is required.'
    )
  }

  // If admin is modifying, require override documentation
  if (isSuperAdminOrAdmin && data.adminOverride !== true) {
    throw new Error(
      'Admin modifications to posted postings require adminOverride checkbox to be enabled and reason to be provided.'
    )
  }

  // If admin override is enabled, validate reason
  if (data.adminOverride === true && (!data.adminOverrideHistory || data.adminOverrideHistory.length === 0)) {
    throw new Error('Admin override reason is required in adminOverrideHistory array.')
  }

  // Create audit trail entry for admin override
  if (data.adminOverride === true && req.user) {
    const overrideEntry = {
      overriddenBy: req.user.id,
      overrideDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      overrideReason: data.adminOverrideHistory?.[0]?.overrideReason || 'No reason provided',
      priorValue: JSON.stringify({
        debitAmount: originalDoc.debitAmount,
        creditAmount: originalDoc.creditAmount,
        amount: originalDoc.amount,
        description: originalDoc.description,
        costCenter: originalDoc.costCenter,
        project: originalDoc.project,
      }),
      newValue: JSON.stringify({
        debitAmount: data.debitAmount,
        creditAmount: data.creditAmount,
        amount: data.amount,
        description: data.description,
        costCenter: data.costCenter,
        project: data.project,
      }),
    }

    // Append to override history
    if (!data.adminOverrideHistory) {
      data.adminOverrideHistory = []
    }
    if (data.adminOverrideHistory.length === 0) {
      data.adminOverrideHistory.push(overrideEntry)
    }
  }

  return data
}
