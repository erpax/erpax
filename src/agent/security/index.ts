/**
 * agent/security — parse allowlist + security monitor (fail closed).
 */
import { publish, violationsWatchPath } from '@/agent/communication/realtime'
import { issueReceipt, type Decision, type Receipt } from '@/receipt'

export const PARSE_SOURCE_ALLOWLIST = [
  'corpus:local',
  'corpus:readme',
  'corpus:skill',
  'agent:inventory',
  'agent:research',
  'mcp:broker',
  'mcp:sandbox',
] as const

export interface ParseSecurityEvent {
  readonly source: string
  readonly allowed: boolean
  readonly bytes: number
  readonly emittedAt: string
  readonly receipt?: Receipt
  readonly reason?: string
}

export interface ParseSecurityResult<T = unknown> {
  readonly allowed: boolean
  readonly parsed: T | null
  readonly receipt: Receipt | null
  readonly reason?: string
}

export interface SecurityMonitorState {
  readonly events: readonly ParseSecurityEvent[]
  readonly blocked: number
  readonly allowed: number
  readonly lastEventAt: string | null
}

const events: ParseSecurityEvent[] = []
let head: { leafUuid: string; seq: number } | null = null

export function isAllowlistedSource(source: string): boolean {
  if ((PARSE_SOURCE_ALLOWLIST as readonly string[]).includes(source)) return true
  return PARSE_SOURCE_ALLOWLIST.some((p) => source.startsWith(`${p}:`))
}

export function resetSecurityMonitorForTests(): void {
  events.length = 0
  head = null
}

const record = (source: string, allowed: boolean, bytes: number, reason?: string): ParseSecurityEvent => {
  const emittedAt = new Date().toISOString()
  let receipt: Receipt | undefined
  if (!allowed) {
    const decision: Decision = {
      action: `parse:block:${source}`,
      actor: 'agent/security',
      outcome: 'block',
      tier: 'security',
      capabilities: [],
    }
    receipt = issueReceipt({ decision, head, timestampIso: emittedAt })
    head = { leafUuid: receipt.leafUuid, seq: receipt.seq }
  }
  const ev: ParseSecurityEvent = { source, allowed, bytes, emittedAt, receipt, reason }
  events.push(ev)
  publish(violationsWatchPath(), {
    kind: 'violation',
    payload: { axis: 'parse-source', source, allowed, detail: reason ?? (allowed ? 'ok' : 'blocked'), scannedAt: emittedAt },
  })
  return ev
}

export function parseWithSecurity<T>(input: string, source: string, parse: (raw: string) => T): ParseSecurityResult<T> {
  const bytes = Buffer.byteLength(input, 'utf8')
  if (!isAllowlistedSource(source)) {
    const ev = record(source, false, bytes, `source not allowlisted: ${source}`)
    return { allowed: false, parsed: null, receipt: ev.receipt ?? null, reason: ev.reason }
  }
  record(source, true, bytes)
  try {
    return { allowed: true, parsed: parse(input), receipt: null }
  } catch (e) {
    const ev = record(source, false, bytes, e instanceof Error ? e.message : String(e))
    return { allowed: false, parsed: null, receipt: ev.receipt ?? null, reason: ev.reason }
  }
}

export function securityMonitor(): SecurityMonitorState {
  const allowed = events.filter((e) => e.allowed).length
  const blocked = events.filter((e) => !e.allowed).length
  return { events: [...events], allowed, blocked, lastEventAt: events.at(-1)?.emittedAt ?? null }
}

export function formatSecurityMonitorLine(): string {
  const s = securityMonitor()
  return `security parse allowed=${s.allowed} blocked=${s.blocked}`
}
