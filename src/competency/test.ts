import { describe, it, expect } from 'vitest'
import { competencyLineField } from '@/competency'

// The actor-merge made literal: held vs required are the SAME shape around one
// content-addressed competency word — never split by who holds it.
describe('competency — one competency-line, held or required', () => {
  it('defaults to the held line', () => {
    const f = competencyLineField()
    expect(f.name).toBe('competencies')
    expect(f.type).toBe('array')
    expect(f.label).toBe('Held competencies')
  })

  it('required mode flips the names + label but keeps the array shape', () => {
    const f = competencyLineField({ mode: 'required' })
    expect(f.name).toBe('requiredCompetencies')
    expect(f.label).toBe('Required competencies')
    expect(f.type).toBe('array')
  })

  it('every line carries the content-addressed competency text field', () => {
    const f = competencyLineField()
    const fields = (f as { fields: Array<{ name: string; type: string; required?: boolean; index?: boolean }> }).fields
    const competency = fields.find((x) => x.name === 'competency')!
    expect(competency).toBeDefined()
    expect(competency.type).toBe('text')
    expect(competency.required).toBe(true)
    expect(competency.index).toBe(true)
  })

  it('held line carries proficiency + assessedAt + evidence', () => {
    const f = competencyLineField({ mode: 'held' })
    const names = (f as { fields: Array<{ name: string }> }).fields.map((x) => x.name)
    expect(names).toEqual(expect.arrayContaining(['competency', 'proficiency', 'assessedAt', 'evidence']))
    expect(names).not.toContain('minProficiency')
    expect(names).not.toContain('mandatory')
  })

  it('required line carries minProficiency + mandatory, not the held-only fields', () => {
    const f = competencyLineField({ mode: 'required' })
    const names = (f as { fields: Array<{ name: string }> }).fields.map((x) => x.name)
    expect(names).toEqual(expect.arrayContaining(['competency', 'minProficiency', 'mandatory']))
    expect(names).not.toContain('proficiency')
    expect(names).not.toContain('evidence')
  })

  it('explicit name + label + description override the defaults', () => {
    const f = competencyLineField({ name: 'skills', label: 'Skills', description: 'desc' })
    expect(f.name).toBe('skills')
    expect(f.label).toBe('Skills')
    expect((f as { admin?: { description?: string } }).admin?.description).toBe('desc')
  })
})
