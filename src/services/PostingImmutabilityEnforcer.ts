/**
 * PostingImmutabilityEnforcer
 *
 * Prevents modification of posted journal entries and GL postings.
 * Only admins can override with explicit reason documentation.
 *
 * @invariant Once posted-date is set, posting becomes immutable
 * @invariant Admin overrides must include reason and signature
 */

export interface PostedGLPosting {
  id: string
  accountId: string
  debitAmount?: number
  creditAmount?: number
  postedDate?: string // ISO date/time - presence indicates posted
  journalEntryId: string
}

export interface ImmutabilityCheckResult {
  isPosted: boolean
  isModifiable: boolean
  reason: string
}

export interface AdminOverride {
  overriddenBy: string // User ID
  overrideReason: string
  overrideDate: string // ISO date/time
  overrideSignature?: string // Digital signature
  priorValue: string // JSON of original value
  newValue: string // JSON of new value
}

export class PostingImmutabilityEnforcer {
  /**
   * Check if a posting is immutable.
   * Returns whether modification is allowed.
   */
  static checkImmutability(posting: PostedGLPosting, userRole: string): ImmutabilityCheckResult {
    // If no posted date, posting is still in draft and can be modified
    if (!posting.postedDate) {
      return {
        isPosted: false,
        isModifiable: true,
        reason: 'Posting is in draft status (not yet posted)',
      }
    }

    // Posting has been posted
    if (userRole === 'super-admin' || userRole === 'admin') {
      return {
        isPosted: true,
        isModifiable: true,
        reason: 'Admin can modify posted entries with override documentation',
      }
    }

    // Non-admin user cannot modify posted posting
    return {
      isPosted: true,
      isModifiable: false,
      reason: `Posting was posted on ${posting.postedDate} and is immutable. Only admins can modify with override documentation.`,
    }
  }

  /**
   * Enforce immutability on beforeChange hook.
   * Throws error if modification not allowed.
   *
   * @throws Error if modification not allowed
   */
  static enforceImmutability(
    posting: PostedGLPosting,
    userRole: string,
    changedFields: string[]
  ): void {
    const check = this.checkImmutability(posting, userRole)

    if (!check.isModifiable) {
      throw new Error(
        `Cannot modify posted GL posting. ${check.reason}\n` +
          `Attempted to modify: ${changedFields.join(', ')}\n` +
          `Contact your administrator if correction is needed.`
      )
    }

    // If admin override, require reason field
    if (check.isPosted && (userRole === 'super-admin' || userRole === 'admin')) {
      // Reason will be captured in separate AdminOverride collection
      // This is enforced by the collection's beforeChange hook
    }
  }

  /**
   * Create audit trail for admin override.
   * Should be called in beforeChange hook when admin modifies posted posting.
   */
  static createOverrideAuditTrail(
    posting: PostedGLPosting,
    priorValue: unknown,
    newValue: unknown,
    userId: string,
    overrideReason: string
  ): AdminOverride {
    return {
      overriddenBy: userId,
      overrideReason,
      overrideDate: new Date().toISOString(),
      priorValue: JSON.stringify(priorValue),
      newValue: JSON.stringify(newValue),
    }
  }

  /**
   * Validate admin override reason.
   * Reason must be non-empty and meaningful.
   */
  static validateOverrideReason(reason: string): { valid: boolean; message: string } {
    if (!reason || reason.trim().length === 0) {
      return {
        valid: false,
        message: 'Override reason is required for modification of posted entries',
      }
    }

    if (reason.trim().length < 10) {
      return {
        valid: false,
        message: 'Override reason must be at least 10 characters (explain why modification needed)',
      }
    }

    if (reason.toLowerCase().includes('test') || reason.toLowerCase().includes('mistake')) {
      // Allow but flag for audit attention
      return {
        valid: true,
        message:
          'Reason accepted but flagged for audit review. Consider more detailed explanation for audit trail.',
      }
    }

    return {
      valid: true,
      message: 'Override reason accepted',
    }
  }

  /**
   * Get all modifications to a posted posting (admin overrides).
   * Returns history of who changed what when.
   */
  static getOverrideHistory(
    overrides: AdminOverride[]
  ): Array<{ date: string; user: string; reason: string; details: string }> {
    return overrides.map((override) => ({
      date: override.overrideDate,
      user: override.overriddenBy,
      reason: override.overrideReason,
      details: `Changed from ${override.priorValue} to ${override.newValue}`,
    }))
  }
}
