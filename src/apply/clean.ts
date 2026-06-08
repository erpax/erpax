/**
 * apply/clean — coordinated dry-clean cycle (scan → classify → apply → measure → ratchet → emit).
 *
 * Composes with efficiencySnapshot, direction bus, and rules ratchet — one orchestrated pass
 * per session with measurable deltas. Default dry-run; --apply executes safe class C only.
 *
 *   pnpm erpax clean [--apply] [--force]
 *   pnpm erpax apply clean [--apply] [--force]
 *
 * @see ./efficiency — ./emit-efficiency — ../quantum/entanglement/direction-bus
 */
import { createHash } from 'node:crypto'
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join, relative } from 'node:path'
import {
  cleanDirectionPath,
  interruptTokenFor,
  isDirectionStale,
  type InterruptToken,
} from '@/quantum/entanglement/direction-bus'

export { cleanDirectionPath } from '@/quantum/entanglement/direction-bus'
import { bypassMathViolations } from '@/law/folder/ratchet-compute'
import { computedBaseline } from '@/law/folder/baseline'
import { concentrationViolations } from '@/rules/concentration'
import { wordMatterViolations } from '@/rules/word-matter'
import { strayTsViolations } from '@/rules/tightened-scans'
import { liveViolationCounts } from '@/law/folder/live-counts'
import { RATCHET_AXES } from '@/law/folder/ratchet-math'
import {
  efficiencyRatchet,
  efficiencySnapshot,
  loadEfficiencyStore,
  recordEfficiencyPass,
  renderEfficiencyDelta,
  formatEfficiencySummary,
  type EfficiencyMetrics,
  type EfficiencySnapshot,
  type EfficiencyRatchetVerdict,
} from './efficiency'
import { emitEfficiency } from './emit-efficiency'

export const CLEAN_MANIFEST_REL = join('src', 'apply', 'clean.manifest.generated.json')

/** Scan axes — coordinated with rules ratchet + doctor stray-ts line. */
export const CLEAN_SCAN_AXES = [
  'stray-ts',
  'not-allowed',
  'bypass-math',
  'word-matter',
  'logic-concentration',
] as const

export type CleanScanAxis = (typeof CLEAN_SCAN_AXES)[number]

/** cc3c5cb1 taxonomy — A emit · B nest · C delete · D rule-fix. */
export type CleanTaxonomy = 'A-emit' | 'B-nest' | 'C-delete' | 'D-rule-fix'

export interface CleanFinding {
  readonly taxonomy: CleanTaxonomy
  readonly axis: CleanScanAxis | 'sidecar'
  readonly path: string
  readonly detail: string
  readonly safeAuto: boolean
}

export interface CleanAxisCount {
  readonly count: number
  readonly baseline: number
  readonly overBaseline: number
}

export interface CleanScanResult {
  readonly axes: Readonly<Record<CleanScanAxis, CleanAxisCount>>
  readonly findings: readonly CleanFinding[]
  readonly fingerprint: string
}

export interface CleanApplyResult {
  readonly applied: readonly string[]
  readonly skipped: readonly string[]
  readonly errors: readonly string[]
}

export interface CleanManifest {
  readonly _law: string
  readonly cycleId: string
  readonly completedAt: string
  readonly dryRun: boolean
  readonly fingerprint: string
  readonly axes: Readonly<Record<CleanScanAxis, CleanAxisCount>>
  readonly taxonomy: Readonly<Record<CleanTaxonomy, number>>
  readonly applied: readonly string[]
  readonly efficiency?: {
    readonly before: EfficiencyMetrics
    readonly after: EfficiencyMetrics
    readonly ratchetOk: boolean
  }
}

export interface DryCleanCycleOpts {
  readonly cwd?: string
  readonly dryRun?: boolean
  readonly force?: boolean
  readonly agentId?: string
  readonly token?: InterruptToken
  /** Test / partial override — skip live measure for supplied keys. */
  readonly metrics?: Partial<EfficiencyMetrics>
}

export interface DryCleanCycleResult {
  readonly aborted: boolean
  readonly abortReason?: string
  readonly scan: CleanScanResult
  readonly apply: CleanApplyResult
  readonly before: EfficiencySnapshot
  readonly after: EfficiencySnapshot
  readonly ratchet: EfficiencyRatchetVerdict
  readonly manifest: CleanManifest
  readonly skippedScan: boolean
  readonly emitted: readonly string[]
}

