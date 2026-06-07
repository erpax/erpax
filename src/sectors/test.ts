import { describe, it, expect } from 'vitest'
import type { Field, SelectField, NumberField } from 'payload'
import Sectors from '@/sectors'

// sectors — the one societal coordinate system (SKILL.md sequence position 0).
// Every part of society is a coordinate on ONE self-referential taxonomy, NAMED
// and ENCODED by the canonical UN/EU stack (SNA / ISIC / NACE / COFOG / ICNPO /
// SDG / ISO-3166). Proven against the REAL Payload CollectionConfig.

function field(name: string): Field | undefined {
  return Sectors.fields.find((f): f is Field => 'name' in f && f.name === name)
}

describe('sectors — the root societal coordinate collection', () => {
  it('is the `sectors` collection, grouped under Society, titled by name', () => {
    expect(Sectors.slug).toBe('sectors')
    expect(Sectors.admin?.group).toBe('Society')
    expect(Sectors.admin?.useAsTitle).toBe('name')
    expect(Sectors.timestamps).toBe(true)
  })

  it('is self-referential — `parent` relates back to sectors (the fractal hierarchy)', () => {
    const parent = field('parent')
    expect(parent?.type).toBe('relationship')
    expect((parent as { relationTo?: unknown } | undefined)?.relationTo).toBe('sectors')
  })

  it('SNA-2008 institutional sector carries exactly S.11–S.15', () => {
    const inst = field('institutionalSector') as SelectField | undefined
    expect(inst?.type).toBe('select')
    const values = inst!.options.map((o) => (typeof o === 'string' ? o : o.value))
    expect(values).toEqual([
      's11_nonfinancial_corporations',
      's12_financial_corporations',
      's13_general_government',
      's14_households',
      's15_npish',
    ])
  })

  it('COFOG carries all 10 government-function divisions', () => {
    const cofog = field('cofogDivision') as SelectField | undefined
    expect(cofog?.type).toBe('select')
    expect(cofog!.options).toHaveLength(10)
    const values = cofog!.options.map((o) => (typeof o === 'string' ? o : o.value))
    expect(values).toContain('cofog_01')
    expect(values).toContain('cofog_10')
  })

  it('the economic-activity coordinate (ISIC) is present and indexed', () => {
    const isic = field('isicCode')
    expect(isic?.type).toBe('text')
    expect((isic as { index?: boolean } | undefined)?.index).toBe(true)
  })

  it('the SDG outcome axis is a 1..17 number (the 17 goals)', () => {
    const sdg = field('sdgGoal') as NumberField | undefined
    expect(sdg?.type).toBe('number')
    expect(sdg!.min).toBe(1)
    expect(sdg!.max).toBe(17)
  })

  it('name is the required human label of the coordinate', () => {
    const name = field('name')
    expect(name?.type).toBe('text')
    expect((name as { required?: boolean } | undefined)?.required).toBe(true)
  })

  it('access control is configured (tenant isolation per ISO 27001 A.5.23)', () => {
    expect(Sectors.access).toBeDefined()
    expect(Array.isArray(Sectors.hooks)).toBe(false)
    expect(Sectors.hooks).toBeDefined()
  })
})
