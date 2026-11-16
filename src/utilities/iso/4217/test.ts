import { describe, it, expect } from 'vitest'
import { isIso4217 } from '@/utilities/iso/4217'

describe('iso/4217 — currency-code shape validator', () => {
  it('accepts exactly 3 uppercase letters', () => {
    expect(isIso4217('USD')).toBe(true)
    expect(isIso4217('EUR')).toBe(true)
    expect(isIso4217('JPY')).toBe(true)
  })

  it('rejects wrong length, case, digits, and non-strings', () => {
    expect(isIso4217('US')).toBe(false) // too short
    expect(isIso4217('USDD')).toBe(false) // too long
    expect(isIso4217('usd')).toBe(false) // case-sensitive
    expect(isIso4217('US1')).toBe(false) // digit
    expect(isIso4217(978 as unknown)).toBe(false) // numeric code not accepted
  })
})

describe('iso/4217 — the codes a currency field accepts', () => {
  it('lists each code once, sorted, in ISO 4217 form, with the house currency, the lev and XXX', async () => {
    const { CURRENCY_CODES, isCurrencyCode } = await import('@/utilities/iso/4217')
    expect([...CURRENCY_CODES]).toEqual([...new Set(CURRENCY_CODES)].sort())
    for (const code of CURRENCY_CODES) expect(code).toMatch(/^[A-Z]{3}$/)
    for (const code of ['EUR', 'BGN', 'USD', 'XXX']) expect(isCurrencyCode(code), code).toBe(true)
    expect(isCurrencyCode('ABC')).toBe(false)
    expect(isCurrencyCode('eur')).toBe(false)
  })

  it('is the select every currency field uses, one shared type, defaulting to a listed code', async () => {
    const { currencyField } = await import('@/fields/select/currencyField')
    const { currencyOptions } = await import('@/utilities/iso/4217')
    const field = currencyField({ name: 'fromCurrency', required: true }) as { type: string; name: string; interfaceName: string; options: unknown[]; defaultValue: string; required?: boolean }
    expect(field).toMatchObject({ type: 'select', name: 'fromCurrency', interfaceName: 'Iso4217Currency', required: true })
    expect(field.options).toBe(currencyOptions)
    expect(currencyOptions.map((o) => o.value)).toContain(field.defaultValue)
    expect((currencyField({ allowBlank: true, required: true }) as { required?: boolean }).required).toBeUndefined()
  })
})
