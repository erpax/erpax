import { describe, it, expect } from 'vitest'
import type { FolderReadmeModel } from '@/readme'
import {
  pivotFolderStats,
  pivotFolderComparison,
  pivotSingleFolder,
  renderPivotMarkdown,
  renderPivotComparisonMarkdown,
  renderPivotTable,
  folderNameValid,
  trinityStateOf,
  gravityHeldOf,
} from '@/pivot'

const baseStatement = {
  debits: [],
  credits: [],
  totalDebits: 0,
  totalCredits: 0,
  variance: 0,
  balanced: true,
}

const baseTypography = {
  partition: 'law',
  partitionRoot: 'law',
  bondDegree: 8,
  analysisNeighbors: ['seal'],
  graphRoot: 'graph-root',
}

const synthetic = (overrides: Partial<FolderReadmeModel> & { atomPath: string }): FolderReadmeModel => {
  const leaf = overrides.atomPath.split('/').pop() ?? overrides.atomPath
  const form = (overrides.form ?? 1) as 0 | 1
  const code = (overrides.code ?? 1) as 0 | 1
  const proof = (overrides.proof ?? 1) as 0 | 1
  const sealed = overrides.sealed ?? true
  const balanced = overrides.statement?.balanced ?? true
  const bondDegree = overrides.typography?.bondDegree ?? baseTypography.bondDegree
  const horo = overrides.horo ?? 1
  return {
    leaf,
    form,
    code,
    proof,
    uuid: overrides.uuid ?? 'uuid-a',
    horo,
    measure: 'base',
    bondsIn: 0,
    bondsOut: 0,
    folded: true,
    linksResolved: 0,
    linksTotal: 0,
    escapes: 0,
    typography: { ...baseTypography, ...overrides.typography, bondDegree },
    bindings: [],
    standards: [],
    sealed,
    statement: { ...baseStatement, balanced, ...overrides.statement },
    entropy: {
      unit: 'eb',
      gaps: [],
      seals: [],
      totalGapEb: 0,
      totalSealEb: 0,
      netEntropyEb: 0,
      sealGapRatio: 0,
    },
    quantumThinking: {
      atomPath: overrides.atomPath,
      superposition: [],
      collapse: [],
      seal: { entryUuids: [], contentUuids: [], pathFollow: false, receipt: false, sealed: true },
    },
    analytics: {
      bondDegree,
      sealed: sealed ? 1 : 0,
      horo,
      variance: overrides.statement?.variance ?? 0,
      balanced: balanced ? 1 : 0,
      trinitySum: form + code + proof,
      bindingCount: 0,
      standardCount: 0,
    },
    ...overrides,
    atomPath: overrides.atomPath,
  }
}

describe('pivot — folder README cross-tabs', () => {
  it('folderNameValid rejects hyphenated segments', () => {
    expect(folderNameValid('trading/api')).toBe(true)
    expect(folderNameValid('trading-apis')).toBe(false)
  })

  it('trinityStateOf classifies vocabulary and incomplete code', () => {
    expect(trinityStateOf(synthetic({ atomPath: 'law', code: 0, proof: 0 }))).toBe('vocabulary')
    expect(trinityStateOf(synthetic({ atomPath: 'x', proof: 0 }))).toBe('incomplete')
    expect(trinityStateOf(synthetic({ atomPath: 'x' }))).toBe('code-complete')
  })

  it('gravityHeldOf uses bond degree when graph root is present', () => {
    expect(gravityHeldOf(synthetic({ atomPath: 'a', typography: { ...baseTypography, bondDegree: 0 } }))).toBe(
      false,
    )
    expect(gravityHeldOf(synthetic({ atomPath: 'b' }))).toBe(true)
  })

  it('pivotFolderStats tallies seal and balance axes', () => {
    const models = [
      synthetic({ atomPath: 'sealed-a', sealed: true }),
      synthetic({ atomPath: 'open-b', sealed: false, statement: { ...baseStatement, balanced: false } }),
      synthetic({ atomPath: 'open-c', sealed: false }),
    ]
    const stats = pivotFolderStats(models)
    expect(stats.folderCount).toBe(3)
    const seal = stats.tables.find((t) => t.axis === 'seal')!
    expect(seal.rows.find((r) => r.state === 'sealed')?.count).toBe(1)
    expect(seal.rows.find((r) => r.state === 'unsealed')?.count).toBe(2)
    const balance = stats.tables.find((t) => t.axis === 'balance')!
    expect(balance.rows.find((r) => r.state === 'unbalanced')?.count).toBe(1)
  })

  it('pivotFolderStats distributes horo ring and partition', () => {
    const models = [
      synthetic({ atomPath: 'a', horo: 1 }),
      synthetic({ atomPath: 'b', horo: 2 }),
      synthetic({ atomPath: 'c', horo: 99 }),
      synthetic({ atomPath: 'd', horo: null, typography: { ...baseTypography, partition: 'readme' } }),
    ]
    const horo = pivotFolderStats(models).tables.find((t) => t.axis === 'horo')!
    expect(horo.rows.find((r) => r.state === 'ring·1')?.count).toBe(1)
    expect(horo.rows.find((r) => r.state === 'off-ring·99')?.count).toBe(1)
    expect(horo.rows.find((r) => r.state === 'missing')?.count).toBe(1)
    const partition = pivotFolderStats(models).tables.find((t) => t.axis === 'partition')!
    expect(partition.rows.some((r) => r.state === 'readme')).toBe(true)
  })

  it('pivotFolderComparison computes deltas', () => {
    const before = [synthetic({ atomPath: 'a', sealed: true }), synthetic({ atomPath: 'b', sealed: false })]
    const after = [synthetic({ atomPath: 'a', sealed: true }), synthetic({ atomPath: 'c', sealed: true })]
    const cmp = pivotFolderComparison(before, after)
    const seal = cmp.tables.find((t) => t.axis === 'seal')!
    expect(seal.rows.find((r) => r.state === 'sealed')?.delta).toBe(1)
    expect(seal.rows.find((r) => r.state === 'unsealed')?.delta).toBe(-1)
  })

  it('renderPivotMarkdown is stable and includes table headers', () => {
    const stats = pivotFolderStats([synthetic({ atomPath: 'readme' })])
    const md = renderPivotMarkdown(stats)
    expect(renderPivotMarkdown(stats)).toBe(md)
    expect(md).toContain('### [[seal]]')
    expect(md).toContain('| state | count | share % |')
    expect(md).toContain('[[seal]]')
  })

  it('renderPivotTable and single-folder pivot are deterministic', () => {
    const m = synthetic({ atomPath: 'pivot', sealed: false })
    const stats = pivotSingleFolder(m)
    expect(stats.folderCount).toBe(1)
    expect(renderPivotTable(stats.tables[0]!)).toContain('unsealed')
  })

  it('renderPivotComparisonMarkdown includes delta column', () => {
    const md = renderPivotComparisonMarkdown(
      pivotFolderComparison(
        [synthetic({ atomPath: 'a', sealed: false })],
        [synthetic({ atomPath: 'a', sealed: true })],
      ),
    )
    expect(md).toContain('| Δ |')
    expect(md).toContain('+1')
  })
})
