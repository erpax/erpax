import { describe, it, expect } from 'vitest'
import {
  efficiency,
  competencyDebt,
  trainingPlan,
  nextStep,
  efficiencyRate,
  isProficient,
} from './index'
import type { HeldLine, RequiredLine } from '@/services/competency-gap'
import { ANCHOR } from '@/services/allocation'
import { levelCeiling } from '@/decompression'

// A health-care role (COFOG 07) at SFIA level 4 (the crest, M-value 8): three
// required competencies, the actor holds one. Routes are the competencies' skillRoutes.
const REQUIRED: RequiredLine[] = [
  { competency: 'triage', minProficiency: 4, mandatory: true },
  { competency: 'charting', minProficiency: 3, mandatory: true },
  { competency: 'bedside-manner', minProficiency: 2, mandatory: false },
]
const ROUTE: Record<string, string> = {
  triage: '/health/triage/SKILL',
  charting: '/health/charting/SKILL',
  'bedside-manner': '/health/bedside-manner/SKILL',
}
const routeOf = (c: string | number): string | undefined => ROUTE[String(c)]

describe('train — auto-train the actor to best efficiency, off-gassing the competency debt', () => {
  it('efficiency IS the competency match-score (etrima efficiency_percent): 0 untrained → 1 at the surface', () => {
    const untrained: HeldLine[] = []
    const proficient: HeldLine[] = [
      { competency: 'triage', proficiency: 4 },
      { competency: 'charting', proficiency: 3 },
      { competency: 'bedside-manner', proficiency: 2 },
    ]
    expect(efficiency(untrained, REQUIRED)).toBe(0) // meets nothing
    expect(efficiency(proficient, REQUIRED)).toBe(1) // surfaced — best efficiency
    const partial: HeldLine[] = [{ competency: 'triage', proficiency: 4 }] // 1 of 3 met
    expect(efficiency(partial, REQUIRED)).toBeCloseTo(1 / 3, 9)
  })

  it('the competency debt is the conserved deficit, and training off-gasses it to zero', () => {
    const untrained: HeldLine[] = []
    expect(competencyDebt(untrained, REQUIRED)).toBe(4 + 3 + 2) // every required point unmet
    const learning: HeldLine[] = [{ competency: 'triage', proficiency: 4 }, { competency: 'charting', proficiency: 1 }]
    expect(competencyDebt(learning, REQUIRED)).toBe(0 + 2 + 2) // triage cleared, charting half, bedside open
    const done: HeldLine[] = REQUIRED.map((r) => ({ competency: r.competency, proficiency: r.minProficiency }))
    expect(competencyDebt(done, REQUIRED)).toBe(0) // fully off-gassed
  })

  it('the plan routes each gap to the SKILL that closes it, mandatory-first then largest gap (drive the tail)', () => {
    const held: HeldLine[] = [{ competency: 'charting', proficiency: 1 }] // triage 0/4, charting 1/3, bedside 0/2
    const plan = trainingPlan(held, REQUIRED, routeOf)
    expect(plan.map((s) => s.competency)).toEqual(['triage', 'charting', 'bedside-manner']) // mandatory (gap 4, 2) then optional (gap 2)
    expect(plan[0]).toEqual({ competency: 'triage', gap: 4, skillRoute: '/health/triage/SKILL', mandatory: true })
    // a missing route never drops the step — it is still listed, route ''
    expect(trainingPlan(held, REQUIRED)[0].skillRoute).toBe('')
  })

  it('nextStep is the single most binding gap — the one breath — and null once surfaced', () => {
    const held: HeldLine[] = [{ competency: 'triage', proficiency: 2 }] // triage gap 2, charting gap 3 — both mandatory
    expect(nextStep(held, REQUIRED, routeOf)?.competency).toBe('charting') // the biggest mandatory gap (3) is most binding
    const surfaced: HeldLine[] = REQUIRED.map((r) => ({ competency: r.competency, proficiency: r.minProficiency }))
    expect(nextStep(surfaced, REQUIRED, routeOf)).toBeNull() // nothing left to train
  })

  it('pay climbs the one curve toward the role’s M-value as efficiency rises — training literally raises pay', () => {
    const level = 4 // crest, M-value 8
    const M = levelCeiling(level)
    expect(efficiencyRate([], REQUIRED, level)).toBe(ANCHOR) // efficiency 0 ⇒ base 7.83/hr
    const surfaced: HeldLine[] = REQUIRED.map((r) => ({ competency: r.competency, proficiency: r.minProficiency }))
    expect(efficiencyRate(surfaced, REQUIRED, level)).toBeCloseTo(ANCHOR * M, 9) // efficiency 1 ⇒ ceiling = anchor × M
    // monotone: training one more competency raises pay
    const one: HeldLine[] = [{ competency: 'triage', proficiency: 4 }]
    const two: HeldLine[] = [...one, { competency: 'charting', proficiency: 3 }]
    expect(efficiencyRate(two, REQUIRED, level)).toBeGreaterThan(efficiencyRate(one, REQUIRED, level))
  })

  it('a gradient factor caps how much unverified competence banks early; the close gate is all-mandatory-met', () => {
    const surfaced: HeldLine[] = REQUIRED.map((r) => ({ competency: r.competency, proficiency: r.minProficiency }))
    const capped = efficiencyRate(surfaced, REQUIRED, 4, ANCHOR, { gfHi: 0.5 }) // bank only half of full efficiency
    expect(capped).toBeLessThan(efficiencyRate(surfaced, REQUIRED, 4)) // throttled below the uncapped ceiling
    expect(isProficient([], REQUIRED)).toBe(false) // open mandatory gaps ⇒ cannot staff the role
    expect(isProficient(surfaced, REQUIRED)).toBe(true) // every mandatory met ⇒ surfaced
  })
})
