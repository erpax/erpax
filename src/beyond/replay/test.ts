import { describe, it, expect } from 'vitest'
import { effectsHash, replayLeaf, isReplayStable } from '@/beyond/replay'
import type { AgentEffect, DomainEvent } from '@/agent/types'
import type { ReplayRequest } from '@/beyond/types'

const TENANT = 't-1'

const event = (over: Partial<DomainEvent> = {}): DomainEvent => ({
  id: 'invoice:activated',
  tenantId: TENANT,
  payload: { amount: 100 },
  emittedAt: '2026-01-01T00:00:00.000Z',
  ...over,
})

const createEffect: AgentEffect = { kind: 'create', collection: 'invoices', data: { amount: 100 } }
const emitEffect = (e: DomainEvent): AgentEffect => ({ kind: 'emit', event: e })

describe('beyond/replay — deterministic byte-identical re-computation', () => {
  it('effectsHash is stable across runs for identical inputs', () => {
    const effects: ReadonlyArray<AgentEffect> = [createEffect, emitEffect(event())]
    expect(effectsHash(effects, TENANT)).toBe(effectsHash(effects, TENANT))
  })

  it('effectsHash ignores the non-deterministic emittedAt timestamp', () => {
    const a: ReadonlyArray<AgentEffect> = [emitEffect(event({ emittedAt: '2026-01-01T00:00:00.000Z' }))]
    const b: ReadonlyArray<AgentEffect> = [emitEffect(event({ emittedAt: '2030-12-31T23:59:59.000Z' }))]
    expect(effectsHash(a, TENANT)).toBe(effectsHash(b, TENANT))
  })

  it('effectsHash differs when the deterministic payload differs', () => {
    const a: ReadonlyArray<AgentEffect> = [emitEffect(event({ payload: { amount: 100 } }))]
    const b: ReadonlyArray<AgentEffect> = [emitEffect(event({ payload: { amount: 200 } }))]
    expect(effectsHash(a, TENANT)).not.toBe(effectsHash(b, TENANT))
  })

  it('replayLeaf returns ok:true when the recomputed hash matches', async () => {
    const effects: AgentEffect[] = [createEffect, emitEffect(event())]
    const expectedOutputHash = effectsHash(effects, TENANT)
    const request: ReplayRequest = { leafHash: 'leaf-1', snapshotUuid: 'snap-1' }
    const result = await replayLeaf({
      request,
      expectedOutputHash,
      invoke: async () => effects.map((e) => ({ ...e })),
      tenantId: TENANT,
    })
    expect(result.ok).toBe(true)
    expect(result.effects).toHaveLength(2)
    expect(result.mismatch).toBeUndefined()
  })

  it('replayLeaf returns ok:false with a mismatch when output diverges', async () => {
    const request: ReplayRequest = { leafHash: 'leaf-1', snapshotUuid: 'snap-1' }
    const result = await replayLeaf({
      request,
      expectedOutputHash: 'not-the-real-hash',
      invoke: async () => [createEffect],
      tenantId: TENANT,
    })
    expect(result.ok).toBe(false)
    expect(result.mismatch?.expectedHash).toBe('not-the-real-hash')
    expect(result.mismatch?.actualHash).toBe(effectsHash([createEffect], TENANT))
  })

  it('isReplayStable accepts a well-formed, JCS-serializable sequence', () => {
    const res = isReplayStable([createEffect, emitEffect(event())])
    expect(res.ok).toBe(true)
    expect(res.reason).toBeUndefined()
  })

  it('isReplayStable rejects an emit effect missing emittedAt', () => {
    const broken = { kind: 'emit', event: event({ emittedAt: '' }) } as AgentEffect
    const res = isReplayStable([broken])
    expect(res.ok).toBe(false)
    expect(res.reason).toMatch(/emittedAt/i)
  })
})