const MANIFEST_LAW =
  'emit-only — dry-clean manifest; never hand-edit; re-run pnpm erpax clean to refresh'

const HAND_ARTIFACTS = [
  join('src', 'law', 'folder', 'ratchet.json'),
  join('src', 'apply', 'efficiency.json'),
] as const

const SIDECAR_GLOBS = ['.bak', '.tmp'] as const

const isDir = (p: string): boolean => {
  try {
    return statSync(p).isDirectory()
  } catch {
    return false
  }
}

const walkFiles = (root: string, rel = ''): string[] => {
  const out: string[] = []
  let entries: string[]
  try {
    entries = readdirSync(root)
  } catch {
    return out
  }
  for (const e of entries) {
    if (e === 'node_modules' || e.startsWith('.git')) continue
    const abs = join(root, e)
    const r = rel ? `${rel}/${e}` : e
    if (isDir(abs)) {
      out.push(...walkFiles(abs, r))
    } else {
      out.push(r)
    }
  }
  return out
}

const scanSidecars = (cwd: string): CleanFinding[] => {
  const findings: CleanFinding[] = []
  for (const rel of walkFiles(cwd)) {
    const base = rel.split('/').pop() ?? rel
    if (SIDECAR_GLOBS.some((s) => base.endsWith(s))) {
      findings.push({
        taxonomy: 'C-delete',
        axis: 'sidecar',
        path: rel,
        detail: 'session debris sidecar',
        safeAuto: true,
      })
    }
  }
  return findings
}

const scanHandBaselines = (cwd: string): CleanFinding[] => {
  const findings: CleanFinding[] = []
  for (const rel of HAND_ARTIFACTS) {
    const abs = join(cwd, rel)
    if (!existsSync(abs)) continue
    findings.push({
      taxonomy: 'A-emit',
      axis: 'bypass-math',
      path: rel,
      detail: 'hand baseline — emit generated artefact then delete',
      safeAuto: rel.endsWith('efficiency.json'),
    })
    if (rel.endsWith('ratchet.json')) {
      findings.push({
        taxonomy: 'C-delete',
        axis: 'bypass-math',
        path: rel,
        detail: 'hand ratchet.json — delete; run pnpm erpax rules ratchet',
        safeAuto: true,
      })
    }
  }
  return findings
}

const countNotAllowedAxes = (cwd: string): number => {
  const live = liveViolationCounts(cwd)
  let over = 0
  for (const axis of RATCHET_AXES) {
    try {
      const baseline = computedBaseline(axis, cwd)
      if (live[axis] > baseline) over++
    } catch {
      // axis not yet sealed in ratchet.generated — skip
    }
  }
  return over
}

const safeBaseline = (axis: Parameters<typeof computedBaseline>[0], cwd: string): number => {
  try {
    return computedBaseline(axis, cwd)
  } catch {
    return 0
  }
}

/** Parallel-safe scan of coordinated axes + sidecars. */
export function scanCleanAxes(cwd: string = process.cwd()): CleanScanResult {
  const stray = strayTsViolations(cwd)
  const wordMatter = wordMatterViolations(cwd)
  const concentration = concentrationViolations(cwd)
  const bypass = bypassMathViolations(cwd)

  const notAllowedCount = countNotAllowedAxes(cwd)

  const axes: Record<CleanScanAxis, CleanAxisCount> = {
    'stray-ts': {
      count: stray.length,
      baseline: safeBaseline('stray-ts', cwd),
      overBaseline: Math.max(0, stray.length - safeBaseline('stray-ts', cwd)),
    },
    'not-allowed': {
      count: notAllowedCount,
      baseline: 0,
      overBaseline: notAllowedCount,
    },
    'bypass-math': {
      count: bypass.length,
      baseline: 0,
      overBaseline: bypass.length,
    },
    'word-matter': {
      count: wordMatter.length,
      baseline: safeBaseline('word-matter', cwd),
      overBaseline: Math.max(0, wordMatter.length - safeBaseline('word-matter', cwd)),
    },
    'logic-concentration': {
      count: concentration.length,
      baseline: safeBaseline('logic-concentration', cwd),
      overBaseline: Math.max(0, concentration.length - safeBaseline('logic-concentration', cwd)),
    },
  }

  const findings: CleanFinding[] = [
    ...scanSidecars(cwd),
    ...scanHandBaselines(cwd),
    ...stray.slice(0, 20).map(
      (v): CleanFinding => ({
        taxonomy: 'B-nest',
        axis: 'stray-ts',
        path: join('src', v.atomPath, v.file),
        detail: v.reason,
        safeAuto: false,
      }),
    ),
    ...bypass.map(
      (v): CleanFinding => ({
        taxonomy: 'D-rule-fix',
        axis: 'bypass-math',
        path: v.axis === 'artifact' ? 'artifact' : `axis:${v.axis}`,
        detail: v.reason,
        safeAuto: false,
      }),
    ),
    ...wordMatter.slice(0, 10).map(
      (v): CleanFinding => ({
        taxonomy: 'D-rule-fix',
        axis: 'word-matter',
        path: v.file,
        detail: `${v.kind}: ${v.reason}`,
        safeAuto: false,
      }),
    ),
    ...concentration.slice(0, 5).map(
      (v): CleanFinding => ({
        taxonomy: 'D-rule-fix',
        axis: 'logic-concentration',
        path: join('src', v.atomPath, v.file),
        detail: v.reason,
        safeAuto: false,
      }),
    ),
  ]

  const fingerprint = createHash('sha256')
    .update(JSON.stringify(axes))
    .digest('hex')
    .slice(0, 16)

  return { axes, findings, fingerprint }
}

