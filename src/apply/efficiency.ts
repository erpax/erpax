/**
 * apply/efficiency — pass efficiency snapshots + ratchet (coordinate a18ebd36).
 *
 * Law: with every pass skills and code become more efficient — each snapshot must
 * improve vs prior on at least one axis without regressing others (unless documented).
 *
 * @see ./efficiency.json — ../agent/skill-context · ../rules · ../wave/policy
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { join } from 'node:path'
import { realiseSkillsForPath, clearAgentSkillContextCache } from '@/agent/skill-context'
import { alcapsBaselineViolations } from '@/seal/baseline-debt'
import { clearRulesCache, rulesOf } from '@/rules'
import { topConcentrations } from '@/rules/concentration'
import { scanViolationsRealtime } from '@/monitor/violations'
import { deriveCorpusAnalytics } from '@/readme/compute'
import { freeEnergyFromEntropy } from '@/accounting/entropy-proof'

/** Canonical dispatch probe — stable hub atom for skill-context bytes. */
export const EFFICIENCY_SKILL_PROBE = 'src/rules/index.ts'

export const EFFICIENCY_JSON_REL = join('src', 'apply', 'efficiency.generated.json')
export const EFFICIENCY_HAND_REL = join('src', 'apply', 'efficiency.json')

/** Pass surfaces that emit efficiency snapshots (4dbb5344 wiring). */
export type EfficiencyPassId =
  | 'readme:waves'
  | 'improve:watch'
  | 'session:apply'
  | 'skill:upgrade'
  | 'violations:watch'
  | 'clean:cycle'
  | 'automate:cycle'
  | 'automate:watch'

export type EfficiencyMetricKey =
  | 'skillContextBytes'
  | 'rulesOfMs'
  | 'readmeWaveDurationMs'
  | 'violationCount'
  | 'concentrationTopScore'
  | 'constantsCount'
  | 'workTamperProduct'
  | 'entropyEb'
  | 'freeEnergyBits'

/** Lower-is-better metrics — ratchet DOWN only. */
export const LOWER_IS_BETTER: ReadonlySet<EfficiencyMetricKey> = new Set([
  'skillContextBytes',
  'rulesOfMs',
  'readmeWaveDurationMs',
  'violationCount',
  'concentrationTopScore',
  'constantsCount',
  'entropyEb',
])

export interface EfficiencyMetrics {
  readonly skillContextBytes: number
  readonly rulesOfMs: number
  readonly readmeWaveDurationMs: number
  readonly violationCount: number
  readonly concentrationTopScore: number
  readonly constantsCount: number
  readonly workTamperProduct: number
  readonly entropyEb: number
  readonly freeEnergyBits: number
}

export interface EfficiencySnapshot {
  readonly passId: EfficiencyPassId
  readonly capturedAt: string
  readonly metrics: EfficiencyMetrics
}

export interface EfficiencyException {
  readonly metric: EfficiencyMetricKey
  readonly reason: string
}

export interface EfficiencyRegression {
  readonly metric: EfficiencyMetricKey
  readonly prev: number
  readonly next: number
  readonly delta: number
  readonly direction: 'lower' | 'higher'
}

export interface EfficiencyRatchetVerdict {
  readonly ok: boolean
  readonly regressions: readonly EfficiencyRegression[]
  readonly improvements: readonly EfficiencyRegression[]
  readonly excepted: readonly EfficiencyException[]
}

export interface EfficiencyPassRecord extends EfficiencySnapshot {
  readonly exceptions?: readonly EfficiencyException[]
}

export interface EfficiencyStore {
  readonly _law: string
  readonly contentUuid?: string
  readonly sealedAt?: string
  readonly latest: EfficiencyMetrics | null
  readonly passes: readonly EfficiencyPassRecord[]
}

export interface EfficiencySnapshotOpts {
  readonly cwd?: string
  readonly readmeWaveDurationMs?: number
  readonly workTamperProduct?: number
  readonly violationCount?: number
  /** Test / partial override — skip live measure for supplied keys. */
  readonly metrics?: Partial<EfficiencyMetrics>
}

