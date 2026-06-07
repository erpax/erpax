import { describe, it, expect } from 'vitest'
import {
  currencyField,
  amountField,
  dateField,
  codeField,
  statusField,
  timestampFields,
  auditFields,
  referenceField,
  countryCodeField,
  taxonomySelect,
  accountTypeField,
  debitCreditField,
} from '@/fields'

// Fields (position 1) define the document schema AND auto-generate the admin UI
// from one definition. The factories are pure: same args → same field literal,
// every data field carries a `name` + `type`. Where a `validate` is present it is
// a deterministic pure function — exercise it directly.

describe('fields — schema = UI from one definition', () => {
  it('every data field carries a name and a type', () => {
    for (const f of [
      currencyField(),
      amountField(),
      dateField(),
      codeField,
      referenceField(),
      countryCodeField(),
      accountTypeField,
      debitCreditField,
    ]) {
      expect(typeof (f as any).name).toBe('string')
      expect(typeof (f as any).type).toBe('string')
    }
  })

  describe('currencyField', () => {
    it('defaults name to "currency" and is a text field', () => {
      const f = currencyField()
      expect(f.name).toBe('currency')
      expect(f.type).toBe('text')
    })

    it('honours a custom name (FX-pair fields)', () => {
      expect(currencyField({ name: 'fromCurrency' }).name).toBe('fromCurrency')
    })

    it('validate accepts a valid ISO 4217 code and rejects garbage', () => {
      const validate = (currencyField() as any).validate as (v: unknown) => true | string
      expect(validate('EUR')).toBe(true)
      expect(validate('USD')).toBe(true)
      expect(validate('NOTACODE')).not.toBe(true)
    })

    it('validate treats empty/null as valid (no value to check)', () => {
      const validate = (currencyField() as any).validate as (v: unknown) => true | string
      expect(validate('')).toBe(true)
      expect(validate(null)).toBe(true)
      expect(validate(undefined)).toBe(true)
    })

    it('allowBlank admits the XXX identity element and drops required', () => {
      const f = currencyField({ allowBlank: true, required: true }) as any
      expect(f.required).toBeUndefined()
      expect(f.validate('XXX')).toBe(true)
    })
  })

  describe('amountField', () => {
    it('is a required, non-negative number field', () => {
      const f = amountField() as any
      expect(f.name).toBe('amount')
      expect(f.type).toBe('number')
      expect(f.required).toBe(true)
      expect(f.min).toBe(0)
    })

    it('validate enforces the ISO 4217 decimal-place bound', () => {
      const validate = (amountField('Amount', 2) as any).validate as (v: unknown) => true | string
      expect(validate(10.55)).toBe(true)
      expect(validate(10)).toBe(true)
      expect(validate(10.555)).not.toBe(true)
    })
  })

  it('codeField is a required, unique, indexed text field', () => {
    expect(codeField.name).toBe('code')
    expect(codeField.type).toBe('text')
    expect((codeField as any).required).toBe(true)
    expect((codeField as any).unique).toBe(true)
    expect((codeField as any).index).toBe(true)
  })

  it('statusField builds a select with the given options and default', () => {
    const opts = [
      { label: 'Open', value: 'open' },
      { label: 'Closed', value: 'closed' },
    ]
    const f = statusField(opts, 'closed') as any
    expect(f.type).toBe('select')
    expect(f.defaultValue).toBe('closed')
    expect(f.options).toEqual(opts)
  })

  it('timestampFields returns createdAt + updatedAt', () => {
    const fs = timestampFields()
    expect(fs.map((f) => (f as any).name)).toEqual(['createdAt', 'updatedAt'])
  })

  it('auditFields toggles approvedAt between disabled and readOnly', () => {
    const disabled = auditFields()
    const ro = auditFields({ readOnly: true })
    const findApprovedAt = (fs: any[]) => fs.find((f) => f.name === 'approvedAt')
    expect((findApprovedAt(disabled) as any).admin).toEqual({ disabled: true })
    expect((findApprovedAt(ro) as any).admin).toEqual({ readOnly: true })
  })

  it('referenceField defaults to required/unique/indexed text and honours opts', () => {
    const def = referenceField() as any
    expect(def.name).toBe('reference')
    expect(def.required).toBe(true)
    expect(def.unique).toBe(true)
    expect(def.index).toBe(true)
    expect((referenceField({ name: 'invoiceNumber', required: false }) as any).required).toBe(false)
  })

  it('taxonomySelect projects options to {label,value} and applies flags', () => {
    const f = taxonomySelect(
      'scope',
      [
        { label: 'Scope 1', value: 'scope_1' },
        { label: 'Scope 2', value: 'scope_2' },
      ],
      { required: true, defaultValue: 'scope_1', hasMany: true, index: true },
    ) as any
    expect(f.name).toBe('scope')
    expect(f.type).toBe('select')
    expect(f.required).toBe(true)
    expect(f.defaultValue).toBe('scope_1')
    expect(f.hasMany).toBe(true)
    expect(f.index).toBe(true)
    expect(f.options).toEqual([
      { label: 'Scope 1', value: 'scope_1' },
      { label: 'Scope 2', value: 'scope_2' },
    ])
  })
})
