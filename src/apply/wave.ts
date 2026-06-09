/**
 * apply/wave — coordinated self-balancing wave runner (ONE runner at a time).
 */
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { publish, subscribe, violationsWatchPath } from '@/agent/communication/realtime'
import { interruptTokenFor, isDirectionStale, type InterruptToken } from '@/quantum/entanglement/direction-bus'
import { quantumModeDefault } from '@/quantum/bindings'
import { withQuantumContext } from '@/quantum/context'
import { fixAccountingGapsOnP0, waveAccountingGapViolations } from '@/accounting/gaps'
import { computedBaseline } from '@/law/folder/baseline'
import type { RatchetAxis } from '@/law/folder/baseline-types'
import { userWordUnprovenViolations } from '@/law/folder'
import { createWaveSession, completeWaveHop, selfBalancingWaveLoad, waveSessionVerdict, type SelfBalancingWavePlan } from '@/wave'
import type { Receipt } from '@/receipt'
import { materializeComputedFacesForPathsStable } from '@/readme/compute'
import { dryCleanCycle, scanCleanAxes, CLEAN_SCAN_AXES, type CleanScanAxis } from './clean'
import { payloadApprovalGate } from '@/payload/approval'
import {
  acquireWaveLock,
  releaseWaveLock,
  collectWaveStatus,
  formatWaveStatus,
} from './wave-lock'

export { readWaveLock, acquireWaveLock, releaseWaveLock, formatWaveStatus, collectWaveStatus } from './wave-lock'
export { isWaveRunnerHeld as isWaveRunnerActive }

export const WAVE_MANIFEST_REL = join('src', 'apply', 'wave.manifest.generated.json')
export const WAVE_SEAL_AXES = [...CLEAN_SCAN_AXES, 'phrase-without-diamond', 'accounting-wave'] as const
export type WaveSealAxis = (typeof WAVE_SEAL_AXES)[number]
export const waveDirectionPath = (): string => 'apply/wave'

export interface WaveAxisDebt { readonly axis: WaveSealAxis; readonly count: number; readonly baseline: number; readonly debt: number; readonly allocated: number }
export interface WaveSealAction { readonly axis: WaveSealAxis; readonly kind: 'materialize-faces' | 'accounting-fix' | 'dry-clean'; readonly paths: readonly string[]; readonly detail: string }
export interface CoordinatedWaveOpts { readonly cwd?: string; readonly batch?: number; readonly axes?: readonly WaveSealAxis[]; readonly balance?: boolean; readonly dryRun?: boolean; readonly force?: boolean; readonly agentId?: string; readonly token?: InterruptToken; readonly __quantumWrapped?: boolean }
export interface CoordinatedWaveResult { readonly aborted: boolean; readonly abortReason?: string; readonly runnerHeld: boolean; readonly batch: number; readonly axes: readonly WaveAxisDebt[]; readonly debit: number; readonly credit: number; readonly balanced: boolean; readonly actions: readonly WaveSealAction[]; readonly sealed: readonly string[]; readonly receipts: readonly Receipt[]; readonly plan: SelfBalancingWavePlan<WaveSealAction>; readonly sessionBalanced: boolean; readonly clean: ReturnType<typeof dryCleanCycle> | null; readonly durationMs: number }
export interface WaveManifest { readonly _law: string; readonly cycleId: string; readonly completedAt: string; readonly dryRun: boolean; readonly batch: number; readonly debit: number; readonly credit: number; readonly balanced: boolean; readonly sealed: readonly string[] }

let waveRunnerActive = false
export function __resetWaveRunnerForTests(): void { waveRunnerActive = false }
export function __setWaveRunnerActiveForTests(active: boolean): void { waveRunnerActive = active }
export function isWaveRunnerHeld(): boolean { return waveRunnerActive }

export function loadWaveManifest(cwd = process.cwd()): WaveManifest | null {
  const p = join(cwd, WAVE_MANIFEST_REL)
  return existsSync(p) ? (JSON.parse(readFileSync(p, 'utf8')) as WaveManifest) : null
}

const WAVE_RATCHET_AXES = new Set<RatchetAxis>([
  'stray-ts',
  'logic-concentration',
  'word-matter',
  'phrase-without-diamond',
])

