/**
 * quantum/dimension-realtime — collapse · seal · wave emit across projection axes.
 */
import { describe, it, expect } from 'vitest'
import { advance, since } from '@/realtime'
import {
  DIMENSION_ATOM_PATHS,
  appendDimensionToLog,
  buildDimensionSnapshot,
  collapseDimensionState,
  dimensionRealtimeEmit,
  dimensionSessionUuid,
  dimensionSnapshotFingerprint,
  dimensionWaveCorrelationUuid,
} from '@/quantum/dimension-realtime'

const TENANT = 'erpax-corpus'
const TEAM = 'quantum-dimensions'
const SESSION = '0896eab2-dimension-session'
const TS = '2026-06-08T12:00:00.000Z'
const AGENT = 'quantum-dimensions-ui'

describe('quantum/dimension-realtime — snapshot across all axes', () => {
  it('buildDimensionSnapshot covers five projection dimensions', () => {
    const snap = buildDimensionSnapshot()
    expect(snap.axes.map((a) => a.dimension)).toEqual([
      '1d-path',
      '2d-partition',
      '3d-trinity',
      'matrix',
      'deployment',
    ])
    expect(snap.fingerprint).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    )
    expect(snap.ok).toBe(true)
    for (const axis of snap.axes) {
      expect(axis.coordinateAddress).toBeTruthy()
      expect(axis.seal).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      )
      expect(axis.analogResults).toBeGreaterThan(0)
      expect(DIMENSION_ATOM_PATHS[axis.dimension]).toBeTruthy()
    }
  })

  it('dimensionSnapshotFingerprint is stable for identical seals', () => {
    const snap = buildDimensionSnapshot()
    expect(dimensionSnapshotFingerprint(snap.axes)).toBe(snap.fingerprint)
  })
})

describe('quantum/dimension-realtime — collapse per axis', () => {
  it('1d-path collapse lands on the horo ring', () => {
    const c = collapseDimensionState('1d-path', 0)
    expect(c.horo).toBeDefined()
    expect(c.seal).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('2d-partition collapse lands on partition×horo cell', () => {
    const c = collapseDimensionState('2d-partition', 0.5)
    expect(c.partition).toBeTruthy()
    expect(c.horo).toBeDefined()
    expect(c.detail).toContain('×')
  })

  it('matrix and deployment collapse seal from live coverage', () => {
    for (const dimension of ['matrix', 'deployment'] as const) {
      const c = collapseDimensionState(dimension, 0)
      expect(c.detail.length).toBeGreaterThan(0)
      expect(c.seal).toMatch(/^[0-9a-f-]{36}$/)
    }
  })
})

describe('quantum/dimension-realtime — wave emit + log tail', () => {
  function emitTransition(dimension: '1d-path' | '2d-partition', prior: string, next: string) {
    return dimensionRealtimeEmit({
      scopeTenantId: TENANT,
      tenantId: TENANT,
      teamId: TEAM,
      sessionId: SESSION,
      agent: AGENT,
      dimension,
      priorSeal: prior,
      nextSeal: next,
      collapsedAt: TS,
      receipt: { actor: AGENT, head: null, timestampIso: TS },
    })
  }

  it('honest dimension emit passes team/comms gate with toast copy', () => {
    const prior = collapseDimensionState('1d-path', 0).seal
    const next = collapseDimensionState('1d-path', 0.5).seal
    const r = emitTransition('1d-path', prior, next)
    expect(r.verdict.ok).toBe(true)
    expect(r.dimensionEvent.verdictOk).toBe(true)
    expect(r.dimensionEvent.event).toBe('quantum:dimension:collapsed')
    expect(r.toast.title).toContain('1d-path')
    expect(r.receipt?.seq).toBe(0)
  })

  it('cross-tenant wave is rejected', () => {
    const prior = collapseDimensionState('2d-partition', 0).seal
    const next = collapseDimensionState('2d-partition', 0.3).seal
    const r = dimensionRealtimeEmit({
      scopeTenantId: TENANT,
      tenantId: 'other-tenant',
      teamId: TEAM,
      sessionId: SESSION,
      agent: AGENT,
      dimension: '2d-partition',
      priorSeal: prior,
      nextSeal: next,
      collapsedAt: TS,
    })
    expect(r.verdict.ok).toBe(false)
    expect(r.toast.title).toContain('blocked')
  })

  it('appends to realtime log — tail delivers only new dimension events', () => {
    const prior = collapseDimensionState('2d-partition', 0).seal
    const next = collapseDimensionState('2d-partition', 0.7).seal
    const emit1 = emitTransition('2d-partition', prior, next)
    let log = appendDimensionToLog([], emit1.dimensionEvent)
    const cursor = advance(log)
    const emit2 = emitTransition(
      '2d-partition',
      next,
      collapseDimensionState('2d-partition', 0.99).seal,
    )
    log = appendDimensionToLog(log, emit2.dimensionEvent)
    expect(since(log, cursor)).toEqual([emit2.dimensionEvent])
    expect(log).toHaveLength(2)
  })

  it('dimensionSessionUuid folds session correlation deterministically', () => {
    const correlation = dimensionWaveCorrelationUuid({
      sessionId: SESSION,
      tenantId: TENANT,
      teamId: TEAM,
    })
    const folded = dimensionSessionUuid({
      sessionId: SESSION,
      dimension: 'matrix',
      priorSeal: 'a',
      nextSeal: 'b',
      eventUuid: correlation,
    })
    expect(folded).toMatch(/^[0-9a-f-]{36}$/)
    expect(folded).toBe(
      dimensionSessionUuid({
        sessionId: SESSION,
        dimension: 'matrix',
        priorSeal: 'a',
        nextSeal: 'b',
        eventUuid: correlation,
      }),
    )
  })
})
