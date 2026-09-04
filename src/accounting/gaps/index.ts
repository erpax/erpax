/**
 * accounting/gaps — wave-batch entropy gap scan (OOM-safe horo waves).
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { bypassMathViolations } from '@/law/folder/ratchet/compute'
import { atomPathHasLedgerHook } from '@/path'
import {
  buildReadmeCorpusFrozenInputs,
  deriveFolderModel,
  listAtomPaths,
  schemaCollision,
  materializeComputedFacesForPathsStable,
  type FolderReadmeModel,
} from '@/readme/compute'
import { aggregateCorpusEntropy, mergeCorpusEntropy } from '@/readme/entropy'
import { corpusPathWaveBatches, pathWaveBatches } from '@/wave/scheduler'
import { maxWorkTamperPolicy } from '@/wave/policy'
import { exactRound, exactAbs, exactMax } from '@/algebra'

const SRC = 'src'
const ROUND = (n: number): number => exactRound(n * 1000) / 1000

export const P0_ACCOUNTING_ROOT = 'accounting' as const
export const P0_ACCOUNTING_LEAVES = [
  'accounting/analysis',
  'accounting/balance',
  'accounting/coa',
  'accounting/corpus',
  'accounting/debit',
  'accounting/ledger',
  'accounting/margin',
  'accounting/money',
  'accounting/reports',
] as const

export type WaveAccountingImpurityKind =
  | 'gap-eb'
  | 'missing-hook'
  | 'entropy-drift'
  | 'bypass-math'
  | 'ancestor-eb'

export interface WaveAccountingImpurity {
  readonly kind: WaveAccountingImpurityKind
  readonly path: string
  readonly detail: string
  readonly eb?: number
}

export interface WaveAccountingGapBatch {
  readonly wave: number
  readonly paths: readonly string[]
  readonly gapEb: number
  readonly sealEb: number
  readonly netEb: number
  readonly impurities: readonly WaveAccountingImpurity[]
}

export interface P0AccountingStatus {
  readonly parentSealed: boolean
  readonly parentNetEb: number
  readonly leaves: readonly { readonly path: string; readonly sealed: boolean; readonly netEb: number; readonly gapEb: number }[]
}

export interface GapsInWavesVerdict {
  readonly waves: readonly WaveAccountingGapBatch[]
  readonly corpusGapEb: number
  readonly corpusSealEb: number
  readonly corpusNetEb: number
  readonly corpusNetEbDeltaPotential: number
  readonly gapPathCount: number
  readonly p0Accounting: P0AccountingStatus
  readonly topGapsByWave: Readonly<Record<number, readonly string[]>>
}

export interface GapsInWavesOpts {
  readonly maxWaves?: number
  readonly topPerWave?: number
}

export interface FixAccountingGapsResult {
  readonly fixesApplied: number
  readonly paths: readonly string[]
}

const parseReadmeNetEb = (atomPath: string, cwd: string): number | null => {
  const p = join(cwd, SRC, atomPath, 'README.md')
  if (!existsSync(p)) return null
  const m = readFileSync(p, 'utf8').match(/net residual\s+`([-\d.]+)`\s+eb/)
  return m ? Number(m[1]) : null
}

const missingLedgerHook = (atomPath: string, cwd: string): boolean =>
  existsSync(join(cwd, SRC, atomPath, 'index.ts')) && !atomPathHasLedgerHook(atomPath)

const impuritiesForModel = (
  model: FolderReadmeModel,
  cwd: string,
  parent: FolderReadmeModel | undefined,
  globalBypass: readonly { readonly reason: string }[],
): WaveAccountingImpurity[] => {
  const out: WaveAccountingImpurity[] = []
  const { atomPath, entropy } = model
  if (entropy.totalGapEb > 0 || entropy.netEntropyEb > 0) {
    out.push({ kind: 'gap-eb', path: atomPath, detail: `net ${entropy.netEntropyEb} eb`, eb: entropy.netEntropyEb })
  }
  if (missingLedgerHook(atomPath, cwd)) {
    out.push({ kind: 'missing-hook', path: atomPath, detail: 'missing ATOM_LEDGER_PATHS hook' })
  }
  const readmeNet = parseReadmeNetEb(atomPath, cwd)
  if (readmeNet !== null && exactAbs(readmeNet - entropy.netEntropyEb) > 0.001) {
    out.push({ kind: 'entropy-drift', path: atomPath, detail: `README ${readmeNet} ≠ derived ${entropy.netEntropyEb}`, eb: exactAbs(readmeNet - entropy.netEntropyEb) })
  }
  if (parent && entropy.netEntropyEb > 0 && parent.sealed && parent.entropy.netEntropyEb === 0) {
    out.push({ kind: 'ancestor-eb', path: atomPath, detail: 'sealed parent net 0', eb: entropy.netEntropyEb })
  }
  if (atomPath === P0_ACCOUNTING_ROOT && globalBypass[0]) {
    out.push({ kind: 'bypass-math', path: atomPath, detail: globalBypass[0].reason })
  }
  return out
}

const topGapPaths = (impurities: readonly WaveAccountingImpurity[], limit: number): string[] =>
  [...new Set(impurities.filter((i) => i.eb && i.eb > 0).sort((a, b) => (b.eb ?? 0) - (a.eb ?? 0)).map((i) => i.path))].slice(0, limit)

export function accountingGapsInWaves(cwd = process.cwd(), opts: GapsInWavesOpts = {}): GapsInWavesVerdict {
  const maxWaves = opts.maxWaves ?? Number.POSITIVE_INFINITY
  const topPerWave = opts.topPerWave ?? 20
  const { graph, ctx } = buildReadmeCorpusFrozenInputs(cwd)
  const policy = maxWorkTamperPolicy()
  const globalBypass = bypassMathViolations(cwd)
  const cache = new Map<string, FolderReadmeModel>()
  const derive = (p: string) => {
    let m = cache.get(p)
    if (!m) { m = deriveFolderModel(p, cwd, ctx, graph); cache.set(p, m) }
    return m
  }
  const waves: WaveAccountingGapBatch[] = []
  let rollup: ReturnType<typeof aggregateCorpusEntropy> | null = null
  let gapPathCount = 0
  let n = 0
  // #17 fix: the real corpus walks the generated matrix (fast); a FIXTURE cwd must schedule its OWN
  // filesystem paths, or it re-measures the real corpus. The real-corpus count is unchanged.
  const batches =
    cwd === process.cwd() ? corpusPathWaveBatches({}, policy) : pathWaveBatches(listAtomPaths(cwd), policy)
  for (const batch of batches) {
    if (n >= maxWaves) break
    n++
    let gapEb = 0, sealEb = 0, netEb = 0
    const impurities: WaveAccountingImpurity[] = []
    const gapPaths: string[] = []
    for (const atomPath of batch.items) {
      const model = derive(atomPath)
      const parentPath = atomPath.includes('/') ? atomPath.slice(0, atomPath.lastIndexOf('/')) : ''
      const parent = parentPath ? derive(parentPath) : undefined
      gapEb = ROUND(gapEb + model.entropy.totalGapEb)
      sealEb = ROUND(sealEb + model.entropy.totalSealEb)
      netEb = ROUND(netEb + model.entropy.netEntropyEb)
      impurities.push(...impuritiesForModel(model, cwd, parent, globalBypass))
      if (model.entropy.netEntropyEb > 0 || model.entropy.totalGapEb > 0) { gapPaths.push(atomPath); gapPathCount++ }
    }
    const batchRollup = aggregateCorpusEntropy(batch.items.map((p) => { const m = derive(p); return { entropy: m.entropy, sealed: m.sealed, typography: m.typography } }))
    rollup = rollup ? mergeCorpusEntropy(rollup, batchRollup) : batchRollup
    waves.push({ wave: batch.ordinal, paths: gapPaths, gapEb, sealEb, netEb, impurities })
  }
  const r = rollup ?? aggregateCorpusEntropy([])
  const topGapsByWave: Record<number, string[]> = {}
  for (const w of waves) topGapsByWave[w.wave] = topGapPaths(w.impurities, topPerWave)
  return { waves, corpusGapEb: r.totalGapEb, corpusSealEb: r.totalSealEb, corpusNetEb: r.netEntropyEb, corpusNetEbDeltaPotential: ROUND(exactMax(0, r.netEntropyEb)), gapPathCount, p0Accounting: p0AccountingStatus(cwd, derive), topGapsByWave }
}

export function p0AccountingStatus(cwd: string, derive?: (p: string) => FolderReadmeModel): P0AccountingStatus {
  const modelOf = derive ?? (() => { const f = buildReadmeCorpusFrozenInputs(cwd); return (p: string) => deriveFolderModel(p, cwd, f.ctx, f.graph) })()
  const parent = modelOf(P0_ACCOUNTING_ROOT)
  return { parentSealed: parent.sealed, parentNetEb: parent.entropy.netEntropyEb, leaves: P0_ACCOUNTING_LEAVES.map((path) => { const m = modelOf(path); return { path, sealed: m.sealed, netEb: m.entropy.netEntropyEb, gapEb: m.entropy.totalGapEb } }) }
}

export function waveAccountingGapViolations(cwd = process.cwd()) {
  const verdict = accountingGapsInWaves(cwd, { maxWaves: 7 })
  return { count: verdict.gapPathCount, netEb: verdict.corpusNetEb, verdict }
}

export function fixGapsOnP0(cwd = process.cwd(), opts: { readonly dryRun?: boolean } = {}): FixAccountingGapsResult {
  const targets = [P0_ACCOUNTING_ROOT, ...P0_ACCOUNTING_LEAVES]
  const paths: string[] = []
  let fixes = 0
  for (const p of targets) if (missingLedgerHook(p, cwd)) { paths.push(p); if (!opts.dryRun) fixes++ }
  if (!opts.dryRun) {
    const drifted = targets.filter((p) => { const m = deriveFolderModel(p, cwd); const n = parseReadmeNetEb(p, cwd); return n !== null && exactAbs(n - m.entropy.netEntropyEb) > 0.001 })
    if (drifted.length) { materializeComputedFacesForPathsStable(drifted, cwd); fixes += drifted.length; paths.push(...drifted) }
  }
  return { fixesApplied: fixes, paths: [...new Set(paths)] }
}

export function formatAccountingGapsReport(v: GapsInWavesVerdict): string {
  const L = [`accounting gaps — horo wave scan`, ``, `corpus gap ${v.corpusGapEb} eb · seal ${v.corpusSealEb} eb · net ${v.corpusNetEb} eb`, `delta potential ${v.corpusNetEbDeltaPotential} eb · gap paths ${v.gapPathCount}`, ``, `P0 parent sealed ${v.p0Accounting.parentSealed ? '✓' : '✗'} · net ${v.p0Accounting.parentNetEb} eb`]
  for (const leaf of v.p0Accounting.leaves) L.push(`  ${leaf.sealed ? '✓' : '✗'} ${leaf.path} · net ${leaf.netEb} eb`)
  L.push('', 'wave batches:')
  for (const w of v.waves) { L.push(`  wave ${w.wave}: net ${w.netEb} eb · ${w.paths.length} path(s)`); const t = v.topGapsByWave[w.wave] ?? []; if (t.length) L.push(`    top: ${t.slice(0, 10).join(', ')}`) }
  return L.join('\n')
}

/** @index-cross.foldback child=accounting/gaps parent=accounting — this cross folds back into its parent. */

