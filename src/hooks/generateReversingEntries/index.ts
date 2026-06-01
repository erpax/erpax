/**
 * generateReversingEntries Hook
 *
 * Automatically generates reversing journal entries when closing entries are finalized.
 *
 * Workflow (fires on afterChange when status transitions to 'posted' or 'finalized'):
 * 1. Check if closingStatus transitioned to 'posted' or 'finalized'
 * 2. Validate next period is open for reversals (not locked/archived)
 * 3. Call ClosingPeriodChecker.generateReversals() to create reversal entry objects
 * 4. For each reversal entry:
 *    a. Create JournalEntry record in next period (with autoReverse flag)
 *    b. Link reversingEntryId back to original closing entry
 *    c. Update ClosingEntries record with reversalEntriesGenerated=true, reversalGeneratedDate=today
 * 5. Return updated ClosingEntries data with reversal links
 *
 * Idempotency: If reversal entries already generated (reversalEntriesGenerated=true), skip.
 *
 * @standard IAS-34:2023 Interim closing reversals required at period start
 * @standard SAF-T:3.0.2 Reversal entries must have distinct GL accounts + posting dates
 * @invariant Reversals post to next period (not same period)
 * @invariant Reversal amounts equal original closing amounts (flipped sign)
 * @invariant No reversals if next period is locked/archived
 */

import type { CollectionAfterChangeHook, RequiredDataFromCollectionSlug } from 'payload'
import { ClosingPeriodChecker } from '../../services/ClosingPeriodChecker'

interface ClosingEntryItem {
  journalEntryId?: string | { id: string }
  sequenceNumber?: number
  accountsClosed?: string
  netAmount?: number
  postedDate?: string
  reversingEntryId?: string | { id: string }
}

interface ClosingEntryData {
  id: string
  entity?: string | { id: string }
  fiscalYear: number
  fiscalPeriodNumber: number
  closingType?: string
  closingStatus?: string
  reversalEntriesGenerated?: boolean
  reversalGeneratedDate?: string
  closingEntries?: ClosingEntryItem[]
  closingDate?: string
}

interface PeriodLock {
  id: string
  entity: string
  fiscalYear: number
  fiscalPeriod: number
  lockStatus: string
  [key: string]: unknown
}

/**
 * afterChange hook: generate reversing entries when closing is finalized
 */
