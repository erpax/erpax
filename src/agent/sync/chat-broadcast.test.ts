/**
 * chat-broadcast — the room's afterChange IS the broadcast, proved. Green by
 * construction: a chat row reconstructs its embedded DomainEvent and dispatches
 * into the runtime; a non-event row is a no-op. @see ./chat-broadcast.ts
 */
import { describe, it, expect } from 'vitest'
import { chatDocToDomainEvent, broadcastChatRow } from './chat-broadcast'
import type { AgentContext, AgentRuntime, DomainEvent } from '../types'

const TS = '2026-06-01T00:00:00.000Z'

describe('chat-broadcast: a chat row reconstructs its embedded event', () => {
  it('maps event/tenant/payload/createdAt → DomainEvent', () => {
    expect(
      chatDocToDomainEvent({ event: 'society:discovery', tenant: 'tA', payload: { target: 'localize' }, createdAt: TS }),
    ).toEqual({ id: 'society:discovery', tenantId: 'tA', payload: { target: 'localize' }, emittedAt: TS })
  })
  it('handles a populated relationship tenant and missing fields', () => {
    expect(chatDocToDomainEvent({ event: 'x', tenant: { id: 'tB' } })).toMatchObject({
      tenantId: 'tB',
      payload: {},
      emittedAt: '',
    })
    expect(chatDocToDomainEvent({ tenant: 'tA' })).toBeNull() // no event ⇒ not a broadcast
    expect(chatDocToDomainEvent({ event: 'x' })).toBeNull() // no tenant ⇒ not routable (cross-tenant safety)
  })
})

describe('chat-broadcast: the row dispatches into the runtime', () => {
  function mockRuntime(seen: DomainEvent[]): AgentRuntime {
    return {
      registry: {} as never,
      dispatchChainStep: async () => [] as never[],
      dispatchSchedule: async () => [] as never[],
      dispatchEvent: async (_ctx: AgentContext, ev: DomainEvent) => {
        seen.push(ev)
        return [{ kind: 'audit' }] as never
      },
    } as unknown as AgentRuntime
  }

  it('dispatches the reconstructed event and returns the agents effects', async () => {
    const seen: DomainEvent[] = []
    const effects = await broadcastChatRow(mockRuntime(seen), {} as AgentContext, {
      event: 'society:discovery',
      tenant: 'tA',
      payload: {},
      createdAt: TS,
    })
    expect(effects).toHaveLength(1)
    expect(seen[0]!.id).toBe('society:discovery')
    expect(seen[0]!.tenantId).toBe('tA')
  })

  it('a non-event row never dispatches (no-op)', async () => {
    const runtime = {
      dispatchEvent: async () => {
        throw new Error('should not dispatch a non-event row')
      },
    } as unknown as AgentRuntime
    expect(await broadcastChatRow(runtime, {} as AgentContext, { tenant: 'tA' })).toHaveLength(0)
  })
})
