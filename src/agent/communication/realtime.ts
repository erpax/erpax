/**
 * agent/communication/realtime — unified push facade (direction bus · violation stream · sync).
 *
 * Law: communication is always realtime — publishDirection + subscribeDirection;
 * Task resume-wait is fallback only. Inventory + direction collapse same tick.
 *
 * @see ./SKILL.md · @/quantum/entanglement/direction-bus · @/monitor/violations/stream
 */
import { toAtomPath } from '@/path'
import {
  publishDirection,
  subscribeDirection,
  improveDirectionPath,
  cleanDirectionPath,
  automateDirectionPath,
  type DirectionPayload,
  type SealedDirection,
} from '@/quantum/entanglement/direction-bus'
import {
  pushCrossViolationToStream,
  subscribeCrossViolationStream,
  type StreamedCrossViolation,
} from '@/monitor/violations/stream'

/** Law binding — realtime is default; env opt-out logs a violation. */
export const REALTIME_DEFAULT = true

export type RealtimeEventKind =
  | 'direction'
  | 'violation'
  | 'inventory'
  | 'scan'
  | 'improve'
  | 'sync'
  | 'generic'

export interface RealtimeEvent {
  readonly path: string
  readonly kind: RealtimeEventKind
  readonly payload: unknown
  readonly emittedAt: string
}

export interface RealtimeChannel {
  readonly path: string
  publish: (event: Omit<RealtimeEvent, 'path' | 'emittedAt'> & { readonly emittedAt?: string }) => RealtimeEvent
  subscribe: (handler: (event: RealtimeEvent) => void) => () => void
  subscriberCount: () => number
  lastEventAgeMs: () => number | null
}

interface ChannelState {
  subscribers: Set<(event: RealtimeEvent) => void>
  lastEmittedAtMs: number | null
  generation: number
}

const channels = new Map<string, ChannelState>()
let lawViolationLogged = false

const channelState = (path: string): ChannelState => {
  let ch = channels.get(path)
  if (!ch) {
    ch = { subscribers: new Set(), lastEmittedAtMs: null, generation: 0 }
    channels.set(path, ch)
  }
  return ch
}

const notify = (event: RealtimeEvent): void => {
  const ch = channelState(event.path)
  ch.lastEmittedAtMs = Date.now()
  ch.generation++
  for (const handler of ch.subscribers) {
    handler(event)
  }
}

const logRealtimeOptOut = (): void => {
  if (lawViolationLogged) return
  lawViolationLogged = true
  process.stderr.write(
    'law violation: ERPAX_REALTIME opt-out — communication must be realtime; poll/resume-wait is fallback only\n',
  )
}

/** True unless env explicitly disables realtime (logs law violation once). */
export function isRealtimeEnabled(): boolean {
  const env = process.env.ERPAX_REALTIME?.trim().toLowerCase()
  if (env === '0' || env === 'false' || env === 'off') {
    logRealtimeOptOut()
    return false
  }
  return REALTIME_DEFAULT
}

export const violationsWatchPath = (): string =>
  toAtomPath('src/monitor/violations/index.ts', 'fs') || 'monitor/violations'

export const inventoryWatchPath = (): string =>
  toAtomPath('src/agent/inventory/index.ts', 'fs') || 'agent/inventory'

export const sessionApplyPath = (): string =>
  toAtomPath('src/apply/index.ts', 'fs') || 'apply'

export const strictApplyPath = (): string =>
  toAtomPath('src/agent/strict-apply.ts', 'fs') || 'agent/strict-apply'

export { improveDirectionPath, cleanDirectionPath, automateDirectionPath }

/** Publish one realtime event — same-tick delivery to all subscribers on path. */
export function publish(
  path: string,
  event: Omit<RealtimeEvent, 'path' | 'emittedAt'> & { readonly emittedAt?: string },
): RealtimeEvent {
  const emittedAt = event.emittedAt ?? new Date().toISOString()
  const full: RealtimeEvent = { path, kind: event.kind, payload: event.payload, emittedAt }

  if (event.kind === 'direction') {
    const payload = event.payload as Omit<DirectionPayload, 'issuedAt'> & { readonly issuedAt?: string }
    const sealed = publishDirection(path, payload)
    notify({ ...full, payload: sealed })
    return { ...full, payload: sealed }
  }

  if (event.kind === 'violation') {
    pushCrossViolationToStream(event.payload as StreamedCrossViolation)
  }

  notify(full)
  return full
}

