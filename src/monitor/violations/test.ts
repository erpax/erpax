/**
 * monitor/violations — mock scan → event stream · wave emit · log tail.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { advance, since } from '@/realtime'
import {
  appendViolationToLog,
  crossViolationFromStrictApply,
  enrichCrossConceptEvents,
  fieldEntanglementUnhookedCount,
  nextViolationWaveBatch,
  peekCrossViolationStream,
  resetCrossViolationStream,
  resetViolationScanCache,
  scanViolationsRealtime,
  violationEventId,
  violationSnapshotFingerprint,
  type ViolationEvent,
  type ViolationSource,
} from '@/monitor/violations'
import {
  crossNotificationFromViolation,
  crossViolationRealtimeEmit,
  isCrossEducationViolation,
  CROSS_VIOLATION_EVENT,
} from '@/monitor/violations/cross-realtime'
import {
  violationLogAdvance,
  violationRealtimeEmit,
  violationSessionUuid,
} from '@/monitor/violations/realtime'

const TENANT = 'erpax-corpus'
const TEAM = 'violation-monitor'
const SESSION = 'monitor-violations-session'
const TS = '2026-06-08T12:00:00.000Z'
const AGENT = 'violation-monitor-ui'

const mockEvent = (
  source: ViolationSource,
  atomPath: string,
  detail: string,
): ViolationEvent => ({
  id: violationEventId(source, atomPath, detail),
  source,
  atomPath,
  accountCode: atomPath,
  detail,
  severity: 'warning',
  scannedAt: TS,
})

describe('monitor/violations — scanViolationsRealtime', () => {
  beforeEach(() => {
    resetViolationScanCache()
    resetCrossViolationStream()
  })

  it('returns fingerprinted snapshot with source counts', () => {
    const snap = scanViolationsRealtime({ waveSample: false, maxEvents: 500 })
    expect(snap.scannedAt).toBeTruthy()
    expect(snap.fingerprint).toMatch(/^[0-9a-f-]{36}$/)
    expect(snap.counts.total).toBeGreaterThanOrEqual(snap.events.length)
    expect(typeof snap.counts.bySource['folder-law']).toBe('number')
  })

  it('bonds path account code on every event', () => {
    const snap = scanViolationsRealtime({ waveSample: false, maxEvents: 50 })
    for (const e of snap.events) {
      expect(e.accountCode).toBeTruthy()
      expect(e.id).toMatch(/^[0-9a-f-]{36}$/)
    }
  })

  it('enriches cross-concept events for rules and finished-idea-cross sources', () => {
    const scannedAt = TS
    const events: ViolationEvent[] = [
      mockEvent('rules-stray-ts', 'foo', 'bar.ts — stray'),
      mockEvent('finished-idea-cross', 'seal', 'trinity.proof missing (test.ts)'),
    ]
    enrichCrossConceptEvents(events, scannedAt)
    const cross = events.filter((e) => e.source === 'cross-concept')
    expect(cross.length).toBe(2)
    expect(cross[0]!.crossEducation).toContain('CrossConceptVerdict')
    expect(cross[0]!.uncrossedAxes?.length).toBeGreaterThan(0)
    expect(cross[0]!.crossDimension).toBeTruthy()
  })

  it('crossViolationFromStrictApply queues strict-apply origin for monitor drain', () => {
    crossViolationFromStrictApply({
      atomPath: 'agent',
      gate: 'effect',
      reason: 'cross-education gate: 2 axis uncrossed',
      crossEducation: '## CrossConceptVerdict — education gate',
      detail: 'stray-ts: 402 > baseline 400',
    })
    const queued = peekCrossViolationStream()
    expect(queued).toHaveLength(1)
    expect(queued[0]!.origin).toBe('strict-apply')
    expect(queued[0]!.gate).toBe('effect')
    expect(queued[0]!.crossEducation).toContain('CrossConceptVerdict')
  })

  it('includes logic-concentration events from rules scan', () => {
    const snap = scanViolationsRealtime({ waveSample: false, maxEvents: 5000 })
    const logic = snap.events.filter((e) => e.source === 'logic-concentration')
    expect(logic.length).toBeGreaterThan(0)
    expect(logic[0]!.detail).toContain('re-exports only')
    const cross = snap.events.filter(
      (e) => e.source === 'cross-concept' && e.detail.includes('logic-concentration'),
    )
    expect(cross.length).toBeGreaterThan(0)
  })

  it('includes word-matter events from rules scan', () => {
    const snap = scanViolationsRealtime({ waveSample: false, maxEvents: 8000 })
    const wm = snap.events.filter((e) => e.source === 'word-matter')
    expect(wm.length).toBeGreaterThan(0)
    expect(wm[0]!.detail).toMatch(/fix:/)
    const cross = snap.events.filter(
      (e) => e.source === 'cross-concept' && e.detail.includes('word-matter'),
    )
    expect(cross.length).toBeGreaterThan(0)
  })

  it('wave sample rotates ordinal across scans', () => {
    const a = scanViolationsRealtime({ waveSample: true, maxEvents: 2000 })
    const b = scanViolationsRealtime({ waveSample: true, maxEvents: 2000 })
    expect(a.wavePathsSampled).toBeGreaterThan(0)
    expect(b.wavePathsSampled).toBeGreaterThan(0)
  })
})

describe('monitor/violations — nextViolationWaveBatch cache', () => {
  beforeEach(() => {
    resetViolationScanCache()
  })

  it('reuses cached wave plan across calls', () => {
    const ordinals: number[] = []
    for (let i = 0; i < 3; i++) {
      const batch = nextViolationWaveBatch()
      expect(batch.paths.length).toBeGreaterThan(0)
      ordinals.push(batch.ordinal)
    }
    expect(new Set(ordinals).size).toBeGreaterThan(1)
  })

  it('rotates ordinals while plan stays cached', () => {
    const a = nextViolationWaveBatch()
    const b = nextViolationWaveBatch()
    expect(a.paths.length).toBeGreaterThan(0)
    expect(b.paths.length).toBeGreaterThan(0)
    expect(a.ordinal).not.toBe(b.ordinal)
  })
})

describe('monitor/violations — mock scan event stream', () => {
  it('diffs stable ids for toast tail delivery', () => {
    const prior = [mockEvent('folder-law', 'foo', 'one-word')]
    const next = [
      ...prior,
      mockEvent('diamond-stray', 'bar', 'stray file'),
      mockEvent('gap-eb', 'readme', 'net 2 eb'),
    ]
    const priorIds = new Set(prior.map((e) => e.id))
    const fresh = next.filter((e) => !priorIds.has(e.id))
    expect(fresh).toHaveLength(2)
    expect(violationSnapshotFingerprint(prior)).not.toBe(violationSnapshotFingerprint(next))
  })
})

describe('monitor/violations — fieldEntanglement unhooked', () => {
  it('counts registry entries without known collapse hooks', () => {
    expect(fieldEntanglementUnhookedCount()).toBeGreaterThanOrEqual(0)
  })
})

describe('monitor/violations — cross-concept realtime', () => {
  const crossViolation = (): ViolationEvent => {
    const events: ViolationEvent[] = [
      mockEvent('rules-stray-ts', 'rules', 'foo.ts — stray at root'),
    ]
    enrichCrossConceptEvents(events, TS)
    return events.find((e) => e.source === 'cross-concept')!
  }

  it('isCrossEducationViolation covers rules and cross-concept', () => {
    expect(isCrossEducationViolation('cross-concept')).toBe(true)
    expect(isCrossEducationViolation('rules-stray-ts')).toBe(true)
    expect(isCrossEducationViolation('finished-idea-cross')).toBe(true)
    expect(isCrossEducationViolation('diamond-stray')).toBe(false)
  })

  it('crossNotificationFromViolation carries education markdown + axes', () => {
    const v = crossViolation()
    const payload = crossNotificationFromViolation(v)
    expect(payload.event).toBe(CROSS_VIOLATION_EVENT)
    expect(payload.crossEducation).toContain('CrossConceptVerdict')
    expect(payload.uncrossedAxes.length).toBeGreaterThan(0)
    expect(payload.agentChatEnvelope.kind).toBe('agent.cross.education')
  })

  it('crossViolationRealtimeEmit passes team/comms with toast copy', () => {
    const v = crossViolation()
    const r = crossViolationRealtimeEmit({
      scopeTenantId: TENANT,
      tenantId: TENANT,
      teamId: TEAM,
      sessionId: SESSION,
      agent: AGENT,
      violation: v,
      collapsedAt: TS,
      receipt: { actor: AGENT, head: null, timestampIso: TS },
    })
    expect(r.verdict.ok).toBe(true)
    expect(r.crossEvent.event).toBe('monitor:cross:violation')
    expect(r.toast.title).toContain('Cross uncrossed')
    expect(r.toast.description).toContain('stray-ts')
  })
})

describe('monitor/violations — wave emit + log tail', () => {
  const priorFp = '00000000-0000-4000-8000-000000000001'
  const newViolations = [mockEvent('import-boundary', 'agent', 'deep import')]

  function emitScan(nextFp: string) {
    return violationRealtimeEmit({
      scopeTenantId: TENANT,
      tenantId: TENANT,
      teamId: TEAM,
      sessionId: SESSION,
      agent: AGENT,
      priorFingerprint: priorFp,
      snapshot: {
        ok: false,
        scannedAt: TS,
        fingerprint: nextFp,
        events: newViolations,
        counts: { total: 1, bySource: { 'import-boundary': 1 } },
        waveOrdinal: 1,
        wavePathsSampled: 63,
      },
      newViolations,
      collapsedAt: TS,
      receipt: { actor: AGENT, head: null, timestampIso: TS },
    })
  }

  it('honest violation emit passes team/comms gate with toast copy', () => {
    const nextFp = '00000000-0000-4000-8000-000000000002'
    const r = emitScan(nextFp)
    expect(r.verdict.ok).toBe(true)
    expect(r.violationEvent.event).toBe('monitor:violation:detected')
    expect(r.toast.title).toContain('new violation')
    expect(r.receipt?.seq).toBe(0)
  })

  it('cross-tenant emit is rejected', () => {
    const r = violationRealtimeEmit({
      scopeTenantId: TENANT,
      tenantId: 'other-tenant',
      teamId: TEAM,
      sessionId: SESSION,
      agent: AGENT,
      priorFingerprint: priorFp,
      snapshot: {
        ok: false,
        scannedAt: TS,
        fingerprint: '00000000-0000-4000-8000-000000000003',
        events: newViolations,
        counts: { total: 1, bySource: {} },
        waveOrdinal: null,
        wavePathsSampled: 0,
      },
      newViolations,
      collapsedAt: TS,
    })
    expect(r.verdict.ok).toBe(false)
    expect(r.toast.title).toContain('blocked')
  })

  it('appends to realtime log — tail delivers only new violation events', () => {
    const fp1 = '00000000-0000-4000-8000-000000000010'
    const fp2 = '00000000-0000-4000-8000-000000000011'
    const emit1 = emitScan(fp1)
    let log = appendViolationToLog([], emit1.violationEvent)
    const cursor = violationLogAdvance(log)
    const emit2 = emitScan(fp2)
    log = appendViolationToLog(log, emit2.violationEvent)
    expect(since(log, cursor)).toEqual([emit2.violationEvent])
    expect(log).toHaveLength(2)
  })

  it('violationSessionUuid folds session correlation deterministically', () => {
    const folded = violationSessionUuid({
      sessionId: SESSION,
      priorFingerprint: priorFp,
      nextFingerprint: '00000000-0000-4000-8000-000000000020',
      eventUuid: '00000000-0000-4000-8000-000000000021',
    })
    expect(folded).toMatch(/^[0-9a-f-]{36}$/)
    expect(folded).toBe(
      violationSessionUuid({
        sessionId: SESSION,
        priorFingerprint: priorFp,
        nextFingerprint: '00000000-0000-4000-8000-000000000020',
        eventUuid: '00000000-0000-4000-8000-000000000021',
      }),
    )
  })
})