const STORE_LAW =
  'efficiency UP only — each pass must improve vs prior snapshot; regressions require documented exceptions'

const isFiniteN = (n: number): boolean => Number.isFinite(n) && n >= 0

const _emptyMetrics = (): EfficiencyMetrics => ({
  skillContextBytes: 0,
  rulesOfMs: 0,
  readmeWaveDurationMs: 0,
  violationCount: 0,
  concentrationTopScore: 0,
  constantsCount: 0,
  workTamperProduct: 0,
  entropyEb: 0,
  freeEnergyBits: 0,
})

/** Measure rulesOf wall-clock ms (cold cache). */
export function measureRulesOfMs(cwd: string = process.cwd()): number {
  clearRulesCache()
  const t0 = performance.now()
  rulesOf(cwd, { force: true })
  return Math.round((performance.now() - t0) * 10) / 10
}

/** Measure agent skill-context bytes for canonical probe path. */
export function measureSkillContextBytes(cwd: string = process.cwd()): number {
  clearAgentSkillContextCache()
  clearRulesCache()
  const ctx = realiseSkillsForPath(EFFICIENCY_SKILL_PROBE, { cwd, force: true })
  return ctx.contextBytes
}

/** Sum violation counts from live rulesOf axes. */
export function measureViolationCount(cwd: string = process.cwd()): number {
  clearRulesCache()
  const snapshot = rulesOf(cwd, { force: true })
  return snapshot.axes.reduce((s, a) => s + a.violations, 0)
}

/** Top hub concentration score — deployment-axis pressure. */
export function measureConcentrationTopScore(cwd: string = process.cwd()): number {
  const top = topConcentrations(cwd, 1)[0]
  return top ? Math.round(top.metrics.concentrationScore * 1000) / 1000 : 0
}

/** Surviving ALCAP baseline const exports — seal-debt count. */
export function measureConstantsCount(cwd: string = process.cwd()): number {
  return alcapsBaselineViolations(cwd).length
}

/** Live corpus net entropy eb from gap/seal rollup. */
export function measureCorpusEntropyEb(cwd: string = process.cwd()): number {
  return deriveCorpusAnalytics(cwd).entropy.netEntropyEb
}

/** Free energy bits from corpus entropy + violations + tamper work — Landauer derived. */
export function measureFreeEnergyBits(
  cwd: string = process.cwd(),
  opts: { readonly workTamperProduct?: number; readonly violationCount?: number } = {},
): number {
  const analytics = deriveCorpusAnalytics(cwd)
  const violationCount = opts.violationCount ?? measureViolationCount(cwd)
  const workTamperProduct = opts.workTamperProduct ?? 0
  return freeEnergyFromEntropy({
    entropyEb: analytics.entropy.netEntropyEb,
    violationCount,
    workTamperProduct,
    totalSealEb: analytics.entropy.totalSealEb,
  }).freeEnergyBits
}
export function efficiencySnapshot(
  passId: EfficiencyPassId,
  opts: EfficiencySnapshotOpts = {},
): EfficiencySnapshot {
  const cwd = opts.cwd ?? process.cwd()
  const overrides = opts.metrics ?? {}
  const skillContextBytes =
    overrides.skillContextBytes ?? measureSkillContextBytes(cwd)
  const rulesOfMs = overrides.rulesOfMs ?? measureRulesOfMs(cwd)
  const violationCount =
    overrides.violationCount ?? opts.violationCount ?? measureViolationCount(cwd)
  const concentrationTopScore =
    overrides.concentrationTopScore ?? measureConcentrationTopScore(cwd)
  const constantsCount = overrides.constantsCount ?? measureConstantsCount(cwd)
  const workTamperProduct =
    overrides.workTamperProduct ?? opts.workTamperProduct ?? 0
  const corpusAnalytics =
    overrides.entropyEb !== undefined && overrides.freeEnergyBits !== undefined
      ? null
      : deriveCorpusAnalytics(cwd)
  const entropyEb = overrides.entropyEb ?? corpusAnalytics?.entropy?.netEntropyEb ?? 0
  const totalSealEb = corpusAnalytics?.entropy?.totalSealEb ?? 0
  const freeEnergyBits =
    overrides.freeEnergyBits ??
    freeEnergyFromEntropy({
      entropyEb,
      violationCount,
      workTamperProduct,
      totalSealEb,
    }).freeEnergyBits

  return {
    passId,
    capturedAt: new Date().toISOString(),
    metrics: {
      skillContextBytes,
      rulesOfMs,
      readmeWaveDurationMs:
        overrides.readmeWaveDurationMs ?? opts.readmeWaveDurationMs ?? 0,
      violationCount,
      concentrationTopScore,
      constantsCount,
      workTamperProduct,
      entropyEb,
      freeEnergyBits,
    },
  }
}

