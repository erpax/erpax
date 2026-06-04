import { describe, expect, it } from 'vitest'

import type { DomainEvent } from '@/agent/types'
import { CONFLICT_EMIT, CONFLICT_TRIGGER, planConflictEffects } from '@/agents/registered/legal.conflict'

const ev = (payload: Record<string, unknown>): DomainEvent => ({
  id: CONFLICT_TRIGGER,
  tenantId: 't1',
  emittedAt: '2026-06-03T00:00:00Z',
  payload,
})

describe('legal.conflict — the conflict check is the merge/identity law', () => {
  it('clear: no adverse match ⇒ proceed to legal:review-contract, no escalation', () => {
    const fx = planConflictEffects(
      ev({ matterId: 'm1', clientPartyId: 'p-client', relatedPartyIds: ['p-sub'], adversePartyIds: ['p-other'] }),
    )
    const emit = fx.find((e) => e.kind === 'emit')
    expect(emit && emit.kind === 'emit' && emit.event.id).toBe(CONFLICT_EMIT)
    expect(emit && emit.kind === 'emit' && emit.event.payload.clear).toBe(true)
    expect(fx.some((e) => e.kind === 'notify' && e.vars.skillRoute === 'legal:review-contract')).toBe(true)
    expect(fx.some((e) => e.kind === 'escalate')).toBe(false)
  })

  it('collision: the client IS an adverse party ⇒ barred + walled + legal:vendor-check', () => {
    const fx = planConflictEffects(ev({ matterId: 'm2', clientPartyId: 'p-x', relatedPartyIds: [], adversePartyIds: ['p-x'] }))
    const emit = fx.find((e) => e.kind === 'emit')
    expect(emit && emit.kind === 'emit' && emit.event.payload.clear).toBe(false)
    expect(emit && emit.kind === 'emit' && (emit.event.payload.collisions as string[])).toEqual(['p-x'])
    expect(fx.some((e) => e.kind === 'escalate' && e.severity === 'blocker')).toBe(true)
    expect(fx.some((e) => e.kind === 'notify' && e.vars.skillRoute === 'legal:vendor-check')).toBe(true)
  })

  it('collision via a related entity (subsidiary) is caught too', () => {
    const fx = planConflictEffects(
      ev({ matterId: 'm3', clientPartyId: 'p-clean', relatedPartyIds: ['p-adv'], adversePartyIds: ['p-adv'] }),
    )
    const emit = fx.find((e) => e.kind === 'emit')
    expect(emit && emit.kind === 'emit' && (emit.event.payload.collisions as string[])).toEqual(['p-adv'])
  })

  it('a non-conflict event ⇒ no effects', () => {
    expect(planConflictEffects(ev({}))).toEqual([])
  })
})
