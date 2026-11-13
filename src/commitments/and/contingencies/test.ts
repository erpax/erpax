import { describe, it, expect } from 'vitest'
import { contingenciesPreset, contingenciesWhere } from '@/commitments/and/contingencies'
import Provisions, { disclosedStages, provisionPresets, recognisedStages, recognitionOwed, withRecognitionDate } from '@/fiscal/periods/provisions'

type Validate = (value: unknown, args: { siblingData?: { status?: string | null } }) => true | string
const field = (name: string) => Provisions.fields.find((f) => 'name' in f && f.name === name) as { options?: { value: string }[]; validate?: Validate; required?: boolean }

// A commitment or contingency is no longer a collection: it is a provision before it is recognised.
describe('commitments/and/contingencies — the disclosed stage of provisions', () => {
  it('selects the rows still off the balance sheet', () => {
    expect(contingenciesWhere()).toEqual({ status: { in: ['disclosed', 'settled', 'released'] } })
  })

  it('is a saved list over provisions, and Provisions is its complement — no stage is in both', () => {
    expect(contingenciesPreset().relatedCollection).toBe('provisions')
    expect(provisionPresets().map((p) => p.title)).toEqual(['Commitments & contingencies', 'Provisions'])
    expect(disclosedStages().filter((s) => recognisedStages().includes(s))).toEqual([])
  })

  it('every stage is a status the collection has, and every status is a stage', () => {
    const values = field('status').options!.map((o) => o.value)
    expect([...disclosedStages(), ...recognisedStages()].sort()).toEqual([...values].sort())
  })

  it('keeps every disclosure fact on the provision, and no longer points at a separate provision', () => {
    const names = new Set(Provisions.fields.flatMap((f) => ('name' in f ? [f.name] : [])))
    for (const n of ['kind', 'category', 'counterparty', 'inceptionDate', 'expectedResolutionDate', 'likelihood', 'maximumExposure', 'expectedOutflow', 'isOnerousContractRelated', 'noteText', 'reimbursementExpected']) expect(names.has(n), n).toBe(true)
    expect(names.has('recognisedAsProvision')).toBe(false)
    for (const k of ['provision', 'commitment', 'contingent_liability', 'contingent_asset', 'guarantee']) expect(field('kind').options!.map((o) => o.value)).toContain(k)
  })

  it('a disclosed row needs no period, estimate or type; a recognised row needs all three', () => {
    for (const name of ['provisionType', 'period', 'bestEstimate']) {
      const validate = field(name).validate!
      expect(field(name).required, name).toBeFalsy()
      for (const status of disclosedStages()) expect(validate(undefined, { siblingData: { status } }), `${name}/${status}`).toBe(true)
      for (const status of recognisedStages()) expect(typeof validate(undefined, { siblingData: { status } }), `${name}/${status}`).toBe('string')
      expect(validate(0, { siblingData: { status: 'recognised' } })).toBe(true)
    }
  })

  it('IAS-37 §14: recognition is owed exactly when a disclosed contingent liability turns probable', () => {
    const row = (kind: string, likelihood: string, status = 'disclosed') => ({ kind, likelihood, status })
    expect(recognitionOwed(row('contingent_liability', 'probable'))).toBe(true)
    expect(recognitionOwed(row('contingent_liability', 'virtually_certain'))).toBe(true)
    expect(recognitionOwed(row('contingent_liability', 'possible'))).toBe(false)
    expect(recognitionOwed(row('contingent_liability', 'remote'))).toBe(false)
    expect(recognitionOwed(row('commitment', 'probable'))).toBe(false)
    expect(recognitionOwed(row('contingent_asset', 'virtually_certain'))).toBe(false)
    expect(recognitionOwed(row('contingent_liability', 'probable', 'recognised'))).toBe(false)
    expect(recognitionOwed(row('contingent_liability', 'probable', 'released'))).toBe(false)
  })

  it('dates a row the first time it is recognised, and never a disclosed one', () => {
    const row = (status: string, recognitionDate?: string): { status: string; recognitionDate?: string } => ({ status, recognitionDate })
    expect(withRecognitionDate(row('recognised'), 'now').recognitionDate).toBe('now')
    expect(withRecognitionDate(row('recognised', 'then'), 'now').recognitionDate).toBe('then')
    expect(withRecognitionDate(row('disclosed'), 'now').recognitionDate).toBeUndefined()
  })
})
