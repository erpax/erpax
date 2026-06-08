import { afterEach, describe, expect, it, vi } from 'vitest'

import * as accounting from '@/accounting'
import { erpaxSelfAccount } from '@/accounting'
import * as readme from '@/readme'
import { buildReadmeCorpusContext, buildReadmeTypographyGraph, deriveFolderModel } from '@/readme'
import {
  CORPUS_JOURNAL_SAMPLE_PATHS,
  clearCorpusEntropyRollupCache,
  getCorpusEntropyRollupCache,
  loadCorpusDashboardShell,
  loadCorpusEntropyRollup,
  loadCorpusPathJournalSamples,
} from './corpus-rollup'

const FIXTURE_ANALYTICS = {
  folderCount: 4200,
  sealed: 4100,
  balanced: 4000,
  meanBondDegree: 2,
  totalVariance: 0,
  withBindings: 100,
  distinctStandards: 50,
  byHoro: [],
  entropy: {
    unit: 'eb' as const,
    totalGapEb: 12,
    totalSealEb: 99,
    netEntropyEb: 0,
    sealGapRatio: 8.25,
    sealedMass: 99,
    unsealedMass: 12,
    bySector: [{ partition: 'readme', folders: 1, gapEb: 1, sealEb: 9, netEb: 0 }],
  },
  quantumThinking: {
    atomsWithThinking: 1,
    totalSuperposition: 3,
    totalCollapse: 2,
    totalSealUuids: 1,
    sealedThinking: 1,
    byPartition: [{ partition: 'readme', atoms: 1, superposition: 3, collapse: 2 }],
  },
}

const FIXTURE_FOLDER = {
  atomPath: 'readme',
  entropy: { totalGapEb: 1, totalSealEb: 9, netEntropyEb: 0 },
}

const FIXTURE_ACCOUNT = {
  accountCode: 'readme',
  netEntropyEb: 0,
  currency: 'eb' as const,
  isBalanced: true,
  lines: [],
}

function mockRollupDeps(): void {
  vi.spyOn(readme, 'deriveCorpusAnalytics').mockReturnValue(FIXTURE_ANALYTICS)
  vi.spyOn(readme, 'deriveModel').mockReturnValue({ analytics: FIXTURE_ANALYTICS } as never)
  vi.spyOn(readme, 'readmeUuid').mockReturnValue('aaaaaaaa-bbbb-8ccc-dddd-eeeeeeeeeeee')
  vi.spyOn(readme, 'buildReadmeTypographyGraph').mockReturnValue({} as never)
  vi.spyOn(readme, 'buildReadmeCorpusContext').mockReturnValue({} as never)
  vi.spyOn(readme, 'deriveFolderModel').mockReturnValue(FIXTURE_FOLDER as never)
  vi.spyOn(accounting, 'erpaxSelfAccount').mockReturnValue(FIXTURE_ACCOUNT as never)
}

afterEach(() => {
  clearCorpusEntropyRollupCache()
  vi.restoreAllMocks()
})

describe('admin/ui/corpus-rollup — cache', () => {
  it('returns cached rollup on second call (content-uuid + TTL)', () => {
    mockRollupDeps()
    const deriveSpy = vi.mocked(readme.deriveCorpusAnalytics)

    const first = loadCorpusEntropyRollup('/tmp/erpax', { ttlMs: 60_000 })
    const second = loadCorpusEntropyRollup('/tmp/erpax', { ttlMs: 60_000 })

    expect(second).toBe(first)
    expect(deriveSpy).toHaveBeenCalledTimes(1)
    expect(getCorpusEntropyRollupCache('/tmp/erpax')?.contentUuid).toBe(
      'aaaaaaaa-bbbb-8ccc-dddd-eeeeeeeeeeee',
    )
    expect(first.totalGapEb).toBe(FIXTURE_ANALYTICS.entropy.totalGapEb)
    expect(first.totalSealEb).toBe(FIXTURE_ANALYTICS.entropy.totalSealEb)
    expect(first.netEntropyEb).toBe(FIXTURE_ANALYTICS.entropy.netEntropyEb)
    expect(first.sealGapRatio).toBe(FIXTURE_ANALYTICS.entropy.sealGapRatio)
    expect(first.sealedFolders).toBe(FIXTURE_ANALYTICS.entropy.sealedMass)
    expect(first.unsealedFolders).toBe(FIXTURE_ANALYTICS.entropy.unsealedMass)
    expect(first.folderCount).toBe(
      FIXTURE_ANALYTICS.entropy.sealedMass + FIXTURE_ANALYTICS.entropy.unsealedMass,
    )
    expect(first.bySector).toEqual(FIXTURE_ANALYTICS.entropy.bySector)
  })

  it('force refresh bypasses cache', () => {
    mockRollupDeps()
    const deriveSpy = vi.mocked(readme.deriveCorpusAnalytics)

    loadCorpusEntropyRollup('/tmp/erpax', { ttlMs: 60_000 })
    loadCorpusEntropyRollup('/tmp/erpax', { ttlMs: 60_000, force: true })

    expect(deriveSpy).toHaveBeenCalledTimes(2)
  })
})

describe('admin/ui/corpus-rollup — dashboard shell', () => {
  it('loads reciprocity without corpus fs walk', () => {
    const shell = loadCorpusDashboardShell()
    expect(shell.reciprocityPct).toBeGreaterThanOrEqual(0)
    expect(shell.reciprocityPct).toBeLessThanOrEqual(100)
  })
})

describe('admin/ui/corpus-rollup — live integration', () => {
  it(
    'loads live corpus entropy rollup from deriveModel',
    () => {
      const m = loadCorpusEntropyRollup()
      expect(m.unit).toBe('eb')
      expect(m.folderCount).toBeGreaterThan(100)
      expect(m.totalGapEb).toBeGreaterThanOrEqual(0)
      expect(m.reciprocityPct).toBeGreaterThanOrEqual(0)
      expect(m.reciprocityPct).toBeLessThanOrEqual(100)
    },
    180_000,
  )

  it(
    'path samples netEntropyEb match erpaxSelfAccount on live folders',
    () => {
      const ctx = buildReadmeCorpusContext()
      const graph = buildReadmeTypographyGraph()
      const samples = loadCorpusPathJournalSamples(CORPUS_JOURNAL_SAMPLE_PATHS)
      expect(samples.length).toBe(CORPUS_JOURNAL_SAMPLE_PATHS.length)
      for (const sample of samples) {
        const model = deriveFolderModel(sample.atomPath, process.cwd(), ctx, graph)
        const doc = erpaxSelfAccount(model)
        expect(sample.accountCode).toBe(doc.accountCode)
        expect(sample.netEntropyEb).toBe(model.entropy.netEntropyEb)
        expect(sample.netEntropyEb).toBe(doc.netEntropyEb)
        expect(sample.currency).toBe('eb')
        expect(sample.isBalanced).toBe(true)
        expect(sample.lines.length).toBe(doc.lines.length)
      }
    },
    180_000,
  )
})
