import { describe, it, expect } from 'vitest'
import {
  makeStream,
  mapStream,
  filterStream,
  checkWindowCoherence,
  checkStreamUuidChain,
  pipeBlocks,
  type ClockedEvent,
} from '@/stream'
import type { DomainEvent } from '@/agent/types'

// Minimal DomainEvent stub — only the fields the stream layer reads (id,
// tenantId) need real values; the rest is structural payload.
const ev = (id: string, tenantId = 't1'): DomainEvent =>
  ({ id, tenantId } as unknown as DomainEvent)

async function drain<T>(it: AsyncIterable<T>): Promise<T[]> {
  const out: T[] = []
  for await (const x of it) out.push(x)
  return out
}

// stream/index.ts — events as one continuous tamper-proof current.
// Law 33: Lamport coherence; Law 34: streamUuid Merkle hash-chain.
describe('stream — bus→stream bridge, operators, and the conserved coherence', () => {
  it('makeStream pushes ClockedEvents with monotonic Lamport from 1', async () => {
    const s = makeStream({ id: 's1' })
    s.push(ev('a'))
    s.push(ev('b'))
    s.close()
    const ces = await drain(s)
    expect(ces.map((c) => c.event.id)).toEqual(['a', 'b'])
    expect(ces.map((c) => c.lamport)).toEqual([1, 2])
  })

  it('genesis prevStreamUuid is null and the chain links forward', async () => {
    const s = makeStream({ id: 's2' })
    s.push(ev('a'))
    s.push(ev('b'))
    s.close()
    const [first, second] = await drain(s)
    expect(first!.prevStreamUuid).toBeNull()
    expect(second!.prevStreamUuid).toBe(first!.streamUuid)
  })

  it('subjectFilter and tenant scope drop non-matching pushes', async () => {
    const s = makeStream({ id: 's3', subjectFilter: 'keep', tenantId: 't1' })
    s.push(ev('drop')) // wrong subject
    s.push(ev('keep', 't2')) // wrong tenant
    s.push(ev('keep', 't1')) // kept
    s.close()
    const ces = await drain(s)
    expect(ces).toHaveLength(1)
    expect(ces[0]!.event.id).toBe('keep')
    expect(ces[0]!.lamport).toBe(1)
  })

  it('mapStream and filterStream transform the current', async () => {
    const s = makeStream({ id: 's4' })
    s.push(ev('a'))
    s.push(ev('b'))
    s.push(ev('a'))
    s.close()
    const onlyA = await drain(filterStream(s, (c) => c.event.id === 'a'))
    expect(onlyA.map((c) => c.event.id)).toEqual(['a', 'a'])

    const s2 = makeStream({ id: 's5' })
    s2.push(ev('x'))
    s2.close()
    const ids = await drain(mapStream(s2, (c) => c.event.id))
    expect(ids).toEqual(['x'])
  })

  it('checkWindowCoherence (Law 33) flags out-of-order Lamport', () => {
    expect(checkWindowCoherence([{ lamport: 1 }, { lamport: 1 }, { lamport: 2 }]).ok).toBe(true)
    const bad = checkWindowCoherence([{ lamport: 2 }, { lamport: 1 }])
    expect(bad.ok).toBe(false)
    expect(bad.violations).toEqual([{ at: 1, expected: 2, got: 1 }])
  })

  it('checkStreamUuidChain (Law 34) verifies a real chain and detects tampering', async () => {
    const s = makeStream({ id: 's6', tenantId: 't1' })
    s.push(ev('a'))
    s.push(ev('b'))
    s.close()
    const ces = await drain(s)
    const ok = checkStreamUuidChain(ces)
    expect(ok.ok).toBe(true)
    expect(ok.leavesChecked).toBe(2)

    // Mutate an event payload → leaf no longer matches recompute.
    const tampered: ClockedEvent[] = [
      { ...ces[0]!, event: ev('MUTATED') },
      ces[1]!,
    ]
    expect(checkStreamUuidChain(tampered).ok).toBe(false)
    expect(checkStreamUuidChain([]).ok).toBe(true)
  })

  it('pipeBlocks forwards only events the downstream subscribes to', async () => {
    const up = makeStream({ id: 'up' })
    const down = pipeBlocks({ upstreamStream: up, downstreamSubscribesTo: ['wanted'] })
    up.push(ev('wanted'))
    up.push(ev('ignored'))
    up.close()
    const ces = await drain(down)
    expect(ces.map((c) => c.event.id)).toEqual(['wanted'])
  })
})
