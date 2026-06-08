/**
 * monitor/violations/cross-realtime — wave emit + Sonner toast for cross-concept violations.
 *
 * Event: `monitor:cross:violation` — education markdown + uncrossed axes for agents.
 */
import { computeContentUuid } from '@/integrity'
import {
  crossConceptNotificationPayload,
  type CrossConceptNotificationPayload,
} from '@/seal'
import {
  SECURE_WAVE_PAYLOAD_KEY,
  waveCorrelationUuid,
  waveInSecureComms,
  type SecureWaveEnvelope,
  type TeamCommsEmit,
  type WaveInSecureCommsResult,
} from '@/team/comms'
import type { ViolationEvent } from './index'

export const CROSS_VIOLATION_EVENT = 'monitor:cross:violation' as const

export interface CrossViolationRealtimeEvent {
  readonly event: typeof CROSS_VIOLATION_EVENT
  readonly payload: CrossConceptNotificationPayload
  readonly violation: ViolationEvent
  readonly emit: TeamCommsEmit
  readonly verdictOk: boolean
}

export interface CrossViolationRealtimeEmitResult extends WaveInSecureCommsResult {
  readonly crossEvent: CrossViolationRealtimeEvent
  readonly toast: { readonly title: string; readonly description: string }
}

export interface CrossViolationRealtimeEmitOpts {
  readonly scopeTenantId: string
  readonly tenantId: string
  readonly teamId: string
  readonly sessionId: string
  readonly agent: string
  readonly violation: ViolationEvent
  readonly collapsedAt?: string
  readonly waveId?: number
  readonly receipt?: {
    readonly actor: string
    readonly head: { leafUuid: string; seq: number } | null
    readonly timestampIso: string
  }
}

/** Sources that imply cross-education class (rules + finishedIdeaCrossed impurities). */
export const CROSS_EDUCATION_SOURCES = new Set([
  'cross-concept',
  'alphanumeric-name',
  'rules-stray-ts',
  'rules-multi-segment',
  'rules-accounting',
  'finished-idea-cross',
  'folder-law',
  'import-boundary',
  'path-follow',
  'gap-eb',
  'logic-concentration',
  'word-matter',
  'word-without-code',
  'word-without-logic',
  'word-incomplete-diamond',
] as const)

export function isCrossEducationViolation(source: ViolationEvent['source']): boolean {
  return (CROSS_EDUCATION_SOURCES as ReadonlySet<string>).has(source)
}

/** Build notification payload from a violation event (cross-concept or rules/cross class). */
export function crossNotificationFromViolation(
  violation: ViolationEvent,
  gate: 'strict-apply' | 'scan' = violation.origin === 'strict-apply' ? 'strict-apply' : 'scan',
): CrossConceptNotificationPayload {
  if (violation.crossEducation && violation.uncrossedAxes?.length) {
    const axis = violation.uncrossedAxes[0] ?? 'folder-trinity'
    return {
      event: CROSS_VIOLATION_EVENT,
      atomPath: violation.atomPath,
      accountCode: violation.accountCode,
      axis,
      dimension: violation.crossDimension ?? 'trinity',
      uncrossedAxes: violation.uncrossedAxes,
      crossEducation: violation.crossEducation,
      primer: crossConceptNotificationPayload({ axis, atomPath: violation.atomPath }).primer,
      reason: violation.detail,
      toastTitle: `Cross uncrossed — ${violation.crossDimension ?? 'trinity'}`,
      toastDescription: `${axis} · ${violation.accountCode} — realise cross law before retry`,
      agentChatEnvelope: {
        kind: 'agent.cross.education',
        gate,
        acknowledgeAction: 'agent.cross.acknowledge',
      },
    }
  }
  return crossConceptNotificationPayload(
    { source: violation.source, detail: violation.detail, atomPath: violation.atomPath },
    { accountCode: violation.accountCode, gate },
  )
}

/** Emit secure wave + optional MCP/agent chat envelope for one cross violation. */
export function crossViolationRealtimeEmit(
  opts: CrossViolationRealtimeEmitOpts,
): CrossViolationRealtimeEmitResult {
  const collapsedAt = opts.collapsedAt ?? new Date().toISOString()
  const payload = crossNotificationFromViolation(opts.violation, 'scan')
  const wavePayload = {
    ...payload,
    violationId: opts.violation.id,
    [SECURE_WAVE_PAYLOAD_KEY]: {
      waveId: opts.waveId ?? 0,
      correlationUuid: waveCorrelationUuid({
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
      id: CROSS_VIOLATION_EVENT,
      tenantId: opts.tenantId,
      payload: wavePayload,
      emittedAt: collapsedAt,
    },
    opts.tenantId,
  )

  const result = waveInSecureComms({
    scopeTenantId: opts.scopeTenantId,
    envelope: (wavePayload as Record<string, unknown>)[SECURE_WAVE_PAYLOAD_KEY] as SecureWaveEnvelope,
    event: CROSS_VIOLATION_EVENT,
    eventUuid,
    agent: opts.agent,
    payload: wavePayload,
    receipt: opts.receipt,
  })

  const toastTitle = result.verdict.ok ? payload.toastTitle : 'Cross violation emit blocked'
  const toastDescription = result.verdict.ok
    ? payload.toastDescription
    : (result.verdict.reason ?? 'gate rejected')

  return {
    ...result,
    crossEvent: {
      event: CROSS_VIOLATION_EVENT,
      payload,
      violation: opts.violation,
      emit: result.emit,
      verdictOk: result.verdict.ok,
    },
    toast: { title: toastTitle, description: toastDescription },
  }
}
