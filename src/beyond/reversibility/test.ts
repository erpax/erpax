import { describe, it, expect } from 'vitest'
import { inverseOf, isFullyReversible } from '@/beyond/reversibility'
import type { AgentEffect, DomainEvent } from '@/agent'

const event = (id = 'invoice:activated'): DomainEvent => ({
  id,
  tenantId: 't-1',
  payload: {},
  emittedAt: '2026-01-01T00:00:00.000Z',
})

describe('beyond/reversibility — typed inverse of every effect', () => {
  it('inverts create when the created id is supplied', () => {
    const eff: AgentEffect = { kind: 'create', collection: 'invoices', data: {} }
    const inv = inverseOf(eff, { createdId: 'inv-7' })
    expect(inv).toEqual({ kind: 'undo-create', collection: 'invoices', id: 'inv-7' })
  })

  it('refuses to invert create without the created id', () => {
    const eff: AgentEffect = { kind: 'create', collection: 'invoices', data: {} }
    const inv = inverseOf(eff)
    expect(inv.kind).toBe('cannot-invert')
  })

  it('inverts update by restoring the previous state', () => {
    const eff: AgentEffect = { kind: 'update', collection: 'invoices', id: 'inv-7', patch: { status: 'paid' } }
    const inv = inverseOf(eff, { previousState: { status: 'draft' } })
    expect(inv).toEqual({ kind: 'undo-update', collection: 'invoices', id: 'inv-7', restorePatch: { status: 'draft' } })
  })

  it('refuses to invert update without the previous state', () => {
    const eff: AgentEffect = { kind: 'update', collection: 'invoices', id: 'inv-7', patch: {} }
    expect(inverseOf(eff).kind).toBe('cannot-invert')
  })

  it('inverts emit into an undo-emit targeting the event id', () => {
    const eff: AgentEffect = { kind: 'emit', event: event('invoice:activated') }
    const inv = inverseOf(eff)
    expect(inv).toEqual({ kind: 'undo-emit', eventId: 'invoice:activated' })
  })

  it('inverts an immutable audit leaf into a tombstone', () => {
    const eff: AgentEffect = {
      kind: 'audit',
      leaf: { tenantId: 't-1', subjectCollection: 'invoices', subjectId: 'inv-7', action: 'activate' },
    }
    const inv = inverseOf(eff)
    expect(inv.kind).toBe('undo-audit')
  })

  it('marks external / delegating effects cannot-invert with a reason', () => {
    const cases: ReadonlyArray<AgentEffect> = [
      { kind: 'call', agentId: 'finance', event: event() },
      { kind: 'notify', channel: 'email', templateKey: 'k', vars: {} },
      { kind: 'escalate', severity: 'major', templateKey: 'k', vars: {} },
      { kind: 'capture', frame: { workflow: 'w', stepId: 's', captionKey: 'c' } },
    ]
    for (const eff of cases) {
      const inv = inverseOf(eff)
      expect(inv.kind).toBe('cannot-invert')
      if (inv.kind === 'cannot-invert') expect(inv.reason.length).toBeGreaterThan(0)
    }
  })

  it('isFullyReversible is true only when every effect can be inverted', () => {
    const create: AgentEffect = { kind: 'create', collection: 'invoices', data: {} }
    const update: AgentEffect = { kind: 'update', collection: 'invoices', id: 'inv-7', patch: {} }
    const reversible = isFullyReversible([create, update], {
      createdIds: ['inv-7', ''],
      previousStates: [undefined, { status: 'draft' }],
    })
    expect(reversible).toBe(true)
  })

  it('isFullyReversible is false when any effect is irreversible', () => {
    const notify: AgentEffect = { kind: 'notify', channel: 'email', templateKey: 'k', vars: {} }
    expect(isFullyReversible([notify])).toBe(false)
  })
})
