import { describe, it, expect } from 'vitest'
import { chainLeaf } from '@/merge'
import { validateFiscalPeriodPosting } from './index'

/**
 * A tenant whose fiscal year starts in APRIL and whose periodType is MONTHLY — the two things the old
 * placeholder could not represent, because it read the calendar year and hardcoded quarters.
 */
const CALENDAR_ROW = {
  fiscalYear: 2025, // May 2026 falls in FY2025 for an April year-start
  fiscalPeriod: 2, // monthly: P2
  periodLabel: 'P2-FY2025',
  regulatoryCode: 'P02_2025',
  quarterNumber: 1,
  monthNumber: 5,
  chainLeafUuid: 'e2b1c0d4-0000-8000-8000-000000000001',
}

type Doc = Record<string, unknown>
const req = (calendars: Doc[], locks: Doc[] = []) => ({
  payload: {
    find: async ({ collection }: { collection: string }) => ({
      docs: collection === 'fiscal-calendars' ? calendars : locks,
    }),
  },
  user: { tenant: 'acme' },
})

const run = (data: Doc, calendars: Doc[] = [CALENDAR_ROW], locks: Doc[] = [], originalDoc?: Doc) =>
  (validateFiscalPeriodPosting as never as (a: unknown) => Promise<Doc>)({
    data,
    req: req(calendars, locks),
    originalDoc,
    operation: 'create',
  })

const posting = (over: Doc = {}) => ({ entity: 'acme', postingDate: '2026-05-12', ...over })

describe('validate/fiscal/period/posting — the period is READ, never invented', () => {
  it('copies the calendar row onto the posting, and RETURNS it', async () => {
    const data = await run(posting())
    expect(data.fiscalYear).toBe(2025)
    expect(data.fiscalPeriod).toBe(2)
    expect(data.periodLabel).toBe('P2-FY2025')
    expect(data.regulatoryCode).toBe('P02_2025')
  })

  // THE REFUTATION. The banner claimed "Fiscal period deterministically resolved from FiscalCalendars"
  // while the query sat commented out beside a placeholder that invented it. Both below FAIL against that.
  it('honours a fiscal year that is not the calendar year — the placeholder read getUTCFullYear', async () => {
    const data = await run(posting())
    expect(data.fiscalYear).toBe(2025)
    expect(data.fiscalYear).not.toBe(2026) // what the placeholder wrote for every April-year-start tenant
  })

  it('honours a monthly periodType — the placeholder hardcoded ceil(month/3)', async () => {
    const data = await run(posting({ postingDate: '2026-07-12' }), [
      { ...CALENDAR_ROW, fiscalPeriod: 4, monthNumber: 7, periodLabel: 'P4-FY2025' },
    ])
    expect(data.fiscalPeriod).toBe(4) // monthly P4
    expect(data.fiscalPeriod).not.toBe(3) // the placeholder's quarter for July
  })

  it('REFUSES when no calendar row exists — it used to silently invent one', async () => {
    await expect(run(posting(), [])).rejects.toThrow(/fiscal period unresolved.*Generate the fiscal calendar/s)
  })

  // The SOX §404 control the banner claimed while the query sat in an EMPTY try under a catch for errors
  // nothing could raise. Every test here FAILS against that: no period was ever locked against a posting.
  describe('the period lock — you cannot post to a closed period', () => {
    it('an open period accepts a normal posting', async () => {
      const data = await run(posting(), [CALENDAR_ROW], [{ lockStatus: 'open' }])
      expect(data.fiscalPeriod).toBe(2)
    })

    it('no lock row means never closed — open by default', async () => {
      const data = await run(posting(), [CALENDAR_ROW], [])
      expect(data.fiscalPeriod).toBe(2)
    })

    it('an ARCHIVED period accepts nothing — not even a reversal', async () => {
      const lock = [{ lockStatus: 'archived', allowReversals: true }]
      await expect(run(posting(), [CALENDAR_ROW], lock)).rejects.toThrow(/archived/)
      await expect(run(posting({ isReversal: true }), [CALENDAR_ROW], lock)).rejects.toThrow(/archived/)
    })

    it('a LOCKED period refuses a normal posting', async () => {
      await expect(run(posting(), [CALENDAR_ROW], [{ lockStatus: 'locked' }])).rejects.toThrow(/locked/)
    })

    it('a LOCKED period admits a reversal only where the LOCK grants it', async () => {
      const data = await run(posting({ isReversal: true }), [CALENDAR_ROW], [
        { lockStatus: 'locked', allowReversals: true },
      ])
      expect(data.fiscalPeriod).toBe(2)

      await expect(
        run(posting({ isReversal: true }), [CALENDAR_ROW], [{ lockStatus: 'locked', allowReversals: false }]),
      ).rejects.toThrow(/locked/) // the posting does not get to decide
    })

    it('a LOCKED period admits a prior-period adjustment only where the LOCK grants it', async () => {
      const data = await run(posting({ isPriorPeriodAdjustment: true }), [CALENDAR_ROW], [
        { lockStatus: 'locked', allowPriorPeriodAdjustments: true },
      ])
      expect(data.fiscalPeriod).toBe(2)

      await expect(
        run(posting({ isPriorPeriodAdjustment: true }), [CALENDAR_ROW], [{ lockStatus: 'locked' }]),
      ).rejects.toThrow(/locked/) // absent flag is not permission
    })
  })

  describe('the chain leaf — the fold, not the ninth base64 stub', () => {
    it('is the fold over (posting, calendar leaf), chained to the prior revision', async () => {
      const data = await run(posting())
      expect(data.chainLeafUuid).toBe(
        chainLeaf(
          {
            postingDate: '2026-05-12',
            entityId: 'acme',
            fiscalYear: 2025,
            fiscalPeriod: 2,
            regulatoryCode: 'P02_2025',
            calendarLeaf: CALENDAR_ROW.chainLeafUuid,
          },
          '',
        ),
      )
      expect(data.chainLeafUuid).toHaveLength(36) // a uuid, not 32 chars of base64
    })

    it('chains — the prior leaf is an input, which the stub ignored entirely', async () => {
      const first = await run(posting())
      const second = await run(posting(), [CALENDAR_ROW], [], { chainLeafUuid: 'PRIOR-LEAF' })
      expect(second.chainLeafUuid).not.toBe(first.chainLeafUuid)
    })

    it('covers the whole payload — the stub saw only the first 24 bytes', async () => {
      const a = await run(posting())
      const b = await run(posting(), [{ ...CALENDAR_ROW, regulatoryCode: 'P09_9999' }])
      expect(b.chainLeafUuid).not.toBe(a.chainLeafUuid) // regulatoryCode sat far past the old window
    })
  })

  it('a posting with no date cannot have a period', async () => {
    await expect(run({ entity: 'acme' })).rejects.toThrow(/postingDate/)
  })
})
