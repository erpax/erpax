/**
 * apply/automate — one orchestration loop: inventory → clean → measure → ratchet → emit.
 *
 * Composes taskInventory · dryCleanCycle · rulesLightScan · tamperCostOf · efficiencyRatchet.
 * Watch mode replaces ad-hoc improve + violations + inventory loops.
 *
 *   pnpm erpax automate
 *   pnpm erpax automate watch
 *
 * @see ../clean — ../efficiency — ../inventory — ../../wave/policy
 */
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import {
  automateDirectionPath,
  bindWatchRealtime,
  inventoryWatchPath,
  violationsWatchPath,
} from '@/agent/communication/realtime'
import {
  interruptTokenFor,
  isDirectionStale,
  type InterruptToken,
} from '@/quantum/entanglement/direction-bus'
import { quantumModeDefault } from '@/quantum/bindings'
import { withQuantumContext } from '@/quantum/context'
import { HORO_DIGITS, composeSteps, horoRatio } from '@/horo'
import { deriveCorpusAnalytics, type CorpusAnalytics } from '@/readme'
import { freeEnergyFromEntropy } from '@/accounting/entropy-proof'
import {
  maxWorkTamperPolicy,
  tamperCostLog2ForCoverage,
  workTamperProduct,
  type WorkUnit,
} from '@/wave'
import { startProgressHeartbeat } from '@/cli/progress-heartbeat'
import { inventorySessionLaws } from '../inventory'
import type { SessionLawInventory } from '../report'
import { detectStalledProcesses, type StalledProcessRow } from '../stall-watch'
import {
  dryCleanCycle,
  scanCleanAxes,
  CLEAN_SCAN_AXES,
  type CleanScanResult,
  type DryCleanCycleResult,
} from '../clean'
import {
  efficiencyRatchet,
  efficiencySnapshot,
  recordEfficiencyPass,
  formatEfficiencySummary,
  renderEfficiencyDelta,
  loadEfficiencyStore,
  type EfficiencyMetrics,
  type EfficiencyRatchetVerdict,
  type EfficiencySnapshot,
} from '../efficiency'
import { emitEfficiency as emitEfficiencyLedger } from '../emit-efficiency'

export { automateDirectionPath } from '@/agent/communication/realtime'

export const AUTOMATE_MANIFEST_REL = join('src', 'apply', 'automate.manifest.generated.json')

const MANIFEST_LAW =
  'emit-only — automate manifest; never hand-edit; re-run pnpm erpax automate to refresh'

/** HORO-derived watch tick — base ring minute × horo ratio at apply×unity compose. */
export const AUTOMATE_WATCH_BASE_MS = 60_000

/** Max wall-clock budget per cycle — crest-step horo ratio × base minute. */
export const AUTOMATE_CYCLE_BUDGET_MS = Math.round(
  AUTOMATE_WATCH_BASE_MS * horoRatio(HORO_DIGITS[3] ?? 8),
)

export interface TaskInventoryAgentRow {
  readonly pid: number
  readonly kind: StalledProcessRow['kind']
  readonly ageSeconds: number
  readonly status: StalledProcessRow['status']
  readonly duplicate: boolean
}

export interface TaskInventory {
  readonly session: SessionLawInventory
  readonly activeAgents: readonly TaskInventoryAgentRow[]
  readonly duplicateHints: readonly string[]
}

export interface TamperCostVerdict {
  readonly product: number
  readonly tamperCostLog2: number
  readonly coverage: number
  readonly contentUuidPct: number
  readonly matrixEdges: number
  readonly sealedPct: number
  readonly violationFloorDistance: number
}

export interface TamperCostReport extends TamperCostVerdict {
  readonly priorProduct: number | null
  readonly delta: number | null
  readonly monotone: boolean
}

export interface RulesLightScanResult {
  readonly axes: CleanScanResult['axes']
  readonly totalOverBaseline: number
  readonly fingerprint: string
}

export interface AutomateManifest {
  readonly _law: string
  readonly cycleId: string
  readonly completedAt: string
  readonly dryRun: boolean
  readonly inventory: {
    readonly atoms: number
    readonly trinityPct: number
    readonly activeAgents: number
    readonly duplicateAgents: number
  }
  readonly tamper: TamperCostVerdict
  readonly tamperDelta: number | null
  readonly ratchetOk: boolean
  readonly freeEnergyBits: number
  readonly emitted: readonly string[]
}

