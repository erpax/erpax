/**
 * wave/scheduler — batched readme/matrix jobs in horo waves (OOM guard).
 *
 * Replaces one-shot `followEveryPathAll` loads with wave-balanced batches.
 *
 * @see ../path · ../readme/index.ts · ./load.ts
 */
import { followEveryPathAll } from '@/path'
import {
  selfBalancingWaveLoad,
  pathComparableUnits,
  type SelfBalancingWaveLoadOpts,
  type SelfBalancingWavePlan,
  type WaveBatch,
} from './load'
import {
  maxWorkTamperPolicy,
  literaryWordWavePriority,
  isP0BlockingAtom,
  type MaxWorkTamperPolicy,
} from './policy'
import { buildImportIndex, caseOf } from '@/rules/word-without-logic'

export interface CorpusWaveScheduleOpts extends SelfBalancingWaveLoadOpts<string> {
  readonly root?: string
}

/** Wave schedule opts from max-work max-tamper policy. */
export function corpusWaveOptsFromPolicy(
  root?: string,
  policy: MaxWorkTamperPolicy = maxWorkTamperPolicy(),
): CorpusWaveScheduleOpts {
  return {
    root,
    maxUnitsPerWave: policy.maxUnitsPerWave,
    maxItemsPerWave: Math.ceil(3087 / policy.waveDepth),
    weightOf: pathComparableUnits,
  }
}

/** Schedule full matrix path walk as self-balanced horo waves. */
export function scheduleCorpusPathsInWaves(
  opts: CorpusWaveScheduleOpts = {},
): SelfBalancingWavePlan<string> {
  const paths = followEveryPathAll(opts.root)
  return selfBalancingWaveLoad(paths, {
    weightOf: opts.weightOf ?? pathComparableUnits,
    maxUnitsPerWave: opts.maxUnitsPerWave,
    maxItemsPerWave: opts.maxItemsPerWave,
    waveOrdinalStart: opts.waveOrdinalStart,
  })
}

/** Policy-driven schedule — 7×441 paths at max work throughput. */
export function scheduleCorpusPathsWithPolicy(
  opts: CorpusWaveScheduleOpts = {},
  policy: MaxWorkTamperPolicy = maxWorkTamperPolicy(),
): SelfBalancingWavePlan<string> {
  return scheduleCorpusPathsInWaves({
    ...corpusWaveOptsFromPolicy(opts.root, policy),
    ...opts,
  })
}

/** Wave schedule opts — P0 import blockers + literary offenders weighted first. */
export function corpusWaveOptsLiteraryPriority(
  cwd: string = process.cwd(),
  root?: string,
  policy: MaxWorkTamperPolicy = maxWorkTamperPolicy(),
): CorpusWaveScheduleOpts {
  const base = corpusWaveOptsFromPolicy(root, policy)
  const importIndex = buildImportIndex(cwd)
  return {
    ...base,
    weightOf: (path: string) => {
      const uc = caseOf(path, cwd, importIndex)
      const units = pathComparableUnits(path)
      const boost = literaryWordWavePriority(path, {
        literary: uc.isLiterary,
        importerCount: uc.importerCount,
      })
      const p0Literary = isP0BlockingAtom(path) && uc.isLiterary ? 500 : 0
      return units + boost + p0Literary
    },
  }
}

/** Lazy generator — one wave batch at a time (readme verify / matrix jobs). */
export function* corpusPathWaveBatches(
  opts: CorpusWaveScheduleOpts = {},
  policy?: MaxWorkTamperPolicy,
): Generator<WaveBatch<string>> {
  const plan = policy ? scheduleCorpusPathsWithPolicy(opts, policy) : scheduleCorpusPathsInWaves(opts)
  for (const wave of plan.waves) yield wave
}

/**
 * Process wave batches in policy-sized parallel chunks (disjoint paths — safe).
 * Sync runner: each chunk processes up to `batchConcurrency` waves before yielding.
 */
export function runCorpusWaveChunks<T>(
  fn: (wave: WaveBatch<string>) => T,
  opts: CorpusWaveScheduleOpts = {},
  policy: MaxWorkTamperPolicy = maxWorkTamperPolicy(),
): T[] {
  const plan = scheduleCorpusPathsWithPolicy(opts, policy)
  const results: T[] = []
  for (let i = 0; i < plan.waves.length; i += policy.batchConcurrency) {
    const chunk = plan.waves.slice(i, i + policy.batchConcurrency)
    for (const wave of chunk) {
      results.push(fn(wave))
    }
  }
  return results
}