/** Subscribe to realtime events on a path — handler runs in publisher tick. */
export function subscribe(path: string, handler: (event: RealtimeEvent) => void): () => void {
  const ch = channelState(path)
  ch.subscribers.add(handler)

  const offDirection = subscribeDirection(path, (dir: SealedDirection) => {
    handler({
      path,
      kind: 'direction',
      payload: dir,
      emittedAt: dir.payload.issuedAt,
    })
  })

  const offViolation =
    path === violationsWatchPath() || path === strictApplyPath()
      ? subscribeCrossViolationStream((streamed) => {
          handler({
            path,
            kind: 'violation',
            payload: streamed,
            emittedAt: streamed.scannedAt,
          })
        })
      : () => undefined

  return () => {
    ch.subscribers.delete(handler)
    offDirection()
    offViolation()
  }
}

export function realtimeChannelFor(path: string): RealtimeChannel {
  return {
    path,
    publish: (event) => publish(path, event),
    subscribe: (handler) => subscribe(path, handler),
    subscriberCount: () => channelState(path).subscribers.size,
    lastEventAgeMs: () => {
      const at = channelState(path).lastEmittedAtMs
      return at === null ? null : Date.now() - at
    },
  }
}

export interface BindWatchRealtimeOpts {
  readonly paths: readonly string[]
  readonly onSignal: () => void
  readonly pollMs: number
  readonly pollFallbackMultiplier?: number
}

/** Subscribe on start; poll is fallback only when realtime disabled or safety net. */
export function bindWatchRealtime(opts: BindWatchRealtimeOpts): { readonly stop: () => void } {
  const stops: Array<() => void> = []

  if (isRealtimeEnabled()) {
    for (const path of opts.paths) {
      stops.push(subscribe(path, () => opts.onSignal()))
    }
    const fallbackMs = opts.pollMs * (opts.pollFallbackMultiplier ?? 6)
    process.stderr.write(
      `realtime watch — push on ${opts.paths.join(', ')} · poll fallback ${fallbackMs}ms\n`,
    )
    const id = setInterval(opts.onSignal, fallbackMs)
    id.unref?.()
    stops.push(() => clearInterval(id))
    return { stop: () => stops.forEach((s) => s()) }
  }

  process.stderr.write(`realtime watch — poll only ${opts.pollMs}ms (realtime disabled)\n`)
  const id = setInterval(opts.onSignal, opts.pollMs)
  id.unref?.()
  return { stop: () => clearInterval(id) }
}

export function emitInventoryStalePush(result: {
  readonly staleCount: number
  readonly scannedAt: string
  readonly warnings: readonly string[]
}): void {
  if (result.staleCount <= 0) return
  publish(inventoryWatchPath(), {
    kind: 'inventory',
    emittedAt: result.scannedAt,
    payload: {
      staleCount: result.staleCount,
      warnings: result.warnings,
      detail: `${result.staleCount} stale subagent(s) — resume batch commit or publishDirection abort`,
    },
  })
}

export interface RealtimeChannelRow {
  readonly path: string
  readonly subscriberCount: number
  readonly lastEventAgeSec: number | null
  readonly generation: number
}

export function listActiveRealtimeChannels(): readonly RealtimeChannelRow[] {
  return [...channels.entries()]
    .map(([path, ch]) => ({
      path,
      subscriberCount: ch.subscribers.size,
      lastEventAgeSec:
        ch.lastEmittedAtMs === null ? null : Math.round((Date.now() - ch.lastEmittedAtMs) / 1000),
      generation: ch.generation,
    }))
    .sort((a, b) => a.path.localeCompare(b.path))
}

export function formatRealtimeChannelsReport(): string {
  const rows = listActiveRealtimeChannels()
  const lines: string[] = ['erpax agent realtime — active channels\n']
  if (!rows.length) {
    lines.push('  (no channels opened yet — start a watch loop to bind subscribers)')
    return lines.join('\n')
  }
  for (const row of rows) {
    const age =
      row.lastEventAgeSec === null ? 'never' : row.lastEventAgeSec === 0 ? 'now' : `${row.lastEventAgeSec}s ago`
    lines.push(
      `  ${row.path} · subscribers ${row.subscriberCount} · last event ${age} · gen ${row.generation}`,
    )
  }
  lines.push('')
  lines.push(`realtime default: ${REALTIME_DEFAULT} · enabled: ${isRealtimeEnabled()}`)
  return lines.join('\n')
}

export function realtimeDoctorLine(): string {
  const rows = listActiveRealtimeChannels()
  const n = rows.length
  const ages = rows
    .map((r) => r.lastEventAgeSec)
    .filter((a): a is number => a !== null)
  const minAge = ages.length ? Math.min(...ages) : null
  const ageLabel = minAge === null ? '—' : minAge === 0 ? '0s' : `${minAge}s`
  return `realtime channels ${n} · last event ${ageLabel} ago`
}

export function __resetRealtimeForTests(): void {
  channels.clear()
  lawViolationLogged = false
}
