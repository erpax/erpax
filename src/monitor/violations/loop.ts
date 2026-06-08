/**
 * monitor/violations/loop — scan → prioritize → improve → receipt (0896eab2 wave batches).
 *
 *   tsx src/monitor/violations/loop.ts --watch
 *   pnpm improve:watch
 */
import { computeContentUuid } from '@/integrity'
import {
  SECURE_WAVE_PAYLOAD_KEY,
  waveCorrelationUuid,
  waveInSecureComms,
  type SecureWaveEnvelope,
} from '@/team/comms'
import {
  prioritizeViolations,
  improveInRealtime,
  violationImproveClass,
  type ImproveResult,
} from './improve'
import { scanViolationsRealtime, type ViolationEvent, type ViolationScanSnapshot } from './index'
import {
  maxWorkTamperPolicy,
  workTamperProduct,
  workUnitsFromImproveCycle,
  type WorkTamperProductVerdict,
} from '@/wave'
import {
  recordEfficiencyPass,
  formatEfficiencySummary,
} from '@/apply/efficiency'
import {
  bindWatchRealtime,
  improveDirectionPath,
  violationsWatchPath,
} from '@/agent/communication/realtime'
import {
  interruptTokenFor,
  isDirectionStale,
  peekDirection,
  type InterruptToken,
  type SealedDirection,
} from '@/quantum/entanglement/direction-bus'
import { quantumModeDefault } from '@/quantum/bindings'
import { withQuantumContext } from '@/quantum/context'

export interface RealtimeImproveLoopOpts {
  readonly cwd?: string
  readonly dryRun?: boolean
  readonly maxFixes?: number
  readonly waveSample?: boolean
  readonly actor?: string
  readonly tenantId?: string
  readonly teamId?: string
  readonly sessionId?: string
  readonly emitWave?: boolean
  /** Pre-built scan — skips redundant full scan when caller already polled. */
  readonly snapshot?: ViolationScanSnapshot
  /** When set, only attempt improve on these violations (post-detect tail). */
  readonly violations?: readonly ViolationEvent[]
  /** Path ledger depth for tamper amplification on improve receipts. */
  readonly pathLedgerDepth?: number
  /** Direction channel path — defaults to improve facet atom path. */
  readonly directionPath?: string
  /** Token captured at cycle start — aborts mid-loop when stale. */
  readonly directionToken?: InterruptToken
  /** @internal — set by withQuantumContext wrapper */
  readonly __quantumWrapped?: boolean
}

export interface RealtimeImproveCycleResult {
  readonly snapshot: ViolationScanSnapshot
  readonly prioritized: readonly ViolationEvent[]
  readonly applied: readonly ImproveResult[]
  readonly queued: readonly ViolationEvent[]
  readonly skipped: readonly ViolationEvent[]
  readonly toast: { readonly title: string; readonly description: string }
  readonly workTamper: WorkTamperProductVerdict
  /** Set when a direction collapse aborted the cycle before completion. */
  readonly redirected?: boolean
  readonly direction?: SealedDirection
}

const DEFAULT_TENANT = 'erpax-corpus'
const DEFAULT_TEAM = 'violation-improve'
const DEFAULT_SESSION = '0896eab2-improve-session'

export function improveWaveCorrelationUuid(opts: {
  readonly sessionId: string
  readonly tenantId: string
  readonly teamId: string
}): string {
  return waveCorrelationUuid(opts)
}