const safeBaseline = (axis: WaveSealAxis, cwd: string): number => {
  if (axis === 'accounting-wave') return 0
  if (!WAVE_RATCHET_AXES.has(axis as RatchetAxis)) return 0
  try {
    return computedBaseline(axis as RatchetAxis, cwd)
  } catch {
    return 0
  }
}

export function scanWaveAxisDebt(cwd = process.cwd(), axes: readonly WaveSealAxis[] = WAVE_SEAL_AXES): WaveAxisDebt[] {
  const clean = scanCleanAxes(cwd)
  const phrase = userWordUnprovenViolations(cwd)
  const accounting = waveAccountingGapViolations(cwd)
  return axes.filter((a) => WAVE_SEAL_AXES.includes(a)).map((axis): WaveAxisDebt => {
    if (axis === 'phrase-without-diamond') {
      const count = phrase.violationCount
      return { axis, count, baseline: safeBaseline(axis, cwd), debt: Math.max(0, count - safeBaseline(axis, cwd)), allocated: 0 }
    }
    if (axis === 'accounting-wave') return { axis, count: accounting.count, baseline: 0, debt: Math.max(0, accounting.count), allocated: 0 }
    const a = clean.axes[axis as CleanScanAxis]
    return { axis, count: a.count, baseline: a.baseline, debt: Math.max(0, a.overBaseline), allocated: 0 }
  })
}

export function allocateWaveBatch(debts: readonly WaveAxisDebt[], batch: number): WaveAxisDebt[] {
  const totalDebt = debts.reduce((s, d) => s + d.debt, 0)
  if (totalDebt <= 0 || batch <= 0) return debts.map((d) => ({ ...d, allocated: 0 }))
  return debts.map((d) => ({ ...d, allocated: d.debt > 0 ? Math.max(1, Math.round((batch * d.debt) / totalDebt)) : 0 }))
}

export function proposeWaveSealActions(allocated: readonly WaveAxisDebt[], cwd = process.cwd()): WaveSealAction[] {
  const phrase = userWordUnprovenViolations(cwd)
  const accounting = waveAccountingGapViolations(cwd)
  const actions: WaveSealAction[] = []
  for (const row of allocated) {
    if (row.allocated <= 0) continue
    if (row.axis === 'phrase-without-diamond') {
      const paths = phrase.violations.slice(0, row.allocated).map((v) => v.atomPath)
      if (paths.length) actions.push({ axis: row.axis, kind: 'materialize-faces', paths, detail: 'faces' })
    } else if (row.axis === 'accounting-wave') {
      const paths = (accounting.verdict.topGapsByWave[1] ?? []).slice(0, row.allocated)
      if (paths.length) actions.push({ axis: row.axis, kind: 'accounting-fix', paths, detail: 'P0' })
    }
  }
  return actions
}

const execAction = (a: WaveSealAction, cwd: string, dryRun: boolean): readonly string[] => {
  if (dryRun) return a.paths
  if (a.kind === 'materialize-faces' && a.paths.length) { materializeComputedFacesForPathsStable(a.paths, cwd); return a.paths }
  if (a.kind === 'accounting-fix') return fixAccountingGapsOnP0(cwd, { dryRun: false }).paths
  return []
}

