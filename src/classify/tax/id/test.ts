import { describe, it, expect } from 'vitest'
import { classifyTaxId } from '@/classify/tax/id'

// The beforeChange hook reads a tax-ID + country (by dotted path) and stamps a
// normalised type-label drawn from the per-country format registry. The label is
// derived once, at write time; an unrecognised id is a clean no-op.
type Doc = Record<string, unknown>

// Minimal stand-in for the Payload beforeChange argument: the hook only touches `data`.
function run(hook: ReturnType<typeof classifyTaxId>, data: Doc): Doc {
  const args = { data } as unknown as Parameters<typeof hook>[0]
  return hook(args) as Doc
}

describe('classify/tax/id — stamp the tax-ID type-label', () => {
  it('classifies a BG 9-digit id as EIK / Bulstat on the default fields', () => {
    const hook = classifyTaxId()
    const out = run(hook, { taxId: '123456789', country: 'BG' })
    expect(out.taxIdType).toBe('EIK / Bulstat')
  })

  it('classifies a BG VAT number as VAT (BG)', () => {
    const hook = classifyTaxId()
    const out = run(hook, { taxId: 'BG123456789', country: 'BG' })
    expect(out.taxIdType).toBe('VAT (BG)')
  })

  it('reads and writes nested dotted paths (tax.vatNumber / tax.label)', () => {
    const hook = classifyTaxId({
      taxIdField: 'tax.vatNumber',
      countryField: 'country',
      labelField: 'tax.label',
    })
    const out = run(hook, { tax: { vatNumber: '123456789' }, country: 'BG' })
    expect((out.tax as Doc).label).toBe('EIK / Bulstat')
  })

  it('is a clean no-op when the id does not match any country format', () => {
    const hook = classifyTaxId()
    const out = run(hook, { taxId: 'not-a-real-id', country: 'BG' })
    expect(out.taxIdType).toBeUndefined()
  })

  it('is a clean no-op when the country is unknown', () => {
    const hook = classifyTaxId()
    const out = run(hook, { taxId: '123456789', country: 'ZZ' })
    expect(out.taxIdType).toBeUndefined()
  })

  it('is a clean no-op when inputs are non-string', () => {
    const hook = classifyTaxId()
    const out = run(hook, { taxId: 123456789, country: 'BG' })
    expect(out.taxIdType).toBeUndefined()
    expect(out.taxId).toBe(123456789)
  })
})
