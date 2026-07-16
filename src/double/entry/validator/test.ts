import { describe, it, expect } from 'vitest'
import { DoubleEntryValidator, ACCOUNT_POLARITY, MINOR_UNIT, type GLPostingLine } from './index'

const line = (debit: number, credit: number, accountId = 'a'): GLPostingLine => ({
  accountId,
  debitAmount: debit || undefined,
  creditAmount: credit || undefined,
})

describe('double/entry/validator — the law an ERP exists to guarantee', () => {
  it('a balanced entry posts: Σdebits = Σcredits', () => {
    const r = DoubleEntryValidator.validate([line(100, 0, 'cash'), line(0, 100, 'revenue')])
    expect(r.valid).toBe(true)
    expect(r.totalDebits).toBe(100)
    expect(r.totalCredits).toBe(100)
    expect(r.difference).toBe(0)
  })

  it('an unbalanced entry is refused, and the difference is reported', () => {
    const r = DoubleEntryValidator.validate([line(100, 0), line(0, 90)])
    expect(r.valid).toBe(false)
    expect(r.difference).toBeCloseTo(10)
    expect(r.errors.some((e) => /do not equal credits/.test(e))).toBe(true)
  })

  // ── what the @invariant CLAIMED vs what the code DOES ────────────────────────
  //
  // The banner asserted `debits.sum() === credits.sum()` — exact equality. It is not what runs, and it
  // could not be: these are floats. The code admits a 1-cent tolerance, and that tolerance is the real law.
  it('the law is a TOLERANCE, not equality — a sub-cent gap posts', () => {
    const r = DoubleEntryValidator.validate([line(100, 0), line(0, 99.995)])
    expect(r.difference).toBeCloseTo(0.005)
    expect(r.valid).toBe(true) // === would have refused this
  })

  it('a clearly unbalanced entry is refused at any magnitude', () => {
    expect(DoubleEntryValidator.validate([line(100, 0), line(0, 99.98)]).valid).toBe(false) // 0.02
    expect(DoubleEntryValidator.validate([line(1e6, 0), line(0, 1e6 - 1)]).valid).toBe(false) // 1.00
  })

  // THE FINDING. This test was written asserting "a one-cent gap posts" — and reality refused. There is no
  // cent boundary to assert, because the bound is compared in BINARY against amounts that are DECIMAL:
  //
  //   100 − 99.99 = 0.010000000000005115908   > 0.01  → REFUSED
  //    50 − 49.99 = 0.009999999999998010480  ≤ 0.01  → POSTED
  //
  // The same one-cent discrepancy is refused at 100 and posted at 50. The verdict is not a property of the
  // ENTRY; it is a property of where the amounts happen to land in float64 — and the drift grows with
  // magnitude (at 1e6 the same cent reads 0.010000000009313). Even the bound is not itself: 0.01 stored is
  // 0.010000000000000000208. The tolerance names a cent and does not mean one.
  //
  // This is pinned, not endorsed. The disease is money in floats; the cure is integer minor units, which is
  // a change to every amount in the ledger and is NOT smuggled into the diff that gave this atom its proof.
  // Pinning it means the next person cannot rediscover it by being burned in production.
  it('the boundary is a float accident, not a cent — one cent posts at 50 and is refused at 100', () => {
    const gapAt = (n: number) => Math.abs(n - (n - 0.01))
    expect(gapAt(100)).toBeGreaterThan(MINOR_UNIT) // 0.010000000000005…
    expect(gapAt(50)).toBeLessThan(MINOR_UNIT) // 0.009999999999998…

    expect(DoubleEntryValidator.validate([line(100, 0), line(0, 99.99)]).valid).toBe(false)
    expect(DoubleEntryValidator.validate([line(50, 0), line(0, 49.99)]).valid).toBe(true) // identical gap
  })

  it('float drift scales with magnitude — the bound is absolute, so its real meaning is not', () => {
    const drift = (n: number) => Math.abs(n - (n - 0.01) - 0.01)
    expect(drift(100)).toBeLessThan(1e-13)
    expect(drift(1e6)).toBeGreaterThan(drift(100)) // the same cent, ~1000× the error
  })

  it('float drift is why the tolerance exists — 0.1+0.2 never equals 0.3 exactly', () => {
    expect(0.1 + 0.2 === 0.3).toBe(false) // exact equality is unimplementable over floats
    const r = DoubleEntryValidator.validate([line(0.1, 0), line(0.2, 0), line(0, 0.3)])
    expect(r.valid).toBe(true) // the tolerance absorbs the drift the claim ignored
  })

  // The second banner asserted "account-type matches debit/credit polarity" as an INVARIANT. The code only
  // WARNS: a credit to a debit-normal account is still `valid`. An invariant that forbids nothing is not one.
  it('polarity is a WARNING, not an invariant — a wrong-polarity entry still posts', () => {
    const r = DoubleEntryValidator.validate([line(0, 100, 'cash'), line(100, 0, 'revenue')], {
      cash: 'asset', // debit-normal, being credited
      revenue: 'revenue', // credit-normal, being debited
    })
    expect(r.valid).toBe(true) // ← the claim said this could not happen
    expect(r.warnings).toHaveLength(2)
    expect(r.warnings.some((w) => /credit-normal/.test(w))).toBe(true)
    expect(r.warnings.some((w) => /debit-normal/.test(w))).toBe(true)
  })

  it('an unknown account type warns rather than refusing — polarity is advisory throughout', () => {
    const r = DoubleEntryValidator.validate([line(100, 0, 'x'), line(0, 100, 'y')], { x: 'asset' })
    expect(r.valid).toBe(true)
    expect(r.warnings.some((w) => /Account type not found/.test(w))).toBe(true)
  })

  // ── the refusals that ARE real ───────────────────────────────────────────────
  it('a single posting cannot be an entry — double entry needs two sides', () => {
    expect(DoubleEntryValidator.validate([line(100, 0)]).valid).toBe(false)
    expect(DoubleEntryValidator.validate([]).valid).toBe(false)
  })

  it('a negative amount is refused — direction is carried by the column, never by sign', () => {
    expect(DoubleEntryValidator.validate([line(-100, 0), line(0, -100)]).valid).toBe(false)
  })

  it('one line cannot be both debit and credit — a side is a side', () => {
    const r = DoubleEntryValidator.validate([{ accountId: 'a', debitAmount: 50, creditAmount: 50 }, line(0, 50)])
    expect(r.valid).toBe(false)
    expect(r.errors.some((e) => /both debit and credit/.test(e))).toBe(true)
  })

  it('validateBalance is the same tolerance, stated once', () => {
    expect(DoubleEntryValidator.validateBalance([line(100, 0), line(0, 100)])).toBe(true)
    expect(DoubleEntryValidator.validateBalance([line(100, 0), line(0, 99.995)])).toBe(true) // tolerance
    expect(DoubleEntryValidator.validateBalance([line(100, 0), line(0, 90)])).toBe(false)
  })

  it('polarity: contra-accounts invert — accumulated-depreciation is credit-normal though it is an asset', () => {
    expect(ACCOUNT_POLARITY['asset']).toBe('debit')
    expect(ACCOUNT_POLARITY['accumulated-depreciation']).toBe('credit') // the contra
    expect(ACCOUNT_POLARITY['revenue']).toBe('credit')
    expect(ACCOUNT_POLARITY['expense']).toBe('debit')
  })
})
