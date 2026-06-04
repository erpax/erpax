import { describe, it, expect } from 'vitest'
import {
  sfiaLevelOf,
  normalizeHeld,
  normalizeRequired,
  buildAssessedEvent,
  JOB_LEVEL_TO_SFIA,
} from '@/agent/sync/training-broadcast'
import { TRAINING_TRIGGER } from '@/agents/registered/hr.training'

describe('training-broadcast — the schema-aware projection that arms the loop', () => {
  it('maps the 11-rung org ladder to SFIA 1..7, monotone, blanks to the fundamental', () => {
    expect(sfiaLevelOf('intern')).toBe(1)
    expect(sfiaLevelOf('senior')).toBe(4) // crest, M-value 8
    expect(sfiaLevelOf('c_suite')).toBe(7) // set-strategy
    expect(sfiaLevelOf('bogus')).toBe(1) // unknown ⇒ base
    expect(sfiaLevelOf(undefined)).toBe(1)
    // every value resolves to a valid SFIA level
    expect(Object.values(JOB_LEVEL_TO_SFIA).every((n) => n >= 1 && n <= 7)).toBe(true)
  })

  it('normalises held/required lines, extracting the competency id from raw OR populated relationships', () => {
    expect(normalizeHeld([{ competency: 'c1', proficiency: 3 }, { competency: { id: 'c2' }, proficiency: 5 }])).toEqual([
      { competency: 'c1', proficiency: 3 },
      { competency: 'c2', proficiency: 5 },
    ])
    expect(normalizeHeld(undefined)).toEqual([]) // natural default
    expect(normalizeRequired([{ competency: { id: 'c2' }, minProficiency: 4, mandatory: false }])).toEqual([
      { competency: 'c2', minProficiency: 4, mandatory: false },
    ])
    expect(normalizeRequired([{ competency: 'c3' }])).toEqual([{ competency: 'c3', minProficiency: 1, mandatory: true }]) // ISO 30405 defaults
  })

  it('builds the competency:assessed event — and refuses when there is nothing to assess', () => {
    const ev = buildAssessedEvent({
      tenantId: 't1', actorId: 'emp-1', positionId: 'jp-1', level: 4,
      held: [{ competency: 'c1', proficiency: 2 }],
      required: [{ competency: 'c1', minProficiency: 4, mandatory: true }],
      routes: { c1: '/r/c1' }, emittedAt: '2026-06-02T00:00:00.000Z',
    })
    expect(ev?.id).toBe(TRAINING_TRIGGER)
    expect(ev?.aggregateId).toBe('emp-1')
    expect((ev?.payload as { level: number }).level).toBe(4)
    // guards: no requirements / no actor / no tenant ⇒ null (no-op, never a phantom event)
    expect(buildAssessedEvent({ tenantId: 't1', actorId: 'emp-1', level: 4, held: [], required: [], routes: {}, emittedAt: '' })).toBeNull()
    expect(buildAssessedEvent({ tenantId: 't1', actorId: '', level: 4, held: [], required: [{ competency: 'c1' }], routes: {}, emittedAt: '' })).toBeNull()
  })
})
