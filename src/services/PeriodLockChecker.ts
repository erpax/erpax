/**
 * PeriodLockChecker
 *
 * Determines if a posting date falls within a locked period.
 * Manages period closing and prevents posting to closed periods
 * unless explicitly overridden by admin.
 *
 * @invariant Closed periods cannot accept new postings (except reversals, prior-period-adjustments)
 */

export interface PeriodLock {
  id: string
  periodStartDate: string // ISO date
  periodEndDate: string // ISO date
  fiscalYear: number
  fiscalPeriod: number // 1-12 for months, or quarter
  lockStatus: 'open' | 'locked' | 'archived'
  closedBy?: string // User ID who closed
  closedDate?: string // ISO date/time
  closeReason?: string
}

export interface PeriodCheckResult {
  isLocked: boolean
  periodLock?: PeriodLock
  allowNewPostings: boolean
  allowReversals: boolean
  allowPriorPeriodAdjustments: boolean
  requiresAdminOverride: boolean
  message: string
}

export class PeriodLockChecker {
  /**
   * Check if a posting date is in a locked period.
   * Returns detailed information about posting eligibility.
   *
   * @param postingDate ISO date string (e.g., "2026-05-12")
   * @param periodLocks Array of all period locks
   * @param isReversal Whether this is a reversal entry
   * @param isPriorPeriodAdjustment Whether this is a prior-period adjustment
   * @returns PeriodCheckResult with lock status and permissions
   */
  static checkPeriod(
    postingDate: string,
    periodLocks: PeriodLock[],
    isReversal = false,
    isPriorPeriodAdjustment = false
  ): PeriodCheckResult {
    const postingDateObj = new Date(postingDate)

    // Find period containing posting date
    let matchingPeriod: PeriodLock | null = null
    for (const period of periodLocks) {
      const startDate = new Date(period.periodStartDate)
      const endDate = new Date(period.periodEndDate)

      if (postingDateObj >= startDate && postingDateObj <= endDate) {
        matchingPeriod = period
        break
      }
    }

    if (!matchingPeriod) {
      return {
        isLocked: false,
        allowNewPostings: true,
        allowReversals: true,
        allowPriorPeriodAdjustments: true,
        requiresAdminOverride: false,
        message: 'Period not found in lock list (likely future period)',
      }
    }

    // Period is open
    if (matchingPeriod.lockStatus === 'open') {
      return {
        isLocked: false,
        periodLock: matchingPeriod,
        allowNewPostings: true,
        allowReversals: true,
        allowPriorPeriodAdjustments: true,
        requiresAdminOverride: false,
        message: `Period ${matchingPeriod.fiscalYear}-${matchingPeriod.fiscalPeriod} is open`,
      }
    }

    // Period is locked or archived
    return {
      isLocked: true,
      periodLock: matchingPeriod,
      allowNewPostings: false,
      allowReversals: isReversal, // Reversals allowed in locked periods
      allowPriorPeriodAdjustments: isPriorPeriodAdjustment, // Prior-period adjustments allowed
      requiresAdminOverride: !isReversal && !isPriorPeriodAdjustment, // Admin override needed for normal postings
      message:
        matchingPeriod.lockStatus === 'locked'
          ? `Period ${matchingPeriod.fiscalYear}-${matchingPeriod.fiscalPeriod} is locked. Reversals and prior-period adjustments allowed with approval.`
          : `Period ${matchingPeriod.fiscalYear}-${matchingPeriod.fiscalPeriod} is archived (read-only).`,
    }
  }

  /**
   * Validate posting eligibility.
   * Throws error if posting not allowed, returns true if allowed.
   *
   * @throws Error if posting not allowed and not admin override
   */
  static validatePostingEligibility(
    postingDate: string,
    periodLocks: PeriodLock[],
    userRole: string,
    isReversal = false,
    isPriorPeriodAdjustment = false
  ): boolean {
    const result = this.checkPeriod(postingDate, periodLocks, isReversal, isPriorPeriodAdjustment)

    if (!result.isLocked) {
      return true
    }

    // Locked period: check permissions
    if (isReversal && result.allowReversals) {
      return true
    }

    if (isPriorPeriodAdjustment && result.allowPriorPeriodAdjustments) {
      return true
    }

    // Admin can override locked periods
    if (userRole === 'super-admin' || userRole === 'admin') {
      return true
    }

    throw new Error(
      `Cannot post to locked period ${result.periodLock?.fiscalYear}-${result.periodLock?.fiscalPeriod}. ${result.message}`
    )
  }

  /**
   * Determine fiscal period from date
   */
  static getFiscalPeriod(date: string, fiscalYearStartMonth = 1): { year: number; period: number } {
    const dateObj = new Date(date)
    const month = dateObj.getMonth() + 1 // getMonth is 0-indexed

    let fiscalYear = dateObj.getFullYear()
    let fiscalPeriod = month - (fiscalYearStartMonth - 1)

    if (fiscalPeriod <= 0) {
      fiscalYear--
      fiscalPeriod += 12
    }

    return { year: fiscalYear, period: fiscalPeriod }
  }

  /**
   * Get period boundaries from fiscal year and period
   */
  static getPeriodBoundaries(
    fiscalYear: number,
    fiscalPeriod: number,
    fiscalYearStartMonth = 1
  ): { startDate: Date; endDate: Date } {
    // Calculate calendar month from fiscal period
    let month = fiscalYearStartMonth + (fiscalPeriod - 1)
    let year = fiscalYear

    if (month > 12) {
      month -= 12
      year++
    }

    const startDate = new Date(year, month - 1, 1) // Month is 0-indexed
    const endDate = new Date(year, month, 0) // Last day of month

    return { startDate, endDate }
  }
}
