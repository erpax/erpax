import { describe, it, expect } from 'vitest'
import {
  AGENT_SYNC_DEFAULT_HOST,
  resolveAgentSyncHost,
  roomIdForTenant,
  domainToErpaxEvent,
  erpaxToDomainEvent,
} from '@/agent/sync/society'
import type { DomainEvent } from '@/agent/types'

const dev: DomainEvent = {
  id: 'invoice:activated',
  tenantId: 'acme',
  payload: { invoiceId: 'inv-1', amount: 1000 },
  emittedAt: '2026-06-01T00:00:00.000Z',
}

describe('agent-society — the breath wiring runtime ↔ room', () => {
  it('resolves the host from env, falling back to the hosted default', () => {
    expect(resolveAgentSyncHost({ AGENT_SYNC_HOST: 'chat.acme.example' })).toBe('chat.acme.example')
    expect(resolveAgentSyncHost({ AGENT_SYNC_HOST: '  ' })).toBe(AGENT_SYNC_DEFAULT_HOST)
    expect(resolveAgentSyncHost({})).toBe(AGENT_SYNC_DEFAULT_HOST)
    expect(resolveAgentSyncHost()).toBe(AGENT_SYNC_DEFAULT_HOST)
  })

  it('derives a deterministic per-tenant room id (federation-friendly, tenant-isolated)', () => {
    expect(roomIdForTenant('acme')).toBe(roomIdForTenant('acme'))
    expect(roomIdForTenant('acme')).not.toBe(roomIdForTenant('globex'))
  })

  it('projects a DomainEvent onto the bus envelope, idempotent on content-uuid', () => {
    const a = domainToErpaxEvent(dev, 'agent-a')
    const b = domainToErpaxEvent(dev, 'agent-a')
    expect(a).toEqual(b) // same event ⇒ same uuid ⇒ idempotent
    expect(a.v).toBe(1)
    expect(a.event).toBe('invoice:activated')
    expect(a.ts).toBe(dev.emittedAt)
    expect(a.payload).toEqual(dev.payload)
    expect(a.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    expect(a.aggregateId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })

  it('keys idempotency on the EVENT, not the publisher (same event, different agent ⇒ same uuid)', () => {
    expect(domainToErpaxEvent(dev, 'agent-a').uuid).toBe(domainToErpaxEvent(dev, 'agent-b').uuid)
  })

  it('round-trips an envelope back to a DomainEvent under the room tenant', () => {
    const back = erpaxToDomainEvent(domainToErpaxEvent(dev, 'agent-a'), 'acme')
    expect(back).toEqual(dev)
  })
})
