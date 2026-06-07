import { describe, it, expect } from 'vitest'
import {
  currencyField,
  amountField,
  dateField,
  codeField,
  statusField,
  auditFields,
  taxonomySelect,
  referenceField,
  countryCodeField,
  legalEntityField,
  DEFAULT_CURRENCY,
} from '@/shared'

// `@/shared` re-exports the reusable Payload Field factories. These assert the
// real field shapes + the runtime validators each factory wires (ISO-4217
// currency, ISO-4217 decimal places, the XXX blank identity, etc.).

// A field validate fn from Payload has a wide signature; we only exercise the
// value arg, so call it through a narrow local type.
type Validator = (value: unknown) => true | string
const validatorOf = (f: { validate?: unknown }): Validator => {
  const v = f.validate
  if (typeof v !== 'function') throw new Error('expected a validate function')
  return (value: unknown) => (v as (val: unknown) => true | string)(value)
}

describe('shared — reusable Payload Field factories', () => {
  it('currencyField defaults to the canonical DEFAULT_CURRENCY on the `currency` name', () => {
    const f = currencyField()
    expect(f.name).toBe('currency')
    expect(f.type).toBe('text')
    expect((f as { defaultValue?: string }).defaultValue).toBe(DEFAULT_CURRENCY)
  })

  it('currencyField validate accepts valid ISO 4217, rejects junk, allows empty', () => {
    const v = validatorOf(currencyField())
    expect(v('EUR')).toBe(true)
    expect(v('USD')).toBe(true)
    expect(v('')).toBe(true) // empty round-trips
    // ISO 4217 §6.1 — any 3-letter code is structurally valid, so junk is a
    // malformed code (wrong length / case), not an unlisted-but-well-formed one.
    expect(v('123')).not.toBe(true)
    expect(v('eur')).not.toBe(true)
  })

  it('currencyField allowBlank admits the ISO 4217 XXX identity and forces required off', () => {
    const f = currencyField({ allowBlank: true, required: true })
    expect((f as { required?: boolean }).required).toBeUndefined()
    expect(validatorOf(f)('XXX')).toBe(true)
  })

  it('currencyField custom name supports FX-pair fields', () => {
    expect(currencyField({ name: 'fromCurrency' }).name).toBe('fromCurrency')
  })

  it('amountField enforces ISO 4217 decimal-place precision', () => {
    const v = validatorOf(amountField())
    expect(v(10.99)).toBe(true)
    expect(v(10.999)).not.toBe(true) // 3 dp > default 2
    const v0 = validatorOf(amountField('Qty', 0))
    expect(v0(5)).toBe(true)
    expect(v0(5.1)).not.toBe(true)
  })

  it('dateField is a required date field carrying its label as description', () => {
    const f = dateField('Posting Date')
    expect(f.type).toBe('date')
    expect((f as { required?: boolean }).required).toBe(true)
    expect((f as { admin?: { description?: string } }).admin?.description).toBe('Posting Date')
  })

  it('codeField is a unique indexed required text identifier', () => {
    expect(codeField.name).toBe('code')
    expect((codeField as { unique?: boolean }).unique).toBe(true)
    expect((codeField as { index?: boolean }).index).toBe(true)
    expect((codeField as { required?: boolean }).required).toBe(true)
  })

  it('statusField is a select with caller options and a draft default', () => {
    const f = statusField([{ label: 'Open', value: 'open' }])
    expect(f.type).toBe('select')
    expect((f as { defaultValue?: string }).defaultValue).toBe('draft')
  })

  it('auditFields gives createdBy/approvedBy/approvedAt; readOnly flips approval admin', () => {
    const def = auditFields()
    expect(def.map((f) => (f as { name: string }).name)).toEqual(['createdBy', 'approvedBy', 'approvedAt'])
    const ro = auditFields({ readOnly: true })
    const approvedBy = ro.find((f) => (f as { name: string }).name === 'approvedBy')!
    expect((approvedBy as { admin?: { readOnly?: boolean } }).admin?.readOnly).toBe(true)
  })

  it('taxonomySelect maps registry options into a Payload select', () => {
    const f = taxonomySelect('scope', [
      { label: 'Scope 1', value: 'scope_1' as const },
      { label: 'Scope 2', value: 'scope_2' as const },
    ], { required: true, defaultValue: 'scope_1' })
    expect(f.type).toBe('select')
    expect((f as { required?: boolean }).required).toBe(true)
    expect((f as { defaultValue?: string }).defaultValue).toBe('scope_1')
    expect((f as { options: Array<{ value: string }> }).options.map((o) => o.value)).toEqual(['scope_1', 'scope_2'])
  })

  it('referenceField defaults to a unique indexed required `reference`', () => {
    const f = referenceField()
    expect(f.name).toBe('reference')
    expect((f as { unique?: boolean }).unique).toBe(true)
    expect((f as { required?: boolean }).required).toBe(true)
    expect(referenceField({ name: 'invoiceNo', required: false }).name).toBe('invoiceNo')
    expect((referenceField({ required: false }) as { required?: boolean }).required).toBe(false)
  })

  it('countryCodeField is an indexed text code; legalEntityField relates to legal-entities', () => {
    const cc = countryCodeField()
    expect(cc.name).toBe('countryCode')
    expect((cc as { index?: boolean }).index).toBe(true)
    const le = legalEntityField({ required: true })
    expect(le.type).toBe('relationship')
    expect((le as { relationTo?: string }).relationTo).toBe('legal-entities')
    expect((le as { required?: boolean }).required).toBe(true)
  })
})
