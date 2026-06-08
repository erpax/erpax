import { describe, it, expect } from 'vitest'
import { computeContentUuid } from '@/integrity'
import { MAX_BROADCAST_DEPTH } from '@/agent/sync'
import { formTeam, shareSkills, teamUuid } from '@/agent/team'
import type { AgentDef } from '@/agent/service'
import {
  tenantMatchVerdict,
  eventUuidVerdict,
  depthVerdict,
  teamVoiceVerdict,
  enforceTeamCommsEmit,
  receiptTeamCommsEmit,
  expectedEventUuid,
  teamCommsEmitFromDoc,
  waveCorrelationUuid,
  waveEnvelopeVerdict,
  waveInSecureComms,
  SECURE_WAVE_PAYLOAD_KEY,
  type SecureWaveEnvelope,
} from '@/team/comms'

const TENANT = 'tenant-a'
const OTHER = 'tenant-b'
const TS = '2026-06-08T00:00:00.000Z'

const baseAgent = (name: string, purpose: string): AgentDef => ({
  name,
  purpose,
  skills: ['localize'],
})

function honestEmit(overrides: Partial<Parameters<typeof enforceTeamCommsEmit>[0]['emit']> = {}) {
  const event = 'society:discovery'
  const payload = { target: 'localize' }
  const emittedAt = overrides.emittedAt ?? ''
  const tenantId = overrides.tenantId ?? TENANT
  const eventUuid =
    overrides.eventUuid ??
    computeContentUuid({ id: event, tenantId, payload, emittedAt }, tenantId)
  return {
    tenantId,
    event,
    eventUuid,
    agent: 'agent-1',
    payload,
    depth: 0,
    emittedAt,
    ...overrides,
  }
}

describe('team/comms — tenant isolation (Team A ↔ Team B)', () => {
  it('allows emit when scope and emit tenant match', () => {
    expect(tenantMatchVerdict(TENANT, TENANT).ok).toBe(true)
  })

  it('blocks cross-tenant emit — Team A cannot reach Team B room', () => {
    const v = tenantMatchVerdict(TENANT, OTHER)
    expect(v.ok).toBe(false)
    expect(v.reason).toContain('mismatch')
  })
})

describe('team/comms — signed event uuid', () => {
  it('accepts a recomputed content-uuid', () => {
    const emit = honestEmit()
    expect(eventUuidVerdict(emit).ok).toBe(true)
    expect(expectedEventUuid(emit)).toBe(emit.eventUuid)
  })

  it('rejects a forged eventUuid', () => {
    const emit = honestEmit({ eventUuid: '00000000-0000-0000-0000-000000000000' })
    expect(eventUuidVerdict(emit).ok).toBe(false)
  })
})

describe('team/comms — depth cap between teams', () => {
  it('allows hops below MAX_BROADCAST_DEPTH', () => {
    expect(depthVerdict(0).ok).toBe(true)
    expect(depthVerdict(MAX_BROADCAST_DEPTH - 1).ok).toBe(true)
  })

  it('blocks at or past MAX_BROADCAST_DEPTH', () => {
    const v = depthVerdict(MAX_BROADCAST_DEPTH)
    expect(v.ok).toBe(false)
    expect(v.reason).toContain(String(MAX_BROADCAST_DEPTH))
  })
})

describe('team/comms — team voice (horo law)', () => {
  const tribe = shareSkills(
    formTeam(
      'tribe',
      [baseAgent('a', 'p1'), baseAgent('b', 'p2')],
      TENANT,
    ),
    TENANT,
  )

  it('accepts the team presence uuid', () => {
    expect(teamVoiceVerdict(teamUuid(tribe, TENANT), tribe, TENANT).ok).toBe(true)
  })

  it('accepts a member uuid', () => {
    expect(teamVoiceVerdict(tribe.members[0]!.uuid, tribe, TENANT).ok).toBe(true)
  })

  it('rejects an outsider voice', () => {
    expect(teamVoiceVerdict('outsider-uuid', tribe, TENANT).ok).toBe(false)
  })
})