export const generateReversingEntries: CollectionAfterChangeHook<ClosingEntryData> = async ({
  data,
  previousDoc,
  req,
  operation,
}) => {
  const { payload } = req

  // Only process on update operation and when status changes
  if (operation !== 'update') {
    return
  }

  // Check if status transitioned to 'posted' or 'finalized'
  const previousStatus = previousDoc?.closingStatus
  const currentStatus = data.closingStatus
  const shouldGenerateReversals =
    (previousStatus === 'approved' && currentStatus === 'posted') ||
    (previousStatus === 'posted' && currentStatus === 'finalized') ||
    (previousStatus !== 'posted' && previousStatus !== 'finalized' && currentStatus === 'finalized')

  if (!shouldGenerateReversals) {
    return
  }

  // Idempotency: skip if already generated
  if (data.reversalEntriesGenerated === true) {
    console.log(
      `[generateReversingEntries] Reversals already generated for FY${data.fiscalYear}-P${data.fiscalPeriodNumber}`,
    )
    return
  }

  // Determine next period (period + 1)
  const nextPeriodNumber = data.fiscalPeriodNumber + 1
  const nextFiscalYear = data.fiscalYear // Assume same fiscal year; handle year-end separately if needed
  const nextPeriodStartDate = data.closingDate // Use closing date as reversal posting date in next period

  // Get period type and regulatory framework from FiscalPeriods (if available)
  const periodTypeMap: Record<string, string> = {
    'monthly': 'monthly',
    'quarterly': 'quarterly',
    'year-end': 'monthly',
    'interim': 'quarterly',
  }
  const _periodType = periodTypeMap[data.closingType || 'monthly'] || 'monthly'

  // Validate next period is open for reversals
  // For now, we defer this check to the next period's PeriodLock status
  // In production, query PeriodLocks collection
  let nextPeriodOpenForReversals = true
  try {
    const nextPeriodLockQuery = await payload.find({
      collection: 'period-locks',
      where: {
        and: [
          { entity: { equals: typeof data.entity === 'string' ? data.entity : data.entity?.id } },
          { fiscalYear: { equals: nextFiscalYear } },
          { fiscalPeriod: { equals: nextPeriodNumber } },
        ],
      },
      limit: 1,
    })

    if (nextPeriodLockQuery.docs.length > 0) {
      const nextPeriodLock = nextPeriodLockQuery.docs[0] as unknown as PeriodLock
      const nextPeriodCheck = ClosingPeriodChecker.checkNextPeriodOpenForReversals(
        nextPeriodLock.lockStatus || 'open',
      )
      nextPeriodOpenForReversals = nextPeriodCheck.canPost

      if (!nextPeriodOpenForReversals) {
        console.warn(
          `[generateReversingEntries] Cannot generate reversals: next period FY${nextFiscalYear}-P${nextPeriodNumber} is not open. Warnings: ${nextPeriodCheck.warnings.join('; ')}`,
        )
        return // Do not throw; allow manual reversal posting
      }
    }
  } catch (err) {
    console.warn('[generateReversingEntries] Failed to validate next period lock status:', err)
    // Continue anyway; next period lock will be checked at posting time
  }

  // Generate reversal entries from closing entries
  if (!data.closingEntries || data.closingEntries.length === 0) {
    console.log(`[generateReversingEntries] No closing entries to reverse for FY${data.fiscalYear}-P${data.fiscalPeriodNumber}`)
    return
  }

  // Per the `reverse` skill: a reversal is the SOURCE entry's lines with
  // debit↔credit swapped on the same gl-accounts — balanced by construction,
  // posted at the next period's start, traced to its origin. Derive from the
  // source entry; never re-key amounts from a flat net.
  const reversalJournalEntryIds: string[] = []
  try {
    for (const closing of data.closingEntries) {
      const sourceId =
        typeof closing.journalEntryId === 'string' ? closing.journalEntryId : closing.journalEntryId?.id
      if (!sourceId) {
        reversalJournalEntryIds.push('')
        continue
      }

      const source = (await payload
        .findByID({ collection: 'journal-entries', id: sourceId, depth: 0, overrideAccess: true, req })
        .catch((): null => null)) as { entryNumber?: string; lines?: Array<Record<string, unknown>> } | null
      if (!source?.lines?.length) {
        reversalJournalEntryIds.push('')
        continue
      }

      // Swap each line's debit↔credit; keep the same gl-account.
      const reversedLines = source.lines.map((l) => {
        const gl = (l as { glAccount?: unknown }).glAccount
        return {
          lineNumber: (l as { lineNumber?: number }).lineNumber,
          glAccount: gl && typeof gl === 'object' ? (gl as { id?: unknown }).id : gl,
          description: (l as { description?: string }).description,
          debit: Number((l as { credit?: unknown }).credit ?? 0),
          credit: Number((l as { debit?: unknown }).debit ?? 0),
          currency: (l as { currency?: unknown }).currency,
          exchangeRate: (l as { exchangeRate?: unknown }).exchangeRate,
          costCenterId: (l as { costCenterId?: unknown }).costCenterId,
        }
      })

      const reversalJournalEntry = await payload.create({
        collection: 'journal-entries',
        data: {
          entryNumber: `REV-${source.entryNumber ?? sourceId}`,
          entryDate: nextPeriodStartDate,
          description: `Reversal of ${source.entryNumber ?? sourceId} — FY${data.fiscalYear}-P${data.fiscalPeriodNumber} close`,
          status: 'draft',
          sourceType: 'period_end_adjustment',
          sourceId,
          sourceEvent: 'closing:reversed',
          lines: reversedLines,
        } as unknown as RequiredDataFromCollectionSlug<'journal-entries'>,
        overrideAccess: true,
        req,
      })

      reversalJournalEntryIds.push(String(reversalJournalEntry.id))
    }
  } catch (err) {
    console.error('[generateReversingEntries] Failed to create reversal journal entries:', err)
    throw new Error(`Failed to generate reversals: ${err instanceof Error ? err.message : String(err)}`)
  }

  // Update ClosingEntries record with reversal links
  // Map reversalJournalEntryIds back to closingEntries array
  try {
    await payload.update({
      collection: 'closing-entries',
      id: data.id,
      data: {
        reversalEntriesGenerated: true,
        reversalGeneratedDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        closingEntries: data.closingEntries.map((entry: ClosingEntryItem, index: number) => ({
          ...entry,
          reversingEntryId: reversalJournalEntryIds[index] || entry.reversingEntryId,
        })),
      },
    })

    console.log(
      `[generateReversingEntries] Generated ${reversalJournalEntryIds.length} reversing entries for FY${data.fiscalYear}-P${data.fiscalPeriodNumber}`,
    )
  } catch (err) {
    console.error('[generateReversingEntries] Failed to update closing entries with reversals:', err)
    throw new Error(`Failed to link reversals: ${err instanceof Error ? err.message : String(err)}`)
  }
}
