import { describe, it, expect } from 'vitest'
import { Cases, requireJudgmentToSeal } from './index'

type FieldShape = { name?: string; type?: string; options?: Array<{ value: string }> }
const field = (name: string): FieldShape | undefined =>
  (Cases.fields as unknown as FieldShape[]).find((f) => f.name === name)

// Unified-node invariant test for the `cases` docket collection.
describe('cases collection node', () => {
  it('exports a valid collection config', () => {
    expect(Cases.slug).toBe('cases')
    expect(Array.isArray(Cases.fields)).toBe(true)
    expect(Cases.fields.length).toBeGreaterThan(0)
  })

  it('lives on the horo ring — status is the seven positions in measure order', () => {
    const status = field('status')
    expect(status?.type).toBe('select')
    expect(status?.options?.map((o) => o.value)).toEqual([
      'filed',
      'served',
      'discovery',
      'heard',
      'adjudicated',
      'remedied',
      'sealed',
    ])
  })

  it('carries the type discriminator and the polymorphic parties array', () => {
    expect(field('type')?.type).toBe('select')
    expect(field('parties')?.type).toBe('array')
  })

  it('is append-only — a matter is sealed, never deleted', () => {
    const del = Cases.access?.delete
    expect(typeof del).toBe('function')
    expect(del?.({} as Parameters<NonNullable<typeof del>>[0])).toBe(false)
  })

  it('seals only when charge↔defence balance into a judgment', () => {
    const call = (data: Record<string, unknown>) =>
      requireJudgmentToSeal({ data } as unknown as Parameters<typeof requireJudgmentToSeal>[0])
    // unbalanced seal is rejected
    expect(() => call({ status: 'sealed' })).toThrow(/judgment/)
    // a balanced seal passes
    expect(() => call({ status: 'sealed', judgment: 'remedy ordered' })).not.toThrow()
    // open matters flow freely
    expect(() => call({ status: 'heard' })).not.toThrow()
  })
})