describe('team/comms — enforce + receipt', () => {
  it('composite gate fails closed on cross-tenant', () => {
    const emit = honestEmit({ tenantId: OTHER })
    expect(enforceTeamCommsEmit({ scopeTenantId: TENANT, emit }).ok).toBe(false)
  })

  it('composite gate passes honest emit', () => {
    expect(enforceTeamCommsEmit({ scopeTenantId: TENANT, emit: honestEmit() }).ok).toBe(true)
  })

  it('receipts allow and block decisions in one chain', () => {
    const ok = receiptTeamCommsEmit({
      verdict: { ok: true },
      actor: 'agent-1',
      emit: honestEmit(),
      head: null,
      timestampIso: TS,
    })
    expect(ok.seq).toBe(0)
    expect(ok.leafUuid).toMatch(/^[0-9a-f]{64}$/)
    const blocked = receiptTeamCommsEmit({
      verdict: { ok: false, reason: 'tenant mismatch' },
      actor: 'agent-1',
      emit: honestEmit({ tenantId: OTHER }),
      head: ok,
      timestampIso: TS,
    })
    expect(blocked.seq).toBe(1)
    expect(blocked.prevLeafUuid).toBe(ok.leafUuid)
  })
})

describe('team/comms — chat row projection', () => {
  it('maps a valid chat doc to an emit', () => {
    const emit = honestEmit({ emittedAt: TS })
    const doc = {
      event: emit.event,
      eventUuid: emit.eventUuid,
      agent: emit.agent,
      payload: emit.payload,
      tenant: TENANT,
      depth: 0,
      emittedAt: TS,
    }
    expect(teamCommsEmitFromDoc(doc)).toMatchObject({ tenantId: TENANT, eventUuid: emit.eventUuid })
  })

  it('returns null when tenant is missing', () => {
    expect(teamCommsEmitFromDoc({ event: 'x', eventUuid: 'y' })).toBeNull()
  })
})

describe('team/comms — waves ride inside secure comms', () => {
  const teamId = 'tribe-1'
  const correlationUuid = waveCorrelationUuid({ sessionId: 'breath-7', tenantId: TENANT, teamId })

  function coordinatedEnvelope(waveId = 0, overrides: Partial<SecureWaveEnvelope> = {}): SecureWaveEnvelope {
    return {
      waveId,
      correlationUuid,
      depth: waveId,
      tenantId: TENANT,
      teamId,
      emittedAt: TS,
      ...overrides,
    }
  }

  function coordinatedEmit(envelope: SecureWaveEnvelope, tenantId = TENANT) {
    const event = 'society:breath'
    const emitPayload = { move: 'mint', [SECURE_WAVE_PAYLOAD_KEY]: envelope }
    const eventUuid = computeContentUuid(
      { id: event, tenantId, payload: emitPayload, emittedAt: envelope.emittedAt },
      tenantId,
    )
    return { event, eventUuid, payload: emitPayload }
  }

  it('rejects a wave without a secure envelope (missing correlation)', () => {
    const v = waveEnvelopeVerdict(coordinatedEnvelope(0, { correlationUuid: '' }))
    expect(v.ok).toBe(false)
    expect(waveInSecureComms({
      scopeTenantId: TENANT,
      envelope: coordinatedEnvelope(0, { correlationUuid: '' }),
      event: 'society:breath',
      eventUuid: 'any',
      agent: 'agent-1',
    }).verdict.ok).toBe(false)
  })

  it('rejects waveId ≠ depth (side-channel hop)', () => {
    expect(waveEnvelopeVerdict(coordinatedEnvelope(1, { depth: 2 })).ok).toBe(false)
  })

  it('a coordinated wave passes enforceTeamCommsEmit', () => {
    const envelope = coordinatedEnvelope(2)
    const { event, eventUuid, payload } = coordinatedEmit(envelope)
    const r = waveInSecureComms({
      scopeTenantId: TENANT,
      envelope,
      event,
      eventUuid,
      agent: 'agent-1',
      payload,
      receipt: { actor: 'agent-1', head: null, timestampIso: TS },
    })
    expect(r.verdict.ok).toBe(true)
    expect(r.receipt?.seq).toBe(0)
    expect(r.emit.depth).toBe(2)
  })

  it('cross-tenant coordinated wave is rejected', () => {
    const envelope = coordinatedEnvelope(0, { tenantId: OTHER })
    const { event, eventUuid, payload } = coordinatedEmit(envelope)
    expect(
      waveInSecureComms({
        scopeTenantId: TENANT,
        envelope,
        event,
        eventUuid,
        agent: 'agent-1',
        payload,
      }).verdict.ok,
    ).toBe(false)
  })
})