export interface AutomateCycleOpts {
  readonly cwd?: string
  readonly dryRun?: boolean
  readonly force?: boolean
  readonly agentId?: string
  readonly token?: InterruptToken
  readonly passId?: 'automate:cycle' | 'automate:watch'
  /** Test / partial override — skip live measure for supplied keys. */
  readonly metrics?: Partial<EfficiencyMetrics>
  readonly skipClean?: boolean
  /** @internal — set by withQuantumContext wrapper */
  readonly __quantumWrapped?: boolean
}

export interface AutomateCycleResult {
  readonly aborted: boolean
  readonly abortReason?: string
  readonly phase: string
  readonly inventory: TaskInventory
  readonly clean: DryCleanCycleResult | null
  readonly rules: RulesLightScanResult
  readonly tamper: TamperCostReport
  readonly before: EfficiencySnapshot
  readonly after: EfficiencySnapshot
  readonly ratchet: EfficiencyRatchetVerdict
  readonly manifest: AutomateManifest
  readonly emitted: readonly string[]
  readonly durationMs: number
}

export interface MaxEfficiencyLoopOpts {
  readonly cwd?: string
  readonly dryRun?: boolean
  readonly force?: boolean
  readonly skipClean?: boolean
  readonly maxCycles?: number
  readonly onCycle?: (result: AutomateCycleResult) => void
}

const automateManifestPath = (cwd: string): string => join(cwd, AUTOMATE_MANIFEST_REL)

export function loadAutomateManifest(cwd: string = process.cwd()): AutomateManifest | null {
  const path = automateManifestPath(cwd)
  if (!existsSync(path)) return null
  return JSON.parse(readFileSync(path, 'utf8')) as AutomateManifest
}

