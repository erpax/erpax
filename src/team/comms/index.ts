/**
 * team/comms — secure realtime communication between teams.
 *
 * Every team-scoped emit onto the [[chat]] / [[realtime]] bus must pass a
 * fail-closed gate: tenant match (ISO-27001 A.5.23), content-uuid event
 * integrity (RFC 9562 §5.8), cascade depth cap (MAX_BROADCAST_DEPTH), and —
 * when a [[team]] context is supplied — voicing only as the team presence or a
 * member. Allowed emits are [[receipt]]ed (uuid-chained audit); blocked emits
 * are receipted too (no proof without a receipt).
 *
 * Pure policy + an optional Payload `beforeChange` hook for the `chat`
 * collection; composes [[realtime]] · [[sandbox]] policy shape over [[access]].
 *
 * @standard ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @standard RFC 9562 §5.8 content-uuid event-identity
 * @see ../../agent/sync/chat-broadcast (MAX_BROADCAST_DEPTH) · ./SKILL.md
 */
import type { CollectionBeforeChangeHook } from 'payload'
import { computeContentUuid } from '@/integrity'
import { issueReceipt, type Decision, type Receipt } from '@/receipt'
import { MAX_BROADCAST_DEPTH } from '@/agent/sync'
import type { Team } from '@/agent/team'
import { teamUuid } from '@/agent/team'
import { getUserTenantIDs } from '@/get/user/tenant/i/ds'
import { isSuperAdmin } from '@/is/super/admin'

/** Re-export — the runaway-loop guard shared with chat-broadcast. */
export { MAX_BROADCAST_DEPTH as MAX_TEAM_COMMS_DEPTH }

/** Fields required to evaluate a team-scoped realtime emit. */
export interface TeamCommsEmit {
  readonly tenantId: string
  readonly event: string
  readonly eventUuid: string
  readonly agent: string
  readonly payload?: unknown
  readonly depth?: number
  /** ISO-8601 emit time used when the envelope uuid was derived (empty if absent). */
  readonly emittedAt?: string
}

export interface TeamCommsVerdict {
  readonly ok: boolean
  readonly reason?: string
}

/** Extract a routable tenant id from a chat row / relationship field. */
export function resolveRowTenant(tenant: unknown): string | null {
  if (typeof tenant === 'string' || typeof tenant === 'number') return String(tenant)
  if (tenant && typeof tenant === 'object' && 'id' in tenant) {
    const id = (tenant as { id?: unknown }).id
    if (typeof id === 'string' || typeof id === 'number') return String(id)
  }
  return null
}

/** Recompute the content-uuid an honest publisher MUST stamp on this emit. */
export function expectedEventUuid(emit: TeamCommsEmit): string {
  return computeContentUuid(
    {
      id: emit.event,
      tenantId: emit.tenantId,
      payload: emit.payload ?? {},
      emittedAt: emit.emittedAt ?? '',
    },
    emit.tenantId,
  )
}

/** Scope tenant must equal emit tenant — blocks Team-A → Team-B cross-tenant leakage. */
export function tenantMatchVerdict(scopeTenantId: string, emitTenantId: string): TeamCommsVerdict {
  if (!scopeTenantId || !emitTenantId) {
    return { ok: false, reason: 'missing tenant — not routable' }
  }
  if (scopeTenantId !== emitTenantId) {
    return { ok: false, reason: `tenant mismatch: scope ${scopeTenantId} ≠ emit ${emitTenantId}` }
  }
  return { ok: true }
}

/** Event uuid must match content — stops forged / replayed envelopes. */
export function eventUuidVerdict(emit: TeamCommsEmit): TeamCommsVerdict {
  if (!emit.eventUuid?.trim()) {
    return { ok: false, reason: 'missing eventUuid' }
  }
  const expected = expectedEventUuid(emit)
  if (emit.eventUuid !== expected) {
    return { ok: false, reason: 'eventUuid does not match recomputed content-uuid' }
  }
  return { ok: true }
}

/** Cascade depth must stay below MAX_BROADCAST_DEPTH. */
export function depthVerdict(depth: number): TeamCommsVerdict {
  if (!Number.isFinite(depth) || depth < 0) {
    return { ok: false, reason: `invalid depth ${depth}` }
  }
  if (depth >= MAX_BROADCAST_DEPTH) {
    return {
      ok: false,
      reason: `depth ${depth} >= MAX_BROADCAST_DEPTH ${MAX_BROADCAST_DEPTH}`,
    }
  }
  return { ok: true }
}

/**
 * When a team context is supplied, the publishing agent must be the team's
 * content-addressed presence or one of its member uuids (the horo voice law).
 */
