import { describe, expect, it } from 'vitest'
import { FTE_HOURS, staff, unresolvedCompetencies } from '@/staffing'
import { jobDescription, positionHourlyRate, type Position } from '@/position'
import { competencyGap, type HeldLine, type RequiredLine } from '@/competency/gap'
import { isProficient, trainingPlan } from '@/train'
import { ANCHOR } from '@/allocation'

const teller: Position = { title: 'Bank teller', harmonic: 1, level: 2, function: 'financial services' }
const manager: Position = { title: 'Branch manager', harmonic: 4, level: 6, function: 'operations' }

const required: RequiredLine[] = [
  { competency: 'kyc', minProficiency: 3, mandatory: true },
  { competency: 'bank/accounts', minProficiency: 2, mandatory: true },
  { competency: 'teller', minProficiency: 4, mandatory: false },
]
const held: HeldLine[] = [{ competency: 'kyc', proficiency: 1 }, { competency: 'bank/accounts', proficiency: 2 }]

describe('staffing — the fold DELEGATES; it decides nothing of its own', () => {
  it('gives the same description the position atom gives', () => {
    const s = staff({ position: teller, required, held, capability: 'write' })
    expect(s.description).toEqual(jobDescription(teller, ANCHOR))
  })

  it('gives the same gap the competency atom gives', () => {
    const s = staff({ position: teller, required, held, capability: 'write' })
    expect(s.competencies).toEqual(competencyGap(held, required))
  })

  it('gives the same plan and the same verdict the train atom gives', () => {
    const s = staff({ position: teller, required, held, capability: 'write' })
    expect(s.plan).toEqual(trainingPlan(held, required))
    expect(s.proficient).toBe(isProficient(held, required))
  })

  it('gives the same hourly rate the position atom gives, at the caller’s anchor', () => {
    const s = staff({ position: manager, required, held, capability: 'sign', anchor: 40 })
    expect(s.cost.hourly).toBe(positionHourlyRate(manager, 40))
    expect(s.cost.hourly).toBe(40 * 4) // anchor × tier, the allocation law
  })
})

describe('staffing — the faces must AGREE, which is the cross-check a hand-rolled join loses', () => {
  it('is not proficient exactly when a mandatory step remains', () => {
    const s = staff({ position: teller, required, held, capability: 'write' })
    const mandatoryLeft = s.plan.some((step) => step.mandatory)
    expect(s.proficient).toBe(!mandatoryLeft)
  })

  it('has an empty plan exactly when every required level is met', () => {
    const full: HeldLine[] = [
      { competency: 'kyc', proficiency: 3 },
      { competency: 'bank/accounts', proficiency: 2 },
      { competency: 'teller', proficiency: 4 },
    ]
    const s = staff({ position: teller, required, held: full, capability: 'write' })
    expect(s.plan).toEqual([])
    expect(s.proficient).toBe(true)
    expect(s.competencies.matchScore).toBe(1)
  })

  it('treats an empty seat as holding nothing, never as meeting everything', () => {
    const s = staff({ position: teller, required, capability: 'write' })
    expect(s.proficient).toBe(false)
    expect(s.plan.length).toBe(required.length)
  })
})

describe('staffing — cost is the bank’s own number, and the basis is stated', () => {
  it('defaults to the corpus anchor and the declared full-time year', () => {
    const s = staff({ position: teller, required, capability: 'write' })
    expect(s.cost.anchor).toBe(ANCHOR)
    expect(s.cost.hours).toBe(FTE_HOURS)
    expect(s.cost.annual).toBe(s.cost.hourly * FTE_HOURS)
  })

  it('refuses a nonsense anchor rather than computing a nonsense rate', () => {
    const s = staff({ position: teller, required, capability: 'write', anchor: 0 })
    expect(s.cost.anchor).toBe(ANCHOR)
    const negative = staff({ position: teller, required, capability: 'write', anchor: -5 })
    expect(negative.cost.anchor).toBe(ANCHOR)
  })

  it('prices leverage: a tier-4 position costs four anchors an hour, a tier-1 one anchor', () => {
    const t = staff({ position: teller, required, capability: 'write', anchor: 25 })
    const m = staff({ position: manager, required, capability: 'sign', anchor: 25 })
    expect(t.cost.hourly).toBe(25)
    expect(m.cost.hourly).toBe(100)
  })
})

describe('staffing — a required competency that reaches nothing is named', () => {
  it('reports the routes a resolver cannot reach, and nothing else', () => {
    const s = staff({ position: teller, required, held, capability: 'write' })
    const resolves = (c: string | number): boolean => c !== 'teller'
    expect(unresolvedCompetencies(s, resolves)).toEqual(['teller'])
    expect(unresolvedCompetencies(s, () => true)).toEqual([])
  })
})
