import { describe, it, expect } from 'vitest'
import {
  accountCorpusEntropy,
  accountCodeOf,
  bondStatementToJournalEntry,
  CORPUS_JOURNAL_COLLECTION,
  ENTROPY_CONTRA_PATH,
  ENTROPY_CURRENCY,
  ENTROPY_CURRENCY_NAME,
  ENTROPY_CURRENCY_SYMBOL,
  SEAL_CONTRA_PATH,
  ebToMilliEb,
  erpaxSelfAccount,
  entropyToValidatedEntry,
  folderEntropyJournalEntry,
  milliEbToEb,
} from './index'
import {
  accountGapsAndSeals,
  aggregateCorpusEntropy,
  COMPARABLE_UNIT,
  type FolderEntropyAccounting,
} from '@/readme/entropy'
import { deriveFolderModel, buildReadmeCorpusContext, buildReadmeTypographyGraph } from '@/readme'

describe('accounting/corpus — path-keyed corpus self-accounting (eb)', () => {
  it('currency is entropy-bit (eb) posted in milli-eb on path accounts', () => {
    expect(ENTROPY_CURRENCY).toBe('eb')
    expect(ENTROPY_CURRENCY_SYMBOL).toBe('eb')
    expect(ENTROPY_CURRENCY_NAME).toBe('entropy-bit')
    expect(COMPARABLE_UNIT).toBe('eb')
  })

  it('gap Dr folder path · Cr entropy · seal Dr seal · Cr folder path', () => {
    const accounting: FolderEntropyAccounting = {
      unit: 'eb',
      gaps: [
        {
          side: 'gap',
          account: '[[gap]]/[[trinity]]/proof',
          category: 'trinity',
          amount: 1,
          comparable: 1.585,
          source: 'folder-law',
        },
      ],
      seals: [
        {
          side: 'seal',
          account: '[[seal]]/[[diamond]]/sealed',
          category: 'diamond',
          amount: 1,
          comparable: 1,
          source: 'seal/index.ts',
        },
      ],
      totalGapEb: 1.585,
      totalSealEb: 1,
      netEntropyEb: 0.585,
      sealGapRatio: 0.631,
    }
    const entry = entropyToValidatedEntry(accounting, 'card')
    expect(entry.balanced).toBe(true)
    expect(entry.lines.some((l) => l.accountCode === 'card' && l.debit > 0)).toBe(true)
    expect(entry.lines.some((l) => l.accountCode === ENTROPY_CONTRA_PATH && l.credit > 0)).toBe(true)
    expect(entry.lines.some((l) => l.accountCode === SEAL_CONTRA_PATH && l.debit > 0)).toBe(true)
    expect(entry.lines.some((l) => l.accountCode === 'card' && l.credit > 0)).toBe(true)
    expect(milliEbToEb(entry.totalDebits)).toBe(milliEbToEb(entry.totalCredits))
  })

  it('erpaxSelfAccount uses folder path as accountCode header', () => {
    const ctx = buildReadmeCorpusContext()
    const graph = buildReadmeTypographyGraph()
    const model = deriveFolderModel('seal', process.cwd(), ctx, graph)
    const doc = erpaxSelfAccount(model)
    expect(doc.isBalanced).toBe(true)
    expect(doc.accountCode).toBe('seal')
    expect(doc.coordinate).toContain('seal')
    expect(doc.currency).toBe('eb')
    expect(doc.lines.every((l) => l.currency === 'eb')).toBe(true)
    expect(doc.lines.every((l) => l.coordinate.includes(l.accountCode.split('/')[0]!))).toBe(true)
    expect(doc.netEntropyEb).toBe(model.entropy.netEntropyEb)
  })

  it('homonym paths post to distinct account codes', () => {
    const ctx = buildReadmeCorpusContext()
    const graph = buildReadmeTypographyGraph()
    const agentsAcct = erpaxSelfAccount(deriveFolderModel('agents/accounting', process.cwd(), ctx, graph))
    const acct = erpaxSelfAccount(deriveFolderModel('accounting', process.cwd(), ctx, graph))
    expect(agentsAcct.accountCode).toBe('agents/accounting')
    expect(acct.accountCode).toBe('accounting')
    expect(agentsAcct.accountCode).not.toBe(acct.accountCode)
  })

  it('folder path net position matches netEntropyEb sign', () => {
    const ctx = buildReadmeCorpusContext()
    const graph = buildReadmeTypographyGraph()
    const model = deriveFolderModel('card', process.cwd(), ctx, graph)
    const doc = erpaxSelfAccount(model)
    expect(doc.isBalanced).toBe(true)
    expect(doc.netEntropyEb).toBe(model.entropy.netEntropyEb)
    const pathNetMilli = doc.lines
      .filter((l) => l.accountCode === model.atomPath)
      .reduce((s, l) => s + l.debit - l.credit, 0)
    expect(pathNetMilli).toBe(ebToMilliEb(model.entropy.netEntropyEb))
  })

  it('accountCorpusEntropy posts to readme path as corpus root account', () => {
    const ctx = buildReadmeCorpusContext()
    const graph = buildReadmeTypographyGraph()
    const models = ['readme', 'seal', 'card'].map((p) => deriveFolderModel(p, process.cwd(), ctx, graph))
    const rollup = aggregateCorpusEntropy(models)
    const doc = accountCorpusEntropy(rollup, { entryDate: '2026-06-08' })
    expect(doc.isBalanced).toBe(true)
    expect(doc.accountCode).toBe('readme')
    expect(doc.sourceId).toBe('readme')
    expect(doc.sourceEvent).toBe('corpus-entropy:corpus')
    expect(doc.netEntropyEb).toBe(rollup.netEntropyEb)
  })

  it('bondStatementToJournalEntry wires statement + entropy on path account', () => {
    const ctx = buildReadmeCorpusContext()
    const graph = buildReadmeTypographyGraph()
    const model = deriveFolderModel('readme', process.cwd(), ctx, graph)
    const recomputed = accountGapsAndSeals({
      atomPath: model.atomPath,
      form: model.form,
      code: model.code,
      proof: model.proof,
      horo: model.horo,
      sealed: model.sealed,
      statement: model.statement,
      typography: model.typography,
      membershipViolations: [],
      crossImpurities: [],
      membershipOk: true,
      gravityHeld: model.statement.balanced,
    })
    const doc = bondStatementToJournalEntry({ atomPath: model.atomPath, statement: model.statement, entropy: recomputed })
    expect(doc.isBalanced).toBe(true)
    expect(doc.accountCode).toBe(accountCodeOf('readme'))
    expect(doc.lines.length).toBeGreaterThan(0)
  })

  it('targets journal-entries collection with period_end_adjustment sourceType', () => {
    const doc = folderEntropyJournalEntry('entropy', {
      unit: 'eb',
      gaps: [],
      seals: [{ side: 'seal', account: 'x', category: 'balanced', amount: 1, comparable: 1, source: 'conservation' }],
      totalGapEb: 0,
      totalSealEb: 1,
      netEntropyEb: -1,
      sealGapRatio: 1,
    })
    expect(CORPUS_JOURNAL_COLLECTION).toBe('journal-entries')
    expect(doc.sourceType).toBe('period_end_adjustment')
    expect(doc.sourceEvent).toContain('corpus-entropy')
    expect(doc.accountCode).toBe('entropy')
  })

  it('ebToMilliEb round-trips at 3 decimal places', () => {
    expect(ebToMilliEb(1.585)).toBe(1585)
    expect(milliEbToEb(1585)).toBe(1.585)
  })
})