export function coordinatedWave(opts: CoordinatedWaveOpts = {}): CoordinatedWaveResult {
  const agentId = opts.agentId ?? 'apply/wave'
  if (quantumModeDefault() && !opts.__quantumWrapped) {
    return withQuantumContext(() => coordinatedWave({ ...opts, __quantumWrapped: true }), { path: waveDirectionPath(), agentId, label: 'wave:run' }).result
  }
  const started = performance.now()
  const cwd = opts.cwd ?? process.cwd()
  const batch = Math.max(1, Math.trunc(opts.batch ?? 30))
  const dryRun = opts.dryRun !== false
  const token = opts.token ?? interruptTokenFor(waveDirectionPath(), agentId)
  const empty = (aborted: boolean, reason?: string): CoordinatedWaveResult => ({
    aborted,
    abortReason: reason,
    runnerHeld: false,
    batch,
    axes: [],
    debit: 0,
    credit: 0,
    balanced: true,
    actions: [],
    sealed: [],
    receipts: [],
    plan: { waves: [], waveCount: 0, totalUnits: 0, balanceRatio: 1, restingStep: 9 },
    sessionBalanced: false,
    clean: null,
    durationMs: Math.round(performance.now() - started),
  })

  if (!opts.force) {
    const payload = payloadApprovalGate({ cwd, skipLive: dryRun })
    if (!payload.approved) {
      return empty(true, `payload approval denied at ${payload.step} — run pnpm erpax approve payload`)
    }
  }
  if (waveRunnerActive) return empty(true, 'single-runner — another coordinated wave in flight')
  const lock = acquireWaveLock('wave', agentId, cwd)
  if (!lock.acquired) return empty(true, lock.reason ?? 'wave lock held')
  waveRunnerActive = true
  try {
    if (isDirectionStale(token)) return empty(true, 'direction stale')
    const debts = allocateWaveBatch(scanWaveAxisDebt(cwd, opts.axes ?? WAVE_SEAL_AXES), batch)
    const debit = debts.reduce((s, d) => s + d.debt, 0)
    const actions = proposeWaveSealActions(debts, cwd)
    const plan = selfBalancingWaveLoad(actions, { maxItemsPerWave: Math.max(1, Math.ceil(batch / 7)) })
    const session = createWaveSession(plan, createHash('sha256').update(`wave|${batch}`).digest('hex').slice(0, 12))
    const sealed: string[] = []
    const receipts: Receipt[] = []
    const ts = new Date().toISOString()
    for (const wave of plan.waves) {
      for (const action of wave.items) sealed.push(...execAction(action, cwd, dryRun))
      receipts.push(completeWaveHop(session, wave.ordinal, ts, agentId))
    }
    const credit = sealed.length
    return { aborted: false, runnerHeld: true, batch, axes: debts, debit, credit, balanced: credit <= debit || debit === 0, actions, sealed: [...new Set(sealed)], receipts, plan, sessionBalanced: waveSessionVerdict(session).balanced, clean: null, durationMs: Math.round(performance.now() - started) }
  } finally {
    waveRunnerActive = false
    releaseWaveLock(cwd, 'wave')
  }
}

export function reorganizeWaveQueueOnDrift(opts: { readonly cwd?: string } = {}): { readonly stop: () => void } {
  const cwd = opts.cwd ?? process.cwd()
  const path = waveDirectionPath()
  const tick = () => {
    const debts = scanWaveAxisDebt(cwd)
    if (debts.reduce((s, d) => s + d.debt, 0) <= 0) return
    publish(path, { kind: 'direction', payload: { instruction: 'wave-queue-reprioritize', issuer: 'apply/wave', queue: debts.filter((d) => d.debt > 0) } })
  }
  const a = subscribe(violationsWatchPath(), tick)
  return { stop: () => a() }
}

export function renderWaveReport(r: CoordinatedWaveResult): string {
  return r.aborted ? `wave ABORTED: ${r.abortReason}` : `wave batch=${r.batch} debit=${r.debit} credit=${r.credit} balanced=${r.balanced}`
}

export function runWaveCli(argv: string[] = process.argv.slice(2)): number {
  const cwd = process.cwd()
  if (argv.includes('watch')) {
    reorganizeWaveQueueOnDrift({ cwd })
    process.stderr.write('wave watch — Ctrl+C to stop\n')
    return 0
  }
  if (argv.includes('status') || argv[0] === 'status') {
    const fullDebt = argv.includes('--full')
    const report = collectWaveStatus(
      fullDebt
        ? (c) => scanWaveAxisDebt(c).reduce((s, d) => s + d.debt, 0)
        : () => -1,
      cwd,
    )
    console.log(formatWaveStatus(report))
    return report.stalledReason && !(report.lock && !report.lockStale) ? 1 : 0
  }
  const r = coordinatedWave({
    cwd,
    batch: Number(argv.find((a) => a.startsWith('--batch='))?.slice(8) ?? 30),
    dryRun: !argv.includes('--apply'),
    force: argv.includes('--force'),
  })
  console.log(renderWaveReport(r))
  return r.aborted ? 2 : 0
}

if (import.meta.url === `file://${process.argv[1]}`) process.exit(runWaveCli())