export interface GapClass {
  readonly source: string
  readonly rows: number
  readonly eb: number
}

export interface GapComposition {
  readonly gapPaths: number
  readonly totalEb: number
  readonly bySource: readonly GapClass[]
  /** Atoms flagged for missing code that DECLARE themselves a schema.org vocabulary word. */
  readonly proseByDesign: readonly string[]
  /** Atoms flagged for missing code that do not — the genuine trinity debt. */
  readonly realDebt: readonly string[]
}

/**
 * Is this atom's leaf actually a schema.org word? Asked of schema.org, not of the atom.
 *
 * The first version read each SKILL for the sentence "a schema.org vocabulary word, collided" —
 * and that is CIRCULAR: the note was written to justify the classification, so reading it
 * confirms the prose rather than the fact. A sibling repo hit the identical loop classifying
 * prior-art rows by the wording of each row's own note and got 13 of 13.
 *
 * `schemaCollision().words` is derived from `sti/vocabulary/schemaorg.jsonld` — the vocabulary
 * itself — so the atom does not get a vote on what it is.
 */
const isSchemaWord = (leaf: string, cwd: string): boolean => schemaCollision(cwd).words.has(leaf)

/**
 * What `accounting-wave` is actually made of — the decomposition nobody had taken.
 *
 * The axis sat at 882 with a baseline of 0 for the whole session and was never diagnosed, because
 * a single number cannot be argued with. It is not one defect: it is 504 atoms with a SKILL and
 * no code or proof, a 479-atom ancestor cascade from those, 248 stray directories, and 132 atoms
 * with no materialised deployment face.
 *
 * And the 504 split further. `vocabulary/` atoms are prose BY DESIGN and are already excluded —
 * but the exclusion is POSITIONAL: it recognises a prose atom by where it LIVES, not by what it
 * IS. So 382 atoms whose leaf is a real schema.org word are counted as debt while their 1,676
 * siblings under `vocabulary/` are not. That is criterion substitution — a test easier to check
 * than the property it stands for.
 *
 * Measured 2026-09-05: 504 = 382 prose-by-design + **122 genuine trinity debt**. The honest
 * number is 122, and it is a list of real atoms — admin, camt052, consent, ecommerce — not a
 * vocabulary.
 */