/** One improve cycle — wave-batched scan, capped auto-fixes, human-gate queue. */
export function runRealtimeImproveCycle(opts: RealtimeImproveLoopOpts = {}): RealtimeImproveCycleResult {
  const actor = opts.actor ?? 'monitor-improve-loop'
  const directionPath = opts.directionPath ?? improveDirectionPath()
  if (quantumModeDefault() && !opts.__quantumWrapped) {
    return withQuantumContext(
      () => runRealtimeImproveCycle({ ...opts, __quantumWrapped: true }),
      { path: directionPath, agentId: actor, label: 'improve:watch' },
    ).result
  }

  const cwd = opts.cwd ?? process.cwd()
  const policy = maxWorkTamperPolicy()
  const maxFixes = opts.maxFixes ?? policy.maxFixesPerCycle
  const dryRun = opts.dryRun ?? false
  const pathLedgerDepth = opts.pathLedgerDepth ?? 0
  const directionToken =
    opts.directionToken ?? interruptTokenFor(directionPath, actor)

  const snapshot =
    opts.snapshot ??
    scanViolationsRealtime({
      cwd,
      waveSample: opts.waveSample !== false,
      maxEvents: 500,
    })

  const prioritized = prioritizeViolations(opts.violations ?? snapshot.events)
  const applied: ImproveResult[] = []
  const queued: ViolationEvent[] = []
  const skipped: ViolationEvent[] = []

  for (const violation of prioritized) {
    if (isDirectionStale(directionToken)) {
      const direction = peekDirection(directionPath)!
      return {
        snapshot,
        prioritized,
        applied,
        queued,
        skipped,
        toast: {
          title: 'Direction collapsed',
          description: `${direction.payload.instruction} · gen ${direction.generation}`,
        },
        workTamper: workTamperProduct(
          workUnitsFromImproveCycle({
            applied: applied.filter((r) => r.applied),
            waveOrdinal: snapshot.waveOrdinal ?? undefined,
            pathLedgerDepth,
          }),
        ),
        redirected: true,
        direction,
      }
    }
    const cls = violationImproveClass(violation)
    if (cls === 'human-gate') {
      queued.push(violation)
      continue
    }
    if (cls === 'never') {
      skipped.push(violation)
      continue
    }
    if (applied.filter((r) => r.applied).length >= maxFixes) continue

    const result = improveInRealtime(violation, {
      cwd,
      dryRun,
      actor,
      pathLedgerDepth,
      completedWaves: snapshot.waveOrdinal ?? undefined,
    })
    applied.push(result)
  }

  const fixCount = applied.filter((r) => r.applied).length
  const toastTitle =
    fixCount > 0 ? `Improved ${fixCount} violation(s)` : queued.length > 0 ? 'Violations queued' : 'Corpus held'
  const firstFix = applied.find((r) => r.applied)
  const toastDescription =
    fixCount > 0 && firstFix
      ? `${firstFix.action} · ${firstFix.accountCode}${queued.length ? ` · ${queued.length} gated` : ''}`
      : queued.length > 0
        ? `${queued.length} await human gate (tenant/invoices/structure)`
        : `${snapshot.counts.total} violations · wave ${snapshot.waveOrdinal ?? '—'}`

  if (opts.emitWave !== false && fixCount > 0) {
    const collapsedAt = new Date().toISOString()
    const tenantId = opts.tenantId ?? DEFAULT_TENANT
    const teamId = opts.teamId ?? DEFAULT_TEAM
    const sessionId = opts.sessionId ?? DEFAULT_SESSION
    const event = 'monitor:violation:improved'
    const payload = {
      fixCount,
      queued: queued.length,
      waveOrdinal: snapshot.waveOrdinal,
      samples: applied
        .filter((r) => r.applied)
        .slice(0, 5)
        .map((r) => ({ action: r.action, accountCode: r.accountCode })),
      [SECURE_WAVE_PAYLOAD_KEY]: {
        waveId: snapshot.waveOrdinal ?? 0,
        correlationUuid: improveWaveCorrelationUuid({ sessionId, tenantId, teamId }),
        depth: snapshot.waveOrdinal ?? 0,
        tenantId,
        teamId,
        emittedAt: collapsedAt,
      } satisfies SecureWaveEnvelope,
    }
    const eventUuid = computeContentUuid(
      { id: event, tenantId, payload, emittedAt: collapsedAt },
      tenantId,
    )
    waveInSecureComms({
      scopeTenantId: tenantId,
      envelope: (payload as Record<string, unknown>)[SECURE_WAVE_PAYLOAD_KEY] as SecureWaveEnvelope,
      event,
      eventUuid,
      agent: actor,
      payload,
      receipt: { actor, head: null, timestampIso: collapsedAt },
    })
  }

  const appliedFixes = applied.filter((r) => r.applied)
  const workTamper = workTamperProduct(
    workUnitsFromImproveCycle({
      applied: appliedFixes,
      waveOrdinal: snapshot.waveOrdinal ?? undefined,
      pathLedgerDepth,
    }),
  )

  return {
    snapshot,
    prioritized,
    applied,
    queued,
    skipped,
    toast: { title: toastTitle, description: toastDescription },
    workTamper,
  }
}

/** Alias — continuous improve loop entry. */
export const RealtimeImproveLoop = runRealtimeImproveCycle

if (import.meta.url === `file://${process.argv[1]}`) {
  const watch = process.argv.includes('--watch')
  const dryRun = process.argv.includes('--dry-run')
  const intervalMs = Number(process.argv.find((a) => a.startsWith('--interval='))?.slice(11) ?? 5000)
  const maxFixes = Number(process.argv.find((a) => a.startsWith('--max='))?.slice(6) ?? maxWorkTamperPolicy().maxFixesPerCycle)

  const tick = (): void => {
    const cycle = runRealtimeImproveCycle({ dryRun, maxFixes, emitWave: !dryRun })
    const fixed = cycle.applied.filter((r) => r.applied)
    console.log(
      `improve — ${fixed.length} fixed · ${cycle.queued.length} gated · ${cycle.snapshot.counts.total} violations · wave ${cycle.snapshot.waveOrdinal ?? '—'}`,
    )
    for (const r of fixed.slice(0, 8)) {
      console.log(
        `  ✓ [${r.action}] ${r.accountCode}${r.sealCreditEb ? ` +${r.sealCreditEb} eb seal` : ''}${r.tamperCostLog2 ? ` tamper²=${r.tamperCostLog2.toFixed(1)}` : ''}`,
      )
    }
    if (fixed.length > 0) {
      const wt = cycle.workTamper
      console.log(
        `  work×tamper ${wt.workSealed.toFixed(2)} eb × ${Number.isFinite(wt.tamperCostLog2) ? wt.tamperCostLog2.toFixed(1) : '∞'} = ${Number.isFinite(wt.product) ? wt.product.toFixed(1) : '∞'} (coverage ${(wt.coverage * 100).toFixed(0)}%)`,
      )
    }
    const { snapshot, ratchet } = recordEfficiencyPass('improve:watch', {
      workTamperProduct: cycle.workTamper.product,
      violationCount: cycle.snapshot.counts.total,
    })
    console.log(formatEfficiencySummary(snapshot, ratchet))
    if (!ratchet.ok && !watch) process.exit(1)
    for (const q of cycle.queued.slice(0, 4)) {
      console.log(`  ⏸ [human-gate] ${q.source} · ${q.accountCode}`)
    }
    if (!watch) process.exit(fixed.length > 0 || cycle.snapshot.ok ? 0 : 1)
  }

  tick()
  if (watch) {
    bindWatchRealtime({
      paths: [improveDirectionPath(), violationsWatchPath()],
      onSignal: tick,
      pollMs: intervalMs,
    })
    process.on('SIGINT', () => {
      process.stderr.write('\nimprove:watch — stopped\n')
      process.exit(0)
    })
  }
}
