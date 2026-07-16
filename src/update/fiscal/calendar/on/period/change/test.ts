import { describe, it, expect } from 'vitest'
import { chainLeaf } from '@/merge'
import { updateFiscalCalendarOnPeriodChange } from './index'

type Doc = Record<string, unknown>
const run = (data: Doc, operation = 'update', originalDoc?: Doc) =>
  (updateFiscalCalendarOnPeriodChange as never as (a: unknown) => Promise<Doc | undefined>)({
    data,
    operation,
    originalDoc,
    req: { user: { id: 'u1', email: 'a@b.bg' } },
  })

const config = (over: Doc = {}) => ({
  fiscalYearStartMonth: 4,
  fiscalYearStartDay: 1,
  periodType: 'monthly',
  regulatoryFramework: 'ias-ifrs',
  ...over,
})

describe('update/fiscal/calendar/on/period/change — it validates and stamps, nothing more', () => {
  it('an invalid config THROWS — never silently corrected', async () => {
    await expect(run(config({ fiscalYearStartMonth: 13 }))).rejects.toThrow(/Invalid fiscal configuration/)
  })

  // Written expecting "Invalid period boundaries" — the message of a SECOND boundary check this hook
  // carried. It never fired: validateConfiguration already folds validatePeriodBoundary's errors in, so an
  // invalid boundary throws before the copy is reached. The copy is deleted; the law is stated once, in the
  // resolver, and this asserts the message that actually arrives.
  it('invalid custom boundaries THROW — from the ONE validation, not the unreachable copy', async () => {
    await expect(
      run(
        config({
          periodType: 'custom',
          customPeriodBoundaries: [{ periodNumber: 1, periodLabel: 'P1', startDate: '2026-03-01', endDate: '2026-01-01' }],
        }),
      ),
    ).rejects.toThrow(/Invalid fiscal configuration: Period 1: startDate must be before endDate/)
  })

  // The leaf was the TENTH copy of the base64 stub, and hid from the grep that caught the first eight by
  // splitting .toString('base64') and .substring(0, 32) across two statements. It sat under "@invariant All
  // changes auditable via chainLeafUuid" while covering only the first 24 bytes of its input — the opening
  // of periodType. Every test below FAILS against it.
  it('the leaf is the fold over the amended config', async () => {
    const data = await run(config())
    expect(data!.chainLeafUuid).toBe(
      chainLeaf(
        {
          periodType: 'monthly',
          fiscalYearStartMonth: 4,
          fiscalYearStartDay: 1,
          regulatoryFramework: 'ias-ifrs',
          customBoundaries: null,
        },
        '',
      ),
    )
    expect(data!.chainLeafUuid).toHaveLength(36) // a uuid, not 32 chars of base64
  })

  it('amending ANY field moves the leaf — the stub saw only the first 24 bytes', async () => {
    const base = (await run(config()))!.chainLeafUuid
    // every one of these sat PAST the old window: the leaf did not move for any of them
    expect((await run(config({ fiscalYearStartMonth: 7 })))!.chainLeafUuid).not.toBe(base)
    expect((await run(config({ regulatoryFramework: 'saf-t' })))!.chainLeafUuid).not.toBe(base)
    expect((await run(config({ fiscalYearStartDay: 6 })))!.chainLeafUuid).not.toBe(base)
  })

  it('CHAINS to the prior revision — the stub ignored it entirely', async () => {
    const first = (await run(config()))!.chainLeafUuid
    const second = (await run(config(), 'update', { chainLeafUuid: 'PRIOR' }))!.chainLeafUuid
    expect(second).not.toBe(first)
  })

  it('records the amendment in notes with the real leaf', async () => {
    const data = await run(config())
    expect(String(data!.notes)).toContain('[AMENDMENT ')
    expect(String(data!.notes)).toContain(String(data!.chainLeafUuid)) // the variable the old code named
  })

  it('sets a governance scope when absent', async () => {
    const data = await run(config())
    expect(data!.governanceScope).toMatchObject({ approvalRequired: true, auditLevel: 'full' })
  })

  // The honest boundary, asserted rather than promised. The banner claimed a 7-step workflow; steps 3/4/5/7
  // do not exist. Pinning it means the next reader meets the gap here, not in production.
  it('regenerates NO calendar and writes NO snapshot — the banner claimed both', async () => {
    const data = await run(config())
    expect(data).toBeDefined()
    expect(Object.keys(data!).some((k) => /snapshot/i.test(k))).toBe(false)
    // it touches only what it validates and stamps
    expect(Object.keys(data!).sort()).toEqual(
      ['chainLeafUuid', 'fiscalYearStartDay', 'fiscalYearStartMonth', 'governanceScope', 'notes', 'periodType', 'regulatoryFramework'].sort(),
    )
  })

  it('ignores operations that are not create/update', async () => {
    expect(await run(config(), 'delete')).toBeUndefined()
  })
})
