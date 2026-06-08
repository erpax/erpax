/**
 * quantum/context — always-quantum default: superposition until seal, entangled collapse.
 *
 * Composes @/realtime append log · @/quantum/entanglement/direction-bus for cycle wrappers.
 *
 * @see ./bindings — ./entanglement/direction-bus — ../realtime
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { append } from '@/realtime'
import { listActiveRealtimeChannels } from '@/agent/communication/realtime'
import { report as entanglementReport } from '@/quantum/entanglement'
import { fieldEntanglementCount } from '@/quantum/entanglement/registry'
import {
  entangledChannelCount,
  interruptTokenFor,
  isDirectionStale,
  subscribeDirection,
  type InterruptToken,
  type SealedDirection,
} from '@/quantum/entanglement/direction-bus'

export type SuperpositionKind = 'pending' | 'collapsed' | 'aborted'

export interface SuperpositionLogEntry {
  readonly kind: SuperpositionKind
  readonly path: string
  readonly label: string
  readonly at: string
}

export interface QuantumContextOpts {
  readonly path: string
  readonly agentId: string
  readonly label?: string
}

export interface QuantumRunContext {
  readonly token: InterruptToken
  readonly path: string
  readonly superpositionLog: readonly SuperpositionLogEntry[]
  readonly isAborted: () => boolean
  readonly pending: (label: string) => void
  readonly collapse: (label: string) => void
}

export interface QuantumRunResult<T> {
  readonly result: T
  readonly aborted: boolean
  readonly collapsed: boolean
  readonly direction?: SealedDirection
  readonly superpositionLog: readonly SuperpositionLogEntry[]
}

export interface QuantumStatusReport {
  readonly mode: 'quantum' | 'classical'
  readonly entangledChannels: number
  readonly pendingPaths: readonly string[]
  readonly lastCollapse: SealedDirection | null
  readonly reciprocityPct: number
}

const WATCH_LOOP_SOURCES = [
  'src/apply/automate/index.ts',
  'src/monitor/violations/loop.ts',
  'src/monitor/violations/index.ts',
] as const

let superpositionLog: SuperpositionLogEntry[] = []
let lastCollapse: SealedDirection | null = null
const pendingPaths = new Set<string>()

const pushLog = (entry: SuperpositionLogEntry): void => {
  superpositionLog = append(superpositionLog, entry)
}

/** Entangled channel count — direction bus · push channels · field registry bonds. */
export function quantumEntangledChannelCount(): number {
  return entangledChannelCount() + listActiveRealtimeChannels().length + fieldEntanglementCount()
}

/** Live quantum status for `pnpm erpax quantum status`. */
export function quantumStatus(): QuantumStatusReport {
  const ent = entanglementReport()
  return {
    mode: 'quantum',
    entangledChannels: quantumEntangledChannelCount(),
    pendingPaths: [...pendingPaths].sort(),
    lastCollapse,
    reciprocityPct: Math.round(ent.reciprocity * 1000) / 10,
  }
}

export function formatQuantumStatus(report: QuantumStatusReport): string {
  const lines = ['erpax quantum status\n']
  lines.push(`  mode              ${report.mode}`)
  lines.push(`  entangled channels ${report.entangledChannels}`)
  lines.push(`  bond reciprocity   ${report.reciprocityPct}%`)
  if (report.pendingPaths.length) {
    lines.push(`  superposition      ${report.pendingPaths.join(', ')}`)
  } else {
    lines.push('  superposition      (none)')
  }
  if (report.lastCollapse) {
    lines.push(
      `  last collapse      ${report.lastCollapse.path} gen ${report.lastCollapse.generation} · ${report.lastCollapse.payload.instruction.slice(0, 48)}`,
    )
  } else {
    lines.push('  last collapse      —')
  }
  return lines.join('\n')
}

/** Static scan — watch loops that poll without direction subscribe (classical violation). */
export function classicalModeWatchViolations(cwd: string = process.cwd()): readonly string[] {
  const out: string[] = []
  for (const rel of WATCH_LOOP_SOURCES) {
    const abs = join(cwd, rel)
    let text: string
    try {
      text = readFileSync(abs, 'utf8')
    } catch {
      continue
    }
    const hasWatch = text.includes('setInterval') || text.includes('--watch')
    const hasSubscribe =
      text.includes('subscribeDirection') ||
      text.includes('withQuantumContext') ||
      text.includes('runInQuantumContext') ||
      text.includes('bindWatchRealtime')
    if (hasWatch && !hasSubscribe) out.push(rel)
  }
  return out
}

/** Reset module state — tests only. */
export function __resetQuantumContextForTests(): void {
  superpositionLog = []
  lastCollapse = null
  pendingPaths.clear()
}

/**
 * Quantum cycle wrapper — subscribe direction bus, interrupt token, superposition log until collapse.
 */
export function withQuantumContext<T>(
  fn: (ctx: QuantumRunContext) => T,
  opts: QuantumContextOpts,
): QuantumRunResult<T> {
  const label = opts.label ?? opts.path
  const token = interruptTokenFor(opts.path, opts.agentId)
  pendingPaths.add(opts.path)
  pushLog({ kind: 'pending', path: opts.path, label, at: new Date().toISOString() })

  let aborted = false
  let direction: SealedDirection | undefined
  let collapsed = false
  const localLog: SuperpositionLogEntry[] = []

  const pending = (pendingLabel: string): void => {
    const entry: SuperpositionLogEntry = {
      kind: 'pending',
      path: opts.path,
      label: pendingLabel,
      at: new Date().toISOString(),
    }
    localLog.push(entry)
    pushLog(entry)
  }

  const collapse = (collapseLabel: string): void => {
    collapsed = true
    pendingPaths.delete(opts.path)
    const entry: SuperpositionLogEntry = {
      kind: 'collapsed',
      path: opts.path,
      label: collapseLabel,
      at: new Date().toISOString(),
    }
    localLog.push(entry)
    pushLog(entry)
  }

  const off = subscribeDirection(opts.path, (dir) => {
    aborted = true
    direction = dir
    lastCollapse = dir
    pendingPaths.delete(opts.path)
    const entry: SuperpositionLogEntry = {
      kind: 'aborted',
      path: opts.path,
      label: dir.payload.instruction,
      at: dir.payload.issuedAt,
    }
    localLog.push(entry)
    pushLog(entry)
  })

  const ctx: QuantumRunContext = {
    token,
    path: opts.path,
    superpositionLog: localLog,
    isAborted: () => aborted || isDirectionStale(token),
    pending,
    collapse,
  }

  let result: T
  try {
    result = fn(ctx)
    if (!aborted && !collapsed) {
      collapse(label)
    }
  } finally {
    off()
    if (!collapsed && !aborted) pendingPaths.delete(opts.path)
  }

  return {
    result,
    aborted,
    collapsed: collapsed && !aborted,
    direction,
    superpositionLog: localLog,
  }
}

export const runInQuantumContext = withQuantumContext
