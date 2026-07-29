import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
/**
 * validateFiscalPeriodPosting Hook
 *
 * beforeValidate hook for GLPostings collection.
 * When a GL posting is created or validated, resolve its fiscal period from FiscalCalendars,
 * validate it against period locks, and denormalize fiscal context into the posting.
 *
 * Workflow:
 * 1. Extract postingDate from data or parent journalEntry
 * 2. Look up FiscalCalendars for (tenantId, entityId, postingDate)
 * 3. If found: denormalize fiscalYear, fiscalPeriod, regulatoryCode, quarterNumber, etc.
 * 4. Validate against PeriodLocks: check if period is open/locked/archived
 * 5. If locked: check if posting is reversal/adjustment (allowed with approval)
 * 6. If archived: deny posting unless admin override
 * 7. Populate denormalized fields: fiscalYear, fiscalPeriod, periodLabel, regulatoryCode
 * 8. Compute chainLeafUuid with Law 60 (linked to period config chain)
 *
 * The first claim below was FALSE for as long as it existed, and nothing could contradict it
 * ([[rules]]/refutable). It read "Fiscal period deterministically resolved from FiscalCalendars" while the
 * calendar query sat COMMENTED OUT beside a "Placeholder resolution" that invented the answer:
 *
 *   data.fiscalYear   = new Date(postingDate).getUTCFullYear()   // the CALENDAR year
 *   data.fiscalPeriod = exactCeil((month + 1) / 3)               // hardcoded QUARTERLY
 *
 * — the calendar year for a tenant whose fiscal year may start in any month, and a calendar quarter for a
 * tenant whose periodType may be monthly, iso-week, retail-445 or custom. It then denormalised that guess
 * onto the posting, into the very fields the banner says exist so reports can skip the join. A wrong fiscal
 * period is not an approximation: it files an entry into the wrong statements.
 *
 * It never ran — the hook is exported, re-exported from the @/hooks barrel, and attached to NO collection
 * (the barrel's only importer is its own test). So it corrupted nothing; it was a TRAP, waiting for someone
 * to wire it. The calendar query it needed was already written, in the comment, and never uncommented.
 *
 * The SOX claim was empty the same way: the period-lock query sat commented out inside an EMPTY try, under
 * a catch re-throwing errors nothing could raise. A reviewer sees "Validate against PeriodLocks" and a
 * try/catch and reads enforcement — no period was ever locked against a posting. Both queries are now the
 * code they described; both collections already existed, with exactly the fields the comments named.
 *
 * @invariant Fiscal period is READ from fiscal-calendars — never derived here, never guessed
 * @invariant A posting whose period cannot be resolved THROWS — refuse, never invent
 * @invariant Denormalized fields are copies of the calendar row, so reports and calendar cannot disagree
 * @invariant An archived period accepts nothing; a locked period accepts only what the LOCK ROW permits
 * @invariant chainLeafUuid = the fold over (posting, calendar leaf) chained to the prior revision
 * @standard IAS-34:2023 (period context for interim reporting)
 * @standard Law 60 (chain leaf, immutable audit)
 * @standard GDPR:2016/679 (access control, audit trail)
 * @standard SOX:2002 (period-lock enforcement, access control)
 */

import { CollectionBeforeValidateHook } from 'payload'
import { getUserContext } from '@/auth'
import { chainLeaf } from '@/merge'

/** The close state of a period — the SOX §404 control: whoever closed it decides what may still post. */
interface PeriodLockDoc {
  lockStatus: 'open' | 'locked' | 'archived'
  allowReversals?: boolean
  allowPriorPeriodAdjustments?: boolean
}

/** The generated calendar row — the one authority on which fiscal period a date belongs to. */
interface CalendarEntryDoc {
  fiscalYear: number
  fiscalPeriod: number
  periodLabel: string
  regulatoryCode: string
  quarterNumber: number
  monthNumber: number
  chainLeafUuid: string
}

interface GLPostingLine {
  id?: string
  glAccount?: string | { id: string }
  debitAmount?: number
  creditAmount?: number
  [key: string]: unknown
}

interface JournalEntryRef {
  id: string
  entryDate?: string
  postings?: GLPostingLine[]
  [key: string]: unknown
}

interface GLPostingsData {
  id: string
  entity?: string | { id: string }
  postingDate?: string
  journalEntry?: string | JournalEntryRef
  debitAmount?: number
  creditAmount?: number
  glAccount?: string | { id: string; accountType?: string }
  status?: string
  isReversal?: boolean
  isPriorPeriodAdjustment?: boolean
  // Denormalized fields to populate
  fiscalYear?: number
  fiscalPeriod?: number
  periodLabel?: string
  regulatoryCode?: string
  quarterNumber?: number
  monthNumber?: number
  chainLeafUuid?: string
}

