import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
/**
 * book/harmony-index — book-of-books index harmony rollup (volume list · metrics).
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { countSrcTopLevel, GITHUB_DIR_LIMIT, planVocabularyFold } from '@/navigation/github-browse'
import { HORO_DIGITS } from '@/horo'
import { reciprocity } from '@/entropy'
import {
  UUID_MATRIX_NODES,
  nodeOf,
  neighborsOf,
  backlinksOf,
} from '@/uuid/matrix'

const SKIP_TOP_LEVEL = new Set(['app', 'migrations'])
const VOCABULARY_HUB = 'vocabulary'

/** Metrics for the book-of-books index — each top-level folder is one volume. */
export interface BookIndexMetrics {
  readonly volumeCount: number
  readonly topLevelDirs: number
  readonly vocabularyNested: number
  readonly horoEvenness: number
  readonly sealedPct: number
  readonly trinityPct: number
  readonly literaryRatio: number
  readonly reciprocity: number
  readonly seqVsAlpha: number
  readonly offRing: number
}

/** Harmony rollup for the library index — derived, never hand-asserted. */
export interface BookIndexHarmony {
  readonly metrics: BookIndexMetrics
  readonly topHubs: readonly { readonly path: string; readonly bond: number }[]
  readonly foldCandidates: number
  readonly harmonic: boolean
  readonly score: number
  readonly impurities: readonly string[]
}

const round3 = (n: number): number => exactRound(n * 1000) / 1000

const bondRankOf = (atomPath: string): number => {
  const leaf = atomPath.split('/').pop() ?? atomPath
  const matrixKey = nodeOf(atomPath)?.atom ?? nodeOf(leaf)?.atom ?? leaf
  return backlinksOf(matrixKey).length + neighborsOf(matrixKey).length
}

/** Top-level index volumes — hub dirs under src/, excluding vocabulary shard hub. */
export function indexVolumes(cwd: string = process.cwd()): readonly string[] {
  const src = join(cwd, 'src')
  return readdirSync(src)
    .filter((e) => !SKIP_TOP_LEVEL.has(e) && statSync(join(src, e)).isDirectory())
    .filter((d) => d !== VOCABULARY_HUB)
    .sort((a, b) => a.localeCompare(b))
}

const sealedFromReadme = (cwd: string, volume: string): boolean => {
  const readme = join(cwd, 'src', volume, 'README.md')
  if (!existsSync(readme)) return false
  return /\[\[seal\]\] `1`/.test(readFileSync(readme, 'utf8'))
}

const trinityOf = (cwd: string, volume: string): { form: 0 | 1; code: 0 | 1; proof: 0 | 1 } => {
  const base = join(cwd, 'src', volume)
  return {
    form: (existsSync(join(base, 'SKILL.md')) || existsSync(join(base, 'README.md')) ? 1 : 0) as 0 | 1,
    code: (existsSync(join(base, 'index.ts')) ? 1 : 0) as 0 | 1,
    proof: (existsSync(join(base, 'index.test.ts')) || existsSync(join(base, 'test.ts')) ? 1 : 0) as 0 | 1,
  }
}

