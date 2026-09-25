import { describe, it, expect } from 'vitest'
import {
  allMeetsInBalance,
  balanceMeetingOf,
  corpusBalanceFromModels,
  partitionBalance,
  BALANCE_EQUATION,
  balanceEquationHolds,
  balanceMeetingFromModel,
  plainLanguageOf,
  renderBalanceMeetingPivotSection,
  renderQuantumFoldSection,
} from '@/accounting/balance'
import { deriveFolderModel, listAtomPaths, renderFolderReadme } from '@/readme/compute'

describe('accounting/balance', () => {
  it('sealed atom partition debit bits equal credit bits', () => {
    const m = deriveFolderModel('seal')
    const p = partitionBalance(m)
    if (m.sealed) {
      expect(p.debitBits).toBe(p.creditBits)
      expect(p.variance).toBe(0)
    }
    expect(p.balanced).toBe(m.statement.balanced)
  })

  it("allMeetsInBalance('corpus') returns structured meeting", () => {
    // BOUNDED SAMPLE, not the whole corpus: this asserts the SHAPE of the aggregation (scope,
    // equation, fold128 format, internal consistency corpusNetEb === corpus.netEb) — none of which
    // depends on all ~3000 atoms. Deriving every folder model here ran 8.4 min (167ms × 3000, the
    // CI-sized-job-in-a-unit-test class already fixed for doctor and rules). corpusBalanceFromModels
    // is exercised on a representative sample; the full-corpus balance is the doctor/audit lane's job.
    const models = listAtomPaths().slice(0, 12).map((p) => deriveFolderModel(p))
    const corpus = corpusBalanceFromModels(models)
    const m = allMeetsInBalance('corpus', { corpus, atomPath: 'corpus' })
    expect(m.scope).toBe('corpus')
    expect(m.equation).toBe(BALANCE_EQUATION)
    expect(m.corpusNetEb).toBe(corpus.netEb)
    expect(m.fold128).toMatch(/^[0-9a-f]{32}$/)
    expect(plainLanguageOf(m)).toContain('all meet in balance')
  })

  it('balanceMeetingOf aliases allMeetsInBalance', () => {
    const m = deriveFolderModel('quantum')
    const a = allMeetsInBalance('quantum', { folder: m, atomPath: 'quantum' })
    const b = balanceMeetingOf('quantum', { folder: m, atomPath: 'quantum' })
    expect(b.fold128).toBe(a.fold128)
  })

  it('renderFolderReadme pivot contains meet in balance', () => {
    const md = renderFolderReadme(deriveFolderModel('readme'))
    expect(md).toContain('all meet in balance')
    expect(md).toContain('debit·credit meet here')
    expect(renderQuantumFoldSection(deriveFolderModel('quantum'))).toContain('## quantum fold')
  })
})

/**
 * The equation printed above the table is now checkable against it.
 *
 * `Σdebit − Σcredit = 0` was right and is an identity — every posting carries a
 * `[[balance]]` contra. What was missing is the formula for the number printed beside
 * it: `variance` is the liability-gap mass plus a membership shortfall, so
 * `debit 9 · credit 9 · variance 1` is consistent and read as an arithmetic error
 * until the second formula is on the page. `⊗` also covered a concatenation while
 * `interact64` (a masked AND) was printed as a number with no formula at all.
 */
describe('accounting/balance — the stated equations hold on the numbers beside them', () => {
  it('names every meeting, including the two that had no formula', () => {
    expect(BALANCE_EQUATION).toContain('Σdebit − Σcredit = 0')
    expect(BALANCE_EQUATION).toContain('variance = Σ[[liability]] + membership')
    expect(BALANCE_EQUATION).toContain('wordHalf ‖ digitHalf = combined128')
    expect(BALANCE_EQUATION).toContain('wordHalf ∧ digitHalf ∧ mask = interact64')
    expect(BALANCE_EQUATION).not.toContain('⊗')
  })

  it('every leg holds on a real atom', () => {
    for (const path of ['seal', 'quantum', 'rules/orphan']) {
      const checks = balanceEquationHolds(balanceMeetingFromModel(deriveFolderModel(path)))
      expect(checks).toHaveLength(5)
      for (const c of checks) expect(c.holds, `${path} — ${c.stated}`).toBe(true)
    }
  })

  it('the variance a table prints is its liability mass plus its membership shortfall', () => {
    const m = balanceMeetingFromModel(deriveFolderModel('seal'))
    // the identity the difference cannot see: a [[liability]] credit is answered by a
    // [[balance]] debit, so the sums conserve while the purity variance does not
    expect(m.totalDebits - m.totalCredits).toBe(0)
    expect(m.partitionVariance).toBeGreaterThanOrEqual(m.liabilityMass)
    expect(renderBalanceMeetingPivotSection(deriveFolderModel('seal'))).toContain('| purity |')
  })

  it('a leg goes red when its side is changed — the check is refutable', () => {
    const m = balanceMeetingFromModel(deriveFolderModel('seal'))
    const leg = (x: typeof m, needle: string) =>
      balanceEquationHolds(x).find((c) => c.stated.includes(needle))?.holds
    expect(leg(m, '‖')).toBe(true)
    expect(leg({ ...m, combined128: m.combined128 + 1n }, '‖')).toBe(false)
    expect(leg({ ...m, interact: m.interact ^ 1n }, '∧ mask')).toBe(false)
    expect(leg({ ...m, netEb: m.netEb + 1 }, 'netEb')).toBe(false)
    expect(leg({ ...m, totalDebits: m.totalDebits + 1 }, 'Σdebit')).toBe(false)
    // a variance BELOW its own liability mass is impossible — the leg says so
    expect(leg({ ...m, liabilityMass: m.partitionVariance + 1 }, 'liability')).toBe(false)
  })
})