const metricKeys = (): readonly EfficiencyMetricKey[] =>
  [
    'skillContextBytes',
    'rulesOfMs',
    'readmeWaveDurationMs',
    'violationCount',
    'concentrationTopScore',
    'constantsCount',
    'workTamperProduct',
    'entropyEb',
    'freeEnergyBits',
  ] as const

/** Fail closed when any metric regresses without a documented exception. */
export function efficiencyRatchet(
  prev: EfficiencyMetrics | null,
  next: EfficiencyMetrics,
  exceptions: readonly EfficiencyException[] = [],
): EfficiencyRatchetVerdict {
  if (!prev) {
    return { ok: true, regressions: [], improvements: [], excepted: [...exceptions] }
  }

  const exceptedMetrics = new Set(exceptions.map((e) => e.metric))
  const regressions: EfficiencyRegression[] = []
  const improvements: EfficiencyRegression[] = []

  for (const key of metricKeys()) {
    const p = prev[key]
    const n = next[key]
    if (!isFiniteN(p) || !isFiniteN(n)) {
      regressions.push({
        metric: key,
        prev: p,
        next: n,
        delta: n - p,
        direction: LOWER_IS_BETTER.has(key) ? 'lower' : 'higher',
      })
      continue
    }
    if (p === n) continue

    const lowerBetter = LOWER_IS_BETTER.has(key)
    const improved = lowerBetter ? n < p : n > p
    const row: EfficiencyRegression = {
      metric: key,
      prev: p,
      next: n,
      delta: Math.round((n - p) * 1000) / 1000,
      direction: lowerBetter ? 'lower' : 'higher',
    }
    if (improved) improvements.push(row)
    else regressions.push(row)
  }

  const unexcepted = regressions.filter((r) => !exceptedMetrics.has(r.metric))
  return {
    ok: unexcepted.length === 0,
    regressions,
    improvements,
    excepted: [...exceptions],
  }
}

export function efficiencyJsonPath(cwd: string = process.cwd()): string {
  return join(cwd, EFFICIENCY_JSON_REL)
}

export function loadEfficiencyStore(cwd: string = process.cwd()): EfficiencyStore {
  const path = efficiencyJsonPath(cwd)
  if (!existsSync(path)) {
    return { _law: STORE_LAW, latest: null, passes: [] }
  }
  const parsed = JSON.parse(readFileSync(path, 'utf8')) as EfficiencyStore
  return {
    _law: parsed._law ?? STORE_LAW,
    contentUuid: parsed.contentUuid,
    sealedAt: parsed.sealedAt,
    latest: parsed.latest ?? null,
    passes: parsed.passes ?? [],
  }
}