/** Compute book-of-books index harmony — horo spread · seal · trinity · reciprocity · order. */
export function harmonyOfBookIndex(cwd: string = process.cwd()): BookIndexHarmony {
  const volumes = indexVolumes(cwd)
  const n = volumes.length
  const src = join(cwd, 'src')
  const vocabNested = existsSync(join(src, VOCABULARY_HUB))
    ? readdirSync(join(src, VOCABULARY_HUB)).filter((e) => statSync(join(src, VOCABULARY_HUB, e)).isDirectory())
        .length
    : 0

  let sealed = 0
  let trinity = 0
  let formOnly = 0
  let offRing = 0
  const horoAcc = new Map<number, number>()
  for (const d of volumes) {
    if (sealedFromReadme(cwd, d)) sealed++
    const t = trinityOf(cwd, d)
    if (t.form && t.code && t.proof) trinity++
    if (t.form && !t.code) formOnly++
    const h = nodeOf(d)?.horo
    if (h !== undefined && h !== null && HORO_DIGITS.includes(h as (typeof HORO_DIGITS)[number])) {
      horoAcc.set(h, (horoAcc.get(h) ?? 0) + 1)
    } else {
      offRing++
    }
  }

  const horoIdeal = n / HORO_DIGITS.length
  const horoVar =
    HORO_DIGITS.reduce((s, d) => s + algebraFloatPow((horoAcc.get(d) ?? 0) - horoIdeal, 2), 0) / HORO_DIGITS.length
  const horoEvenness = n > 0 ? exactMax(0, 1 - algebraSqrt(horoVar) / horoIdeal) : 0

  const rec = reciprocity()
  const roots = UUID_MATRIX_NODES.filter((r) => r.path && !r.path.includes('/'))
  const seq = roots.map((r) => r.path!)
  const alpha = [...seq].sort((a, b) => a.localeCompare(b))
  let conc = 0
  let disc = 0
  for (let i = 0; i < seq.length; i++) {
    for (let j = i + 1; j < seq.length; j++) {
      if (alpha.indexOf(seq[i]!) < alpha.indexOf(seq[j]!)) conc++
      else disc++
    }
  }
  const seqVsAlpha = conc + disc > 0 ? conc / (conc + disc) : 1

  const counts = countSrcTopLevel(cwd)
  const fold = planVocabularyFold({ cwd })
  const sealedPct = n > 0 ? sealed / n : 0
  const trinityPct = n > 0 ? trinity / n : 0
  const literaryRatio = n > 0 ? formOnly / n : 0

  const metrics: BookIndexMetrics = {
    volumeCount: n,
    topLevelDirs: counts.dirs,
    vocabularyNested: vocabNested,
    horoEvenness: round3(horoEvenness),
    sealedPct: round3(sealedPct),
    trinityPct: round3(trinityPct),
    literaryRatio: round3(literaryRatio),
    reciprocity: round3(rec.fraction),
    seqVsAlpha: round3(seqVsAlpha),
    offRing,
  }

  const impurities: string[] = []
  if (counts.dirs > GITHUB_DIR_LIMIT) {
    impurities.push(`top-level ${counts.dirs} > GitHub limit ${GITHUB_DIR_LIMIT}`)
  }
  if (horoEvenness < 0.7) impurities.push(`horo uneven (evenness ${metrics.horoEvenness})`)
  if (offRing > 0) impurities.push(`off-ring horo: ${offRing} index volumes`)
  if (sealedPct < 0.8) impurities.push(`sealed % low: ${round3(sealedPct * 100)}%`)
  if (literaryRatio > 0.3) {
    impurities.push(`literary ratio high: ${exactRound(literaryRatio * 100)}% form-only at index`)
  }
  if (rec.fraction < 0.99) impurities.push('bond reciprocity asymmetric')
  if (trinityPct < 0.5) impurities.push(`trinity incomplete: ${round3(trinityPct * 100)}%`)
  if (seqVsAlpha > 0.55) {
    impurities.push(
      `sequence chain alphabetical (concordance ${metrics.seqVsAlpha}) — horo order lost at index`,
    )
  }

  const scores = [
    counts.dirs <= GITHUB_DIR_LIMIT ? 1 : 0,
    horoEvenness,
    sealedPct,
    1 - exactMin(1, literaryRatio * 2),
    rec.fraction,
    1 - seqVsAlpha,
    trinityPct,
    offRing === 0 ? 1 : exactMax(0, 1 - offRing / n),
  ]
  const score = round3(scores.reduce((a, b) => a + b, 0) / scores.length)
  const harmonic = score >= 0.65 && counts.dirs <= GITHUB_DIR_LIMIT && impurities.length <= 3

  const topHubs = volumes
    .map((path) => ({ path, bond: bondRankOf(path) }))
    .sort((a, b) => b.bond - a.bond || a.path.localeCompare(b.path))

  return {
    metrics,
    topHubs,
    foldCandidates: fold.candidates.length,
    harmonic,
    score,
    impurities,
  }
}

/** Verdict — harmonic iff score ≥ 0.65, within GitHub limit, ≤ 3 impurities. */
export function isHarmonicIndex(cwd: string = process.cwd()): {
  readonly harmonic: boolean
  readonly score: number
  readonly impurities: readonly string[]
} {
  const { harmonic, score, impurities } = harmonyOfBookIndex(cwd)
  return { harmonic, score, impurities }
}

/** Root README pivot — book-of-books index volume count + harmony score. */
export function bookOfBooksIndexPivotLine(cwd: string = process.cwd()): string {
  const { metrics, score } = harmonyOfBookIndex(cwd)
  return `book of books index: **${metrics.volumeCount}** volumes · harmony score **${score}**`
}
