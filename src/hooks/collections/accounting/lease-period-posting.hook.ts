/**
 * Lease Period Posting Hook — fires on `LeasePeriodPostings.status →
 * 'posted'` and books the canonical IAS 16 / ASC 842 period entry.
 *
 * Three logical entries collapsed into one balanced JE:
 *
 *   Dr Interest Expense                  interest
 *     Cr Lease Liability                    interest      (§36 accretion)
 *
 *   Dr Lease Liability                   principalRepayment
 *     Cr Cash                               principalRepayment (cash payment)
 *
 *   Dr ROU Amortisation Expense          rouAmortisation
 *     Cr Accumulated ROU Amortisation       rouAmortisation (§31)
 *
 * Net JE shape (after combining the two liability legs):
 *   Dr Interest Expense                  interest
 *   Dr Lease Liability                   (principalRepayment − interest)?
 *   Dr ROU Amortisation Expense          rouAmortisation
 *     Cr Cash                               principalRepayment
 *     Cr Accumulated ROU Amortisation       rouAmortisation
 *     Cr Lease Liability                    interest?
 *
 * For simplicity + auditability we keep the three logical entries
 * separate (one Dr + one Cr per concern) — Σ debits = Σ credits still
 * balances, and the auditor sees the §36 accretion + §31 amortisation
 * + cash payment as three readable Dr/Cr pairs.
 *
 * @accounting IFRS IFRS-16 §29-§31 rou-asset-subsequent-measurement
 * @accounting IFRS IFRS-16 §36-§38 lease-liability-amortised-cost
 * @accounting US-GAAP ASC-842-20-35 lessee-subsequent-measurement
 * @standard ISO-8601-1:2019 date-time period-end posted-at
 * @audit ISO-19011:2018 audit-trail period-evidence
 * @compliance SOX §404 internal-controls
 * @see src/plugins/accounting/collections/LeasePeriodPostings.ts
 * @see src/services/journal-entry.service.ts
 * @see docs/adr/0001-event-driven-gl-posting.md
 */

import type { CollectionAfterChangeHook } from 'payload'
import {
  journalEntryService,
  type JournalEntryLine,
} from '@/services/journal-entry.service'

const ACC = {
  INTEREST_EXPENSE: 'lease_interest_expense',
  LEASE_LIABILITY: 'lease_liability',
  CASH: 'cash',
  ROU_AMORTISATION_EXPENSE: 'rou_amortisation_expense',
  ACCUMULATED_ROU_AMORTISATION: 'accumulated_rou_amortisation',
} as const

type PostingDoc = Record<string, unknown> & {
  id: string | number
  status?: string
  tenant?: string | { id?: string }
  postingId?: string
  lease?: string | { id?: string }
  periodEnd?: string | Date
  interest?: number
  principalRepayment?: number
  rouAmortisation?: number
  interestExpenseAccount?: string | { id?: string }
  leaseLiabilityAccount?: string | { id?: string }
  rouAmortisationAccount?: string | { id?: string }
  accumulatedRouAmortisationAccount?: string | { id?: string }
  cashAccount?: string | { id?: string }
  costCenter?: string | { id?: string }
  journalEntry?: string | { id?: string } | null
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
  doc: PostingDoc,
  previousDoc?: PostingDoc,
): boolean => {
  if (doc?.status !== 'posted') return false
  if (!previousDoc) return true
  return previousDoc.status !== 'posted'
}

export const leasePeriodPostingHook: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
  operation,
}) => {
  const posting = doc as PostingDoc
  if (!posting || (operation !== 'create' && operation !== 'update')) return doc
  if (
    !isStatusTransitionToPosted(
      posting,
      previousDoc as PostingDoc | undefined,
    )
  ) {
    return doc
  }

  // Idempotency: skip if JE already linked.
  if (idOf(posting.journalEntry)) return doc

  try {
    const tenant = idOf(posting.tenant)
    const userId = req.user?.id
    if (!tenant || !userId) {
      req.payload.logger.warn(
        `lease-period-posting ${posting.id}: missing tenant or user — cannot post`,
      )
      return doc
    }

    const interest = Number(posting.interest ?? 0)
    const principalRepayment = Number(posting.principalRepayment ?? 0)
    const rouAmortisation = Number(posting.rouAmortisation ?? 0)

    if (interest <= 0 && principalRepayment <= 0 && rouAmortisation <= 0) {
      req.payload.logger.warn(
        `lease-period-posting ${posting.id}: zero amounts — nothing to post`,
      )
      return doc
    }

    const description = `Lease period ${posting.postingId ?? posting.id}`
    const costCenterId = idOf(posting.costCenter)

    const interestAccount =
      idOf(posting.interestExpenseAccount) ?? ACC.INTEREST_EXPENSE
    const liabilityAccount =
      idOf(posting.leaseLiabilityAccount) ?? ACC.LEASE_LIABILITY
    const cashAccount = idOf(posting.cashAccount) ?? ACC.CASH
    const rouAmortAccount =
      idOf(posting.rouAmortisationAccount) ?? ACC.ROU_AMORTISATION_EXPENSE
    const accumulatedRouAccount =
      idOf(posting.accumulatedRouAmortisationAccount) ??
      ACC.ACCUMULATED_ROU_AMORTISATION

    const lines: JournalEntryLine[] = []

    // §36 — interest accretion: Dr Interest Expense / Cr Lease Liability
    if (interest > 0) {
      lines.push({
        accountId: interestAccount,
        debit: interest,
        description,
        costCenterId,
      })
      lines.push({
        accountId: liabilityAccount,
        credit: interest,
        description,
      })
    }

    // Cash payment: Dr Lease Liability / Cr Cash
    if (principalRepayment > 0) {
      lines.push({
        accountId: liabilityAccount,
        debit: principalRepayment,
        description,
      })
      lines.push({
        accountId: cashAccount,
        credit: principalRepayment,
        description,
      })
    }

    // §31 — ROU amortisation: Dr ROU Amort Exp / Cr Accumulated ROU Amort
    if (rouAmortisation > 0) {
      lines.push({
        accountId: rouAmortAccount,
        debit: rouAmortisation,
        description,
        costCenterId,
      })
      lines.push({
        accountId: accumulatedRouAccount,
        credit: rouAmortisation,
        description,
      })
    }

    const entry = await journalEntryService.createEntry(tenant, {
      entryDate: new Date(
        (posting.periodEnd as string | Date | undefined) ?? new Date(),
      ),
      description,
      lines,
      sourceType: 'lease_period',
      sourceId: String(posting.id),
      sourceEvent: 'lease:period:posted',
      userId: String(userId),
    })
    await journalEntryService.postEntry(tenant, entry.id, String(userId))

    await req.payload.update({
      collection: 'lease-period-postings',
      id: posting.id as string | number,
      data: { journalEntry: entry.id },
      overrideAccess: true,
    })

    req.payload.logger.info(
      `✓ lease-period ${posting.id} posted as JE ${entry.id} (interest ${interest} / principal ${principalRepayment} / amort ${rouAmortisation})`,
    )
  } catch (error) {
    req.payload.logger.error(
      { err: error },
      `✗ Error posting lease-period ${posting.id}:`,
    )
  }

  return doc
}
