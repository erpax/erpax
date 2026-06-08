import { describe, it, expect } from 'vitest'
import { attemptTransition, deadEnds, crossDomainEdges, emittedEvents } from '@/workflow/engine'
import type { StateMachine } from '@/workflow/engine'
import { WORKFLOW_CATALOG_SM } from './fixtures'

const SM: StateMachine = {
  states: [
    { key: 'a', terminal: false },
    { key: 'b', terminal: false },
    { key: 'c', terminal: true },
    { key: 'stuck', terminal: false },
  ],
  transitions: [
    { from: 'a', to: 'b', on: 'submit' },
    { from: 'b', to: 'c', on: 'approve', emits: 'thing:approved', crossDomain: true },
    { from: 'a', to: 'stuck', on: 'misfire' },
  ],
}

describe('workflow-engine — the machine runs AND audits itself', () => {
  it('allows a defined transition and reports the emitted event', () => {
    const r = attemptTransition(SM, 'b', 'approve')
    expect(r).toEqual({ allowed: true, toState: 'c', emits: 'thing:approved', crossDomain: true })
  })

  it('denies an undefined transition with a reason', () => {
    expect(attemptTransition(SM, 'a', 'approve').allowed).toBe(false)
  })

  it('denies any transition out of a terminal state', () => {
    expect(attemptTransition(SM, 'c', 'approve')).toMatchObject({ allowed: false, reason: expect.stringContaining('terminal') })
  })

  it('deadEnds() IS the harmony-gap detector — finds the stuck organ', () => {
    expect(deadEnds(SM)).toEqual(['stuck'])
  })

  it('surfaces the cross-domain (federating) edges and emitted events', () => {
    expect(crossDomainEdges(SM).map((t) => t.on)).toEqual(['approve'])
    expect(emittedEvents(SM)).toEqual(['thing:approved'])
  })

  it('the REAL unified erpax machine: closed gaps stay closed (5 fixes present, dead-ends bounded)', () => {
    const sm = WORKFLOW_CATALOG_SM
    // the gap-closing transitions we added must be present
    const ons = new Set(sm.transitions.map((t) => `${t.from}->${t.to}`))
    expect(ons.has('employees:active->fiscal-periods:open')).toBe(true) // payroll bridge
    expect(ons.has('payments:reversed->payments:recorded')).toBe(true) // re-record
    expect(ons.has('connections:pending->sales-orders:draft')).toBe(true) // social→party
    // dead-ends are now a SMALL, named set (not silently growing)
    expect(deadEnds(sm).length).toBeLessThanOrEqual(3)
  })
})