export function gapComposition(cwd = process.cwd()): GapComposition {
  const frozen = buildReadmeCorpusFrozenInputs(cwd)
  const rows = new Map<string, { rows: number; eb: number }>()
  const missingCode: string[] = []
  let gapPaths = 0
  let totalEb = 0
  for (const atomPath of listAtomPaths(cwd)) {
    const model = deriveFolderModel(atomPath, cwd, frozen.ctx, frozen.graph)
    const gaps = model.entropy.gaps ?? []
    if (gaps.length > 0) gapPaths++
    for (const g of gaps) {
      const cur = rows.get(g.source) ?? { rows: 0, eb: 0 }
      rows.set(g.source, { rows: cur.rows + 1, eb: cur.eb + (g.comparable ?? 0) })
      totalEb += g.comparable ?? 0
      if (String(g.source).includes('trinity.code missing')) missingCode.push(atomPath)
    }
  }
  const proseByDesign: string[] = []
  const realDebt: string[] = []
  for (const atomPath of missingCode) {
    const leaf = atomPath.slice(atomPath.lastIndexOf('/') + 1)
    ;(isSchemaWord(leaf, cwd) ? proseByDesign : realDebt).push(atomPath)
  }
  return {
    gapPaths,
    totalEb: Number(totalEb.toFixed(1)),
    bySource: [...rows]
      .map(([source, v]) => ({ source, rows: v.rows, eb: Number(v.eb.toFixed(1)) }))
      .sort((a, b) => b.eb - a.eb),
    proseByDesign,
    realDebt,
  }
}
