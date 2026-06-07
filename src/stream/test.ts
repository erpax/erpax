import { describe, it, expect } from 'vitest'
import {
  makeStream,
  mapStream,
  filterStream,
  checkWindowCoherence,
  checkStreamUuidChain,
  pipeBlocks,
} from '@/stream'
import type { ClockedEvent } from '@/stream'

// ─── helpers ────────────────────────────────────────────────────────

function mkEvent(id: string, tenantId = 'tenant-1') {
  return { id, tenantId, payload: {}, emittedAt: '2026-01-01T00:00:00Z' }
}

/** Drain a stream synchronously by pushing events and closing it, then
 *  collecting all yielded ClockedEvents. */
async function drain(stream: AsyncIterable<ClockedEvent>): Promise<ClockedEvent[]> {
  const out: ClockedEvent[] = []
  for await (const ce of stream) out.push(ce)
  return out
}

// ─── makeStream ──────────────────────────────────────────────────────

describe('stream', () => {
  it('makeStream returns an EventStream with the given id', () => {
    const s = makeStream({ id: 'test-stream' })
    expect(s.id).toBe('test-stream')
    s.close()
  })

  it('push + close delivers ClockedEvents to a for-await consumer', async () => {
    const s = makeStream({ id: 's1', tenantId: 'tenant-1' })
    s.push(mkEvent('a'))
    s.push(mkEvent('b'))
    s.close()

    const events = await drain(s)
    expect(events).toHaveLength(2)
    expect(events[0]!.event.id).toBe('a')
    expect(events[1]!.event.id).toBe('b')
  })

  it('Lamport clocks are monotonically increasing starting at 1', async () => {
    const s = makeStream({ id: 's2', tenantId: 'tenant-1' })
    s.push(mkEvent('x'))
    s.push(mkEvent('y'))
    s.push(mkEvent('z'))
    s.close()

    const events = await drain(s)
    expect(events.map((e) => e.lamport)).toEqual([1, 2, 3])
  })

  it('first event prevStreamUuid is null (genesis)', async () => {
    const s = makeStream({ id: 's3', tenantId: 'tenant-1' })
    s.push(mkEvent('first'))
    s.close()

    const events = await drain(s)
    expect(events[0]!.prevStreamUuid).toBeNull()
  })

  it('subsequent events chain prevStreamUuid to prior streamUuid', async () => {
    const s = makeStream({ id: 's4', tenantId: 'tenant-1' })
    s.push(mkEvent('e1'))
    s.push(mkEvent('e2'))
    s.push(mkEvent('e3'))
    s.close()

    const events = await drain(s)
    expect(events[1]!.prevStreamUuid).toBe(events[0]!.streamUuid)
    expect(events[2]!.prevStreamUuid).toBe(events[1]!.streamUuid)
  })

  it('subjectFilter only passes events whose id matches', async () => {
    const s = makeStream({ id: 's5', subjectFilter: 'keep', tenantId: 'tenant-1' })
    s.push(mkEvent('keep'))
    s.push(mkEvent('drop'))
    s.push(mkEvent('keep'))
    s.close()

    const events = await drain(s)
    expect(events).toHaveLength(2)
    expect(events.every((e) => e.event.id === 'keep')).toBe(true)
  })

  it('tenantId filter drops events from a different tenant', async () => {
    const s = makeStream({ id: 's6', tenantId: 'tenant-A' })
    s.push(mkEvent('ev', 'tenant-A'))
    s.push(mkEvent('ev', 'tenant-B'))
    s.close()

    const events = await drain(s)
    expect(events).toHaveLength(1)
    expect(events[0]!.event.tenantId).toBe('tenant-A')
  })

  it('push after close is a no-op (stream stays terminated)', async () => {
    const s = makeStream({ id: 's7', tenantId: 'tenant-1' })
    s.push(mkEvent('before'))
    s.close()
    s.push(mkEvent('after-close'))

    const events = await drain(s)
    expect(events).toHaveLength(1)
    expect(events[0]!.event.id).toBe('before')
  })

  // ─── mapStream ────────────────────────────────────────────────────

  it('mapStream transforms each ClockedEvent', async () => {
    const s = makeStream({ id: 'map-s', tenantId: 'tenant-1' })
    s.push(mkEvent('ev1'))
    s.push(mkEvent('ev2'))
    s.close()

    const ids: string[] = []
    for await (const id of mapStream(s, (ce) => ce.event.id)) ids.push(id)
    expect(ids).toEqual(['ev1', 'ev2'])
  })

  // ─── filterStream ────────────────────────────────────────────────

  it('filterStream yields only events matching the predicate', async () => {
    const s = makeStream({ id: 'filt-s', tenantId: 'tenant-1' })
    s.push(mkEvent('order:created'))
    s.push(mkEvent('order:paid'))
    s.push(mkEvent('invoice:created'))
    s.close()

    const result: ClockedEvent[] = []
    for await (const ce of filterStream(s, (ce) => ce.event.id.startsWith('order'))) result.push(ce)
    expect(result).toHaveLength(2)
    expect(result.map((e) => e.event.id)).toEqual(['order:created', 'order:paid'])
  })

  // ─── checkWindowCoherence (Law 33) ───────────────────────────────

  it('checkWindowCoherence: empty events window is ok', () => {
    const r = checkWindowCoherence([])
    expect(r.ok).toBe(true)
    expect(r.violations).toHaveLength(0)
    expect(r.windowsChecked).toBe(1)
  })

  it('checkWindowCoherence: monotonically increasing lamports → ok', () => {
    const r = checkWindowCoherence([{ lamport: 1 }, { lamport: 2 }, { lamport: 5 }])
    expect(r.ok).toBe(true)
    expect(r.violations).toHaveLength(0)
  })

  it('checkWindowCoherence: equal lamports (non-decreasing) → ok', () => {
    const r = checkWindowCoherence([{ lamport: 3 }, { lamport: 3 }])
    expect(r.ok).toBe(true)
  })

  it('checkWindowCoherence: out-of-order lamport → violation', () => {
    const r = checkWindowCoherence([{ lamport: 5 }, { lamport: 3 }])
    expect(r.ok).toBe(false)
    expect(r.violations).toHaveLength(1)
    expect(r.violations[0]!.at).toBe(1)
    expect(r.violations[0]!.got).toBe(3)
    expect(r.violations[0]!.expected).toBe(5)
  })

  // ─── checkStreamUuidChain (Law 34) ───────────────────────────────

  it('checkStreamUuidChain: empty list is always ok', () => {
    const r = checkStreamUuidChain([])
    expect(r.ok).toBe(true)
    expect(r.leavesChecked).toBe(0)
  })

  it('checkStreamUuidChain: valid chain produced by makeStream passes', async () => {
    const s = makeStream({ id: 'chain-s', tenantId: 'tenant-1' })
    s.push(mkEvent('ev1', 'tenant-1'))
    s.push(mkEvent('ev2', 'tenant-1'))
    s.push(mkEvent('ev3', 'tenant-1'))
    s.close()

    const events = await drain(s)
    const r = checkStreamUuidChain(events, 'tenant-1')
    expect(r.ok).toBe(true)
    expect(r.leavesChecked).toBe(3)
    expect(r.violations).toHaveLength(0)
  })

  it('checkStreamUuidChain: mutated streamUuid triggers mismatch violation', async () => {
    const s = makeStream({ id: 'chain-bad', tenantId: 'tenant-1' })
    s.push(mkEvent('ev1', 'tenant-1'))
    s.close()

    const events = await drain(s)
    const tampered: ClockedEvent[] = [{ ...events[0]!, streamUuid: 'bad-uuid-000' }]
    const r = checkStreamUuidChain(tampered, 'tenant-1')
    expect(r.ok).toBe(false)
    expect(r.violations.some((v) => v.reason === 'mismatch')).toBe(true)
  })

  it('checkStreamUuidChain: broken prevStreamUuid link triggers broken-prev violation', async () => {
    const s = makeStream({ id: 'chain-broken', tenantId: 'tenant-1' })
    s.push(mkEvent('ev1', 'tenant-1'))
    s.push(mkEvent('ev2', 'tenant-1'))
    s.close()

    const events = await drain(s)
    // Tamper the second event's prevStreamUuid so it does not point at the first
    const tampered: ClockedEvent[] = [
      events[0]!,
      { ...events[1]!, prevStreamUuid: 'wrong-prev' },
    ]
    const r = checkStreamUuidChain(tampered, 'tenant-1')
    expect(r.ok).toBe(false)
    expect(r.violations.some((v) => v.reason === 'broken-prev')).toBe(true)
  })

  // ─── pipeBlocks ──────────────────────────────────────────────────

  it('pipeBlocks forwards only events whose id is in the subscription list', async () => {
    const upstream = makeStream({ id: 'up' })
    const piped = pipeBlocks({
      upstreamStream: upstream,
      downstreamSubscribesTo: ['payment:received'],
    })

    upstream.push(mkEvent('invoice:created', 'tenant-1'))
    upstream.push(mkEvent('payment:received', 'tenant-1'))
    upstream.push(mkEvent('invoice:created', 'tenant-1'))
    upstream.close()

    const events = await drain(piped)
    expect(events).toHaveLength(1)
    expect(events[0]!.event.id).toBe('payment:received')
  })

  it('pipeBlocks resulting stream id encodes the upstream id', () => {
    const upstream = makeStream({ id: 'upstream-block' })
    const piped = pipeBlocks({
      upstreamStream: upstream,
      downstreamSubscribesTo: [],
    })
    upstream.close()
    expect(piped.id).toContain('upstream-block')
  })
})
