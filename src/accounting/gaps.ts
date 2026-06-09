/**
 * accounting/gaps — wave-batch entropy gap scan (OOM-safe horo waves).
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { bypassMathViolations } from '@/law/folder/ratchet-compute'
import { atomPathHasLedgerHook } from '@/path'
import {
  buildReadmeCorpusFrozenInputs,
  deriveFolderModel,
  materializeComputedFacesForPathsStable,
  type FolderReadmeModel,
} from '@/readme/compute'
import { aggregateCorpusEntropy, mergeCorpusEntropy } from '@/readme/entropy'
import { corpusPathWaveBatches } from '@/wave/scheduler'
import { maxWorkTamperPolicy } from '@/wave/policy'

const SRC = 'src'
const ROUND = (n: number): number => Math.round(n * 1000) / 1000

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

export interface AccountingGapsInWavesVerdict {
  readonly waves: readonly WaveAccountingGapBatch[]
  readonly corpusGapEb: number
  readonly corpusSealEb: number
  readonly corpusNetEb: number
  readonly corpusNetEbDeltaPotential: number
  readonly gapPathCount: number
  readonly p0Accounting: P0AccountingStatus
  readonly topGapsByWave: Readonly<Record<number, readonly string[]>>
}

export interface AccountingGapsInWavesOpts {
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
  if (readmeNet !== null && Math.abs(readmeNet - entropy.netEntropyEb) > 0.001) {
    out.push({ kind: 'entropy-drift', path: atomPath, detail: `README ${readmeNet} ≠ derived ${entropy.netEntropyEb}`, eb: Math.abs(readmeNet - entropy.netEntropyEb) })
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

export function accountingGapsInWaves(cwd = process.cwd(), opts: AccountingGapsInWavesOpts = {}): AccountingGapsInWavesVerdict {
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
  for (const batch of corpusPathWaveBatches({}, policy)) {
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
  return { waves, corpusGapEb: r.totalGapEb, corpusSealEb: r.totalSealEb, corpusNetEb: r.netEntropyEb, corpusNetEbDeltaPotential: ROUND(Math.max(0, r.netEntropyEb)), gapPathCount, p0Accounting: p0AccountingStatus(cwd, derive), topGapsByWave }
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

export function fixAccountingGapsOnP0(cwd = process.cwd(), opts: { readonly dryRun?: boolean } = {}): FixAccountingGapsResult {
  const targets = [P0_ACCOUNTING_ROOT, ...P0_ACCOUNTING_LEAVES]
  const paths: string[] = []
  let fixes = 0
  for (const p of targets) if (missingLedgerHook(p, cwd)) { paths.push(p); if (!opts.dryRun) fixes++ }
  if (!opts.dryRun) {
    const drifted = targets.filter((p) => { const m = deriveFolderModel(p, cwd); const n = parseReadmeNetEb(p, cwd); return n !== null && Math.abs(n - m.entropy.netEntropyEb) > 0.001 })
    if (drifted.length) { materializeComputedFacesForPathsStable(drifted, cwd); fixes += drifted.length; paths.push(...drifted) }
  }
  return { fixesApplied: fixes, paths: [...new Set(paths)] }
}

export function formatAccountingGapsReport(v: AccountingGapsInWavesVerdict): string {
  const L = [`accounting gaps — horo wave scan`, ``, `corpus gap ${v.corpusGapEb} eb · seal ${v.corpusSealEb} eb · net ${v.corpusNetEb} eb`, `delta potential ${v.corpusNetEbDeltaPotential} eb · gap paths ${v.gapPathCount}`, ``, `P0 parent sealed ${v.p0Accounting.parentSealed ? '✓' : '✗'} · net ${v.p0Accounting.parentNetEb} eb`]
  for (const leaf of v.p0Accounting.leaves) L.push(`  ${leaf.sealed ? '✓' : '✗'} ${leaf.path} · net ${leaf.netEb} eb`)
  L.push('', 'wave batches:')
  for (const w of v.waves) { L.push(`  wave ${w.wave}: net ${w.netEb} eb · ${w.paths.length} path(s)`); const t = v.topGapsByWave[w.wave] ?? []; if (t.length) L.push(`    top: ${t.slice(0, 10).join(', ')}`) }
  return L.join('\n')
}