export function persistAutomateManifest(manifest: AutomateManifest, cwd: string = process.cwd()): void {
  const path = automateManifestPath(cwd)
  const dir = dirname(path)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(path, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
}

/** HORO-derived watch interval — apply (base·1) composed with unity (9). */
export function automateWatchIntervalMs(): number {
  const composed = composeSteps(1, 9)
  return Math.max(5_000, Math.round(AUTOMATE_WATCH_BASE_MS * horoRatio(composed)))
}

/** Session-law inventory + active erpax process hints (log-only duplicate detection). */
export function taskInventory(cwd: string = process.cwd()): TaskInventory {
  const session = inventorySessionLaws(cwd)
  const stalls = detectStalledProcesses()
  const byKind = new Map<string, number>()
  for (const s of stalls) {
    byKind.set(s.kind, (byKind.get(s.kind) ?? 0) + 1)
  }
  const newestByKind = new Map<string, number>()
  for (const s of stalls) {
    const prev = newestByKind.get(s.kind)
    if (prev === undefined || s.pid > prev) newestByKind.set(s.kind, s.pid)
  }

  const activeAgents: TaskInventoryAgentRow[] = stalls.map((s) => ({
    pid: s.pid,
    kind: s.kind,
    ageSeconds: s.ageSeconds,
    status: s.status,
    duplicate: (byKind.get(s.kind) ?? 0) > 1 && newestByKind.get(s.kind) !== s.pid,
  }))

  const duplicateHints: string[] = []
  for (const row of activeAgents) {
    if (row.duplicate) {
      duplicateHints.push(
        `duplicate ${row.kind} pid ${row.pid} — keep pid ${newestByKind.get(row.kind)} (log only; no external kill)`,
      )
    }
  }

  return { session, activeAgents, duplicateHints }
}

/** Light rules scan — clean axes only; no full readme corpus walk. */
export function rulesLightScan(cwd: string = process.cwd()): RulesLightScanResult {
  const scan = scanCleanAxes(cwd)
  const totalOverBaseline = CLEAN_SCAN_AXES.reduce(
    (s, axis) => s + scan.axes[axis].overBaseline,
    0,
  )
  return { axes: scan.axes, totalOverBaseline, fingerprint: scan.fingerprint }
}

/** Violation headroom from an existing light scan (avoids rescan). */
export function violationFloorDistanceFromRules(rules: RulesLightScanResult): number {
  return CLEAN_SCAN_AXES.reduce(
    (s, axis) => s + Math.max(0, rules.axes[axis].baseline - rules.axes[axis].count),
    0,
  )
}

/** Violation headroom — sum of (baseline − count) on light axes (higher is better). */
export function violationFloorDistance(cwd: string = process.cwd()): number {
  return violationFloorDistanceFromRules(rulesLightScan(cwd))
}

export interface TamperCostOfOpts {
  readonly violationFloorDistance?: number
  readonly rules?: RulesLightScanResult
}

/** Tamper cost from corpus signals — source of truth for workTamperProduct. */
export function tamperCostOf(
  corpus: CorpusAnalytics,
  cwd: string = process.cwd(),
  opts: TamperCostOfOpts = {},
): TamperCostVerdict {
  const folderCount = Math.max(corpus.folderCount, 1)
  const contentUuidPct = Math.round((corpus.sealed / folderCount) * 1000) / 10
  const sealedPct = contentUuidPct
  const matrixEdges = corpus.meanBondDegree
  const vfd =
    opts.violationFloorDistance ??
    (opts.rules ? violationFloorDistanceFromRules(opts.rules) : violationFloorDistance(cwd))

  const uuidNorm = corpus.sealed / folderCount
  const matrixNorm = Math.min(1, matrixEdges / 50)
  const violationNorm = Math.min(1, vfd / 100)
  const coverage = Math.min(
    1,
    Math.round((uuidNorm * 0.35 + (sealedPct / 100) * 0.25 + matrixNorm * 0.25 + violationNorm * 0.15) * 1000) /
      1000,
  )

  const policy = maxWorkTamperPolicy()
  const tamperCostLog2 = tamperCostLog2ForCoverage(coverage, policy)
  const units: WorkUnit[] = [
    {
      sealedEb: corpus.entropy.totalSealEb,
      paths: corpus.folderCount,
      waveOrdinal: policy.waveDepth,
      receiptSeq: Math.round(coverage * policy.receiptChainDepth),
    },
  ]
  const wt = workTamperProduct(units, { policy })

  return {
    product: wt.product,
    tamperCostLog2: wt.tamperCostLog2,
    coverage: wt.coverage,
    contentUuidPct,
    matrixEdges,
    sealedPct,
    violationFloorDistance: vfd,
  }
}

export function tamperCostReport(
  corpus: CorpusAnalytics,
  cwd: string = process.cwd(),
  opts: TamperCostOfOpts = {},
): TamperCostReport {
  const current = tamperCostOf(corpus, cwd, opts)
  const prior = loadAutomateManifest(cwd)?.tamper.product ?? loadEfficiencyStore(cwd).latest?.workTamperProduct ?? null
  const delta = prior !== null ? Math.round((current.product - prior) * 1000) / 1000 : null
  return {
    ...current,
    priorProduct: prior,
    delta,
    monotone: delta === null || delta >= 0,
  }
}

const buildLightCorpus = (
  inventory: TaskInventory,
  prior: EfficiencyMetrics | null,
): CorpusAnalytics => {
  const folderCount = Math.max(inventory.session.totalAtoms, 1)
  const sealed = inventory.session.trinity
  const entropyEb = prior?.entropyEb ?? 0
  return {
    folderCount,
    sealed,
    balanced: sealed,
    meanBondDegree: prior ? Math.round(prior.concentrationTopScore * 10) / 10 : 0,
    totalVariance: 0,
    withBindings: 0,
    distinctStandards: 0,
    byHoro: [],
    entropy: {
      unit: 'eb',
      totalGapEb: Math.max(0, folderCount - sealed),
      totalSealEb: Math.max(sealed * 2, 1),
      netEntropyEb: entropyEb,
      sealGapRatio: sealed / folderCount,
      sealedMass: sealed,
      unsealedMass: folderCount - sealed,
      bySector: [],
    },
    quantumThinking: {
      atomsWithThinking: 0,
      totalSuperposition: 0,
      totalCollapse: 0,
      totalSealUuids: sealed,
      sealedThinking: sealed,
      byPartition: [],
    },
  }
}

/** Corpus snapshot for automate — light from inventory + prior store; cold-start falls back once. */
export function corpusForAutomate(inventory: TaskInventory, cwd: string = process.cwd()): CorpusAnalytics {
  const prior = loadEfficiencyStore(cwd).latest
  if (prior?.entropyEb !== undefined && inventory.session.totalAtoms > 0) {
    return buildLightCorpus(inventory, prior)
  }
  return deriveCorpusAnalytics(cwd)
}

const abortIfStale = (
  token: InterruptToken,
  phase: string,
): { aborted: true; phase: string; reason: string } | null => {
  if (!isDirectionStale(token)) return null
  return { aborted: true, phase, reason: 'direction stale — parent redirected mid-cycle' }
}

/** One automated pass — abortable on direction stale at every phase boundary. */
export function automateCycle(opts: AutomateCycleOpts = {}): AutomateCycleResult {
  const agentId = opts.agentId ?? 'apply/automate'
  const passId = opts.passId ?? 'automate:cycle'
  if (quantumModeDefault() && !opts.__quantumWrapped) {
    return withQuantumContext(
      () => automateCycle({ ...opts, __quantumWrapped: true }),
      { path: automateDirectionPath(), agentId, label: passId },
    ).result
  }

  const cwd = opts.cwd ?? process.cwd()
  const dryRun = opts.dryRun !== false
  const token = opts.token ?? interruptTokenFor(automateDirectionPath(), agentId)
  const started = performance.now()
  const stopHeartbeat = startProgressHeartbeat('erpax automate', 15_000)

  const priorManifest = loadAutomateManifest(cwd)
  let phase = 'inventory'

  const inventory = taskInventory(cwd)
  const hintCap = 5
  for (const hint of inventory.duplicateHints.slice(0, hintCap)) {
    process.stderr.write(`automate hint: ${hint}\n`)
  }
  if (inventory.duplicateHints.length > hintCap) {
    process.stderr.write(
      `automate hint: … +${inventory.duplicateHints.length - hintCap} more duplicates (log only)\n`,
    )
  }

  let stale = abortIfStale(token, phase)
  if (stale) {
    stopHeartbeat()
    return abortedResult(cwd, inventory, stale, started, dryRun, priorManifest)
  }

  if (performance.now() - started > AUTOMATE_CYCLE_BUDGET_MS) {
    stopHeartbeat()
    return abortedResult(cwd, inventory, { aborted: true, phase, reason: 'cycle budget exceeded' }, started, dryRun, priorManifest)
  }

  phase = 'dry-clean'
  const clean = opts.skipClean
    ? null
    : dryCleanCycle({
        cwd,
        dryRun,
        force: opts.force,
        agentId,
        token,
        metrics: opts.metrics,
      })

  if (clean?.aborted) {
    stopHeartbeat()
    return abortedResult(cwd, inventory, { aborted: true, phase, reason: clean.abortReason ?? 'clean aborted' }, started, dryRun, priorManifest, clean, rulesLightScan(cwd))
  }

  stale = abortIfStale(token, phase)
  if (stale) {
    stopHeartbeat()
    return abortedResult(cwd, inventory, stale, started, dryRun, priorManifest, clean)
  }

  phase = 'rules-light'
  const rules = rulesLightScan(cwd)

  stale = abortIfStale(token, phase)
  if (stale) {
    stopHeartbeat()
    return abortedResult(cwd, inventory, stale, started, dryRun, priorManifest, clean, rules)
  }

  phase = 'measure'
  const corpus = corpusForAutomate(inventory, cwd)
  const tamper = tamperCostReport(corpus, cwd, { rules })
  const violationCount = CLEAN_SCAN_AXES.reduce((s, axis) => s + rules.axes[axis].count, 0)
  const freeEnergy = freeEnergyFromEntropy({
    entropyEb: corpus.entropy.netEntropyEb,
    violationCount,
    workTamperProduct: tamper.product,
    totalSealEb: corpus.entropy.totalSealEb,
  })

  const store = loadEfficiencyStore(cwd)
  const priorMetrics = store.latest

  /** Light pass — reuse prior heavy probes; only refresh tamper · entropy · violations. */
  const lightBase = (extra: Partial<EfficiencyMetrics> = {}): Partial<EfficiencyMetrics> => ({
    skillContextBytes: opts.metrics?.skillContextBytes ?? priorMetrics?.skillContextBytes ?? 0,
    rulesOfMs: opts.metrics?.rulesOfMs ?? priorMetrics?.rulesOfMs ?? 0,
    readmeWaveDurationMs: opts.metrics?.readmeWaveDurationMs ?? 0,
    concentrationTopScore:
      opts.metrics?.concentrationTopScore ?? priorMetrics?.concentrationTopScore ?? 0,
    constantsCount: opts.metrics?.constantsCount ?? priorMetrics?.constantsCount ?? 0,
    ...opts.metrics,
    ...extra,
  })

  const before = efficiencySnapshot(passId, {
    cwd,
    metrics: lightBase({ workTamperProduct: tamper.priorProduct ?? tamper.product }),
  })

  phase = 'ratchet'
  const after = efficiencySnapshot(passId, {
    cwd,
    metrics: lightBase({
      workTamperProduct: tamper.product,
      entropyEb: corpus.entropy.netEntropyEb,
      freeEnergyBits: freeEnergy.freeEnergyBits,
      violationCount,
    }),
  })

  const ratchet = efficiencyRatchet(priorMetrics, after.metrics)

  phase = 'emit'
  const emitted: string[] = []
  if (ratchet.ok) {
    recordEfficiencyPass(passId, {
      cwd,
      metrics: after.metrics,
      persist: true,
    })
    emitEfficiencyLedger(cwd)
    emitted.push(relative(cwd, join('src', 'apply', 'efficiency.generated.json')))
  }

  const cycleId = createHash('sha256')
    .update(`${rules.fingerprint}|${dryRun}|${new Date().toISOString().slice(0, 13)}`)
    .digest('hex')
    .slice(0, 12)

  const manifest: AutomateManifest = {
    _law: MANIFEST_LAW,
    cycleId,
    completedAt: new Date().toISOString(),
    dryRun,
    inventory: {
      atoms: inventory.session.totalAtoms,
      trinityPct: Math.round(inventory.session.trinityPct * 10) / 10,
      activeAgents: inventory.activeAgents.length,
      duplicateAgents: inventory.activeAgents.filter((a) => a.duplicate).length,
    },
    tamper: {
      product: tamper.product,
      tamperCostLog2: tamper.tamperCostLog2,
      coverage: tamper.coverage,
      contentUuidPct: tamper.contentUuidPct,
      matrixEdges: tamper.matrixEdges,
      sealedPct: tamper.sealedPct,
      violationFloorDistance: tamper.violationFloorDistance,
    },
    tamperDelta: tamper.delta,
    ratchetOk: ratchet.ok,
    freeEnergyBits: freeEnergy.freeEnergyBits,
    emitted: [],
  }

  persistAutomateManifest({ ...manifest, emitted: [] }, cwd)
  emitted.push(relative(cwd, AUTOMATE_MANIFEST_REL))
  persistAutomateManifest({ ...manifest, emitted }, cwd)

  stopHeartbeat()
  const durationMs = Math.round(performance.now() - started)

  return {
    aborted: false,
    phase: 'complete',
    inventory,
    clean,
    rules,
    tamper,
    before,
    after,
    ratchet,
    manifest: { ...manifest, emitted },
    emitted,
    durationMs,
  }
}

function abortedResult(
  cwd: string,
  inventory: TaskInventory,
  stale: { phase: string; reason: string },
  started: number,
  dryRun: boolean,
  priorManifest: AutomateManifest | null,
  clean: DryCleanCycleResult | null = null,
  rules: RulesLightScanResult = { axes: scanCleanAxes(cwd).axes, totalOverBaseline: 0, fingerprint: '' },
): AutomateCycleResult {
  const emptyMetrics: EfficiencyMetrics = {
    skillContextBytes: 0,
    rulesOfMs: 0,
    readmeWaveDurationMs: 0,
    violationCount: 0,
    concentrationTopScore: 0,
    constantsCount: 0,
    workTamperProduct: priorManifest?.tamper.product ?? 0,
    entropyEb: 0,
    freeEnergyBits: 0,
  }
  const snap: EfficiencySnapshot = {
    passId: 'automate:cycle',
    capturedAt: new Date().toISOString(),
    metrics: emptyMetrics,
  }
  const priorTamper = priorManifest?.tamper
  const tamper: TamperCostReport = priorTamper
    ? { ...priorTamper, priorProduct: priorTamper.product, delta: null, monotone: true }
    : {
        product: 0,
        tamperCostLog2: 0,
        coverage: 0,
        contentUuidPct: 0,
        matrixEdges: 0,
        sealedPct: 0,
        violationFloorDistance: 0,
        priorProduct: null,
        delta: null,
        monotone: true,
      }
  const manifest: AutomateManifest = {
    _law: MANIFEST_LAW,
    cycleId: priorManifest?.cycleId ?? 'aborted',
    completedAt: new Date().toISOString(),
    dryRun,
    inventory: {
      atoms: inventory.session.totalAtoms,
      trinityPct: inventory.session.trinityPct,
      activeAgents: inventory.activeAgents.length,
      duplicateAgents: inventory.activeAgents.filter((a) => a.duplicate).length,
    },
    tamper: priorManifest?.tamper ?? {
      product: 0,
      tamperCostLog2: 0,
      coverage: 0,
      contentUuidPct: 0,
      matrixEdges: 0,
      sealedPct: 0,
      violationFloorDistance: 0,
    },
    tamperDelta: null,
    ratchetOk: false,
    freeEnergyBits: snap.metrics.freeEnergyBits,
    emitted: [],
  }
  return {
    aborted: true,
    abortReason: stale.reason,
    phase: stale.phase,
    inventory,
    clean,
    rules,
    tamper,
    before: snap,
    after: snap,
    ratchet: efficiencyRatchet(loadEfficiencyStore(cwd).latest, snap.metrics),
    manifest,
    emitted: [],
    durationMs: Math.round(performance.now() - started),
  }
}

/** Watch loop — HORO interval; each cycle must pass ratchet or record exception. */
export function maxEfficiencyLoop(opts: MaxEfficiencyLoopOpts = {}): void {
  const cwd = opts.cwd ?? process.cwd()
  const intervalMs = automateWatchIntervalMs()
  const maxCycles = opts.maxCycles ?? Number.POSITIVE_INFINITY
  let cycles = 0

  process.stderr.write(
    `erpax automate watch — interval ${intervalMs}ms (horo-derived) · budget ${AUTOMATE_CYCLE_BUDGET_MS}ms/cycle\n`,
  )

  const tick = (): void => {
    if (cycles >= maxCycles) return
    cycles++
    const result = automateCycle({
      cwd,
      dryRun: opts.dryRun,
      force: opts.force,
      skipClean: opts.skipClean,
      passId: 'automate:watch',
    })
    opts.onCycle?.(result)
    console.log(formatAutomateSummaryLine(result))
    if (!result.ratchet.ok && !result.aborted) {
      process.stderr.write(
        `automate watch — ratchet exception recorded (cycle ${result.manifest.cycleId})\n`,
      )
    }
  }

  tick()
  if (maxCycles <= 1) return

  const { stop } = bindWatchRealtime({
    paths: [automateDirectionPath(), violationsWatchPath(), inventoryWatchPath()],
    onSignal: tick,
    pollMs: intervalMs,
  })

  process.on('SIGINT', () => {
    stop()
    process.stderr.write('\nautomate watch — stopped\n')
    process.exit(0)
  })
}

export function formatAutomateSummaryLine(result: AutomateCycleResult): string {
  if (result.aborted) {
    return `⏸ automate:${result.phase} ABORTED — ${result.abortReason} (${result.durationMs}ms)`
  }
  const m = result.after.metrics
  const t = result.tamper
  const status = result.ratchet.ok ? '✓' : '✖'
  const parts = [
    `${status} automate:${result.manifest.cycleId}`,
    `atoms=${result.inventory.session.totalAtoms}`,
    `trinity=${result.inventory.session.trinityPct.toFixed(1)}%`,
    `F=${m.freeEnergyBits.toFixed(1)}`,
    `w×t=${t.product.toFixed(1)}`,
    `tamper²=${Number.isFinite(t.tamperCostLog2) ? t.tamperCostLog2.toFixed(1) : '∞'}`,
    `${result.durationMs}ms`,
  ]
  if (t.delta !== null) parts.push(`Δw×t=${t.delta >= 0 ? '+' : ''}${t.delta}`)
  if (!t.monotone) parts.push('TAMPER↓')
  return parts.join(' · ')
}

/** One-line doctor summary from last manifest. */
export function formatAutomateSummary(cwd: string = process.cwd()): string | null {
  const m = loadAutomateManifest(cwd)
  if (!m) return null
  const parts = [
    `automate:${m.cycleId}`,
    `trinity=${m.inventory.trinityPct}%`,
    `F=${m.freeEnergyBits.toFixed(1)}`,
    `w×t=${m.tamper.product.toFixed(1)}`,
    m.ratchetOk ? 'ratchet✓' : 'ratchet✖',
    m.dryRun ? 'dry-run' : 'applied',
  ]
  if (m.tamperDelta !== null) parts.push(`Δw×t=${m.tamperDelta >= 0 ? '+' : ''}${m.tamperDelta}`)
  return parts.join(' · ')
}

export function renderAutomateReport(result: AutomateCycleResult, cwd: string = process.cwd()): string {
  const lines: string[] = []
  lines.push('erpax automate — orchestration pass\n')
  lines.push(
    'Phases: inventory → abort-stale → dry-clean → rules-light → measure → ratchet → emit → tamper\n',
  )

  if (result.aborted) {
    lines.push(`⏸ ABORTED at ${result.phase}: ${result.abortReason}`)
    return lines.join('\n')
  }

  lines.push(
    `inventory: ${result.inventory.session.totalAtoms} atoms · trinity ${result.inventory.session.trinityPct.toFixed(1)}% · ${result.inventory.activeAgents.length} active process(es)`,
  )
  if (result.inventory.duplicateHints.length) {
    for (const h of result.inventory.duplicateHints) lines.push(`  hint: ${h}`)
  }

  if (result.clean) {
    lines.push('')
    lines.push(
      `clean: stray=${result.clean.scan.axes['stray-ts'].count} · applied=${result.clean.apply.applied.length} · ratchet ${result.clean.ratchet.ok ? '✓' : '✖'}`,
    )
  }

  lines.push('')
  lines.push('| axis | count | baseline | over |')
  lines.push('| --- | ---: | ---: | ---: |')
  for (const axis of CLEAN_SCAN_AXES) {
    const a = result.rules.axes[axis]
    lines.push(`| ${axis} | ${a.count} | ${a.baseline} | ${a.overBaseline} |`)
  }

  lines.push('')
  lines.push('tamper cost:')
  const t = result.tamper
  lines.push(`  content-uuid coverage ${t.contentUuidPct}% · sealed ${t.sealedPct}%`)
  lines.push(`  matrix edges (mean bond) ${t.matrixEdges} · violation floor +${t.violationFloorDistance}`)
  lines.push(
    `  w×t=${t.product.toFixed(1)} · tamper²=${Number.isFinite(t.tamperCostLog2) ? t.tamperCostLog2.toFixed(1) : '∞'} · coverage ${(t.coverage * 100).toFixed(0)}%`,
  )
  if (t.delta !== null) {
    lines.push(`  Δw×t=${t.delta >= 0 ? '+' : ''}${t.delta} ${t.monotone ? '(monotone ✓)' : '(TAMPER REGRESS ✖)'}`)
  }

  lines.push('')
  lines.push(formatEfficiencySummary(result.after, result.ratchet))
  const prior = loadEfficiencyStore(cwd).latest
  if (prior && prior !== result.after.metrics) {
    lines.push('')
    lines.push('efficiency delta (store prior → this pass):')
    lines.push(renderEfficiencyDelta(prior, result.after.metrics))
  }

  if (result.emitted.length) {
    lines.push('')
    lines.push(`emitted: ${result.emitted.join(', ')}`)
  }

  lines.push('')
  lines.push(`duration: ${result.durationMs}ms (budget ${AUTOMATE_CYCLE_BUDGET_MS}ms)`)

  return lines.join('\n')
}

export function runAutomateCli(argv: readonly string[] = process.argv.slice(2)): number {
  const watch = argv.includes('watch') || argv.includes('--watch')
  const apply = argv.includes('--apply')
  const force = argv.includes('--force')
  const skipClean = argv.includes('--skip-clean')
  const maxCycles = Number(argv.find((a) => a.startsWith('--max='))?.slice(6) ?? (watch ? Number.POSITIVE_INFINITY : 1))

  if (watch) {
    maxEfficiencyLoop({
      dryRun: !apply,
      force,
      skipClean,
      maxCycles: Number.isFinite(maxCycles) ? maxCycles : undefined,
    })
    return 0
  }

  const result = automateCycle({ dryRun: !apply, force, skipClean })
  console.log(renderAutomateReport(result))
  if (result.aborted) return 2
  if (!result.tamper.monotone && result.tamper.priorProduct !== null) return 1
  return result.ratchet.ok ? 0 : 1
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(runAutomateCli())
}
