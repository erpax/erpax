import { describe, it, expect } from 'vitest'
import type { Field } from 'payload'
import {
  glAccountField,
  currencyField,
  unitOfMeasureField,
  measureFields,
  statusField,
  referenceField,
  countryCodeField,
  legalEntityField,
  naceCodeField,
  taxonomySelect,
  auditFields,
  timestampFields,
  notesField,
} from '@/base/accounting/field'

// Matter (./index.ts): each export is a Payload Field-factory. Assert the
// output field shape (name/type/required/options) the collections rely on.

/** A Payload text/select field carries a runtime `validate` we can probe. */
type WithValidate = Field & {
  validate?: (value: unknown, args?: unknown) => true | string | Promise<true | string>
}

describe('base/accounting/field — currencyField', () => {
  it('defaults to a text field named currency with the house default value', () => {
    const f = currencyField()
    expect(f.type).toBe('text')
    expect('name' in f && f.name).toBe('currency')
    // Default value is the canonical DEFAULT_CURRENCY (EUR by house default).
    expect((f as { defaultValue?: string }).defaultValue).toBe('EUR')
  })

  it('accepts a custom name for FX-pair fields', () => {
    const f = currencyField({ name: 'fromCurrency' })
    expect('name' in f && f.name).toBe('fromCurrency')
  })

  it('validate accepts any valid ISO 4217 code and rejects junk', () => {
    const f = currencyField() as WithValidate
    expect(f.validate?.('USD')).toBe(true)
    expect(f.validate?.('BGN')).toBe(true)
    // empty/undefined round-trips (handled by fallback elsewhere)
    expect(f.validate?.('')).toBe(true)
    expect(f.validate?.(undefined)).toBe(true)
    expect(typeof f.validate?.('usd')).toBe('string') // lowercase fails [A-Z]{3}
    expect(typeof f.validate?.('US')).toBe('string')
  })

  it('allowBlank admits the XXX identity and disables required', () => {
    const f = currencyField({ allowBlank: true, required: true }) as WithValidate
    expect((f as { required?: boolean }).required).toBeUndefined()
    expect(f.validate?.('XXX')).toBe(true)
  })

  it('required without allowBlank sets required: true', () => {
    const f = currencyField({ required: true })
    expect((f as { required?: boolean }).required).toBe(true)
  })
})

describe('base/accounting/field — unitOfMeasureField & measureFields', () => {
  it('unit field defaults to the dimensionless-count identity C62', () => {
    const f = unitOfMeasureField()
    expect(f.type).toBe('text')
    expect('name' in f && f.name).toBe('unitOfMeasure')
    expect((f as { defaultValue?: string }).defaultValue).toBe('C62')
  })

  it('measureFields yields a [quantity number, unit text] pair', () => {
    const fields = measureFields()
    expect(fields).toHaveLength(2)
    const [qty, unit] = fields
    expect('name' in qty && qty.name).toBe('quantity')
    expect(qty.type).toBe('number')
    expect((qty as { min?: number }).min).toBe(0)
    expect('name' in unit && unit.name).toBe('unitOfMeasure')
    expect(unit.type).toBe('text')
  })
})

describe('base/accounting/field — relationship & reference factories', () => {
  it('glAccountField returns the relationship + two denormalized text fields', () => {
    const fields = glAccountField(true)
    expect(fields).toHaveLength(3)
    const rel = fields[0]
    expect(rel.type).toBe('relationship')
    expect((rel as { relationTo?: string }).relationTo).toBe('gl-accounts')
    expect((rel as { required?: boolean }).required).toBe(true)
  })

  it('referenceField is a unique, indexed, required text by default', () => {
    const f = referenceField()
    expect(f.type).toBe('text')
    expect('name' in f && f.name).toBe('reference')
    expect((f as { required?: boolean }).required).toBe(true)
    expect((f as { unique?: boolean }).unique).toBe(true)
    expect((f as { index?: boolean }).index).toBe(true)
  })

  it('legalEntityField relates to legal-entities', () => {
    const f = legalEntityField({ required: true })
    expect(f.type).toBe('relationship')
    expect((f as { relationTo?: string }).relationTo).toBe('legal-entities')
    expect((f as { required?: boolean }).required).toBe(true)
  })

  it('countryCodeField is an indexed text named countryCode', () => {
    const f = countryCodeField()
    expect(f.type).toBe('text')
    expect('name' in f && f.name).toBe('countryCode')
    expect((f as { index?: boolean }).index).toBe(true)
  })

  it('naceCodeField is a text named naceCode', () => {
    const f = naceCodeField()
    expect(f.type).toBe('text')
    expect('name' in f && f.name).toBe('naceCode')
  })
})

describe('base/accounting/field — select & misc factories', () => {
  it('statusField builds a select carrying the supplied options + default', () => {
    const opts = [
      { label: 'Draft', value: 'draft' },
      { label: 'Posted', value: 'posted' },
    ]
    const f = statusField(opts, 'posted')
    expect(f.type).toBe('select')
    expect('name' in f && f.name).toBe('status')
    expect((f as { defaultValue?: string }).defaultValue).toBe('posted')
    expect((f as { options?: unknown[] }).options).toEqual(opts)
  })

  it('taxonomySelect maps a registry options array onto a select field', () => {
    const f = taxonomySelect('scope', [{ label: 'Scope 1', value: 'scope_1' }] as const, {
      required: true,
    })
    expect(f.type).toBe('select')
    expect('name' in f && f.name).toBe('scope')
    expect((f as { required?: boolean }).required).toBe(true)
    expect((f as { options?: { value: string }[] }).options?.[0]?.value).toBe('scope_1')
  })

  it('auditFields / timestampFields / notesField produce the expected shapes', () => {
    expect(timestampFields()).toHaveLength(2)
    const audit = auditFields()
    expect(audit.map((f) => ('name' in f ? f.name : undefined))).toEqual([
      'createdBy',
      'approvedBy',
      'approvedAt',
    ])
    const notes = notesField('Memo')
    expect(notes.type).toBe('textarea')
    expect((notes as { label?: string }).label).toBe('Memo')
  })
})
