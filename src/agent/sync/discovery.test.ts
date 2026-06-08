/**
 * contribution — the shared-discovery layer proved. Green by construction:
 * same discovery ⇒ one (merge), gaps fall by DISTINCT fills (filled by many),
 * every contributor credited. @see ./discovery.ts, src/contribution/SKILL.md
 */
import { describe, it, expect } from 'vitest'
import {
  SOCIETY_DISCOVERY_EVENT,
  discoveryUuid,
  discoveryToDomainEvent,
  eventToDiscovery,
  publishDiscovery,
  emptyLedger,
  recordDiscovery,
  mergeLedgers,
  distinctContributions,
  contributionsByAgent,
  collectiveGap,
  type Discovery,
} from './discovery'
import { domainToErpaxEvent } from './society'
import type { DomainEvent } from '../types'

const TENANT = 'tenant-contrib'
const TS = '2026-06-01T00:00:00.000Z'
const D1: Discovery = { kind: 'mint', target: 'localize', resultUuid: 'aura-uuid-localize' }
const D2: Discovery = { kind: 'weave', target: 'oid', resultUuid: 'aura-uuid-oid' }

describe('contribution: same discovery ⇒ one id (merge)', () => {
  it('discoveryUuid is time/agent-independent — same content ⇒ same key', () => {
    expect(discoveryUuid(D1, TENANT)).toBe(discoveryUuid({ ...D1 }, TENANT))
    expect(discoveryUuid(D1, TENANT)).not.toBe(discoveryUuid(D2, TENANT))
  })
  it('rides the ErpaxEvent envelope and round-trips', () => {
    const e = domainToErpaxEvent(discoveryToDomainEvent(D1, TENANT, TS), 'agent-a')
    expect(e.event).toBe(SOCIETY_DISCOVERY_EVENT)
    expect(eventToDiscovery(e)).toMatchObject({ kind: 'mint', target: 'localize', resultUuid: 'aura-uuid-localize' })
  })
  it('a non-discovery event decodes to null', () => {
    const e = domainToErpaxEvent({ id: 'invoice:activated', tenantId: TENANT, payload: {}, emittedAt: TS }, 'agent-a')
    expect(eventToDiscovery(e)).toBeNull()
  })
  it('publishDiscovery emits over a connected society', () => {
    const sent: DomainEvent[] = []
    publishDiscovery({ publish: (ev) => sent.push(ev) }, D1, TENANT, TS)
    expect(sent).toHaveLength(1)
    expect(sent[0]!.id).toBe(SOCIETY_DISCOVERY_EVENT)
  })
})

describe('contribution: gaps filled by many', () => {
  it('the same discovery by two agents is counted once, credited to both', () => {
    let L = emptyLedger()
    L = recordDiscovery(L, D1, 'agent-a', TENANT)
    L = recordDiscovery(L, D1, 'agent-b', TENANT) // same fill, different agent
    L = recordDiscovery(L, D2, 'agent-b', TENANT)
    expect(distinctContributions(L)).toBe(2)
    const byAgent = contributionsByAgent(L)
    expect(byAgent.get('agent-a')).toBe(1)
    expect(byAgent.get('agent-b')).toBe(2)
  })
  it('the collective gap falls by distinct contributions, never below 0', () => {
    let L = emptyLedger()
    expect(collectiveGap(3, L)).toBe(3)
    L = recordDiscovery(L, D1, 'agent-a', TENANT)
    L = recordDiscovery(L, D2, 'agent-a', TENANT)
    expect(collectiveGap(3, L)).toBe(1)
    L = recordDiscovery(L, { kind: 'fix', target: 'x', resultUuid: 'r' }, 'agent-c', TENANT)
    expect(collectiveGap(3, L)).toBe(0)
    L = recordDiscovery(L, { kind: 'fix', target: 'y', resultUuid: 'r2' }, 'agent-c', TENANT)
    expect(collectiveGap(3, L)).toBe(0) // clamped — never negative
  })
  it('federation: two peers’ ledgers merge by content, union of agents', () => {
    let A = emptyLedger()
    let B = emptyLedger()
    A = recordDiscovery(A, D1, 'agent-a', TENANT)
    B = recordDiscovery(B, D1, 'agent-b', TENANT) // same discovery on a peer
    B = recordDiscovery(B, D2, 'agent-b', TENANT)
    const M = mergeLedgers(A, B)
    expect(distinctContributions(M)).toBe(2)
    expect(contributionsByAgent(M).get('agent-a')).toBe(1)
    expect(contributionsByAgent(M).get('agent-b')).toBe(2)
  })
})
