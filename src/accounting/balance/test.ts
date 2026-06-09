import { describe, it, expect } from 'vitest'
import { deriveFolderModel, buildReadmeCorpusContext } from '@/readme/compute'
import {
  doubleFold,
  digitFold,
  wordFold,
  renderBalanceMeetingPivotSection,
  renderQuantumFoldSection,
} from './index'

describe('accounting/balance — balance meeting + quantum fold faces', () => {
  it('fold helpers pack word and digit halves', () => {
    const path = 'readme'
    expect(wordFold(path)).toBeTypeOf('bigint')
    expect(digitFold(path)).toBeTypeOf('bigint')
    expect(doubleFold(path)).toBeTypeOf('bigint')
  })

  it('renders pivot subsections from a derived folder model', () => {
    const ctx = buildReadmeCorpusContext(process.cwd())
    const model = deriveFolderModel('readme', ctx)
    const balance = renderBalanceMeetingPivotSection(model)
    expect(balance).toContain('### balance meeting')
    expect(balance).toContain('typography debit')
    const fold = renderQuantumFoldSection(model)
    expect(fold).toContain('### quantum fold')
    expect(fold).toContain('interact64')
  })
})
