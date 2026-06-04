/**
 * Period-End Adjustment Posting Hook — fires GL on status → 'posted'.
 *
 * Closes the period-end-adjustment.service.ts DOA (substantive
 * implementation but zero importers — see audit memory). New flow:
 *
 *   1. User (or close job) creates a `period-end-adjustments` row in
 *      `status: 'draft'` or `'calculated'`. SOX §404 four-eyes via
 *      `enforceSegregationOfDuties` requires a different user to flip
 *      the status to `'approved'`.
 *   2. When status flips to `'posted'`, this hook calls
 *      `journalEntryService.createEntry(...)` with the canonical
 *      Dr/Cr line pair derived from `debitAccount` / `creditAccount` /
 *      `adjustmentAmount`, then `postEntry(...)` to immutabilise.
 *   3. The journal-entry id is back-linked into the adjustment doc
 *      so the auditor can click through.
 *
 * Adjustment kinds covered (the `adjustmentType` enum on the collection):
 *   • depreciation        — IAS 16 / ASC 360
 *   • interest_accrual    — IAS 23 / ASC 835
 *   • salary_accrual      — IAS 19 / ASC 710
 *   • inventory_variance  — IAS 2 / ASC 330
 *   • allowance_doubtful  — IFRS 9 / ASC 326
 *   • accrued_expenses    — IAS 37 / ASC 405
 *   • deferred_income     — IAS 1 / ASC 606
 *   • other               — open-ended (caller documents in `description`)
 *
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
 * @accounting US-GAAP ASC-250 accounting-changes-and-error-corrections
 * @standard ISO-8601-1:2019 date-time posted-date
 * @audit ISO-19011:2018 audit-trail period-end-adjustment-evidence
 * @compliance SOX §404 internal-controls four-eyes
 * @see src/services/period-end-adjustment.service.ts
 * @see src/services/journal-entry.service.ts
 * @see docs/adr/0001-event-driven-gl-posting.md
 */

import type { CollectionAfterChangeHook } from 'payload'
import { journalEntryService, type JournalEntryLine } from '@/journal/entry.service'

type AdjustmentDoc = Record<string, unknown> & {
  id: string | number
  status?: string
  tenant?: string | { id?: string }
  adjustmentId?: string
  adjustmentType?: string
  description?: string
  adjustmentAmount?: number
  debitAccount?: string | { id?: string }
  creditAccount?: string | { id?: string }
  journalEntry?: string | { id?: string } | null
  period?: string | Date
}

const idOf = (v: unknown): string | undefined => {
  if (typeof v === 'string' || typeof v === 'number') return String(v)
  if (typeof v === 'object' && v !== null && 'id' in v) {
    const id = (v as { id?: unknown }).id
    if (id !== undefined) return String(id)
  }
  return undefined
}

const isStatusTransitionToPosted = (
  doc: AdjustmentDoc,
  previousDoc?: AdjustmentDoc,
): boolean => {
  if (doc?.status !== 'posted') return false
  if (!previousDoc) return true
  return previousDoc.status !== 'posted'
}

export const periodEndAdjustmentPostingHook: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
  operation,
}) => {
  const adj = doc as AdjustmentDoc
  if (!adj || (operation !== 'create' && operation !== 'update')) return doc
  if (!isStatusTransitionToPosted(adj, previousDoc as AdjustmentDoc | undefined)) {
    return doc
  }

  // Idempotency: if a JE id is already linked, skip.
  if (idOf(adj.journalEntry)) return doc

  try {
    const tenant = idOf(adj.tenant)
    const userId = req.user?.id
    if (!tenant || !userId) {
      req.payload.logger.warn(
        `period-end-adjustment ${adj.id}: missing tenant or user — cannot post`,
      )
      return doc
    }

    const debitAccount = idOf(adj.debitAccount)
    const creditAccount = idOf(adj.creditAccount)
    const amount = Number(adj.adjustmentAmount ?? 0)

    if (!debitAccount || !creditAccount || amount <= 0) {
      req.payload.logger.warn(
        `period-end-adjustment ${adj.id}: missing accounts or non-positive amount — cannot post`,
      )
      return doc
    }

    const description = `Period-end ${adj.adjustmentType ?? 'adjustment'} ${
      adj.adjustmentId ?? adj.id
    }: ${adj.description ?? ''}`.trim()

    const lines: JournalEntryLine[] = [
      { accountId: debitAccount, debit: amount, description },
      { accountId: creditAccount, credit: amount, description },
    ]

    const entry = await journalEntryService.createEntry(tenant, {
      entryDate: new Date((adj.period as string | Date | undefined) ?? new Date()),
      description,
      lines,
      sourceType: 'period_end_adjustment',
      sourceId: String(adj.id),
      sourceEvent: `period:adjustment:${adj.adjustmentType ?? 'other'}:posted`,
      userId: String(userId),
    })
    await journalEntryService.postEntry(tenant, entry.id, String(userId))

    // Back-link the JE id onto the adjustment doc so the auditor can
    // click through. Use overrideAccess so the hook itself can write
    // (the caller's permissions already passed the access check on the
    // outer write).
    await req.payload.update({
      collection: 'period-end-adjustments',
      id: adj.id as string | number,
      data: { journalEntry: entry.id },
      overrideAccess: true,
    })

    req.payload.logger.info(
      `✓ period-end-adjustment ${adj.id} posted as JE ${entry.id}`,
    )
  } catch (error) {
    req.payload.logger.error(
      { err: error },
      `✗ Error posting period-end-adjustment ${adj.id}:`,
    )
  }

  return doc
}