export function persistEfficiencyStore(store: EfficiencyStore, cwd: string = process.cwd()): void {
  const path = efficiencyJsonPath(cwd)
  const dir = dirname(path)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(path, `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}

export interface RecordEfficiencyPassResult {
  readonly snapshot: EfficiencySnapshot
  readonly ratchet: EfficiencyRatchetVerdict
  readonly store: EfficiencyStore
}

/** Snapshot → ratchet vs latest → append pass record → persist. */
export function recordEfficiencyPass(
  passId: EfficiencyPassId,
  opts: EfficiencySnapshotOpts & {
    readonly exceptions?: readonly EfficiencyException[]
    readonly persist?: boolean
  } = {},
): RecordEfficiencyPassResult {
  const cwd = opts.cwd ?? process.cwd()
  const store = loadEfficiencyStore(cwd)
  const snapshot = efficiencySnapshot(passId, opts)
  const ratchet = efficiencyRatchet(store.latest, snapshot.metrics, opts.exceptions ?? [])

  const record: EfficiencyPassRecord = {
    ...snapshot,
    ...(opts.exceptions?.length ? { exceptions: opts.exceptions } : {}),
  }

  const nextStore: EfficiencyStore = {
    ...store,
    latest: ratchet.ok || store.latest === null ? snapshot.metrics : store.latest,
    passes: ratchet.ok || store.latest === null ? [...store.passes, record] : store.passes,
  }

  const shouldPersist = opts.persist !== false && (ratchet.ok || store.latest === null)
  if (shouldPersist) {
    persistEfficiencyStore(nextStore, cwd)
  }

  return { snapshot, ratchet, store: shouldPersist ? nextStore : store }
}

/** One-line pass summary for CLI surfaces. */
export function formatEfficiencySummary(
  snapshot: EfficiencySnapshot,
  ratchet: EfficiencyRatchetVerdict,
): string {
  const m = snapshot.metrics
  const status = ratchet.ok ? '✓' : '✖'
  const parts = [
    `${status} efficiency:${snapshot.passId}`,
    `ctx=${m.skillContextBytes}B`,
    `rules=${m.rulesOfMs}ms`,
    `viol=${m.violationCount}`,
    `conc=${m.concentrationTopScore.toFixed(2)}`,
    `const=${m.constantsCount}`,
  ]
  if (m.readmeWaveDurationMs > 0) parts.push(`wave=${m.readmeWaveDurationMs}ms`)
  if (m.workTamperProduct > 0) parts.push(`w×t=${m.workTamperProduct.toFixed(1)}`)
  if (m.entropyEb !== 0 || m.freeEnergyBits > 0) {
    parts.push(`eb=${m.entropyEb}`)
    parts.push(`F=${m.freeEnergyBits.toFixed(1)}`)
  }
  if (ratchet.improvements.length > 0) {
    parts.push(
      `↓${ratchet.improvements.map((i) => i.metric).join(',')}`,
    )
  }
  if (!ratchet.ok) {
    parts.push(
      `REGRESS:${ratchet.regressions.filter((r) => !ratchet.excepted.some((e) => e.metric === r.metric)).map((r) => r.metric).join(',')}`,
    )
  }
  return parts.join(' · ')
}

/** Human-readable two-pass delta table row. */
export function renderEfficiencyDelta(
  prev: EfficiencyMetrics,
  next: EfficiencyMetrics,
): string {
  const hdr = '| metric | prev | next | Δ |'
  const sep = '| --- | ---: | ---: | ---: |'
  const rows = metricKeys().map((key) => {
    const p = prev[key]
    const n = next[key]
    const delta = Math.round((n - p) * 1000) / 1000
    const arrow = LOWER_IS_BETTER.has(key) ? (delta < 0 ? '↓' : delta > 0 ? '↑' : '·') : delta > 0 ? '↑' : delta < 0 ? '↓' : '·'
    return `| ${key} | ${p} | ${n} | ${arrow} ${delta} |`
  })
  return [hdr, sep, ...rows].join('\n')
}

/** Violation count from realtime scan (improve:watch path). */
export function violationCountFromScan(cwd: string = process.cwd()): number {
  return scanViolationsRealtime({ cwd, waveSample: true, maxEvents: 500 }).counts.total
}
