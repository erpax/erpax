import { describe, it, expect } from 'vitest'
import Sectors from '@/sectors'

describe('sectors', () => {
  it('has the correct slug and labels', () => {
    expect(Sectors.slug).toBe('sectors')
    expect(Sectors.labels?.singular).toBe('Sector')
    expect(Sectors.labels?.plural).toBe('Sectors')
  })

  it('uses name as the admin title', () => {
    expect((Sectors.admin as { useAsTitle?: string })?.useAsTitle).toBe('name')
  })

  it('exposes access and hooks', () => {
    expect(typeof Sectors.access).toBe('object')
    expect(Sectors.hooks).toBeDefined()
    expect(typeof Sectors.timestamps).toBe('boolean')
    expect(Sectors.timestamps).toBe(true)
  })

  const fields = Sectors.fields as Array<{ name?: string; type?: string; required?: boolean; min?: number; max?: number; options?: Array<{ value: string }>; relationTo?: string }>

  it('has required name field', () => {
    const name = fields.find(f => f.name === 'name')
    expect(name).toBeDefined()
    expect(name?.type).toBe('text')
    expect(name?.required).toBe(true)
  })

  it('has self-referential parent relationship', () => {
    const parent = fields.find(f => f.name === 'parent')
    expect(parent).toBeDefined()
    expect(parent?.type).toBe('relationship')
    expect(parent?.relationTo).toBe('sectors')
  })

  it('has all 5 SNA-2008 institutional sector options', () => {
    const field = fields.find(f => f.name === 'institutionalSector')
    expect(field).toBeDefined()
    expect(field?.type).toBe('select')
    const values = field?.options?.map(o => o.value) ?? []
    expect(values).toContain('s11_nonfinancial_corporations')
    expect(values).toContain('s12_financial_corporations')
    expect(values).toContain('s13_general_government')
    expect(values).toContain('s14_households')
    expect(values).toContain('s15_npish')
    expect(values).toHaveLength(5)
  })

  it('has all 10 COFOG division options', () => {
    const field = fields.find(f => f.name === 'cofogDivision')
    expect(field).toBeDefined()
    expect(field?.type).toBe('select')
    const values = field?.options?.map(o => o.value) ?? []
    expect(values).toContain('cofog_01')
    expect(values).toContain('cofog_10')
    expect(values).toHaveLength(10)
  })

  it('constrains sdgGoal to 1-17', () => {
    const field = fields.find(f => f.name === 'sdgGoal') as { name: string; type: string; min: number; max: number } | undefined
    expect(field).toBeDefined()
    expect(field?.type).toBe('number')
    expect(field?.min).toBe(1)
    expect(field?.max).toBe(17)
  })

  it('includes indexed country code and ISIC code fields', () => {
    const isic = fields.find(f => f.name === 'isicCode')
    expect(isic?.type).toBe('text')
    const country = fields.find(f => f.name === 'countryCode')
    expect(country?.type).toBe('text')
  })
})
