import { describe, it, expect } from 'vitest'
import { planTrainingEffects, TRAINING_EMIT, TRAINING_TRIGGER } from './hr.training'
import type { DomainEvent } from '@/agent'
import { ANCHOR } from '@/allocation'
import { levelCeiling } from '@/decompression'

const assessed = (payload: Record<string, unknown>): DomainEvent => ({
  id: TRAINING_TRIGGER,
  tenantId: 't1',
  emittedAt: '2026-06-02T00:00:00.000Z',
  payload,
})

// A level-4 (crest, M-value 8) role: two mandatory competencies.
const REQUIRED = [
  { competency: 'triage', minProficiency: 4, mandatory: true },
  { competency: 'charting', minProficiency: 3, mandatory: true },
]
const ROUTES = { triage: '/health/triage/SKILL', charting: '/health/charting/SKILL' }

describe('hr.training — the auto-train agent-effect: assessed actor → priced, broadcast, routed plan', () => {
  it('an untrained incumbent: base pay, full debt, broadcast + audit + a nudge to the most-binding skill', () => {
    const effects = planTrainingEffects(assessed({ actorId: 'emp-1', positionId: 'jp-1', level: 4, held: [], required: REQUIRED, routes: ROUTES }))
    expect(effects.map((e) => e.kind)).toEqual(['emit', 'audit', 'notify'])

    const emit = effects[0] as { kind: 'emit'; event: DomainEvent }
    expect(emit.event.id).toBe(TRAINING_EMIT)
    expect(emit.event.tenantId).toBe('t1')
    expect(emit.event.aggregateId).toBe('emp-1') // ABOUT the actor, not a hash
    const p = emit.event.payload as Record<string, number | boolean | { competency: string; skillRoute: string }>
    expect(p.efficiency).toBe(0) // meets nothing
    expect(p.hourlyRate).toBeCloseTo(ANCHOR, 9) // base 7.83/hr at efficiency 0
    expect(p.ceilingRate).toBeCloseTo(ANCHOR * levelCeiling(4), 9) // the surface = anchor × 8
    expect(p.debt).toBe(4 + 3) // every required point unmet
    expect(p.proficient).toBe(false)

    const audit = effects[1] as { kind: 'audit'; leaf: { subjectId: string; action: string } }
    expect(audit.leaf).toMatchObject({ subjectId: 'emp-1', action: 'training-priced' })

    const notify = effects[2] as { kind: 'notify'; vars: Record<string, unknown> }
    expect(notify.vars).toMatchObject({ competency: 'triage', gap: 4, skillRoute: '/health/triage/SKILL' }) // biggest mandatory gap first, routed
  })

  it('a proficient incumbent: pay at the ceiling, zero debt, NO nudge (surfaced) — broadcast + audit only', () => {
    const held = [{ competency: 'triage', proficiency: 4 }, { competency: 'charting', proficiency: 3 }]
    const effects = planTrainingEffects(assessed({ actorId: 'emp-2', level: 4, held, required: REQUIRED, routes: ROUTES }))
    expect(effects.map((e) => e.kind)).toEqual(['emit', 'audit']) // no notify — nothing left to train
    const p = (effects[0] as { kind: 'emit'; event: DomainEvent }).event.payload as Record<string, number | boolean | null>
    expect(p.efficiency).toBe(1)
    expect(p.hourlyRate).toBeCloseTo(ANCHOR * levelCeiling(4), 9) // training raised pay to the ceiling
    expect(p.debt).toBe(0)
    expect(p.proficient).toBe(true)
    expect(p.nextStep).toBeNull()
  })

  it('a non-training event (no held/required) is ignored — returns no effects', () => {
    expect(planTrainingEffects(assessed({ actorId: 'x' }))).toEqual([])
    expect(planTrainingEffects({ id: 'other', tenantId: 't1', emittedAt: '', payload: {} })).toEqual([])
  })
})