export function teamVoiceVerdict(agent: string, team: Team, tenantId: string): TeamCommsVerdict {
  const presence = teamUuid(team, tenantId)
  if (agent === presence) return { ok: true }
  const memberUuids = new Set(team.members.map((m) => m.uuid))
  if (memberUuids.has(agent)) return { ok: true }
  return { ok: false, reason: `agent ${agent} is not a voice of team ${team.id}` }
}

/** Fail-closed composite gate for a team-scoped realtime emit. */
export function enforceTeamCommsEmit(opts: {
  scopeTenantId: string
  emit: TeamCommsEmit
  team?: Team
}): TeamCommsVerdict {
  const checks = [
    tenantMatchVerdict(opts.scopeTenantId, opts.emit.tenantId),
    eventUuidVerdict(opts.emit),
    depthVerdict(typeof opts.emit.depth === 'number' ? opts.emit.depth : 0),
    ...(opts.team ? [teamVoiceVerdict(opts.emit.agent, opts.team, opts.emit.tenantId)] : []),
  ]
  for (const v of checks) {
    if (!v.ok) return v
  }
  return { ok: true }
}

/** Receipt every gate decision — allow and block both chain into the audit. */
export function receiptTeamCommsEmit(args: {
  verdict: TeamCommsVerdict
  actor: string
  emit: TeamCommsEmit
  head: { leafUuid: string; seq: number } | null
  timestampIso: string
}): Receipt {
  const decision: Decision = {
    action: `team-comms:${args.emit.event}`,
    actor: args.actor,
    outcome: args.verdict.ok ? 'allow' : 'block',
    tier: 'team-comms',
    capabilities: ['realtime', 'emit'],
  }
  return issueReceipt({ decision, head: args.head, timestampIso: args.timestampIso })
}

function emitFromChatRow(row: Record<string, unknown>, tenantId: string): TeamCommsEmit {
  return {
    tenantId,
    event: typeof row.event === 'string' ? row.event : '',
    eventUuid: typeof row.eventUuid === 'string' ? row.eventUuid : '',
    agent: typeof row.agent === 'string' ? row.agent : '',
    payload: row.payload,
    depth: typeof row.depth === 'number' ? row.depth : 0,
    emittedAt: typeof row.emittedAt === 'string' ? row.emittedAt : '',
  }
}

function scopeTenantFromReq(row: Record<string, unknown>, req: { user?: unknown }): string | null {
  const rowTenant = resolveRowTenant(row.tenant)
  if (!req.user) return rowTenant
  if (isSuperAdmin(req.user as never)) return rowTenant
  const allowed = getUserTenantIDs(req.user as never)
  if (!rowTenant) return null
  if (!allowed.includes(rowTenant)) return null
  return rowTenant
}

/**
 * Collection `beforeChange` hook — harmony enforced at the WRITE on `chat`
 * rows (the Payload-native [[realtime]] room). Throws on violation (fail-closed).
 */
export function teamCommsBeforeChange(): CollectionBeforeChangeHook {
  return ({ data, req, operation }) => {
    if (operation !== 'create' || !data || typeof data !== 'object') return data
    const row = data as Record<string, unknown>
    const scopeTenantId = scopeTenantFromReq(row, req)
    if (!scopeTenantId) {
      throw new Error('team-comms: missing or forbidden tenant — cross-tenant emit blocked')
    }
    const verdict = enforceTeamCommsEmit({
      scopeTenantId,
      emit: emitFromChatRow(row, scopeTenantId),
    })
    if (!verdict.ok) {
      throw new Error(`team-comms: ${verdict.reason ?? 'emit rejected'}`)
    }
    return data
  }
}

/** Map a chat doc to a TeamCommsEmit (for tests and broadcast glue). */
export function teamCommsEmitFromDoc(doc: Record<string, unknown>): TeamCommsEmit | null {
  const tenantId = resolveRowTenant(doc.tenant)
  if (!tenantId) return null
  return emitFromChatRow(doc, tenantId)
}

// ── Coordinated waves ride inside the secure comms envelope ─────────────────
// Every [[wave]] (society breath step, seal-and-push wave, horo ring hop, chat
// cascade) is a numbered hop correlated by content-uuid — never a side-channel.

/** Payload key for the secure wave envelope (strict-apply reads this). */
export const SECURE_WAVE_PAYLOAD_KEY = '_secureWave' as const

/**
 * One coordinated wave hop — numbered, correlated, tenant+team scoped.
 * Maps to society breath waves, confirm seal-and-push waves, horo ring steps,
 * and chat-broadcast cascade hops (depth = waveId).
 */
export interface SecureWaveEnvelope {
  /** Numbered hop in the coordinated session (equals `depth`). */
  readonly waveId: number
  /** Content-uuid correlating every hop in one breath / seal / team wave. */
  readonly correlationUuid: string
  readonly depth: number
  readonly tenantId: string
  /** Team presence id (`teamUuid`) or team id under the tenant namespace. */
  readonly teamId: string
  readonly emittedAt: string
}

