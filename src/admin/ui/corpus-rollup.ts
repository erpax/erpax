/**
 * admin/ui/corpus-rollup — corpus entropy/seal metrics for the admin dashboard.
 *
 * Pure rollup from readme deriveModel — no hand-set numbers.
 * Path-keyed journal samples via `erpaxSelfAccount` (eb currency, path = account code).
 */
import {
  erpaxSelfAccount,
  milliEbToEb,
  type CorpusJournalEntryDocument,
  type CorpusJournalLine,
} from '@/accounting'
import { reciprocity } from '@/entanglement'
import {
  buildReadmeCorpusContext,
  buildReadmeTypographyGraph,
  deriveCorpusAnalytics,
  deriveFolderModel,
  deriveModel,
  readmeUuid,
  type CorpusAnalytics,
} from '@/readme'
import type { CorpusEntropyRollup } from '@/readme'

/** Representative paths for journal-entry samples on the entropy dashboard. */
export const CORPUS_JOURNAL_SAMPLE_PATHS = ['readme', 'seal', 'card'] as const

/** Default TTL for cached corpus rollup (admin dashboard warm path). */
export const CORPUS_ROLLUP_CACHE_TTL_MS = 5 * 60 * 1000

export interface CorpusPathJournalSample {
  readonly atomPath: string
  readonly accountCode: string
  readonly netEntropyEb: number
  readonly totalGapEb: number
  readonly totalSealEb: number
  readonly currency: CorpusJournalEntryDocument['currency']
  readonly isBalanced: boolean
  readonly lines: readonly CorpusJournalLine[]
}

export interface CorpusDashboardMetrics extends CorpusEntropyRollup {
  readonly folderCount: number
  readonly sealedFolders: number
  readonly unsealedFolders: number
  readonly reciprocityPct: number
  readonly pathSamples: readonly CorpusPathJournalSample[]
}

/** Instant shell metrics — reciprocity only (no fs walk). */
export interface CorpusDashboardShell {
  readonly reciprocityPct: number
}

export interface CorpusRollupCacheEntry {
  readonly contentUuid: string
  readonly cwd: string
  readonly expiresAt: number
  readonly metrics: CorpusDashboardMetrics
}

export interface LoadCorpusEntropyRollupOpts {
  /** Bypass cache and recompute from the live tree. */
  readonly force?: boolean
  /** Cache TTL override (ms). */
  readonly ttlMs?: number
}

let rollupCache: CorpusRollupCacheEntry | null = null

/** Reset cached corpus rollup (tests / forced refresh). */
export function clearCorpusEntropyRollupCache(): void {
  rollupCache = null
}

/** Read cache entry when valid for cwd (content-uuid + TTL). */
export function getCorpusEntropyRollupCache(
  cwd = process.cwd(),
): CorpusRollupCacheEntry | null {
  if (!rollupCache || rollupCache.cwd !== cwd || Date.now() >= rollupCache.expiresAt) {
    return null
  }
  return rollupCache
}

/** Format milli-eb journal line amount for display. */
export const formatJournalLineEb = (milli: number): string =>
  milli > 0 ? `${milliEbToEb(milli)} eb` : '—'

/** Build path-keyed journal-entry samples (reuses ctx/graph when provided). */
export function buildCorpusPathJournalSamples(
  paths: readonly string[],
  cwd: string,
  ctx = buildReadmeCorpusContext(cwd),
  graph = buildReadmeTypographyGraph(cwd),
): readonly CorpusPathJournalSample[] {
  return paths.map((atomPath) => {
    const model = deriveFolderModel(atomPath, cwd, ctx, graph)
    const doc = erpaxSelfAccount(model)
    return {
      atomPath: model.atomPath,
      accountCode: doc.accountCode,
      netEntropyEb: doc.netEntropyEb,
      totalGapEb: model.entropy.totalGapEb,
      totalSealEb: model.entropy.totalSealEb,
      currency: doc.currency,
      isBalanced: doc.isBalanced,
      lines: doc.lines,
    }
  })
}

/** Load path-keyed journal-entry samples from live folder entropy (erpaxSelfAccount). */
export function loadCorpusPathJournalSamples(
  paths: readonly string[] = CORPUS_JOURNAL_SAMPLE_PATHS,
  cwd = process.cwd(),
): readonly CorpusPathJournalSample[] {
  return buildCorpusPathJournalSamples(paths, cwd)
}

/** Instant dashboard shell — reciprocity only, no corpus fs walk. */
export function loadCorpusDashboardShell(): CorpusDashboardShell {
  return { reciprocityPct: Math.round(100 * reciprocity()) }
}

function metricsFromAnalytics(
  cwd: string,
  analytics: CorpusAnalytics,
): CorpusDashboardMetrics {
  const ent = analytics.entropy
  const graph = buildReadmeTypographyGraph(cwd)
  const ctx = buildReadmeCorpusContext(cwd)

  return {
    ...ent,
    folderCount: ent.sealedMass + ent.unsealedMass,
    sealedFolders: ent.sealedMass,
    unsealedFolders: ent.unsealedMass,
    reciprocityPct: Math.round(100 * reciprocity()),
    pathSamples: buildCorpusPathJournalSamples(CORPUS_JOURNAL_SAMPLE_PATHS, cwd, ctx, graph),
  }
}

/** Compute live corpus dashboard metrics (uncached). */
export function computeCorpusDashboardMetrics(cwd = process.cwd()): CorpusDashboardMetrics {
  return metricsFromAnalytics(cwd, deriveCorpusAnalytics(cwd))
}

/** Load live corpus entropy rollup for admin dashboard widgets (cached by content-uuid + TTL). */
export function loadCorpusEntropyRollup(
  cwd = process.cwd(),
  opts?: LoadCorpusEntropyRollupOpts,
): CorpusDashboardMetrics {
  const ttlMs = opts?.ttlMs ?? CORPUS_ROLLUP_CACHE_TTL_MS

  if (!opts?.force) {
    const hit = getCorpusEntropyRollupCache(cwd)
    if (hit) return hit.metrics
  }

  const analytics = deriveCorpusAnalytics(cwd)
  const metrics = metricsFromAnalytics(cwd, analytics)
  const contentUuid = readmeUuid(deriveModel(cwd, analytics))
  rollupCache = {
    contentUuid,
    cwd,
    expiresAt: Date.now() + ttlMs,
    metrics,
  }
  return metrics
}
