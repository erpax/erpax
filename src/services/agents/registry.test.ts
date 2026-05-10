/**
 * Tests for the InMemoryAgentRegistry — verifies the lookup methods
 * and the DRY guards that fire at construction.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { createAgentRegistry } from './registry'
import type { DomainAgent } from './types'

const finance: DomainAgent = {
  id: 'finance',
  ownsCollections: ['journal-entries', 'invoices'],
  subscribesTo: ['invoice:activated', 'payment:received'],
  emits: ['journal:posted'],
  cron: '0 */6 * * *',
}

const sales: DomainAgent = {
  id: 'sales',
  ownsCollections: ['quotes'],
  subscribesTo: ['lead:qualified'],
  emits: ['quote:sent'],
}

describe('AgentRegistry', () => {
  it('byId returns the registered agent', () => {
    const r = createAgentRegistry([finance, sales])
    expect(r.byId('finance')).toBe(finance)
    expect(r.byId('hr')).toBeUndefined()
  })

  it('byCollection resolves to the owning agent', () => {
    const r = createAgentRegistry([finance, sales])
    expect(r.byCollection('invoices')?.id).toBe('finance')
    expect(r.byCollection('quotes')?.id).toBe('sales')
    expect(r.byCollection('nonexistent')).toBeUndefined()
  })

  it('bySubscribedEvent returns every agent that subscribes', () => {
    const r = createAgentRegistry([finance, sales])
    expect(r.bySubscribedEvent('invoice:activated').map((a) => a.id)).toEqual(['finance'])
    expect(r.bySubscribedEvent('nope')).toEqual([])
  })

  it('bySubscribedEvent fans out across multiple subscribers', () => {
    const a: DomainAgent = { id: 'finance', ownsCollections: [], subscribesTo: ['payment:received'], emits: [] }
    const b: DomainAgent = { id: 'ops',     ownsCollections: [], subscribesTo: ['payment:received'], emits: [] }
    const r = createAgentRegistry([a, b])
    expect(r.bySubscribedEvent('payment:received').map((x) => x.id).sort()).toEqual(['finance', 'ops'])
  })

  it('scheduled returns only agents with a cron', () => {
    const r = createAgentRegistry([finance, sales])
    expect(r.scheduled().map((a) => a.id)).toEqual(['finance'])
  })

  it('all returns the original list', () => {
    const r = createAgentRegistry([finance, sales])
    expect(r.all()).toEqual([finance, sales])
  })

  it('throws on duplicate agent id (DRY conservation)', () => {
    expect(() => createAgentRegistry([finance, { ...finance }])).toThrow(/duplicate agent id: finance/)
  })

  it('throws on collection owned by two agents (DRY conservation)', () => {
    const conflict: DomainAgent = {
      id: 'sales',
      ownsCollections: ['invoices'],
      subscribesTo: [],
      emits: [],
    }
    expect(() => createAgentRegistry([finance, conflict])).toThrow(
      /collection 'invoices' is owned by both 'finance' and 'sales'/,
    )
  })
})
