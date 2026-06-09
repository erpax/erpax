import { describe, it, expect } from 'vitest'
import {
  allMeetsInBalance,
  balanceMeetingOf,
  corpusBalanceFromModels,
  partitionBalance,
  BALANCE_EQUATION,
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
    const models = listAtomPaths().map((p) => deriveFolderModel(p))
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