/** Classify findings by taxonomy bucket counts. */
export function classifyCleanFindings(
  findings: readonly CleanFinding[],
): Record<CleanTaxonomy, number> {
  const counts: Record<CleanTaxonomy, number> = {
    'A-emit': 0,
    'B-nest': 0,
    'C-delete': 0,
    'D-rule-fix': 0,
  }
  for (const f of findings) counts[f.taxonomy]++
  return counts
}

/** Apply safe auto-fixes only (C-delete + efficiency A-emit). */
export function applySafeCleanFixes(
  findings: readonly CleanFinding[],
  cwd: string = process.cwd(),
  dryRun = true,
): CleanApplyResult {
  const applied: string[] = []
  const skipped: string[] = []
  const errors: string[] = []

  const safe = findings.filter((f) => f.safeAuto)

  for (const f of safe) {
    if (f.taxonomy === 'A-emit' && f.path.endsWith('efficiency.json')) {
      if (dryRun) {
        skipped.push(`${f.path} (dry-run: would emit efficiency.generated.json)`)
        continue
      }
      try {
        emitEfficiency(cwd)
        applied.push('emit:efficiency.generated.json')
      } catch (e) {
        errors.push(`emit efficiency: ${e instanceof Error ? e.message : String(e)}`)
      }
      continue
    }

    if (f.taxonomy !== 'C-delete') {
      skipped.push(`${f.path} (${f.taxonomy} — human-gate)`)
      continue
    }

    const abs = join(cwd, f.path)
    if (!existsSync(abs)) {
      skipped.push(`${f.path} (missing)`)
      continue
    }
    if (dryRun) {
      skipped.push(`${f.path} (dry-run: would delete)`)
      continue
    }
    try {
      unlinkSync(abs)
      applied.push(f.path)
    } catch (e) {
      errors.push(`delete ${f.path}: ${e instanceof Error ? e.message : String(e)}`)
    }
  }

  return { applied, skipped, errors }
}

export function cleanManifestPath(cwd: string = process.cwd()): string {
  return join(cwd, CLEAN_MANIFEST_REL)
}

export function loadCleanManifest(cwd: string = process.cwd()): CleanManifest | null {
  const path = cleanManifestPath(cwd)
  if (!existsSync(path)) return null
  return JSON.parse(readFileSync(path, 'utf8')) as CleanManifest
}

