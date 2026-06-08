/**
 * monitor/violations/realtime — collapse → wave emit on violation fingerprint change.
 *
 * Composes @/team/comms · @/realtime · @/wave/session (0896eab2) for live admin UI.
 */
import { computeContentUuid, jcsCanonicalize, uuid } from '@/integrity'
import { append, advance as realtimeAdvance } from '@/realtime'
import {
  SECURE_WAVE_PAYLOAD_KEY,
  waveCorrelationUuid,
  waveInSecureComms,
  type SecureWaveEnvelope,
  type TeamCommsEmit,
  type WaveInSecureCommsResult,
} from '@/team/comms'
import type { ViolationEvent, ViolationScanSnapshot } from './index'

export interface ViolationRealtimeEvent {
  readonly event: 'monitor:violation:detected'
  readonly priorFingerprint: string
  readonly nextFingerprint: string
  readonly newViolations: readonly ViolationEvent[]
  readonly emit: TeamCommsEmit
  readonly verdictOk: boolean
}

export interface ViolationRealtimeEmitResult extends WaveInSecureCommsResult {
  readonly violationEvent: ViolationRealtimeEvent
  readonly toast: { readonly title: string; readonly description: string }
}

export interface ViolationRealtimeEmitOpts {
  readonly scopeTenantId: string
  readonly tenantId: string
  readonly teamId: string
  readonly sessionId: string
  readonly agent: string
  readonly priorFingerprint: string
  readonly snapshot: ViolationScanSnapshot
  readonly newViolations: readonly ViolationEvent[]
  readonly collapsedAt?: string
  readonly waveId?: number
  readonly receipt?: {
    readonly actor: string
    readonly head: { leafUuid: string; seq: number } | null
    readonly timestampIso: string
  }
}

export function violationSessionUuid(parts: {
  readonly sessionId: string
  readonly priorFingerprint: string
  readonly nextFingerprint: string
  readonly eventUuid: string
}): string {
  return uuid(
    jcsCanonicalize({
      sessionId: parts.sessionId,
      priorFingerprint: parts.priorFingerprint,
      nextFingerprint: parts.nextFingerprint,
      eventUuid: parts.eventUuid,
    }),
  )
}

export function violationWaveCorrelationUuid(opts: {
  readonly sessionId: string
  readonly tenantId: string
  readonly teamId: string
}): string {
  return waveCorrelationUuid(opts)
}

/** Emit team/comms wave when the violation fingerprint shifts — Sonner-ready toast copy. */
export function violationRealtimeEmit(opts: ViolationRealtimeEmitOpts): ViolationRealtimeEmitResult {
  const collapsedAt = opts.collapsedAt ?? new Date().toISOString()
  const event = 'monitor:violation:detected'
  const payload = {
    priorFingerprint: opts.priorFingerprint,
    nextFingerprint: opts.snapshot.fingerprint,
    total: opts.snapshot.counts.total,
    newCount: opts.newViolations.length,
    waveOrdinal: opts.snapshot.waveOrdinal,
    samples: opts.newViolations.slice(0, 5).map((v) => ({
      source: v.source,
      accountCode: v.accountCode,
      detail: v.detail,
    })),
    [SECURE_WAVE_PAYLOAD_KEY]: {
      waveId: opts.waveId ?? 0,
      correlationUuid: violationWaveCorrelationUuid({
        sessionId: opts.sessionId,
        tenantId: opts.tenantId,
        teamId: opts.teamId,
      }),
      depth: opts.waveId ?? 0,
      tenantId: opts.tenantId,
      teamId: opts.teamId,
      emittedAt: collapsedAt,
    } satisfies SecureWaveEnvelope,
  }

  const eventUuid = computeContentUuid(
    {
      id: event,
      tenantId: opts.tenantId,
      payload,
      emittedAt: collapsedAt,
    },
    opts.tenantId,
  )

  const result = waveInSecureComms({
    scopeTenantId: opts.scopeTenantId,
    envelope: (payload as Record<string, unknown>)[SECURE_WAVE_PAYLOAD_KEY] as SecureWaveEnvelope,
    event,
    eventUuid,
    agent: opts.agent,
    payload,
    receipt: opts.receipt,
  })

  const first = opts.newViolations[0]
  const toastTitle = result.verdict.ok
    ? `${opts.newViolations.length} new violation(s)`
    : 'Violation emit blocked'
  const toastDescription = result.verdict.ok
    ? first
      ? `${first.source} · ${first.accountCode} — ${first.detail.slice(0, 80)}`
      : `${opts.snapshot.counts.total} total violations`
    : (result.verdict.reason ?? 'gate rejected')

  return {
    ...result,
    violationEvent: {
      event,
      priorFingerprint: opts.priorFingerprint,
      nextFingerprint: opts.snapshot.fingerprint,
      newViolations: opts.newViolations,
      emit: result.emit,
      verdictOk: result.verdict.ok,
    },
    toast: { title: toastTitle, description: toastDescription },
  }
}

export function appendViolationToLog<T extends ViolationRealtimeEvent>(
  log: readonly T[],
  event: T,
): T[] {
  return append(log, event)
}

export const violationLogAdvance = realtimeAdvance
