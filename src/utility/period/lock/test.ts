import { describe, it, expect } from 'vitest'
import { validateNotLocked } from './index'

const run = (data: Record<string, unknown>) =>
  (validateNotLocked as unknown as (a: unknown) => Promise<unknown>)({
    data,
    req: { user: { id: 'u1', tenants: [{ tenant: 't1' }] }, payload: { find: async () => ({ docs: [] }) } },
    operation: 'create',
  })

describe('utility/period/lock — the control that is actually wired', () => {
  /**
   * THE §404 BYPASS. `findLockedPeriodForDate` asks the database for `startDate <= d <= endDate`.
   * Given garbage that matches NOTHING, so `locked` is null and the posting is allowed — a period
   * lock that opens on a malformed date, with no error anywhere.
   *
   * [[period]]/lock/checker had this leg and proved it; the hook that is wired did not.
   */
  it('REFUSES an unparseable posting date rather than allowing it through', async () => {
    await expect(run({ tenant: 't1', postingDate: 'not-a-date' })).rejects.toThrow(/cannot evaluate posting date/)
  })

  it('refuses whatever the shape of the garbage', async () => {
    for (const bad of ['2026-13-45', 'yesterday', ' ', '\t']) {
      await expect(run({ tenant: 't1', postingDate: bad }), bad).rejects.toThrow()
    }
  })

  // An ABSENT date is not a malformed one. `''` is falsy, so the hook has nothing to evaluate and
  // nothing to refuse — whereas `' '` IS present and IS wrong, and the line above pins that it is
  // refused. My first version of this test conflated the two and was wrong, not the code.
  it('is silent when there is no postable date at all', async () => {
    await expect(run({ tenant: 't1', postingDate: '' })).resolves.toBeDefined()
    await expect(run({ tenant: 't1' })).resolves.toBeDefined()
  })

  // The complement: a good date must still pass, or the fix would be a lock that refuses everything.
  it('allows a well-formed date when no period is locked', async () => {
    await expect(run({ tenant: 't1', postingDate: '2026-03-15' })).resolves.toBeDefined()
  })

  it('is inert with no tenant and no user — it guards, it does not invent scope', async () => {
    const noUser = (validateNotLocked as unknown as (a: unknown) => Promise<unknown>)({
      data: { postingDate: 'not-a-date' },
      req: {},
      operation: 'create',
    })
    await expect(noUser).resolves.toBeDefined()
  })
})