export function persistCleanManifest(manifest: CleanManifest, cwd: string = process.cwd()): void {
  const path = cleanManifestPath(cwd)
  const dir = dirname(path)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(path, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
}

const shouldSkipScan = (
  prior: CleanManifest | null,
  fingerprint: string,
  force: boolean,
): boolean => !force && prior !== null && prior.fingerprint === fingerprint

/** One coordinated dry-clean cycle — abortable on direction stale. */
export function dryCleanCycle(opts: DryCleanCycleOpts = {}): DryCleanCycleResult {
  const cwd = opts.cwd ?? process.cwd()
  const dryRun = opts.dryRun !== false
  const force = opts.force === true
  const agentId = opts.agentId ?? 'apply/clean'
  const token = opts.token ?? interruptTokenFor(cleanDirectionPath(), agentId)

  const priorManifest = loadCleanManifest(cwd)
  const snapOpts = { cwd, metrics: opts.metrics }
  const before = efficiencySnapshot('clean:cycle', snapOpts)

  if (isDirectionStale(token)) {
    const manifest: CleanManifest = {
      _law: MANIFEST_LAW,
      cycleId: priorManifest?.cycleId ?? 'aborted',
      completedAt: new Date().toISOString(),
      dryRun,
      fingerprint: priorManifest?.fingerprint ?? '',
      axes: priorManifest?.axes ?? scanCleanAxes(cwd).axes,
      taxonomy: priorManifest?.taxonomy ?? {
        'A-emit': 0,
        'B-nest': 0,
        'C-delete': 0,
        'D-rule-fix': 0,
      },
      applied: [],
    }
    return {
      aborted: true,
      abortReason: 'direction stale — parent redirected mid-cycle',
      scan: scanCleanAxes(cwd),
      apply: { applied: [], skipped: [], errors: [] },
      before,
      after: before,
      ratchet: efficiencyRatchet(loadEfficiencyStore(cwd).latest, before.metrics),
      manifest,
      skippedScan: false,
      emitted: [],
    }
  }

  if (isDirectionStale(token)) {
    return {
      aborted: true,
      abortReason: 'direction stale after scan — parent redirected mid-cycle',
      scan: scanCleanAxes(cwd),
      apply: { applied: [], skipped: [], errors: [] },
      before,
      after: before,
      ratchet: efficiencyRatchet(loadEfficiencyStore(cwd).latest, before.metrics),
      manifest: {
        _law: MANIFEST_LAW,
        cycleId: priorManifest?.cycleId ?? 'aborted-mid',
        completedAt: new Date().toISOString(),
        dryRun,
        fingerprint: priorManifest?.fingerprint ?? '',
        axes: priorManifest?.axes ?? scanCleanAxes(cwd).axes,
        taxonomy: priorManifest?.taxonomy ?? {
          'A-emit': 0,
          'B-nest': 0,
          'C-delete': 0,
          'D-rule-fix': 0,
        },
        applied: [],
      },
      skippedScan: false,
      emitted: [],
    }
  }

  const scan = scanCleanAxes(cwd)
  const skippedScan = shouldSkipScan(priorManifest, scan.fingerprint, force)

  if (skippedScan && priorManifest) {
    return {
      aborted: false,
      scan,
      apply: { applied: [], skipped: ['scan unchanged — skipped apply/measure'], errors: [] },
      before,
      after: before,
      ratchet: efficiencyRatchet(loadEfficiencyStore(cwd).latest, before.metrics),
      manifest: priorManifest,
      skippedScan: true,
      emitted: [],
    }
  }

  const apply = applySafeCleanFixes(scan.findings, cwd, dryRun)
  const after = efficiencySnapshot('clean:cycle', snapOpts)
  const ratchet = efficiencyRatchet(loadEfficiencyStore(cwd).latest, after.metrics)

  const cycleId = createHash('sha256')
    .update(`${scan.fingerprint}|${dryRun}|${new Date().toISOString().slice(0, 13)}`)
    .digest('hex')
    .slice(0, 12)

  const manifest: CleanManifest = {
    _law: MANIFEST_LAW,
    cycleId,
    completedAt: new Date().toISOString(),
    dryRun,
    fingerprint: scan.fingerprint,
    axes: scan.axes,
    taxonomy: classifyCleanFindings(scan.findings),
    applied: apply.applied,
    efficiency: {
      before: before.metrics,
      after: after.metrics,
      ratchetOk: ratchet.ok,
    },
  }

  const emitted: string[] = []
  if (!dryRun) {
    persistCleanManifest(manifest, cwd)
    emitted.push(relative(cwd, cleanManifestPath(cwd)))
    if (ratchet.ok) {
      const { ratchet: passRatchet } = recordEfficiencyPass('clean:cycle', {
        ...snapOpts,
        persist: true,
      })
      if (passRatchet.ok) emitted.push(relative(cwd, join('src', 'apply', 'efficiency.generated.json')))
    }
  } else {
    persistCleanManifest(manifest, cwd)
    emitted.push(relative(cwd, cleanManifestPath(cwd)))
  }

  return {
    aborted: false,
    scan,
    apply,
    before,
    after,
    ratchet,
    manifest,
    skippedScan,
    emitted,
  }
}

/** One-line doctor / CLI summary from last manifest. */
export function formatCleanSummary(cwd: string = process.cwd()): string | null {
  const m = loadCleanManifest(cwd)
  if (!m) return null
  const stray = m.axes['stray-ts']
  const parts = [
    `clean:${m.cycleId}`,
    `stray=${stray.count}/${stray.baseline}`,
    `A${m.taxonomy['A-emit']}`,
    `B${m.taxonomy['B-nest']}`,
    `C${m.taxonomy['C-delete']}`,
    `D${m.taxonomy['D-rule-fix']}`,
    m.dryRun ? 'dry-run' : 'applied',
  ]
  return parts.join(' · ')
}

/** Render phase diagram + metric deltas for CLI report. */
export function renderCleanReport(result: DryCleanCycleResult, cwd: string = process.cwd()): string {
  const lines: string[] = []
  lines.push('erpax clean — coordinated efficiency pass\n')
  lines.push('Phases: scan → classify → apply → measure → ratchet → emit\n')

  if (result.aborted) {
    lines.push(`⏸ ABORTED: ${result.abortReason}`)
    return lines.join('\n')
  }

  if (result.skippedScan) {
    lines.push('scan: skipped (fingerprint unchanged — use --force to re-scan)\n')
  }

  lines.push('| axis | count | baseline | over |')
  lines.push('| --- | ---: | ---: | ---: |')
  for (const axis of CLEAN_SCAN_AXES) {
    const a = result.scan.axes[axis]
    lines.push(`| ${axis} | ${a.count} | ${a.baseline} | ${a.overBaseline} |`)
  }

  lines.push('')
  lines.push('| taxonomy | count | action |')
  lines.push('| --- | ---: | --- |')
  const tax = result.manifest.taxonomy
  lines.push(`| A emit-only | ${tax['A-emit']} | emit generated artefacts |`)
  lines.push(`| B nest | ${tax['B-nest']} | human-gate (nest into child atoms) |`)
  lines.push(`| C delete | ${tax['C-delete']} | safe auto when --apply |`)
  lines.push(`| D rule-fix | ${tax['D-rule-fix']} | human-gate (rules ratchet / session) |`)

  if (result.apply.applied.length) {
    lines.push('')
    lines.push('applied:')
    for (const p of result.apply.applied) lines.push(`  ✓ ${p}`)
  }
  if (result.apply.skipped.length) {
    lines.push('')
    lines.push(`skipped (${result.apply.skipped.length}):`)
    for (const p of result.apply.skipped.slice(0, 8)) lines.push(`  · ${p}`)
    if (result.apply.skipped.length > 8) {
      lines.push(`  … +${result.apply.skipped.length - 8} more`)
    }
  }
  if (result.apply.errors.length) {
    lines.push('')
    lines.push('errors:')
    for (const e of result.apply.errors) lines.push(`  ✗ ${e}`)
  }

  lines.push('')
  lines.push(formatEfficiencySummary(result.after, result.ratchet))
  const prior = loadEfficiencyStore(cwd).latest
  if (prior && prior !== result.after.metrics) {
    lines.push('')
    lines.push('efficiency delta (store prior → this pass):')
    lines.push(renderEfficiencyDelta(prior, result.after.metrics))
  } else if (result.before.metrics !== result.after.metrics) {
    lines.push('')
    lines.push('efficiency delta (cycle before → after):')
    lines.push(renderEfficiencyDelta(result.before.metrics, result.after.metrics))
  }

  if (result.emitted.length) {
    lines.push('')
    lines.push(`emitted: ${result.emitted.join(', ')}`)
  }

  if (!result.ratchet.ok) {
    lines.push('')
    lines.push('ratchet: REGRESS — document exceptions or fix before --apply persist')
  } else if (!result.manifest.dryRun) {
    lines.push('')
    lines.push('next: pnpm erpax rules ratchet  (if axes improved)')
  }

  return lines.join('\n')
}

export function runCleanCli(argv: readonly string[] = process.argv.slice(2)): number {
  const apply = argv.includes('--apply')
  const force = argv.includes('--force')
  const result = dryCleanCycle({ dryRun: !apply, force })
  console.log(renderCleanReport(result))
  if (result.aborted) return 2
  if (result.apply.errors.length > 0) return 1
  return result.ratchet.ok ? 0 : 1
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(runCleanCli())
}