export const validateFiscalPeriodPosting: CollectionBeforeValidateHook<GLPostingsData> = async (args) => {
  const { data, req } = args
  if (!data) return data // strict: beforeValidate data is optional

  // Extract posting date
  const postingDate = data.postingDate

  if (!postingDate) {
    throw new Error('postingDate or journalEntry.entryDate required to resolve fiscal period')
  }

  // Extract entity ID
  const entityId =
    typeof data.entity === 'string'
      ? data.entity
      : data.entity?.id || getUserContext(req)?.tenant

  if (!entityId) {
    throw new Error('entity required to resolve fiscal period')
  }

  const _tenantId = getUserContext(req)?.tenant || 'default'

  // The fiscal period is READ from the generated calendar — it is never derived here. FiscalCalendars is
  // the one place a tenant's fiscal shape exists (its year start, its periodType: monthly · quarterly ·
  // iso-week · retail-445 · custom); recomputing it at the posting hook would be a second implementation of
  // [[fiscal]]/period/resolver, free to disagree with the calendar every report reads.
  const found = await req.payload.find({
    collection: 'fiscal-calendars',
    depth: 0,
    limit: 1,
    where: { and: [{ entity: { equals: entityId } }, { calendarDate: { equals: postingDate } }] },
  })

  const entry = found.docs[0] as CalendarEntryDoc | undefined
  // REFUSE, never invent. A posting whose period cannot be determined is not a posting with an approximate
  // period — it is an entry that does not know which financial statements it belongs to. Failing here is
  // loud and fixable (generate the calendar); guessing is silent and lands in the statements.
  if (!entry) {
    throw new Error(
      `fiscal period unresolved: no fiscal-calendars entry for entity ${entityId} on ${postingDate}. ` +
        `Generate the fiscal calendar for this period before posting.`,
    )
  }

  data.fiscalYear = entry.fiscalYear
  data.fiscalPeriod = entry.fiscalPeriod
  data.periodLabel = entry.periodLabel
  data.regulatoryCode = entry.regulatoryCode
  data.quarterNumber = entry.quarterNumber
  data.monthNumber = entry.monthNumber
  data.chainLeafUuid = entry.chainLeafUuid

  // The period lock — you cannot post to a closed period. It is the control SOX §404 exists for, and the
  // banner has claimed it all along while the query sat commented out inside an EMPTY try, under a catch
  // re-throwing errors nothing could raise. A reviewer reading "Validate against PeriodLocks" plus a
  // try/catch sees enforcement; there was none. No period was ever locked against a posting.
  const locks = await req.payload.find({
    collection: 'period-locks',
    depth: 0,
    limit: 1,
    where: {
      and: [
        { entity: { equals: entityId } },
        { fiscalYear: { equals: data.fiscalYear } },
        { fiscalPeriod: { equals: data.fiscalPeriod } },
      ],
    },
  })

  const lock = locks.docs[0] as PeriodLockDoc | undefined
  // No lock row means the period was never closed — open by default, which is the collection's own
  // defaultValue. Absence is not permission to guess at anything else.
  if (lock?.lockStatus === 'archived') {
    throw new Error(`period ${data.periodLabel} is archived and cannot accept new postings`)
  }
  if (lock?.lockStatus === 'locked') {
    // A locked period still admits the entries a close is FOR — a reversal, or a prior-period adjustment —
    // but only where the lock itself grants it. The flags live on the lock row, so the decision belongs to
    // whoever closed the period, never to the posting.
    const allowed =
      (data.isReversal === true && lock.allowReversals === true) ||
      (data.isPriorPeriodAdjustment === true && lock.allowPriorPeriodAdjustments === true)
    if (!allowed) {
      throw new Error(
        `period ${data.periodLabel} is locked — only reversals or prior-period adjustments the lock permits may post`,
      )
    }
  }

  // The posting's own leaf — the fold ([[merge]]/chainLeaf), anchored to the calendar row's leaf so the
  // chain is "linked to the period config chain" as the banner says, and chained to this posting's prior
  // revision. This was the NINTH hand-rolled copy of the base64 stub, and it hid from the grep that found
  // the other eight by splitting `.toString('base64')` and `.substring(0, 32)` across two statements. Same
  // defect: a reversible encoding truncated to the input's first 24 bytes, so postingDate's month was the
  // last thing it covered — fiscalYear, fiscalPeriod and regulatoryCode all sat past the window, and the
  // prior leaf was ignored entirely. It also overwrote the calendar leaf copied above.
  data.chainLeafUuid = chainLeaf(
    {
      postingDate,
      entityId,
      fiscalYear: data.fiscalYear,
      fiscalPeriod: data.fiscalPeriod,
      regulatoryCode: data.regulatoryCode,
      calendarLeaf: entry.chainLeafUuid,
    },
    args.originalDoc?.chainLeafUuid || '',
  )

  // beforeValidate is a TRANSFORM: Payload takes the RETURNED data. This returned nothing, so every field
  // resolved above was discarded. It never bit, because the hook is attached to no collection.
  return data
}