export interface WaveInSecureCommsResult {
  readonly verdict: TeamCommsVerdict
  readonly emit: TeamCommsEmit
  readonly receipt?: Receipt
}

/** Derive the correlation uuid for a coordinated session (one breath, one seal wave). */
export function waveCorrelationUuid(opts: {
  readonly sessionId: string
  readonly tenantId: string
  readonly teamId: string
}): string {
  return computeContentUuid(
    { sessionId: opts.sessionId, tenantId: opts.tenantId, teamId: opts.teamId },
    opts.tenantId,
  )
}

/** Validate wave envelope shape — waveId must equal depth (numbered hop law). */
export function waveEnvelopeVerdict(envelope: SecureWaveEnvelope): TeamCommsVerdict {
  if (!envelope.correlationUuid?.trim()) {
    return { ok: false, reason: 'missing correlationUuid' }
  }
  if (!envelope.tenantId?.trim() || !envelope.teamId?.trim()) {
    return { ok: false, reason: 'missing tenantId or teamId' }
  }
  if (!envelope.emittedAt?.trim()) {
    return { ok: false, reason: 'missing emittedAt' }
  }
  if (!Number.isFinite(envelope.waveId) || envelope.waveId < 0) {
    return { ok: false, reason: `invalid waveId ${envelope.waveId}` }
  }
  if (envelope.waveId !== envelope.depth) {
    return { ok: false, reason: 'waveId must equal depth (numbered hop)' }
  }
  return depthVerdict(envelope.depth)
}

/** Pull a secure wave envelope from an event payload (strict-apply / emit path). */
export function extractSecureWave(payload: unknown): SecureWaveEnvelope | null {
  if (!payload || typeof payload !== 'object') return null
  const raw = (payload as Record<string, unknown>)[SECURE_WAVE_PAYLOAD_KEY]
  if (!raw || typeof raw !== 'object') return null
  const w = raw as Partial<SecureWaveEnvelope>
  if (
    typeof w.waveId !== 'number' ||
    typeof w.correlationUuid !== 'string' ||
    typeof w.depth !== 'number' ||
    typeof w.tenantId !== 'string' ||
    typeof w.teamId !== 'string' ||
    typeof w.emittedAt !== 'string'
  ) {
    return null
  }
  return w as SecureWaveEnvelope
}

/** Strip the secure wave envelope from payload before persisting event body. */
export function payloadWithoutSecureWave(payload: unknown): Record<string, unknown> {
  if (!payload || typeof payload !== 'object') return {}
  const { [SECURE_WAVE_PAYLOAD_KEY]: _wave, ...rest } = payload as Record<string, unknown>
  return rest
}

/**
 * A coordinated [[wave]] rides inside the secure comms envelope — not side-channel.
 * Validates envelope + delegates to `enforceTeamCommsEmit`; optional [[receipt]].
 */
export function waveInSecureComms(opts: {
  scopeTenantId: string
  envelope: SecureWaveEnvelope
  event: string
  eventUuid: string
  agent: string
  payload?: unknown
  team?: Team
  receipt?: {
    actor: string
    head: { leafUuid: string; seq: number } | null
    timestampIso: string
  }
}): WaveInSecureCommsResult {
  const envelopeCheck = waveEnvelopeVerdict(opts.envelope)
  if (!envelopeCheck.ok) {
    return {
      verdict: envelopeCheck,
      emit: {
        tenantId: opts.envelope.tenantId,
        event: opts.event,
        eventUuid: opts.eventUuid,
        agent: opts.agent,
        payload: opts.payload,
        depth: opts.envelope.depth,
        emittedAt: opts.envelope.emittedAt,
      },
    }
  }
  const emit: TeamCommsEmit = {
    tenantId: opts.envelope.tenantId,
    event: opts.event,
    eventUuid: opts.eventUuid,
    agent: opts.agent,
    payload: opts.payload,
    depth: opts.envelope.depth,
    emittedAt: opts.envelope.emittedAt,
  }
  const verdict = enforceTeamCommsEmit({
    scopeTenantId: opts.scopeTenantId,
    emit,
    team: opts.team,
  })
  if (!opts.receipt) return { verdict, emit }
  const waveVerdict = verdict.ok ? verdict : { ok: false as const, reason: verdict.reason }
  return {
    verdict,
    emit,
    receipt: receiptTeamCommsEmit({
      verdict: waveVerdict,
      actor: opts.receipt.actor,
      emit: {
        ...emit,
        event: `wave:${opts.envelope.correlationUuid}:${opts.envelope.waveId}`,
      },
      head: opts.receipt.head,
      timestampIso: opts.receipt.timestampIso,
    }),
  }
}
